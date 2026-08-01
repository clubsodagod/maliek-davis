import { z } from "zod";
import { TASK_TYPE_OPTIONS, WORK_STATUS_OPTIONS } from "../_config/workManagement";

const workStatusSlugSchema = z.enum(WORK_STATUS_OPTIONS.map((option) => option.slug));
const workStatusNameSchema = z.enum(WORK_STATUS_OPTIONS.map((option) => option.label));
const taskTypeSlugSchema = z.enum(TASK_TYPE_OPTIONS.map((option) => option.slug));

export const synchronizationHealthSchema = z.object({
  jira: z.enum(["synced", "pending", "failed", "unavailable", "not_configured"]),
  confluence: z.enum(["synced", "pending", "failed", "unavailable", "not_configured"]),
  message: z.string().optional(),
  updatedAt: z.iso.datetime().optional(),
});

export const ownershipViewSchema = z.object({
  assignee: z.string().optional(),
  owner: z.string().optional(),
  reviewer: z.string().optional(),
  blockerOwner: z.string().optional(),
  gaps: z.array(z.string()),
});

export const recommendedActionSchema = z.object({
  kind: z.enum([
    "answer-question",
    "complete-answer",
    "review-task",
    "review-project",
    "inspect-blocker",
    "none",
  ]),
  label: z.string(),
  priority: z.enum(["low", "medium", "high"]),
  href: z.string().optional(),
});

export const taskProgressViewSchema = z.object({
  completed: z.number().int().nonnegative(),
  total: z.number().int().nonnegative(),
  label: z.string(),
});

const workItemContextSchema = z.object({
  ref: z.string(),
  issueKey: z.string().optional(),
  summary: z.string(),
});

export const workQueueItemSchema = z.object({
  ref: z.string(),
  issueId: z.string(),
  issueKey: z.string(),
  summary: z.string(),
  issueType: z.string(),
  issueTypeSlug: taskTypeSlugSchema,
  status: workStatusNameSchema,
  statusSlug: workStatusSlugSchema,
  priority: z.string().optional(),
  parent: workItemContextSchema.optional(),
  workstream: workItemContextSchema.optional(),
  dueDate: z.string().optional(),
  overdue: z.boolean(),
  scheduleRisk: z.boolean(),
  progress: taskProgressViewSchema,
  dependencySummary: z.string().optional(),
  blockerSummary: z.string().optional(),
  ownership: ownershipViewSchema,
  synchronizationHealth: synchronizationHealthSchema,
  recommendedAction: recommendedActionSchema,
  version: z.string(),
  updatedAt: z.iso.datetime().optional(),
});

const projectIdentitySchema = z.object({
  key: z.string(),
  name: z.string(),
  description: z.string().optional(),
});

export const statusDistributionItemSchema = z.object({
  status: workStatusNameSchema,
  statusSlug: workStatusSlugSchema,
  count: z.number().int().nonnegative(),
});

export const projectSummaryViewSchema = z.object({
  project: projectIdentitySchema,
  setupId: z.string(),
  runId: z.string().optional(),
  overallCompletion: taskProgressViewSchema,
  workstreamProgress: z.array(workQueueItemSchema),
  statusDistribution: z.array(statusDistributionItemSchema),
  readyWorkCount: z.number().int().nonnegative(),
  overdueCount: z.number().int().nonnegative(),
  scheduleRiskCount: z.number().int().nonnegative(),
  criticalBlockers: z.array(workQueueItemSchema),
  ownershipGapsCount: z.number().int().nonnegative(),
  reviewsAwaitingActionCount: z.number().int().nonnegative(),
  synchronizationHealth: synchronizationHealthSchema,
  recentlyActiveWork: z.array(workQueueItemSchema),
  recommendedNextActions: z.array(recommendedActionSchema),
});

export const workQueueViewSchema = z.object({
  project: projectIdentitySchema.pick({ key: true, name: true }),
  filters: z.object({
    statusSlug: workStatusSlugSchema,
    status: workStatusNameSchema,
    taskTypeSlug: taskTypeSlugSchema.optional(),
    search: z.string().optional(),
    sort: z.string(),
  }),
  counts: z.object({
    total: z.number().int().nonnegative(),
    byStatus: z.array(statusDistributionItemSchema),
    byTaskType: z.array(
      z.object({
        taskTypeSlug: taskTypeSlugSchema,
        label: z.string(),
        count: z.number().int().nonnegative(),
      }),
    ),
  }),
  items: z.array(workQueueItemSchema),
  synchronizationHealth: synchronizationHealthSchema,
  partialSynchronization: z.boolean(),
});

export const evidenceLinkSchema = z.object({
  label: z.string().trim().min(1),
  url: z.url(),
});

export const answerValidationResultSchema = z.object({
  passed: z.boolean(),
  errors: z.array(z.string()),
  warnings: z.array(z.string()),
  validatedAt: z.iso.datetime().optional(),
});

export const answerViewSchema = z.object({
  issueIdOrKey: z.string(),
  version: z.number().int().nonnegative(),
  status: z.enum(["not_started", "draft", "validated", "completed"]),
  answer: z.string(),
  evidence: z.array(evidenceLinkSchema),
  validation: answerValidationResultSchema,
  lastEditorUserId: z.string().optional(),
  updatedAt: z.iso.datetime().optional(),
  completedAt: z.iso.datetime().optional(),
});

export const subtaskQuestionViewSchema = z.object({
  project: projectIdentitySchema.pick({ key: true, name: true }),
  issue: workQueueItemSchema,
  parentTask: workQueueItemSchema,
  workstream: workQueueItemSchema,
  question: z.object({
    objective: z.string().optional(),
    question: z.string(),
    guidance: z.array(z.string()),
    deliverable: z.string().optional(),
    acceptanceCriteria: z.array(z.string()),
    evidenceRequirements: z.array(z.string()),
  }),
  answer: answerViewSchema,
  queue: z.object({
    position: z.number().int().positive(),
    total: z.number().int().nonnegative(),
    previousIssueId: z.string().optional(),
    nextIssueId: z.string().optional(),
  }),
  taskProgress: taskProgressViewSchema,
  synchronizationHealth: synchronizationHealthSchema,
});

export const answerSaveRequestSchema = z.object({
  version: z.number().int().nonnegative(),
  answer: z.string(),
  evidence: z.array(evidenceLinkSchema),
});

export const answerValidationRequestSchema = z.object({
  version: z.number().int().nonnegative(),
  answer: z.string().optional(),
  evidence: z.array(evidenceLinkSchema).optional(),
});

export const answerCompletionRequestSchema = z.object({
  version: z.number().int().nonnegative(),
});
