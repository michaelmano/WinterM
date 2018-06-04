'use babel';

import { CompositeDisposable } from 'atom';
import Winterm from './components/Winterm';
import WintermView from './views/WintermView';

export default {
    subscriptions: null,
    wintermView: null,
    terminal_location: null,
    config: {
        terminal: {
            type: 'string',
            description: 'Set your default Terminal',
            default: Winterm.setDefaultTerminal(),
        },
    },
    activate(state) {
        this.subscriptions = new CompositeDisposable();
        this.wintermView = new WintermView();
        this.watchConfig();
        this.registerCommands();
    },
    watchConfig() {
        this.terminal_location = atom.config.get('winterm.terminal');

        atom.config.observe('winterm.terminal', newTerminalLocation => {
            this.terminal_location = newTerminalLocation;
        });
    },
    registerCommands() {
        this.subscriptions.add(
            atom.commands.add('atom-workspace', {
                'winterm:isComing': () => {
                    Winterm.openTerminal(this.terminal_location, atom);
                },
            }),
        );
    },
    deactivate() {
        this.subscriptions = this.subscriptions.dispose();
        this.wintermView = this.wintermView.dispose();
    },
    serialize() {
        return {
            wintermViewState: this.wintermView.serialize(),
        };
    },
};
