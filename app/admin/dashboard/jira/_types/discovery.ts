import type { z } from "zod";
import type {
  approveDiscoverySectionActionSchema,
  approveFinalDiscoveryActionSchema,
  chatDiscoveryPlanActionSchema,
  discoveryAnswerSchema,
  discoveryAnswerStateSchema,
  discoveryClarifyingQuestionSchema,
  discoveryFinalApprovalResponseSchema,
  discoveryPlanPatchOperationSchema,
  discoveryPlanTaskSchema,
  discoveryPlanWorkstreamSchema,
  discoveryProjectPlanSchema,
  discoveryQuestionBankSchema,
  discoveryQuestionSchema,
  discoveryResponseSchema,
  discoverySectionSchema,
  discoverySessionSchema,
  discoveryTierSchema,
  patchDiscoveryPlanActionSchema,
  processDiscoverySectionActionSchema,
  saveDiscoveryAnswerActionSchema,
  startDiscoveryActionSchema,
} from "../_schemas/discovery";

export type DiscoveryTier = z.infer<typeof discoveryTierSchema>;
export type DiscoveryAnswerState = z.infer<typeof discoveryAnswerStateSchema>;
export type DiscoveryQuestion = z.infer<typeof discoveryQuestionSchema>;
export type DiscoveryQuestionBank = z.infer<typeof discoveryQuestionBankSchema>;
export type DiscoveryAnswer = z.infer<typeof discoveryAnswerSchema>;
export type DiscoveryClarifyingQuestion = z.infer<typeof discoveryClarifyingQuestionSchema>;
export type DiscoverySection = z.infer<typeof discoverySectionSchema>;
export type DiscoverySession = z.infer<typeof discoverySessionSchema>;
export type DiscoveryResponse = z.infer<typeof discoveryResponseSchema>;
export type DiscoveryFinalApprovalResponse = z.infer<
  typeof discoveryFinalApprovalResponseSchema
>;
export type DiscoveryProjectPlan = z.infer<typeof discoveryProjectPlanSchema>;
export type DiscoveryPlanWorkstream = z.infer<typeof discoveryPlanWorkstreamSchema>;
export type DiscoveryPlanTask = z.infer<typeof discoveryPlanTaskSchema>;
export type DiscoveryPlanPatchOperation = z.infer<
  typeof discoveryPlanPatchOperationSchema
>;

export type StartDiscoveryActionInput = z.infer<typeof startDiscoveryActionSchema>;
export type SaveDiscoveryAnswerActionInput = z.infer<
  typeof saveDiscoveryAnswerActionSchema
>;
export type ProcessDiscoverySectionActionInput = z.infer<
  typeof processDiscoverySectionActionSchema
>;
export type ApproveDiscoverySectionActionInput = z.infer<
  typeof approveDiscoverySectionActionSchema
>;
export type PatchDiscoveryPlanActionInput = z.infer<
  typeof patchDiscoveryPlanActionSchema
>;
export type ChatDiscoveryPlanActionInput = z.infer<
  typeof chatDiscoveryPlanActionSchema
>;
export type ApproveFinalDiscoveryActionInput = z.infer<
  typeof approveFinalDiscoveryActionSchema
>;
