WinterMView             = require('./winterm-view')
exec                    = require('child_process').exec
os                      = require('os')
path                    = require('path')
{ CompositeDisposable } = require('atom')

module.exports = WinterM =
  config:
    Terminal:
      type: 'string'
      description: 'Choose a type of output Terminal. (use double backslash for windows and single forward for unix)'
      'default': 'C:\\Windows\\System32\\cmd.exe'

  subscriptions: null

  activate: ->
    atom.commands.add 'atom-workspace', 'winterm:isComing': => @isComing()

  isComing: ->
    activePane = atom.workspace.getActivePaneItem()
    Terminal     = 'C:\\Windows\\System32\\cmd.exe'
    atom.config.observe 'winterm.Terminal', (newTerminal) ->
      Terminal   = newTerminal



    if activePane? && activePane.buffer? && activePane.buffer.file? && activePane.buffer.file.path?
      cmdPath  = path.dirname(atom.workspace.getActivePaneItem().buffer.file.path);
    else if atom.project.getPaths()[0]?
      cmdPath   = atom.project.getPaths()[0]
    else
      cmdPath = os.homedir()

    if os.platform() == 'darwin'
      cmd = 'open -a Terminal ' + cmdPath
    if os.platform() == 'win32'
      if path.basename(Terminal) == 'Cmder.exe'
        cmd     = 'start ' + Terminal + ' /START ' + cmdPath
      else
        cmd     = 'start ' + Terminal + ' "%V" /k cd /d ' + cmdPath

    return exec cmd
