'use babel'

import { CompositeDisposable } from 'atom'
import Winterm from './components/Winterm'
import WintermView from './views/WintermView'

module.exports = {
  subscriptions: null,
  wintermView: null,
  path: null,
  start_command: null,
  patameters: null,
  config: {
    patameters: {
      type: 'string',
      description:
        'Any additional parameters your terminal requires to start (normally blank for unix)',
      default: Winterm.default.parameters ? Winterm.default.parameters : ''
    },
    start_command: {
      type: 'string',
      description: 'The required command to start your terminal',
      default: Winterm.default.start_command
        ? Winterm.default.start_command
        : 'open -a or start'
    },
    path: {
      type: 'string',
      description: 'Set your default Terminal by entering in the full path.',
      default: Winterm.default.path
        ? Winterm.default.path
        : 'Full Terminal path or alias'
    }
  },
  activate (state) {
    this.subscriptions = new CompositeDisposable()
    this.wintermView = new WintermView()
    this.path = atom.config.get('winterm.path')

    this.watchConfig()
    this.registerCommands()
  },
  watchConfig () {
    atom.config.observe('winterm.patameters', newValue => {
      this.patameters = newValue
    })
    atom.config.observe('winterm.start_command', newValue => {
      this.start_command = newValue
    })
    atom.config.observe('winterm.path', newValue => {
      this.path = newValue
    })
  },
  registerCommands () {
    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'winterm:isComing': () => {
          Winterm.openTerminal(this.start_command, this.path, this.patameters)
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
