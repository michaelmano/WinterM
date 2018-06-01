'use babel';

import { platform } from 'os';
import { existsSync } from 'fs';

import Terminal from './Terminal';
import terminal_locations from '../data/terminals.json';

export default class Winterm {
    constructor() {
        this.platform = platform();
        this.terminal_locations = terminal_locations;
    }

    setDefaultTerminal() {
        const existing_terminals = this.terminal_locations[
            this.platform
        ].filter(terminals => {
            return this.terminalExists(terminals.path);
        });

        return existing_terminals.length >= 1
            ? existing_terminals[0].path
            : 'No Terminal Found';
    }

    terminalExists(path) {
        return existsSync(path);
    }

    openTerminal(terminal_path, dir) {
        const terminal = new Terminal(
            this.platform,
            terminal_path,
            this.terminal_locations,
        );

        return terminal.open(dir)
    }
}
