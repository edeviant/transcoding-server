'use strict'

const sharp = require('sharp');

const FORMAT_OVERRIDE = {
  jpg: 'jpeg'
};

function parseSize(sizeString) {
  const sz = sizeString.split('x').map((px) => +px);
  return {
    w: sz[0] ? sz[0] : null,
    h: sz[1] ? sz[1] : null
  }
}

module.exports = function getResizer(sizeString, filename) {
  const size = parseSize(sizeString);
  const rawFormat = filename.split('.').pop();
  const format = FORMAT_OVERRIDE[rawFormat] ? FORMAT_OVERRIDE[rawFormat] : rawFormat;

  return sharp().resize(size.w, size.h).toFormat(format);
}
