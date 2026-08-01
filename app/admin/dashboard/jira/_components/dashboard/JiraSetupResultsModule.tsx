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

const mutedText = "rgba(248, 247, 255, 0.68)";
const softText = "rgba(248, 247, 255, 0.86)";
const borderColor = "rgba(255, 255, 255, 0.1)";

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
  color: "default" | "primary" | "success" | "error" | "warning";
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
      color: runErrorMessage ? "error" : "warning",
    };
  }

  if (run.status === "succeeded") {
    return {
      title: "Project is live",
      label: "Live",
      description:
        "The automation completed and persisted generated Jira records for this setup.",
      icon: <CheckCircle aria-hidden="true" />,
      color: "success",
    };
  }

  if (run.status === "failed") {
    return {
      title: "Run needs attention",
      label: "Failed",
      description:
        "Some Jira setup work stopped before completion. Completed records remain available for retry planning.",
      icon: <ErrorOutline aria-hidden="true" />,
      color: "error",
    };
  }

  return {
    title: run.status === "queued" ? "Run is queued" : "Run is in progress",
    label: run.status === "queued" ? "Queued" : "Running",
    description:
      "The latest persisted state is shown here. Return to the run screen for live polling.",
    icon: <RocketLaunch aria-hidden="true" />,
    color: "primary",
  };
}

