import { describe, expect, it } from "vitest";
import {
  jiraIdParamSchema,
  jiraProjectSetupRequestSchema,
  jiraProjectTypeKeySchema,
  jiraRunRecordSchema,
  jiraSetupListSchema,
  jiraSetupRecordSchema,
  jiraSetupSummaryListSchema,
} from "@/app/admin/dashboard/jira/_schemas";
import { getJiraProjectTemplateById } from "@/app/admin/dashboard/jira/_config/projectOptions";

const defaultTemplate = getJiraProjectTemplateById("business-process-control");

const validSetup = {
  project: {
    key: "GEN",
    name: "General Project",
    projectTypeKey: defaultTemplate.projectTypeKey,
    projectTemplateKey: defaultTemplate.projectTemplateKey,
  },
  issueHierarchy: {
    workstreamIssueType: "Workstream",
    taskIssueType: "Task",
    subtaskIssueType: "Sub-task",
  },
  workflow: {
    id: "jira-default",
  },
  workstreams: [
    {
      ref: "company",
      summary: "Company",
      tasks: [
        {
          ref: "company-brief",
          summary: "Create company brief",
          subtasks: [
            {
              ref: "company-brief-review",
              summary: "Review company brief",
            },
          ],
        },
      ],
    },
  ],
};

