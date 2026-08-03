import { describe, expect, it } from "vitest";
import { toAutomationProjectSetupRequest } from "@/app/api/jira/_lib/setup-request-mapper";
import { getJiraProjectTemplateById } from "@/app/admin/dashboard/jira/_config/projectOptions";

const template = getJiraProjectTemplateById("business-process-control");

describe("Jira setup request mapper", () => {
  it("converts app-facing links to backend canonical links", () => {
    const mapped = toAutomationProjectSetupRequest({
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
          ref: "source-workstream",
          summary: "Source Workstream",
          links: [
            {
              ref: "source-blocks-target",
              type: "Blocks",
              sourceRef: "source-workstream",
              inwardRef: "target-workstream",
              outwardRef: "source-workstream",
            },
          ],
          tasks: [
            {
              ref: "source-task",
              summary: "Source Task",
              links: [
                {
                  ref: "source-informs-target",
                  type: "Informs",
                  sourceRef: "source-task",
                  inwardRef: "target-task",
                  outwardRef: "source-task",
                  relationship: "informs",
                  reason: "Evidence flows to the target.",
                  category: "information-flow",
                },
                {
                  ref: "source-implemented-by-target",
                  type: "Implemented By",
                  sourceRef: "source-task",
                  inwardRef: "implementation-task",
                  outwardRef: "source-task",
                },
              ],
            },
            {
              ref: "target-task",
              summary: "Target Task",
            },
            {
              ref: "implementation-task",
              summary: "Implementation Task",
            },
          ],
        },
        {
          ref: "target-workstream",
          summary: "Target Workstream",
        },
      ],
    });

    expect(mapped.workstreams[0]?.links).toEqual([
      {
        targetRef: "target-workstream",
        linkType: "Blocks",
      },
    ]);
    expect(mapped.workstreams[0]?.tasks?.[0]?.links).toEqual([
      {
        targetRef: "target-task",
        linkType: "Relates",
        relationship: "informs",
        reason: "Evidence flows to the target.",
        category: "information-flow",
      },
      {
        targetRef: "implementation-task",
        linkType: "Relates",
        relationship: "Implemented By",
      },
    ]);
  });

  it("preserves inward direction when the app link has the source on the inward side", () => {
    const mapped = toAutomationProjectSetupRequest({
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
              ref: "company-relates-brand",
              type: "Relates",
              inwardRef: "company",
              outwardRef: "brand",
            },
          ],
        },
        {
          ref: "brand",
          summary: "Brand",
        },
      ],
    });

    expect(mapped.workstreams[0]?.links).toEqual([
      {
        targetRef: "brand",
        linkType: "Relates",
        direction: "inward",
      },
    ]);
  });
});
