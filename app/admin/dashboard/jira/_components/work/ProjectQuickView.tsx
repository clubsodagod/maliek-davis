import Link from "next/link";
import {
  Alert,
  Box,
  Button,
  Chip,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { ArrowForward, QueryStats, SyncProblem } from "@mui/icons-material";
import type { ProjectSummaryView } from "../../_types";
import { jiraClassNames } from "../../_theme";
import { projectWorkPath, statusWorkPath } from "../../_utils/workRouting";

function MetricCard({ label, value }: { label: string; value: string | number }) {
  return (
    <Paper
      className={jiraClassNames.panelCompact}
      sx={{
        p: 2,
      }}
    >
      <Stack spacing={0.5}>
        <Typography component="p" variant="h4" sx={{ lineHeight: 1 }}>
          {value}
        </Typography>
        <Typography variant="body2">
          {label}
        </Typography>
      </Stack>
    </Paper>
  );
}

export function ProjectQuickView({ summary }: { summary: ProjectSummaryView }) {
  const completion = summary.overallCompletion.total === 0
    ? 0
    : Math.round(
        (summary.overallCompletion.completed / summary.overallCompletion.total) * 100,
      );

  return (
    <Stack spacing={3}>
      {summary.synchronizationHealth.jira === "failed" ? (
        <Alert severity="warning" icon={<SyncProblem aria-hidden="true" />}>
          {summary.synchronizationHealth.message ?? "Jira synchronization failed."}
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
        <MetricCard label="Completion" value={`${completion}%`} />
        <MetricCard label="Ready work" value={summary.readyWorkCount} />
        <MetricCard label="Overdue" value={summary.overdueCount} />
        <MetricCard label="Ownership gaps" value={summary.ownershipGapsCount} />
      </Box>

      <Paper
        className={jiraClassNames.panel}
        sx={{
          p: { xs: 2.5, md: 3 },
        }}
      >
        <Stack spacing={2.5}>
          <Stack direction="row" spacing={1.25} alignItems="center">
            <QueryStats aria-hidden="true" />
            <Typography component="h2" variant="h5">
              Project Health
            </Typography>
          </Stack>

          <Stack spacing={1}>
            <Stack direction="row" justifyContent="space-between" spacing={2}>
              <Typography variant="body2">
                {summary.overallCompletion.label}
              </Typography>
              <Typography variant="body2">
                {completion}%
              </Typography>
            </Stack>
            <LinearProgress
              className={jiraClassNames.progressRoomy}
              variant="determinate"
              value={completion}
            />
          </Stack>

          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {summary.statusDistribution.map((item) => (
              <Chip
                key={item.statusSlug}
                component={Link}
                href={statusWorkPath(summary.project.key, "subtask", item.statusSlug)}
                label={`${item.status}: ${item.count}`}
                clickable
                variant="outlined"
              />
            ))}
          </Stack>
        </Stack>
      </Paper>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
          gap: 2,
        }}
      >
        <Paper
          className={jiraClassNames.panel}
          sx={{
            p: 2.5,
          }}
        >
          <Stack spacing={1.5}>
            <Typography component="h2" variant="h5">
              Workstreams
            </Typography>
            {summary.workstreamProgress.length === 0 ? (
              <Typography variant="body2">
                No workstreams available.
              </Typography>
            ) : (
              summary.workstreamProgress.map((item) => (
                <Stack key={item.ref} spacing={0.75}>
                  <Stack direction="row" justifyContent="space-between" spacing={2}>
                    <Typography variant="body2">{item.summary}</Typography>
                    <Typography variant="caption">
                      {item.progress.label}
                    </Typography>
                  </Stack>
                  <LinearProgress
                    className={jiraClassNames.progressDense}
                    variant="determinate"
                    value={
                      item.progress.total === 0
                        ? 0
                        : (item.progress.completed / item.progress.total) * 100
                    }
                  />
                </Stack>
              ))
            )}
          </Stack>
        </Paper>

        <Paper
          className={jiraClassNames.panel}
          sx={{
            p: 2.5,
          }}
        >
          <Stack spacing={1.5}>
            <Typography component="h2" variant="h5">
              Recommended Next Actions
            </Typography>
            {summary.recommendedNextActions.length === 0 ? (
              <Typography variant="body2">
                No immediate actions.
              </Typography>
            ) : (
              summary.recommendedNextActions.map((action, index) => (
                <Stack
                  key={`${action.kind}-${index}`}
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={2}
                >
                  <Stack spacing={0.25}>
                    <Typography variant="body2">{action.label}</Typography>
                    <Typography variant="caption">
                      {action.priority} priority
                    </Typography>
                  </Stack>
                  <ArrowForward fontSize="small" aria-hidden="true" />
                </Stack>
              ))
            )}
            <Button
              component={Link}
              href={projectWorkPath(summary.project.key)}
              variant="contained"
              endIcon={<ArrowForward aria-hidden="true" />}
            >
              Open Ready Work
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Stack>
  );
}
