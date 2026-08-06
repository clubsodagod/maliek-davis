import type { JiraRunRecord, JiraSetupRecord } from "../_types";
import { getJiraHierarchyStats } from "./setupBuilder";

export type JiraRunProgressStage =
  | "idle"
  | "queued"
  | "creating_workstreams"
  | "creating_tasks"
  | "creating_subtasks"
  | "linking_issues"
  | "finalizing"
  | "completed"
  | "failed";

export type JiraRunProgressSummary = {
  stage: JiraRunProgressStage;
  statusLabel: string;
  currentOperation: string;
  completedCount: number;
  totalCount: number;
  failedCount: number;
  skippedCount: number;
  percentage: number;
  isTerminal: boolean;
  errorLogId?: string;
  failure?: {
    message: string;
    phase: string;
    ref?: string;
    failedAt?: string;
    errorLogId?: string;
  };
};

function clampPercentage(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(100, Math.round(value)));
}

function calculatePercentage(completedCount: number, totalCount: number): number {
  if (totalCount === 0) return 0;
  return clampPercentage((completedCount / totalCount) * 100);
}

function countCompletedIssues(
  run: JiraRunRecord | undefined,
  issueGroup: "workstreams" | "tasks" | "subtasks",
): number {
  return Object.keys(run?.state?.[issueGroup] ?? {}).length;
}

function getCompletedCount(run: JiraRunRecord | undefined): number {
  const progressCount = sumProgressCount(run, "created") + sumProgressCount(run, "skipped");
  if (progressCount > 0) return progressCount;

  return (
    countCompletedIssues(run, "workstreams") +
    countCompletedIssues(run, "tasks") +
    countCompletedIssues(run, "subtasks") +
    (run?.state?.completedLinks.length ?? 0)
  );
}

function sumProgressCount(
  run: JiraRunRecord | undefined,
  status: "created" | "failed" | "skipped",
): number {
  const counts = run?.progress?.counts;
  if (!counts) return 0;

  return Object.values(counts).reduce((total, item) => total + item[status], 0);
}

function totalProgressCount(run: JiraRunRecord | undefined): number | undefined {
  const counts = run?.progress?.counts;
  if (!counts) return undefined;

  return Object.values(counts).reduce((total, item) => total + item.total, 0);
}

function formatBackendPhase(phase: string | undefined): string {
  if (!phase) return "setup";

  return phase
    .replace(/_/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function getFailureSummary(run: JiraRunRecord): JiraRunProgressSummary["failure"] {
  const failure = run.progress?.failure;
  if (failure) {
    return {
      message: failure.message,
      phase: failure.phase,
      ref: failure.ref,
      failedAt: failure.failedAt,
      errorLogId: failure.errorLogId ?? run.errorLogId,
    };
  }

  if (!run.error) return undefined;

  return {
    message: run.error,
    phase: run.progress?.phase ?? "setup",
    errorLogId: run.errorLogId,
  };
}

function getRunningStage(
  setup: JiraSetupRecord,
  run: JiraRunRecord,
): Pick<JiraRunProgressSummary, "stage" | "statusLabel" | "currentOperation"> {
  const stats = getJiraHierarchyStats(setup.request.workstreams);
  const completedWorkstreams = countCompletedIssues(run, "workstreams");
  const completedTasks = countCompletedIssues(run, "tasks");
  const completedSubtasks = countCompletedIssues(run, "subtasks");
  const completedLinks = run.state?.completedLinks.length ?? 0;

  if (completedWorkstreams < stats.workstreams) {
    return {
      stage: "creating_workstreams",
      statusLabel: "Running",
      currentOperation: "Creating workstreams",
    };
  }

  if (completedTasks < stats.tasks) {
    return {
      stage: "creating_tasks",
      statusLabel: "Running",
      currentOperation: "Creating tasks",
    };
  }

  if (completedSubtasks < stats.subtasks) {
    return {
      stage: "creating_subtasks",
      statusLabel: "Running",
      currentOperation: "Creating subtasks",
    };
  }

  if (completedLinks < stats.links) {
    return {
      stage: "linking_issues",
      statusLabel: "Running",
      currentOperation: "Linking issues",
    };
  }

  return {
    stage: "finalizing",
    statusLabel: "Running",
    currentOperation: "Finalizing",
  };
}

/**
 * Derives display progress from the persisted setup input and run state.
 *
 * @param setup - Persisted setup record used as the source of expected totals.
 * @param run - Optional persisted run record returned by the automation server.
 * @returns UI-ready progress counts, labels, and terminal status.
 */
export function getJiraRunProgress(
  setup: JiraSetupRecord,
  run?: JiraRunRecord,
): JiraRunProgressSummary {
  const stats = getJiraHierarchyStats(setup.request.workstreams);
  const totalCount =
    totalProgressCount(run) ?? stats.workstreams + stats.tasks + stats.subtasks + stats.links;
  const completedCount = getCompletedCount(run);

  if (!run) {
    return {
      stage: "idle",
      statusLabel: "Ready",
      currentOperation: "Ready to start",
      completedCount: 0,
      totalCount,
      failedCount: 0,
      skippedCount: 0,
      percentage: 0,
      isTerminal: false,
    };
  }

  if (run.status === "queued") {
    return {
      stage: "queued",
      statusLabel: "Queued",
      currentOperation: "Queued",
      completedCount,
      totalCount,
      failedCount: 0,
      skippedCount: sumProgressCount(run, "skipped"),
      percentage: calculatePercentage(completedCount, totalCount),
      isTerminal: false,
      errorLogId: run.errorLogId,
    };
  }

  if (run.status === "succeeded") {
    return {
      stage: "completed",
      statusLabel: "Completed",
      currentOperation: "Completed",
      completedCount: totalCount,
      totalCount,
      failedCount: 0,
      skippedCount: sumProgressCount(run, "skipped"),
      percentage: 100,
      isTerminal: true,
      errorLogId: run.errorLogId,
    };
  }

  if (run.status === "failed") {
    const failure = getFailureSummary(run);
    const failedCount = sumProgressCount(run, "failed");
    return {
      stage: "failed",
      statusLabel: "Failed",
      currentOperation: `Failed during ${formatBackendPhase(failure?.phase)}`,
      completedCount,
      totalCount,
      failedCount: failedCount === 0 ? 1 : failedCount,
      skippedCount: sumProgressCount(run, "skipped"),
      percentage: calculatePercentage(completedCount, totalCount),
      isTerminal: true,
      errorLogId: run.errorLogId ?? failure?.errorLogId,
      failure,
    };
  }

  const runningStage = getRunningStage(setup, run);

  return {
    ...runningStage,
    completedCount,
    totalCount,
    failedCount: 0,
    skippedCount: sumProgressCount(run, "skipped"),
    percentage: calculatePercentage(completedCount, totalCount),
    isTerminal: false,
    errorLogId: run.errorLogId,
  };
}
