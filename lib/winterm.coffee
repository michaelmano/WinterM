WinterMView             = require('./winterm-view')
exec                    = require('child_process').exec
platform                = require('os').platform
{ CompositeDisposable } = require('atom')

module.exports = WinterM =
  config:
    Terminal:
      type: 'string'
      description: 'Choose a type of output Terminal.'
      'default': 'C:\\Windows\\System32\\cmd.exe'

  pxToEmView: null
  modalPanel: null
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
        rmFmPath = file.path.substring(file.path.lastIndexOf('\\') + 1)
        cmdPath  = file.path.replace(rmFmPath,'')
    else
      project   = atom.project.getPaths()
      cmdPath   = project[0]

    if platform() == 'darwin'
      cmd = 'open -a ' + cmdPath
    if platform() == 'win32'
      terminalType = Terminal.substring(Terminal.lastIndexOf('\\') + 1)
      if terminalType == 'Cmder.exe'
        cmd     = 'start ' + Terminal + ' /START ' + cmdPath
      else
        cmd     = 'start ' + Terminal + ' "%V" /k cd /d ' + cmdPath
    exec cmd
