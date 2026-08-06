import type { JiraAdminIdentity } from "@/app/api/jira/_lib/auth";
import { normalizeUnknownError } from "@/app/api/jira/_lib/errors";
import {
  createJiraSetup,
  getJiraProjectSummary,
  getJiraSetupByProjectKey,
} from "@/app/api/jira/_lib/service";
import {
  DEFAULT_JIRA_PROJECT_TEMPLATE_ID,
  DEFAULT_JIRA_WORKFLOW_SELECTION_ID,
  getJiraProjectTemplateById,
} from "../_config/projectOptions";
import type {
  JiraProjectSetupRequest,
  JiraProjectSummary,
  JiraSetupRecord,
} from "../_types";

export type AutomaticSetupDraftResult =
  | {
      status: "ready";
      project: JiraProjectSummary;
      setup: JiraSetupRecord;
      created: boolean;
    }
  | {
      status: "not-found";
      projectKey: string;
    };

function normalizeProjectKey(value: string): string {
  return value.trim().toUpperCase();
}

export function buildAutomaticJiraSetupDraftRequest(
  project: JiraProjectSummary,
): JiraProjectSetupRequest {
  const template = getJiraProjectTemplateById(DEFAULT_JIRA_PROJECT_TEMPLATE_ID);

  return {
    project: {
      key: project.key.trim(),
      name: project.name.trim(),
      projectTypeKey: template.projectTypeKey,
      projectTemplateKey: template.projectTemplateKey,
      createIfMissing: false,
      existingProjectPolicy: "reuse",
    },
    issueHierarchy: {
      workstreamIssueType: "Workstream",
      taskIssueType: "Task",
      subtaskIssueType: "Sub-task",
    },
    workflow: {
      id: DEFAULT_JIRA_WORKFLOW_SELECTION_ID,
    },
    workstreams: [],
  };
}

export async function ensureAutomaticJiraSetupDraft(
  projectKey: string,
  requestId: string,
  actor: JiraAdminIdentity,
): Promise<AutomaticSetupDraftResult> {
  const project = await getExistingJiraProjectSummary(projectKey, requestId, actor);

  if (!project) {
    return {
      status: "not-found",
      projectKey: normalizeProjectKey(projectKey),
    };
  }

  const existingSetup = await getExistingSetupForProject(
    project.key,
    requestId,
    actor,
  );

  if (existingSetup) {
    return {
      status: "ready",
      project,
      setup: existingSetup,
      created: false,
    };
  }

  return {
    status: "ready",
    project,
    setup: await createJiraSetup(
      buildAutomaticJiraSetupDraftRequest(project),
      requestId,
      actor,
    ),
    created: true,
  };
}

async function getExistingJiraProjectSummary(
  projectKey: string,
  requestId: string,
  actor: JiraAdminIdentity,
): Promise<JiraProjectSummary | undefined> {
  try {
    return await getJiraProjectSummary(projectKey, requestId, actor);
  } catch (error) {
    if (normalizeUnknownError(error).code === "NOT_FOUND") {
      return undefined;
    }
    throw error;
  }
}

async function getExistingSetupForProject(
  projectKey: string,
  requestId: string,
  actor: JiraAdminIdentity,
): Promise<JiraSetupRecord | undefined> {
  try {
    return await getJiraSetupByProjectKey(projectKey, requestId, actor);
  } catch (error) {
    if (normalizeUnknownError(error).code === "NOT_FOUND") {
      return undefined;
    }
    throw error;
  }
}
