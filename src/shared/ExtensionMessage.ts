// type that represents json data that is sent from extension to webview, called ExtensionMessage and has 'type' enum which can be 'plusButtonClicked' or 'settingsButtonClicked' or 'hello'

import type { AutoApprovalSettings } from "./AutoApprovalSettings";
import type { HistoryItem } from "./HistoryItem";
import type { ApiConfiguration, ModelInfo } from "./api";

// webview will hold state
export interface ExtensionMessage {
  type:
    | "action"
    | "state"
    | "selectedImages"
    | "ollamaModels"
    | "lmStudioModels"
    | "theme"
    | "workspaceUpdated"
    | "invoke"
    | "partialMessage"
    | "openRouterModels"
    | "relinquishControl";
  text?: string;
  action?: "chatButtonClicked" | "settingsButtonClicked" | "historyButtonClicked" | "didBecomeVisible";
  invoke?: "sendMessage" | "primaryButtonClick" | "secondaryButtonClick";
  state?: ExtensionState;
  images?: string[];
  ollamaModels?: string[];
  lmStudioModels?: string[];
  filePaths?: string[];
  partialMessage?: ClineMessage;
  openRouterModels?: Record<string, ModelInfo>;
}

export interface ExtensionState {
  version: string;
  apiConfiguration?: ApiConfiguration;
  customInstructions?: string;
  uriScheme?: string;
  currentTaskItem?: HistoryItem;
  checkpointTrackerErrorMessage?: string;
  clineMessages: ClineMessage[];
  taskHistory: HistoryItem[];
  shouldShowAnnouncement: boolean;
  autoApprovalSettings: AutoApprovalSettings;
}

export interface ClineMessage {
  ts: number;
  type: "ask" | "say";
  ask?: ClineAsk;
  say?: ClineSay;
  text?: string;
  images?: string[];
  partial?: boolean;
  lastCheckpointHash?: string;
  conversationHistoryIndex?: number;
  conversationHistoryDeletedRange?: [number, number]; // for when conversation history is truncated for API requests
}

export type ClineAsk =
  | "followup"
  | "command"
  | "command_output"
  | "completion_result"
  | "tool"
  | "api_req_failed"
  | "resume_task"
  | "resume_completed_task"
  | "mistake_limit_reached"
  | "auto_approval_max_req_reached"
  | "browser_action_launch";

export type ClineSay =
  | "task"
  | "error"
  | "api_req_started"
  | "api_req_finished"
  | "text"
  | "completion_result"
  | "user_feedback"
  | "user_feedback_diff"
  | "api_req_retried"
  | "command"
  | "command_output"
  | "tool"
  | "shell_integration_warning"
  | "browser_action_launch"
  | "browser_action"
  | "browser_action_result"
  | "diff_error"
  | "deleted_api_reqs";

export interface ClineSayTool {
  tool:
    | "editedExistingFile"
    | "newFileCreated"
    | "readFile"
    | "listFilesTopLevel"
    | "listFilesRecursive"
    | "listCodeDefinitionNames"
    | "searchFiles";
  path?: string;
  diff?: string;
  content?: string;
  regex?: string;
  filePattern?: string;
}

// must keep in sync with system prompt
export const browserActions = ["launch", "click", "type", "scroll_down", "scroll_up", "close"] as const;
export type BrowserAction = (typeof browserActions)[number];

export interface ClineSayBrowserAction {
  action: BrowserAction;
  coordinate?: string;
  text?: string;
}

export type BrowserActionResult = {
  screenshot?: string;
  logs?: string;
  currentUrl?: string;
  currentMousePosition?: string;
};

export interface ClineApiReqInfo {
  request?: string;
  tokensIn?: number;
  tokensOut?: number;
  cacheWrites?: number;
  cacheReads?: number;
  cost?: number;
  cancelReason?: ClineApiReqCancelReason;
  streamingFailedMessage?: string;
}

export type ClineApiReqCancelReason = "streaming_failed" | "user_cancelled";

export const COMPLETION_RESULT_CHANGES_FLAG = "HAS_CHANGES";
