'use babel'

import { exec } from 'child_process'

export default class Terminal {
  constructor (platform, terminal, list) {
    this.platform = platform
    this.list = list
    this.terminal = terminal
    this.command = this.setTerminalCommand()
  }

  setTerminalCommand () {
    return [
      this.list[this.platform].prefix,
      this.terminal,
      this.list[this.platform].affix
    ].join(' ')
  }

  open (dir) {
    return exec(`${this.command} ${dir}`)
  }
}
