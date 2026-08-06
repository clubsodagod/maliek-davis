import Link from "next/link";
import type { ReactElement, ReactNode } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Divider,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  ArrowBack,
  CheckCircle,
  ErrorOutline,
  FactCheck,
  Hub,
  Link as LinkIcon,
  Notes,
  QueryStats,
  RocketLaunch,
  Schedule,
  TaskAlt,
  ViewKanban,
  Workspaces,
} from "@mui/icons-material";
import type {
  JiraCompletedLink,
  JiraIssueReference,
  JiraRunRecord,
  JiraWorkflowResultMode,
  JiraSetupRecord,
} from "../../_types";
import { getJiraRunProgress } from "../../_utils/runProgress";
import { getJiraResultsMetrics } from "../../_utils/resultsSummary";
import { jiraClassNames } from "../../_theme";
import {
  findJiraProjectTemplateByKey,
  formatJiraManagementStyle,
  formatJiraProjectTypeKey,
  getJiraWorkflowOption,
  type JiraWorkflowSelectionId,
} from "../../_config/projectOptions";
import { JiraRouteShell } from "./JiraRouteShell";
import { JiraSetupRouteNav } from "./JiraSetupRouteNav";

type LoadedResultsProps = {
  setup: JiraSetupRecord;
  run?: JiraRunRecord;
  report?: string;
  runErrorMessage?: string;
  requestId?: string;
  setupId?: never;
  errorMessage?: never;
};

type ErrorResultsProps = {
  setup?: never;
  run?: never;
  report?: never;
  runErrorMessage?: never;
  setupId: string;
  errorMessage: string;
};

export type JiraSetupResultsModuleProps =
  | LoadedResultsProps
  | ErrorResultsProps;

