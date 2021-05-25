# terminal-tabs

⚠️ This extension is deprecated because terminal tabs are now built into VS Code! Enable them using with the `terminal.integrated.tabs.enabled` setting.

---

Adds tabs for each terminal process to the status bar. It works by registering clickable status bar buttons when terminals are created via the commands below.

![Terminal tabs preview](images/preview.png)

If you want tabs to be built in to the core of VS Code, be sure to upvote [this issue](https://github.com/Microsoft/vscode/issues/10546).

This extension provides the following commands that can be keybound in your [keybindings.json](https://code.visualstudio.com/docs/customization/keybindings#_customizing-shortcuts) file:

- `terminalTabs.createTerminal`: Creates a terminal with an icon
- `terminalTabs.createNamedTerminal`: Creates a terminal with an icon that has a name (indicated in the dropdown)
- `terminalTabs.showTerminal1`: Shows the first terminal
- `terminalTabs.showTerminal2`: Shows the second terminal
- `terminalTabs.showTerminal3`: Shows the third terminal
- `terminalTabs.showTerminal4`: Shows the fourth terminal
- `terminalTabs.showTerminal5`: Shows the fifth terminal
- `terminalTabs.showTerminal6`: Shows the sixth terminal
- `terminalTabs.showTerminal7`: Shows the seventh terminal
- `terminalTabs.showTerminal8`: Shows the eighth terminal
- `terminalTabs.showTerminal9`: Shows the ninth terminal
- `terminalTabs.showTerminal10`: Shows the tenth terminal

__Note__: some common user-preferred shortcuts - eg, <kbd>Ctrl</kbd>/<kbd>Cmd</kbd>+<kbd>T</kbd> - are normally sent to terminal itself, rather than to the outside environment (where things like opening new terminal tabs are done). In order for that short cut to be used, open *File*, *Preferences*, and add the following to your user settings (on the right):

```json
"terminal.integrated.commandsToSkipShell": [
  "terminalTabs.createTerminal"
]
```

## Limitations

- The terminals can only be tracked when they are created by the terminal API (See [Microsoft/vscode#13267](https://github.com/Microsoft/vscode/issues/13267)). It is currently not possible to intercept creation of the terminal panel on restart for example.
