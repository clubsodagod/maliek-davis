import { NextRequest } from "next/server";
import { z } from "zod";
import { runProtectedJiraRoute, validateRouteParams } from "../../../_lib/route-helpers";
import { getJiraWorkQueueView } from "../../../_lib/service";
import type { TaskTypeSlug, WorkStatusSlug } from "@/app/admin/dashboard/jira/_config/workManagement";

export const dynamic = "force-dynamic";

const paramsSchema = z.object({
  projectKey: z.string().min(1),
});

type RouteContext = {
  params: Promise<{ projectKey: string }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
  return runProtectedJiraRoute("read", async (actor, requestId) => {
    const { projectKey } = validateRouteParams(paramsSchema, await context.params);
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get("status");
    const taskType = searchParams.get("taskType");
    return getJiraWorkQueueView(
      projectKey,
      {
        statusSlug: status === null ? undefined : (status as WorkStatusSlug),
        taskTypeSlug: taskType === null ? undefined : (taskType as TaskTypeSlug),
        search: searchParams.get("search") ?? undefined,
        sort: searchParams.get("sort") ?? undefined,
      },
      requestId,
      actor,
    );
  });
}
