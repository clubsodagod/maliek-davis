import { NextRequest } from "next/server";
import { jiraProjectSetupRequestSchema } from "@/app/admin/dashboard/jira/_schemas";
import { readJsonBody, runProtectedJiraRoute } from "../../_lib/route-helpers";
import { validateJiraSetup } from "../../_lib/service";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  return runProtectedJiraRoute("validate", async (actor, requestId) => {
    const body = await readJsonBody(request, jiraProjectSetupRequestSchema);
    return validateJiraSetup(body, requestId, actor);
  });
}
