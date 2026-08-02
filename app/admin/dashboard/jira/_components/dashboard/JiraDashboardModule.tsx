import Link from "next/link";
import {
  Alert,
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  Add,
  Apps,
  ArrowForward,
  Dashboard,
  FormatListBulleted,
  InfoOutlined,
  Visibility,
} from "@mui/icons-material";
import { JiraDashboardCardGrid } from "./JiraDashboardCardGrid";
import { JiraRouteShell } from "./JiraRouteShell";
import { jiraClassNames } from "../../_theme";
import { projectJiraPath, projectWorkPath } from "../../_utils/workRouting";
import type {
  JiraProjectSummaryList,
  JiraSetupList,
  JiraSetupRecord,
} from "../../_types";

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

export interface JiraDashboardModuleProps {
  setups?: JiraSetupList;
  registryError?: string;
  availableProjects?: JiraProjectSummaryList;
  availableProjectsError?: string;
}

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

function countSetupWorkstreams(setup: JiraSetupRecord): number {
  return setup.request.workstreams.length;
}

function renderCompactPreviewCards(setups: JiraSetupList) {
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
                {setup.request.project.name}
              </Typography>
              <Typography
                variant="caption"
                sx={{ lineHeight: 1.2 }}
              >
                {setup.request.project.key} | {countSetupWorkstreams(setup)}{" "}
                workstreams
              </Typography>
            </Stack>
            <ArrowForward fontSize="small" aria-hidden="true" />
          </Stack>
        </Paper>
      ))}
    </Box>
  );
}

export function JiraDashboardModule({
  setups = [],
  registryError,
  availableProjects = [],
  availableProjectsError,
}: JiraDashboardModuleProps) {
  const dashboardCards = jiraDashboardCards.map((card) =>
    card.title === "Preview setup"
      ? {
          ...card,
          description:
            setups.length > 0
              ? "Open a saved setup preview before any Jira side effects are started."
              : card.description,
          actionLabel: setups.length > 0 ? undefined : card.actionLabel,
          statusLabel: setups.length > 0 ? "Saved previews" : card.statusLabel,
          children: renderCompactPreviewCards(setups),
        }
      : card,
  );

  return (
    <JiraRouteShell
      title="Jira Setup Studio"
      description="A protected admin workspace for creating, validating, previewing, executing, reviewing, and working Jira projects."
      statusLabel="V1 scaffold"
      actions={
        <Button
          component={Link}
          href="/admin/dashboard/jira/configure"
          variant="contained"
          startIcon={<Add aria-hidden="true" />}
        >
          Configure space
        </Button>
      }
    >
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

            {availableProjectsError ? (
              <Alert severity="warning" variant="outlined">
                {availableProjectsError}
              </Alert>
            ) : null}

            {availableProjects.length === 0 ? (
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
            ) : (
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
                {availableProjects.map((project) => (
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
                            <Chip
                              label={project.key}
                              size="small"
                            />
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
            )}
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

            {registryError ? (
              <Alert severity="warning" variant="outlined">
                {registryError}
              </Alert>
            ) : null}

            {!registryError && setups.length === 0 ? (
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

            {setups.length > 0 ? (
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
                {setups.map((setup) => (
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
                          <Typography component="h3" variant="h6" sx={{ lineHeight: 1.15 }}>
                            {setup.request.project.name}
                          </Typography>
                          <Typography
                            variant="body2"
                          >
                            Project {setup.request.project.key} |{" "}
                            {countSetupWorkstreams(setup)} workstreams |{" "}
                            {formatUpdatedAt(setup.updatedAt)}
                          </Typography>
                        </Stack>
                        <Visibility aria-hidden="true" />
                      </Stack>

                      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        <Chip
                          label={setup.status}
                          size="small"
                        />
                        <Chip
                          label="Preview available"
                          size="small"
                          variant="outlined"
                        />
                      </Stack>

                      <Stack direction="row" spacing={0.75} alignItems="center">
                        <Typography
                          variant="button"
                          sx={{ lineHeight: 1 }}
                        >
                          Open preview
                        </Typography>
                        <ArrowForward
                          fontSize="small"
                          aria-hidden="true"
                        />
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
            Privileged Jira operations remain behind protected server actions and API
            routes.
          </Typography>
        </Stack>
      </Stack>
    </JiraRouteShell>
  );
}
