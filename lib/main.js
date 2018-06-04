'use babel'

import { CompositeDisposable } from 'atom'
import Winterm from './components/Winterm'
import WintermView from './views/WintermView'

module.exports = {
  subscriptions: null,
  wintermView: null,
  terminal_location: null,
  config: {
    Terminal: {
      type: 'string',
      description: 'Set your default Terminal by entering in the full path.',
      default: Winterm.setDefaultTerminal()
    }
  },
  activate (state) {
    this.subscriptions = new CompositeDisposable()
    this.wintermView = new WintermView()
    this.terminal_location = atom.config.get('winterm.Terminal')

    this.watchConfig()
    this.registerCommands()
  },
  watchConfig () {
    atom.config.observe('winterm.Terminal', newValue => {
      this.terminal_location = newValue
    })
  },
  registerCommands () {
    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'winterm:isComing': () => {
          Winterm.openTerminal(this.terminal_location, atom)
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
