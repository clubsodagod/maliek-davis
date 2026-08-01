import { NextRequest } from "next/server";
import { jiraRunIdParamSchema } from "@/app/admin/dashboard/jira/_schemas";
import {
  runProtectedJiraRoute,
  validateRouteParams,
} from "../../../_lib/route-helpers";
import { getJiraRunReport } from "../../../_lib/service";

export const dynamic = "force-dynamic";

type RunReportRouteContext = {
  params: Promise<{ runId: string }>;
};

export async function GET(_request: NextRequest, context: RunReportRouteContext) {
  return runProtectedJiraRoute("read", async (actor, requestId) => {
    const { runId } = validateRouteParams(
      jiraRunIdParamSchema,
      await context.params,
    );
    return getJiraRunReport(runId, requestId, actor);
  });
}
