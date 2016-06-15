#!/usr/bin/env node
var fs = require('fs')
var args = require('minimist')(process.argv.slice(2))
var Parser = require('i18next-scanner').Parser
var converter = require('i18next-conv-inline')
var glob = require('glob')
var debug = require('debug')('i18next-extract-gettext')

var parserOptions = {
  // Include react helpers into parsing
  attr: {
    list: ['data-i18n', 'i18nKey']
  },
  func: {
    list: ['i18next.t', 'i18n.t', 't']
  },
  // Make sure common separators don't break the string
  keySeparator: '°°°°°°.°°°°°°',
  nsSeparator: '°°°°°°:°°°°°°',
  pluralSeparator: '°°°°°°_°°°°°°',
  contextSeparator: '°°°°°°_°°°°°°',
  // Interpolate correctly
  interpolation: {
    prefix: '{{',
    suffix: '}}'
  }
}

var parser = new Parser(parserOptions)

var fileGlob = args.files
var outputFile = args.output

if (!fileGlob || !outputFile) {
  console.log('Missing "files" glob or "output" file')
  process.exit(1)
}

debug('Reading in files for glob: ' + fileGlob)
glob(fileGlob, function (err, files) {
  if (err) {
    console.log(err)
    process.exit(1)
  }

  debug('Loading content of ' + files.length + ' files')
  var content = ''
  files.map(function (file) {
    content += fs.readFileSync(file, 'utf-8')
  })

  debug('Parsing translation keys out of content')
  parser.parseFuncFromString(content, parserOptions)
  parser.parseAttrFromString(content, parserOptions)
  var json = parser.get().en.translation

  debug('Converting ' + Object.keys(json).length + ' translation keys into gettext')
  converter.i18nextToGettext('en', json, {quiet: true}, function (err, data) {
    if (err) {
      console.log(err)
      process.exit(1)
    }

    debug('Writing into output file')
    fs.writeFileSync(outputFile, data, 'utf-8')
  })
})
