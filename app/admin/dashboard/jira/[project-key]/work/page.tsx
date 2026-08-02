import { Alert } from "@mui/material";
import { notFound } from "next/navigation";
import { ProjectJiraShell, WorkQueueView } from "../../_components/work";
import { DEFAULT_WORK_STATUS_SLUG } from "../../_config/workManagement";
import { ensureAutomaticJiraSetupDraft } from "../../_services/automatic-setup-draft";
import { requireJiraDashboardAdmin } from "../../_utils/requireJiraDashboardAdmin";
import { normalizeProjectKeySlug } from "../../_utils/workRouting";
import { normalizeUnknownError } from "@/app/api/jira/_lib/errors";
import { createRequestId, logJiraFailure } from "@/app/api/jira/_lib/responses";
import { getJiraWorkQueueView } from "@/app/api/jira/_lib/service";

interface ProjectWorkPageProps {
  params: Promise<{
    "project-key": string;
  }>;
  searchParams: Promise<{
    search?: string | string[];
    sort?: string | string[];
  }>;
}

function firstParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ProjectWorkPage({
  params,
  searchParams,
}: ProjectWorkPageProps) {
  const actor = await requireJiraDashboardAdmin();
  const routeParams = await params;
  const query = await searchParams;
  const projectKey = normalizeProjectKeySlug(routeParams["project-key"]);
  const requestId = createRequestId();

  try {
    const queue = await getJiraWorkQueueView(
      projectKey,
      {
        statusSlug: DEFAULT_WORK_STATUS_SLUG,
        search: firstParam(query.search),
        sort: firstParam(query.sort),
      },
      requestId,
      actor,
    );
    await ensureAutomaticJiraSetupDraft(queue.project.key, requestId, actor);

    return (
      <ProjectJiraShell
        projectKey={queue.project.key}
        title={`${queue.project.name} Work`}
        description="Ready work across supported Jira issue types."
        statusLabel={queue.filters.status}
      >
        <WorkQueueView projectKey={queue.project.key} queue={queue} />
      </ProjectJiraShell>
    );
  } catch (error) {
    const appError = normalizeUnknownError(error);
    if (appError.code === "NOT_FOUND") {
      const draft = await ensureAutomaticJiraSetupDraft(
        projectKey,
        requestId,
        actor,
      );

      if (draft.status === "not-found") {
        notFound();
      }

      return (
        <ProjectJiraShell
          projectKey={draft.project.key}
          title={`${draft.project.name} Work`}
          description="Ready work across supported Jira issue types."
          statusLabel="Unavailable"
        >
          <Alert severity="info">
            A setup draft is ready for this Jira project, but the work module is
            not initialized yet.
          </Alert>
        </ProjectJiraShell>
      );
    }

    logJiraFailure(error, requestId);

    return (
      <ProjectJiraShell
        projectKey={projectKey}
        title="Jira Work"
        description="Ready work across supported Jira issue types."
        statusLabel="Unavailable"
      >
        <Alert severity="error">{appError.message}</Alert>
      </ProjectJiraShell>
    );
  }
}
