import { NextRequest } from "next/server";
import {
  jiraIdParamSchema,
  jiraProjectSetupRequestSchema,
} from "@/app/admin/dashboard/jira/_schemas";
import {
  readJsonBody,
  runProtectedJiraRoute,
  validateRouteParams,
} from "../../_lib/route-helpers";
import { getJiraSetup, updateJiraSetup } from "../../_lib/service";

export const dynamic = "force-dynamic";

type SetupRouteContext = {
  params: Promise<{ setupId: string }>;
};

export async function GET(_request: NextRequest, context: SetupRouteContext) {
  return runProtectedJiraRoute("read", async (actor, requestId) => {
    const { setupId } = validateRouteParams(jiraIdParamSchema, await context.params);
    return getJiraSetup(setupId, requestId, actor);
  });
}

export async function PUT(request: NextRequest, context: SetupRouteContext) {
  return runProtectedJiraRoute("mutation", async (actor, requestId) => {
    const { setupId } = validateRouteParams(jiraIdParamSchema, await context.params);
    const body = await readJsonBody(request, jiraProjectSetupRequestSchema);
    return updateJiraSetup(setupId, body, requestId, actor);
  });
}