function GlassPanel({
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
      elevation={0}
      sx={{
        height: "100%",
        p: { xs: 2.25, md: 3 },
        borderRadius: 2,
        border: `1px solid ${borderColor}`,
        background:
          "linear-gradient(145deg, rgba(255, 255, 255, 0.085), rgba(255, 255, 255, 0.032))",
        color: "inherit",
        boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.08)",
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
      sx={{
        minHeight: 128,
        p: 2,
        borderRadius: 2,
        border: `1px solid ${borderColor}`,
        background:
          "linear-gradient(160deg, rgba(255, 255, 255, 0.1), rgba(13, 15, 28, 0.58))",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: "auto -32px -44px auto",
          width: 112,
          height: 112,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(105, 224, 255, 0.2), transparent 62%)",
        }}
      />
      <Stack spacing={1.35} sx={{ position: "relative" }}>
        <Stack direction="row" justifyContent="space-between" spacing={1}>
          <Typography variant="overline" sx={{ color: mutedText, lineHeight: 1.2 }}>
            {label}
          </Typography>
          <Box sx={{ color: "primary.main", lineHeight: 0 }}>{icon}</Box>
        </Stack>
        <Typography component="p" variant="h3" sx={{ lineHeight: 1 }}>
          {value}
        </Typography>
        <Typography variant="body2" sx={{ color: mutedText }}>
          {detail}
        </Typography>
      </Stack>
    </Box>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <Stack spacing={0.5}>
      <Typography variant="overline" sx={{ color: mutedText, lineHeight: 1.25 }}>
        {label}
      </Typography>
      <Typography variant="body2" sx={{ color: softText }}>
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
              sx={{
                p: 1.5,
                borderRadius: 1,
                border: `1px solid ${borderColor}`,
                backgroundColor: "rgba(8, 9, 16, 0.34)",
              }}
            >
              <Stack spacing={0.6}>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Chip label={issue.key} size="small" color="primary" />
                  <Typography variant="caption" sx={{ color: mutedText }}>
                    {issue.ref}
                  </Typography>
                </Stack>
                <Typography variant="body2" sx={{ color: softText }}>
                  {issue.summary}
                </Typography>
              </Stack>
            </Box>
          ))
        ) : (
          <Typography variant="body2" sx={{ color: mutedText }}>
            No generated records captured yet.
          </Typography>
        )}
        {entries.length > 8 ? (
          <Typography variant="caption" sx={{ color: mutedText }}>
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
              sx={{
                p: 1.5,
                borderRadius: 1,
                border: `1px solid ${borderColor}`,
                backgroundColor: "rgba(8, 9, 16, 0.34)",
              }}
            >
              <Stack spacing={0.6}>
                <Typography variant="body2" sx={{ color: softText }}>
                  {link.inwardIssueKey} to {link.outwardIssueKey}
                </Typography>
                <Typography variant="caption" sx={{ color: mutedText }}>
                  {link.type} link, id {link.id}
                </Typography>
              </Stack>
            </Box>
          ))
        ) : (
          <Typography variant="body2" sx={{ color: mutedText }}>
            No completed links captured yet.
          </Typography>
        )}
        {entries.length > 8 ? (
          <Typography variant="caption" sx={{ color: mutedText }}>
            Showing 8 of {entries.length} links.
          </Typography>
        ) : null}
      </Stack>
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
      elevation={0}
      sx={{
        p: { xs: 2.5, md: 3.5 },
        borderRadius: 2,
        border: `1px solid ${borderColor}`,
        background:
          "radial-gradient(circle at 82% 20%, rgba(113, 94, 255, 0.28), transparent 30%), radial-gradient(circle at 12% 0%, rgba(74, 222, 128, 0.16), transparent 28%), linear-gradient(135deg, rgba(18, 19, 32, 0.98), rgba(9, 10, 18, 0.92))",
        color: "inherit",
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
            <Chip label={setup.request.project.key} color="primary" />
            <Chip label={tone.label} color={tone.color} icon={tone.icon} />
            {run ? <Chip label={`Run ${run.id}`} /> : null}
          </Stack>
          <Stack spacing={1.25}>
            <Typography component="h2" variant="h2" sx={{ lineHeight: 0.96 }}>
              {tone.title}
            </Typography>
            <Typography component="p" variant="h5" sx={{ color: softText }}>
              {setup.request.project.name}
            </Typography>
            <Typography variant="body2" sx={{ color: mutedText, maxWidth: 680 }}>
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
          sx={{
            width: { xs: "100%", sm: 280 },
            alignSelf: { xs: "stretch", lg: "center" },
            p: 2,
            borderRadius: 2,
            border: `1px solid ${borderColor}`,
            backgroundColor: "rgba(8, 9, 16, 0.4)",
          }}
        >
          <Stack spacing={2}>
            <Box
              sx={{
                width: 180,
                height: 180,
                mx: "auto",
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
                background: `conic-gradient(from 210deg, #54f2a6 ${progress.percentage}%, rgba(255, 255, 255, 0.11) 0)`,
                boxShadow: "0 0 52px rgba(84, 242, 166, 0.14)",
              }}
              aria-hidden="true"
            >
              <Box
                sx={{
                  width: 132,
                  height: 132,
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  backgroundColor: "rgba(10, 11, 19, 0.94)",
                  border: `1px solid ${borderColor}`,
                }}
              >
                <Stack spacing={0.35} alignItems="center">
                  <Typography component="p" variant="h3" sx={{ lineHeight: 1 }}>
                    {progress.percentage}%
                  </Typography>
                  <Typography variant="caption" sx={{ color: mutedText }}>
                    complete
                  </Typography>
                </Stack>
              </Box>
            </Box>
            <LinearProgress
              variant="determinate"
              value={progress.percentage}
              aria-label="Setup result completion"
              sx={{ height: 8, borderRadius: 999 }}
            />
            <Stack direction="row" justifyContent="space-between" spacing={2}>
              <Typography variant="body2" sx={{ color: mutedText }}>
                {progress.completedCount} of {progress.totalCount}
              </Typography>
              <Typography variant="body2" sx={{ color: mutedText }}>
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
          {run.error}
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
        <GlassPanel
          title="Created Registry"
          icon={<QueryStats color="primary" aria-hidden="true" />}
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
        </GlassPanel>

        <Stack spacing={3}>
          <GlassPanel
            title="Project Summary"
            icon={<Hub color="primary" aria-hidden="true" />}
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
                <Divider sx={{ borderColor }} />
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
          </GlassPanel>

          <GlassPanel
            title="Final Report"
            icon={<Notes color="primary" aria-hidden="true" />}
          >
            {report?.trim() ? (
              <Typography
                component="pre"
                variant="body2"
                sx={{
                  m: 0,
                  color: softText,
                  whiteSpace: "pre-wrap",
                  fontFamily: "inherit",
                  lineHeight: 1.7,
                }}
              >
                {report}
              </Typography>
            ) : (
              <Typography variant="body2" sx={{ color: mutedText }}>
                No final report text is available for this run yet.
              </Typography>
            )}
          </GlassPanel>
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
