"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Phone, Send, PhoneOff, Loader2 } from "lucide-react";

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

  const startSimulation = async () => {
    if (!session?.user?.id) return;
    setLoading(true);
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
    }
    setLoading(false);
  };

  const sendMessage = async () => {
    if (!input.trim() || !simulationId) return;
    setLoading(true);

    const res = await fetch("/api/simulation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "message",
        simulationId,
        message: input,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      setMessages(data.transcript);
    }
    setInput("");
    setLoading(false);
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
      <button
        onClick={startSimulation}
        disabled={loading}
        className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition w-full justify-center"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Phone className="w-4 h-4" />}
        Lancer la simulation
      </button>
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

  // Active simulation
  return (
    <div className="space-y-3">
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
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition"
        >
          <Send className="w-4 h-4" />
        </button>
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
