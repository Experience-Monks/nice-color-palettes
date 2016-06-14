# nice-color-palettes

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

A JSON of the top color palettes on [ColourLovers.com](http://colourlovers.com/), as RGB hex strings.

###### *Last updated Jun 14 2016*

![colors](https://i.imgur.com/XYYM4qp.png)

## Example

```js
var colors = require('nice-color-palettes');

console.log(colors.length);
// => 100

console.log(colors[0]);
// => [ "#69d2e7", "#a7dbd8", "#e0e4cc", "#f38630", "#fa6900" ]
``` 

## Install

Install with npm as a local dependency (for API) or global (for CLI).

```sh
npm install nice-color-palettes [-g|--save]
```

## API Usage

The main entry point exports a nested JSON array with 100 color palettes. Each palette is an array of 5 RGB hex strings.

This also exposes two other sizes for convenience, 200 and 500:

```js
// top 100 palettes
require('nice-color-palettes');

// top 200 palettes
require('nice-color-palettes/200');

// top 500 palettes
require('nice-color-palettes/500');
``` 

## CLI Usage

This also includes a CLI for fetching palettes, writing the JSON to stdout.

```sh
nice-color-palettes [count] [opts]

Options:
  count       number of palettes (default 100)
  --pretty    pretty-print the JSON

Examples:
  nice-color-palettes 300 --pretty > top-300.json
  nice-color-palettes > top-100.json
```

## License

MIT, see [LICENSE.md](http://github.com/Jam3/nice-color-palettes/blob/master/LICENSE.md) for details.
