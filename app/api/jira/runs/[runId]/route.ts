import { NextRequest } from "next/server";
import { jiraRunIdParamSchema } from "@/app/admin/dashboard/jira/_schemas";
import {
  runProtectedJiraRoute,
  validateRouteParams,
} from "../../_lib/route-helpers";
import { getJiraRun } from "../../_lib/service";

export const dynamic = "force-dynamic";

type RunRouteContext = {
  params: Promise<{ runId: string }>;
};

export async function GET(_request: NextRequest, context: RunRouteContext) {
  return runProtectedJiraRoute("read", async (actor, requestId) => {
    const { runId } = validateRouteParams(jiraRunIdParamSchema, await context.params);
    return getJiraRun(runId, requestId, actor);
  });
}
