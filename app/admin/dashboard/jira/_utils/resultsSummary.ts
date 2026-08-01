import type { JiraRunRecord, JiraSetupRecord } from "../_types";
import { getJiraRunProgress } from "./runProgress";
import { getJiraHierarchyStats } from "./setupBuilder";

export type JiraResultsMetrics = {
  plannedIssues: number;
  plannedOperations: number;
  createdIssues: number;
  createdWorkstreams: number;
  createdTasks: number;
  createdSubtasks: number;
  completedLinks: number;
  completionPercentage: number;
};

function recordCount<T>(records: Record<string, T> | undefined): number {
  return Object.keys(records ?? {}).length;
}

export function getJiraResultsMetrics(
  setup: JiraSetupRecord,
  run?: JiraRunRecord,
): JiraResultsMetrics {
  const stats = getJiraHierarchyStats(setup.request.workstreams);
  const progress = getJiraRunProgress(setup, run);
  const createdWorkstreams = recordCount(run?.state?.workstreams);
  const createdTasks = recordCount(run?.state?.tasks);
  const createdSubtasks = recordCount(run?.state?.subtasks);
  const completedLinks = run?.state?.completedLinks.length ?? 0;

  return {
    plannedIssues: stats.workstreams + stats.tasks + stats.subtasks,
    plannedOperations:
      stats.workstreams + stats.tasks + stats.subtasks + stats.links,
    createdIssues: createdWorkstreams + createdTasks + createdSubtasks,
    createdWorkstreams,
    createdTasks,
    createdSubtasks,
    completedLinks,
    completionPercentage: progress.percentage,
  };
}
