import { VSCodeButton, VSCodeLink } from "@vscode/webview-ui-toolkit/react"
import { useEffect, useState } from "react"
import { useExtensionState } from "../../context/ExtensionStateContext"
import { validateApiConfiguration } from "../../utils/validate"
import { vscode } from "../../utils/vscode"
import ApiOptions from "../settings/ApiOptions"

const WelcomeView = () => {
	const { apiConfiguration } = useExtensionState()

	const [apiErrorMessage, setApiErrorMessage] = useState<string | undefined>(undefined)

	const disableLetsGoButton = apiErrorMessage != null

	const handleSubmit = () => {
		vscode.postMessage({ type: "apiConfiguration", apiConfiguration })
	}

	useEffect(() => {
		setApiErrorMessage(validateApiConfiguration(apiConfiguration))
	}, [apiConfiguration])

	return (
		<div
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				padding: "0 20px",
			}}>
			<h2>Clama - A Variation of Cline</h2>
			<p>
				Clama is an open-source coding assistant optimized for enterprise-grade workflows. This is a work in progress.
				Target features include:
				<ul>
					<li>Lightweight extension</li>
					<li>Restrict AI models</li>
					<li>Server side components and AIOps setup</li>
					<li>Additional admin controls</li>
					<li>And more...</li>
				</ul>
				Like{" "}
				<VSCodeLink href="https://github.com/cline/cline" style={{ display: "inline" }}>
					Cline
				</VSCodeLink>
				, Clama can access tools to create and edit files, explore complex projects, use the browser, and execute terminal
				commands (with your permission, of course).
			</p>

			<b>To get started, this extension needs an API provider.</b>

			<div style={{ marginTop: "10px" }}>
				<ApiOptions showModelOptions={false} />
				<VSCodeButton onClick={handleSubmit} disabled={disableLetsGoButton} style={{ marginTop: "3px" }}>
					Let's go!
				</VSCodeButton>
			</div>
		</div>
	)
}

export default WelcomeView
