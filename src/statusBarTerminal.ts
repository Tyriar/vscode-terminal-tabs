import * as vscode from 'vscode';

export class StatusBarTerminal {
    private _item: vscode.StatusBarItem;
    private _terminal: vscode.Terminal;

    constructor(terminalIndex: number, name?: string) {
        this._item = vscode.window.createStatusBarItem();
        this.setTerminalIndex(terminalIndex);
        this._item.show();

        this._terminal = vscode.window.createTerminal(name);
        this._terminal.show();
    }

    public show() {
        this._terminal.show();
    }

    public setTerminalIndex(i: number) {
        this._item.text = `$(terminal)${i + 1}`;
        this._item.command = `extension.showTerminal${i + 1}`;
    }

    public hasTerminal(terminal: vscode.Terminal) {
        return this._terminal === terminal;
    }

    public dispose() {
        this._item.dispose();
        this._terminal.dispose();
    }
}