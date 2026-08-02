import { z } from "zod";
import { jiraProjectSetupRequestSchema, jiraSetupRecordSchema } from "./api";

export const discoveryTierSchema = z.enum(["quick", "standard", "advanced"]);
export const discoverySessionStatusSchema = z.enum([
  "not_started",
  "in_progress",
  "ready_for_final_review",
  "generating_plan",
  "completed",
  "failed",
  "skipped",
]);
export const discoverySectionStatusSchema = z.enum([
  "not_started",
  "draft",
  "processing",
  "needs_clarification",
  "ready_for_approval",
  "approved",
  "revision_required",
]);
export const discoveryAnswerStateSchema = z.enum([
  "unanswered",
  "draft",
  "confirmed",
  "assumption",
  "disputed",
  "unknown",
  "not_applicable",
  "deferred",
]);

const optionalDateTime = z.iso.datetime().optional();
const provenanceQuestionIdsSchema = z.array(z.string().min(1));

export const discoveryQuestionSectionSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  growStage: z.enum(["goal", "reality", "obstacles", "options", "way_forward"]),
  order: z.number().int().nonnegative(),
});

export const discoveryQuestionSchema = z.object({
  id: z.string().min(1),
  sectionId: z.string().min(1),
  order: z.number().int().nonnegative(),
  prompt: z.string().min(1),
  purpose: z.string(),
  tier: discoveryTierSchema,
  importance: z.string(),
  answerFormat: z.string(),
  required: z.boolean(),
  suggestedOptions: z.array(z.string()),
  followUpTrigger: z.string(),
  followUpQuestions: z.array(z.string()),
  defines: z.string(),
  guidance: z.string(),
  example: z.string(),
  definitionOfDone: z.string(),
  outputFields: z.array(z.string()),
});

export const discoveryQuestionBankSchema = z.object({
  version: z.string().min(1),
  sourceHash: z.string().min(1),
  sections: z.array(discoveryQuestionSectionSchema),
  questions: z.array(discoveryQuestionSchema),
  skipRules: z.array(z.object({
    id: z.string(),
    label: z.string(),
    whenAnswerIncludesAny: z.array(z.string()),
    questionIds: z.array(z.string()),
    reason: z.enum([
      "not_applicable",
      "answered_by_another_response",
      "excluded_by_discovery_tier",
      "deferred",
      "conditional_trigger_not_met",
    ]),
  })),
  triggerRules: z.array(z.object({
    id: z.string(),
    label: z.string(),
    whenAnswerIncludesAny: z.array(z.string()),
    activateQuestionIds: z.array(z.string()),
  })),
});

const discoverySkippedQuestionSchema = z.object({
  questionId: z.string().min(1),
  reason: z.enum([
    "not_applicable",
    "answered_by_another_response",
    "excluded_by_discovery_tier",
    "deferred",
    "conditional_trigger_not_met",
  ]),
  details: z.string(),
});

const discoveryContradictionSchema = z.object({
  summary: z.string(),
  questionIds: z.array(z.string()),
  severity: z.enum(["low", "medium", "high"]),
});

const discoveryOpenDecisionSchema = z.object({
  summary: z.string(),
  impact: z.enum(["low", "medium", "high"]),
  sourceQuestionIds: provenanceQuestionIdsSchema,
});

const discoveryRiskSchema = z.object({
  summary: z.string(),
  mitigation: z.string().optional(),
  severity: z.enum(["low", "medium", "high"]),
  sourceQuestionIds: provenanceQuestionIdsSchema,
});

const discoverySectionAnalysisSchema = z.object({
  summary: z.string(),
  completenessScore: z.number().min(0).max(1),
  assumptions: z.array(z.string()),
  contradictions: z.array(discoveryContradictionSchema),
  openDecisions: z.array(discoveryOpenDecisionSchema),
  risks: z.array(discoveryRiskSchema),
  approvalBlockingQuestionIds: z.array(z.string()),
  generatedAt: z.iso.datetime(),
  model: z.string(),
});

