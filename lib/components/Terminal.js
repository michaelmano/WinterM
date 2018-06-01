'use babel';

import { exec } from 'child_process';

export default class Terminal {
    constructor(platform, terminal, list) {
        this.platform = platform;
        this.list = list;
        this.terminal = terminal;
        this.command = this.setTerminalCommand();
    }

    setTerminalCommand() {
        return Object.values(
            this.list[this.platform].find(terminals => {
                return this.terminal == terminals.path;
            }),
        ).join(' ');
    }

    open(dir) {
        return exec(`${this.command} ${dir}`);
    }
}
