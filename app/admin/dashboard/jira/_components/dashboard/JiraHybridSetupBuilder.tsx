"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  ButtonBase,
  Chip,
  FormControl,
  FormControlLabel,
  LinearProgress,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  AutoFixHigh,
  CheckCircle,
  CloudUpload,
  ExpandMore,
  Sync,
  Visibility,
} from "@mui/icons-material";
import {
  createJiraSetupAction,
  updateJiraSetupAction,
  validateJiraSetupAction,
} from "../../_services/actions";
import type {
  JiraBuilderValidationIssue,
  JiraAutomationReadiness,
  JiraProjectSetupDraft,
  JiraProjectSummary,
  JiraStageImportResult,
  JiraStagedSetupImports,
} from "../../_utils/setupBuilder";
import {
  buildJiraProjectSetupRequest,
  canAutosaveJiraSetupBuilder,
  canPreviewJiraSetupBuilder,
  defaultJiraProjectSetupDraft,
  emptyJiraStagedSetupImports,
  findJiraProjectSummaryConflict,
  generateJiraProjectKeyFromName,
  getJiraHierarchyStats,
  getJiraWorkflowSelectionState,
  getJiraStagePreviewData,
  mergeJiraStagedSetupImports,
  parseJiraSubtaskStageJson,
  parseJiraTaskLinkStageJson,
  parseJiraTaskStageJson,
  parseJiraWorkstreamLinkStageJson,
  parseJiraWorkstreamStageJson,
  shouldAttemptJiraAutosave,
  validateJiraProjectSetupRequestForBuilder,
} from "../../_utils/setupBuilder";
import type { JiraProjectSetupRequest } from "../../_types";
import {
  formatJiraManagementStyle,
  formatJiraProjectTypeKey,
  getJiraProjectTemplateById,
  getJiraWorkflowOption,
  JIRA_PROJECT_TEMPLATE_GROUPS,
  JIRA_PROJECT_TEMPLATE_OPTIONS,
  JIRA_WORKFLOW_OPTIONS,
  type JiraProjectTemplateOption,
  type JiraProjectTemplateId,
  type JiraWorkflowSelectionId,
} from "../../_config/projectOptions";
import { jiraClassNames } from "../../_theme";

type SaveStatus = "idle" | "waiting" | "saving" | "saved" | "error";
type ValidationStatus = "idle" | "validating" | "valid" | "error";
type ConfigureStep =
  | "projectName"
  | "templateWorkflow"
  | "workstreams"
  | "workstreamLinks"
  | "tasks"
  | "taskLinks"
  | "subtasks"
  | "finish";
type ImportStage = Exclude<ConfigureStep, "projectName" | "templateWorkflow" | "finish">;

type StageFeedback = {
  severity: "info" | "success" | "error";
  message: string;
  issues?: JiraBuilderValidationIssue[];
};

type ImportStageConfig = {
  step: ImportStage;
  title: string;
  prompt: string;
  optional: boolean;
};

export type JiraHybridSetupBuilderProps = {
  projectSummaries?: JiraProjectSummary[];
  automationReadiness?: JiraAutomationReadiness;
};

const MAX_JSON_FILE_SIZE_BYTES = 15_000_000;
const AUTOSAVE_DELAY_MS = 1_200;
const STEPS: ConfigureStep[] = [
  "projectName",
  "templateWorkflow",
  "workstreams",
  "workstreamLinks",
  "tasks",
  "taskLinks",
  "subtasks",
  "finish",
];
const IMPORT_STAGES: ImportStageConfig[] = [
  {
    step: "workstreams",
    title: "Workstreams",
    prompt: "Drop workstreams JSON.",
    optional: false,
  },
  {
    step: "workstreamLinks",
    title: "Workstream links",
    prompt: "Drop workstream relationship JSON.",
    optional: true,
  },
  {
    step: "tasks",
    title: "Tasks",
    prompt: "Drop tasks JSON.",
    optional: false,
  },
  {
    step: "taskLinks",
    title: "Task links",
    prompt: "Drop task relationship JSON.",
    optional: true,
  },
  {
    step: "subtasks",
    title: "Subtasks",
    prompt: "Drop subtasks JSON.",
    optional: true,
  },
];
function formatSaveStatus(status: SaveStatus, setupId: string | null): string {
  if (status === "waiting") return "Saving shortly";
  if (status === "saving") return setupId ? "Updating draft" : "Creating draft";
  if (status === "saved") return "Draft saved";
  if (status === "error") return "Draft not saved";
  return "Not saved";
}

