import { describe, expect, it } from "vitest";
import {
  buildJiraProjectSetupRequest,
  canAutosaveJiraSetupBuilder,
  canPreviewJiraSetupBuilder,
  defaultJiraProjectSetupDraft,
  findJiraProjectSummaryConflict,
  generateJiraProjectKeyFromName,
  getJiraStagePreviewData,
  getJiraWorkflowSelectionState,
  getJiraHierarchyStats,
  mergeJiraStagedSetupImports,
  parseJiraGeneratedHierarchyJson,
  parseJiraSubtaskStageJson,
  parseJiraTaskLinkStageJson,
  parseJiraTaskStageJson,
  parseJiraWorkstreamLinkStageJson,
  parseJiraWorkstreamStageJson,
  shouldAttemptJiraAutosave,
  validateJiraGeneratedHierarchy,
  validateJiraProjectSetupRequestForBuilder,
} from "@/app/admin/dashboard/jira/_utils/setupBuilder";
import {
  DEFAULT_JIRA_PROJECT_TEMPLATE_ID,
  getJiraProjectTemplateById,
} from "@/app/admin/dashboard/jira/_config/projectOptions";
import type { JiraWorkstreamInput } from "@/app/admin/dashboard/jira/_types";

const generatedWorkstreams: JiraWorkstreamInput[] = [
  {
    ref: "company",
    summary: "Company Overview",
    links: [
      {
        ref: "company-blocks-growth",
        type: "Blocks",
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
    summary: "Growth System",
  },
];

describe("Jira setup builder helpers", () => {
  it("uses project management as the default Jira project template", () => {
    expect(DEFAULT_JIRA_PROJECT_TEMPLATE_ID).toBe("business-project-management");
    expect(defaultJiraProjectSetupDraft.projectTemplateId).toBe(
      "business-project-management",
    );
  });

  it("generates a project key from the first letter of each word", () => {
    expect(generateJiraProjectKeyFromName("Acme Growth Lab")).toBe("AGL");
    expect(generateJiraProjectKeyFromName("  Acme, growth -- lab! ")).toBe(
      "AGL",
    );
    expect(generateJiraProjectKeyFromName("")).toBe("");
  });

  it("detects generated project key and name conflicts", () => {
    const summaries = [{ key: "AGL", name: "Acme Growth Lab" }];

    expect(
      findJiraProjectSummaryConflict("Another Great Launch", "AGL", summaries),
    ).toEqual(summaries[0]);
    expect(
      findJiraProjectSummaryConflict("Acme Growth Lab", "OTHER", summaries),
    ).toEqual(summaries[0]);
    expect(
      findJiraProjectSummaryConflict("New Client Portal", "NCP", summaries),
    ).toBeNull();
  });

  it("imports generated hierarchy from a workstreams wrapper", () => {
    const result = parseJiraGeneratedHierarchyJson(
      JSON.stringify({ workstreams: generatedWorkstreams }),
    );

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.stats).toEqual({
        workstreams: 2,
        tasks: 1,
        subtasks: 1,
        links: 1,
      });
    }
  });

  it("imports generated hierarchy from a raw workstreams array", () => {
    const result = parseJiraGeneratedHierarchyJson(
      JSON.stringify(generatedWorkstreams),
    );

    expect(result.success).toBe(true);
  });

  it("rejects malformed JSON", () => {
    const result = parseJiraGeneratedHierarchyJson("{nope");

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.issues[0]?.path).toBe("json");
    }
  });

  it("detects duplicate generated refs", () => {
    const issues = validateJiraGeneratedHierarchy([
      {
        ref: "duplicate",
        summary: "Duplicate workstream",
        tasks: [
          {
            ref: "duplicate",
            summary: "Duplicate task",
          },
        ],
      },
    ]);

    expect(issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          message: 'Duplicate generated ref "duplicate".',
        }),
      ]),
    );
  });

  it("detects missing generated link targets", () => {
    const issues = validateJiraGeneratedHierarchy([
      {
        ref: "company",
        summary: "Company",
        links: [
          {
            ref: "missing-target-link",
            type: "Relates",
            inwardRef: "company",
            outwardRef: "missing-target",
          },
        ],
      },
    ]);

    expect(issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: "missing-target-link",
          message: 'Link target "missing-target" cannot be resolved.',
        }),
      ]),
    );
  });

  it("builds the setup request from editable project space and generated hierarchy", () => {
    const template = getJiraProjectTemplateById("software-company-kanban");
    const request = buildJiraProjectSetupRequest(
      {
        ...defaultJiraProjectSetupDraft,
        projectKey: " GEN ",
        projectName: " General Project ",
        projectTemplateId: template.id,
      },
      generatedWorkstreams,
    );

    expect(request.project).toEqual({
      key: "GEN",
      name: "General Project",
      projectTypeKey: template.projectTypeKey,
      projectTemplateKey: template.projectTemplateKey,
      createIfMissing: true,
      existingProjectPolicy: "fail",
    });
    expect(request.workflow).toEqual({ id: "jira-default" });
    expect(request.workstreams).toHaveLength(2);
  });

  it("disables custom workflow selection for team-managed templates", () => {
    expect(
      getJiraWorkflowSelectionState("software-team-kanban", "document-heavy"),
    ).toEqual({
      disabled: true,
      reason:
        "Custom workflow schemes can only be assigned to company-managed projects.",
    });
    expect(
      getJiraWorkflowSelectionState("business-process-control", "document-heavy"),
    ).toEqual({ disabled: false });
  });

  it("validates the complete builder request before autosave", () => {
    const request = buildJiraProjectSetupRequest(
      {
        ...defaultJiraProjectSetupDraft,
        projectKey: "",
        projectName: "General Project",
      },
      generatedWorkstreams,
    );

    expect(validateJiraProjectSetupRequestForBuilder(request)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: "project.key",
        }),
      ]),
    );
  });

  it("blocks autosave and preview until project identity is ready", () => {
    expect(
      canAutosaveJiraSetupBuilder({
        hasCheckedProjectKey: false,
        hasImportedHierarchy: true,
        localIssueCount: 0,
        isPending: false,
      }),
    ).toBe(false);
    expect(
      canPreviewJiraSetupBuilder({
        hasCheckedProjectKey: false,
        hasImportedHierarchy: true,
        localIssueCount: 0,
      }),
    ).toBe(false);
  });

  it("blocks autosave and preview when Jira automation is unavailable", () => {
    expect(
      canAutosaveJiraSetupBuilder({
        hasCheckedProjectKey: true,
        hasImportedHierarchy: true,
        localIssueCount: 0,
        isPending: false,
        automationReady: false,
      }),
    ).toBe(false);
    expect(
      canPreviewJiraSetupBuilder({
        hasCheckedProjectKey: true,
        hasImportedHierarchy: true,
        localIssueCount: 0,
        automationReady: false,
      }),
    ).toBe(false);
  });

  it("does not retry the same failed autosave signature", () => {
    expect(
      shouldAttemptJiraAutosave({
        signature: "same-payload",
        lastSavedSignature: null,
        lastFailedSignature: "same-payload",
      }),
    ).toBe(false);
  });

  it("allows a new autosave attempt after the setup payload changes", () => {
    expect(
      shouldAttemptJiraAutosave({
        signature: "changed-payload",
        lastSavedSignature: null,
        lastFailedSignature: "old-payload",
      }),
    ).toBe(true);
  });

  it("returns stage preview data only when the stage has imported records", () => {
    expect(
      getJiraStagePreviewData(
        {
          workstreams: [{ ref: "company", summary: "Company" }],
          workstreamLinks: [],
          tasks: [],
          taskLinks: [],
          subtasks: [],
        },
        "workstreams",
      ),
    ).toEqual([{ ref: "company", summary: "Company" }]);
    expect(
      getJiraStagePreviewData(
        {
          workstreams: [],
          workstreamLinks: [],
          tasks: [],
          taskLinks: [],
          subtasks: [],
        },
        "tasks",
      ),
    ).toBeNull();
  });

  it("rejects staged workstream links with missing workstream refs", () => {
    const result = parseJiraWorkstreamLinkStageJson(
      JSON.stringify({
        workstreamLinks: [
          {
            ref: "missing-link",
            type: "Relates",
            inwardRef: "company",
            outwardRef: "missing",
          },
        ],
      }),
      [{ ref: "company", summary: "Company" }],
    );

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            message: 'Workstream link target "missing" cannot be resolved.',
          }),
        ]),
      );
    }
  });

  it("imports source-shaped staged planning files at Pearl Box scale", () => {
    const source = sourceShapedPlanningFiles();
    const workstreams = parseJiraWorkstreamStageJson(
      JSON.stringify(source.workstreams),
    );

    expect(workstreams.success).toBe(true);
    if (!workstreams.success) return;

    expect(workstreams.data).toHaveLength(15);
    expect(workstreams.data[0]?.description).toContain(
      "Question: What should Workstream 1 establish?",
    );
    expect(workstreams.data[0]).toMatchObject({
      issueType: "Workstream",
      priority: "High",
      labels: ["launch"],
      targetStartDate: "2026-08-03",
      targetEndDate: "2026-08-07",
      dueDate: "2026-08-07",
    });

    const workstreamLinks = parseJiraWorkstreamLinkStageJson(
      JSON.stringify(source.workstreamRelationships),
      workstreams.data,
    );

    expect(workstreamLinks.success).toBe(true);
    if (!workstreamLinks.success) return;
    expect(workstreamLinks.data).toHaveLength(41);
    expect(workstreamLinks.data[0]).toMatchObject({
      type: "Blocks",
      sourceRef: "workstream-and-1",
      inwardRef: "workstream-and-2",
      outwardRef: "workstream-and-1",
      relationship: "blocks",
    });

    const tasks = parseJiraTaskStageJson(
      JSON.stringify(source.tasks),
      workstreams.data,
    );

    expect(tasks.success).toBe(true);
    if (!tasks.success) return;
    expect(tasks.data).toHaveLength(265);
    expect(tasks.data[0]).toMatchObject({
      workstreamRef: "workstream-and-1",
      issueType: "Task",
      priority: "Medium",
      labels: ["task"],
      dueDate: "2026-08-08",
    });
    expect(tasks.data[0]?.description).toContain(
      "Question: What must Task 1 prove?",
    );

    const taskLinks = parseJiraTaskLinkStageJson(
      JSON.stringify(source.taskRelationships),
      tasks.data,
    );

    expect(taskLinks.success).toBe(true);
    if (!taskLinks.success) return;
    expect(taskLinks.data).toHaveLength(501);
    expect(taskLinks.data.some((link) => link.type === "Informs")).toBe(true);

    const subtasks = parseJiraSubtaskStageJson(
      JSON.stringify(source.subtasks),
      tasks.data,
    );

    expect(subtasks.success).toBe(true);
    if (!subtasks.success) return;
    expect(subtasks.data).toHaveLength(2240);
    expect(subtasks.data[0]).toMatchObject({
      taskRef: "workstream-and-1--task-1",
      issueType: "Sub-task",
      priority: "Low",
      labels: ["subtask"],
      dueDate: "2026-08-09",
    });
    expect(subtasks.data[0]?.description).toContain(
      "Question: Which evidence is needed for subtask 1?",
    );

    const merged = mergeJiraStagedSetupImports({
      workstreams: workstreams.data,
      workstreamLinks: workstreamLinks.data,
      tasks: tasks.data,
      taskLinks: taskLinks.data,
      subtasks: subtasks.data,
    });

    expect(getJiraHierarchyStats(merged)).toEqual({
      workstreams: 15,
      tasks: 265,
      subtasks: 2240,
      links: 542,
    });
    expect(validateJiraGeneratedHierarchy(merged)).toEqual([]);

    const request = buildJiraProjectSetupRequest(
      {
        ...defaultJiraProjectSetupDraft,
        projectKey: "PBML",
        projectName: "Pearl Box Market Launch",
      },
      merged,
    );

    expect(validateJiraProjectSetupRequestForBuilder(request)).toEqual([]);
    expect(Buffer.byteLength(JSON.stringify(request), "utf8")).toBeLessThan(
      15_000_000,
    );
  });

  it("reports unresolved source-shaped relationship refs clearly", () => {
    const result = parseJiraWorkstreamLinkStageJson(
      JSON.stringify({
        relationships: [
          {
            ref: "missing-link",
            sourceWorkstreamRef: "company",
            targetWorkstreamRef: "missing",
            linkType: "Relates",
          },
        ],
      }),
      [{ ref: "company", summary: "Company" }],
    );

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.issues[0]?.message).toBe(
        'Workstream link target "missing" cannot be resolved.',
      );
    }
  });

  it("resolves stale generic task relationship names within the referenced workstream", () => {
    const tasks = [
      {
        ref: "brand-strategy-and-identity--create-brand-mission-vision-and-values",
        workstreamRef: "brand-strategy-and-identity",
        summary: "Create Brand Mission, Vision, and Values",
      },
      {
        ref: "company-overview--create-company-mission-vision-and-values",
        workstreamRef: "company-overview",
        summary: "Create Company Mission, Vision, and Values",
      },
      {
        ref: "company-overview--create-company-summary",
        workstreamRef: "company-overview",
        summary: "Create Company Summary",
      },
    ];
    const result = parseJiraTaskLinkStageJson(
      JSON.stringify({
        relationships: [
          {
            ref: "company-overview--create-mission-vision-and-values--informs--company-overview--create-company-summary",
            sourceTaskRef: "company-overview--create-mission-vision-and-values",
            targetTaskRef: "company-overview--create-company-summary",
            sourceSummary: "Create Mission, Vision, and Values",
            targetSummary: "Create Company Summary",
            sourceWorkstreamRef: "company-overview",
            targetWorkstreamRef: "company-overview",
            linkType: "Informs",
          },
        ],
      }),
      tasks,
    );

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data[0]).toMatchObject({
        sourceRef: "company-overview--create-company-mission-vision-and-values",
        outwardRef: "company-overview--create-company-mission-vision-and-values",
        inwardRef: "company-overview--create-company-summary",
      });
    }
  });

  it("rejects staged tasks with missing parent workstreams", () => {
    const result = parseJiraTaskStageJson(
      JSON.stringify({
        tasks: [
          {
            ref: "company-brief",
            workstreamRef: "missing",
            summary: "Create company brief",
          },
        ],
      }),
      [{ ref: "company", summary: "Company" }],
    );

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.issues[0]?.message).toBe(
        'Task parent workstream "missing" cannot be resolved.',
      );
    }
  });

  it("rejects staged task links with missing task refs", () => {
    const result = parseJiraTaskLinkStageJson(
      JSON.stringify({
        taskLinks: [
          {
            ref: "missing-task-link",
            type: "Blocks",
            inwardRef: "company-brief",
            outwardRef: "missing-task",
          },
        ],
      }),
      [
        {
          ref: "company-brief",
          workstreamRef: "company",
          summary: "Create company brief",
        },
      ],
    );

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.issues[0]?.message).toBe(
        'Task link target "missing-task" cannot be resolved.',
      );
    }
  });

  it("rejects staged subtasks with missing parent tasks", () => {
    const result = parseJiraSubtaskStageJson(
      JSON.stringify({
        subtasks: [
          {
            ref: "brief-review",
            taskRef: "missing-task",
            summary: "Review brief",
          },
        ],
      }),
      [
        {
          ref: "company-brief",
          workstreamRef: "company",
          summary: "Create company brief",
        },
      ],
    );

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.issues[0]?.message).toBe(
        'Subtask parent task "missing-task" cannot be resolved.',
      );
    }
  });

  it("merges staged imports into the existing hierarchy shape", () => {
    const workstreams = parseJiraWorkstreamStageJson(
      JSON.stringify({
        workstreams: [
          { ref: "company", summary: "Company Overview" },
          { ref: "growth", summary: "Growth System" },
        ],
      }),
    );

    expect(workstreams.success).toBe(true);
    if (!workstreams.success) return;

    const workstreamLinks = parseJiraWorkstreamLinkStageJson(
      JSON.stringify({
        workstreamLinks: [
          {
            ref: "company-blocks-growth",
            type: "Blocks",
            inwardRef: "company",
            outwardRef: "growth",
          },
        ],
      }),
      workstreams.data,
    );
    const tasks = parseJiraTaskStageJson(
      JSON.stringify({
        tasks: [
          {
            ref: "company-brief",
            workstreamRef: "company",
            summary: "Create company brief",
          },
          {
            ref: "growth-plan",
            workstreamRef: "growth",
            summary: "Create growth plan",
          },
        ],
      }),
      workstreams.data,
    );

    expect(workstreamLinks.success).toBe(true);
    expect(tasks.success).toBe(true);
    if (!workstreamLinks.success || !tasks.success) return;

    const taskLinks = parseJiraTaskLinkStageJson(
      JSON.stringify({
        taskLinks: [
          {
            ref: "brief-blocks-plan",
            type: "Blocks",
            inwardRef: "company-brief",
            outwardRef: "growth-plan",
          },
        ],
      }),
      tasks.data,
    );
    const subtasks = parseJiraSubtaskStageJson(
      JSON.stringify({
        subtasks: [
          {
            ref: "company-brief-review",
            taskRef: "company-brief",
            summary: "Review company brief",
          },
        ],
      }),
      tasks.data,
    );

    expect(taskLinks.success).toBe(true);
    expect(subtasks.success).toBe(true);
    if (!taskLinks.success || !subtasks.success) return;

    expect(
      mergeJiraStagedSetupImports({
        workstreams: workstreams.data,
        workstreamLinks: workstreamLinks.data,
        tasks: tasks.data,
        taskLinks: taskLinks.data,
        subtasks: subtasks.data,
      }),
    ).toEqual([
      {
        ref: "company",
        summary: "Company Overview",
        links: [
          {
            ref: "company-blocks-growth",
            type: "Blocks",
            inwardRef: "company",
            outwardRef: "growth",
          },
        ],
        tasks: [
          {
            ref: "company-brief",
            summary: "Create company brief",
            links: [
              {
                ref: "brief-blocks-plan",
                type: "Blocks",
                inwardRef: "company-brief",
                outwardRef: "growth-plan",
              },
            ],
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
        summary: "Growth System",
        links: [],
        tasks: [
          {
            ref: "growth-plan",
            summary: "Create growth plan",
            links: [],
            subtasks: [],
          },
        ],
      },
    ]);
  });

  it("builds the merged setup preview request from staged imports", () => {
    const workstreams = mergeJiraStagedSetupImports({
      workstreams: [{ ref: "company", summary: "Company Overview" }],
      workstreamLinks: [],
      tasks: [
        {
          ref: "company-brief",
          workstreamRef: "company",
          summary: "Create company brief",
        },
      ],
      taskLinks: [],
      subtasks: [
        {
          ref: "company-brief-review",
          taskRef: "company-brief",
          summary: "Review company brief",
        },
      ],
    });
    const request = buildJiraProjectSetupRequest(
      {
        ...defaultJiraProjectSetupDraft,
        projectKey: "ABC",
        projectName: "Acme Business Center",
      },
      workstreams,
    );

    expect(request).toMatchObject({
      project: {
        key: "ABC",
        name: "Acme Business Center",
      },
      workstreams: [
        {
          ref: "company",
          tasks: [
            {
              ref: "company-brief",
              subtasks: [
                {
                  ref: "company-brief-review",
                },
              ],
            },
          ],
        },
      ],
    });
  });

  it("counts generated hierarchy records", () => {
    expect(getJiraHierarchyStats(generatedWorkstreams)).toEqual({
      workstreams: 2,
      tasks: 1,
      subtasks: 1,
      links: 1,
    });
  });
});

