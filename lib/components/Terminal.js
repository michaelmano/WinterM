'use babel'

import { exec } from 'child_process'

export default class Terminal {
  constructor (startCommand, terminalPath, optionalParameters) {
    this.command = [startCommand, terminalPath, optionalParameters].join(' ')
  }

  open (dir) {
    return exec(`${this.command} ${dir}`)
  }
}
