import { z } from "zod";
import {
  findJiraProjectTemplateByKey,
  getJiraWorkflowOption,
  JIRA_PROJECT_TEMPLATE_KEYS,
  JIRA_WORKFLOW_SELECTION_IDS,
} from "../_config/projectOptions";

const MAX_REF_LENGTH = 120;
const MAX_LINK_REF_LENGTH = 200;
const MAX_SUMMARY_LENGTH = 255;
const MAX_DESCRIPTION_LENGTH = 10_000;
const MAX_WORKSTREAMS = 200;
const MAX_TASKS_PER_WORKSTREAM = 500;
const MAX_SUBTASKS_PER_TASK = 500;
const MAX_LINKS_PER_ISSUE = 200;
const MAX_LABEL_LENGTH = 80;

const nonEmptyString = (max: number) => z.string().trim().min(1).max(max);
export const jiraProjectTypeKeySchema = z.enum([
  "business",
  "software",
]);
export const jiraProjectTemplateKeySchema = z.enum(JIRA_PROJECT_TEMPLATE_KEYS);
export const jiraWorkflowSelectionIdSchema = z.enum(JIRA_WORKFLOW_SELECTION_IDS);

export const jiraIdParamSchema = z.object({
  setupId: z.uuid(),
});

export const jiraRunIdParamSchema = z.object({
  runId: z.uuid(),
});

export const jiraIssueLinkSchema = z.object({
  ref: nonEmptyString(MAX_LINK_REF_LENGTH),
  type: nonEmptyString(80),
  inwardRef: nonEmptyString(MAX_REF_LENGTH),
  outwardRef: nonEmptyString(MAX_REF_LENGTH),
  sourceRef: nonEmptyString(MAX_REF_LENGTH).optional(),
  relationship: nonEmptyString(120).optional(),
  reason: z.string().max(MAX_DESCRIPTION_LENGTH).optional(),
  category: nonEmptyString(120).optional(),
});

export const jiraSubtaskSchema = z.object({
  ref: nonEmptyString(MAX_REF_LENGTH),
  summary: nonEmptyString(MAX_SUMMARY_LENGTH),
  description: z.string().max(MAX_DESCRIPTION_LENGTH).optional(),
  issueType: nonEmptyString(80).optional(),
  priority: nonEmptyString(80).optional(),
  labels: z.array(nonEmptyString(MAX_LABEL_LENGTH)).optional(),
  dueDate: nonEmptyString(32).optional(),
});

export const jiraTaskSchema = z.object({
  ref: nonEmptyString(MAX_REF_LENGTH),
  summary: nonEmptyString(MAX_SUMMARY_LENGTH),
  description: z.string().max(MAX_DESCRIPTION_LENGTH).optional(),
  issueType: nonEmptyString(80).optional(),
  priority: nonEmptyString(80).optional(),
  labels: z.array(nonEmptyString(MAX_LABEL_LENGTH)).optional(),
  dueDate: nonEmptyString(32).optional(),
  links: z.array(jiraIssueLinkSchema).max(MAX_LINKS_PER_ISSUE).optional(),
  subtasks: z.array(jiraSubtaskSchema).max(MAX_SUBTASKS_PER_TASK).optional(),
});

export const jiraWorkstreamSchema = z.object({
  ref: nonEmptyString(MAX_REF_LENGTH),
  summary: nonEmptyString(MAX_SUMMARY_LENGTH),
  description: z.string().max(MAX_DESCRIPTION_LENGTH).optional(),
  issueType: nonEmptyString(80).optional(),
  priority: nonEmptyString(80).optional(),
  labels: z.array(nonEmptyString(MAX_LABEL_LENGTH)).optional(),
  targetStartDate: nonEmptyString(32).optional(),
  targetEndDate: nonEmptyString(32).optional(),
  dueDate: nonEmptyString(32).optional(),
  links: z.array(jiraIssueLinkSchema).max(MAX_LINKS_PER_ISSUE).optional(),
  tasks: z.array(jiraTaskSchema).max(MAX_TASKS_PER_WORKSTREAM).optional(),
});

