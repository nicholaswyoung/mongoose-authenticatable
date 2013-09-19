MOCHA_OPTS = --compilers coffee:coffee-script --require coffee-script
REPORTER = dot

test:
	@NODE_ENV=test ./node_modules/.bin/mocha --reporter $(REPORTER) $(MOCHA_OPTS)

.PHONY: test