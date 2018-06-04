'use babel'

import { platform, homedir } from 'os'
import { existsSync } from 'fs'
import { dirname } from 'path'
import Terminal from './Terminal'
import terminalLocations from '../data/terminals.json'

export default {
  platform: platform(),
  terminalLocations,
  setDefaultTerminal () {
    const existingTerminals = this.terminalLocations[this.platform].filter(
      terminal => {
        return this.terminalExists(terminal.terminal_path)
      }
    )

    return existingTerminals.length >= 1
      ? existingTerminals[0]
      : 'No Terminal Found'
  },

  terminalExists (path) {
    return existsSync(path)
  },

  openTerminal (startCommand, terminalPath, optionalParameters) {
    this.getCurrentPath().then(dir => {
      atom.notifications.addInfo(`WinterM opened a terminal - ${dir}`)
      return new Terminal(
        startCommand,
        terminalPath,
        optionalParameters
      ).open(dir)
    })
  },

  getCurrentPath () {
    const ACTIVE_PANE = atom.workspace.getActivePaneItem()
    const PROJECT_PATH = atom.project.getPaths()

    return new Promise((resolve, reject) => {
      if (
        ACTIVE_PANE &&
        ACTIVE_PANE.buffer &&
        ACTIVE_PANE.buffer.file &&
        ACTIVE_PANE.buffer.file.path
      ) {
        return resolve(dirname(ACTIVE_PANE.buffer.file.path))
      }

      if (PROJECT_PATH.length >= 1) {
        return resolve(PROJECT_PATH[0])
      }

      if (homedir) {
        return resolve(homedir())
      } else {
        return reject('No directory found')
      }
    })
  }
}
