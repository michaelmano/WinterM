'use babel';

import { CompositeDisposable } from 'atom';
import Winterm from './components/Winterm';
import WintermView from './views/WintermView';

export default {
    subscriptions: null,
    wintermView: null,
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

        this.subscriptions.add(
            atom.commands.add('atom-workspace', {
                'winterm:isComing': () => {
                    Winterm.openTerminal(
                        this.config.terminal.default,
                        atom
                    );
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
