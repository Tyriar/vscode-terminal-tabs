# terminal-tabs

**Warning: This is an early release that is not thoroughly tested and will also only work on the [Insiders build](https://code.visualstudio.com/insiders) of VS Code.**

Adds tabs for each terminal process to the status bar.

![](images/preview.png)

## Limitations

- The terminals can only be tracked when they are created by the terminal API (See [Microsoft/vscode#13267](https://github.com/Microsoft/vscode/issues/13267)). It is currently not possible to intercept creation of the terminal panel on restart for example.
