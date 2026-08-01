import { NextRequest } from "next/server";
import { z } from "zod";
import { answerSaveRequestSchema } from "@/app/admin/dashboard/jira/_schemas";
import {
  readJsonBody,
  runProtectedJiraRoute,
  validateRouteParams,
} from "../../../../_lib/route-helpers";
import { saveJiraAnswerDraft } from "../../../../_lib/service";

export const dynamic = "force-dynamic";

const paramsSchema = z.object({
  projectKey: z.string().min(1),
  issueId: z.string().min(1),
});

type RouteContext = {
  params: Promise<{ projectKey: string; issueId: string }>;
};

export async function PUT(request: NextRequest, context: RouteContext) {
  return runProtectedJiraRoute("mutation", async (actor, requestId) => {
    const { projectKey, issueId } = validateRouteParams(
      paramsSchema,
      await context.params,
    );
    const body = await readJsonBody(request, answerSaveRequestSchema);
    return saveJiraAnswerDraft(projectKey, issueId, body, requestId, actor);
  });
}
