import { z } from "zod";
import { runProtectedJiraRoute, validateRouteParams } from "../../../../_lib/route-helpers";
import { getJiraSubtaskQuestionView } from "../../../../_lib/service";

export const dynamic = "force-dynamic";

const paramsSchema = z.object({
  projectKey: z.string().min(1),
  issueId: z.string().min(1),
});

type RouteContext = {
  params: Promise<{ projectKey: string; issueId: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  return runProtectedJiraRoute("read", async (actor, requestId) => {
    const { projectKey, issueId } = validateRouteParams(
      paramsSchema,
      await context.params,
    );
    return getJiraSubtaskQuestionView(projectKey, issueId, requestId, actor);
  });
}
