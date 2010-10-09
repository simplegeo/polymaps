JS_COMPILER = \
	java -jar compiler.jar \
	--charset UTF-8

JS_FILES = \
	bing.js \
	blue-marble.js \
	cluster.js \
	flickr.js \
	fullscreen.js \
	grid.js \
	mandelbrot.js \
	midnight-commander.js \
	overlay.js \
	pale-dawn.js \
	population.js \
	shadow.js \
	statehood.js \
	streets.js \
	tiles.js \
	transform.js \
	unemployment.js \
	world.js

all: $(JS_FILES:.js=.min.js)
$(JS_FILES) compiler.jar: ../.git/refs/heads/master Makefile
$(JS_FILES): compiler.jar
.INTERMEDIATE: compiler.jar

clean:
	rm -f *.min.js

%.min.js: %.js
	$(JS_COMPILER) < $^ > $@

compiler.jar:
	git cat-file blob master:lib/google-compiler/compiler-20100616.jar > $@

bing.js:
	git cat-file blob master:examples/bing/map.js > $@

blue-marble.js:
	git cat-file blob master:examples/nasa/blue-marble.js > $@

cluster.js:
	git cat-file blob master:examples/cluster/cluster.js > $@

flickr.js:
	git cat-file blob master:examples/tilestache/flickr.js > $@

grid.js:
	git cat-file blob master:examples/grid/grid.js > $@

mandelbrot.js:
	git cat-file blob master:examples/canvas/mandelbrot.js > $@

midnight-commander.js:
	git cat-file blob master:examples/cloudmade/midnight-commander.js > $@

overlay.js:
	git cat-file blob master:examples/overlay/overlay.js > $@

pale-dawn.js:
	git cat-file blob master:examples/cloudmade/pale-dawn.js > $@

population.js:
	git cat-file blob master:examples/population/population.js > $@

shadow.js:
	git cat-file blob master:examples/shadow/shadow.js > $@

statehood.js:
	git cat-file blob master:examples/statehood/statehood.js > $@

streets.js:
	git cat-file blob master:examples/streets/streets.js > $@

tiles.js:
	git cat-file blob master:examples/grid/tiles.js > $@

transform.js:
	git cat-file blob master:examples/transform/transform.js > $@

unemployment.js:
	git cat-file blob master:examples/unemployment/unemployment.js > $@

world.js:
	git cat-file blob master:examples/world/world.js > $@
