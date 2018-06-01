'use babel';

import { CompositeDisposable } from 'atom';
import Winterm from './components/Winterm';

export default {
    subscriptions: null,
    config: {
        terminal: {
            type: 'string',
            description: 'Set your default Terminal',
            default: Winterm.setDefaultTerminal(),
        },
    },
    activate() {
        this.subscriptions = new CompositeDisposable();
        this.subscriptions.add(
            atom.commands.add('atom-workspace', {
                'winterm:isComing': () => {
                    Winterm.openTerminal(
                        this.config.terminal.default,
                        '~/', // Get current directory here.
                    );
                    atom.notifications.addInfo('Meow');
                },
            }),
        );
    },
    deactivate() {
        this.subscriptions.dispose();
        this.subscriptions = null;
    },
};
