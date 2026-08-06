"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  Apps,
  ArrowForward,
  Dashboard,
  FormatListBulleted,
  InfoOutlined,
  Refresh,
  Visibility,
} from "@mui/icons-material";
import { JiraDashboardCardGrid } from "./JiraDashboardCardGrid";
import { jiraClassNames } from "../../_theme";
import { projectJiraPath, projectWorkPath } from "../../_utils/workRouting";
import {
  listJiraProjectSummariesRequest,
  listJiraSetupSummariesRequest,
} from "../../_services";
import type {
  ApiFailure,
  JiraProjectSummaryList,
  JiraSetupSummaryList,
} from "../../_types";

type DashboardResourceState<T> = {
  data: T;
  loading: boolean;
  error?: ApiFailure["error"];
};

const jiraDashboardCards = [
  {
    title: "Configure space",
    description:
      "Start a guided setup for a new Jira space, staged imports, validation, and confirmation.",
    href: "/admin/dashboard/jira/configure",
    actionLabel: "Configure",
    statusLabel: "Available",
  },
  {
    title: "Preview setup",
    description:
      "Review a saved setup by ID before any Jira side effects are started.",
    actionLabel: "Requires setup ID",
    statusLabel: "Setup route",
  },
  {
    title: "Run setup",
    description:
      "Execute a confirmed setup and track progress from persisted run state.",
    actionLabel: "Requires setup ID",
    statusLabel: "Setup route",
  },
  {
    title: "Results",
    description:
      "Inspect the final setup report, created Jira keys, and recoverable errors.",
    actionLabel: "Requires setup ID",
    statusLabel: "Setup route",
  },
];

