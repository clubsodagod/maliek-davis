"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  Alert,
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  LinearProgress,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import {
  Add,
  AutoFixHigh,
  CheckCircle,
  Forum,
  PlayArrow,
  Save,
  Send,
} from "@mui/icons-material";
import { jiraClassNames } from "../../_theme";
import {
  approveFinalJiraDiscoveryAction,
  approveJiraDiscoverySectionAction,
  chatJiraDiscoveryPlanAction,
  generateJiraDiscoveryPlanAction,
  patchJiraDiscoveryPlanAction,
  processJiraDiscoverySectionAction,
  saveJiraDiscoveryAnswerAction,
  startJiraDiscoveryAction,
} from "../../_services/discovery-actions";
import type {
  ApiResult,
  DiscoveryAnswer,
  DiscoveryAnswerState,
  DiscoveryFinalApprovalResponse,
  DiscoveryPlanPatchOperation,
  DiscoveryQuestion,
  DiscoveryResponse,
  DiscoverySection,
  DiscoveryTier,
} from "../../_types";

export interface JiraDiscoveryWorkspaceProps {
  initialResponse: DiscoveryResponse;
}

type DraftState = {
  rawAnswer: string;
  state: DiscoveryAnswerState;
};

const answerStates: DiscoveryAnswerState[] = [
  "draft",
  "confirmed",
  "assumption",
  "unknown",
  "not_applicable",
  "deferred",
  "disputed",
];

const tierOptions: Array<{
  value: DiscoveryTier;
  label: string;
  description: string;
}> = [
  {
    value: "standard",
    label: "Standard discovery",
    description: "Recommended for most projects.",
  },
  {
    value: "quick",
    label: "Quick discovery",
    description: "Minimum viable project outline.",
  },
  {
    value: "advanced",
    label: "Advanced discovery",
    description: "Deeper diligence for complex or high-risk work.",
  },
];