function firstIssueMessage(issues: JiraBuilderValidationIssue[]): string {
  const firstIssue = issues[0];
  return firstIssue
    ? `${firstIssue.path}: ${firstIssue.message}`
    : "The setup data needs attention.";
}

function isStageComplete(
  step: ConfigureStep,
  stagedImports: JiraStagedSetupImports,
): boolean {
  if (step === "workstreams") return stagedImports.workstreams.length > 0;
  if (step === "workstreamLinks") return true;
  if (step === "tasks") return stagedImports.tasks.length > 0;
  if (step === "taskLinks") return true;
  if (step === "subtasks") return true;
  return false;
}

function createStageFeedback(): Record<ImportStage, StageFeedback> {
  return {
    workstreams: {
      severity: "info",
      message: "Waiting for workstreams.",
    },
    workstreamLinks: {
      severity: "info",
      message: "Workstream links are optional.",
    },
    tasks: {
      severity: "info",
      message: "Waiting for tasks.",
    },
    taskLinks: {
      severity: "info",
      message: "Task links are optional.",
    },
    subtasks: {
      severity: "info",
      message: "Subtasks are optional.",
    },
  };
}

function getStageCount(
  step: ImportStage,
  stagedImports: JiraStagedSetupImports,
): number {
  if (step === "workstreams") return stagedImports.workstreams.length;
  if (step === "workstreamLinks") return stagedImports.workstreamLinks.length;
  if (step === "tasks") return stagedImports.tasks.length;
  if (step === "taskLinks") return stagedImports.taskLinks.length;
  return stagedImports.subtasks.length;
}

