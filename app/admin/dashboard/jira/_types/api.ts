import type {
  JiraProjectTypeKey,
  JiraWorkflowSelectionId,
} from "../_config/projectOptions";
export type {
  JiraProjectTypeKey,
  JiraWorkflowSelectionId,
} from "../_config/projectOptions";

export type ApiSuccess<T> = {
  success: true;
  data: T;
  requestId: string;
};

export type ApiFailure = {
  success: false;
  error: {
    code: string;
    message: string;
    fieldErrors?: Record<string, string[]>;
    retryable: boolean;
  };
  requestId: string;
};

export type ApiResult<T> = ApiSuccess<T> | ApiFailure;

export type JiraWorkflowMode = "skip" | "create" | "update";
export type JiraWorkflowResultMode = JiraWorkflowMode | JiraWorkflowSelectionId;
export type ExistingProjectPolicy = "reuse" | "fail";

export type JiraIssueReference = {
  id: string;
  key: string;
  summary: string;
};

export type JiraCompletedLink = {
  id: string;
  type: string;
  inwardIssueKey: string;
  outwardIssueKey: string;
};

export type JiraSetupState = {
  workstreams: Record<string, JiraIssueReference>;
  tasks: Record<string, JiraIssueReference>;
  subtasks: Record<string, JiraIssueReference>;
  completedLinks: JiraCompletedLink[];
};

export type JiraIssueLinkInput = {
  ref: string;
  type: string;
  inwardRef: string;
  outwardRef: string;
  sourceRef?: string;
  relationship?: string;
  reason?: string;
  category?: string;
};

export type JiraSubtaskInput = {
  ref: string;
  summary: string;
  description?: string;
  issueType?: string;
  priority?: string;
  labels?: string[];
  dueDate?: string;
};

export type JiraTaskInput = {
  ref: string;
  summary: string;
  description?: string;
  issueType?: string;
  priority?: string;
  labels?: string[];
  dueDate?: string;
  links?: JiraIssueLinkInput[];
  subtasks?: JiraSubtaskInput[];
};

export type JiraWorkstreamInput = {
  ref: string;
  summary: string;
  description?: string;
  issueType?: string;
  priority?: string;
  labels?: string[];
  targetStartDate?: string;
  targetEndDate?: string;
  dueDate?: string;
  links?: JiraIssueLinkInput[];
  tasks?: JiraTaskInput[];
};

export type JiraProjectSetupRequest = {
  project: {
    key: string;
    name: string;
    projectTypeKey: JiraProjectTypeKey;
    projectTemplateKey: string;
    createIfMissing?: boolean;
    existingProjectPolicy?: ExistingProjectPolicy;
  };
  issueHierarchy: {
    workstreamIssueType: string;
    taskIssueType: string;
    subtaskIssueType: string;
    createMissingIssueTypes?: boolean;
  };
  workflow: {
    id: JiraWorkflowSelectionId;
  };
  workstreams: JiraWorkstreamInput[];
};

export type JiraSetupStatus = "draft";

export type JiraSetupRecord = {
  id: string;
  ownerUserId: string;
  status: JiraSetupStatus;
  request: JiraProjectSetupRequest;
  createdAt: string;
  updatedAt: string;
};

export type JiraSetupList = JiraSetupRecord[];

export type JiraSetupSummary = {
  id: string;
  ownerUserId: string;
  status: JiraSetupStatus;
  project: {
    key: string;
    name: string;
  };
  workstreamCount: number;
  createdAt: string;
  updatedAt: string;
};

export type JiraSetupSummaryList = JiraSetupSummary[];

export type JiraRunStatus = "queued" | "running" | "succeeded" | "failed";

export type JiraProjectReference = {
  id?: string;
  key: string;
  name?: string;
  self?: string;
};

export type JiraWorkflowResult = {
  mode: JiraWorkflowResultMode;
  selectionId?: JiraWorkflowSelectionId;
  selectionName?: string;
  statusesCreatedOrUpdated: string[];
  workflowsCreatedOrUpdated: string[];
  workflowSchemeId?: string;
  retainedTemplateWorkflow?: boolean;
  workflowSchemeAssignment?: "not-applicable" | "assigned" | "failed";
};

export type JiraRunProgressPhase =
  | "queued"
  | "preflight"
  | "workstreams"
  | "tasks"
  | "subtasks"
  | "links"
  | "report"
  | "complete";

export type JiraRunProgressItemKind = "workstream" | "task" | "subtask" | "link";

export type JiraRunProgressItemStatus =
  | "pending"
  | "running"
  | "created"
  | "skipped"
  | "failed"
  | "denied";

export type JiraRunProgressCounts = {
  total: number;
  pending: number;
  running: number;
  created: number;
  skipped: number;
  failed: number;
  denied: number;
};

export type JiraRunProgressItem = {
  id: string;
  kind: JiraRunProgressItemKind;
  ref: string;
  summary?: string;
  issueType?: string;
  targetRef?: string;
  status: JiraRunProgressItemStatus;
  jiraKey?: string;
  error?: string;
  updatedAt: string;
};

export type JiraRunProgressCurrentItem = {
  kind: JiraRunProgressItemKind;
  ref: string;
  summary?: string;
  issueType?: string;
  targetRef?: string;
};

export type JiraRunProgressEvent = {
  id: string;
  type:
    | "run_started"
    | "phase_started"
    | "item_started"
    | "item_created"
    | "item_skipped"
    | "item_failed"
    | "phase_completed"
    | "run_succeeded"
    | "run_failed";
  runId: string;
  phase: JiraRunProgressPhase;
  item?: JiraRunProgressItem;
  counts: Record<JiraRunProgressItemKind, JiraRunProgressCounts>;
  message?: string;
  createdAt: string;
};

export type JiraRunProgress = {
  phase: JiraRunProgressPhase;
  counts: Record<JiraRunProgressItemKind, JiraRunProgressCounts>;
  items: Record<string, JiraRunProgressItem>;
  currentItem?: JiraRunProgressCurrentItem;
  lastEvent?: JiraRunProgressEvent;
  failure?: {
    message: string;
    ref?: string;
    phase: JiraRunProgressPhase;
    failedAt: string;
    errorLogId?: string;
  };
  startedAt?: string;
  updatedAt: string;
  completedAt?: string;
};

export type JiraRunRecord = {
  id: string;
  setupId: string;
  ownerUserId: string;
  status: JiraRunStatus;
  state?: JiraSetupState;
  jiraProject?: JiraProjectReference;
  workflowResult?: JiraWorkflowResult;
  report?: string;
  error?: string;
  errorLogId?: string;
  progress?: JiraRunProgress;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
};

export type JiraValidationResult = {
  valid: true;
};

export type JiraHealthResult = {
  ok: boolean;
};

export type JiraCredentialStatus = {
  configured: boolean;
  accountId?: string;
  displayName?: string;
  verifiedAt?: string;
  missingFields: ("siteUrl" | "email" | "apiToken" | "accountId")[];
};

export type JiraCredentialSaveInput = {
  siteUrl: string;
  email: string;
  apiToken: string;
};

export type JiraCredentialVerification = {
  accountId: string;
  displayName?: string;
  emailAddress?: string;
};

export type JiraProjectSummary = {
  key: string;
  name: string;
  description?: string;
};

export type JiraProjectSummaryList = JiraProjectSummary[];
