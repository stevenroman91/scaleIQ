"use client";

import { useState } from "react";
import { CheckCircle, XCircle, ArrowRight, Trophy } from "lucide-react";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string | null;
  position: number;
}

interface QuizPlayerProps {
  questions: QuizQuestion[];
  lessonId: string;
  userId: string;
}

export default function QuizPlayer({ questions, lessonId, userId }: QuizPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const sorted = [...questions].sort((a, b) => a.position - b.position);
  const current = sorted[currentIndex];
  const isCorrect = selectedOption === current?.correctIndex;
  const totalQuestions = sorted.length;

  async function handleSubmit() {
    if (selectedOption === null) return;
    setSubmitted(true);

    const correct = selectedOption === current.correctIndex;
    if (correct) setCorrectCount((c) => c + 1);

    // Record attempt
    try {
      await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          lessonId,
          completed: false,
          timeSpent: 0,
        }),
      });
    } catch {
      // Silently continue
    }
  }

  async function handleNext() {
    if (currentIndex + 1 >= totalQuestions) {
      // Finished
      const finalCorrect = correctCount;
      const score = Math.round((finalCorrect / totalQuestions) * 100);
      setFinished(true);

      // Save final score
      try {
        await fetch("/api/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            lessonId,
            completed: true,
            score,
            timeSpent: 0,
          }),
        });
      } catch {
        // Silently continue
      }
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setSubmitted(false);
    }
  }

  if (totalQuestions === 0) {
    return (
      <div className="bg-card border border-border rounded-xl p-8 text-center text-muted-foreground">
        Aucune question pour ce quiz.
      </div>
    );
  }

  if (finished) {
    const score = Math.round((correctCount / totalQuestions) * 100);
    return (
      <div className="bg-card border border-border rounded-xl p-8 text-center space-y-4">
        <Trophy className="w-16 h-16 mx-auto text-yellow-500" />
        <h2 className="text-2xl font-bold">Quiz terminé !</h2>
        <p className="text-lg">
          Score : <span className="font-bold text-primary">{score}%</span>
        </p>
        <p className="text-muted-foreground">
          {correctCount} / {totalQuestions} réponses correctes
        </p>
        {score >= 80 ? (
          <p className="text-green-600 dark:text-green-400 font-medium">
            Excellent travail !
          </p>
        ) : score >= 50 ? (
          <p className="text-yellow-600 dark:text-yellow-400 font-medium">
            Bon effort, continuez à vous améliorer !
          </p>
        ) : (
          <p className="text-red-600 dark:text-red-400 font-medium">
            Révisez le contenu et réessayez.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground font-medium">
          Question {currentIndex + 1} / {totalQuestions}
        </span>
        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h3 className="text-lg font-semibold">{current.question}</h3>

        <div className="space-y-2">
          {current.options.map((option: string, idx: number) => {
            let optionClasses =
              "w-full text-left p-3 rounded-lg border transition flex items-center gap-3";

            if (submitted) {
              if (idx === current.correctIndex) {
                optionClasses +=
                  " border-green-500 bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-400";
              } else if (idx === selectedOption && !isCorrect) {
                optionClasses +=
                  " border-red-500 bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400";
              } else {
                optionClasses += " border-border opacity-50";
              }
            } else if (idx === selectedOption) {
              optionClasses += " border-primary bg-primary/5";
            } else {
              optionClasses +=
                " border-border hover:border-primary/50 hover:bg-accent";
            }

            return (
              <button
                key={idx}
                onClick={() => !submitted && setSelectedOption(idx)}
                disabled={submitted}
                className={optionClasses}
              >
                <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-medium flex-shrink-0">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="text-sm">{option}</span>
                {submitted && idx === current.correctIndex && (
                  <CheckCircle className="w-5 h-5 ml-auto text-green-600 flex-shrink-0" />
                )}
                {submitted && idx === selectedOption && !isCorrect && idx !== current.correctIndex && (
                  <XCircle className="w-5 h-5 ml-auto text-red-600 flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {submitted && current.explanation && (
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-sm">
            <p className="font-medium text-blue-800 dark:text-blue-300 mb-1">
              Explication
            </p>
            <p className="text-blue-700 dark:text-blue-400">{current.explanation}</p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={selectedOption === null}
            className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition disabled:opacity-50"
          >
            Valider
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition flex items-center gap-2"
          >
            {currentIndex + 1 >= totalQuestions ? "Voir le résultat" : "Suivant"}
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
