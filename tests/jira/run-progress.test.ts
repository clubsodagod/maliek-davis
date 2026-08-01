import { describe, expect, it } from "vitest";
import { getJiraRunProgress } from "@/app/admin/dashboard/jira/_utils/runProgress";
import type {
  JiraRunRecord,
  JiraSetupRecord,
} from "@/app/admin/dashboard/jira/_types";
import { getJiraProjectTemplateById } from "@/app/admin/dashboard/jira/_config/projectOptions";

const template = getJiraProjectTemplateById("business-process-control");

const setup: JiraSetupRecord = {
  id: "a7d8f6f0-2b8f-4f3f-91cf-6b15f9f7f7b1",
  ownerUserId: "user-1",
  status: "draft",
  request: {
    project: {
      key: "GEN",
      name: "General Project",
      projectTypeKey: template.projectTypeKey,
      projectTemplateKey: template.projectTemplateKey,
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
        links: [
          {
            ref: "company-relates-growth",
            type: "Relates",
            inwardRef: "company",
            outwardRef: "growth",
          },
        ],
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
      {
        ref: "growth",
        summary: "Growth",
        tasks: [
          {
            ref: "growth-plan",
            summary: "Create growth plan",
          },
        ],
      },
    ],
  },
  createdAt: "2026-07-23T12:00:00.000Z",
  updatedAt: "2026-07-23T12:00:00.000Z",
};

function run(overrides: Partial<JiraRunRecord> = {}): JiraRunRecord {
  return {
    id: "4fd78e2a-5d99-48df-8b22-3f6dcf036a21",
    setupId: setup.id,
    ownerUserId: "user-1",
    status: "running",
    state: {
      workstreams: {},
      tasks: {},
      subtasks: {},
      completedLinks: [],
    },
    createdAt: "2026-07-23T12:00:00.000Z",
    updatedAt: "2026-07-23T12:01:00.000Z",
    ...overrides,
  };
}

describe("Jira run progress", () => {
  it("returns idle progress when no run has started", () => {
    expect(getJiraRunProgress(setup)).toMatchObject({
      stage: "idle",
      statusLabel: "Ready",
      currentOperation: "Ready to start",
      completedCount: 0,
      totalCount: 6,
      failedCount: 0,
      skippedCount: 0,
      percentage: 0,
      isTerminal: false,
    });
  });

  it("returns queued progress for queued runs", () => {
    expect(getJiraRunProgress(setup, run({ status: "queued" }))).toMatchObject({
      stage: "queued",
      statusLabel: "Queued",
      currentOperation: "Queued",
      percentage: 0,
      isTerminal: false,
    });
  });

  it("derives completed counts from persisted run state", () => {
    const progress = getJiraRunProgress(
      setup,
      run({
        state: {
          workstreams: {
            company: {
              id: "10001",
              key: "GEN-1",
              summary: "Company",
            },
          },
          tasks: {
            "company-brief": {
              id: "10002",
              key: "GEN-2",
              summary: "Create company brief",
            },
          },
          subtasks: {},
          completedLinks: [],
        },
      }),
    );

    expect(progress).toMatchObject({
      stage: "creating_workstreams",
      completedCount: 2,
      totalCount: 6,
      percentage: 33,
    });
  });

  it("moves through task, subtask, link, and finalizing stages", () => {
    expect(
      getJiraRunProgress(
        setup,
        run({
          state: {
            workstreams: {
              company: { id: "10001", key: "GEN-1", summary: "Company" },
              growth: { id: "10002", key: "GEN-2", summary: "Growth" },
            },
            tasks: {},
            subtasks: {},
            completedLinks: [],
          },
        }),
      ).stage,
    ).toBe("creating_tasks");

    expect(
      getJiraRunProgress(
        setup,
        run({
          state: {
            workstreams: {
              company: { id: "10001", key: "GEN-1", summary: "Company" },
              growth: { id: "10002", key: "GEN-2", summary: "Growth" },
            },
            tasks: {
              "company-brief": {
                id: "10003",
                key: "GEN-3",
                summary: "Create company brief",
              },
              "growth-plan": {
                id: "10004",
                key: "GEN-4",
                summary: "Create growth plan",
              },
            },
            subtasks: {},
            completedLinks: [],
          },
        }),
      ).stage,
    ).toBe("creating_subtasks");

    expect(
      getJiraRunProgress(
        setup,
        run({
          state: {
            workstreams: {
              company: { id: "10001", key: "GEN-1", summary: "Company" },
              growth: { id: "10002", key: "GEN-2", summary: "Growth" },
            },
            tasks: {
              "company-brief": {
                id: "10003",
                key: "GEN-3",
                summary: "Create company brief",
              },
              "growth-plan": {
                id: "10004",
                key: "GEN-4",
                summary: "Create growth plan",
              },
            },
            subtasks: {
              "company-brief-review": {
                id: "10005",
                key: "GEN-5",
                summary: "Review company brief",
              },
            },
            completedLinks: [],
          },
        }),
      ).stage,
    ).toBe("linking_issues");

    expect(
      getJiraRunProgress(
        setup,
        run({
          state: {
            workstreams: {
              company: { id: "10001", key: "GEN-1", summary: "Company" },
              growth: { id: "10002", key: "GEN-2", summary: "Growth" },
            },
            tasks: {
              "company-brief": {
                id: "10003",
                key: "GEN-3",
                summary: "Create company brief",
              },
              "growth-plan": {
                id: "10004",
                key: "GEN-4",
                summary: "Create growth plan",
              },
            },
            subtasks: {
              "company-brief-review": {
                id: "10005",
                key: "GEN-5",
                summary: "Review company brief",
              },
            },
            completedLinks: [
              {
                id: "20001",
                type: "Relates",
                inwardIssueKey: "GEN-1",
                outwardIssueKey: "GEN-2",
              },
            ],
          },
        }),
      ).stage,
    ).toBe("finalizing");
  });

  it("returns completed progress for succeeded runs", () => {
    expect(getJiraRunProgress(setup, run({ status: "succeeded" }))).toMatchObject({
      stage: "completed",
      currentOperation: "Completed",
      completedCount: 6,
      percentage: 100,
      isTerminal: true,
    });
  });

  it("preserves derived progress and exposes failure counts for failed runs", () => {
    expect(
      getJiraRunProgress(
        setup,
        run({
          status: "failed",
          error: "Jira rejected the request.",
          state: {
            workstreams: {
              company: { id: "10001", key: "GEN-1", summary: "Company" },
            },
            tasks: {},
            subtasks: {},
            completedLinks: [],
          },
        }),
      ),
    ).toMatchObject({
      stage: "failed",
      currentOperation: "Failed",
      completedCount: 1,
      failedCount: 1,
      percentage: 17,
      isTerminal: true,
    });
  });
});