describe("Jira schemas", () => {
  it("accepts the documented setup request shape", () => {
    expect(jiraProjectSetupRequestSchema.safeParse(validSetup).success).toBe(true);
  });

  it("accepts supported Jira project type keys", () => {
    expect(jiraProjectTypeKeySchema.safeParse("business").success).toBe(true);
    expect(jiraProjectTypeKeySchema.safeParse("software").success).toBe(true);
  });

  it("rejects unsupported Jira project type keys", () => {
    const result = jiraProjectSetupRequestSchema.safeParse({
      ...validSetup,
      project: {
        ...validSetup.project,
        projectTypeKey: "product_discovery",
      },
    });

    expect(result.success).toBe(false);
  });

  it("requires a supported project template key", () => {
    const result = jiraProjectSetupRequestSchema.safeParse({
      ...validSetup,
      project: {
        key: "GEN",
        name: "General Project",
        projectTypeKey: "business",
      },
    });

    expect(result.success).toBe(false);
  });

  it("rejects project template and project type mismatches", () => {
    const result = jiraProjectSetupRequestSchema.safeParse({
      ...validSetup,
      project: {
        ...validSetup.project,
        projectTypeKey: "software",
      },
    });

    expect(result.success).toBe(false);
  });

  it("rejects custom workflow selection for team-managed templates", () => {
    const teamTemplate = getJiraProjectTemplateById("software-team-kanban");
    const result = jiraProjectSetupRequestSchema.safeParse({
      ...validSetup,
      project: {
        ...validSetup.project,
        projectTypeKey: teamTemplate.projectTypeKey,
        projectTemplateKey: teamTemplate.projectTemplateKey,
      },
      workflow: {
        id: "document-heavy",
      },
    });

    expect(result.success).toBe(false);
  });

  it("rejects invalid setup IDs", () => {
    expect(jiraIdParamSchema.safeParse({ setupId: "not-a-uuid" }).success).toBe(
      false,
    );
  });

  it("rejects empty summaries", () => {
    const result = jiraProjectSetupRequestSchema.safeParse({
      ...validSetup,
      workstreams: [{ ref: "empty", summary: "" }],
    });

    expect(result.success).toBe(false);
  });

  it("requires ownerUserId on run responses", () => {
    const result = jiraRunRecordSchema.safeParse({
      id: "4fd78e2a-5d99-48df-8b22-3f6dcf036a21",
      setupId: "a7d8f6f0-2b8f-4f3f-91cf-6b15f9f7f7b1",
      status: "queued",
      createdAt: "2026-07-23T12:00:00.000Z",
      updatedAt: "2026-07-23T12:00:00.000Z",
    });

    expect(result.success).toBe(false);
  });

  it("accepts setup registry list responses", () => {
    const result = jiraSetupListSchema.safeParse([
      {
        id: "a7d8f6f0-2b8f-4f3f-91cf-6b15f9f7f7b1",
        ownerUserId: "user-1",
        status: "draft",
        request: validSetup,
        createdAt: "2026-07-23T12:00:00.000Z",
        updatedAt: "2026-07-24T12:00:00.000Z",
      },
    ]);

    expect(result.success).toBe(true);
  });

  it("accepts compact setup summary list responses", () => {
    const result = jiraSetupSummaryListSchema.safeParse([
      {
        id: "a7d8f6f0-2b8f-4f3f-91cf-6b15f9f7f7b1",
        ownerUserId: "user-1",
        status: "draft",
        project: {
          key: "GEN",
          name: "General Project",
        },
        workstreamCount: 3,
        createdAt: "2026-07-23T12:00:00.000Z",
        updatedAt: "2026-07-24T12:00:00.000Z",
      },
    ]);

    expect(result.success).toBe(true);
  });

  it("accepts the automation server app-facing setup record shape", () => {
    const result = jiraSetupRecordSchema.safeParse({
      id: "a7d8f6f0-2b8f-4f3f-91cf-6b15f9f7f7b1",
      ownerUserId: "user-1",
      status: "draft",
      request: {
        project: {
          key: "GEN",
          name: "General Project",
          createIfMissing: true,
          projectTypeKey: defaultTemplate.projectTypeKey,
          projectTemplateKey: defaultTemplate.projectTemplateKey,
        },
        issueHierarchy: {
          workstreamIssueType: "Workstream",
          taskIssueType: "Task",
          subtaskIssueType: "Sub-task",
          createMissingIssueTypes: false,
        },
        workflow: {
          id: "jira-default",
        },
        workstreams: [
          {
            ref: "company",
            summary: "Company",
            description: "Objective: Create shared context.",
            links: [
              {
                ref: "link-abc",
                type: "Blocks",
                inwardRef: "brand",
                outwardRef: "company",
              },
            ],
            tasks: [
              {
                ref: "company-brief",
                summary: "Create company brief",
                description: "Draft the brief.",
                links: [
                  {
                    ref: "task-link",
                    type: "Relates",
                    inwardRef: "company-brief",
                    outwardRef: "brand-brief",
                  },
                ],
                subtasks: [
                  {
                    ref: "company-brief-review",
                    summary: "Review company brief",
                    description: "Confirm stakeholder signoff.",
                  },
                ],
              },
            ],
          },
        ],
      },
      createdAt: "2026-07-23T12:00:00.000Z",
      updatedAt: "2026-07-24T12:00:00.000Z",
    });

    expect(result.success).toBe(true);
  });

  it("accepts the automation server run shape with optional Jira project fields", () => {
    const result = jiraRunRecordSchema.safeParse({
      id: "4fd78e2a-5d99-48df-8b22-3f6dcf036a21",
      setupId: "a7d8f6f0-2b8f-4f3f-91cf-6b15f9f7f7b1",
      ownerUserId: "user-1",
      status: "succeeded",
      state: {
        workstreams: {},
        tasks: {},
        subtasks: {},
        completedLinks: [],
      },
      jiraProject: {
        key: "GEN",
      },
      workflowResult: {
        mode: "document-heavy",
        selectionId: "document-heavy",
        selectionName: "Document Heavy Workflow",
        statusesCreatedOrUpdated: ["Ready"],
        workflowsCreatedOrUpdated: ["General workflow"],
        workflowSchemeId: "10002",
        workflowSchemeAssignment: "assigned",
      },
      createdAt: "2026-07-23T12:00:00.000Z",
      updatedAt: "2026-07-23T12:01:00.000Z",
      completedAt: "2026-07-23T12:01:00.000Z",
    });

    expect(result.success).toBe(true);
  });

  it("preserves failed run progress and error log identifiers", () => {
    const errorLogId = "c9ab506b-1524-4bf1-8487-df99fe7f151a";
    const result = jiraRunRecordSchema.safeParse({
      id: "4fd78e2a-5d99-48df-8b22-3f6dcf036a21",
      setupId: "a7d8f6f0-2b8f-4f3f-91cf-6b15f9f7f7b1",
      ownerUserId: "user-1",
      status: "failed",
      state: {
        workstreams: {},
        tasks: {},
        subtasks: {},
        completedLinks: [],
      },
      error: "Create Tasks failed.",
      errorLogId,
      progress: {
        phase: "tasks",
        counts: {
          workstream: {
            total: 1,
            pending: 0,
            running: 0,
            created: 1,
            skipped: 0,
            failed: 0,
            denied: 0,
          },
          task: {
            total: 1,
            pending: 0,
            running: 0,
            created: 0,
            skipped: 0,
            failed: 1,
            denied: 0,
          },
          subtask: {
            total: 0,
            pending: 0,
            running: 0,
            created: 0,
            skipped: 0,
            failed: 0,
            denied: 0,
          },
          link: {
            total: 0,
            pending: 0,
            running: 0,
            created: 0,
            skipped: 0,
            failed: 0,
            denied: 0,
          },
        },
        items: {},
        failure: {
          message: "Create Tasks failed.",
          phase: "tasks",
          ref: "company-task",
          failedAt: "2026-07-23T12:01:00.000Z",
          errorLogId,
        },
        updatedAt: "2026-07-23T12:01:00.000Z",
      },
      createdAt: "2026-07-23T12:00:00.000Z",
      updatedAt: "2026-07-23T12:01:00.000Z",
      completedAt: "2026-07-23T12:01:00.000Z",
    });

    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.data.errorLogId).toBe(errorLogId);
    expect(result.data.progress?.failure?.phase).toBe("tasks");
    expect(result.data.progress?.failure?.ref).toBe("company-task");
    expect(result.data.progress?.failure?.errorLogId).toBe(errorLogId);
  });
});
