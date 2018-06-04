'use babel'

import { CompositeDisposable } from 'atom'
import Winterm from './components/Winterm'
import WintermView from './views/WintermView'
const CONFIG = Winterm.setDefaultTerminal()

module.exports = {
  subscriptions: null,
  wintermView: null,
  terminal_path: null,
  start_command: null,
  optional_parameters: null,
  config: {
    optional_parameters: {
      type: 'string',
      description: 'Any additional parameters your terminal requires to start',
      default: CONFIG.optional_parameters
    },
    start_command: {
      type: 'string',
      description: 'The required command to start your terminal',
      default: CONFIG.start_command
    },
    terminal_path: {
      type: 'string',
      description: 'Set your default Terminal by entering in the full path.',
      default: CONFIG.terminal_path
    }
  },
  activate (state) {
    this.subscriptions = new CompositeDisposable()
    this.wintermView = new WintermView()
    this.terminal_path = atom.config.get('winterm.terminal_path')

    this.watchConfig()
    this.registerCommands()
  },
  watchConfig () {
    atom.config.observe('winterm.terminal_path', newValue => {
      this.terminal_path = newValue
    })
    atom.config.observe('winterm.start_command', newValue => {
      this.start_command = newValue
    })
    atom.config.observe('winterm.optional_parameters', newValue => {
      this.optional_parameters = newValue
    })
  },
  registerCommands () {
    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'winterm:isComing': () => {
          Winterm.openTerminal(
            this.start_command,
            this.terminal_path,
            this.optional_parameters
          )
        }
      })
    )
  },
  deactivate () {
    this.subscriptions = this.subscriptions.dispose()
    this.wintermView = this.wintermView.dispose()
  },
  serialize () {
    return {
      wintermViewState: this.wintermView.serialize()
    }
  }
}
