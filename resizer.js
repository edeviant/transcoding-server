'use strict'

const sharp = require('sharp');

const FORMAT_OVERRIDE = {
  jpg: 'jpeg'
};

const SIZE_PRESETS = {
  thumbnail:  "200x200",
  preview:    "500x400",
  featured:   "1024x768",
  banner:     "3000x500"
}

function parseSize(sizeString) {
  const sz = (SIZE_PRESETS[sizeString]) 
              ? SIZE_PRESETS[sizeString].split('x').map((px) => +px) 
              : sizeString.split('x').map((px) => +px);
  return {
    w: sz[0] ? sz[0] : null,
    h: sz[1] ? sz[1] : null
  }
}

module.exports = function getResizer(sizeString, filename) {
  const size = parseSize(sizeString);
  const rawFormat = filename.split('.').pop();
  const format = FORMAT_OVERRIDE[rawFormat] ? FORMAT_OVERRIDE[rawFormat] : rawFormat;

  return sharp().resize(size.w, size.h).normalize(true).toFormat(format);
}
