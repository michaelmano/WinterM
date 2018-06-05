'use babel'

import { platform, homedir } from 'os'
import { existsSync } from 'fs'
import { dirname } from 'path'
import { exec } from 'child_process'
import terminalLocations from '../data/terminals.json'

export default {
  default: terminalLocations[platform()].filter(terminal => {
    return existsSync(terminal.path)
  })[0],

  openTerminal (start, path, parameters) {
    if (path === 'Full Terminal path or alias') {
      return atom.notifications.addInfo(`Please set a Terminal path`)
    }
    this.getCurrentPath().then(dir => {
      atom.notifications.addInfo(`WinterM opened a terminal - ${dir}`)
      return exec(`${start} ${path} ${parameters} ${dir}`)
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
