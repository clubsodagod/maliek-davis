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
};

export type JiraSubtaskInput = {
  ref: string;
  summary: string;
  description?: string;
};

export type JiraTaskInput = {
  ref: string;
  summary: string;
  description?: string;
  links?: JiraIssueLinkInput[];
  subtasks?: JiraSubtaskInput[];
};

export type JiraWorkstreamInput = {
  ref: string;
  summary: string;
  description?: string;
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

export type JiraProjectSummary = {
  key: string;
  name: string;
  description?: string;
};

export type JiraProjectSummaryList = JiraProjectSummary[];