export function JiraDiscoveryWorkspace({
  initialResponse,
}: JiraDiscoveryWorkspaceProps) {
  const router = useRouter();
  const [response, setResponse] = useState(initialResponse);
  const [selectedTier, setSelectedTier] = useState<DiscoveryTier>(
    initialResponse.session.selectedTier ?? "standard",
  );
  const [activeSectionId, setActiveSectionId] = useState(
    initialResponse.session.currentSectionId ??
      initialResponse.questionBank.sections[0]?.id ??
      "",
  );
  const [drafts, setDrafts] = useState<Record<string, DraftState>>({});
  const [manualSummary, setManualSummary] = useState("");
  const [manualParentRef, setManualParentRef] = useState("");
  const [manualTarget, setManualTarget] = useState<"workstream" | "task" | "subtask">("workstream");
  const [chatPrompt, setChatPrompt] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const { session, questionBank } = response;
  const questionById = useMemo(
    () => new Map(questionBank.questions.map((question) => [question.id, question])),
    [questionBank.questions],
  );
  const sectionById = useMemo(
    () => new Map(session.sections.map((section) => [section.id, section])),
    [session.sections],
  );
  const activeSection =
    sectionById.get(activeSectionId) ?? session.sections[0];
  const activeQuestions = activeSection
    ? activeSection.eligibleQuestionIds
        .map((questionId) => questionById.get(questionId))
        .filter((question): question is DiscoveryQuestion => question !== undefined)
    : [];
  const latestPlan = session.planRevisions.at(-1);
  const latestChatProposal = [...session.chatChangeRequests]
    .reverse()
    .find((request) => request.status === "proposed");
  const approvedSections = session.sections.filter(
    (section) => section.status === "approved",
  ).length;
  const overallProgress =
    session.sections.length === 0
      ? 0
      : (approvedSections / session.sections.length) * 100;

  useEffect(() => {
    const nextDrafts: Record<string, DraftState> = {};
    for (const answer of session.answers) {
      nextDrafts[answer.id] = {
        rawAnswer: answer.rawAnswer,
        state: answer.state,
      };
    }
    setDrafts((current) => ({ ...nextDrafts, ...current }));
  }, [session.answers]);

  useEffect(() => {
    if (session.currentSectionId) {
      setActiveSectionId(session.currentSectionId);
    }
  }, [session.currentSectionId]);

  function applyResult<T extends DiscoveryResponse | DiscoveryFinalApprovalResponse>(
    result: ApiResult<T>,
    onSuccess?: (data: T) => void,
  ): void {
    if (!result.success) {
      setError(result.error.message);
      return;
    }
    setError(null);
    setResponse({
      session: result.data.session,
      questionBank: result.data.questionBank,
    });
    onSuccess?.(result.data);
  }

  function runAction<T extends DiscoveryResponse | DiscoveryFinalApprovalResponse>(
    action: () => Promise<ApiResult<T>>,
    onSuccess?: (data: T) => void,
  ): void {
    startTransition(async () => {
      applyResult(await action(), onSuccess);
    });
  }

  function updateDraft(answerId: string, patch: Partial<DraftState>): void {
    setDrafts((current) => ({
      ...current,
      [answerId]: {
        rawAnswer: current[answerId]?.rawAnswer ?? "",
        state: current[answerId]?.state ?? "draft",
        ...patch,
      },
    }));
  }

  function saveQuestionAnswer(question: DiscoveryQuestion): void {
    const existing = findAnswerForQuestion(session.answers, question.id);
    const draft = drafts[question.id] ?? {
      rawAnswer: existing?.rawAnswer ?? "",
      state: existing?.state ?? "draft",
    };
    runAction(() =>
      saveJiraDiscoveryAnswerAction({
        setupId: session.setupId,
        questionId: question.id,
        rawAnswer: draft.rawAnswer,
        state: draft.state,
        expectedVersion: existing?.version ?? 0,
      }),
    );
  }

  function saveClarificationAnswer(clarificationId: string): void {
    const existing = session.answers.find(
      (answer) => answer.clarificationId === clarificationId,
    );
    const draft = drafts[clarificationId] ?? {
      rawAnswer: existing?.rawAnswer ?? "",
      state: existing?.state ?? "draft",
    };
    runAction(() =>
      saveJiraDiscoveryAnswerAction({
        setupId: session.setupId,
        clarificationId,
        rawAnswer: draft.rawAnswer,
        state: draft.state,
        expectedVersion: existing?.version ?? 0,
      }),
    );
  }

  function addManualPlanItem(): void {
    if (!manualSummary.trim()) return;
    const ref = toRef(manualSummary);
    const operation: DiscoveryPlanPatchOperation =
      manualTarget === "workstream"
        ? {
            type: "add",
            target: "workstream",
            value: {
              ref,
              summary: manualSummary.trim(),
              description: "",
              provenanceQuestionIds: [],
              tasks: [],
            },
          }
        : manualTarget === "task"
          ? {
              type: "add",
              target: "task",
              parentRef: manualParentRef,
              value: {
                ref,
                summary: manualSummary.trim(),
                description: "",
                provenanceQuestionIds: [],
                subtasks: [],
              },
            }
          : {
              type: "add",
              target: "subtask",
              parentRef: manualParentRef,
              value: {
                ref,
                summary: manualSummary.trim(),
                description: "",
                provenanceQuestionIds: [],
              },
            };

    runAction(() =>
      patchJiraDiscoveryPlanAction({
        setupId: session.setupId,
        operations: [operation],
      }),
      () => setManualSummary(""),
    );
  }

  if (session.status === "not_started" || session.status === "skipped") {
    return (
      <Stack spacing={3}>
        {error ? <Alert severity="error">{error}</Alert> : null}
        <PaperPanel>
          <Stack spacing={2.5}>
            <Typography component="h2" variant="h5">
              Choose a discovery path
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup
                value={selectedTier}
                onChange={(event) =>
                  setSelectedTier(event.target.value as DiscoveryTier)
                }
              >
                <Stack spacing={1}>
                  {tierOptions.map((option) => (
                    <FormControlLabel
                      key={option.value}
                      value={option.value}
                      control={<Radio />}
                      label={
                        <Stack spacing={0.25}>
                          <Typography variant="body2" sx={{ fontWeight: 800 }}>
                            {option.label}
                          </Typography>
                          <Typography variant="caption">
                            {option.description}
                          </Typography>
                        </Stack>
                      }
                    />
                  ))}
                </Stack>
              </RadioGroup>
            </FormControl>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Button
                variant="contained"
                startIcon={<PlayArrow aria-hidden="true" />}
                disabled={isPending}
                onClick={() =>
                  runAction(() =>
                    startJiraDiscoveryAction({
                      setupId: session.setupId,
                      tier: selectedTier,
                    }),
                  )
                }
              >
                Start Guided Discovery
              </Button>
            </Stack>
          </Stack>
        </PaperPanel>
      </Stack>
    );
  }

  return (
    <Stack spacing={3}>
      {error ? <Alert severity="error">{error}</Alert> : null}
      {session.processingError ? (
        <Alert severity="warning">{session.processingError}</Alert>
      ) : null}

      <Stack spacing={1.25}>
        <LinearProgress variant="determinate" value={overallProgress} />
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <Chip label={session.project.project.name} />
          <Chip label={session.selectedTier ?? "standard"} />
          <Chip label={session.status.replaceAll("_", " ")} />
          <Chip label={`${approvedSections}/${session.sections.length} sections`} />
        </Stack>
      </Stack>

      <Tabs
        value={activeSection?.id ?? false}
        onChange={(_event, value: string) => setActiveSectionId(value)}
        variant="scrollable"
        allowScrollButtonsMobile
        aria-label="Discovery sections"
      >
        {questionBank.sections.map((section) => {
          const record = sectionById.get(section.id);
          return (
            <Tab
              key={section.id}
              value={section.id}
              label={`${section.order}. ${section.title}`}
              icon={record?.status === "approved" ? <CheckCircle /> : undefined}
              iconPosition="start"
            />
          );
        })}
      </Tabs>

      {activeSection ? (
        <PaperPanel>
          <Stack spacing={2.5}>
            <SectionHeader section={activeSection} questionCount={activeQuestions.length} />
            {activeQuestions.map((question) => (
              <QuestionEditor
                key={question.id}
                question={question}
                answer={findAnswerForQuestion(session.answers, question.id)}
                draft={drafts[question.id]}
                disabled={isPending}
                onDraftChange={(patch) => updateDraft(question.id, patch)}
                onSave={() => saveQuestionAnswer(question)}
              />
            ))}

            <ClarificationList
              sectionId={activeSection.id}
              response={response}
              drafts={drafts}
              disabled={isPending}
              onDraftChange={updateDraft}
              onSave={saveClarificationAnswer}
            />

            {activeSection.analysis ? (
              <AnalysisSummary section={activeSection} />
            ) : null}

            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Button
                variant="contained"
                startIcon={<AutoFixHigh aria-hidden="true" />}
                disabled={isPending}
                onClick={() =>
                  runAction(() =>
                    processJiraDiscoverySectionAction({
                      setupId: session.setupId,
                      sectionId: activeSection.id,
                    }),
                  )
                }
              >
                Process section
              </Button>
              <Button
                variant="outlined"
                startIcon={<CheckCircle aria-hidden="true" />}
                disabled={isPending || activeSection.status !== "ready_for_approval"}
                onClick={() =>
                  runAction(() =>
                    approveJiraDiscoverySectionAction({
                      setupId: session.setupId,
                      sectionId: activeSection.id,
                      revision: activeSection.revision,
                    }),
                  )
                }
              >
                Approve section
              </Button>
            </Stack>
          </Stack>
        </PaperPanel>
      ) : null}

      <PaperPanel>
        <Stack spacing={2.5}>
          <Typography component="h2" variant="h5">
            Discovery plan preview
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Button
              variant="contained"
              startIcon={<AutoFixHigh aria-hidden="true" />}
              disabled={isPending || session.status !== "ready_for_final_review"}
              onClick={() =>
                runAction(() =>
                  generateJiraDiscoveryPlanAction({ setupId: session.setupId }),
                )
              }
            >
              Generate plan
            </Button>
            {latestPlan ? (
              <Button
                variant="outlined"
                startIcon={<Send aria-hidden="true" />}
                disabled={isPending}
                onClick={() =>
                  runAction(
                    () =>
                      approveFinalJiraDiscoveryAction({
                        setupId: session.setupId,
                        planRevisionId: latestPlan.id,
                      }),
                    (data) => router.push(data.previewPath),
                  )
                }
              >
                Final approval
              </Button>
            ) : null}
          </Stack>

          {latestPlan ? (
            <>
              <PlanOverview plan={latestPlan.plan} />
              <Divider />
              <Stack spacing={2}>
                <Typography component="h3" variant="subtitle1" sx={{ fontWeight: 800 }}>
                  Edit hierarchy
                </Typography>
                <Stack direction={{ xs: "column", md: "row" }} spacing={1.5}>
                  <FormControl sx={{ minWidth: 160 }}>
                    <InputLabel id="manual-target-label">Item type</InputLabel>
                    <Select
                      labelId="manual-target-label"
                      label="Item type"
                      value={manualTarget}
                      onChange={(event) =>
                        setManualTarget(event.target.value as typeof manualTarget)
                      }
                    >
                      <MenuItem value="workstream">Workstream</MenuItem>
                      <MenuItem value="task">Task</MenuItem>
                      <MenuItem value="subtask">Subtask</MenuItem>
                    </Select>
                  </FormControl>
                  {manualTarget !== "workstream" ? (
                    <FormControl sx={{ minWidth: 220 }}>
                      <InputLabel id="manual-parent-label">Parent</InputLabel>
                      <Select
                        labelId="manual-parent-label"
                        label="Parent"
                        value={manualParentRef}
                        onChange={(event) => setManualParentRef(event.target.value)}
                      >
                        {parentOptions(latestPlan.plan, manualTarget).map((option) => (
                          <MenuItem key={option.ref} value={option.ref}>
                            {option.summary}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  ) : null}
                  <TextField
                    label="Summary"
                    value={manualSummary}
                    onChange={(event) => setManualSummary(event.target.value)}
                    fullWidth
                  />
                  <Button
                    variant="outlined"
                    startIcon={<Add aria-hidden="true" />}
                    disabled={
                      isPending ||
                      !manualSummary.trim() ||
                      (manualTarget !== "workstream" && !manualParentRef)
                    }
                    onClick={addManualPlanItem}
                  >
                    Add
                  </Button>
                </Stack>
              </Stack>

              <Stack spacing={1.5}>
                <Typography component="h3" variant="subtitle1" sx={{ fontWeight: 800 }}>
                  Request changes
                </Typography>
                <Stack direction={{ xs: "column", md: "row" }} spacing={1.5}>
                  <TextField
                    label="Change request"
                    value={chatPrompt}
                    onChange={(event) => setChatPrompt(event.target.value)}
                    fullWidth
                  />
                  <Button
                    variant="outlined"
                    startIcon={<Forum aria-hidden="true" />}
                    disabled={isPending || !chatPrompt.trim()}
                    onClick={() =>
                      runAction(
                        () =>
                          chatJiraDiscoveryPlanAction({
                            setupId: session.setupId,
                            prompt: chatPrompt,
                          }),
                        () => setChatPrompt(""),
                      )
                    }
                  >
                    Preview
                  </Button>
                </Stack>
                {latestChatProposal ? (
                  <Alert
                    severity="info"
                    action={
                      <Button
                        color="inherit"
                        size="small"
                        disabled={isPending}
                        onClick={() =>
                          runAction(() =>
                            patchJiraDiscoveryPlanAction({
                              setupId: session.setupId,
                              operations: latestChatProposal.proposedOperations,
                            }),
                          )
                        }
                      >
                        Accept patch
                      </Button>
                    }
                  >
                    {latestChatProposal.rationale || "Structured patch is ready."}
                  </Alert>
                ) : null}
              </Stack>
            </>
          ) : (
            <Alert severity="info" icon={false}>
              Approve all eligible sections before generating the editable plan.
            </Alert>
          )}
        </Stack>
      </PaperPanel>
    </Stack>
  );
}

function SectionHeader({
  section,
  questionCount,
}: {
  section: DiscoverySection;
  questionCount: number;
}) {
  return (
    <Stack spacing={1}>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        <Chip label={section.status.replaceAll("_", " ")} />
        <Chip label={`${questionCount} active questions`} />
        <Chip label={`Revision ${section.revision}`} />
      </Stack>
      <Typography component="h2" variant="h5">
        {section.id.replaceAll("_", " ")}
      </Typography>
    </Stack>
  );
}

function QuestionEditor({
  question,
  answer,
  draft,
  disabled,
  onDraftChange,
  onSave,
}: {
  question: DiscoveryQuestion;
  answer?: DiscoveryAnswer;
  draft?: DraftState;
  disabled: boolean;
  onDraftChange: (patch: Partial<DraftState>) => void;
  onSave: () => void;
}) {
  const value = draft?.rawAnswer ?? answer?.rawAnswer ?? "";
  const state = draft?.state ?? answer?.state ?? "draft";

  return (
    <Paper
      className={jiraClassNames.panelCompact}
      sx={{
        p: 2,
      }}
    >
      <Stack spacing={1.5}>
        <Stack spacing={0.75}>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Chip size="small" label={question.id} />
            <Chip size="small" label={question.required ? "Required" : "Optional"} />
            <Chip size="small" label={question.tier} />
          </Stack>
          <Typography component="h3" variant="subtitle1" sx={{ fontWeight: 800 }}>
            {question.prompt}
          </Typography>
          <Typography variant="body2">
            {question.guidance}
          </Typography>
        </Stack>
        {question.suggestedOptions.length > 0 ? (
          <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap>
            {question.suggestedOptions.slice(0, 8).map((option) => (
              <Chip key={option} size="small" label={option} />
            ))}
          </Stack>
        ) : null}
        <TextField
          label="Answer"
          value={value}
          onChange={(event) => onDraftChange({ rawAnswer: event.target.value })}
          multiline
          minRows={3}
          fullWidth
        />
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.25}>
          <FormControl sx={{ minWidth: 180 }}>
            <InputLabel id={`${question.id}-state-label`}>State</InputLabel>
            <Select
              labelId={`${question.id}-state-label`}
              label="State"
              value={state}
              onChange={(event) =>
                onDraftChange({ state: event.target.value as DiscoveryAnswerState })
              }
            >
              {answerStates.map((answerState) => (
                <MenuItem key={answerState} value={answerState}>
                  {answerState.replaceAll("_", " ")}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            startIcon={<Save aria-hidden="true" />}
            disabled={disabled || !value.trim()}
            onClick={onSave}
          >
            Save
          </Button>
        </Stack>
        {answer?.polishedAnswer ? (
          <Alert severity="success" icon={false}>
            <Stack spacing={0.5}>
              <Typography variant="body2">{answer.polishedAnswer}</Typography>
              {answer.interpretation ? (
                <Typography variant="caption">{answer.interpretation}</Typography>
              ) : null}
            </Stack>
          </Alert>
        ) : null}
      </Stack>
    </Paper>
  );
}

function ClarificationList({
  sectionId,
  response,
  drafts,
  disabled,
  onDraftChange,
  onSave,
}: {
  sectionId: string;
  response: DiscoveryResponse;
  drafts: Record<string, DraftState>;
  disabled: boolean;
  onDraftChange: (answerId: string, patch: Partial<DraftState>) => void;
  onSave: (clarificationId: string) => void;
}) {
  const clarifications = response.session.clarifyingQuestions.filter(
    (question) => question.sectionId === sectionId,
  );
  if (clarifications.length === 0) return null;

  return (
    <Stack spacing={1.5}>
      <Typography component="h3" variant="subtitle1" sx={{ fontWeight: 800 }}>
        Clarifications
      </Typography>
      {clarifications.map((clarification) => {
        const answer = response.session.answers.find(
          (candidate) => candidate.clarificationId === clarification.id,
        );
        const draft = drafts[clarification.id] ?? {
          rawAnswer: answer?.rawAnswer ?? "",
          state: answer?.state ?? "draft",
        };
        return (
          <Paper
            key={clarification.id}
            className={jiraClassNames.panelCompact}
            sx={{
              p: 2,
            }}
          >
            <Stack spacing={1.25}>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                <Chip size="small" label={clarification.priority} />
                <Chip size="small" label={clarification.status} />
              </Stack>
              <Typography variant="body2" sx={{ fontWeight: 800 }}>
                {clarification.prompt}
              </Typography>
              <Typography variant="caption">
                {clarification.reason}
              </Typography>
              <TextField
                label="Clarification answer"
                value={draft.rawAnswer}
                onChange={(event) =>
                  onDraftChange(clarification.id, {
                    rawAnswer: event.target.value,
                  })
                }
                multiline
                minRows={2}
                fullWidth
              />
              <Button
                variant="outlined"
                disabled={disabled || !draft.rawAnswer.trim()}
                onClick={() => onSave(clarification.id)}
              >
                Save clarification
              </Button>
            </Stack>
          </Paper>
        );
      })}
    </Stack>
  );
}

function AnalysisSummary({ section }: { section: DiscoverySection }) {
  if (!section.analysis) return null;

  return (
    <Alert severity={section.status === "needs_clarification" ? "warning" : "info"} icon={false}>
      <Stack spacing={0.75}>
        <Typography variant="body2">{section.analysis.summary}</Typography>
        {section.analysis.assumptions.length > 0 ? (
          <Typography variant="caption">
            Assumptions: {section.analysis.assumptions.join("; ")}
          </Typography>
        ) : null}
        {section.analysis.openDecisions.length > 0 ? (
          <Typography variant="caption">
            Open decisions:{" "}
            {section.analysis.openDecisions.map((decision) => decision.summary).join("; ")}
          </Typography>
        ) : null}
      </Stack>
    </Alert>
  );
}

function PlanOverview({ plan }: { plan: DiscoveryResponse["session"]["planRevisions"][number]["plan"] }) {
  return (
    <Stack spacing={2}>
      <Stack spacing={0.75}>
        <Typography component="h3" variant="h5">
          {plan.project.name}
        </Typography>
        <Typography variant="body2">
          {plan.project.description || plan.project.problemOrOpportunity}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        <Chip label={`${plan.workstreams.length} workstreams`} />
        <Chip label={`${plan.assumptions.length} assumptions`} />
        <Chip label={`${plan.openDecisions.length} open decisions`} />
        <Chip label={`${plan.risks.length} risks`} />
      </Stack>
      <Stack spacing={1}>
        {plan.workstreams.map((workstream) => (
          <Box
            key={workstream.ref}
            className={jiraClassNames.hierarchyBranch}
            sx={{ pl: 2 }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
              {workstream.summary}
            </Typography>
            {workstream.tasks.map((task) => (
              <Typography key={task.ref} variant="body2">
                {task.summary} ({task.subtasks.length} subtasks)
              </Typography>
            ))}
          </Box>
        ))}
      </Stack>
    </Stack>
  );
}

function PaperPanel({ children }: { children: ReactNode }) {
  return (
    <Paper
      className={jiraClassNames.panel}
      sx={{
        p: { xs: 2.5, md: 3 },
      }}
    >
      {children}
    </Paper>
  );
}

function findAnswerForQuestion(
  answers: DiscoveryAnswer[],
  questionId: string,
): DiscoveryAnswer | undefined {
  return answers.find((answer) => answer.questionId === questionId);
}

function parentOptions(
  plan: DiscoveryResponse["session"]["planRevisions"][number]["plan"],
  target: "task" | "subtask",
): Array<{ ref: string; summary: string }> {
  if (target === "task") {
    return plan.workstreams.map((workstream) => ({
      ref: workstream.ref,
      summary: workstream.summary,
    }));
  }

  return plan.workstreams.flatMap((workstream) =>
    workstream.tasks.map((task) => ({
      ref: task.ref,
      summary: `${workstream.summary} / ${task.summary}`,
    })),
  );
}

function toRef(value: string): string {
  return (
    value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || "manual-item"
  );
}
