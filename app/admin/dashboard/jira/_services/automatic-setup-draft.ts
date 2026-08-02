import type { JiraAdminIdentity } from "@/app/api/jira/_lib/auth";
import {
  createJiraSetup,
  listJiraProjectSummaries,
  listJiraSetups,
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

function findProjectSummary(
  projectKey: string,
  projects: JiraProjectSummary[],
): JiraProjectSummary | undefined {
  const normalizedProjectKey = normalizeProjectKey(projectKey);

  return projects.find(
    (project) => normalizeProjectKey(project.key) === normalizedProjectKey,
  );
}

function findSetupForProject(
  projectKey: string,
  setups: JiraSetupRecord[],
): JiraSetupRecord | undefined {
  const normalizedProjectKey = normalizeProjectKey(projectKey);

  return setups.find(
    (setup) =>
      normalizeProjectKey(setup.request.project.key) === normalizedProjectKey,
  );
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
  const project = findProjectSummary(
    projectKey,
    await listJiraProjectSummaries(requestId, actor),
  );

  if (!project) {
    return {
      status: "not-found",
      projectKey: normalizeProjectKey(projectKey),
    };
  }

  const existingSetup = findSetupForProject(
    project.key,
    await listJiraSetups(requestId, actor),
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
