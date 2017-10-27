import { StatusBarItem, WorkspaceConfiguration, Terminal, window, workspace } from 'vscode';

export class StatusBarTerminal {
    private _config: WorkspaceConfiguration;
    private _item: StatusBarItem;
    private _showing: boolean = false;
    public _terminal: Terminal;

    constructor(terminalIndex: number, name?: string) {
        this._config = workspace.getConfiguration('terminalTabs');
        this._item = window.createStatusBarItem();
        this.setTerminalIndex(terminalIndex, name);
        this._item.show();

        this._terminal = window.createTerminal(name);
        this.show();
    }

    get name() {
        return this._terminal.name;
    }

    public show() {
        this._showing = true;
        this._item.color = this._config.get('activeTabColor');
        this._terminal.show();
    }

    public hide() {
        this.markHidden();
        this._terminal.hide();
    }

    public markHidden() {
        this._showing = false;
        this._item.color = undefined;
    }

    public toggle() {
        this._showing ? this.hide() : this.show();
    }

    public setTerminalIndex(i: number, name?: string) {
        this._item.text = `$(terminal) ${name ? name : (i + 1)}`;
        this._item.command = `terminalTabs.showTerminal${i + 1}`; 
    }

    public hasTerminal(terminal: Terminal) {
        return this._terminal === terminal;
    }

    public dispose() {
        this._item.dispose();
        this._terminal.dispose();
    }
}
