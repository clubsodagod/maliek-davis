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
const STAGE_MAX_DESCRIPTION_LENGTH = 10_000;
const TRUNCATED_DESCRIPTION_SUFFIX = "\n\n[truncated]";
const stageDescriptionSchema = z.string().max(STAGE_MAX_DESCRIPTION_LENGTH).optional();
const stageIssueTypeSchema = z.string().trim().min(1).max(80).optional();
const stagePrioritySchema = z.string().trim().min(1).max(80).optional();
const stageDateSchema = z.string().trim().min(1).max(32).optional();
const stageLabelsSchema = z.array(z.string().trim().min(1).max(80)).optional();
const jiraStagedTaskArraySchema = z.array(
  z.object({
    ref: stageRefSchema,
    workstreamRef: stageRefSchema,
    summary: stageSummarySchema,
    description: stageDescriptionSchema,
    issueType: stageIssueTypeSchema,
    priority: stagePrioritySchema,
    labels: stageLabelsSchema,
    dueDate: stageDateSchema,
  }),
);
const jiraStagedSubtaskArraySchema = z.array(
  z.object({
    ref: stageRefSchema,
    taskRef: stageRefSchema,
    summary: stageSummarySchema,
    description: stageDescriptionSchema,
    issueType: stageIssueTypeSchema,
    priority: stagePrioritySchema,
    labels: stageLabelsSchema,
    dueDate: stageDateSchema,
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

function appendIfPresent(
  sections: string[],
  label: string,
  value: unknown,
): void {
  if (typeof value === "string" && value.trim() !== "") {
    sections.push(`${label}: ${value.trim()}`);
  }
}

function appendStringList(
  sections: string[],
  label: string,
  value: unknown,
): void {
  if (!Array.isArray(value)) return;

  const items = value
    .filter((item): item is string => typeof item === "string" && item.trim() !== "")
    .map((item) => `- ${item.trim()}`);

  if (items.length > 0) {
    sections.push(`${label}:\n${items.join("\n")}`);
  }
}

function truncateDescription(value: string): string {
  if (value.length <= STAGE_MAX_DESCRIPTION_LENGTH) return value;

  return `${value.slice(
    0,
    STAGE_MAX_DESCRIPTION_LENGTH - TRUNCATED_DESCRIPTION_SUFFIX.length,
  ).trimEnd()}${TRUNCATED_DESCRIPTION_SUFFIX}`;
}

function renderEvidenceItem(value: unknown): string | undefined {
  if (typeof value === "string" && value.trim() !== "") {
    return value.trim();
  }
  if (!isRecord(value)) return undefined;

  const claim = typeof value.claim === "string" ? value.claim.trim() : "";
  const source = typeof value.source === "string" ? value.source.trim() : "";
  const url = typeof value.url === "string" ? value.url.trim() : "";
  const details = [source, url].filter(Boolean).join(" - ");

  if (claim === "" && details === "") return undefined;
  if (details === "") return claim;
  if (claim === "") return details;
  return `${claim} (${details})`;
}

function appendPlanningExample(
  sections: string[],
  value: unknown,
): void {
  if (!isRecord(value)) return;

  const exampleSections: string[] = [];
  appendIfPresent(exampleSections, "Status", value.status);
  appendIfPresent(exampleSections, "Answer", value.answer);

  if (Array.isArray(value.evidence)) {
    const evidence = value.evidence
      .map(renderEvidenceItem)
      .filter((item): item is string => item !== undefined)
      .map((item) => `- ${item}`);

    if (evidence.length > 0) {
      exampleSections.push(`Evidence:\n${evidence.join("\n")}`);
    }
  }

  appendStringList(exampleSections, "Assumptions", value.assumptions);
  appendStringList(
    exampleSections,
    "Unresolved Questions",
    value.unresolvedQuestions,
  );

  if (exampleSections.length > 0) {
    sections.push(`Example:\n${exampleSections.join("\n")}`);
  }
}

function normalizeDescription(value: unknown): unknown {
  if (value === undefined) return undefined;
  if (typeof value === "string") return truncateDescription(value);
  if (!isRecord(value)) return value;

  const sections: string[] = [];
  appendIfPresent(sections, "Objective", value.objective);
  appendIfPresent(sections, "Question", value.question);
  appendStringList(sections, "Scope", value.scope);
  appendStringList(sections, "Guidance", value.guidance);
  appendIfPresent(sections, "Deliverable", value.deliverable);
  appendStringList(sections, "Acceptance Criteria", value.acceptanceCriteria);
  appendStringList(sections, "Dependencies", value.dependencies);
  appendPlanningExample(sections, value.example);
  appendIfPresent(sections, "Business Outcome", value.businessOutcome);
  appendStringList(sections, "Sections To Include", value.sectionsToInclude);
  appendStringList(sections, "Required Information", value.requiredInformation);
  appendIfPresent(sections, "Notes", value.notes);

  return truncateDescription(sections.join("\n\n"));
}

function copyIfPresent(
  output: Record<string, unknown>,
  input: Record<string, unknown>,
  field: string,
): void {
  if (input[field] !== undefined) {
    output[field] = input[field];
  }
}

function normalizeImportedIssueRecord(input: unknown): unknown {
  if (!isRecord(input)) return input;

  const output: Record<string, unknown> = {
    ref: input.ref,
    summary: input.summary,
  };
  const description = normalizeDescription(input.description);

  if (description !== undefined) {
    output.description = description;
  }

  copyIfPresent(output, input, "issueType");
  copyIfPresent(output, input, "priority");
  copyIfPresent(output, input, "labels");
  copyIfPresent(output, input, "dueDate");
  copyIfPresent(output, input, "targetStartDate");
  copyIfPresent(output, input, "targetEndDate");
  copyIfPresent(output, input, "workstreamRef");
  copyIfPresent(output, input, "taskRef");

  return output;
}

function normalizeImportedIssueRecords(input: unknown): unknown {
  return Array.isArray(input)
    ? input.map(normalizeImportedIssueRecord)
    : input;
}

function normalizeImportedSubtaskHierarchyRecord(input: unknown): unknown {
  return normalizeImportedIssueRecord(input);
}

function normalizeImportedTaskHierarchyRecord(input: unknown): unknown {
  const normalized = normalizeImportedIssueRecord(input);
  if (!isRecord(input) || !isRecord(normalized)) return normalized;

  if (Array.isArray(input.links)) {
    normalized.links = input.links;
  }
  if (Array.isArray(input.subtasks)) {
    normalized.subtasks = input.subtasks.map(normalizeImportedSubtaskHierarchyRecord);
  }

  return normalized;
}

function normalizeImportedWorkstreamHierarchyRecord(input: unknown): unknown {
  const normalized = normalizeImportedIssueRecord(input);
  if (!isRecord(input) || !isRecord(normalized)) return normalized;

  if (Array.isArray(input.links)) {
    normalized.links = input.links;
  }
  if (Array.isArray(input.tasks)) {
    normalized.tasks = input.tasks.map(normalizeImportedTaskHierarchyRecord);
  }

  return normalized;
}

function normalizeImportedWorkstreamHierarchyRecords(input: unknown): unknown {
  return Array.isArray(input)
    ? input.map(normalizeImportedWorkstreamHierarchyRecord)
    : input;
}

function normalizeLookupText(value: string): string {
  return value
    .trim()
    .replace(/^\d+\.\s*/u, "")
    .replace(/&/gu, " and ")
    .replace(/[^A-Za-z0-9]+/gu, "-")
    .replace(/^-+|-+$/gu, "")
    .toLowerCase();
}

function normalizeLooseTaskText(value: string): string {
  return normalizeLookupText(value)
    .split("-")
    .filter((part) => part !== "brand" && part !== "company")
    .join("-");
}

function normalizeRefAliasText(value: string): string {
  return normalizeLookupText(value)
    .split("-")
    .filter((part) => part !== "and")
    .join("-");
}

function setUnique(
  map: Map<string, string | null>,
  key: string,
  value: string,
): void {
  if (key === "") return;

  const current = map.get(key);
  if (current === undefined) {
    map.set(key, value);
    return;
  }

  if (current !== value) {
    map.set(key, null);
  }
}

function getUnique(
  map: ReadonlyMap<string, string | null>,
  key: string,
): string | undefined {
  return map.get(key) ?? undefined;
}

function createWorkstreamRefResolver(
  workstreams: readonly JiraWorkstreamInput[],
  sourceWorkstreams: unknown,
): (ref: unknown, summary?: unknown) => string | undefined {
  const byRef = new Map<string, string>();
  const byLookup = new Map<string, string | null>();
  const aliases = new Map<string, string>();

  workstreams.forEach((workstream) => {
    const ref = workstream.ref.trim();
    byRef.set(ref, ref);
    setUnique(byLookup, normalizeLookupText(ref), ref);
    setUnique(byLookup, normalizeLookupText(workstream.summary), ref);
  });

  if (Array.isArray(sourceWorkstreams)) {
    sourceWorkstreams.forEach((source) => {
      if (!isRecord(source) || typeof source.ref !== "string") return;

      const resolved = typeof source.summary === "string"
        ? getUnique(byLookup, normalizeLookupText(source.summary))
        : undefined;

      if (resolved !== undefined) {
        aliases.set(source.ref.trim(), resolved);
      }
    });
  }

  return (ref, summary) => {
    if (typeof ref === "string") {
      const exact = byRef.get(ref.trim()) ?? aliases.get(ref.trim());
      if (exact !== undefined) return exact;

      const normalized = getUnique(byLookup, normalizeLookupText(ref));
      if (normalized !== undefined) return normalized;
    }

    if (typeof summary === "string") {
      return getUnique(byLookup, normalizeLookupText(summary));
    }

    return undefined;
  };
}

function createTaskRefResolver(
  tasks: readonly JiraStagedTaskInput[],
): (ref: unknown, summary?: unknown, workstreamRef?: unknown) => string | undefined {
  const byRef = new Map<string, string>();
  const bySummary = new Map<string, string | null>();
  const byLooseSummary = new Map<string, string | null>();
  const byWorkstreamSummary = new Map<string, string | null>();
  const byWorkstreamLooseSummary = new Map<string, string | null>();
  const workstreamAliases = new Map<string, string | null>();

  tasks.forEach((task) => {
    const ref = task.ref.trim();
    const workstreamRef = task.workstreamRef.trim();
    byRef.set(ref, ref);
    setUnique(bySummary, normalizeLookupText(task.summary), ref);
    setUnique(byLooseSummary, normalizeLooseTaskText(task.summary), ref);
    setUnique(
      byWorkstreamSummary,
      `${workstreamRef}\u0000${normalizeLookupText(task.summary)}`,
      ref,
    );
    setUnique(
      byWorkstreamLooseSummary,
      `${workstreamRef}\u0000${normalizeLooseTaskText(task.summary)}`,
      ref,
    );
    setUnique(workstreamAliases, workstreamRef, workstreamRef);
    setUnique(workstreamAliases, normalizeRefAliasText(workstreamRef), workstreamRef);
  });

  return (ref, summary, workstreamRef) => {
    if (typeof ref === "string") {
      const exact = byRef.get(ref.trim());
      if (exact !== undefined) return exact;
    }

    if (typeof summary === "string") {
      if (typeof workstreamRef === "string") {
        const resolvedWorkstreamRef =
          getUnique(workstreamAliases, workstreamRef.trim())
          ?? getUnique(workstreamAliases, normalizeRefAliasText(workstreamRef));

        if (resolvedWorkstreamRef !== undefined) {
          const workstreamSummary = getUnique(
            byWorkstreamSummary,
            `${resolvedWorkstreamRef}\u0000${normalizeLookupText(summary)}`,
          );
          if (workstreamSummary !== undefined) return workstreamSummary;

          const looseWorkstreamSummary = getUnique(
            byWorkstreamLooseSummary,
            `${resolvedWorkstreamRef}\u0000${normalizeLooseTaskText(summary)}`,
          );
          if (looseWorkstreamSummary !== undefined) return looseWorkstreamSummary;
        }
      }

      const exactSummary = getUnique(bySummary, normalizeLookupText(summary));
      if (exactSummary !== undefined) return exactSummary;

      return getUnique(byLooseSummary, normalizeLooseTaskText(summary));
    }

    return undefined;
  };
}

function stringValue(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}

function normalizeRelationshipLink(
  relationship: unknown,
  sourceRef: string | undefined,
  targetRef: string | undefined,
): unknown {
  if (!isRecord(relationship)) return relationship;

  return {
    ref: relationship.ref,
    type: relationship.linkType,
    sourceRef,
    inwardRef: targetRef,
    outwardRef: sourceRef,
    relationship: relationship.relationship,
    reason: relationship.reason,
    category: relationship.category,
  };
}

function extractRelationshipArray(value: unknown): readonly unknown[] | undefined {
  return isRecord(value) && Array.isArray(value.relationships)
    ? value.relationships
    : undefined;
}

function extractTaskStageRecords(value: unknown): unknown {
  const directTasks = extractStageArray(value, ["tasks"]);
  if (Array.isArray(directTasks)) return directTasks;

  if (!isRecord(value) || !Array.isArray(value.taskGroups)) return undefined;

  return value.taskGroups.flatMap((taskGroup) => {
    if (!isRecord(taskGroup) || !Array.isArray(taskGroup.issues)) {
      return [taskGroup];
    }

    return taskGroup.issues.map((issue) =>
      isRecord(issue)
        ? {
            ...issue,
            workstreamRef: taskGroup.workstreamRef,
          }
        : issue,
    );
  });
}

function extractSubtaskStageRecords(value: unknown): unknown {
  const directSubtasks = extractStageArray(value, ["subtasks", "taskSubtasks"]);
  if (!Array.isArray(directSubtasks)) return directSubtasks;

  return directSubtasks.flatMap((entry) => {
    if (!isRecord(entry) || !Array.isArray(entry.subtasks)) {
      return [entry];
    }

    return entry.subtasks.map((subtask) =>
      isRecord(subtask)
        ? {
            ...subtask,
            taskRef: entry.parentTaskRef,
          }
        : subtask,
    );
  });
}

function getLinkSourceRef(link: JiraIssueLinkInput): string {
  return link.sourceRef?.trim() || link.inwardRef.trim();
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
  const parsedWorkstreams = jiraWorkstreamArraySchema.safeParse(
    normalizeImportedIssueRecords(workstreams),
  );

  if (!parsedWorkstreams.success) {
    return {
      success: false,
      issues: zodIssuesToBuilderIssues(parsedWorkstreams.error.issues),
    };
  }

  const stageWorkstreams = parsedWorkstreams.data.map(
    ({
      ref,
      summary,
      description,
      issueType,
      priority,
      labels,
      targetStartDate,
      targetEndDate,
      dueDate,
    }) => ({
      ref,
      summary,
      ...(description === undefined ? {} : { description }),
      ...(issueType === undefined ? {} : { issueType }),
      ...(priority === undefined ? {} : { priority }),
      ...(labels === undefined ? {} : { labels }),
      ...(targetStartDate === undefined ? {} : { targetStartDate }),
      ...(targetEndDate === undefined ? {} : { targetEndDate }),
      ...(dueDate === undefined ? {} : { dueDate }),
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

  const relationshipLinks = extractRelationshipArray(parsedJson.data)?.map((relationship) => {
    if (!isRecord(relationship)) return relationship;

    const resolveWorkstreamRef = createWorkstreamRefResolver(
      workstreams,
      isRecord(parsedJson.data) ? parsedJson.data.workstreams : undefined,
    );
    const sourceRef = resolveWorkstreamRef(relationship.sourceWorkstreamRef)
      ?? stringValue(relationship.sourceWorkstreamRef);
    const targetRef = resolveWorkstreamRef(relationship.targetWorkstreamRef)
      ?? stringValue(relationship.targetWorkstreamRef);

    return normalizeRelationshipLink(relationship, sourceRef, targetRef);
  });
  const links = relationshipLinks
    ?? extractStageArray(parsedJson.data, ["workstreamLinks", "links"]);
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

  const tasks = extractTaskStageRecords(parsedJson.data);
  const parsedTasks = jiraStagedTaskArraySchema.safeParse(
    normalizeImportedIssueRecords(tasks),
  );

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

  const relationshipLinks = extractRelationshipArray(parsedJson.data)?.map((relationship) => {
    if (!isRecord(relationship)) return relationship;

    const resolveTaskRef = createTaskRefResolver(tasks);
    const sourceRef = resolveTaskRef(
      relationship.sourceTaskRef,
      relationship.sourceSummary,
      relationship.sourceWorkstreamRef,
    ) ?? stringValue(relationship.sourceTaskRef);
    const targetRef = resolveTaskRef(
      relationship.targetTaskRef,
      relationship.targetSummary,
      relationship.targetWorkstreamRef,
    ) ?? stringValue(relationship.targetTaskRef);

    return normalizeRelationshipLink(relationship, sourceRef, targetRef);
  });
  const links = relationshipLinks
    ?? extractStageArray(parsedJson.data, ["taskLinks", "links"]);
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

  const subtasks = extractSubtaskStageRecords(parsedJson.data);
  const parsedSubtasks = jiraStagedSubtaskArraySchema.safeParse(
    normalizeImportedIssueRecords(subtasks),
  );

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
      ...(workstream.issueType === undefined ? {} : { issueType: workstream.issueType }),
      ...(workstream.priority === undefined ? {} : { priority: workstream.priority }),
      ...(workstream.labels === undefined ? {} : { labels: workstream.labels }),
      ...(workstream.targetStartDate === undefined
        ? {}
        : { targetStartDate: workstream.targetStartDate }),
      ...(workstream.targetEndDate === undefined
        ? {}
        : { targetEndDate: workstream.targetEndDate }),
      ...(workstream.dueDate === undefined ? {} : { dueDate: workstream.dueDate }),
      links: [],
      tasks: [],
    });
  });

  imports.workstreamLinks.forEach((link) => {
    workstreamMap.get(getLinkSourceRef(link))?.links?.push(link);
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
    taskMap.get(getLinkSourceRef(link))?.links?.push(link);
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
    jiraWorkstreamArraySchema.safeParse(
      normalizeImportedWorkstreamHierarchyRecords(extractedWorkstreams),
    );

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
