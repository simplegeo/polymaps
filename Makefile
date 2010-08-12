JS_FILES = \
	src/start.js \
	src/Id.js \
	src/Svg.js \
	src/Transform.js \
	src/Cache.js \
	src/Url.js \
	src/Dispatch.js \
	src/Queue.js \
	src/Map.js \
	src/Layer.js \
	src/Image.js \
	src/GeoJson.js \
	src/Dblclick.js \
	src/Drag.js \
	src/Wheel.js \
	src/Arrow.js \
	src/Hash.js \
	src/Interact.js \
	src/Compass.js \
	src/Grid.js \
	src/end.js

JS_COMPILER = \
	java -jar lib/google-compiler/compiler-20100616.jar \
	--charset UTF-8

WWW_FILES = \
	polymaps.min.js \
	lib/nns/nns.min.js \
	lib/blueprint/screen.css \
	www/index.html \
	www/logo-big.js \
	www/logo-small.js \
	www/style.css

WWW_EX_FILES = \
  www/ex/bing-sm.png \
  www/ex/bluemarble-sm.png \
  www/ex/cluster-sm.png \
  www/ex/features-sm.png \
  www/ex/flickr-sm.png \
  www/ex/grid-sm.png \
  www/ex/midnightcommander-sm.png \
  www/ex/overlay-sm.png \
  www/ex/paledawn-sm.png \
  www/ex/population-sm.png \
  www/ex/shadow-sm.png \
  www/ex/statehood-sm.png \
  www/ex/streets-sm.png \
  www/ex/tiles-sm.png \
  www/ex/transform-sm.png \
  www/ex/unemployment-sm.png

all: polymaps.min.js polymaps.js

polymaps.min.js: polymaps.js
	rm -f $@
	echo "// $(shell git rev-parse --short HEAD)" >> $@
	$(JS_COMPILER) < polymaps.js >> $@

polymaps.js: $(JS_FILES) Makefile
	rm -f $@
	echo "// $(shell git rev-parse HEAD)" >> $@
	cat $(JS_FILES) >> $@
	chmod a-w $@

html: $(WWW_FILES) Makefile
	rm -rf $@
	mkdir $@ $@/ex
	cp $(WWW_FILES) $@
	cp $(WWW_EX_FILES) $@/ex

clean:
	rm -rf polymaps.js polymaps.min.js html
