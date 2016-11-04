# WinterM

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Node.js Version][node-version-image]][node-version-url]
[![Linux Build][travis-image]][travis-url]
[![Windows Build][appveyor-image]][appveyor-url]
[![Test Coverage][coveralls-image]][coveralls-url]

## Table of Contents

- [Introduction](#introduction)
- [Install](#install)
- [Todo](#todo)


## Introduction

What is WinterM?
- WinterM is a package for Atom [![Atom Version][atom-image]][atom-url]
What does WinterM do?
- WinterM opens a terminal of your choice in the current directory of the file you are editing or if a file is not open it will open the terminal in the first project folder in your sidebar.
Why did you make this if there are built in terminals for Atom?
- Those terminals do not work on most Windows 10 systems and I was sick of having to cd into the project directory.

**Currently only tested on windows, See Todo for future plans**


## Install

```sh
$ apm install winterm
```

## Todo

* make available for other operating systems.

[atom-image]: https://github.com/atom/atom/raw/master/resources/app-icons/stable/png/16.png
[atom-url]: https://github.com/atom/atom
[npm-image]: https://img.shields.io/npm/v/winterm.svg
[npm-url]: https://npmjs.org/package/winterm
[node-version-image]: https://img.shields.io/node/v/winterm.svg
[node-version-url]: https://nodejs.org/en/download/
[travis-image]: https://img.shields.io/travis/michaelmano/node-winterm/master.svg?label=linux
[travis-url]: https://travis-ci.org/michaelmano/node-winterm
[appveyor-image]: https://img.shields.io/appveyor/ci/dougwilson/node-winterm/master.svg?label=windows
[appveyor-url]: https://ci.appveyor.com/project/dougwilson/node-winterm
[coveralls-image]: https://img.shields.io/coveralls/michaelmano/node-winterm/master.svg
[coveralls-url]: https://coveralls.io/r/michaelmano/node-winterm?branch=master
[downloads-image]: https://img.shields.io/npm/dm/winterm.svg
[downloads-url]: https://npmjs.org/package/winterm