function formatDateTime(value: string | undefined): string {
  if (!value) return "Not available";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function formatWorkflowMode(value: JiraWorkflowResultMode): string {
  if (value === "jira-default") return "Jira Default";
  if (value === "document-heavy") return "Document Heavy Workflow";
  if (value === "create") return "Create workflow";
  if (value === "update") return "Update workflow";
  return "Skip workflow";
}

function formatWorkflowSelection(id: JiraWorkflowSelectionId): string {
  return getJiraWorkflowOption(id).name;
}

function formatTemplateName(projectTemplateKey: string): string {
  return findJiraProjectTemplateByKey(projectTemplateKey)?.name ?? projectTemplateKey;
}

function getRunTone(
  run: JiraRunRecord | undefined,
  runErrorMessage: string | undefined,
): {
  title: string;
  label: string;
  description: string;
  icon: ReactElement;
} {
  if (!run) {
    return {
      title: runErrorMessage ? "Run data unavailable" : "Results are waiting",
      label: runErrorMessage ? "Attention" : "No run selected",
      description: runErrorMessage
        ? "The setup loaded, but the selected run could not be displayed."
        : "Open results from a completed setup run to see generated Jira keys, links, and the final report.",
      icon: runErrorMessage ? (
        <ErrorOutline aria-hidden="true" />
      ) : (
        <Schedule aria-hidden="true" />
      ),
    };
  }

  if (run.status === "succeeded") {
    return {
      title: "Project is live",
      label: "Live",
      description:
        "The automation completed and persisted generated Jira records for this setup.",
      icon: <CheckCircle aria-hidden="true" />,
    };
  }

  if (run.status === "failed") {
    return {
      title: "Run needs attention",
      label: "Failed",
      description:
        "Some Jira setup work stopped before completion. Completed records remain available for retry planning.",
      icon: <ErrorOutline aria-hidden="true" />,
    };
  }

  return {
    title: run.status === "queued" ? "Run is queued" : "Run is in progress",
    label: run.status === "queued" ? "Queued" : "Running",
    description:
      "The latest persisted state is shown here. Return to the run screen for live polling.",
    icon: <RocketLaunch aria-hidden="true" />,
  };
}

function ResultsPanel({
  title,
  icon,
  children,
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <Paper
      className={jiraClassNames.panel}
      sx={{
        height: "100%",
        p: { xs: 2.25, md: 3 },
      }}
    >
      <Stack spacing={2.25}>
        <Stack direction="row" spacing={1.25} alignItems="center">
          {icon}
          <Typography component="h2" variant="h5">
            {title}
          </Typography>
        </Stack>
        {children}
      </Stack>
    </Paper>
  );
}

function MetricTile({
  label,
  value,
  detail,
  icon,
}: {
  label: string;
  value: string | number;
  detail: string;
  icon: ReactNode;
}) {
  return (
    <Box
      className={jiraClassNames.metricTile}
      sx={{
        p: 2,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Stack spacing={1.35} sx={{ position: "relative" }}>
        <Stack direction="row" justifyContent="space-between" spacing={1}>
          <Typography variant="overline" sx={{ lineHeight: 1.2 }}>
            {label}
          </Typography>
          <Box sx={{ lineHeight: 0 }}>{icon}</Box>
        </Stack>
        <Typography component="p" variant="h3" sx={{ lineHeight: 1 }}>
          {value}
        </Typography>
        <Typography variant="body2">
          {detail}
        </Typography>
      </Stack>
    </Box>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <Stack spacing={0.5}>
      <Typography variant="overline" sx={{ lineHeight: 1.25 }}>
        {label}
      </Typography>
      <Typography variant="body2">
        {value}
      </Typography>
    </Stack>
  );
}

function issueEntries(records: Record<string, JiraIssueReference> | undefined) {
  return Object.entries(records ?? {}).map(([ref, issue]) => ({
    ref,
    ...issue,
  }));
}

function IssueRecordList({
  title,
  records,
}: {
  title: string;
  records: Record<string, JiraIssueReference> | undefined;
}) {
  const entries = issueEntries(records);

  return (
    <Stack spacing={1.25}>
      <Stack direction="row" justifyContent="space-between" spacing={2}>
        <Typography component="h3" variant="subtitle1">
          {title}
        </Typography>
        <Chip label={entries.length} size="small" />
      </Stack>
      <Stack spacing={1}>
        {entries.length > 0 ? (
          entries.slice(0, 8).map((issue) => (
            <Box
              key={issue.ref}
              className={jiraClassNames.panelCompact}
              sx={{
                p: 1.5,
              }}
            >
              <Stack spacing={0.6}>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Chip label={issue.key} size="small" />
                  <Typography variant="caption">
                    {issue.ref}
                  </Typography>
                </Stack>
                <Typography variant="body2">
                  {issue.summary}
                </Typography>
              </Stack>
            </Box>
          ))
        ) : (
          <Typography variant="body2">
            No generated records captured yet.
          </Typography>
        )}
        {entries.length > 8 ? (
          <Typography variant="caption">
            Showing 8 of {entries.length} records.
          </Typography>
        ) : null}
      </Stack>
    </Stack>
  );
}

function LinkRecordList({ links }: { links: JiraCompletedLink[] | undefined }) {
  const entries = links ?? [];

  return (
    <Stack spacing={1.25}>
      <Stack direction="row" justifyContent="space-between" spacing={2}>
        <Typography component="h3" variant="subtitle1">
          Links
        </Typography>
        <Chip label={entries.length} size="small" />
      </Stack>
      <Stack spacing={1}>
        {entries.length > 0 ? (
          entries.slice(0, 8).map((link) => (
            <Box
              key={link.id}
              className={jiraClassNames.panelCompact}
              sx={{
                p: 1.5,
              }}
            >
              <Stack spacing={0.6}>
                <Typography variant="body2">
                  {link.inwardIssueKey} to {link.outwardIssueKey}
                </Typography>
                <Typography variant="caption">
                  {link.type} link, id {link.id}
                </Typography>
              </Stack>
            </Box>
          ))
        ) : (
          <Typography variant="body2">
            No completed links captured yet.
          </Typography>
        )}
        {entries.length > 8 ? (
          <Typography variant="caption">
            Showing 8 of {entries.length} links.
          </Typography>
        ) : null}
      </Stack>
    </Stack>
  );
}

function RunFailureMetadata({
  run,
  requestId,
}: {
  run: JiraRunRecord;
  requestId?: string;
}) {
  const failure = run.progress?.failure;
  const errorLogId = run.errorLogId ?? failure?.errorLogId;

  return (
    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
      <Chip label={`Run ${run.id}`} size="small" />
      {requestId ? <Chip label={`Request ${requestId}`} size="small" /> : null}
      {errorLogId ? <Chip label={`Error log ${errorLogId}`} size="small" /> : null}
      {failure?.phase ? <Chip label={`Phase ${failure.phase}`} size="small" /> : null}
      {failure?.ref ? <Chip label={`Ref ${failure.ref}`} size="small" /> : null}
    </Stack>
  );
}

function ResultsHero({
  setup,
  run,
  runErrorMessage,
}: {
  setup: JiraSetupRecord;
  run?: JiraRunRecord;
  runErrorMessage?: string;
}) {
  const tone = getRunTone(run, runErrorMessage);
  const progress = getJiraRunProgress(setup, run);

  return (
    <Paper
      className={jiraClassNames.panel}
      sx={{
        p: { xs: 2.5, md: 3.5 },
        overflow: "hidden",
      }}
    >
      <Stack
        direction={{ xs: "column", lg: "row" }}
        spacing={{ xs: 3, md: 4 }}
        justifyContent="space-between"
      >
        <Stack spacing={2.25} sx={{ minWidth: 0, maxWidth: 760 }}>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Chip label={setup.request.project.key} />
            <Chip label={tone.label} icon={tone.icon} />
            {run ? <Chip label={`Run ${run.id}`} /> : null}
          </Stack>
          <Stack spacing={1.25}>
            <Typography component="h2" variant="h2" sx={{ lineHeight: 0.96 }}>
              {tone.title}
            </Typography>
            <Typography component="p" variant="h5">
              {setup.request.project.name}
            </Typography>
            <Typography variant="body2" sx={{ maxWidth: 680 }}>
              {tone.description}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1.25} flexWrap="wrap" useFlexGap>
            <Button
              component={Link}
              href={`/admin/dashboard/jira/setups/${setup.id}/run${
                run ? `?runId=${encodeURIComponent(run.id)}` : ""
              }`}
              variant="contained"
              startIcon={<RocketLaunch aria-hidden="true" />}
            >
              Run view
            </Button>
            <Button
              component={Link}
              href={`/admin/dashboard/jira/setups/${setup.id}/preview`}
              variant="outlined"
              startIcon={<ViewKanban aria-hidden="true" />}
            >
              Preview
            </Button>
          </Stack>
        </Stack>

        <Box
          className={jiraClassNames.panel}
          sx={{
            width: { xs: "100%", sm: 280 },
            alignSelf: { xs: "stretch", lg: "center" },
            p: 2,
          }}
        >
          <Stack spacing={2}>
            <Stack spacing={0.35} alignItems="center">
              <Typography component="p" variant="h3" sx={{ lineHeight: 1 }}>
                {progress.percentage}%
              </Typography>
              <Typography variant="caption">complete</Typography>
            </Stack>
            <LinearProgress
              className={jiraClassNames.progressRoomy}
              variant="determinate"
              value={progress.percentage}
              aria-label="Setup result completion"
            />
            <Stack direction="row" justifyContent="space-between" spacing={2}>
              <Typography variant="body2">
                {progress.completedCount} of {progress.totalCount}
              </Typography>
              <Typography variant="body2">
                {progress.currentOperation}
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
}

function LoadedResults({
  setup,
  run,
  report,
  runErrorMessage,
  requestId,
}: LoadedResultsProps) {
  const metrics = getJiraResultsMetrics(setup, run);
  const workflowResult = run?.workflowResult;

  return (
    <Stack spacing={3}>
      <ResultsHero setup={setup} run={run} runErrorMessage={runErrorMessage} />

      {runErrorMessage ? (
        <Alert severity="warning" icon={<ErrorOutline aria-hidden="true" />}>
          {runErrorMessage}
        </Alert>
      ) : null}

      {run?.error ? (
        <Alert severity="error" icon={<ErrorOutline aria-hidden="true" />}>
          <Stack spacing={0.75}>
            <Typography variant="body2">{run.error}</Typography>
            <RunFailureMetadata run={run} requestId={requestId} />
          </Stack>
        </Alert>
      ) : null}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(4, minmax(0, 1fr))",
          },
          gap: 1.5,
        }}
      >
        <MetricTile
          label="Created issues"
          value={metrics.createdIssues}
          detail={`${metrics.plannedIssues} planned`}
          icon={<TaskAlt aria-hidden="true" />}
        />
        <MetricTile
          label="Workstreams"
          value={metrics.createdWorkstreams}
          detail={`${setup.request.issueHierarchy.workstreamIssueType} records`}
          icon={<Workspaces aria-hidden="true" />}
        />
        <MetricTile
          label="Tasks"
          value={metrics.createdTasks}
          detail={`${setup.request.issueHierarchy.taskIssueType} records`}
          icon={<FactCheck aria-hidden="true" />}
        />
        <MetricTile
          label="Links"
          value={metrics.completedLinks}
          detail={`${metrics.plannedOperations} total operations`}
          icon={<LinkIcon aria-hidden="true" />}
        />
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", xl: "1.15fr 0.85fr" },
          gap: 3,
        }}
      >
        <ResultsPanel
          title="Created Registry"
          icon={<QueryStats aria-hidden="true" />}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
              gap: 2,
            }}
          >
            <IssueRecordList
              title="Workstreams"
              records={run?.state?.workstreams}
            />
            <IssueRecordList title="Tasks" records={run?.state?.tasks} />
            <IssueRecordList title="Subtasks" records={run?.state?.subtasks} />
            <LinkRecordList links={run?.state?.completedLinks} />
          </Box>
        </ResultsPanel>

        <Stack spacing={3}>
          <ResultsPanel
            title="Project Summary"
            icon={<Hub aria-hidden="true" />}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
                gap: 2,
              }}
            >
              <DetailItem label="Project key" value={setup.request.project.key} />
              <DetailItem
                label="Jira project"
                value={run?.jiraProject?.key ?? "Not captured"}
              />
              <DetailItem
                label="Project type"
                value={formatJiraProjectTypeKey(setup.request.project.projectTypeKey)}
              />
              <DetailItem
                label="Template"
                value={formatTemplateName(setup.request.project.projectTemplateKey)}
              />
              <DetailItem
                label="Management"
                value={
                  formatJiraManagementStyle(
                    findJiraProjectTemplateByKey(
                      setup.request.project.projectTemplateKey,
                    )?.managementStyle ?? "company-managed",
                  )
                }
              />
              <DetailItem
                label="Workflow"
                value={formatWorkflowSelection(setup.request.workflow.id)}
              />
              <DetailItem label="Run status" value={run?.status ?? "No run"} />
              <DetailItem
                label="Completed"
                value={formatDateTime(run?.completedAt)}
              />
              <DetailItem
                label="Updated"
                value={formatDateTime(run?.updatedAt ?? setup.updatedAt)}
              />
              <DetailItem
                label="Jira project id"
                value={run?.jiraProject?.id ?? "Not captured"}
              />
            </Box>

            {workflowResult ? (
              <>
                <Divider />
                <Stack spacing={1}>
                  <Typography component="h3" variant="subtitle1">
                    Workflow Result
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    <Chip
                      label={`Workflow: ${
                        workflowResult.selectionName ??
                        formatWorkflowMode(workflowResult.mode)
                      }`}
                    />
                    {workflowResult.workflowSchemeAssignment ? (
                      <Chip label={`Assignment: ${workflowResult.workflowSchemeAssignment}`} />
                    ) : null}
                    <Chip
                      label={`${workflowResult.statusesCreatedOrUpdated.length} statuses`}
                    />
                    <Chip
                      label={`${workflowResult.workflowsCreatedOrUpdated.length} workflows`}
                    />
                    {workflowResult.workflowSchemeId ? (
                      <Chip label={`Scheme ${workflowResult.workflowSchemeId}`} />
                    ) : null}
                  </Stack>
                </Stack>
              </>
            ) : null}
          </ResultsPanel>

          <ResultsPanel
            title="Final Report"
            icon={<Notes aria-hidden="true" />}
          >
            {report?.trim() ? (
              <Typography
                component="pre"
                variant="body2"
                sx={{
                  m: 0,
                  whiteSpace: "pre-wrap",
                  fontFamily: "inherit",
                  lineHeight: 1.7,
                }}
              >
                {report}
              </Typography>
            ) : (
              <Typography variant="body2">
                No final report text is available for this run yet.
              </Typography>
            )}
          </ResultsPanel>
        </Stack>
      </Box>
    </Stack>
  );
}

export function JiraSetupResultsModule(props: JiraSetupResultsModuleProps) {
  const setupId = props.setup ? props.setup.id : props.setupId;

  return (
    <JiraRouteShell
      title="Setup Results"
      description="Review generated Jira records, live project status, final report output, and errors that need attention."
      statusLabel={`Setup ${setupId}`}
      actions={
        <>
          <Button
            component={Link}
            href="/admin/dashboard/jira"
            variant="outlined"
            startIcon={<ArrowBack aria-hidden="true" />}
          >
            Jira hub
          </Button>
          <JiraSetupRouteNav setupId={setupId} activeRoute="results" />
        </>
      }
    >
      {"errorMessage" in props ? (
        <Alert severity="error" icon={<ErrorOutline aria-hidden="true" />}>
          {props.errorMessage}
        </Alert>
      ) : (
        <LoadedResults {...props} />
      )}
    </JiraRouteShell>
  );
}
