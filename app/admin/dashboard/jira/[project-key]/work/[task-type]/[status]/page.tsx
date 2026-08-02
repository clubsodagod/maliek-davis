import { Alert, Stack } from "@mui/material";
import { notFound } from "next/navigation";
import {
  ProjectJiraShell,
  QuestionWorkspace,
  WorkQueueView,
} from "../../../../_components/work";
import { ensureAutomaticJiraSetupDraft } from "../../../../_services/automatic-setup-draft";
import { requireJiraDashboardAdmin } from "../../../../_utils/requireJiraDashboardAdmin";
import {
  normalizeProjectKeySlug,
  normalizeTaskTypeSlug,
  normalizeWorkStatusSlug,
} from "../../../../_utils/workRouting";
import { normalizeUnknownError } from "@/app/api/jira/_lib/errors";
import { createRequestId, logJiraFailure } from "@/app/api/jira/_lib/responses";
import {
  getJiraSubtaskQuestionView,
  getJiraWorkQueueView,
} from "@/app/api/jira/_lib/service";

interface ProjectStatusWorkPageProps {
  params: Promise<{
    "project-key": string;
    "task-type": string;
    status: string;
  }>;
  searchParams: Promise<{
    question?: string | string[];
    search?: string | string[];
    sort?: string | string[];
  }>;
}

function firstParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ProjectStatusWorkPage({
  params,
  searchParams,
}: ProjectStatusWorkPageProps) {
  const actor = await requireJiraDashboardAdmin();
  const routeParams = await params;
  const query = await searchParams;
  const projectKey = normalizeProjectKeySlug(routeParams["project-key"]);
  const taskTypeSlug = normalizeTaskTypeSlug(routeParams["task-type"]);
  const statusSlug = normalizeWorkStatusSlug(routeParams.status);
  if (taskTypeSlug === null || statusSlug === null) {
    notFound();
  }

  const requestId = createRequestId();

  try {
    const queue = await getJiraWorkQueueView(
      projectKey,
      {
        statusSlug,
        taskTypeSlug,
        search: firstParam(query.search),
        sort: firstParam(query.sort),
      },
      requestId,
      actor,
    );
    const selectedQuestionId = firstParam(query.question) ?? queue.items[0]?.issueKey;
    const question = taskTypeSlug === "subtask" && selectedQuestionId
      ? await getJiraSubtaskQuestionView(
          projectKey,
          selectedQuestionId,
          requestId,
          actor,
        )
      : undefined;
    await ensureAutomaticJiraSetupDraft(queue.project.key, requestId, actor);

    return (
      <ProjectJiraShell
        projectKey={queue.project.key}
        title={`${queue.project.name} ${queue.filters.status} ${taskTypeSlug}`}
        description="Focused Jira execution queue."
        statusLabel={queue.filters.status}
      >
        <Stack spacing={3}>
          {question ? <QuestionWorkspace question={question} /> : null}
          <WorkQueueView projectKey={queue.project.key} queue={queue} />
        </Stack>
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
          title={`${draft.project.name} ${statusSlug} ${taskTypeSlug}`}
          description="Focused Jira execution queue."
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
        description="Focused Jira execution queue."
        statusLabel="Unavailable"
      >
        <Alert severity="error">{appError.message}</Alert>
      </ProjectJiraShell>
    );
  }
}
