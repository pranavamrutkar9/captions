import { env, isMockMode, isRealGnaniEnabled } from "@/lib/env";
import { LIMITS, MOCK_FIXTURES } from "@code-mixed-captions/shared";

export default function HomePage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Phase 0 Complete
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Demo Mode Active
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight mt-3 text-white">
            Code-Mixed Captions MVP
          </h1>
          <p className="text-slate-400 text-sm mt-1 max-w-xl">
            Creator tool turning short videos with Hinglish, Tanglish, or Benglish speech into editable, script-aware captions.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-slate-300">
          <div className="text-slate-400 font-medium mb-1">Safety & API Status</div>
          <div className="flex items-center gap-2 text-emerald-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Mock Default: Zero API Credits Used
          </div>
        </div>
      </div>

      {/* Mandatory Demo Disclosure Banner */}
      <div className="mt-8 bg-amber-950/40 border border-amber-700/50 rounded-xl p-4 text-amber-200 flex items-start gap-3">
        <svg
          className="w-5 h-5 text-amber-400 mt-0.5 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div className="text-sm">
          <p className="font-semibold text-amber-300">
            Demo mode — AI providers are mocked
          </p>
          <p className="text-xs text-amber-200/80 mt-1">
            All transcription and normalisation are performed via deterministic local fixtures. No real Gnani API calls are made and no API credits are consumed.
          </p>
        </div>
      </div>

      {/* Grid: Environment Verification & Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Environment & Provider Status */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <span>⚙️</span> Environment Configuration
          </h2>
          <dl className="divide-y divide-slate-800/80 text-sm mt-4">
            <div className="py-2.5 flex justify-between">
              <dt className="text-slate-400">Environment</dt>
              <dd className="font-mono text-slate-200">{env.NODE_ENV}</dd>
            </div>
            <div className="py-2.5 flex justify-between">
              <dt className="text-slate-400">Transcription Provider</dt>
              <dd className="font-mono text-emerald-400">{env.TRANSCRIPTION_PROVIDER}</dd>
            </div>
            <div className="py-2.5 flex justify-between">
              <dt className="text-slate-400">Normalisation Provider</dt>
              <dd className="font-mono text-emerald-400">{env.NORMALISATION_PROVIDER}</dd>
            </div>
            <div className="py-2.5 flex justify-between">
              <dt className="text-slate-400">Real Gnani API Enabled</dt>
              <dd className="font-mono text-slate-300">
                {isRealGnaniEnabled ? "true" : "false (Disabled)"}
              </dd>
            </div>
            <div className="py-2.5 flex justify-between">
              <dt className="text-slate-400">Mock Mode Enforced</dt>
              <dd className="font-mono text-emerald-400">{isMockMode ? "Yes" : "No"}</dd>
            </div>
          </dl>
        </div>

        {/* Project Limits & Storage */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <span>📁</span> Storage & Operational Limits
          </h2>
          <dl className="divide-y divide-slate-800/80 text-sm mt-4">
            <div className="py-2.5 flex justify-between">
              <dt className="text-slate-400">Max Video Duration</dt>
              <dd className="font-mono text-slate-200">{LIMITS.MAX_VIDEO_DURATION_SECONDS}s (3 min)</dd>
            </div>
            <div className="py-2.5 flex justify-between">
              <dt className="text-slate-400">Max Upload Size</dt>
              <dd className="font-mono text-slate-200">{LIMITS.MAX_UPLOAD_SIZE_MB} MB</dd>
            </div>
            <div className="py-2.5 flex justify-between">
              <dt className="text-slate-400">Caption Line Length Limit</dt>
              <dd className="font-mono text-slate-200">~{LIMITS.MAX_CHARS_PER_LINE} chars / line</dd>
            </div>
            <div className="py-2.5 flex justify-between">
              <dt className="text-slate-400">Max Lines Per Cue</dt>
              <dd className="font-mono text-slate-200">{LIMITS.MAX_LINES_PER_CUE} lines</dd>
            </div>
            <div className="py-2.5 flex justify-between">
              <dt className="text-slate-400">Upload Directory</dt>
              <dd className="font-mono text-slate-300 text-xs">{env.UPLOAD_DIR}</dd>
            </div>
            <div className="py-2.5 flex justify-between">
              <dt className="text-slate-400">Audio Directory</dt>
              <dd className="font-mono text-slate-300 text-xs">{env.AUDIO_DIR}</dd>
            </div>
            <div className="py-2.5 flex justify-between">
              <dt className="text-slate-400">Export Directory</dt>
              <dd className="font-mono text-slate-300 text-xs">{env.EXPORT_DIR}</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Available Fixtures Ready for Phase 3 */}
      <div className="mt-8 bg-slate-900/90 border border-slate-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span>🎙️</span> Pre-configured Deterministic Fixtures ({MOCK_FIXTURES.length})
          </span>
          <span className="text-xs font-normal text-slate-400">Spec: 04_MOCK_PROVIDER_SPEC.md</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {MOCK_FIXTURES.map((fixture) => (
            <div
              key={fixture.id}
              className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-lg text-xs"
            >
              <div className="flex items-center justify-between font-semibold text-slate-200">
                <span>{fixture.title}</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 capitalize">
                  {fixture.languageMix}
                </span>
              </div>
              <p className="text-slate-400 mt-2 line-clamp-2 italic">
                &ldquo;{fixture.fullRawText}&rdquo;
              </p>
              <div className="mt-2 text-[11px] text-slate-500 flex justify-between">
                <span>Words: {fixture.words.length}</span>
                <span>Timing: integer ms</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Implementation Roadmap */}
      <div className="mt-8 bg-slate-900/90 border border-slate-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <span>📋</span> Implementation Roadmap & Gates
        </h2>
        <ol className="mt-4 space-y-3 text-sm">
          <li className="flex items-start gap-3 text-emerald-400">
            <span className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-xs shrink-0 mt-0.5">
              ✓
            </span>
            <div>
              <span className="font-semibold text-white">Phase 0: Inspection & Setup (Current)</span>
              <p className="text-slate-400 text-xs mt-0.5">
                Repo inspected, types/schemas defined, Zod env validation, local storage established, zero-credit mock isolation verified.
              </p>
            </div>
          </li>
          {[
            { phase: 1, title: "Upload & Media Validation", desc: "Build upload UI, duration/size check with ffprobe, safe project creation." },
            { phase: 2, title: "FFmpeg Audio Extraction", desc: "Extract mono WAV, record audio metadata, visible error handling." },
            { phase: 3, title: "Mock Pipeline & Provider Interfaces", desc: "Provider boundaries, deterministic fixtures, exact index validation." },
            { phase: 4, title: "Caption Grouping & SRT Export", desc: "Natural pauses, line length, two-line limit, reading speed, valid SRT." },
            { phase: 5, title: "Editor Interface & Persistence", desc: "Video sync, cue list, word editing, split/merge, timing controls." },
            { phase: 6, title: "Style & Burn-in (Stretch)", desc: "Style presets, Indic Noto fonts, ASS generation, FFmpeg burn-in." },
            { phase: 7, title: "Real API Integration (Explicit Approval Only)", desc: "Safe Gnani adapter with credit warning, disabled by default." },
            { phase: 8, title: "Hardening & Demo Preparation", desc: "Boundary tests, noisy states, fast speech, safe deletion." },
          ].map((item) => (
            <li key={item.phase} className="flex items-start gap-3 text-slate-500">
              <span className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs shrink-0 mt-0.5 text-slate-400">
                {item.phase}
              </span>
              <div>
                <span className="font-medium text-slate-300">Phase {item.phase}: {item.title}</span>
                <p className="text-slate-500 text-xs mt-0.5">{item.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </main>
  );
}
