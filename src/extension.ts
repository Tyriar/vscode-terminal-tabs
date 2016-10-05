import {StatusBarTerminal} from './statusBarTerminal';
import * as vscode from 'vscode';

let _terminalCounter = 0;
let _terminals: StatusBarTerminal[] = [];

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.commands.registerCommand('extension.createTerminal', () => {
        _terminals.push(new StatusBarTerminal(_terminalCounter++));
    }));

    context.subscriptions.push(vscode.commands.registerCommand('extension.createNamedTerminal', () => {
        vscode.window.showInputBox({
            placeHolder: 'Enter the name of the new terminal'
        }).then(name => {
            _terminals.push(new StatusBarTerminal(_terminalCounter++, name));
        });
    }));

    for (let i = 1; i <= 3; i++) {
        context.subscriptions.push(vscode.commands.registerCommand(`extension.showTerminal${i}`, (a) => {
            _terminals[i - 1].show();
        }));
    }
    
    context.subscriptions.push(vscode.window.onDidCloseTerminal(onDidCloseTerminal));
}

function onDidCloseTerminal(terminal: vscode.Terminal) {
    console.log('Closed terminal', terminal);
    let terminalIndex: number;
    _terminals.forEach((statusBarTerminal, i) => {
        if (statusBarTerminal.hasTerminal(terminal)) {
            terminalIndex = i; 
        }
    });
    _terminals[terminalIndex].dispose();
    // Push all terminals ahead of it back 1 index
    _terminals.splice(terminalIndex, 1);
    for (let i = terminalIndex; i < _terminals.length; i++) {
        _terminals[terminalIndex].setTerminalIndex(terminalIndex);
    }
    _terminalCounter--;
}

export function deactivate() {
}