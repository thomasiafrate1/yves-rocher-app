"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  createStartedDiagnostic,
  markDiagnosticAbandoned,
} from "@/features/analytics/public-analytics.service";
import type { DiagnosticSession } from "@/features/analytics/types";
import { DIAGNOSTIC_LABELS, USAGE_MODE_LABELS } from "@/features/diagnostics/labels";
import type {
  DiagnosticConfig,
  DiagnosticType,
  SelectedAnswers,
  UsageMode,
} from "@/features/diagnostics/types";

type QuestionnaireFlowProps = {
  config: DiagnosticConfig;
  diagnosticType: DiagnosticType;
  mode: UsageMode;
};

export function QuestionnaireFlow({ config, diagnosticType, mode }: QuestionnaireFlowProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<SelectedAnswers>({});
  const [diagnosticSession, setDiagnosticSession] = useState<DiagnosticSession | null>(null);
  const currentQuestion = config.questions[currentIndex];
  const selectedOptionId = answers[currentQuestion.id];
  const progress = ((currentIndex + 1) / config.questions.length) * 100;
  const isLastQuestion = currentIndex === config.questions.length - 1;

  const selectedCount = useMemo(
    () => config.questions.filter((question) => answers[question.id]).length,
    [answers, config.questions],
  );

  useEffect(() => {
    let isActive = true;

    createStartedDiagnostic({ diagnosticType, mode }).then((session) => {
      if (isActive) {
        setDiagnosticSession(session);
      }
    });

    return () => {
      isActive = false;
    };
  }, [diagnosticType, mode]);

  function selectAnswer(optionId: string) {
    setAnswers((current) => ({
      ...current,
      [currentQuestion.id]: optionId,
    }));
  }

  function goNext() {
    if (!selectedOptionId) {
      return;
    }

    if (!isLastQuestion) {
      setCurrentIndex((index) => index + 1);
      return;
    }

    const params = new URLSearchParams({
      answers: JSON.stringify(answers),
    });

    if (diagnosticSession) {
      params.set("diagnosticId", diagnosticSession.id);
      params.set("diagnosticToken", diagnosticSession.publicToken);
    }

    router.push(`/diagnostic/${diagnosticType}/result?${params.toString()}`);
  }

  function quitQuestionnaire() {
    void markDiagnosticAbandoned(diagnosticSession);
    router.push(`/diagnostic/${diagnosticType}`);
  }

  function goPrevious() {
    if (currentIndex > 0) {
      setCurrentIndex((index) => index - 1);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f1e7] px-5 py-5 text-[#263420] sm:px-8 lg:px-12">
      <section className="mx-auto flex min-h-[calc(100vh-2.5rem)] w-full max-w-6xl flex-col overflow-hidden rounded-[2rem] border border-stone-200 bg-[#fffaf1] shadow-[0_24px_90px_rgba(50,44,33,0.10)]">
        <div className="grid flex-1 lg:grid-cols-[0.88fr_1.12fr]">
          <aside className="relative hidden min-h-full bg-[#ede1cf] lg:block">
            <Image
              src={config.visual.image}
              alt={config.visual.alt}
              fill
              sizes="38vw"
              className="object-contain p-16"
              priority
            />
            <div className="absolute inset-x-8 bottom-8 rounded-[1.5rem] bg-[#fffaf1]/85 p-6 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#8b6f45]">
                {USAGE_MODE_LABELS[mode]}
              </p>
              <p className="mt-3 text-xl font-semibold">{DIAGNOSTIC_LABELS[diagnosticType]}</p>
            </div>
          </aside>

          <div className="flex flex-col p-6 sm:p-8 lg:p-12">
            <header>
              <div className="flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={quitQuestionnaire}
                  className="rounded-full border border-[#cfc4ad] px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#53613f] transition hover:border-[#53613f]"
                >
                  Quitter
                </button>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8b6f45]">
                  {currentIndex + 1} / {config.questions.length}
                </p>
              </div>
              <div className="mt-8 h-2 overflow-hidden rounded-full bg-[#e8ddca]">
                <div
                  className="h-full rounded-full bg-[#44623c] transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </header>

            <div className="flex flex-1 flex-col justify-center py-10 sm:py-14">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#8b6f45]">
                {selectedCount} reponse{selectedCount > 1 ? "s" : ""} selectionnee
              </p>
              <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.08] text-[#24351f] sm:text-5xl">
                {currentQuestion.title}
              </h1>
              {currentQuestion.helper ? (
                <p className="mt-5 max-w-2xl text-lg leading-8 text-[#6e695f]">
                  {currentQuestion.helper}
                </p>
              ) : null}

              <div className="mt-10 grid gap-4">
                {currentQuestion.options.map((option) => {
                  const isSelected = option.id === selectedOptionId;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => selectAnswer(option.id)}
                      className={`rounded-[1.35rem] border px-6 py-5 text-left transition sm:px-8 sm:py-6 ${
                        isSelected
                          ? "border-[#314b2c] bg-[#314b2c] text-[#fff8e8] shadow-[0_16px_40px_rgba(47,74,45,0.18)]"
                          : "border-[#ddd0bb] bg-white/70 text-[#263420] hover:border-[#8ea06e] hover:bg-[#fbf5e9]"
                      }`}
                    >
                      <span className="block text-xl font-semibold sm:text-2xl">{option.label}</span>
                      {option.description ? (
                        <span
                          className={`mt-2 block text-base leading-7 ${
                            isSelected ? "text-[#efe4c8]" : "text-[#6e695f]"
                          }`}
                        >
                          {option.description}
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>

            <footer className="flex flex-col-reverse gap-4 border-t border-[#eadfcd] pt-6 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={goPrevious}
                disabled={currentIndex === 0}
                className="rounded-full border border-[#cfc4ad] px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#53613f] transition enabled:hover:border-[#53613f] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Precedent
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={!selectedOptionId}
                className="rounded-full bg-[#314b2c] px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#fff8e8] shadow-[0_14px_34px_rgba(47,74,45,0.22)] transition enabled:hover:bg-[#24391f] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isLastQuestion ? "Voir mon profil" : "Continuer"}
              </button>
            </footer>
          </div>
        </div>
      </section>
    </main>
  );
}