function formatUpdatedAt(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Updated date unavailable";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function renderCompactPreviewCards(setups: JiraSetupSummaryList) {
  if (setups.length === 0) return null;

  return (
    <Box
      sx={{
        display: "grid",
        gap: 1,
        pt: 0.5,
      }}
    >
      {setups.map((setup) => (
        <Paper
          key={setup.id}
          component={Link}
          href={`/admin/dashboard/jira/setups/${setup.id}/preview`}
          className={jiraClassNames.interactivePanel}
          sx={{
            p: 1.25,
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Visibility fontSize="small" aria-hidden="true" />
            <Stack spacing={0.25} minWidth={0} flex={1}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 700,
                  lineHeight: 1.2,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {setup.project.name}
              </Typography>
              <Typography variant="caption" sx={{ lineHeight: 1.2 }}>
                {setup.project.key} | {setup.workstreamCount} workstreams
              </Typography>
            </Stack>
            <ArrowForward fontSize="small" aria-hidden="true" />
          </Stack>
        </Paper>
      ))}
    </Box>
  );
}

function LoadingPanel({ label }: { label: string }) {
  return (
    <Paper
      className={jiraClassNames.emptyState}
      sx={{
        p: 2.5,
      }}
    >
      <Stack direction="row" spacing={1.25} alignItems="center">
        <CircularProgress size={18} />
        <Typography variant="body2">{label}</Typography>
      </Stack>
    </Paper>
  );
}

function ResourceAlert({
  error,
  onRetry,
}: {
  error?: ApiFailure["error"];
  onRetry: () => void;
}) {
  if (!error) return null;

  return (
    <Alert
      severity={error.retryable ? "warning" : "error"}
      variant="outlined"
      action={
        error.retryable ? (
          <Button
            color="inherit"
            size="small"
            startIcon={<Refresh aria-hidden="true" />}
            onClick={onRetry}
          >
            Retry
          </Button>
        ) : undefined
      }
    >
      {error.message}
    </Alert>
  );
}

export function JiraDashboardDataSections() {
  const [projectsState, setProjectsState] =
    useState<DashboardResourceState<JiraProjectSummaryList>>({
      data: [],
      loading: true,
    });
  const [setupsState, setSetupsState] =
    useState<DashboardResourceState<JiraSetupSummaryList>>({
      data: [],
      loading: true,
    });

  const loadDashboardData = useCallback((signal?: AbortSignal) => {
    setProjectsState((current) => ({
      ...current,
      loading: true,
      error: undefined,
    }));
    setSetupsState((current) => ({
      ...current,
      loading: true,
      error: undefined,
    }));

    void listJiraProjectSummariesRequest({ signal })
      .then((result) => {
        if (signal?.aborted) return;
        setProjectsState(
          result.success
            ? { data: result.data, loading: false }
            : { data: [], loading: false, error: result.error },
        );
      })
      .catch(() => {
        if (signal?.aborted) return;
        setProjectsState({
          data: [],
          loading: false,
          error: {
            code: "BAD_REQUEST",
            message: "Unable to load Jira projects.",
            retryable: true,
          },
        });
      });

    void listJiraSetupSummariesRequest({ signal })
      .then((result) => {
        if (signal?.aborted) return;
        setSetupsState(
          result.success
            ? { data: result.data, loading: false }
            : { data: [], loading: false, error: result.error },
        );
      })
      .catch(() => {
        if (signal?.aborted) return;
        setSetupsState({
          data: [],
          loading: false,
          error: {
            code: "BAD_REQUEST",
            message: "Unable to load setup registry.",
            retryable: true,
          },
        });
      });
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    loadDashboardData(controller.signal);
    return () => controller.abort();
  }, [loadDashboardData]);

  const dashboardCards = jiraDashboardCards.map((card) =>
    card.title === "Preview setup"
      ? {
          ...card,
          description:
            setupsState.data.length > 0
              ? "Open a saved setup preview before any Jira side effects are started."
              : card.description,
          actionLabel: setupsState.data.length > 0 ? undefined : card.actionLabel,
          statusLabel:
            setupsState.data.length > 0 ? "Saved previews" : card.statusLabel,
          children: renderCompactPreviewCards(setupsState.data),
        }
      : card,
  );

  return (
    <Stack spacing={2}>
      <Paper
        component="section"
        className={jiraClassNames.panel}
        sx={{
          p: 3,
        }}
      >
        <Stack spacing={2.5}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <Apps aria-hidden="true" />
            <Stack spacing={0.75}>
              <Typography component="h2" variant="h5">
                Available Jira projects
              </Typography>
              <Typography variant="body2">
                Open Jira projects from the automation server and their work
                submodule, whether or not they have saved setup drafts here.
              </Typography>
            </Stack>
          </Stack>

          <ResourceAlert
            error={projectsState.error}
            onRetry={() => loadDashboardData()}
          />

          {projectsState.loading && projectsState.data.length === 0 ? (
            <LoadingPanel label="Loading Jira projects..." />
          ) : null}

          {!projectsState.loading && projectsState.data.length === 0 ? (
            <Paper
              className={jiraClassNames.emptyState}
              sx={{
                p: 2.5,
              }}
            >
              <Typography variant="body2">
                No Jira projects are available yet, or the automation server
                could not return the project list.
              </Typography>
            </Paper>
          ) : null}

          {projectsState.data.length > 0 ? (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  lg: "repeat(2, minmax(0, 1fr))",
                },
                gap: 1.5,
              }}
            >
              {projectsState.data.map((project) => (
                <Paper
                  key={project.key}
                  component="article"
                  className={jiraClassNames.panel}
                  sx={{
                    p: 2.5,
                  }}
                >
                  <Stack spacing={1.75}>
                    <Stack
                      direction="row"
                      spacing={1}
                      justifyContent="space-between"
                      alignItems="flex-start"
                    >
                      <Stack spacing={0.75} minWidth={0}>
                        <Stack
                          direction="row"
                          spacing={1}
                          flexWrap="wrap"
                          useFlexGap
                        >
                          <Chip label={project.key} size="small" />
                          <Chip
                            label="Jira project"
                            size="small"
                            variant="outlined"
                          />
                        </Stack>
                        <Typography
                          component="h3"
                          variant="h6"
                          sx={{ lineHeight: 1.15 }}
                        >
                          {project.name}
                        </Typography>
                        {project.description ? (
                          <Typography
                            className={jiraClassNames.clippedText}
                            variant="body2"
                          >
                            {project.description}
                          </Typography>
                        ) : null}
                      </Stack>
                      <Dashboard aria-hidden="true" />
                    </Stack>

                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                      <Button
                        component={Link}
                        href={projectJiraPath(project.key)}
                        variant="outlined"
                        startIcon={<Dashboard aria-hidden="true" />}
                      >
                        Summary
                      </Button>
                      <Button
                        component={Link}
                        href={projectWorkPath(project.key)}
                        variant="contained"
                        startIcon={<FormatListBulleted aria-hidden="true" />}
                      >
                        Work
                      </Button>
                    </Stack>
                  </Stack>
                </Paper>
              ))}
            </Box>
          ) : null}
        </Stack>
      </Paper>

      <Paper
        component="section"
        className={jiraClassNames.panel}
        sx={{
          p: 3,
        }}
      >
        <Stack spacing={2.5}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <Dashboard aria-hidden="true" />
            <Stack spacing={0.75}>
              <Typography component="h2" variant="h5">
                Saved setup registry
              </Typography>
              <Typography variant="body2">
                Resume saved Jira setup drafts and open their preview by
                project name.
              </Typography>
            </Stack>
          </Stack>

          <ResourceAlert
            error={setupsState.error}
            onRetry={() => loadDashboardData()}
          />

          {setupsState.loading && setupsState.data.length === 0 ? (
            <LoadingPanel label="Loading setup registry..." />
          ) : null}

          {!setupsState.loading && setupsState.data.length === 0 ? (
            <Paper
              className={jiraClassNames.emptyState}
              sx={{
                p: 2.5,
              }}
            >
              <Typography variant="body2">
                No saved setup drafts are available yet. Configure a Jira
                space to create the first preview-ready setup.
              </Typography>
            </Paper>
          ) : null}

          {setupsState.data.length > 0 ? (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  lg: "repeat(2, minmax(0, 1fr))",
                },
                gap: 1.5,
              }}
            >
              {setupsState.data.map((setup) => (
                <Paper
                  key={setup.id}
                  component={Link}
                  href={`/admin/dashboard/jira/setups/${setup.id}/preview`}
                  className={jiraClassNames.interactivePanel}
                  sx={{
                    p: 2.5,
                  }}
                >
                  <Stack spacing={1.75}>
                    <Stack
                      direction="row"
                      spacing={1}
                      justifyContent="space-between"
                      alignItems="flex-start"
                    >
                      <Stack spacing={0.75} minWidth={0}>
                        <Typography
                          component="h3"
                          variant="h6"
                          sx={{ lineHeight: 1.15 }}
                        >
                          {setup.project.name}
                        </Typography>
                        <Typography variant="body2">
                          Project {setup.project.key} |{" "}
                          {setup.workstreamCount} workstreams |{" "}
                          {formatUpdatedAt(setup.updatedAt)}
                        </Typography>
                      </Stack>
                      <Visibility aria-hidden="true" />
                    </Stack>

                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                      <Chip label={setup.status} size="small" />
                      <Chip
                        label="Preview available"
                        size="small"
                        variant="outlined"
                      />
                    </Stack>

                    <Stack direction="row" spacing={0.75} alignItems="center">
                      <Typography variant="button" sx={{ lineHeight: 1 }}>
                        Open preview
                      </Typography>
                      <ArrowForward fontSize="small" aria-hidden="true" />
                    </Stack>
                  </Stack>
                </Paper>
              ))}
            </Box>
          ) : null}
        </Stack>
      </Paper>

      <JiraDashboardCardGrid cards={dashboardCards} />

      <Stack direction="row" spacing={1.25} alignItems="center">
        <InfoOutlined fontSize="small" aria-hidden="true" />
        <Typography variant="caption">
          Privileged Jira operations remain behind protected server actions and
          API routes.
        </Typography>
      </Stack>
    </Stack>
  );
}
