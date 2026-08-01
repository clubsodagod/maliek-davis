import { z } from "zod";
import {
  jiraIssueLinkSchema,
  jiraProjectSetupRequestSchema,
  jiraWorkstreamSchema,
} from "../_schemas";
import type {
  JiraIssueLinkInput,
  JiraProjectSetupRequest,
  JiraSubtaskInput,
  JiraTaskInput,
  JiraWorkstreamInput,
} from "../_types";
import {
  DEFAULT_JIRA_PROJECT_TEMPLATE_ID,
  DEFAULT_JIRA_WORKFLOW_SELECTION_ID,
  getJiraProjectTemplateById,
  getWorkflowIncompatibilityReason,
  type JiraProjectTemplateId,
  type JiraWorkflowSelectionId,
} from "../_config/projectOptions";

export type JiraProjectSetupDraft = {
  projectKey: string;
  projectName: string;
  projectTemplateId: JiraProjectTemplateId;
  createIfMissing: boolean;
  workstreamIssueType: string;
  taskIssueType: string;
  subtaskIssueType: string;
  createMissingIssueTypes: boolean;
  workflowId: JiraWorkflowSelectionId;
};

export type JiraHierarchyStats = {
  workstreams: number;
  tasks: number;
  subtasks: number;
  links: number;
};

export type JiraProjectSummary = {
  key: string;
  name: string;
};

export type JiraAutomationReadiness =
  | {
      status: "ready";
    }
  | {
      status: "unavailable";
      message: string;
    };

export type JiraBuilderValidationIssue = {
  path: string;
  message: string;
};

export type JiraHierarchyImportResult =
  | {
      success: true;
      workstreams: JiraWorkstreamInput[];
      stats: JiraHierarchyStats;
    }
  | {
      success: false;
      issues: JiraBuilderValidationIssue[];
    };

export type JiraSetupBuilderReadiness = {
  hasCheckedProjectKey: boolean;
  hasImportedHierarchy: boolean;
  localIssueCount: number;
  isPending: boolean;
  automationReady?: boolean;
};

export type JiraAutosaveAttemptState = {
  signature: string;
  lastSavedSignature: string | null;
  lastFailedSignature: string | null;
};

export type JiraStagedTaskInput = JiraTaskInput & {
  workstreamRef: string;
};

export type JiraStagedSubtaskInput = JiraSubtaskInput & {
  taskRef: string;
};

export type JiraStagedSetupImports = {
  workstreams: JiraWorkstreamInput[];
  workstreamLinks: JiraIssueLinkInput[];
  tasks: JiraStagedTaskInput[];
  taskLinks: JiraIssueLinkInput[];
  subtasks: JiraStagedSubtaskInput[];
};

export type JiraImportStageKey =
  | "workstreams"
  | "workstreamLinks"
  | "tasks"
  | "taskLinks"
  | "subtasks";

export type JiraStageImportResult<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      issues: JiraBuilderValidationIssue[];
    };

const jiraWorkstreamArraySchema = z.array(jiraWorkstreamSchema);
const jiraIssueLinkArraySchema = z.array(jiraIssueLinkSchema);
const stageRefSchema = z.string().trim().min(1).max(120);
const stageSummarySchema = z.string().trim().min(1).max(255);
const stageDescriptionSchema = z.string().max(10_000).optional();
const jiraStagedTaskArraySchema = z.array(
  z.object({
    ref: stageRefSchema,
    workstreamRef: stageRefSchema,
    summary: stageSummarySchema,
    description: stageDescriptionSchema,
  }),
);
const jiraStagedSubtaskArraySchema = z.array(
  z.object({
    ref: stageRefSchema,
    taskRef: stageRefSchema,
    summary: stageSummarySchema,
    description: stageDescriptionSchema,
  }),
);

export const defaultJiraProjectSetupDraft: JiraProjectSetupDraft = {
  projectKey: "",
  projectName: "",
  projectTemplateId: DEFAULT_JIRA_PROJECT_TEMPLATE_ID,
  createIfMissing: true,
  workstreamIssueType: "Workstream",
  taskIssueType: "Task",
  subtaskIssueType: "Sub-task",
  createMissingIssueTypes: false,
  workflowId: DEFAULT_JIRA_WORKFLOW_SELECTION_ID,
};

