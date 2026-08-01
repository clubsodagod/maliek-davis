export type WorkStatusSlug =
  | "backlog"
  | "to-do"
  | "ready"
  | "in-progress"
  | "blocked"
  | "review"
  | "done";

export type WorkStatusName =
  | "Backlog"
  | "Todo"
  | "Ready"
  | "In Progress"
  | "Blocked"
  | "Review"
  | "Done";

export type TaskTypeSlug = "workstream" | "task" | "subtask";

export const WORK_STATUS_BY_SLUG = {
  backlog: "Backlog",
  "to-do": "Todo",
  ready: "Ready",
  "in-progress": "In Progress",
  blocked: "Blocked",
  review: "Review",
  done: "Done",
} as const satisfies Record<WorkStatusSlug, WorkStatusName>;

export const WORK_STATUS_OPTIONS = [
  { slug: "backlog", label: "Backlog" },
  { slug: "to-do", label: "Todo" },
  { slug: "ready", label: "Ready" },
  { slug: "in-progress", label: "In Progress" },
  { slug: "blocked", label: "Blocked" },
  { slug: "review", label: "Review" },
  { slug: "done", label: "Done" },
] as const satisfies readonly {
  slug: WorkStatusSlug;
  label: WorkStatusName;
}[];

export const TASK_TYPE_OPTIONS = [
  { slug: "workstream", label: "Workstreams" },
  { slug: "task", label: "Tasks" },
  { slug: "subtask", label: "Subtasks" },
] as const satisfies readonly {
  slug: TaskTypeSlug;
  label: string;
}[];

export const DEFAULT_WORK_STATUS_SLUG: WorkStatusSlug = "ready";
export const DEFAULT_WORK_SORT = "recommended";
