"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { saveJiraCredentialAction } from "../../_services/actions";
import type { JiraCredentialStatus } from "../../_types";

export interface JiraCredentialDialogProps {
  open: boolean;
  onClose: () => void;
  onSaved: (status: JiraCredentialStatus) => void;
}

export function JiraCredentialDialog({
  open,
  onClose,
  onSaved,
}: JiraCredentialDialogProps) {
  const [siteUrl, setSiteUrl] = useState("");
  const [email, setEmail] = useState("");
  const [apiToken, setApiToken] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);
    setIsSaving(true);

    try {
      const result = await saveJiraCredentialAction({
        siteUrl,
        email,
        apiToken,
      });

      if (!result.success) {
        setErrorMessage(result.error.message);
        return;
      }

      setApiToken("");
      onSaved(result.data);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Dialog
      open={open}
      onClose={isSaving ? undefined : onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Jira Credentials</DialogTitle>
      <DialogContent>
        <Stack
          component="form"
          id="jira-credential-form"
          spacing={2.25}
          sx={{ pt: 1 }}
          onSubmit={(event: FormEvent<HTMLFormElement>) => {
            void handleSubmit(event);
          }}
        >
          {errorMessage ? (
            <Alert severity="error">
              {errorMessage}
            </Alert>
          ) : null}
          <TextField
            label="Jira site URL"
            value={siteUrl}
            onChange={(event) => setSiteUrl(event.target.value)}
            autoComplete="url"
            required
            fullWidth
          />
          <TextField
            label="Atlassian account email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
            fullWidth
          />
          <TextField
            label="Jira API token"
            type="password"
            value={apiToken}
            onChange={(event) => setApiToken(event.target.value)}
            autoComplete="off"
            required
            fullWidth
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button type="button" onClick={onClose} disabled={isSaving}>
          Cancel
        </Button>
        <Button
          type="submit"
          form="jira-credential-form"
          variant="contained"
          disabled={isSaving}
        >
          {isSaving ? "Verifying..." : "Save credentials"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
