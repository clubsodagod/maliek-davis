import type {
  TaskTypeSlug,
  WorkStatusName,
  WorkStatusSlug,
} from "../_config/workManagement";

export type SynchronizationState =
  | "synced"
  | "pending"
  | "failed"
  | "unavailable"
  | "not_configured";

export type SynchronizationHealth = {
  jira: SynchronizationState;
  confluence: SynchronizationState;
  message?: string;
  updatedAt?: string;
};

export type OwnershipView = {
  assignee?: string;
  owner?: string;
  reviewer?: string;
  blockerOwner?: string;
  gaps: string[];
};

export type RecommendedAction = {
  kind:
    | "answer-question"
    | "complete-answer"
    | "review-task"
    | "review-project"
    | "inspect-blocker"
    | "none";
  label: string;
  priority: "low" | "medium" | "high";
  href?: string;
};

export type WorkItemContext = {
  ref: string;
  issueKey?: string;
  summary: string;
};

export type TaskProgressView = {
  completed: number;
  total: number;
  label: string;
};

export type WorkQueueItem = {
  ref: string;
  issueId: string;
  issueKey: string;
  summary: string;
  issueType: string;
  issueTypeSlug: TaskTypeSlug;
  status: WorkStatusName;
  statusSlug: WorkStatusSlug;
  priority?: string;
  parent?: WorkItemContext;
  workstream?: WorkItemContext;
  dueDate?: string;
  overdue: boolean;
  scheduleRisk: boolean;
  progress: TaskProgressView;
  dependencySummary?: string;
  blockerSummary?: string;
  ownership: OwnershipView;
  synchronizationHealth: SynchronizationHealth;
  recommendedAction: RecommendedAction;
  version: string;
  updatedAt?: string;
};

export type ProjectSummaryView = {
  project: {
    key: string;
    name: string;
    description?: string;
  };
  setupId: string;
  runId?: string;
  overallCompletion: TaskProgressView;
  workstreamProgress: WorkQueueItem[];
  statusDistribution: {
    status: WorkStatusName;
    statusSlug: WorkStatusSlug;
    count: number;
  }[];
  readyWorkCount: number;
  overdueCount: number;
  scheduleRiskCount: number;
  criticalBlockers: WorkQueueItem[];
  ownershipGapsCount: number;
  reviewsAwaitingActionCount: number;
  synchronizationHealth: SynchronizationHealth;
  recentlyActiveWork: WorkQueueItem[];
  recommendedNextActions: RecommendedAction[];
};

export type WorkQueueView = {
  project: {
    key: string;
    name: string;
  };
  filters: {
    statusSlug: WorkStatusSlug;
    status: WorkStatusName;
    taskTypeSlug?: TaskTypeSlug;
    search?: string;
    sort: string;
  };
  counts: {
    total: number;
    byStatus: ProjectSummaryView["statusDistribution"];
    byTaskType: {
      taskTypeSlug: TaskTypeSlug;
      label: string;
      count: number;
    }[];
  };
  items: WorkQueueItem[];
  synchronizationHealth: SynchronizationHealth;
  partialSynchronization: boolean;
};

export type EvidenceLink = {
  label: string;
  url: string;
};

export type AnswerValidationResult = {
  passed: boolean;
  errors: string[];
  warnings: string[];
  validatedAt?: string;
};

export type AnswerStatus = "not_started" | "draft" | "validated" | "completed";

export type AnswerView = {
  issueIdOrKey: string;
  version: number;
  status: AnswerStatus;
  answer: string;
  evidence: EvidenceLink[];
  validation: AnswerValidationResult;
  lastEditorUserId?: string;
  updatedAt?: string;
  completedAt?: string;
};

export type SubtaskQuestionView = {
  project: {
    key: string;
    name: string;
  };
  issue: WorkQueueItem;
  parentTask: WorkQueueItem;
  workstream: WorkQueueItem;
  question: {
    objective?: string;
    question: string;
    guidance: string[];
    deliverable?: string;
    acceptanceCriteria: string[];
    evidenceRequirements: string[];
  };
  answer: AnswerView;
  queue: {
    position: number;
    total: number;
    previousIssueId?: string;
    nextIssueId?: string;
  };
  taskProgress: TaskProgressView;
  synchronizationHealth: SynchronizationHealth;
};

export type AnswerSaveRequest = {
  version: number;
  answer: string;
  evidence: EvidenceLink[];
};

export type AnswerValidationRequest = {
  version: number;
  answer?: string;
  evidence?: EvidenceLink[];
};

export type AnswerCompletionRequest = {
  version: number;
};
