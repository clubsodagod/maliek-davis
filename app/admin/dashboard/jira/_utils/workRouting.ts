import {
  DEFAULT_WORK_STATUS_SLUG,
  TASK_TYPE_OPTIONS,
  WORK_STATUS_BY_SLUG,
  WORK_STATUS_OPTIONS,
  type TaskTypeSlug,
  type WorkStatusName,
  type WorkStatusSlug,
} from "../_config/workManagement";

const TASK_TYPE_SLUGS = new Set<string>(
  TASK_TYPE_OPTIONS.map((option) => option.slug),
);
const WORK_STATUS_SLUGS = new Set<string>(
  WORK_STATUS_OPTIONS.map((option) => option.slug),
);

export function normalizeProjectKeySlug(value: string): string {
  return decodeURIComponent(value).trim().toUpperCase();
}

export function normalizeTaskTypeSlug(value: string): TaskTypeSlug | null {
  const normalized = decodeURIComponent(value).trim().toLowerCase();
  return TASK_TYPE_SLUGS.has(normalized) ? (normalized as TaskTypeSlug) : null;
}

export function normalizeWorkStatusSlug(value: string): WorkStatusSlug | null {
  const normalized = decodeURIComponent(value).trim().toLowerCase();
  return WORK_STATUS_SLUGS.has(normalized) ? (normalized as WorkStatusSlug) : null;
}

export function workStatusNameFromSlug(slug: WorkStatusSlug): WorkStatusName {
  return WORK_STATUS_BY_SLUG[slug];
}

export function projectJiraPath(projectKey: string): string {
  return `/admin/dashboard/jira/${encodeURIComponent(projectKey)}`;
}

export function projectWorkPath(projectKey: string): string {
  return `${projectJiraPath(projectKey)}/work`;
}

export function taskTypeWorkPath(projectKey: string, taskType: TaskTypeSlug): string {
  return `${projectWorkPath(projectKey)}/${taskType}`;
}

export function statusWorkPath(
  projectKey: string,
  taskType: TaskTypeSlug,
  status: WorkStatusSlug = DEFAULT_WORK_STATUS_SLUG,
): string {
  return `${taskTypeWorkPath(projectKey, taskType)}/${status}`;
}

export function questionSearchParam(issueId: string): string {
  return `question=${encodeURIComponent(issueId)}`;
}
