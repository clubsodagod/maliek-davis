"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Divider,
  LinearProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ArrowBack, ArrowForward, CheckCircle, Save } from "@mui/icons-material";
import type { AnswerView, EvidenceLink, SubtaskQuestionView } from "../../_types";
import { jiraClassNames } from "../../_theme";
import {
  completeWorkAnswerAction,
  saveWorkAnswerAction,
  validateWorkAnswerAction,
} from "../../_services/work-actions";
import { questionSearchParam, statusWorkPath } from "../../_utils/workRouting";

const AUTOSAVE_DELAY_MS = 900;

export interface QuestionWorkspaceProps {
  question: SubtaskQuestionView;
}

function progressPercent(question: SubtaskQuestionView): number {
  return question.taskProgress.total === 0
    ? 0
    : Math.round((question.taskProgress.completed / question.taskProgress.total) * 100);
}

function evidenceDraft(evidence: EvidenceLink[]): EvidenceLink {
  return evidence[0] ?? { label: "", url: "" };
}

function normalizeEvidence(item: EvidenceLink): EvidenceLink[] {
  return item.label.trim() === "" && item.url.trim() === ""
    ? []
    : [{ label: item.label.trim(), url: item.url.trim() }];
}

export function QuestionWorkspace({ question }: QuestionWorkspaceProps) {
  const router = useRouter();
  const [answer, setAnswer] = useState(question.answer.answer);
  const [evidence, setEvidence] = useState<EvidenceLink>(
    evidenceDraft(question.answer.evidence),
  );
  const [answerView, setAnswerView] = useState<AnswerView>(question.answer);
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "error" | "idle">(
    question.answer.updatedAt ? "saved" : "idle",
  );
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const hasEdited = useRef(false);

  const issueId = question.issue.issueKey;
  const evidencePayload = normalizeEvidence(evidence);
  const nextHref = question.queue.nextIssueId
    ? `${statusWorkPath(question.project.key, "subtask", "ready")}?${questionSearchParam(
        question.queue.nextIssueId,
      )}`
    : null;
  const previousHref = question.queue.previousIssueId
    ? `${statusWorkPath(question.project.key, "subtask", "ready")}?${questionSearchParam(
        question.queue.previousIssueId,
      )}`
    : null;

  async function saveDraft(nextAnswer = answer, nextEvidence = evidencePayload) {
    setSaveStatus("saving");
    setMessage(null);
    const result = await saveWorkAnswerAction({
      projectKey: question.project.key,
      issueIdOrKey: issueId,
      version: answerView.version,
      answer: nextAnswer,
      evidence: nextEvidence,
    });

    if (result.success) {
      setAnswerView(result.data);
      setSaveStatus("saved");
      router.refresh();
    } else {
      setMessage(result.error.message);
      setSaveStatus("error");
    }
  }

  useEffect(() => {
    if (!hasEdited.current) return;

    const timeout = window.setTimeout(() => {
      void saveDraft();
    }, AUTOSAVE_DELAY_MS);

    return () => {
      window.clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answer, evidence.label, evidence.url]);

  function runValidation() {
    setMessage(null);
    startTransition(async () => {
      const result = await validateWorkAnswerAction({
        projectKey: question.project.key,
        issueIdOrKey: issueId,
        version: answerView.version,
        answer,
        evidence: evidencePayload,
      });

      if (result.success) {
        setAnswerView(result.data);
        setMessage(result.data.validation.passed ? "Validation passed." : "Validation failed.");
        router.refresh();
      } else {
        setMessage(result.error.message);
      }
    });
  }

  function completeQuestion() {
    setMessage(null);
    startTransition(async () => {
      const result = await completeWorkAnswerAction({
        projectKey: question.project.key,
        issueIdOrKey: issueId,
        version: answerView.version,
      });

      if (result.success) {
        setAnswerView(result.data);
        setMessage("Answer completed.");
        router.refresh();
      } else {
        setMessage(result.error.message);
      }
    });
  }

  return (
    <Paper
      className={jiraClassNames.panel}
      sx={{
        p: { xs: 2.5, md: 3 },
      }}
    >
      <Stack spacing={2.5}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          spacing={2}
        >
          <Stack spacing={1}>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Chip label={question.issue.issueKey} />
              <Chip label={answerView.status} />
              <Chip label={`${question.queue.position}/${question.queue.total}`} />
            </Stack>
            <Typography component="h2" variant="h4" sx={{ lineHeight: 1.08 }}>
              {question.issue.summary}
            </Typography>
            <Typography variant="body2">
              {question.parentTask.summary} | {question.workstream.summary}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {previousHref ? (
              <Button
                component={Link}
                href={previousHref}
                variant="outlined"
                startIcon={<ArrowBack aria-hidden="true" />}
              >
                Previous
              </Button>
            ) : null}
            {nextHref ? (
              <Button
                component={Link}
                href={nextHref}
                variant="outlined"
                endIcon={<ArrowForward aria-hidden="true" />}
              >
                Next
              </Button>
            ) : null}
          </Stack>
        </Stack>

        <Stack spacing={0.75}>
          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Typography variant="caption">
              {question.taskProgress.label}
            </Typography>
            <Typography variant="caption">
              {progressPercent(question)}%
            </Typography>
          </Stack>
          <LinearProgress
            className={jiraClassNames.progressDense}
            variant="determinate"
            value={progressPercent(question)}
          />
        </Stack>

        <Divider />

        <Stack spacing={1.5}>
          <Typography component="h3" variant="h5">
            {question.question.question}
          </Typography>
          {question.question.objective ? (
            <Typography variant="body2">
              {question.question.objective}
            </Typography>
          ) : null}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "repeat(3, minmax(0, 1fr))" },
              gap: 1.5,
            }}
          >
            <GuidanceBlock title="Guidance" values={question.question.guidance} />
            <GuidanceBlock
              title="Acceptance"
              values={question.question.acceptanceCriteria}
            />
            <GuidanceBlock
              title="Evidence"
              values={question.question.evidenceRequirements}
            />
          </Box>
        </Stack>

        <TextField
          label="Answer"
          value={answer}
          onChange={(event) => {
            hasEdited.current = true;
            setAnswer(event.target.value);
          }}
          minRows={8}
          multiline
          fullWidth
        />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 2fr" },
            gap: 1.5,
          }}
        >
          <TextField
            label="Evidence label"
            value={evidence.label}
            onChange={(event) => {
              hasEdited.current = true;
              setEvidence((current) => ({ ...current, label: event.target.value }));
            }}
            size="small"
          />
          <TextField
            label="Evidence URL"
            value={evidence.url}
            onChange={(event) => {
              hasEdited.current = true;
              setEvidence((current) => ({ ...current, url: event.target.value }));
            }}
            size="small"
          />
        </Box>

        {answerView.validation.errors.length > 0 ? (
          <Alert severity="error">
            {answerView.validation.errors.join(" ")}
          </Alert>
        ) : null}

        {answerView.validation.warnings.length > 0 ? (
          <Alert severity="warning">
            {answerView.validation.warnings.join(" ")}
          </Alert>
        ) : null}

        {message ? (
          <Alert severity={saveStatus === "error" ? "error" : "info"}>{message}</Alert>
        ) : null}

        <Stack direction="row" spacing={1.25} flexWrap="wrap" useFlexGap>
          <Button
            variant="outlined"
            startIcon={<Save aria-hidden="true" />}
            disabled={saveStatus === "saving"}
            onClick={() => {
              hasEdited.current = false;
              void saveDraft();
            }}
          >
            {saveStatus === "saving" ? "Saving" : "Save"}
          </Button>
          <Button variant="outlined" disabled={isPending} onClick={runValidation}>
            Validate
          </Button>
          <Button
            variant="contained"
            disabled={isPending || answerView.status === "completed"}
            startIcon={<CheckCircle aria-hidden="true" />}
            onClick={completeQuestion}
          >
            Complete
          </Button>
          <Chip
            label={
              saveStatus === "saved"
                ? "Saved"
                : saveStatus === "saving"
                  ? "Saving"
                  : saveStatus === "error"
                    ? "Save failed"
                    : "Not saved"
            }
          />
        </Stack>
      </Stack>
    </Paper>
  );
}

function GuidanceBlock({ title, values }: { title: string; values: string[] }) {
  return (
    <Paper
      className={jiraClassNames.panelCompact}
      sx={{
        p: 1.5,
      }}
    >
      <Stack spacing={0.75}>
        <Typography variant="overline">
          {title}
        </Typography>
        {values.length === 0 ? (
          <Typography variant="body2">
            None
          </Typography>
        ) : (
          values.map((value, index) => (
            <Typography key={`${title}-${index}`} variant="body2">
              {value}
            </Typography>
          ))
        )}
      </Stack>
    </Paper>
  );
}
