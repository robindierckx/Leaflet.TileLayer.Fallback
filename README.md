# Leaflet.TileLayer.Fallback

**FORK FROM [BenjaminVadant/Leaflet.TileLayer.Fallback](https://github.com/BenjaminVadant/Leaflet.TileLayer.Fallback) that is compatible with Leaflet 1.0.3**

Plugin for Leaflet. Tries to load from another url if the first one is not available.

[Leaflet](http://leafletjs.com/) is the leading open-source JavaScript library
for mobile-friendly interactive maps.

Current TileLayer.Fallback version: 0.1.0



## Requirements

- Leaflet stable (1.0.x)


## Usage instructions

### Quick Guide

**HTML:**

```html
<!-- add TileLayer.Fallback script after Leaflet -->
<script src="leaflet.tilelayer.fallback-src.js"></script>
```

**JavaScript:**

```javascript
var myTileLayer = L.tileLayer.fallback([url,urlFallback], options);
```

Now missing tiles will be automatically replaced by tiles from another url


### Installing the plugin

Simply add the "leaflet.tilelayer.fallback-src.js" script file to your page after
Leaflet script (whether in the HTML head or body).


### Creation

Simply use the `L.tileLayer.fallback` factory instead of your regular `L.tileLayer`:

```javascript
var myTileLayer = L.tileLayer.fallback(urls, options);

myTileLayer.addTo(map);
```



## API Reference

### Creation

| Factory | Description |
| :------ | :---------- |
| **L.tileLayer.fallback**( [`<String>` [urlTemplate](http://leafletjs.com/reference.html#url-template)], [`<TileLayer options>`](#options) options? ) | Instantiates a tile layer object given an array of [URL template](http://leafletjs.com/reference.html#url-template) and optionally an options object. When tile images return a 404 error, they are replaced by tiles from the other servers. |


### Options

All other [TileLayer options](http://leafletjs.com/reference.html#tilelayer-options) are applicable.


### Events

| Event | Data | Description |
| :---- | :--- | :---------- |
| **tilefallback** | [`TileFallbackEvent`](#tilefallbackevent) | Fired when a tile is being replaced. |

All other [TileLayer events](http://leafletjs.com/reference.html#tilelayer-loading) are applicable.


#### TileFallbackEvent

| Property | Type | Description |
| :------- | :--- | :---------- |
| `tile` | `HTMLElement` | The tile element (image). |
| `url` | `String` | The **original** source URL of the tile (before any fallback is applied). |
| `urlMissing` | `String` | The missing source URL of the tile (possibly after a few fallback attempts). |
| `urlFallback` | `String` | The fallback source URL of the tile (which may turn out to be also missing). |


### Methods

Leaflet.TileLayer.Fallback does not provide any extra method beyond regular
[TileLayer methods](http://leafletjs.com/reference.html#tilelayer-addto).



## Limitations
TileLayer.Fallback plugin tries to replace each missing tile by tiles from another server. But if the tile is missing on every server (which is rare), it will just display no tile at all.

That means it has to wait for the server to return a 404 error before attempting
to replace the tile. If several tiles are
missing, it has to wait as many times as the number of missing tiles. Therefore,
the more missing tiles, the more time it takes to replace a tile.



## License
This is a fork of ghybs/Leaflet.TileLayer.Fallback (https://github.com/ghybs/Leaflet.TileLayer.Fallback) which has a different operating mode.

Leaflet.TileLayer.Fallback is distributed under the [Apache 2.0 License](http://choosealicense.com/licenses/apache-2.0/).
