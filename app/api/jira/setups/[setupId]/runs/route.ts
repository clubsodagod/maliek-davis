import { NextRequest } from "next/server";
import { jiraIdParamSchema } from "@/app/admin/dashboard/jira/_schemas";
import {
  runProtectedJiraRoute,
  validateRouteParams,
} from "../../../_lib/route-helpers";
import { startJiraSetupRun } from "../../../_lib/service";

export const dynamic = "force-dynamic";

type SetupRunRouteContext = {
  params: Promise<{ setupId: string }>;
};

export async function POST(_request: NextRequest, context: SetupRunRouteContext) {
  return runProtectedJiraRoute("mutation", async (actor, requestId) => {
    const { setupId } = validateRouteParams(jiraIdParamSchema, await context.params);
    return startJiraSetupRun(setupId, requestId, actor);
  }, 201);
}
