'use babel';

import { platform, homedir } from 'os';
import { existsSync } from 'fs';
import { dirname } from 'path';
import Terminal from './Terminal';
import terminal_locations from '../data/terminals.json';

export default {
    platform: platform(),
    terminal_locations,
    setDefaultTerminal() {
        const existing_terminals = this.terminal_locations[
            this.platform
        ].filter(terminals => {
            return this.terminalExists(terminals.path);
        });

        return existing_terminals.length >= 1
            ? existing_terminals[0].path
            : 'No Terminal Found';
    },

    terminalExists(path) {
        return existsSync(path);
    },

    openTerminal(terminal_path) {
        this.getCurrentPath().then(dir => {
            atom.notifications.addInfo(`WinterM opened a terminal - ${dir}`);
            return new Terminal(
                this.platform,
                terminal_path,
                this.terminal_locations,
            ).open(dir);
        });
    },

    getCurrentPath() {
        const ACTIVE_PANE = atom.workspace.getActivePaneItem();
        const PROJECT_PATH = atom.project.getPaths();

        return new Promise((resolve, reject) => {
            if (
                ACTIVE_PANE &&
                ACTIVE_PANE.buffer &&
                ACTIVE_PANE.buffer.file &&
                ACTIVE_PANE.buffer.file.path
            ) {
                return resolve(dirname(ACTIVE_PANE.buffer.file.path));
            }

            if (PROJECT_PATH.length >= 1) {
                return resolve(PROJECT_PATH[0]);
            }

            if (homedir) {
                return resolve(homedir());
            } else {
                return reject('No directory found');
            }
        });
    },
};
