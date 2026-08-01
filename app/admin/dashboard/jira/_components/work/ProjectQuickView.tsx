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
import { projectWorkPath, statusWorkPath } from "../../_utils/workRouting";

const mutedText = "rgba(248, 247, 255, 0.68)";

function MetricCard({ label, value }: { label: string; value: string | number }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 1,
        border: "1px solid rgba(255, 255, 255, 0.1)",
        backgroundColor: "rgba(8, 9, 16, 0.28)",
        color: "inherit",
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
        <Stack spacing={2.5}>
          <Stack direction="row" spacing={1.25} alignItems="center">
            <QueryStats color="primary" aria-hidden="true" />
            <Typography component="h2" variant="h5">
              Project Health
            </Typography>
          </Stack>

          <Stack spacing={1}>
            <Stack direction="row" justifyContent="space-between" spacing={2}>
              <Typography variant="body2" sx={{ color: mutedText }}>
                {summary.overallCompletion.label}
              </Typography>
              <Typography variant="body2" sx={{ color: mutedText }}>
                {completion}%
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={completion}
              sx={{ height: 8, borderRadius: 1 }}
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
                sx={{
                  color: "rgba(248, 247, 255, 0.86)",
                  borderColor: "rgba(255, 255, 255, 0.16)",
                }}
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
          elevation={0}
          sx={{
            p: 2.5,
            borderRadius: 2,
            border: "1px solid rgba(255, 255, 255, 0.1)",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            color: "inherit",
          }}
        >
          <Stack spacing={1.5}>
            <Typography component="h2" variant="h5">
              Workstreams
            </Typography>
            {summary.workstreamProgress.length === 0 ? (
              <Typography variant="body2" sx={{ color: mutedText }}>
                No workstreams available.
              </Typography>
            ) : (
              summary.workstreamProgress.map((item) => (
                <Stack key={item.ref} spacing={0.75}>
                  <Stack direction="row" justifyContent="space-between" spacing={2}>
                    <Typography variant="body2">{item.summary}</Typography>
                    <Typography variant="caption" sx={{ color: mutedText }}>
                      {item.progress.label}
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={
                      item.progress.total === 0
                        ? 0
                        : (item.progress.completed / item.progress.total) * 100
                    }
                    sx={{ height: 6, borderRadius: 1 }}
                  />
                </Stack>
              ))
            )}
          </Stack>
        </Paper>

        <Paper
          elevation={0}
          sx={{
            p: 2.5,
            borderRadius: 2,
            border: "1px solid rgba(255, 255, 255, 0.1)",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            color: "inherit",
          }}
        >
          <Stack spacing={1.5}>
            <Typography component="h2" variant="h5">
              Recommended Next Actions
            </Typography>
            {summary.recommendedNextActions.length === 0 ? (
              <Typography variant="body2" sx={{ color: mutedText }}>
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
                    <Typography variant="caption" sx={{ color: mutedText }}>
                      {action.priority} priority
                    </Typography>
                  </Stack>
                  <ArrowForward color="primary" fontSize="small" aria-hidden="true" />
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
