import { NextRequest } from "next/server";
import { jiraProjectSetupRequestSchema } from "@/app/admin/dashboard/jira/_schemas";
import { readJsonBody, runProtectedJiraRoute } from "../_lib/route-helpers";
import { createJiraSetup, listJiraSetups } from "../_lib/service";

export const dynamic = "force-dynamic";

export async function GET() {
  return runProtectedJiraRoute("read", async (actor, requestId) => {
    return listJiraSetups(requestId, actor);
  });
}

export async function POST(request: NextRequest) {
  return runProtectedJiraRoute("mutation", async (actor, requestId) => {
    const body = await readJsonBody(request, jiraProjectSetupRequestSchema);
    return createJiraSetup(body, requestId, actor);
  }, 201);
}
