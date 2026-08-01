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
  ArrowForward,
  Dashboard,
  InfoOutlined,
  Visibility,
} from "@mui/icons-material";
import { JiraDashboardCardGrid } from "./JiraDashboardCardGrid";
import { JiraRouteShell } from "./JiraRouteShell";
import type { JiraSetupList, JiraSetupRecord } from "../../_types";

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
          elevation={0}
          sx={{
            display: "block",
            p: 1.25,
            borderRadius: 1,
            border: "1px solid rgba(255, 255, 255, 0.12)",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            color: "inherit",
            textDecoration: "none",
            transition: "border-color 160ms ease, background-color 160ms ease",
            "&:hover, &:focus-visible": {
              borderColor: "rgba(144, 202, 249, 0.58)",
              backgroundColor: "rgba(144, 202, 249, 0.08)",
            },
            "&:focus-visible": {
              outline: "2px solid rgba(144, 202, 249, 0.9)",
              outlineOffset: 2,
            },
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Visibility fontSize="small" color="primary" aria-hidden="true" />
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
                sx={{ color: "rgba(248, 247, 255, 0.58)", lineHeight: 1.2 }}
              >
                {setup.request.project.key} | {countSetupWorkstreams(setup)}{" "}
                workstreams
              </Typography>
            </Stack>
            <ArrowForward fontSize="small" color="primary" aria-hidden="true" />
          </Stack>
        </Paper>
      ))}
    </Box>
  );
}

export function JiraDashboardModule({
  setups = [],
  registryError,
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
      description="A protected admin workspace for creating, validating, previewing, executing, and reviewing structured Jira project setups."
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
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 2,
            border: "1px solid rgba(255, 255, 255, 0.1)",
            backgroundColor: "rgba(255, 255, 255, 0.06)",
            color: "inherit",
          }}
        >
          <Stack spacing={2.5}>
            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <Dashboard color="primary" aria-hidden="true" />
              <Stack spacing={0.75}>
                <Typography component="h2" variant="h5">
                  Saved setup registry
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(248, 247, 255, 0.68)" }}
                >
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
                elevation={0}
                sx={{
                  p: 2.5,
                  borderRadius: 2,
                  border: "1px dashed rgba(255, 255, 255, 0.18)",
                  backgroundColor: "rgba(255, 255, 255, 0.04)",
                  color: "inherit",
                }}
              >
                <Typography variant="body2" sx={{ color: "rgba(248, 247, 255, 0.68)" }}>
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
                    elevation={0}
                    sx={{
                      display: "block",
                      p: 2.5,
                      borderRadius: 2,
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      color: "inherit",
                      textDecoration: "none",
                      transition:
                        "border-color 160ms ease, background-color 160ms ease, transform 160ms ease",
                      "&:hover, &:focus-visible": {
                        borderColor: "rgba(144, 202, 249, 0.58)",
                        backgroundColor: "rgba(144, 202, 249, 0.08)",
                        transform: "translateY(-1px)",
                      },
                      "&:focus-visible": {
                        outline: "2px solid rgba(144, 202, 249, 0.9)",
                        outlineOffset: 3,
                      },
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
                            sx={{ color: "rgba(248, 247, 255, 0.62)" }}
                          >
                            Project {setup.request.project.key} |{" "}
                            {countSetupWorkstreams(setup)} workstreams |{" "}
                            {formatUpdatedAt(setup.updatedAt)}
                          </Typography>
                        </Stack>
                        <Visibility color="primary" aria-hidden="true" />
                      </Stack>

                      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        <Chip
                          label={setup.status}
                          size="small"
                          color="primary"
                          sx={{ color: "#081018", fontWeight: 700 }}
                        />
                        <Chip
                          label="Preview available"
                          size="small"
                          variant="outlined"
                          sx={{
                            color: "rgba(248, 247, 255, 0.82)",
                            borderColor: "rgba(255, 255, 255, 0.16)",
                          }}
                        />
                      </Stack>

                      <Stack direction="row" spacing={0.75} alignItems="center">
                        <Typography
                          variant="button"
                          sx={{ color: "primary.light", lineHeight: 1 }}
                        >
                          Open preview
                        </Typography>
                        <ArrowForward
                          fontSize="small"
                          color="primary"
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
          <InfoOutlined fontSize="small" color="primary" aria-hidden="true" />
          <Typography variant="caption" sx={{ color: "rgba(248, 247, 255, 0.6)" }}>
            Privileged Jira operations remain behind protected server actions and API
            routes.
          </Typography>
        </Stack>
      </Stack>
    </JiraRouteShell>
  );
}
