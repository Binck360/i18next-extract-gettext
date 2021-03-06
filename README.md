# i18next-extract-gettext

[![No Maintenance Intended](https://img.shields.io/badge/No%20Maintenance%20Intended-%E2%9C%95-red.svg?style=flat-square)](http://unmaintained.tech/)

> A CLI tool for extracting a gettext POT file from multiple JS source files using [i18next](http://i18next.com/), including [react-i18next](https://github.com/i18next/react-i18next)

## Install

```bash
npm install i18next-extract-gettext
```

## Usage

```bash
# Go through all the files specified, extract all translation keys 
# (including from the react helper) and put them in the templates file
i18next-extract-gettext --files='./src/**/*.+(js|json)' --output=templates.pot
```

## Example

**Input (JS)**

```js
// ...
t('Hello World')
// ...
```

**Output (POT)**

```
msgid "Hello World"
msgstr ""
```