function sourceShapedPlanningFiles() {
  const workstreams = Array.from({ length: 15 }, (_, index) => {
    const sequence = index + 1;

    return {
      ref: `workstream-and-${sequence}`,
      summary: `Workstream ${sequence}`,
      issueType: "Workstream",
      priority: "High",
      labels: ["launch"],
      targetStartDate: "2026-08-03",
      targetEndDate: "2026-08-07",
      dueDate: "2026-08-07",
      description: sourceDescription(
        `What should Workstream ${sequence} establish?`,
        `Workstream ${sequence} should establish a decision-ready answer.`,
      ),
    };
  });
  const sourceWorkstreams = workstreams.map((workstream, index) => ({
    ref: workstream.ref.replace("-and-", "-"),
    summary: `${index + 1}. ${workstream.summary}`,
  }));
  const taskGroups: {
    workstreamRef: string;
    issues: {
      ref: string;
      summary: string;
      issueType: string;
      priority: string;
      labels: string[];
      dueDate: string;
      description: ReturnType<typeof sourceDescription>;
    }[];
  }[] = [];
  const taskLookup: {
    ref: string;
    sourceRef: string;
    summary: string;
    workstreamRef: string;
    sourceWorkstreamRef: string;
  }[] = [];
  let taskSequence = 1;

  workstreams.forEach((workstream, workstreamIndex) => {
    const taskCount = workstreamIndex === 0 ? 27 : 17;
    const issues = Array.from({ length: taskCount }, () => {
      const sequence = taskSequence++;
      const sourceWorkstreamRef = sourceWorkstreams[workstreamIndex]!.ref;
      const ref = `${workstream.ref}--task-${sequence}`;
      const sourceRef = `${sourceWorkstreamRef}--task-${sequence}`;
      const summary = `Create Task ${sequence}`;

      taskLookup.push({
        ref,
        sourceRef,
        summary,
        workstreamRef: workstream.ref,
        sourceWorkstreamRef,
      });

      return {
        ref,
        summary,
        issueType: "Task",
        priority: "Medium",
        labels: ["task"],
        dueDate: "2026-08-08",
        description: sourceDescription(
          `What must Task ${sequence} prove?`,
          `Task ${sequence} should prove the planned outcome.`,
        ),
      };
    });

    taskGroups.push({
      workstreamRef: workstream.ref,
      issues,
    });
  });

  const subtaskGroups = taskLookup.map((task, taskIndex) => {
    const subtaskCount = taskIndex < 120 ? 9 : 8;

    return {
      parentTaskRef: task.ref,
      documentCategory: "standard-document",
      subtasks: Array.from({ length: subtaskCount }, (_, subtaskIndex) => {
        const sequence = subtaskIndex + 1;

        return {
          ref: `${task.ref}--subtask-${sequence}`,
          sequence,
          summary: `Subtask ${taskIndex + 1}.${sequence}`,
          issueType: "Sub-task",
          priority: "Low",
          labels: ["subtask"],
          dueDate: "2026-08-09",
          description: sourceDescription(
            `Which evidence is needed for subtask ${sequence}?`,
            `Subtask ${sequence} should collect the required evidence.`,
          ),
        };
      }),
    };
  });

  return {
    workstreams: {
      metadata: {
        name: "Workstream source",
      },
      workstreams,
    },
    workstreamRelationships: {
      metadata: {
        name: "Workstream relationships",
      },
      workstreams: sourceWorkstreams,
      relationships: Array.from({ length: 41 }, (_, index) => {
        const source = sourceWorkstreams[index % sourceWorkstreams.length]!;
        const target = sourceWorkstreams[(index + 1) % sourceWorkstreams.length]!;

        return {
          ref: `${source.ref}--blocks--${target.ref}-${index + 1}`,
          sequence: index + 1,
          sourceWorkstreamRef: source.ref,
          targetWorkstreamRef: target.ref,
          linkType: index % 2 === 0 ? "Blocks" : "Relates",
          relationship: index % 2 === 0 ? "blocks" : "relates",
          reason: "Fixture relationship.",
          category: "fixture",
        };
      }),
    },
    tasks: {
      taskGroups,
    },
    taskRelationships: {
      relationships: Array.from({ length: 501 }, (_, index) => {
        const source = taskLookup[index % taskLookup.length]!;
        const target = taskLookup[(index + 1) % taskLookup.length]!;
        const linkType = ["Blocks", "Informs", "Implemented By"][index % 3]!;

        return {
          ref: `${source.sourceRef}--${index + 1}--${target.sourceRef}`,
          sequence: index + 1,
          sourceTaskRef: source.sourceRef,
          targetTaskRef: target.sourceRef,
          sourceSummary: source.summary,
          targetSummary: target.summary,
          sourceWorkstreamRef: source.sourceWorkstreamRef,
          targetWorkstreamRef: target.sourceWorkstreamRef,
          linkType,
          relationship: linkType.toLowerCase(),
          reason: "Fixture task relationship.",
          category: "fixture",
        };
      }),
    },
    subtasks: subtaskGroups,
  };
}

function sourceDescription(question: string, answer: string) {
  return {
    templateRef: "investor-ready-question",
    objective: "Create a decision-ready answer.",
    question,
    deliverable: "A completed planning answer.",
    acceptanceCriteria: ["The question is answered directly."],
    dependencies: ["Relevant source records."],
    example: {
      status: "Illustrative example.",
      answer,
      evidence: [],
      assumptions: ["Founder approval is pending."],
      unresolvedQuestions: ["Which evidence source is authoritative?"],
    },
    notes: "Fixture notes.",
  };
}
