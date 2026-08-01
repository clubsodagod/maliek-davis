import { z } from "zod";
import { runProtectedJiraRoute, validateRouteParams } from "../../../_lib/route-helpers";
import { getJiraProjectSummaryView } from "../../../_lib/service";

export const dynamic = "force-dynamic";

const paramsSchema = z.object({
  projectKey: z.string().min(1),
});

type RouteContext = {
  params: Promise<{ projectKey: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  return runProtectedJiraRoute("read", async (actor, requestId) => {
    const { projectKey } = validateRouteParams(paramsSchema, await context.params);
    return getJiraProjectSummaryView(projectKey, requestId, actor);
  });
}