export const discoveryAnswerSchema = z.object({
  id: z.string().min(1),
  questionId: z.string().optional(),
  clarificationId: z.string().optional(),
  sectionId: z.string().min(1),
  state: discoveryAnswerStateSchema,
  rawAnswer: z.string(),
  polishedAnswer: z.string().optional(),
  interpretation: z.string().optional(),
  confidence: z.number().min(0).max(1).optional(),
  evidence: z.array(z.string()),
  source: z.string().optional(),
  assumptions: z.array(z.string()),
  gaps: z.array(z.string()),
  suggestedClarifications: z.array(z.string()),
  version: z.number().int().nonnegative(),
  updatedAt: z.iso.datetime(),
  updatedByUserId: z.string().min(1),
  normalizedAt: optionalDateTime,
  normalizationModel: z.string().optional(),
});

export const discoveryClarifyingQuestionSchema = z.object({
  id: z.string().min(1),
  sectionId: z.string().min(1),
  prompt: z.string().min(1),
  reason: z.string(),
  priority: z.enum(["low", "medium", "high"]),
  sourceQuestionIds: z.array(z.string()),
  status: z.enum(["open", "answered", "dismissed"]),
  createdAt: z.iso.datetime(),
  answeredAt: optionalDateTime,
});

export const discoverySectionSchema = z.object({
  id: z.string().min(1),
  status: discoverySectionStatusSchema,
  revision: z.number().int().nonnegative(),
  eligibleQuestionIds: z.array(z.string()),
  skippedQuestions: z.array(discoverySkippedQuestionSchema),
  analysis: discoverySectionAnalysisSchema.optional(),
  approval: z.object({
    id: z.string(),
    sectionId: z.string(),
    revision: z.number().int().nonnegative(),
    approvedByUserId: z.string(),
    approvedAt: z.iso.datetime(),
    answerIds: z.array(z.string()),
    answerVersions: z.record(z.string(), z.number().int().nonnegative()),
    analysis: discoverySectionAnalysisSchema,
  }).optional(),
  updatedAt: z.iso.datetime(),
});

const discoveryPlanIssueSchema = z.object({
  ref: z.string().min(1),
  summary: z.string().min(1),
  description: z.string().optional(),
  priority: z.string().optional(),
  owner: z.string().optional(),
  dueDate: z.string().optional(),
  provenanceQuestionIds: provenanceQuestionIdsSchema,
});

export const discoveryPlanSubtaskSchema = discoveryPlanIssueSchema;
export const discoveryPlanTaskSchema = discoveryPlanIssueSchema.extend({
  subtasks: z.array(discoveryPlanSubtaskSchema),
});
export const discoveryPlanWorkstreamSchema = discoveryPlanIssueSchema.extend({
  tasks: z.array(discoveryPlanTaskSchema),
});

export const discoveryProjectPlanSchema = z.object({
  project: z.object({
    name: z.string(),
    key: z.string(),
    description: z.string(),
    businessContext: z.string(),
    problemOrOpportunity: z.string(),
    recommendedApproach: z.string(),
    provenanceQuestionIds: provenanceQuestionIdsSchema,
  }),
  goals: z.array(discoveryPlanIssueSchema),
  scope: z.array(z.string()),
  exclusions: z.array(z.string()),
  stakeholders: z.array(z.string()),
  deliverables: z.array(z.string()),
  acceptanceCriteria: z.array(z.string()),
  timeline: z.array(z.string()),
  constraints: z.array(z.string()),
  dependencies: z.array(z.string()),
  risks: z.array(discoveryRiskSchema),
  assumptions: z.array(z.string()),
  openQuestions: z.array(z.string()),
  openDecisions: z.array(discoveryOpenDecisionSchema),
  workstreams: z.array(discoveryPlanWorkstreamSchema),
});

const discoveryPlanRevisionSchema = z.object({
  id: z.string().min(1),
  version: z.number().int().positive(),
  source: z.enum(["model", "manual", "chat"]),
  plan: discoveryProjectPlanSchema,
  createdAt: z.iso.datetime(),
  createdByUserId: z.string(),
  sourceHash: z.string(),
  invalidatesGeneratedSetup: z.boolean(),
  validationErrors: z.array(z.string()),
});

