WinterMView             = require('./winterm-view')
exec                    = require('child_process').exec
platform                = require('os').platform
path                    = require('path')
{ CompositeDisposable } = require('atom')

module.exports = WinterM =
  config:
    Terminal:
      type: 'string'
      description: 'Choose a type of output Terminal.'
      'default': 'C:\\Windows\\System32\\cmd.exe'

  subscriptions: null

  activate: ->
    atom.commands.add 'atom-workspace', 'winterm:isComing': => @isComing()

  isComing: ->
    Terminal     = 'C:\\Windows\\System32\\cmd.exe'
    atom.config.observe 'winterm.Terminal', (newTerminal) ->
      Terminal   = newTerminal

    if atom.workspace.getActivePaneItem()?
      editor     = atom.workspace.getActivePaneItem()
      if editor.buffer.file?
        file     = editor.buffer.file
        cmdPath  = path.dirname(editor.buffer.file.path);
    else
      cmdPath   = atom.project.getPaths()[0]

    if platform() == 'darwin'
      cmd = 'open -a Terminal ' + cmdPath
    if platform() == 'win32'
      if path.basename(Terminal) == 'Cmder.exe'
        cmd     = 'start ' + Terminal + ' /START ' + cmdPath
      else
        cmd     = 'start ' + Terminal + ' "%V" /k cd /d ' + cmdPath

    return exec cmd
