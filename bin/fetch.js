var request = require('xhr-request');
var mapLimit = require('map-limit');
var newArray = require('new-array');

module.exports = function (totalCount, cb) {
  if (typeof totalCount !== 'number') {
    throw new TypeError('must specify count as first parameter');
  }

  var totalPages = totalCount === 0 ? 0 : Math.ceil(totalCount / 100);

  function next (page, cb) {
    console.error('Page %d / %d', (page + 1), totalPages);
    var api = 'http://www.colourlovers.com/api/palettes/top?format=json&numResults=100&resultOffset=' + page;
    request(api, {
      json: true
    }, function (err, data) {
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
    console.error('Total palettes:', palettes.length);
    cb(null, palettes);
  });
};
