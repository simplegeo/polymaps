JS_FILES = \
	src/start.js \
	src/ns.js \
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
	src/Stylist.js \
	src/end.js

JS_COMPILER = \
	java -jar lib/google-compiler/compiler-20100616.jar \
	--charset UTF-8

WWW_FILES = \
	polymaps.min.js \
	lib/nns/nns.min.js \
	lib/blueprint/screen.css \
	lib/modernizr/modernizr.min.js \
	lib/colorbrewer/colorbrewer.css \
	lib/protovis/protodata.min.js \
	www/.htaccess \
	www/index.html \
	www/download.html \
	www/forkme.png \
	www/git-16x16.png \
	www/zip-16x16.png \
	www/zip-128x128.png \
	www/logo-big.js \
	www/logo-big.png \
	www/logo-small.js \
	www/logo-small.png \
	www/style.css

WWW_EX_FILES = \
	examples/canvas/procedural.js \
	examples/canvas/mandelbrot-worker.js \
	examples/cluster/kmeans.js \
	examples/overlay/sf1906.png \
	examples/population/population.css \
	examples/statehood/fips.js \
	examples/streets/streets.json \
	examples/tilestache/dot.gif \
	examples/transform/nypl.js \
	examples/unemployment/unemployment-data.js \
	examples/world/internet.tsv \
	examples/world/population.tsv \
	examples/world/tsv.js \
	examples/world/world.json \
	www/ex/index.html \
	www/ex/bing.html \
	www/ex/bing-s.png \
	www/ex/bing-m.png \
	www/ex/blue-marble.html \
	www/ex/blue-marble-s.png \
	www/ex/blue-marble-m.png \
	www/ex/cluster.html \
	www/ex/cluster-s.png \
	www/ex/cluster-m.png \
	www/ex/flickr.html \
	www/ex/flickr-s.png \
	www/ex/flickr-m.png \
	www/ex/grid.html \
	www/ex/grid-s.png \
	www/ex/grid-m.png \
	www/ex/mandelbrot.html \
	www/ex/mandelbrot-m.png \
	www/ex/midnight-commander.html \
	www/ex/midnight-commander-s.png \
	www/ex/midnight-commander-m.png \
	www/ex/overlay.html \
	www/ex/overlay-s.png \
	www/ex/overlay-m.png \
	www/ex/pale-dawn.html \
	www/ex/pale-dawn-s.png \
	www/ex/pale-dawn-m.png \
	www/ex/population.html \
	www/ex/population-s.png \
	www/ex/population-m.png \
	www/ex/shadow.html \
	www/ex/shadow-s.png \
	www/ex/shadow-m.png \
	www/ex/statehood.html \
	www/ex/statehood-s.png \
	www/ex/statehood-m.png \
	www/ex/streets.html \
	www/ex/streets-s.png \
	www/ex/streets-m.png \
	www/ex/tiles.html \
	www/ex/tiles-s.png \
	www/ex/tiles-m.png \
	www/ex/transform.html \
	www/ex/transform-s.png \
	www/ex/transform-m.png \
	www/ex/unemployment.html \
	www/ex/unemployment-s.png \
	www/ex/unemployment-m.png \
	www/ex/world.html \
	www/ex/world-s.png \
	www/ex/world-m.png

WWW_DOCS_FILES = \
	www/docs/arrow.html \
	www/docs/cache.html \
	www/docs/compass.html \
	www/docs/dblclick.html \
	www/docs/dispatch.html \
	www/docs/drag.html \
	www/docs/geoJson.html \
	www/docs/hash.html \
	www/docs/image.html \
	www/docs/index.html \
	www/docs/interact.html \
	www/docs/layer.html \
	www/docs/map.html \
	www/docs/queue.html \
	www/docs/svg.html \
	www/docs/transform.html \
	www/docs/url.html \
	www/docs/wheel.html

PYGMENT = /Library/Pygments-1.3.1/pygmentize
PYGMENT_STYLE = trac

all: polymaps.min.js polymaps.js

%.min.js: %.js
	$(JS_COMPILER) < $^ > $@

polymaps.min.js: polymaps.js
	rm -f $@
	$(JS_COMPILER) < polymaps.js >> $@

polymaps.js: $(JS_FILES) Makefile
	rm -f $@
	cat $(JS_FILES) >> $@
	chmod a-w $@

%.d: %.m4 Makefile www/m4d.sh
	@www/m4d.sh $< > $@

%.d: %.html
	@touch $@

-include $(patsubst %.html,%.d,$(filter %.html,$(WWW_EX_FILES)))

html: $(WWW_FILES) $(WWW_EX_FILES) $(WWW_DOCS_FILES) Makefile
	rm -rf $@
	mkdir $@ $@/ex $@/docs
	cp $(WWW_FILES) $@
	cp $(WWW_EX_FILES) $@/ex
	cp $(WWW_DOCS_FILES) $@/docs

%.html: %.m4 Makefile
	rm -f $@
	cd $(dir $<) && m4 -P < $(notdir $<) > $(notdir $@)
	chmod a-w $@

%.js.html: %.js Makefile
	$(PYGMENT) -f html -O cssclass=syntax,style=$(PYGMENT_STYLE) -l js $(filter %.js,$^) > $@

%.js.txt: %.js Makefile
	cat $(filter %.js,$^) > $@

clean:
	rm -rf polymaps.js polymaps.min.js html
	rm -f $(patsubst %.html,%.d,$(filter %.html,$(WWW_EX_FILES)))
