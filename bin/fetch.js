var got = require('got');
var mapLimit = require('map-limit');
var newArray = require('new-array');
var arrayEqual = require('array-equal');

function request (url, cb) {
  try {
    got(url, { json: true })
      .then(response => {
        cb(null, response.body);
      })
      .catch((err) => cb(err));
  } catch (err) {
    cb(err);
  }
}

module.exports = function (totalCount, cb) {
  if (typeof totalCount !== 'number') {
    throw new TypeError('must specify count as first parameter');
  }

  var totalPages = totalCount === 0 ? 0 : Math.ceil(totalCount / 100);

  function next (page, cb) {
    console.error('Page %d / %d', (page + 1), totalPages);
    var api = 'http://www.colourlovers.com/api/palettes/top?format=json&numResults=100&resultOffset=' + (page * 100);
    request(api, function (err, data) {
      cb(err, data);
    });
  }

  var pages = newArray(totalPages).map(function (_, i) {
    return i;
  });
  mapLimit(pages, 1, next, function (err, allPages) {
    if (err) return cb(err);
    allPages = allPages.reduce(function (a, b) {
      return a.concat(b);
    }, []);
    allPages = allPages.slice(0, totalCount);
    var palettes = allPages.map(function (x) {
      return x.colors.slice(0, 5).map(function (color) {
        return '#' + color.toLowerCase();
      });
    });
    palettes = palettes.filter(f => f.length === 5);
    var newPalettes = [];
    for (let i = 0; i < palettes.length; i++) {
      const palette = palettes[i];

      // search existing palettes to see if we've already added it
      let hasDuplicate = false;
      for (let j = 0; j < newPalettes.length; j++) {
        const other = newPalettes[j];
        if (arrayEqual(palette, other)) {
          hasDuplicate = true;
          break;
        }
      }
      if (!hasDuplicate) {
        newPalettes.push(palette);
      }
    }
    palettes = newPalettes;
    console.error('Total palettes:', palettes.length);
    cb(null, palettes);
  });
};
