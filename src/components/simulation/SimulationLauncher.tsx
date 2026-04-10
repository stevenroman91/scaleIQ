"use client";

import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Phone, Send, PhoneOff, Loader2, Mic, MicOff } from "lucide-react";

interface Props {
  profileId: string;
  profileName: string;
}

interface Message {
  role: string;
  content: string;
  timestamp: number;
}

export function SimulationLauncher({ profileId, profileName }: Props) {
  const { data: session, status } = useSession();
  const [simulationId, setSimulationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Record<string, unknown> | null>(null);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);

  // Audio state
  const [isRecording, setIsRecording] = useState(false);
  const [micAllowed, setMicAllowed] = useState<boolean | null>(null); // null = unknown
  const [audioEnabled, setAudioEnabled] = useState(true); // false if key missing or mic denied
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const retryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const retryFnRef = useRef<(() => void) | null>(null);

  // Check mic availability on mount
  useEffect(() => {
    if (typeof window === "undefined" || !navigator.mediaDevices) {
      setMicAllowed(false);
      return;
    }
    navigator.permissions
      .query({ name: "microphone" as PermissionName })
      .then((result) => {
        setMicAllowed(result.state !== "denied");
        result.onchange = () => setMicAllowed(result.state !== "denied");
      })
      .catch(() => setMicAllowed(true)); // assume allowed if permissions API unavailable
  }, []);

  useEffect(() => {
    return () => {
      if (retryTimerRef.current) clearTimeout(retryTimerRef.current);
    };
  }, []);

  const dismissError = () => {
    setErrorBanner(null);
    if (retryTimerRef.current) {
      clearTimeout(retryTimerRef.current);
      retryTimerRef.current = null;
    }
    retryFnRef.current = null;
  };

  const showSimError = (errData: { error: string; code: string; retryable: boolean }, retryFn: () => void) => {
    setErrorBanner(errData.error);
    retryFnRef.current = retryFn;
    if (retryTimerRef.current) clearTimeout(retryTimerRef.current);
    if (errData.code === "LLM_RATE_LIMITED" && errData.retryable) {
      retryTimerRef.current = setTimeout(() => {
        setErrorBanner(null);
        retryFn();
      }, 5000);
    }
  };

  const playTTS = async (text: string, simId: string) => {
    if (!audioEnabled || !text) return;
    try {
      const res = await fetch(`/api/simulations/${simId}/tts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (res.status === 503) {
        setAudioEnabled(false);
        return;
      }
      if (!res.ok) return;
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.onended = () => URL.revokeObjectURL(url);
      await audio.play().catch(() => {/* autoplay blocked — silently skip */});
    } catch {
      // network error — silently skip
    }
  };

  const startSimulation = async () => {
    if (!session?.user?.id) return;
    setLoading(true);
    setErrorBanner(null);
    const res = await fetch("/api/simulation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "start",
        profileId,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      setSimulationId(data.simulationId);
      setMessages(data.transcript);
      // Autoplay initial AI greeting
      const firstMsg = data.transcript?.[0];
      if (firstMsg?.role === "assistant") {
        await playTTS(firstMsg.content, data.simulationId);
      }
    } else {
      const errData = await res.json().catch(() => ({ error: "La simulation est indisponible.", code: "LLM_UNAVAILABLE", retryable: false }));
      showSimError(errData, startSimulation);
    }
    setLoading(false);
  };

  const sendMessageText = async (text: string) => {
    if (!text.trim() || !simulationId) return;
    setLoading(true);
    setErrorBanner(null);

    const res = await fetch("/api/simulation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "message",
        simulationId,
        message: text,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      setMessages(data.transcript);
      if (data.lastResponse) {
        await playTTS(data.lastResponse, simulationId);
      }
    } else {
      const errData = await res.json().catch(() => ({ error: "La simulation est indisponible.", code: "LLM_UNAVAILABLE", retryable: false }));
      showSimError(errData, () => sendMessageText(text));
    }
    setLoading(false);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const text = input;
    setInput("");
    await sendMessageText(text);
  };

  const endSimulation = async () => {
    if (!simulationId) return;
    setLoading(true);

    const res = await fetch("/api/simulation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "end", simulationId }),
    });

    if (res.ok) {
      const data = await res.json();
      setResults(data);
    }
    setLoading(false);
  };

  const startRecording = async () => {
    if (!simulationId || loading) return;
    chunksRef.current = [];
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicAllowed(true);
      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const mimeType = recorder.mimeType || "audio/webm";
        const blob = new Blob(chunksRef.current, { type: mimeType });
        await transcribeAudio(blob);
      };
      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
    } catch {
      setMicAllowed(false);
      setAudioEnabled(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
      setIsRecording(false);
    }
  };

  const transcribeAudio = async (blob: Blob) => {
    if (!simulationId) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("audio", blob, "recording.webm");
      const res = await fetch(`/api/simulations/${simulationId}/stt`, {
        method: "POST",
        body: formData,
      });
      if (res.status === 503) {
        setAudioEnabled(false);
        setErrorBanner("La transcription vocale est indisponible : OPENAI_API_KEY manquante.");
        setLoading(false);
        return;
      }
      if (res.ok) {
        const { text } = await res.json();
        if (text?.trim()) {
          await sendMessageText(text.trim());
          return;
        }
      }
    } catch {
      // silently fall back to text input
    }
    setLoading(false);
  };

  // Loading session
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center py-3 text-muted-foreground text-sm">
        <Loader2 className="w-4 h-4 animate-spin mr-2" />
        Chargement...
      </div>
    );
  }

  // Not authenticated
  if (!session?.user?.id) {
    return (
      <p className="text-sm text-center text-muted-foreground py-2">
        Veuillez vous <a href="/login" className="underline text-primary">connecter</a> pour lancer une simulation.
      </p>
    );
  }

  // Not started yet
  if (!simulationId) {
    return (
      <div className="space-y-2">
        {errorBanner && (
          <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            <span className="flex-1">{errorBanner}</span>
            <div className="flex gap-2 shrink-0">
              {retryFnRef.current && (
                <button onClick={() => { dismissError(); retryFnRef.current?.(); }} className="underline font-medium hover:text-red-900">
                  Réessayer
                </button>
              )}
              <button onClick={dismissError} className="hover:text-red-900">✕</button>
            </div>
          </div>
        )}
        <button
          onClick={startSimulation}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition w-full justify-center"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Phone className="w-4 h-4" />}
          Lancer la simulation
        </button>
      </div>
    );
  }

  // Show results
  if (results) {
    const r = results as { overallScore?: number; feedback?: { strengths?: string[]; improvements?: string[] } };
    return (
      <div className="space-y-3">
        <div className="text-center p-4 bg-primary/10 rounded-lg">
          <p className="text-3xl font-bold text-primary">
            {r.overallScore || 0}/100
          </p>
          <p className="text-sm text-muted-foreground">Score global</p>
        </div>
        {r.feedback && (
          <div className="text-sm space-y-2">
            {(r.feedback.strengths as string[])?.map((s: string, i: number) => (
              <p key={i} className="text-green-600">+ {s}</p>
            ))}
            {(r.feedback.improvements as string[])?.map((s: string, i: number) => (
              <p key={i} className="text-orange-600">- {s}</p>
            ))}
          </div>
        )}
        <button
          onClick={() => { setSimulationId(null); setMessages([]); setResults(null); }}
          className="w-full py-2 border border-border rounded-lg text-sm hover:bg-accent transition"
        >
          Nouvelle simulation
        </button>
      </div>
    );
  }

  const showMicButton = micAllowed !== false && audioEnabled;

  // Active simulation
  return (
    <div className="space-y-3">
      {/* Error banner */}
      {errorBanner && (
        <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          <span className="flex-1">{errorBanner}</span>
          <div className="flex gap-2 shrink-0">
            {retryFnRef.current && (
              <button onClick={() => { const fn = retryFnRef.current; dismissError(); fn?.(); }} className="underline font-medium hover:text-red-900">
                Réessayer
              </button>
            )}
            <button onClick={dismissError} className="hover:text-red-900">✕</button>
          </div>
        </div>
      )}

      {/* Audio unavailable notice */}
      {(!audioEnabled || micAllowed === false) && (
        <p className="text-xs text-muted-foreground text-center">
          Mode texte — micro non disponible ou clé API manquante.
        </p>
      )}

      {/* Chat area */}
      <div className="h-48 overflow-y-auto space-y-2 bg-muted/50 rounded-lg p-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`text-sm p-2 rounded ${
              msg.role === "user"
                ? "bg-primary/10 text-primary ml-8"
                : "bg-card border border-border mr-8"
            }`}
          >
            <span className="text-xs font-medium block mb-0.5">
              {msg.role === "user" ? "Vous (SDR)" : profileName}
            </span>
            {msg.content}
          </div>
        ))}
        {loading && (
          <div className="text-center text-muted-foreground text-sm">
            <Loader2 className="w-4 h-4 animate-spin inline" />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Votre réponse..."
          className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm"
          disabled={loading || isRecording}
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim() || isRecording}
          className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition"
        >
          <Send className="w-4 h-4" />
        </button>
        {showMicButton && (
          <button
            onMouseDown={startRecording}
            onMouseUp={stopRecording}
            onTouchStart={startRecording}
            onTouchEnd={stopRecording}
            disabled={loading && !isRecording}
            title={isRecording ? "Relâcher pour envoyer" : "Maintenir pour parler"}
            className={`p-2 rounded-lg transition ${
              isRecording
                ? "bg-red-600 text-white animate-pulse"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>
        )}
        <button
          onClick={endSimulation}
          disabled={loading}
          className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          title="Terminer"
        >
          <PhoneOff className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
