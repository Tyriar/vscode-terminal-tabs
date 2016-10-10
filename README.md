# terminal-tabs

**Warning: This is an early release that is not thoroughly tested.**

Adds tabs for each terminal process to the status bar.

This extension provides the following commands:

- `terminalTabs.createTerminal`: Creates a terminal with an icon
- `terminalTabs.createNamedTerminal`: Creates a terminal with an icon that has a name (indicated in the dropdown)

![Terminal tabs preview](images/preview.png)

## Limitations

- The terminals can only be tracked when they are created by the terminal API (See [Microsoft/vscode#13267](https://github.com/Microsoft/vscode/issues/13267)). It is currently not possible to intercept creation of the terminal panel on restart for example.
