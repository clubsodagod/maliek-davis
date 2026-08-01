import Link from "next/link";
import type { ReactNode } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  AccountTree,
  ArrowBack,
  CalendarMonth,
  DataObject,
  FactCheck,
  QueryStats,
} from "@mui/icons-material";
import type { JiraSetupRecord } from "../../_types";
import { getJiraHierarchyStats } from "../../_utils/setupBuilder";
import {
  findJiraProjectTemplateByKey,
  formatJiraManagementStyle,
  formatJiraProjectTypeKey,
  getJiraWorkflowOption,
  type JiraWorkflowSelectionId,
} from "../../_config/projectOptions";
import { JiraRouteShell } from "./JiraRouteShell";
import { JiraSetupPreviewHierarchy } from "./JiraSetupPreviewHierarchy";
import { JiraSetupRouteNav } from "./JiraSetupRouteNav";

type LoadedPreviewProps = {
  setup: JiraSetupRecord;
  setupId?: never;
  errorMessage?: never;
};

type ErrorPreviewProps = {
  setup?: never;
  setupId: string;
  errorMessage: string;
};

export type JiraSetupPreviewModuleProps = LoadedPreviewProps | ErrorPreviewProps;

const mutedText = "rgba(248, 247, 255, 0.68)";

function formatDateTime(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function booleanLabel(value: boolean | undefined): string {
  if (value === true) return "Yes";
  if (value === false) return "No";
  return "Default";
}

function formatTemplateName(projectTemplateKey: string): string {
  return findJiraProjectTemplateByKey(projectTemplateKey)?.name ?? projectTemplateKey;
}

function formatWorkflowSelection(id: JiraWorkflowSelectionId): string {
  return getJiraWorkflowOption(id).name;
}

function PreviewCard({
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
        p: { xs: 2.5, md: 3 },
        borderRadius: 2,
        border: "1px solid rgba(255, 255, 255, 0.1)",
        background:
          "linear-gradient(145deg, rgba(255, 255, 255, 0.075), rgba(255, 255, 255, 0.032))",
        color: "inherit",
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

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <Stack spacing={0.5}>
      <Typography
        variant="overline"
        sx={{ color: "rgba(248, 247, 255, 0.52)", lineHeight: 1.35 }}
      >
        {label}
      </Typography>
      <Typography variant="body2" sx={{ color: "rgba(248, 247, 255, 0.88)" }}>
        {value}
      </Typography>
    </Stack>
  );
}

function StatItem({ label, value }: { label: string; value: number }) {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 1,
        border: "1px solid rgba(255, 255, 255, 0.1)",
        backgroundColor: "rgba(8, 9, 16, 0.28)",
      }}
    >
      <Stack spacing={0.5}>
        <Typography component="p" variant="h4" sx={{ lineHeight: 1 }}>
          {value}
        </Typography>
        <Typography variant="body2" sx={{ color: mutedText }}>
          {label}
        </Typography>
      </Stack>
    </Box>
  );
}

export function JiraSetupPreviewModule(props: JiraSetupPreviewModuleProps) {
  const setupId = props.setup ? props.setup.id : props.setupId;

  return (
    <JiraRouteShell
      title="Setup Preview"
      description="Review the saved setup hierarchy before starting Jira side effects."
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
          <JiraSetupRouteNav setupId={setupId} activeRoute="preview" />
        </>
      }
    >
      {"errorMessage" in props ? (
        <Alert severity="error" icon={false}>
          {props.errorMessage}
        </Alert>
      ) : (
        <LoadedPreview setup={props.setup} />
      )}
    </JiraRouteShell>
  );
}

function LoadedPreview({ setup }: { setup: JiraSetupRecord }) {
  const { request } = setup;
  const stats = getJiraHierarchyStats(request.workstreams);
  const totalIssues = stats.workstreams + stats.tasks + stats.subtasks;

  return (
    <Stack spacing={3}>
      <Stack direction={{ xs: "column", lg: "row" }} spacing={3}>
        <Box sx={{ flex: 1.15, minWidth: 0 }}>
          <PreviewCard
            title="Summary"
            icon={<FactCheck color="primary" aria-hidden="true" />}
          >
            <Stack spacing={2.25}>
              <Stack spacing={1}>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  <Chip label={request.project.key} color="primary" />
                  <Chip label={setup.status} />
                  <Chip label={formatWorkflowSelection(request.workflow.id)} />
                </Stack>
                <Typography component="h3" variant="h4" sx={{ lineHeight: 1.05 }}>
                  {request.project.name}
                </Typography>
                <Typography variant="body2" sx={{ color: mutedText }}>
                  Saved setup draft owned by the current admin. Preview is read-only
                  and does not start Jira side effects.
                </Typography>
              </Stack>

              <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.08)" }} />

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, minmax(0, 1fr))",
                  },
                  gap: 2,
                }}
              >
                <DetailItem
                  label="Project type"
                  value={formatJiraProjectTypeKey(request.project.projectTypeKey)}
                />
                <DetailItem
                  label="Template"
                  value={formatTemplateName(request.project.projectTemplateKey)}
                />
                <DetailItem
                  label="Management"
                  value={
                    formatJiraManagementStyle(
                      findJiraProjectTemplateByKey(
                        request.project.projectTemplateKey,
                      )?.managementStyle ?? "company-managed",
                    )
                  }
                />
                <DetailItem
                  label="Create if missing"
                  value={booleanLabel(request.project.createIfMissing)}
                />
                <DetailItem
                  label="Created"
                  value={formatDateTime(setup.createdAt)}
                />
                <DetailItem
                  label="Updated"
                  value={formatDateTime(setup.updatedAt)}
                />
              </Box>
            </Stack>
          </PreviewCard>
        </Box>

        <Box sx={{ flex: 0.85, minWidth: 0 }}>
          <PreviewCard
            title="Stats"
            icon={<QueryStats color="primary" aria-hidden="true" />}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(2, minmax(0, 1fr))",
                  sm: "repeat(3, minmax(0, 1fr))",
                },
                gap: 1.5,
              }}
            >
              <StatItem label="Total issues" value={totalIssues} />
              <StatItem label="Workstreams" value={stats.workstreams} />
              <StatItem label="Tasks" value={stats.tasks} />
              <StatItem label="Subtasks" value={stats.subtasks} />
              <StatItem label="Links" value={stats.links} />
            </Box>
          </PreviewCard>
        </Box>
      </Stack>

      <PreviewCard
        title="Issue Hierarchy"
        icon={<DataObject color="primary" aria-hidden="true" />}
      >
        <Stack spacing={2}>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Chip
              icon={<AccountTree aria-hidden="true" />}
              label={`Workstream: ${request.issueHierarchy.workstreamIssueType}`}
            />
            <Chip label={`Task: ${request.issueHierarchy.taskIssueType}`} />
            <Chip label={`Subtask: ${request.issueHierarchy.subtaskIssueType}`} />
            <Chip
              icon={<CalendarMonth aria-hidden="true" />}
              label={`Create missing types: ${booleanLabel(
                request.issueHierarchy.createMissingIssueTypes,
              )}`}
            />
          </Stack>
          <JiraSetupPreviewHierarchy workstreams={request.workstreams} />
        </Stack>
      </PreviewCard>
    </Stack>
  );
}
