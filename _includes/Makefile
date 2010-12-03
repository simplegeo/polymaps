JS_COMPILER = \
	java -jar compiler.jar \
	--charset UTF-8

FILES = \
	../colorbrewer.css \
	../modernizr.min.js \
	../nns.min.js \
	../polymaps.min.js \
	../protodata.min.js \
	../screen.css \
	../ex/crimespotting.js \
	bing.min.js \
	blue-marble.min.js \
	cluster.min.js \
	flickr.min.js \
	fullscreen.min.js \
	grid.min.js \
	mandelbrot.min.js \
	midnight-commander.min.js \
	overlay.min.js \
	pale-dawn.min.js \
	population.min.js \
	shadow.min.js \
	statehood.min.js \
	streets.min.js \
	tiles.min.js \
	transform.min.js \
	unemployment.min.js \
	world.min.js

all: $(FILES)
.PHONY: $(FILES:.min.js=.js)
.INTERMEDIATE: compiler.jar

%.min.js: %.js compiler.jar
	$(JS_COMPILER) < $< > $@

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

../colorbrewer.css:
	git cat-file blob master:lib/colorbrewer/colorbrewer.css > $@

../modernizr.min.js:
	git cat-file blob master:lib/modernizr/modernizr.min.js > $@

../nns.min.js:
	git cat-file blob master:lib/nns/nns.min.js > $@

../polymaps.min.js:
	git cat-file blob master:polymaps.min.js > $@

../protodata.min.js:
	git cat-file blob master:lib/protovis/protodata.min.js > $@

../screen.css:
	git cat-file blob master:lib/blueprint/screen.css > $@

../ex/crimespotting.js:
	git cat-file blob master:lib/crimespotting/crimespotting.js > $@