function JsonPreviewAccordion({
  title,
  count,
  data,
}: {
  title: string;
  count?: number;
  data: unknown;
}) {
  return (
    <Accordion
      disableGutters
      className={jiraClassNames.accordion}
      sx={{
        width: { xs: "100%", md: "50%" }
      }}
    >
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
          <Typography variant="body2">{title}</Typography>
          {count === undefined ? null : <Chip size="small" label={`${count} records`} />}
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Box
          component="pre"
          className={jiraClassNames.jsonPreview}
        >
          {JSON.stringify(data, null, 2)}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

function TemplateSelectionCard({
  template,
  selected,
  onSelect,
}: {
  template: JiraProjectTemplateOption;
  selected: boolean;
  onSelect: (id: JiraProjectTemplateId) => void;
}) {
  return (
    <ButtonBase
      component="article"
      onClick={() => onSelect(template.id)}
      aria-pressed={selected}
      className={clsx(
        jiraClassNames.choiceCard,
        selected && jiraClassNames.choiceCardSelected,
      )}
      sx={{
        p: 2,
        minHeight: 236,
      }}
    >
      <Stack spacing={1.35} sx={{ width: "100%" }}>
        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
          <Typography component="h3" variant="subtitle1" sx={{ fontWeight: 800 }}>
            {template.name}
          </Typography>
          {selected ? <Chip size="small" label="Selected" /> : null}
          {template.pearlBoxRecommended ? (
            <Chip size="small" label="Recommended" />
          ) : null}
        </Stack>

        <Typography variant="body2">
          {template.purpose}
        </Typography>

        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <Chip size="small" label={formatJiraProjectTypeKey(template.projectTypeKey)} />
          <Chip size="small" label={formatJiraManagementStyle(template.managementStyle)} />
        </Stack>

        <Stack spacing={0.5}>
          <Typography
            variant="overline"
            sx={{ lineHeight: 1.3 }}
          >
            Expected issue types
          </Typography>
          <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap>
            {template.expectedIssueTypes.map((issueType) => (
              <Chip key={issueType} size="small" variant="outlined" label={issueType} />
            ))}
          </Stack>
        </Stack>

        <Typography variant="caption">
          {template.recommendedUseCase}
        </Typography>
      </Stack>
    </ButtonBase>
  );
}

function TemplateHierarchyPreview({
  template,
}: {
  template: JiraProjectTemplateOption;
}) {
  return (
    <Paper
      className={jiraClassNames.panelCompact}
      sx={{
        p: 2,
      }}
    >
      <Stack spacing={1.5}>
        <Typography component="h3" variant="subtitle1" sx={{ fontWeight: 800 }}>
          Expected hierarchy preview
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <Chip label={`Workstream: ${template.hierarchyPreview.workstream}`} />
          <Chip label={`Task: ${template.hierarchyPreview.task}`} />
          <Chip label={`Subtask: ${template.hierarchyPreview.subtask}`} />
        </Stack>
        <Typography variant="body2">
          Jira will still be queried after project creation for the actual issue types
          available in this project.
        </Typography>
      </Stack>
    </Paper>
  );
}

export function JiraHybridSetupBuilder({
  projectSummaries = [],
  automationReadiness = {
    status: "unavailable",
    message: "Jira automation is unavailable.",
  },
}: JiraHybridSetupBuilderProps) {
  const router = useRouter();
  const lastSavedSignatureRef = useRef<string | null>(null);
  const lastFailedAutosaveSignatureRef = useRef<string | null>(null);
  const lastValidatedSignatureRef = useRef<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isPending, startTransition] = useTransition();

  const [activeStep, setActiveStep] = useState<ConfigureStep>("projectName");
  const [draft, setDraft] = useState<JiraProjectSetupDraft>(
    defaultJiraProjectSetupDraft,
  );
  const [stagedImports, setStagedImports] = useState<JiraStagedSetupImports>(
    emptyJiraStagedSetupImports,
  );
  const [pasteText, setPasteText] = useState<Record<ImportStage, string>>({
    workstreams: "",
    workstreamLinks: "",
    tasks: "",
    taskLinks: "",
    subtasks: "",
  });
  const [stageFeedback, setStageFeedback] =
    useState<Record<ImportStage, StageFeedback>>(createStageFeedback);
  const [setupId, setSetupId] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [saveError, setSaveError] = useState<string | null>(null);
  const [validationStatus, setValidationStatus] =
    useState<ValidationStatus>("idle");
  const [validationFeedback, setValidationFeedback] =
    useState<StageFeedback | null>(null);

  const selectedTemplate = useMemo(
    () => getJiraProjectTemplateById(draft.projectTemplateId),
    [draft.projectTemplateId],
  );
  const selectedWorkflow = useMemo(
    () => getJiraWorkflowOption(draft.workflowId),
    [draft.workflowId],
  );
  const projectKey = useMemo(
    () => generateJiraProjectKeyFromName(draft.projectName),
    [draft.projectName],
  );
  const projectConflict = useMemo(
    () =>
      findJiraProjectSummaryConflict(
        draft.projectName,
        projectKey,
        projectSummaries,
      ),
    [draft.projectName, projectKey, projectSummaries],
  );
  const projectReady =
    draft.projectName.trim().length > 0 && projectKey.length > 0 && !projectConflict;
  const mergedWorkstreams = useMemo(
    () => mergeJiraStagedSetupImports(stagedImports),
    [stagedImports],
  );
  const setupRequest = useMemo(
    () =>
      buildJiraProjectSetupRequest(
        {
          ...draft,
          projectKey,
        },
        mergedWorkstreams,
      ),
    [draft, mergedWorkstreams, projectKey],
  );
  const localIssues = useMemo(
    () => validateJiraProjectSetupRequestForBuilder(setupRequest),
    [setupRequest],
  );
  const hierarchyStats = useMemo(
    () => getJiraHierarchyStats(mergedWorkstreams),
    [mergedWorkstreams],
  );
  const hasMinimumImports =
    stagedImports.workstreams.length > 0 && stagedImports.tasks.length > 0;
  const automationReady = automationReadiness.status === "ready";
  const canAutosave = canAutosaveJiraSetupBuilder({
    hasCheckedProjectKey: projectReady,
    hasImportedHierarchy: hasMinimumImports,
    localIssueCount: localIssues.length,
    isPending,
    automationReady,
  });
  const canSaveAndPreview = canPreviewJiraSetupBuilder({
    hasCheckedProjectKey: projectReady,
    hasImportedHierarchy: hasMinimumImports,
    localIssueCount: localIssues.length,
    automationReady,
  });
  const progress =
    ((STEPS.findIndex((step) => step === activeStep) + 1) / STEPS.length) * 100;

  function updateProjectName(value: string): void {
    setDraft((current) => ({
      ...current,
      projectName: value,
    }));
    setValidationFeedback(null);
  }

  function updateProjectTemplate(value: JiraProjectTemplateId): void {
    setDraft((current) => ({
      ...current,
      projectTemplateId: value,
      workflowId: getJiraWorkflowSelectionState(value, current.workflowId).disabled
        ? "jira-default"
        : current.workflowId,
    }));
    setValidationFeedback(null);
  }

  function updateWorkflowSelection(value: JiraWorkflowSelectionId): void {
    if (getJiraWorkflowSelectionState(draft.projectTemplateId, value).disabled) {
      return;
    }

    setDraft((current) => ({
      ...current,
      workflowId: value,
    }));
    setValidationFeedback(null);
  }

  const saveRequest = useCallback(
    (
      request: JiraProjectSetupRequest,
      signature: string,
      navigateTo: "none" | "preview" | "discovery",
    ): void => {
      setSaveStatus("saving");
      setSaveError(null);

      startTransition(async () => {
        const result = setupId
          ? await updateJiraSetupAction({ setupId, request })
          : await createJiraSetupAction(request);

        if (!result.success) {
          if (navigateTo === "none") {
            lastFailedAutosaveSignatureRef.current = signature;
          }
          setSaveStatus("error");
          setSaveError(result.error.message);
          return;
        }

        lastSavedSignatureRef.current = signature;
        setSetupId(result.data.id);
        setSaveStatus("saved");

        if (navigateTo === "preview") {
          router.push(`/admin/dashboard/jira/setups/${result.data.id}/preview`);
        }

        if (navigateTo === "discovery") {
          router.push(`/admin/dashboard/jira/setups/${result.data.id}/discovery`);
        }
      });
    },
    [router, setupId, startTransition],
  );

  function applyStageImport<T>(
    step: ImportStage,
    result: JiraStageImportResult<T>,
    apply: (data: T) => void,
    successMessage: (data: T) => string,
  ): void {
    if (!result.success) {
      setStageFeedback((current) => ({
        ...current,
        [step]: {
          severity: "error",
          message: firstIssueMessage(result.issues),
          issues: result.issues,
        },
      }));
      return;
    }

    apply(result.data);
    setStageFeedback((current) => ({
      ...current,
      [step]: {
        severity: "success",
        message: successMessage(result.data),
      },
    }));
    setValidationFeedback(null);
  }

  function importStageFromText(step: ImportStage, text: string): void {
    if (step === "workstreams") {
      applyStageImport(
        step,
        parseJiraWorkstreamStageJson(text),
        (workstreams) =>
          setStagedImports({
            ...emptyJiraStagedSetupImports,
            workstreams,
          }),
        (workstreams) => `Imported ${workstreams.length} workstream records.`,
      );
      return;
    }

    if (step === "workstreamLinks") {
      applyStageImport(
        step,
        parseJiraWorkstreamLinkStageJson(text, stagedImports.workstreams),
        (workstreamLinks) =>
          setStagedImports((current) => ({
            ...current,
            workstreamLinks,
          })),
        (links) => `Imported ${links.length} workstream links.`,
      );
      return;
    }

    if (step === "tasks") {
      applyStageImport(
        step,
        parseJiraTaskStageJson(text, stagedImports.workstreams),
        (tasks) =>
          setStagedImports((current) => ({
            ...current,
            tasks,
            taskLinks: [],
            subtasks: [],
          })),
        (tasks) => `Imported ${tasks.length} task records.`,
      );
      return;
    }

    if (step === "taskLinks") {
      applyStageImport(
        step,
        parseJiraTaskLinkStageJson(text, stagedImports.tasks),
        (taskLinks) =>
          setStagedImports((current) => ({
            ...current,
            taskLinks,
          })),
        (links) => `Imported ${links.length} task links.`,
      );
      return;
    }

    applyStageImport(
      step,
      parseJiraSubtaskStageJson(text, stagedImports.tasks),
      (subtasks) =>
        setStagedImports((current) => ({
          ...current,
          subtasks,
        })),
      (subtasks) => `Imported ${subtasks.length} subtask records.`,
    );
  }

  async function importStageFile(step: ImportStage, file: File): Promise<void> {
    if (file.size > MAX_JSON_FILE_SIZE_BYTES) {
      setStageFeedback((current) => ({
        ...current,
        [step]: {
          severity: "error",
          message: "The JSON file must be 15 MB or smaller.",
        },
      }));
      return;
    }

    const text = await file.text();
    setPasteText((current) => ({
      ...current,
      [step]: text,
    }));
    importStageFromText(step, text);
  }

  function continueToNextStep(): void {
    if (activeStep === "projectName" && !projectReady) return;
    if (activeStep !== "projectName" && activeStep !== "templateWorkflow") {
      if (!isStageComplete(activeStep, stagedImports)) return;
    }

    const index = STEPS.findIndex((step) => step === activeStep);
    setActiveStep(STEPS[Math.min(index + 1, STEPS.length - 1)]);
  }

  function handleBack(): void {
    const index = STEPS.findIndex((step) => step === activeStep);
    setActiveStep(STEPS[Math.max(index - 1, 0)]);
  }

  function handleSaveAndPreview(): void {
    if (!automationReady) {
      setValidationFeedback({
        severity: "error",
        message: "Jira automation is unavailable.",
      });
      return;
    }

    if (!projectReady || !hasMinimumImports || localIssues.length > 0) {
      setValidationFeedback({
        severity: "error",
        message:
          localIssues.length > 0
            ? firstIssueMessage(localIssues)
            : "Complete the required setup steps before preview.",
        issues: localIssues,
      });
      return;
    }

    saveRequest(setupRequest, JSON.stringify(setupRequest), "preview");
  }

  function handleStartDiscovery(): void {
    if (!automationReady) {
      setValidationFeedback({
        severity: "error",
        message: "Jira automation is unavailable.",
      });
      return;
    }

    if (!projectReady || localIssues.length > 0) {
      setValidationFeedback({
        severity: "error",
        message:
          localIssues.length > 0
            ? firstIssueMessage(localIssues)
            : "Choose a project name, template, and workflow before discovery.",
        issues: localIssues,
      });
      return;
    }

    saveRequest(setupRequest, JSON.stringify(setupRequest), "discovery");
  }

  useEffect(() => {
    if (!automationReady || !canAutosave) return;

    const signature = JSON.stringify(setupRequest);

    if (signature === lastValidatedSignatureRef.current) return;

    lastValidatedSignatureRef.current = signature;
    setValidationStatus("validating");

    startTransition(async () => {
      const result = await validateJiraSetupAction(setupRequest);

      if (!result.success) {
        setValidationStatus("error");
        setValidationFeedback({
          severity: "error",
          message: result.error.message,
        });
        return;
      }

      setValidationStatus("valid");
      setValidationFeedback({
        severity: "success",
        message: "Setup validated automatically.",
      });
    });
  }, [automationReady, canAutosave, setupRequest, startTransition]);

  useEffect(() => {
    if (!canAutosave) return;

    const signature = JSON.stringify(setupRequest);

    if (
      !shouldAttemptJiraAutosave({
        signature,
        lastSavedSignature: lastSavedSignatureRef.current,
        lastFailedSignature: lastFailedAutosaveSignatureRef.current,
      })
    ) {
      return;
    }

    setSaveStatus("waiting");

    const timeout = window.setTimeout(() => {
      saveRequest(setupRequest, signature, "none");
    }, AUTOSAVE_DELAY_MS);

    return () => window.clearTimeout(timeout);
  }, [canAutosave, saveRequest, setupRequest]);

  const currentStage = IMPORT_STAGES.find((stage) => stage.step === activeStep);
  const stageReady = currentStage
    ? currentStage.optional || isStageComplete(currentStage.step, stagedImports)
    : false;
  const currentStagePreviewData = currentStage
    ? getJiraStagePreviewData(stagedImports, currentStage.step)
    : null;

  return (
    <Paper
      component="section"
      className={jiraClassNames.panel}
      sx={{
        p: { xs: 2.5, md: 3 },
      }}
    >
      <Stack spacing={3}>
        {automationReadiness.status === "unavailable" ? (
          <Alert severity="warning" icon={false}>
            {automationReadiness.message || "Jira automation is unavailable."}
          </Alert>
        ) : null}

        <Stack spacing={1}>
          <LinearProgress variant="determinate" value={progress} />
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Chip label={projectKey ? `Key ${projectKey}` : "Key pending"} />
            <Chip label={formatSaveStatus(saveStatus, setupId)} />
            {validationStatus === "valid" ? (
              <Chip label="Validated" icon={<CheckCircle />} />
            ) : null}
          </Stack>
        </Stack>

        {activeStep === "projectName" ? (
          <Stack spacing={2.5}>
            <Typography component="h2" variant="h5">
              What should this Jira space be called?
            </Typography>
            <TextField
              label="Project name"
              value={draft.projectName}
              onChange={(event) => updateProjectName(event.target.value)}
              autoFocus
              fullWidth
              required
            />
            {projectKey ? (
              <Alert severity={projectConflict ? "error" : "success"} icon={false}>
                {projectConflict
                  ? `${projectKey} is already used by ${projectConflict.name}. Try a different project name.`
                  : `Project key ${projectKey} will be used.`}
              </Alert>
            ) : (
              <Alert severity="info" icon={false}>
                The project key appears after you enter a name.
              </Alert>
            )}
            <Button
              type="button"
              variant="contained"
              onClick={continueToNextStep}
              disabled={!projectReady}
            >
              Continue
            </Button>
          </Stack>
        ) : null}

        {activeStep === "templateWorkflow" ? (
          <Stack spacing={2.5}>
            <Typography component="h2" variant="h5">
              Choose the Jira template and workflow.
            </Typography>

            <Stack spacing={3}>
              {JIRA_PROJECT_TEMPLATE_GROUPS.map((group) => {
                const templates = JIRA_PROJECT_TEMPLATE_OPTIONS.filter(
                  (template) => template.group === group,
                );

                return (
                  <Stack key={group} spacing={1.5}>
                    <Typography component="h3" variant="subtitle1" sx={{ fontWeight: 800 }}>
                      {group}
                    </Typography>
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: {
                          xs: "1fr",
                          md: "repeat(2, minmax(0, 1fr))",
                        },
                        gap: 1.5,
                      }}
                    >
                      {templates.map((template) => (
                        <TemplateSelectionCard
                          key={template.id}
                          template={template}
                          selected={template.id === draft.projectTemplateId}
                          onSelect={updateProjectTemplate}
                        />
                      ))}
                    </Box>
                  </Stack>
                );
              })}
            </Stack>

            <TemplateHierarchyPreview template={selectedTemplate} />

            <Paper
              className={jiraClassNames.panelCompact}
              sx={{
                p: 2,
              }}
            >
              <FormControl component="fieldset" fullWidth>
                <Stack spacing={1.5}>
                  <Typography component="legend" variant="subtitle1" sx={{ fontWeight: 800 }}>
                    Workflow
                  </Typography>
                  <RadioGroup
                    value={draft.workflowId}
                    onChange={(event) =>
                      updateWorkflowSelection(
                        event.target.value as JiraWorkflowSelectionId,
                      )
                    }
                  >
                    <Stack spacing={1}>
                      {JIRA_WORKFLOW_OPTIONS.map((workflow) => {
                        const availability = getJiraWorkflowSelectionState(
                          draft.projectTemplateId,
                          workflow.id,
                        );

                        return (
                          <Paper
                            key={workflow.id}
                            className={jiraClassNames.panelCompact}
                            sx={{
                              p: 1.25,
                            }}
                          >
                            <FormControlLabel
                              value={workflow.id}
                              control={<Radio />}
                              disabled={availability.disabled}
                              label={
                                <Stack spacing={0.35}>
                                  <Typography variant="body2" sx={{ fontWeight: 800 }}>
                                    {workflow.name}
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                  >
                                    {availability.reason ?? workflow.description}
                                  </Typography>
                                </Stack>
                              }
                              sx={{ alignItems: "flex-start", m: 0 }}
                            />
                          </Paper>
                        );
                      })}
                    </Stack>
                  </RadioGroup>
                </Stack>
              </FormControl>
            </Paper>

            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Chip label={formatJiraProjectTypeKey(selectedTemplate.projectTypeKey)} />
              <Chip label={formatJiraManagementStyle(selectedTemplate.managementStyle)} />
              <Chip label={selectedWorkflow.name} />
            </Stack>

            <Accordion
              disableGutters
              className={jiraClassNames.accordion}
            >
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="body2">Advanced details</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={2}>
                  <TextField
                    label="Workstream issue type"
                    value={draft.workstreamIssueType}
                    onChange={(event) =>
                      setDraft((current) => ({
                        ...current,
                        workstreamIssueType: event.target.value,
                      }))
                    }
                    fullWidth
                  />
                  <TextField
                    label="Task issue type"
                    value={draft.taskIssueType}
                    onChange={(event) =>
                      setDraft((current) => ({
                        ...current,
                        taskIssueType: event.target.value,
                      }))
                    }
                    fullWidth
                  />
                  <TextField
                    label="Subtask issue type"
                    value={draft.subtaskIssueType}
                    onChange={(event) =>
                      setDraft((current) => ({
                        ...current,
                        subtaskIssueType: event.target.value,
                      }))
                    }
                    fullWidth
                  />
                </Stack>
              </AccordionDetails>
            </Accordion>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Button
                type="button"
                variant="contained"
                startIcon={<AutoFixHigh aria-hidden="true" />}
                disabled={isPending || !projectReady || !automationReady}
                onClick={() => handleStartDiscovery()}
              >
                Start Guided Discovery
              </Button>
              <Button type="button" variant="outlined" onClick={() => continueToNextStep()}>
                Skip Discovery and Continue
              </Button>
            </Stack>
          </Stack>
        ) : null}

        {currentStage ? (
          <Stack spacing={2.5}>
            <Typography component="h2" variant="h5">
              {currentStage.title}
            </Typography>
            <Alert severity={stageFeedback[currentStage.step].severity} icon={false}>
              <Stack spacing={0.75}>
                <span>{stageFeedback[currentStage.step].message}</span>
                {stageFeedback[currentStage.step].issues?.slice(0, 3).map((issue) => (
                  <Typography key={`${issue.path}-${issue.message}`} variant="caption">
                    {issue.path}: {issue.message}
                  </Typography>
                ))}
              </Stack>
            </Alert>

            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Chip label={`${getStageCount(currentStage.step, stagedImports)} imported`} />
              {currentStage.optional ? <Chip label="Optional" /> : null}
            </Stack>
            <Stack direction={{xs:"column",md:"row"}} spacing={1}  useFlexGap>
              <Box
                className={jiraClassNames.dropZone}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault();
                  const file = event.dataTransfer.files.item(0);
                  if (file) void importStageFile(currentStage.step, file);
                }}
                sx={{
                  p: 3,
                  width: { xs: "100%", md: "50%" },
                }}
              >
                <Stack spacing={1.25} alignItems="center">
                  <CloudUpload aria-hidden="true" />
                  <Typography variant="body1">{currentStage.prompt}</Typography>
                  <Button
                    type="button"
                    variant="outlined"
                    startIcon={<CloudUpload aria-hidden="true" />}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Choose JSON
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/json,.json"
                    hidden
                    onChange={(event) => {
                      const file = event.target.files?.item(0);
                      if (file) void importStageFile(currentStage.step, file);
                      event.target.value = "";
                    }}
                  />
                </Stack>
              </Box>

              {currentStagePreviewData ? (
                <JsonPreviewAccordion
                  title="Preview imported JSON"
                  count={getStageCount(currentStage.step, stagedImports)}
                  data={currentStagePreviewData}
                />
              ) : null}
            </Stack>


            <Accordion
              disableGutters
              className={jiraClassNames.accordion}
            >
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="body2">Paste JSON instead</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={1.5}>
                  <TextField
                    label={`${currentStage.title} JSON`}
                    value={pasteText[currentStage.step]}
                    onChange={(event) =>
                      setPasteText((current) => ({
                        ...current,
                        [currentStage.step]: event.target.value,
                      }))
                    }
                    multiline
                    minRows={4}
                    fullWidth
                  />
                  <Button
                    type="button"
                    variant="outlined"
                    startIcon={<Sync aria-hidden="true" />}
                    onClick={() =>
                      importStageFromText(
                        currentStage.step,
                        pasteText[currentStage.step],
                      )
                    }
                  >
                    Import pasted JSON
                  </Button>
                </Stack>
              </AccordionDetails>
            </Accordion>



            <Button
              type="button"
              variant="contained"
              onClick={() => continueToNextStep()}
              disabled={!stageReady}
            >
              {currentStage.optional && getStageCount(currentStage.step, stagedImports) === 0
                ? "Continue without this"
                : "Continue"}
            </Button>
          </Stack>
        ) : null}

        {activeStep === "finish" ? (
          <Stack spacing={2.5}>
            <Typography component="h2" variant="h5">
              Ready for preview
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Chip label={`${hierarchyStats.workstreams} workstreams`} />
              <Chip label={`${hierarchyStats.links} links`} />
              <Chip label={`${hierarchyStats.tasks} tasks`} />
              <Chip label={`${hierarchyStats.subtasks} subtasks`} />
            </Stack>
            {validationFeedback ? (
              <Alert severity={validationFeedback.severity} icon={false}>
                {validationFeedback.message}
              </Alert>
            ) : null}
            {saveError ? <Alert severity="error">{saveError}</Alert> : null}
            {localIssues.length > 0 ? (
              <Alert severity="error" icon={false}>
                {firstIssueMessage(localIssues)}
              </Alert>
            ) : null}
            <JsonPreviewAccordion
              title="Preview merged setup JSON"
              data={setupRequest}
            />
            <Button
              type="button"
              variant="contained"
              startIcon={<Visibility aria-hidden="true" />}
              onClick={() => handleSaveAndPreview()}
              disabled={isPending || !canSaveAndPreview}
            >
              Save and preview
            </Button>
          </Stack>
        ) : null}

        {activeStep !== "projectName" ? (
          <Button type="button" variant="text" onClick={() => handleBack()}>
            Back
          </Button>
        ) : null}
      </Stack>
    </Paper>
  );
}
