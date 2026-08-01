import { describe, expect, it } from "vitest";
import { getJiraResultsMetrics } from "@/app/admin/dashboard/jira/_utils/resultsSummary";
import type {
  JiraRunRecord,
  JiraSetupRecord,
} from "@/app/admin/dashboard/jira/_types";
import { getJiraProjectTemplateById } from "@/app/admin/dashboard/jira/_config/projectOptions";

const template = getJiraProjectTemplateById("business-process-control");

const setup: JiraSetupRecord = {
  id: "d2d7a4e1-3e2c-4a72-a238-b85d6e5cb4fd",
  ownerUserId: "user-1",
  status: "draft",
  request: {
    project: {
      key: "OPS",
      name: "Operations Launch",
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
        ref: "planning",
        summary: "Planning",
        links: [
          {
            ref: "planning-relates-delivery",
            type: "Relates",
            inwardRef: "planning",
            outwardRef: "delivery",
          },
        ],
        tasks: [
          {
            ref: "roadmap",
            summary: "Build roadmap",
            subtasks: [
              {
                ref: "roadmap-review",
                summary: "Review roadmap",
              },
            ],
          },
        ],
      },
      {
        ref: "delivery",
        summary: "Delivery",
        tasks: [
          {
            ref: "launch-plan",
            summary: "Build launch plan",
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
    id: "f5cc1dc7-26b4-478e-9f0b-6f401d381c3c",
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

describe("Jira results summary", () => {
  it("returns planned totals when no run is selected", () => {
    expect(getJiraResultsMetrics(setup)).toEqual({
      plannedIssues: 5,
      plannedOperations: 6,
      createdIssues: 0,
      createdWorkstreams: 0,
      createdTasks: 0,
      createdSubtasks: 0,
      completedLinks: 0,
      completionPercentage: 0,
    });
  });

  it("counts generated records from persisted run state", () => {
    expect(
      getJiraResultsMetrics(
        setup,
        run({
          state: {
            workstreams: {
              planning: {
                id: "10001",
                key: "OPS-1",
                summary: "Planning",
              },
              delivery: {
                id: "10002",
                key: "OPS-2",
                summary: "Delivery",
              },
            },
            tasks: {
              roadmap: {
                id: "10003",
                key: "OPS-3",
                summary: "Build roadmap",
              },
            },
            subtasks: {
              "roadmap-review": {
                id: "10004",
                key: "OPS-4",
                summary: "Review roadmap",
              },
            },
            completedLinks: [
              {
                id: "20001",
                type: "Relates",
                inwardIssueKey: "OPS-1",
                outwardIssueKey: "OPS-2",
              },
            ],
          },
        }),
      ),
    ).toMatchObject({
      plannedIssues: 5,
      plannedOperations: 6,
      createdIssues: 4,
      createdWorkstreams: 2,
      createdTasks: 1,
      createdSubtasks: 1,
      completedLinks: 1,
      completionPercentage: 83,
    });
  });

  it("reports complete percentage for succeeded runs even when state is sparse", () => {
    expect(getJiraResultsMetrics(setup, run({ status: "succeeded" }))).toMatchObject(
      {
        createdIssues: 0,
        completedLinks: 0,
        completionPercentage: 100,
      },
    );
  });
});
