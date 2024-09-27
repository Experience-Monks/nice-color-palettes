# nice-color-palettes

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

A JSON of the top color palettes on [ColourLovers.com](http://colourlovers.com/), as RGB hex strings.

###### _Last updated Oct 14 2018_

![colors](visualize/1000.png)

## Example

```js
var colors = require("nice-color-palettes");

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
require("nice-color-palettes");

// top 200 palettes
require("nice-color-palettes/200");

// top 500 palettes
require("nice-color-palettes/500");

// top 1000 palettes
require("nice-color-palettes/1000");
```

_Note:_ Duplicate palettes and palettes with less than 5 colors are filtered out for the sake of consistency, so you may end up with a slightly different number in the JSON, like 495 palettes instead of 500.

## CLI Usage

As of version 4.0, the CLI is no longer exposed as a primary dependency, but as a dev dependency that can be run locally when cloning the repo.

```sh
git clone https://github.com/Experience-Monks/nice-color-palettes.git
cd nice-color-palettes
npm install
node bin/index.js [count] [opts]

Options:
  count       number of palettes (default 100)
  --pretty    pretty-print the JSON

Examples:
  node bin/index.js 300 --pretty > top-300.json
  node bin/index.js > top-100.json
```

## License

MIT, see [LICENSE.md](http://github.com/Jam3/nice-color-palettes/blob/master/LICENSE.md) for details.
