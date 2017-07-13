import {StatusBarTerminal} from './statusBarTerminal';
import * as vscode from 'vscode';

const MAX_TERMINALS = 10;
let _terminalCounter = 0;
let _terminals: StatusBarTerminal[] = [];

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.commands.registerCommand('terminalTabs.createTerminal', () => {
        if (_terminals.length >= MAX_TERMINALS) {
            vscode.window.showInformationMessage(`This extension does not support more than ${MAX_TERMINALS} terminals.`);
            return;
        }
        _terminals.push(new StatusBarTerminal(_terminalCounter++));
    }));

    context.subscriptions.push(vscode.commands.registerCommand('terminalTabs.createNamedTerminal', () => {
        vscode.window.showInputBox({
            placeHolder: 'Enter the name of the new terminal'
        }).then(name => {
            for (let j = 0; j <_terminals.length; j++) {
                _terminals[j].hide();
            }
            
            _terminals.push(new StatusBarTerminal(_terminalCounter++, name));
        });
    }));

    for (let i = 1; i <= MAX_TERMINALS; i++) {
        context.subscriptions.push(vscode.commands.registerCommand(`terminalTabs.showTerminal${i}`, (a) => {
            for (let j = 0; j <_terminals.length; j++) {
                // Toggle or hide terminal
                j === (i - 1) ? _terminals[j].toggle() : _terminals[j].hide();
            }
        }));
    }
    
    context.subscriptions.push(vscode.window.onDidCloseTerminal(onDidCloseTerminal));
}

function onDidCloseTerminal(terminal: vscode.Terminal) {
    _terminalCounter--;
    let terminalIndex: number, end: Boolean = false;
    _terminals.forEach((statusBarTerminal, i) => {
        if (statusBarTerminal.hasTerminal(terminal)) {
            terminalIndex = i; 
        }
    });
    _terminals[terminalIndex].dispose();
    // Push all terminals ahead of it back 1 index
    _terminals.splice(terminalIndex, 1);

    if (terminalIndex === _terminalCounter) {
        end = true;
    }
    
    _terminals.forEach((statusBarTerminal, i) => {
        _terminals[i].setTerminalIndex(i, statusBarTerminal.name);

        // Replicate the native VS Code showing of the next terminal when one is closed
        if (i === (end ? terminalIndex - 1 : terminalIndex)) {
           _terminals[i].show();
        }
    });
}

export function deactivate() {
}