export const discoveryPlanPatchOperationSchema = z.object({
  type: z.enum(["add", "update", "remove"]),
  target: z.enum(["workstream", "task", "subtask"]),
  ref: z.string().optional(),
  parentRef: z.string().optional(),
  value: z.union([
    discoveryPlanWorkstreamSchema,
    discoveryPlanTaskSchema,
    discoveryPlanSubtaskSchema,
  ]).optional(),
  patch: z.object({
    summary: z.string().optional(),
    description: z.string().optional(),
    priority: z.string().optional(),
    owner: z.string().optional(),
    dueDate: z.string().optional(),
    provenanceQuestionIds: provenanceQuestionIdsSchema.optional(),
  }).optional(),
});

const discoveryChatChangeRequestSchema = z.object({
  id: z.string(),
  prompt: z.string(),
  proposedOperations: z.array(discoveryPlanPatchOperationSchema),
  rationale: z.string(),
  status: z.enum(["proposed", "accepted", "rejected"]),
  createdAt: z.iso.datetime(),
  createdByUserId: z.string(),
});

export const discoverySessionSchema = z.object({
  setupId: z.uuid(),
  ownerUserId: z.string().min(1),
  status: discoverySessionStatusSchema,
  questionBankVersion: z.string(),
  questionBankSourceHash: z.string(),
  selectedTier: discoveryTierSchema.optional(),
  currentSectionId: z.string().optional(),
  project: z.object({
    project: jiraProjectSetupRequestSchema.shape.project,
    issueHierarchy: jiraProjectSetupRequestSchema.shape.issueHierarchy,
    workflow: jiraProjectSetupRequestSchema.shape.workflow,
  }),
  sections: z.array(discoverySectionSchema),
  answers: z.array(discoveryAnswerSchema),
  clarifyingQuestions: z.array(discoveryClarifyingQuestionSchema),
  planRevisions: z.array(discoveryPlanRevisionSchema),
  chatChangeRequests: z.array(discoveryChatChangeRequestSchema),
  finalApproval: z.object({
    approvedByUserId: z.string(),
    approvedAt: z.iso.datetime(),
    planRevisionId: z.string(),
    approvedSnapshotHash: z.string(),
    generatedSetupRequestHash: z.string(),
  }).optional(),
  generatedSetupRequest: jiraProjectSetupRequestSchema.optional(),
  processingError: z.preprocess(
    (value) => (value === null ? undefined : value),
    z.string().optional(),
  ),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export const discoveryResponseSchema = z.object({
  session: discoverySessionSchema,
  questionBank: discoveryQuestionBankSchema,
});

export const discoveryFinalApprovalResponseSchema = discoveryResponseSchema.extend({
  setup: jiraSetupRecordSchema,
  previewPath: z.string().min(1),
});

export const startDiscoveryActionSchema = z.object({
  setupId: z.uuid(),
  tier: discoveryTierSchema,
});
export const skipDiscoveryActionSchema = z.object({
  setupId: z.uuid(),
});
export const saveDiscoveryAnswerActionSchema = z.object({
  setupId: z.uuid(),
  questionId: z.string().optional(),
  clarificationId: z.string().optional(),
  rawAnswer: z.string(),
  state: discoveryAnswerStateSchema.optional(),
  confidence: z.number().min(0).max(1).optional(),
  evidence: z.array(z.string()).optional(),
  source: z.string().optional(),
  expectedVersion: z.number().int().nonnegative().optional(),
});
export const processDiscoverySectionActionSchema = z.object({
  setupId: z.uuid(),
  sectionId: z.string().min(1),
});
export const approveDiscoverySectionActionSchema = z.object({
  setupId: z.uuid(),
  sectionId: z.string().min(1),
  revision: z.number().int().nonnegative(),
});
export const patchDiscoveryPlanActionSchema = z.object({
  setupId: z.uuid(),
  operations: z.array(discoveryPlanPatchOperationSchema),
});
export const chatDiscoveryPlanActionSchema = z.object({
  setupId: z.uuid(),
  prompt: z.string().min(1),
});
export const approveFinalDiscoveryActionSchema = z.object({
  setupId: z.uuid(),
  planRevisionId: z.string().min(1),
});

export type DiscoveryResponseInput = z.infer<typeof discoveryResponseSchema>;
