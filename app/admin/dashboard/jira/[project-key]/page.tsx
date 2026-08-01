import { Alert } from "@mui/material";
import { notFound } from "next/navigation";
import { ProjectJiraShell, ProjectQuickView } from "../_components/work";
import { requireJiraDashboardAdmin } from "../_utils/requireJiraDashboardAdmin";
import { normalizeProjectKeySlug } from "../_utils/workRouting";
import { normalizeUnknownError } from "@/app/api/jira/_lib/errors";
import { createRequestId, logJiraFailure } from "@/app/api/jira/_lib/responses";
import { getJiraProjectSummaryView } from "@/app/api/jira/_lib/service";

interface ProjectDashboardPageProps {
  params: Promise<{
    "project-key": string;
  }>;
}

export default async function ProjectDashboardPage({
  params,
}: ProjectDashboardPageProps) {
  const actor = await requireJiraDashboardAdmin();
  const routeParams = await params;
  const projectKey = normalizeProjectKeySlug(routeParams["project-key"]);
  const requestId = createRequestId();

  try {
    const summary = await getJiraProjectSummaryView(projectKey, requestId, actor);

    return (
      <ProjectJiraShell
        projectKey={summary.project.key}
        title={summary.project.name}
        description={summary.project.description ?? "Project execution dashboard."}
        statusLabel={summary.synchronizationHealth.jira}
      >
        <ProjectQuickView summary={summary} />
      </ProjectJiraShell>
    );
  } catch (error) {
    logJiraFailure(error, requestId);
    const appError = normalizeUnknownError(error);
    if (appError.code === "NOT_FOUND") {
      notFound();
    }

    return (
      <ProjectJiraShell
        projectKey={projectKey}
        title="Jira Project"
        description="Project execution dashboard."
        statusLabel="Unavailable"
      >
        <Alert severity="error">{appError.message}</Alert>
      </ProjectJiraShell>
    );
  }
}
