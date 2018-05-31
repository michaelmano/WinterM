const os = require('os');
const path = require('path');
const fs = require('fs');

// const getRootDir = () => path.parse(process.cwd()).root

class Winterm {
    constructor() {
        this.platform = os.platform();
        this.config = {
            terminal: {
                type: 'string',
                description: 'Set your default terminal',
                default: this.defaultTerminal(),
            },
        };
    }

    terminalExists(path) {
        return fs.existsSync(path);
    }

    defaultTerminal() {
        switch(this.platform) {
            case('win32'):
            break;
            case('darwin'):
                return this.darwinTerminals()
            break;
            default:
            break;
        }
    }

    darwinTerminals() {
        let locations = [
            '/Applications/Utilities/Terminal.app',
        ];

        const existing_terminals = locations.filter(location => {
            return this.terminalExists(location);
        });

        return existing_terminals.length >=1 ? existing_terminals[0] : 'No Terminal Found';
    }
}

let test = new Winterm();
console.log(test.config)
