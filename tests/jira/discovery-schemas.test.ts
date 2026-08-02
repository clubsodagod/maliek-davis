import { describe, expect, it } from "vitest";
import {
  discoveryPlanPatchOperationSchema,
  discoveryResponseSchema,
} from "@/app/admin/dashboard/jira/_schemas";
import { getJiraProjectTemplateById } from "@/app/admin/dashboard/jira/_config/projectOptions";

const template = getJiraProjectTemplateById("business-process-control");
const now = "2026-08-01T12:00:00.000Z";

describe("Jira discovery schemas", () => {
  it("accepts a discovery response with question bank and resumable session state", () => {
    const result = discoveryResponseSchema.safeParse({
      questionBank: {
        version: "test-bank",
        sourceHash: "hash",
        sections: [
          {
            id: "project_foundation",
            title: "Project Foundation",
            growStage: "goal",
            order: 1,
          },
        ],
        questions: [
          {
            id: "PF-01",
            sectionId: "project_foundation",
            order: 1,
            prompt: "What should this project be called?",
            purpose: "Name the project.",
            tier: "quick",
            importance: "Required (Minimum)",
            answerFormat: "Short text.",
            required: true,
            suggestedOptions: [],
            followUpTrigger: "",
            followUpQuestions: [],
            defines: "Project name.",
            guidance: "Name the project.",
            example: "Example: Launch readiness.",
            definitionOfDone: "Done when the name is clear.",
            outputFields: ["project_name"],
          },
        ],
        skipRules: [],
        triggerRules: [],
      },
      session: {
        setupId: "a7d8f6f0-2b8f-4f3f-91cf-6b15f9f7f7b1",
        ownerUserId: "user-1",
        status: "in_progress",
        questionBankVersion: "test-bank",
        questionBankSourceHash: "hash",
        selectedTier: "quick",
        currentSectionId: "project_foundation",
        project: {
          project: {
            key: "GEN",
            name: "General",
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
        },
        sections: [
          {
            id: "project_foundation",
            status: "draft",
            revision: 0,
            eligibleQuestionIds: ["PF-01"],
            skippedQuestions: [],
            updatedAt: now,
          },
        ],
        answers: [],
        clarifyingQuestions: [],
        planRevisions: [],
        chatChangeRequests: [],
        processingError: null,
        createdAt: now,
        updatedAt: now,
      },
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.session.processingError).toBeUndefined();
    }
  });

  it("validates manual workstream patch operations", () => {
    const result = discoveryPlanPatchOperationSchema.safeParse({
      type: "add",
      target: "workstream",
      value: {
        ref: "launch-readiness",
        summary: "Launch readiness",
        description: "Coordinate launch readiness work.",
        provenanceQuestionIds: ["PF-02"],
        tasks: [],
      },
    });

    expect(result.success).toBe(true);
  });

  it("rejects unsupported patch targets", () => {
    const result = discoveryPlanPatchOperationSchema.safeParse({
      type: "add",
      target: "milestone",
    });

    expect(result.success).toBe(false);
  });
});