export const emptyJiraStagedSetupImports: JiraStagedSetupImports = {
  workstreams: [],
  workstreamLinks: [],
  tasks: [],
  taskLinks: [],
  subtasks: [],
};

function formatPath(path: PropertyKey[]): string {
  if (path.length === 0) return "root";
  return path.map((part) => String(part)).join(".");
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function zodIssuesToBuilderIssues(
  issues: z.core.$ZodIssue[],
): JiraBuilderValidationIssue[] {
  return issues.map((issue) => ({
    path: formatPath(issue.path),
    message: issue.message,
  }));
}

export function buildJiraProjectSetupRequest(
  draft: JiraProjectSetupDraft,
  workstreams: JiraWorkstreamInput[],
): JiraProjectSetupRequest {
  const template = getJiraProjectTemplateById(draft.projectTemplateId);

  return {
    project: {
      key: draft.projectKey.trim(),
      name: draft.projectName.trim(),
      projectTypeKey: template.projectTypeKey,
      projectTemplateKey: template.projectTemplateKey,
      createIfMissing: draft.createIfMissing,
      existingProjectPolicy: "fail",
    },
    issueHierarchy: {
      workstreamIssueType: draft.workstreamIssueType.trim(),
      taskIssueType: draft.taskIssueType.trim(),
      subtaskIssueType: draft.subtaskIssueType.trim(),
      createMissingIssueTypes: draft.createMissingIssueTypes,
    },
    workflow: {
      id: draft.workflowId,
    },
    workstreams,
  };
}

export function getJiraWorkflowSelectionState(
  templateId: JiraProjectTemplateId,
  workflowId: JiraWorkflowSelectionId,
): { disabled: boolean; reason?: string } {
  const reason = getWorkflowIncompatibilityReason(templateId, workflowId);

  return reason === undefined
    ? { disabled: false }
    : { disabled: true, reason };
}

export function generateJiraProjectKeyFromName(projectName: string): string {
  const words = projectName.match(/[A-Za-z0-9]+/g) ?? [];
  return words.map((word) => word[0]?.toUpperCase() ?? "").join("");
}

export function findJiraProjectSummaryConflict(
  projectName: string,
  projectKey: string,
  projectSummaries: JiraProjectSummary[],
): JiraProjectSummary | null {
  const normalizedName = projectName.trim().toLowerCase();
  const normalizedKey = projectKey.trim().toUpperCase();

  return (
    projectSummaries.find(
      (summary) =>
        summary.key.trim().toUpperCase() === normalizedKey ||
        summary.name.trim().toLowerCase() === normalizedName,
    ) ?? null
  );
}

export function getJiraHierarchyStats(
  workstreams: JiraWorkstreamInput[],
): JiraHierarchyStats {
  return workstreams.reduce<JiraHierarchyStats>(
    (stats, workstream) => {
      const tasks = workstream.tasks ?? [];
      const taskSubtasks = tasks.reduce(
        (count, task) => count + (task.subtasks?.length ?? 0),
        0,
      );
      const taskLinks = tasks.reduce(
        (count, task) => count + (task.links?.length ?? 0),
        0,
      );

      return {
        workstreams: stats.workstreams + 1,
        tasks: stats.tasks + tasks.length,
        subtasks: stats.subtasks + taskSubtasks,
        links: stats.links + (workstream.links?.length ?? 0) + taskLinks,
      };
    },
    {
      workstreams: 0,
      tasks: 0,
      subtasks: 0,
      links: 0,
    },
  );
}

export function canAutosaveJiraSetupBuilder(
  readiness: JiraSetupBuilderReadiness,
): boolean {
  return (
    (readiness.automationReady ?? true) &&
    readiness.hasCheckedProjectKey &&
    readiness.hasImportedHierarchy &&
    readiness.localIssueCount === 0 &&
    !readiness.isPending
  );
}

export function canPreviewJiraSetupBuilder(
  readiness: Omit<JiraSetupBuilderReadiness, "isPending">,
): boolean {
  return (
    (readiness.automationReady ?? true) &&
    readiness.hasCheckedProjectKey &&
    readiness.hasImportedHierarchy &&
    readiness.localIssueCount === 0
  );
}

export function shouldAttemptJiraAutosave(
  state: JiraAutosaveAttemptState,
): boolean {
  return (
    state.signature !== state.lastSavedSignature &&
    state.signature !== state.lastFailedSignature
  );
}

export function getJiraStagePreviewData(
  imports: JiraStagedSetupImports,
  stage: JiraImportStageKey,
):
  | JiraWorkstreamInput[]
  | JiraIssueLinkInput[]
  | JiraStagedTaskInput[]
  | JiraStagedSubtaskInput[]
  | null {
  const data = imports[stage];
  return data.length > 0 ? data : null;
}

function parseStageJson(text: string): JiraStageImportResult<unknown> {
  try {
    return {
      success: true,
      data: JSON.parse(text),
    };
  } catch {
    return {
      success: false,
      issues: [
        {
          path: "json",
          message: "The import JSON could not be parsed.",
        },
      ],
    };
  }
}

function extractStageArray(value: unknown, keys: string[]): unknown {
  if (Array.isArray(value)) return value;

  if (!isRecord(value)) return undefined;

  const matchingKey = keys.find((key) => Array.isArray(value[key]));
  return matchingKey ? value[matchingKey] : undefined;
}

function refSet(values: string[]): Set<string> {
  return new Set(values.map((value) => value.trim()));
}

function taskRefs(tasks: JiraStagedTaskInput[]): Set<string> {
  return refSet(tasks.map((task) => task.ref));
}

export function parseJiraWorkstreamStageJson(
  text: string,
): JiraStageImportResult<JiraWorkstreamInput[]> {
  const parsedJson = parseStageJson(text);
  if (!parsedJson.success) return parsedJson;

  const workstreams = extractStageArray(parsedJson.data, ["workstreams"]);
  const parsedWorkstreams = jiraWorkstreamArraySchema.safeParse(workstreams);

  if (!parsedWorkstreams.success) {
    return {
      success: false,
      issues: zodIssuesToBuilderIssues(parsedWorkstreams.error.issues),
    };
  }

  const stageWorkstreams = parsedWorkstreams.data.map(
    ({ ref, summary, description }) => ({
      ref,
      summary,
      ...(description === undefined ? {} : { description }),
    }),
  );
  const issues = validateJiraGeneratedHierarchy(stageWorkstreams);

  if (issues.length > 0) {
    return {
      success: false,
      issues,
    };
  }

  return {
    success: true,
    data: stageWorkstreams,
  };
}

export function parseJiraWorkstreamLinkStageJson(
  text: string,
  workstreams: JiraWorkstreamInput[],
): JiraStageImportResult<JiraIssueLinkInput[]> {
  const parsedJson = parseStageJson(text);
  if (!parsedJson.success) return parsedJson;

  const links = extractStageArray(parsedJson.data, ["workstreamLinks", "links"]);
  const parsedLinks = jiraIssueLinkArraySchema.safeParse(links);

  if (!parsedLinks.success) {
    return {
      success: false,
      issues: zodIssuesToBuilderIssues(parsedLinks.error.issues),
    };
  }

  const workstreamRefs = refSet(workstreams.map((workstream) => workstream.ref));
  const issues = parsedLinks.data.flatMap((link) => {
    const linkIssues: JiraBuilderValidationIssue[] = [];

    if (!workstreamRefs.has(link.inwardRef.trim())) {
      linkIssues.push({
        path: link.ref,
        message: `Workstream link target "${link.inwardRef}" cannot be resolved.`,
      });
    }

    if (!workstreamRefs.has(link.outwardRef.trim())) {
      linkIssues.push({
        path: link.ref,
        message: `Workstream link target "${link.outwardRef}" cannot be resolved.`,
      });
    }

    return linkIssues;
  });

  return issues.length > 0
    ? { success: false, issues }
    : { success: true, data: parsedLinks.data };
}

export function parseJiraTaskStageJson(
  text: string,
  workstreams: JiraWorkstreamInput[],
): JiraStageImportResult<JiraStagedTaskInput[]> {
  const parsedJson = parseStageJson(text);
  if (!parsedJson.success) return parsedJson;

  const tasks = extractStageArray(parsedJson.data, ["tasks"]);
  const parsedTasks = jiraStagedTaskArraySchema.safeParse(tasks);

  if (!parsedTasks.success) {
    return {
      success: false,
      issues: zodIssuesToBuilderIssues(parsedTasks.error.issues),
    };
  }

  const workstreamRefs = refSet(workstreams.map((workstream) => workstream.ref));
  const issues = parsedTasks.data
    .filter((task) => !workstreamRefs.has(task.workstreamRef.trim()))
    .map((task) => ({
      path: task.ref,
      message: `Task parent workstream "${task.workstreamRef}" cannot be resolved.`,
    }));

  return issues.length > 0
    ? { success: false, issues }
    : { success: true, data: parsedTasks.data };
}

export function parseJiraTaskLinkStageJson(
  text: string,
  tasks: JiraStagedTaskInput[],
): JiraStageImportResult<JiraIssueLinkInput[]> {
  const parsedJson = parseStageJson(text);
  if (!parsedJson.success) return parsedJson;

  const links = extractStageArray(parsedJson.data, ["taskLinks", "links"]);
  const parsedLinks = jiraIssueLinkArraySchema.safeParse(links);

  if (!parsedLinks.success) {
    return {
      success: false,
      issues: zodIssuesToBuilderIssues(parsedLinks.error.issues),
    };
  }

  const refs = taskRefs(tasks);
  const issues = parsedLinks.data.flatMap((link) => {
    const linkIssues: JiraBuilderValidationIssue[] = [];

    if (!refs.has(link.inwardRef.trim())) {
      linkIssues.push({
        path: link.ref,
        message: `Task link target "${link.inwardRef}" cannot be resolved.`,
      });
    }

    if (!refs.has(link.outwardRef.trim())) {
      linkIssues.push({
        path: link.ref,
        message: `Task link target "${link.outwardRef}" cannot be resolved.`,
      });
    }

    return linkIssues;
  });

  return issues.length > 0
    ? { success: false, issues }
    : { success: true, data: parsedLinks.data };
}

export function parseJiraSubtaskStageJson(
  text: string,
  tasks: JiraStagedTaskInput[],
): JiraStageImportResult<JiraStagedSubtaskInput[]> {
  const parsedJson = parseStageJson(text);
  if (!parsedJson.success) return parsedJson;

  const subtasks = extractStageArray(parsedJson.data, ["subtasks"]);
  const parsedSubtasks = jiraStagedSubtaskArraySchema.safeParse(subtasks);

  if (!parsedSubtasks.success) {
    return {
      success: false,
      issues: zodIssuesToBuilderIssues(parsedSubtasks.error.issues),
    };
  }

  const refs = taskRefs(tasks);
  const issues = parsedSubtasks.data
    .filter((subtask) => !refs.has(subtask.taskRef.trim()))
    .map((subtask) => ({
      path: subtask.ref,
      message: `Subtask parent task "${subtask.taskRef}" cannot be resolved.`,
    }));

  return issues.length > 0
    ? { success: false, issues }
    : { success: true, data: parsedSubtasks.data };
}

export function mergeJiraStagedSetupImports(
  imports: JiraStagedSetupImports,
): JiraWorkstreamInput[] {
  const workstreamMap = new Map<string, JiraWorkstreamInput>();
  const taskMap = new Map<string, JiraTaskInput>();

  imports.workstreams.forEach((workstream) => {
    workstreamMap.set(workstream.ref.trim(), {
      ref: workstream.ref,
      summary: workstream.summary,
      ...(workstream.description === undefined
        ? {}
        : { description: workstream.description }),
      links: [],
      tasks: [],
    });
  });

  imports.workstreamLinks.forEach((link) => {
    workstreamMap.get(link.inwardRef.trim())?.links?.push(link);
  });

  imports.tasks.forEach(({ workstreamRef, ...task }) => {
    const nextTask: JiraTaskInput = {
      ...task,
      links: [],
      subtasks: [],
    };
    taskMap.set(task.ref.trim(), nextTask);
    workstreamMap.get(workstreamRef.trim())?.tasks?.push(nextTask);
  });

  imports.taskLinks.forEach((link) => {
    taskMap.get(link.inwardRef.trim())?.links?.push(link);
  });

  imports.subtasks.forEach(({ taskRef, ...subtask }) => {
    taskMap.get(taskRef.trim())?.subtasks?.push(subtask);
  });

  return Array.from(workstreamMap.values());
}

export function collectJiraGeneratedRefs(
  workstreams: JiraWorkstreamInput[],
): string[] {
  return workstreams.flatMap((workstream) => [
    workstream.ref,
    ...(workstream.tasks ?? []).flatMap((task) => [
      task.ref,
      ...(task.subtasks ?? []).map((subtask) => subtask.ref),
    ]),
  ]);
}

function collectLinks(workstreams: JiraWorkstreamInput[]): JiraIssueLinkInput[] {
  return workstreams.flatMap((workstream) => [
    ...(workstream.links ?? []),
    ...(workstream.tasks ?? []).flatMap((task) => task.links ?? []),
  ]);
}

export function validateJiraGeneratedHierarchy(
  workstreams: JiraWorkstreamInput[],
): JiraBuilderValidationIssue[] {
  const shape = jiraWorkstreamArraySchema.safeParse(workstreams);
  const issues = shape.success ? [] : zodIssuesToBuilderIssues(shape.error.issues);
  const refs = collectJiraGeneratedRefs(workstreams);
  const refCounts = new Map<string, number>();

  refs.forEach((ref) => {
    const normalizedRef = ref.trim();
    refCounts.set(normalizedRef, (refCounts.get(normalizedRef) ?? 0) + 1);
  });

  refCounts.forEach((count, ref) => {
    if (count > 1) {
      issues.push({
        path: ref,
        message: `Duplicate generated ref "${ref}".`,
      });
    }
  });

  const refSet = new Set(refs.map((ref) => ref.trim()));

  collectLinks(workstreams).forEach((link) => {
    if (!refSet.has(link.inwardRef.trim())) {
      issues.push({
        path: link.ref,
        message: `Link target "${link.inwardRef}" cannot be resolved.`,
      });
    }

    if (!refSet.has(link.outwardRef.trim())) {
      issues.push({
        path: link.ref,
        message: `Link target "${link.outwardRef}" cannot be resolved.`,
      });
    }
  });

  return issues;
}

function extractWorkstreams(value: unknown): unknown {
  if (Array.isArray(value)) return value;

  if (isRecord(value) && "workstreams" in value) {
    return value.workstreams;
  }

  return undefined;
}

export function parseJiraGeneratedHierarchyJson(
  text: string,
): JiraHierarchyImportResult {
  let parsedJson: unknown;

  try {
    parsedJson = JSON.parse(text);
  } catch {
    return {
      success: false,
      issues: [
        {
          path: "json",
          message: "The hierarchy JSON could not be parsed.",
        },
      ],
    };
  }

  const extractedWorkstreams = extractWorkstreams(parsedJson);

  if (!Array.isArray(extractedWorkstreams)) {
    return {
      success: false,
      issues: [
        {
          path: "workstreams",
          message:
            "Provide either a workstreams array or an object with a workstreams array.",
        },
      ],
    };
  }

  const parsedWorkstreams =
    jiraWorkstreamArraySchema.safeParse(extractedWorkstreams);

  if (!parsedWorkstreams.success) {
    return {
      success: false,
      issues: zodIssuesToBuilderIssues(parsedWorkstreams.error.issues),
    };
  }

  const issues = validateJiraGeneratedHierarchy(parsedWorkstreams.data);

  if (issues.length > 0) {
    return {
      success: false,
      issues,
    };
  }

  return {
    success: true,
    workstreams: parsedWorkstreams.data,
    stats: getJiraHierarchyStats(parsedWorkstreams.data),
  };
}

export function validateJiraProjectSetupRequestForBuilder(
  request: JiraProjectSetupRequest,
): JiraBuilderValidationIssue[] {
  const parsed = jiraProjectSetupRequestSchema.safeParse(request);
  const hierarchyIssues = validateJiraGeneratedHierarchy(request.workstreams);

  if (parsed.success) return hierarchyIssues;

  return [...zodIssuesToBuilderIssues(parsed.error.issues), ...hierarchyIssues];
}
