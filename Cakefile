#
# Build system for Mongoose-Authenticate
# (C) Copyright 2013 Original Machine LLC.
#

fs = require 'fs'
{spawn} = require 'child_process'

task 'build', 'Build ./lib from ./src', ->
	coffee = spawn 'coffee', ['-c', '-o', 'lib', 'src']
	coffee.stderr.on 'data', (data) ->
		process.stderr.write data.toString()
	coffee.stdout.on 'data', (data) ->
		process.stdout.write data.toString()
	coffee.on 'exit', (code) ->
		callback?() if code is 0