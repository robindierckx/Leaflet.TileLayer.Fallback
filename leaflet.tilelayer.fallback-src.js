/**
 * Leaflet.TileLayer.Fallback replaces missing Tiles (404 error) by scaled
 * lower zoom Tiles.
 *
 * Copyright 2015 Boris Seang
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['leaflet'], function (L) {
			return (root.L.TileLayer.Fallback = factory(L));
		});
	} else if (typeof module === 'object' && module.exports) {
		module.exports = factory(require('leaflet'));
	} else {
		root.L.TileLayer.Fallback = factory(root.L);
	}
}(this, function (L) {

	var TL = L.TileLayer,
	    TLproto = TL.prototype;


	var FallbackTileLayer = TL.extend({

		statics: {
			version: '0.1.0'
		},

		urlTemplates : [],

		initialize: function (urlTemplates, options) {
			var urlTemplate = urlTemplates.shift();
			this.urlTemplates = urlTemplates;
			TLproto.initialize.call(this, urlTemplate, options);
		},

		createTile: function (coords, done) {
			var tile = L.TileLayer.prototype.createTile.call(this, coords, done);
			tile._originalCoords = coords;
			tile._originalSrc = tile.src;

			return tile;
		},

		_loadTile: function (tile, tilePoint) {
			TLproto._loadTile.call(this, tile, tilePoint);
			tile._tilePoint = tilePoint;
		},

		_tileOnError: function (done,tile,e) {
			var layer = this;
			var currentUrl = tile._currentUrl = tile._currentUrl || 0;
			var coords = tile._originalCoords;
			var newUrl = layer.options.errorTileUrl;
			if(currentUrl < layer.urlTemplates.length)
			{
				var cUrlTemplate = layer.urlTemplates[currentUrl];
				newUrl = L.Util.template(cUrlTemplate, L.extend({
					z: coords.z,
					x: coords.x,
					y: coords.y
					}, layer.options));
			}
			tile._currentUrl = (tile._currentUrl + 1)%(layer.urlTemplates.length+1);
			
			layer.fire('tilefallback', {
				tile: tile,
				url: tile.src,
				urlFallback: newUrl
			});

			if (newUrl) {
				tile.src = newUrl;
			}
			//layer._tileLoaded();
		}

	});



	// Supply with a factory for consistency with Leaflet.
	L.tileLayer.fallback = function (urlTemplate, options) {
		return new TL.Fallback(urlTemplate, options);
	};

	// Just return a value to define the module export.
	return FallbackTileLayer;
}));

