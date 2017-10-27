import { StatusBarTerminal } from './statusBarTerminal';
import { ExtensionContext, commands, window, Terminal } from 'vscode';

const MAX_TERMINALS = 10;
let _terminalCounter = 0;
let _terminals: StatusBarTerminal[] = [];

export function activate(context: ExtensionContext) {
    context.subscriptions.push(commands.registerCommand('terminalTabs.createTerminal', () => {
        if (_terminals.length >= MAX_TERMINALS) {
            window.showInformationMessage(`This extension does not support more than ${MAX_TERMINALS} terminals.`);
            return;
        }
        _terminals.push(new StatusBarTerminal(_terminalCounter++));
    }));

    context.subscriptions.push(commands.registerCommand('terminalTabs.createNamedTerminal', () => {
        window.showInputBox({
            placeHolder: 'Enter the name of the new terminal'
        }).then(name => {
            _terminals.forEach((terminal) => {
                terminal.hide();
            });
            
            _terminals.push(new StatusBarTerminal(_terminalCounter++, name));
        });
    }));

    for (let i = 1; i <= MAX_TERMINALS; i++) {
        context.subscriptions.push(commands.registerCommand(`terminalTabs.showTerminal${i}`, (a) => {
            _terminals.forEach((terminal, index) => {
                index === (i - 1) ? terminal.toggle() : terminal.markHidden();
            });
        }));
    }
    
    context.subscriptions.push(window.onDidCloseTerminal(onDidCloseTerminal));
}

function onDidCloseTerminal(terminal: Terminal) {
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
