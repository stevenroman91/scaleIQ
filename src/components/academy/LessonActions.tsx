"use client";

import { useState, useEffect, useRef } from "react";
import { CheckCircle, Clock, Loader2 } from "lucide-react";

interface LessonActionsProps {
  lessonId: string;
  userId: string;
  isCompleted: boolean;
  lessonType: string;
}

export default function LessonActions({
  lessonId,
  userId,
  isCompleted,
  lessonType,
}: LessonActionsProps) {
  const [completed, setCompleted] = useState(isCompleted);
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Time tracker
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Save time spent on unmount
  useEffect(() => {
    return () => {
      if (seconds > 5) {
        // Use sendBeacon for reliable delivery on unmount
        const data = JSON.stringify({
          userId,
          lessonId,
          timeSpent: seconds,
        });
        navigator.sendBeacon(
          "/api/progress",
          new Blob([data], { type: "application/json" })
        );
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function formatTime(secs: number) {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  }

  async function markCompleted() {
    setLoading(true);
    try {
      await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          lessonId,
          completed: true,
          timeSpent: seconds,
        }),
      });
      setCompleted(true);
    } catch {
      // Silently continue
    } finally {
      setLoading(false);
    }
  }

  // Don't show mark-complete for quiz (handled by QuizPlayer)
  const showCompleteButton = lessonType !== "QUIZ";

  return (
    <div className="flex items-center justify-between bg-card border border-border rounded-xl p-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Clock className="w-4 h-4" />
        <span>Temps passé : {formatTime(seconds)}</span>
      </div>

      {showCompleteButton && (
        <>
          {completed ? (
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm font-medium">
              <CheckCircle className="w-5 h-5" />
              Leçon terminée
            </div>
          ) : (
            <button
              onClick={markCompleted}
              disabled={loading}
              className="px-5 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <CheckCircle className="w-4 h-4" />
              )}
              Marquer comme terminé
            </button>
          )}
        </>
      )}
    </div>
  );
}
