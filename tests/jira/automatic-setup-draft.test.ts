import { afterEach, describe, expect, it, vi } from "vitest";
import {
  createJiraSetup,
  getJiraProjectSummary,
  getJiraSetupByProjectKey,
} from "@/app/api/jira/_lib/service";
import { JiraAppError } from "@/app/api/jira/_lib/errors";
import { getJiraProjectTemplateById } from "@/app/admin/dashboard/jira/_config/projectOptions";
import {
  buildAutomaticJiraSetupDraftRequest,
  ensureAutomaticJiraSetupDraft,
} from "@/app/admin/dashboard/jira/_services/automatic-setup-draft";
import type {
  JiraProjectSummary,
  JiraSetupRecord,
} from "@/app/admin/dashboard/jira/_types";

vi.mock("@/app/api/jira/_lib/service", () => ({
  createJiraSetup: vi.fn(),
  getJiraProjectSummary: vi.fn(),
  getJiraSetupByProjectKey: vi.fn(),
}));

const actor = {
  userId: "user-1",
  role: "admin",
} as const;

const project: JiraProjectSummary = {
  key: "PBMLV3",
  name: "Pearl Box V3",
  description: "Existing Jira project.",
};

function setupRecord(key = project.key): JiraSetupRecord {
  const template = getJiraProjectTemplateById("business-project-management");

  return {
    id: "a7d8f6f0-2b8f-4f3f-91cf-6b15f9f7f7b1",
    ownerUserId: "user-1",
    status: "draft",
    request: {
      project: {
        key,
        name: "Pearl Box V3",
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
        id: "jira-default",
      },
      workstreams: [],
    },
    createdAt: "2026-07-23T12:00:00.000Z",
    updatedAt: "2026-07-23T12:00:00.000Z",
  };
}

const createJiraSetupMock = vi.mocked(createJiraSetup);
const getJiraProjectSummaryMock = vi.mocked(getJiraProjectSummary);
const getJiraSetupByProjectKeyMock = vi.mocked(getJiraSetupByProjectKey);

describe("automatic Jira setup draft", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("builds a reuse-mode empty draft request with the app default template", () => {
    const template = getJiraProjectTemplateById("business-project-management");

    expect(buildAutomaticJiraSetupDraftRequest(project)).toEqual({
      project: {
        key: "PBMLV3",
        name: "Pearl Box V3",
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
        id: "jira-default",
      },
      workstreams: [],
    });
  });

  it("creates a setup draft when Jira has the project and the registry does not", async () => {
    const createdSetup = setupRecord();
    getJiraProjectSummaryMock.mockResolvedValue(project);
    getJiraSetupByProjectKeyMock.mockRejectedValue(
      new JiraAppError("NOT_FOUND", "Project setup not found."),
    );
    createJiraSetupMock.mockResolvedValue(createdSetup);

    await expect(
      ensureAutomaticJiraSetupDraft("pbmlv3", "request-1", actor),
    ).resolves.toEqual({
      status: "ready",
      project,
      setup: createdSetup,
      created: true,
    });

    expect(createJiraSetupMock).toHaveBeenCalledWith(
      buildAutomaticJiraSetupDraftRequest(project),
      "request-1",
      actor,
    );
    expect(getJiraProjectSummaryMock).toHaveBeenCalledWith(
      "pbmlv3",
      "request-1",
      actor,
    );
    expect(getJiraSetupByProjectKeyMock).toHaveBeenCalledWith(
      "PBMLV3",
      "request-1",
      actor,
    );
  });

  it("does not create a duplicate when the registry already has the project key", async () => {
    const existingSetup = setupRecord("pbmlv3");
    getJiraProjectSummaryMock.mockResolvedValue(project);
    getJiraSetupByProjectKeyMock.mockResolvedValue(existingSetup);

    await expect(
      ensureAutomaticJiraSetupDraft("PBMLV3", "request-1", actor),
    ).resolves.toEqual({
      status: "ready",
      project,
      setup: existingSetup,
      created: false,
    });

    expect(createJiraSetupMock).not.toHaveBeenCalled();
  });

  it("returns not-found when Jira does not have the project key", async () => {
    getJiraProjectSummaryMock.mockRejectedValue(
      new JiraAppError("NOT_FOUND", "Jira project not found."),
    );

    await expect(
      ensureAutomaticJiraSetupDraft("MISSING", "request-1", actor),
    ).resolves.toEqual({
      status: "not-found",
      projectKey: "MISSING",
    });

    expect(getJiraSetupByProjectKeyMock).not.toHaveBeenCalled();
    expect(createJiraSetupMock).not.toHaveBeenCalled();
  });
});
