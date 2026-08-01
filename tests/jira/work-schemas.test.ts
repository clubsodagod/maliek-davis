import { describe, expect, it } from "vitest";
import {
  answerViewSchema,
  projectSummaryViewSchema,
  subtaskQuestionViewSchema,
  workQueueViewSchema,
} from "@/app/admin/dashboard/jira/_schemas";

const queueItem = {
  ref: "company-positioning",
  issueId: "10003",
  issueKey: "PBMLV-3",
  summary: "Answer company positioning question",
  issueType: "Sub-task",
  issueTypeSlug: "subtask",
  status: "Ready",
  statusSlug: "ready",
  overdue: false,
  scheduleRisk: false,
  progress: {
    completed: 0,
    total: 1,
    label: "0/1 complete",
  },
  ownership: {
    gaps: ["assignee"],
  },
  synchronizationHealth: {
    jira: "synced",
    confluence: "not_configured",
  },
  recommendedAction: {
    kind: "answer-question",
    label: "Answer question",
    priority: "high",
  },
  version: "10003:PBMLV-3:0:ready",
};

const answer = {
  issueIdOrKey: "PBMLV-3",
  version: 0,
  status: "not_started",
  answer: "",
  evidence: [],
  validation: {
    passed: false,
    errors: [],
    warnings: [],
  },
};

describe("Jira work schemas", () => {
  it("accepts normalized queue and project summary responses", () => {
    expect(
      workQueueViewSchema.safeParse({
        project: { key: "PBMLV", name: "Pearl Box" },
        filters: {
          statusSlug: "ready",
          status: "Ready",
          taskTypeSlug: "subtask",
          sort: "recommended",
        },
        counts: {
          total: 1,
          byStatus: [{ status: "Ready", statusSlug: "ready", count: 1 }],
          byTaskType: [{ taskTypeSlug: "subtask", label: "Subtasks", count: 1 }],
        },
        items: [queueItem],
        synchronizationHealth: {
          jira: "synced",
          confluence: "not_configured",
        },
        partialSynchronization: false,
      }).success,
    ).toBe(true);

    expect(
      projectSummaryViewSchema.safeParse({
        project: { key: "PBMLV", name: "Pearl Box" },
        setupId: "setup-1",
        overallCompletion: {
          completed: 0,
          total: 1,
          label: "0/1 complete",
        },
        workstreamProgress: [],
        statusDistribution: [{ status: "Ready", statusSlug: "ready", count: 1 }],
        readyWorkCount: 1,
        overdueCount: 0,
        scheduleRiskCount: 0,
        criticalBlockers: [],
        ownershipGapsCount: 1,
        reviewsAwaitingActionCount: 0,
        synchronizationHealth: {
          jira: "synced",
          confluence: "not_configured",
        },
        recentlyActiveWork: [queueItem],
        recommendedNextActions: [queueItem.recommendedAction],
      }).success,
    ).toBe(true);
  });

  it("accepts normalized question and answer responses", () => {
    expect(answerViewSchema.safeParse(answer).success).toBe(true);
    expect(
      subtaskQuestionViewSchema.safeParse({
        project: { key: "PBMLV", name: "Pearl Box" },
        issue: queueItem,
        parentTask: { ...queueItem, ref: "company-brief", issueTypeSlug: "task" },
        workstream: { ...queueItem, ref: "company", issueTypeSlug: "workstream" },
        question: {
          objective: "Clarify company positioning.",
          question: "How should Pearl Box position itself?",
          guidance: ["Begin with the conclusion."],
          deliverable: "Investor-ready answer.",
          acceptanceCriteria: ["The answer is direct."],
          evidenceRequirements: [],
        },
        answer,
        queue: {
          position: 1,
          total: 1,
        },
        taskProgress: {
          completed: 0,
          total: 1,
          label: "0/1 complete",
        },
        synchronizationHealth: {
          jira: "synced",
          confluence: "not_configured",
        },
      }).success,
    ).toBe(true);
  });
});
