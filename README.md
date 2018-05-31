# WinterM

## Table of Contents

* [Introduction](#introduction)
* [Install](#install)
* [Todo](#todo)

## Introduction

### Description

WinterM is a package for Atom [![Atom Version][atom-image]][atom-url].

You can trigger WinterM with any of the below shortcuts:
[keymaps/winterm.cson](keymaps/winterm.cson)

```cson
'atom-workspace':
    'cmd-shift-t': 'winterm:isComing'

'.platform-win32 atom-workspace':
    'ctrl-shift-t': 'winterm:isComing'
```

You can also use the atom command palette `cmd-shift-p` (macOS) or `ctrl-shift-p` (Linux/Windows) and it will open
a terminal of your choice in the current directory of the file you are editing or if a file
is not open it will open the terminal in the first project folder in your sidebar.

### Why did you make this if there are built in terminals for Atom?

Those terminals do not work on most Windows 10 systems and I was sick of having to cd into the project directory.

## Install

```sh
apm install winterm
```

## Todo

* Nothing.

[atom-image]: https://github.com/atom/atom/raw/master/resources/app-icons/stable/png/16.png
[atom-url]: https://github.com/atom/atom
