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
  return (
    countCompletedIssues(run, "workstreams") +
    countCompletedIssues(run, "tasks") +
    countCompletedIssues(run, "subtasks") +
    (run?.state?.completedLinks.length ?? 0)
  );
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
    stats.workstreams + stats.tasks + stats.subtasks + stats.links;
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
      skippedCount: 0,
      percentage: calculatePercentage(completedCount, totalCount),
      isTerminal: false,
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
      skippedCount: 0,
      percentage: 100,
      isTerminal: true,
    };
  }

  if (run.status === "failed") {
    return {
      stage: "failed",
      statusLabel: "Failed",
      currentOperation: "Failed",
      completedCount,
      totalCount,
      failedCount: 1,
      skippedCount: 0,
      percentage: calculatePercentage(completedCount, totalCount),
      isTerminal: true,
    };
  }

  const runningStage = getRunningStage(setup, run);

  return {
    ...runningStage,
    completedCount,
    totalCount,
    failedCount: 0,
    skippedCount: 0,
    percentage: calculatePercentage(completedCount, totalCount),
    isTerminal: false,
  };
}
