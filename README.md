# Clama

An open-source coding assistant optimized for enterprise-grade workflows. This project is a fork of Cline.

Goals:

-   Lightweight extension.
-   Restrict AI models.
-   Server side components and AIOps setup.
-   Aditional Admin controls.
-   And more...

<a href="https://marketplace.visualstudio.com/items?itemName=crantotech.clama" target="_blank"><strong>Download on VS Marketplace</strong></a>

Clama can handle complex software development tasks step-by-step. With tools that let him create & edit files, explore large projects, use the browser, and execute terminal commands (after you grant permission), it can assist you in ways that go beyond code completion or tech support. Clama can even use the Model Context Protocol (MCP) to create new tools and extend his own capabilities. While autonomous AI scripts traditionally run in sandboxed environments, this extension provides a human-in-the-loop GUI to approve every file change and terminal command, providing a safe and accessible way to explore the potential of agentic AI.

1. Enter your task and add images to convert mockups into functional apps or fix bugs with screenshots.
2. Clama starts by analyzing your file structure & source code ASTs, running regex searches, and reading relevant files to get up to speed in existing projects. By carefully managing what information is added to context, Clama can provide valuable assistance even for large, complex projects without overwhelming the context window.
3. Once Clama has the information it needs, it can:
    - Create and edit files + monitor linter/compiler errors along the way, letting him proactively fix issues like missing imports and syntax errors on his own.
    - Execute commands directly in your terminal and monitor their output as it works, letting him e.g., react to dev server issues after editing a file.
    - For web development tasks, Clama can launch the site in a headless browser, click, type, scroll, and capture screenshots + console logs, allowing him to fix runtime errors and visual bugs.
4. When a task is completed, Clama will present the result to you with a terminal command like `open -a "Google Chrome" index.html`, which you run with a click of a button.

> [!TIP]
> Use the `CMD/CTRL + Shift + P` shortcut to open the command palette and type "Clama: Open In New Tab" to open the extension as a tab in your editor. This lets you use Clama side-by-side with your file explorer, and see how it changes your workspace more clearly.

## API and Model

Clama supports model configured by your enterpirse at server-config-url/model-catalog .

The extension also keeps track of total tokens and API usage cost for the entire task loop and individual requests, keeping you informed of spend every step of the way.

## Run Commands in Terminal

Thanks to the new [shell integration updates in VSCode v1.93](https://code.visualstudio.com/updates/v1_93#_terminal-shell-integration-api), Clama can execute commands directly in your terminal and receive the output. This allows him to perform a wide range of tasks, from installing packages and running build scripts to deploying applications, managing databases, and executing tests, all while adapting to your dev environment & toolchain to get the job done right.

For long running processes like dev servers, use the "Proceed While Running" button to let Clama continue in the task while the command runs in the background. As Clama works he’ll be notified of any new terminal output along the way, letting him react to issues that may come up, such as compile-time errors when editing files.

### Create and Edit Files

Clama can create and edit files directly in your editor, presenting you a diff view of the changes. You can edit or revert Clama's changes directly in the diff view editor, or provide feedback in chat until you're satisfied with the result. Clama also monitors linter/compiler errors (missing imports, syntax errors, etc.) so it can fix issues that come up along the way on his own.

All changes made by Clama are recorded in your file's Timeline, providing an easy way to track and revert modifications if needed.

### Use the Browser

With Claude 3.5 Sonnet's new [Computer Use](https://www.anthropic.com/news/3-5-models-and-computer-use) capability, Clama can launch a browser, click elements, type text, and scroll, capturing screenshots and console logs at each step. This allows for interactive debugging, end-to-end testing, and even general web use! This gives him autonomy to fixing visual bugs and runtime issues without you needing to handhold and copy-pasting error logs yourself.

### "add a tool that..."

Thanks to the [Model Context Protocol](https://github.com/modelcontextprotocol), Clama can extend his capabilities through custom tools. While you can use [community-made servers](https://github.com/modelcontextprotocol/servers), Clama can instead create and install tools tailored to your specific workflow. Just ask Clama to "add a tool" and it will handle everything, from creating a new MCP server to installing it into the extension. These custom tools then become part of Clama's toolkit, ready to use in future tasks.

-   "add a tool that fetches Jira tickets": Retrieve ticket ACs and put Clama to work
-   "add a tool that manages AWS EC2s": Check server metrics and scale instances up or down
-   "add a tool that pulls the latest PagerDuty incidents": Fetch details and ask Clama to fix bugs

### Add Context

**`@url`:** Paste in a URL for the extension to fetch and convert to markdown, useful when you want to give Clama the latest docs

**`@problems`:** Add workspace errors and warnings ('Problems' panel) for Clama to fix

**`@file`:** Adds a file's contents so you don't have to waste API requests approving read file (+ type to search files)

**`@folder`:** Adds folder's files all at once to speed up your workflow even more

### Checkpoints: Compare and Restore

As Clama works through a task, the extension takes a snapshot of your workspace at each step. You can use the 'Compare' button to see a diff between the snapshot and your current workspace, and the 'Restore' button to roll back to that point.

For example, when working with a local web server, you can use 'Restore Workspace Only' to quickly test different versions of your app, then use 'Restore Task and Workspace' when you find the version you want to continue building from. This lets you safely explore different approaches without losing progress.

### Local Development Instructions

1. Clone the repository _(Requires [git-lfs](https://git-lfs.com/))_:

    ```bash
    git clone https://github.com/crantotech/clama.git
    ```

2. Open the project in VSCode:

    ```bash
    code clama
    ```

3. Install the necessary dependencies for the extension and webview-gui:

    ```bash
    npm run install:all
    ```

4. Launch by pressing `F5` (or `Run`->`Start Debugging`) to open a new VSCode window with the extension loaded. (You may need to install the [esbuild problem matchers extension](https://marketplace.visualstudio.com/items?itemName=connor4312.esbuild-problem-matchers) if you run into issues building the project.)

## License

[Apache 2.0 © 2025 Cranto Technology Inc.](./LICENSE)