export const jiraProjectSetupRequestSchema = z.object({
  project: z.object({
    key: nonEmptyString(32),
    name: nonEmptyString(255),
    projectTypeKey: jiraProjectTypeKeySchema,
    projectTemplateKey: jiraProjectTemplateKeySchema,
    createIfMissing: z.boolean().optional(),
    existingProjectPolicy: z.enum(["reuse", "fail"]).optional(),
  }).superRefine((project, context) => {
    const template = findJiraProjectTemplateByKey(project.projectTemplateKey);

    if (!template || template.projectTypeKey !== project.projectTypeKey) {
      context.addIssue({
        code: "custom",
        path: ["projectTemplateKey"],
        message: "Project template key must match the selected Jira project type.",
      });
    }
  }),
  issueHierarchy: z.object({
    workstreamIssueType: nonEmptyString(80),
    taskIssueType: nonEmptyString(80),
    subtaskIssueType: nonEmptyString(80),
    createMissingIssueTypes: z.boolean().optional(),
  }),
  workflow: z.object({
    id: jiraWorkflowSelectionIdSchema,
  }),
  workstreams: z.array(jiraWorkstreamSchema).max(MAX_WORKSTREAMS),
}).superRefine((setup, context) => {
  const template = findJiraProjectTemplateByKey(setup.project.projectTemplateKey);
  const workflow = getJiraWorkflowOption(setup.workflow.id);

  if (
    template &&
    !workflow.compatibleManagementStyles.includes(template.managementStyle)
  ) {
    context.addIssue({
      code: "custom",
      path: ["workflow", "id"],
      message: "Custom workflow schemes can only be assigned to company-managed projects.",
    });
  }
});

export const updateJiraSetupActionSchema = z.object({
  setupId: z.uuid(),
  request: jiraProjectSetupRequestSchema,
});

export const startJiraSetupRunActionSchema = z.object({
  setupId: z.uuid(),
});

export const jiraCredentialInputSchema = z.object({
  siteUrl: z.string().trim().url().refine((value) => value.startsWith("https://"), {
    message: "Jira site URL must use HTTPS.",
  }),
  email: z.string().trim().email().max(255),
  apiToken: z.string().trim().min(1).max(4096),
});

export const jiraCredentialStatusSchema = z.object({
  configured: z.boolean(),
  accountId: z.string().optional(),
  displayName: z.string().optional(),
  verifiedAt: z.iso.datetime().optional(),
  missingFields: z.array(z.enum(["siteUrl", "email", "apiToken", "accountId"])),
});

export const jiraCredentialVerificationSchema = z.object({
  accountId: z.string().min(1),
  displayName: z.string().optional(),
  emailAddress: z.string().optional(),
});

export const jiraValidationResultSchema = z.object({
  valid: z.literal(true),
});

export const jiraHealthResultSchema = z.object({
  ok: z.boolean(),
});

export const jiraProjectSummarySchema = z.object({
  key: z.string().min(1),
  name: z.string().min(1),
  description: z.string().optional(),
});

export const jiraProjectSummaryListSchema = z.array(jiraProjectSummarySchema);

export const jiraIssueReferenceSchema = z.object({
  id: z.string(),
  key: z.string(),
  summary: z.string(),
});

export const jiraSetupStateSchema = z.object({
  workstreams: z.record(z.string(), jiraIssueReferenceSchema),
  tasks: z.record(z.string(), jiraIssueReferenceSchema),
  subtasks: z.record(z.string(), jiraIssueReferenceSchema),
  completedLinks: z.array(
    z.object({
      id: z.string(),
      type: z.string(),
      inwardIssueKey: z.string(),
      outwardIssueKey: z.string(),
    }),
  ),
});

export const jiraSetupRecordSchema = z.object({
  id: z.uuid(),
  ownerUserId: z.string().min(1),
  status: z.literal("draft"),
  request: jiraProjectSetupRequestSchema,
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export const jiraSetupListSchema = z.array(jiraSetupRecordSchema);

export const jiraWorkflowResultSchema = z.object({
  mode: z.enum(["skip", "create", "update", "jira-default", "document-heavy"]),
  selectionId: jiraWorkflowSelectionIdSchema.optional(),
  selectionName: z.string().optional(),
  statusesCreatedOrUpdated: z.array(z.string()),
  workflowsCreatedOrUpdated: z.array(z.string()),
  workflowSchemeId: z.string().optional(),
  retainedTemplateWorkflow: z.boolean().optional(),
  workflowSchemeAssignment: z.enum(["not-applicable", "assigned", "failed"]).optional(),
});

export const jiraRunRecordSchema = z.object({
  id: z.uuid(),
  setupId: z.uuid(),
  ownerUserId: z.string().min(1),
  status: z.enum(["queued", "running", "succeeded", "failed"]),
  state: jiraSetupStateSchema.optional(),
  jiraProject: z
    .object({
      id: z.string().optional(),
      key: z.string(),
      name: z.string().optional(),
      self: z.url().optional(),
    })
    .optional(),
  workflowResult: jiraWorkflowResultSchema.optional(),
  report: z.string().optional(),
  error: z.string().optional(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  completedAt: z.iso.datetime().optional(),
});

export const jiraReportSchema = z.string();

export type JiraProjectSetupRequestInput = z.infer<
  typeof jiraProjectSetupRequestSchema
>;
