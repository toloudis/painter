// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/image-q/dist/esm/constants/bt709.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.y = exports.x = exports.Y = void 0;

/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * constants.ts - part of Image Quantization Library
 */

/**
 * sRGB (based on ITU-R Recommendation BT.709)
 * http://en.wikipedia.org/wiki/SRGB
 */
var Y;
exports.Y = Y;

(function (Y) {
  Y[Y["RED"] = 0.2126] = "RED";
  Y[Y["GREEN"] = 0.7152] = "GREEN";
  Y[Y["BLUE"] = 0.0722] = "BLUE";
  Y[Y["WHITE"] = 1] = "WHITE";
})(Y || (exports.Y = Y = {})); // tslint:disable-next-line:naming-convention


var x;
exports.x = x;

(function (x) {
  x[x["RED"] = 0.64] = "RED";
  x[x["GREEN"] = 0.3] = "GREEN";
  x[x["BLUE"] = 0.15] = "BLUE";
  x[x["WHITE"] = 0.3127] = "WHITE";
})(x || (exports.x = x = {})); // tslint:disable-next-line:naming-convention


var y;
exports.y = y;

(function (y) {
  y[y["RED"] = 0.33] = "RED";
  y[y["GREEN"] = 0.6] = "GREEN";
  y[y["BLUE"] = 0.06] = "BLUE";
  y[y["WHITE"] = 0.329] = "WHITE";
})(y || (exports.y = y = {}));
},{}],"node_modules/image-q/dist/esm/constants/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bt709 = void 0;

var bt709 = _interopRequireWildcard(require("./bt709"));

exports.bt709 = bt709;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
},{"./bt709":"node_modules/image-q/dist/esm/constants/bt709.js"}],"node_modules/image-q/dist/esm/conversion/rgb2xyz.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rgb2xyz = rgb2xyz;

/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * rgb2xyz.ts - part of Image Quantization Library
 */
function correctGamma(n) {
  return n > 0.04045 ? Math.pow((n + 0.055) / 1.055, 2.4) : n / 12.92;
}

function rgb2xyz(r, g, b) {
  // gamma correction, see https://en.wikipedia.org/wiki/SRGB#The_reverse_transformation
  r = correctGamma(r / 255);
  g = correctGamma(g / 255);
  b = correctGamma(b / 255); // Observer. = 2°, Illuminant = D65

  return {
    x: r * 0.4124 + g * 0.3576 + b * 0.1805,
    y: r * 0.2126 + g * 0.7152 + b * 0.0722,
    z: r * 0.0193 + g * 0.1192 + b * 0.9505
  };
}
},{}],"node_modules/image-q/dist/esm/utils/arithmetic.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.degrees2radians = degrees2radians;
exports.max3 = max3;
exports.min3 = min3;
exports.intInRange = intInRange;
exports.inRange0to255Rounded = inRange0to255Rounded;
exports.inRange0to255 = inRange0to255;
exports.stableSort = stableSort;

function degrees2radians(n) {
  return n * (Math.PI / 180);
}

function max3(a, b, c) {
  let m = a;
  if (m < b) m = b;
  if (m < c) m = c;
  return m;
}

function min3(a, b, c) {
  let m = a;
  if (m > b) m = b;
  if (m > c) m = c;
  return m;
}

function intInRange(value, low, high) {
  if (value > high) value = high;
  if (value < low) value = low;
  return value | 0;
}

function inRange0to255Rounded(n) {
  n = Math.round(n);
  if (n > 255) n = 255;else if (n < 0) n = 0;
  return n;
}

function inRange0to255(n) {
  if (n > 255) n = 255;else if (n < 0) n = 0;
  return n;
}

function stableSort(arrayToSort, callback) {
  const type = typeof arrayToSort[0];
  let sorted;

  if (type === 'number' || type === 'string') {
    const ord = Object.create(null); // tslint:disable-line:no-null-keyword

    for (let i = 0, l = arrayToSort.length; i < l; i++) {
      const val = arrayToSort[i]; // tslint:disable-line:no-any

      if (ord[val] || ord[val] === 0) continue;
      ord[val] = i;
    }

    sorted = arrayToSort.sort(function (a, b) {
      return callback(a, b) || ord[a] - ord[b];
    });
  } else {
    const ord2 = arrayToSort.slice(0);
    sorted = arrayToSort.sort(function (a, b) {
      return callback(a, b) || ord2.indexOf(a) - ord2.indexOf(b);
    });
  }

  return sorted;
}
},{}],"node_modules/image-q/dist/esm/conversion/rgb2hsl.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rgb2hsl = rgb2hsl;

var _arithmetic = require("../utils/arithmetic");

/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * rgb2hsl.ts - part of Image Quantization Library
 */

/**
 * Calculate HSL from RGB
 * Hue is in degrees [0..360]
 * Lightness: [0..1]
 * Saturation: [0..1]
 * http://web.archive.org/web/20060914040436/http://local.wasp.uwa.edu.au/~pbourke/colour/hsl/
 */
function rgb2hsl(r, g, b) {
  const min = (0, _arithmetic.min3)(r, g, b);
  const max = (0, _arithmetic.max3)(r, g, b);
  const delta = max - min;
  const l = (min + max) / 510;
  let s = 0;
  if (l > 0 && l < 1) s = delta / (l < 0.5 ? max + min : 510 - max - min);
  let h = 0;

  if (delta > 0) {
    if (max === r) {
      h = (g - b) / delta;
    } else if (max === g) {
      h = 2 + (b - r) / delta;
    } else {
      h = 4 + (r - g) / delta;
    }

    h *= 60;
    if (h < 0) h += 360;
  }

  return {
    h,
    s,
    l
  };
}
},{"../utils/arithmetic":"node_modules/image-q/dist/esm/utils/arithmetic.js"}],"node_modules/image-q/dist/esm/conversion/xyz2lab.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.xyz2lab = xyz2lab;

/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * xyz2lab.ts - part of Image Quantization Library
 */
const refX = 0.95047; // ref_X =  95.047   Observer= 2°, Illuminant= D65

const refY = 1.00000; // ref_Y = 100.000

const refZ = 1.08883; // ref_Z = 108.883

function pivot(n) {
  return n > 0.008856 ? Math.pow(n, 1 / 3) : 7.787 * n + 16 / 116;
}

function xyz2lab(x, y, z) {
  x = pivot(x / refX);
  y = pivot(y / refY);
  z = pivot(z / refZ);
  if (116 * y - 16 < 0) throw new Error('xxx');
  return {
    L: Math.max(0, 116 * y - 16),
    a: 500 * (x - y),
    b: 200 * (y - z)
  };
}
},{}],"node_modules/image-q/dist/esm/conversion/rgb2lab.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rgb2lab = rgb2lab;

var _rgb2xyz = require("./rgb2xyz");

var _xyz2lab = require("./xyz2lab");

/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * rgb2lab.ts - part of Image Quantization Library
 */
function rgb2lab(r, g, b) {
  const xyz = (0, _rgb2xyz.rgb2xyz)(r, g, b);
  return (0, _xyz2lab.xyz2lab)(xyz.x, xyz.y, xyz.z);
}
},{"./rgb2xyz":"node_modules/image-q/dist/esm/conversion/rgb2xyz.js","./xyz2lab":"node_modules/image-q/dist/esm/conversion/xyz2lab.js"}],"node_modules/image-q/dist/esm/conversion/lab2xyz.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lab2xyz = lab2xyz;

/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * lab2xyz.ts - part of Image Quantization Library
 */
const refX = 0.95047; // ref_X =  95.047   Observer= 2°, Illuminant = D65

const refY = 1.00000; // ref_Y = 100.000

const refZ = 1.08883; // ref_Z = 108.883

function pivot(n) {
  return n > 0.206893034 ? Math.pow(n, 3) : (n - 16 / 116) / 7.787;
} // tslint:disable-next-line:naming-convention


function lab2xyz(L, a, b) {
  const y = (L + 16) / 116;
  const x = a / 500 + y;
  const z = y - b / 200;
  return {
    x: refX * pivot(x),
    y: refY * pivot(y),
    z: refZ * pivot(z)
  };
}
},{}],"node_modules/image-q/dist/esm/conversion/xyz2rgb.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.xyz2rgb = xyz2rgb;

var _arithmetic = require("../utils/arithmetic");

/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * xyz2rgb.ts - part of Image Quantization Library
 */
// gamma correction, see https://en.wikipedia.org/wiki/SRGB#The_reverse_transformation
function correctGamma(n) {
  return n > 0.0031308 ? 1.055 * Math.pow(n, 1 / 2.4) - 0.055 : 12.92 * n;
}

function xyz2rgb(x, y, z) {
  // Observer. = 2°, Illuminant = D65
  const r = correctGamma(x * 3.2406 + y * -1.5372 + z * -0.4986);
  const g = correctGamma(x * -0.9689 + y * 1.8758 + z * 0.0415);
  const b = correctGamma(x * 0.0557 + y * -0.2040 + z * 1.0570);
  return {
    r: (0, _arithmetic.inRange0to255Rounded)(r * 255),
    g: (0, _arithmetic.inRange0to255Rounded)(g * 255),
    b: (0, _arithmetic.inRange0to255Rounded)(b * 255)
  };
}
},{"../utils/arithmetic":"node_modules/image-q/dist/esm/utils/arithmetic.js"}],"node_modules/image-q/dist/esm/conversion/lab2rgb.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lab2rgb = lab2rgb;

var _lab2xyz = require("./lab2xyz");

var _xyz2rgb = require("./xyz2rgb");

/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * lab2rgb.ts - part of Image Quantization Library
 */
// tslint:disable-next-line:naming-convention
function lab2rgb(L, a, b) {
  const xyz = (0, _lab2xyz.lab2xyz)(L, a, b);
  return (0, _xyz2rgb.xyz2rgb)(xyz.x, xyz.y, xyz.z);
}
},{"./lab2xyz":"node_modules/image-q/dist/esm/conversion/lab2xyz.js","./xyz2rgb":"node_modules/image-q/dist/esm/conversion/xyz2rgb.js"}],"node_modules/image-q/dist/esm/conversion/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "rgb2xyz", {
  enumerable: true,
  get: function () {
    return _rgb2xyz.rgb2xyz;
  }
});
Object.defineProperty(exports, "rgb2hsl", {
  enumerable: true,
  get: function () {
    return _rgb2hsl.rgb2hsl;
  }
});
Object.defineProperty(exports, "rgb2lab", {
  enumerable: true,
  get: function () {
    return _rgb2lab.rgb2lab;
  }
});
Object.defineProperty(exports, "lab2xyz", {
  enumerable: true,
  get: function () {
    return _lab2xyz.lab2xyz;
  }
});
Object.defineProperty(exports, "lab2rgb", {
  enumerable: true,
  get: function () {
    return _lab2rgb.lab2rgb;
  }
});
Object.defineProperty(exports, "xyz2lab", {
  enumerable: true,
  get: function () {
    return _xyz2lab.xyz2lab;
  }
});
Object.defineProperty(exports, "xyz2rgb", {
  enumerable: true,
  get: function () {
    return _xyz2rgb.xyz2rgb;
  }
});

var _rgb2xyz = require("./rgb2xyz");

var _rgb2hsl = require("./rgb2hsl");

var _rgb2lab = require("./rgb2lab");

var _lab2xyz = require("./lab2xyz");

var _lab2rgb = require("./lab2rgb");

var _xyz2lab = require("./xyz2lab");

var _xyz2rgb = require("./xyz2rgb");
},{"./rgb2xyz":"node_modules/image-q/dist/esm/conversion/rgb2xyz.js","./rgb2hsl":"node_modules/image-q/dist/esm/conversion/rgb2hsl.js","./rgb2lab":"node_modules/image-q/dist/esm/conversion/rgb2lab.js","./lab2xyz":"node_modules/image-q/dist/esm/conversion/lab2xyz.js","./lab2rgb":"node_modules/image-q/dist/esm/conversion/lab2rgb.js","./xyz2lab":"node_modules/image-q/dist/esm/conversion/xyz2lab.js","./xyz2rgb":"node_modules/image-q/dist/esm/conversion/xyz2rgb.js"}],"node_modules/image-q/dist/esm/distance/distanceCalculator.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AbstractDistanceCalculator = void 0;

class AbstractDistanceCalculator {
  constructor() {
    this._setDefaults(); // set default maximal color component deltas (255 - 0 = 255)


    this.setWhitePoint(255, 255, 255, 255);
  }

  setWhitePoint(r, g, b, a) {
    this._whitePoint = {
      r: r > 0 ? 255 / r : 0,
      g: g > 0 ? 255 / g : 0,
      b: b > 0 ? 255 / b : 0,
      a: a > 0 ? 255 / a : 0
    };
    this._maxDistance = this.calculateRaw(r, g, b, a, 0, 0, 0, 0);
  }

  calculateNormalized(colorA, colorB) {
    return this.calculateRaw(colorA.r, colorA.g, colorA.b, colorA.a, colorB.r, colorB.g, colorB.b, colorB.a) / this._maxDistance;
  }

}

exports.AbstractDistanceCalculator = AbstractDistanceCalculator;
},{}],"node_modules/image-q/dist/esm/distance/cie94.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CIE94GraphicArts = exports.CIE94Textiles = exports.AbstractCIE94 = void 0;

var _distanceCalculator = require("./distanceCalculator");

var _rgb2lab = require("../conversion/rgb2lab");

var _arithmetic = require("../utils/arithmetic");

/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * cie94.ts - part of Image Quantization Library
 */

/**
 * CIE94 method of delta-e
 * http://en.wikipedia.org/wiki/Color_difference#CIE94
 */
class AbstractCIE94 extends _distanceCalculator.AbstractDistanceCalculator {
  calculateRaw(r1, g1, b1, a1, r2, g2, b2, a2) {
    const lab1 = (0, _rgb2lab.rgb2lab)((0, _arithmetic.inRange0to255)(r1 * this._whitePoint.r), (0, _arithmetic.inRange0to255)(g1 * this._whitePoint.g), (0, _arithmetic.inRange0to255)(b1 * this._whitePoint.b));
    const lab2 = (0, _rgb2lab.rgb2lab)((0, _arithmetic.inRange0to255)(r2 * this._whitePoint.r), (0, _arithmetic.inRange0to255)(g2 * this._whitePoint.g), (0, _arithmetic.inRange0to255)(b2 * this._whitePoint.b));
    const dL = lab1.L - lab2.L;
    const dA = lab1.a - lab2.a;
    const dB = lab1.b - lab2.b;
    const c1 = Math.sqrt(lab1.a * lab1.a + lab1.b * lab1.b);
    const c2 = Math.sqrt(lab2.a * lab2.a + lab2.b * lab2.b);
    const dC = c1 - c2;
    let deltaH = dA * dA + dB * dB - dC * dC;
    deltaH = deltaH < 0 ? 0 : Math.sqrt(deltaH);
    const dAlpha = (a2 - a1) * this._whitePoint.a * this._kA; // TODO: add alpha channel support

    return Math.sqrt(Math.pow(dL / this._Kl, 2) + Math.pow(dC / (1.0 + this._K1 * c1), 2) + Math.pow(deltaH / (1.0 + this._K2 * c1), 2) + Math.pow(dAlpha, 2));
  }

}

exports.AbstractCIE94 = AbstractCIE94;

class CIE94Textiles extends AbstractCIE94 {
  _setDefaults() {
    this._Kl = 2.0;
    this._K1 = 0.048;
    this._K2 = 0.014;
    this._kA = 0.25 * 50 / 255;
  }

}

exports.CIE94Textiles = CIE94Textiles;

class CIE94GraphicArts extends AbstractCIE94 {
  _setDefaults() {
    this._Kl = 1.0;
    this._K1 = 0.045;
    this._K2 = 0.015;
    this._kA = 0.25 * 100 / 255;
  }

}

exports.CIE94GraphicArts = CIE94GraphicArts;
},{"./distanceCalculator":"node_modules/image-q/dist/esm/distance/distanceCalculator.js","../conversion/rgb2lab":"node_modules/image-q/dist/esm/conversion/rgb2lab.js","../utils/arithmetic":"node_modules/image-q/dist/esm/utils/arithmetic.js"}],"node_modules/image-q/dist/esm/distance/ciede2000.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CIEDE2000 = void 0;

var _distanceCalculator = require("./distanceCalculator");

var _rgb2lab = require("../conversion/rgb2lab");

var _arithmetic = require("../utils/arithmetic");

/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * ciede2000.ts - part of Image Quantization Library
 */
// tslint:disable:variable-name
// tslint:disable:naming-convention

/**
 * CIEDE2000 algorithm - Adapted from Sharma et al's MATLAB implementation at
 * http://www.ece.rochester.edu/~gsharma/ciede2000/
 */
class CIEDE2000 extends _distanceCalculator.AbstractDistanceCalculator {
  _setDefaults() {}

  static _calculatehp(b, ap) {
    const hp = Math.atan2(b, ap);
    if (hp >= 0) return hp;
    return hp + CIEDE2000._deg360InRad;
  }

  static _calculateRT(ahp, aCp) {
    const aCp_to_7 = Math.pow(aCp, 7.0);
    const R_C = 2.0 * Math.sqrt(aCp_to_7 / (aCp_to_7 + CIEDE2000._pow25to7)); // 25^7

    const delta_theta = CIEDE2000._deg30InRad * Math.exp(-Math.pow((ahp - CIEDE2000._deg275InRad) / CIEDE2000._deg25InRad, 2.0));
    return -Math.sin(2.0 * delta_theta) * R_C;
  }

  static _calculateT(ahp) {
    return 1.0 - .17 * Math.cos(ahp - CIEDE2000._deg30InRad) + .24 * Math.cos(ahp * 2.0) + .32 * Math.cos(ahp * 3.0 + CIEDE2000._deg6InRad) - .2 * Math.cos(ahp * 4.0 - CIEDE2000._deg63InRad);
  }

  static _calculate_ahp(C1pC2p, h_bar, h1p, h2p) {
    const hpSum = h1p + h2p;
    if (C1pC2p === 0) return hpSum;
    if (h_bar <= CIEDE2000._deg180InRad) return hpSum / 2.0;
    if (hpSum < CIEDE2000._deg360InRad) return (hpSum + CIEDE2000._deg360InRad) / 2.0;
    return (hpSum - CIEDE2000._deg360InRad) / 2.0;
  }

  static _calculate_dHp(C1pC2p, h_bar, h2p, h1p) {
    let dhp;

    if (C1pC2p === 0) {
      dhp = 0;
    } else if (h_bar <= CIEDE2000._deg180InRad) {
      dhp = h2p - h1p;
    } else if (h2p <= h1p) {
      dhp = h2p - h1p + CIEDE2000._deg360InRad;
    } else {
      dhp = h2p - h1p - CIEDE2000._deg360InRad;
    }

    return 2.0 * Math.sqrt(C1pC2p) * Math.sin(dhp / 2.0);
  }

  calculateRaw(r1, g1, b1, a1, r2, g2, b2, a2) {
    const lab1 = (0, _rgb2lab.rgb2lab)((0, _arithmetic.inRange0to255)(r1 * this._whitePoint.r), (0, _arithmetic.inRange0to255)(g1 * this._whitePoint.g), (0, _arithmetic.inRange0to255)(b1 * this._whitePoint.b));
    const lab2 = (0, _rgb2lab.rgb2lab)((0, _arithmetic.inRange0to255)(r2 * this._whitePoint.r), (0, _arithmetic.inRange0to255)(g2 * this._whitePoint.g), (0, _arithmetic.inRange0to255)(b2 * this._whitePoint.b));
    const dA = (a2 - a1) * this._whitePoint.a * CIEDE2000._kA;
    const dE2 = this.calculateRawInLab(lab1, lab2);
    return Math.sqrt(dE2 + dA * dA);
  }

  calculateRawInLab(Lab1, Lab2) {
    // Get L,a,b values for color 1
    const L1 = Lab1.L;
    const a1 = Lab1.a;
    const b1 = Lab1.b; // Get L,a,b values for color 2

    const L2 = Lab2.L;
    const a2 = Lab2.a;
    const b2 = Lab2.b; // Calculate Cprime1, Cprime2, Cabbar

    const C1 = Math.sqrt(a1 * a1 + b1 * b1);
    const C2 = Math.sqrt(a2 * a2 + b2 * b2);
    const pow_a_C1_C2_to_7 = Math.pow((C1 + C2) / 2.0, 7.0);
    const G = 0.5 * (1.0 - Math.sqrt(pow_a_C1_C2_to_7 / (pow_a_C1_C2_to_7 + CIEDE2000._pow25to7))); // 25^7

    const a1p = (1.0 + G) * a1;
    const a2p = (1.0 + G) * a2;
    const C1p = Math.sqrt(a1p * a1p + b1 * b1);
    const C2p = Math.sqrt(a2p * a2p + b2 * b2);
    const C1pC2p = C1p * C2p; // Angles in Degree.

    const h1p = CIEDE2000._calculatehp(b1, a1p);

    const h2p = CIEDE2000._calculatehp(b2, a2p);

    const h_bar = Math.abs(h1p - h2p);
    const dLp = L2 - L1;
    const dCp = C2p - C1p;

    const dHp = CIEDE2000._calculate_dHp(C1pC2p, h_bar, h2p, h1p);

    const ahp = CIEDE2000._calculate_ahp(C1pC2p, h_bar, h1p, h2p);

    const T = CIEDE2000._calculateT(ahp);

    const aCp = (C1p + C2p) / 2.0;
    const aLp_minus_50_square = Math.pow((L1 + L2) / 2.0 - 50.0, 2.0);
    const S_L = 1.0 + .015 * aLp_minus_50_square / Math.sqrt(20.0 + aLp_minus_50_square);
    const S_C = 1.0 + .045 * aCp;
    const S_H = 1.0 + .015 * T * aCp;

    const R_T = CIEDE2000._calculateRT(ahp, aCp);

    const dLpSL = dLp / S_L; // S_L * kL, where kL is 1.0

    const dCpSC = dCp / S_C; // S_C * kC, where kC is 1.0

    const dHpSH = dHp / S_H; // S_H * kH, where kH is 1.0

    return Math.pow(dLpSL, 2) + Math.pow(dCpSC, 2) + Math.pow(dHpSH, 2) + R_T * dCpSC * dHpSH;
  }

}
/**
 * Weight in distance: 0.25
 * Max DeltaE: 100
 * Max DeltaA: 255
 */


exports.CIEDE2000 = CIEDE2000;
CIEDE2000._kA = 0.25 * 100 / 255;
CIEDE2000._pow25to7 = Math.pow(25, 7);
CIEDE2000._deg360InRad = (0, _arithmetic.degrees2radians)(360);
CIEDE2000._deg180InRad = (0, _arithmetic.degrees2radians)(180);
CIEDE2000._deg30InRad = (0, _arithmetic.degrees2radians)(30);
CIEDE2000._deg6InRad = (0, _arithmetic.degrees2radians)(6);
CIEDE2000._deg63InRad = (0, _arithmetic.degrees2radians)(63);
CIEDE2000._deg275InRad = (0, _arithmetic.degrees2radians)(275);
CIEDE2000._deg25InRad = (0, _arithmetic.degrees2radians)(25);
},{"./distanceCalculator":"node_modules/image-q/dist/esm/distance/distanceCalculator.js","../conversion/rgb2lab":"node_modules/image-q/dist/esm/conversion/rgb2lab.js","../utils/arithmetic":"node_modules/image-q/dist/esm/utils/arithmetic.js"}],"node_modules/image-q/dist/esm/distance/cmetric.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CMetric = void 0;

var _distanceCalculator = require("./distanceCalculator");

/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * cmetric.ts - part of Image Quantization Library
 */

/**
 * TODO: Name it: http://www.compuphase.com/cmetric.htm
 */
class CMetric extends _distanceCalculator.AbstractDistanceCalculator {
  calculateRaw(r1, g1, b1, a1, r2, g2, b2, a2) {
    const rmean = (r1 + r2) / 2 * this._whitePoint.r;
    const r = (r1 - r2) * this._whitePoint.r;
    const g = (g1 - g2) * this._whitePoint.g;
    const b = (b1 - b2) * this._whitePoint.b;
    const dE = ((512 + rmean) * r * r >> 8) + 4 * g * g + ((767 - rmean) * b * b >> 8);
    const dA = (a2 - a1) * this._whitePoint.a;
    return Math.sqrt(dE + dA * dA);
  }

  _setDefaults() {}

}

exports.CMetric = CMetric;
},{"./distanceCalculator":"node_modules/image-q/dist/esm/distance/distanceCalculator.js"}],"node_modules/image-q/dist/esm/distance/euclidean.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuclideanBT709NoAlpha = exports.EuclideanBT709 = exports.Euclidean = exports.AbstractEuclidean = void 0;

var _distanceCalculator = require("./distanceCalculator");

var _bt = require("../constants/bt709");

/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * euclidean.ts - part of Image Quantization Library
 */

/**
 * Euclidean color distance
 */
class AbstractEuclidean extends _distanceCalculator.AbstractDistanceCalculator {
  calculateRaw(r1, g1, b1, a1, r2, g2, b2, a2) {
    const dR = r2 - r1;
    const dG = g2 - g1;
    const dB = b2 - b1;
    const dA = a2 - a1;
    return Math.sqrt(this._kR * dR * dR + this._kG * dG * dG + this._kB * dB * dB + this._kA * dA * dA);
  }

}

exports.AbstractEuclidean = AbstractEuclidean;

class Euclidean extends AbstractEuclidean {
  _setDefaults() {
    this._kR = 1;
    this._kG = 1;
    this._kB = 1;
    this._kA = 1;
  }

}
/**
 * Euclidean color distance (RGBQuant modification w Alpha)
 */


exports.Euclidean = Euclidean;

class EuclideanBT709 extends AbstractEuclidean {
  _setDefaults() {
    this._kR = _bt.Y.RED;
    this._kG = _bt.Y.GREEN;
    this._kB = _bt.Y.BLUE; // TODO: what is the best coefficient below?

    this._kA = 1;
  }

}
/**
 * Euclidean color distance (RGBQuant modification w/o Alpha)
 */


exports.EuclideanBT709 = EuclideanBT709;

class EuclideanBT709NoAlpha extends AbstractEuclidean {
  _setDefaults() {
    this._kR = _bt.Y.RED;
    this._kG = _bt.Y.GREEN;
    this._kB = _bt.Y.BLUE;
    this._kA = 0;
  }

}

exports.EuclideanBT709NoAlpha = EuclideanBT709NoAlpha;
},{"./distanceCalculator":"node_modules/image-q/dist/esm/distance/distanceCalculator.js","../constants/bt709":"node_modules/image-q/dist/esm/constants/bt709.js"}],"node_modules/image-q/dist/esm/distance/manhattan.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ManhattanBT709 = exports.ManhattanNommyde = exports.Manhattan = exports.AbstractManhattan = void 0;

var _distanceCalculator = require("./distanceCalculator");

var _bt = require("../constants/bt709");

/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * manhattanNeuQuant.ts - part of Image Quantization Library
 */

/**
 * Manhattan distance (NeuQuant modification) - w/o sRGB coefficients
 */
class AbstractManhattan extends _distanceCalculator.AbstractDistanceCalculator {
  calculateRaw(r1, g1, b1, a1, r2, g2, b2, a2) {
    let dR = r2 - r1;
    let dG = g2 - g1;
    let dB = b2 - b1;
    let dA = a2 - a1;
    if (dR < 0) dR = 0 - dR;
    if (dG < 0) dG = 0 - dG;
    if (dB < 0) dB = 0 - dB;
    if (dA < 0) dA = 0 - dA;
    return this._kR * dR + this._kG * dG + this._kB * dB + this._kA * dA;
  }

}

exports.AbstractManhattan = AbstractManhattan;

class Manhattan extends AbstractManhattan {
  _setDefaults() {
    this._kR = 1;
    this._kG = 1;
    this._kB = 1;
    this._kA = 1;
  }

}
/**
 * Manhattan distance (Nommyde modification)
 * https://github.com/igor-bezkrovny/image-quantization/issues/4#issuecomment-235155320
 */


exports.Manhattan = Manhattan;

class ManhattanNommyde extends AbstractManhattan {
  _setDefaults() {
    this._kR = 0.4984;
    this._kG = 0.8625;
    this._kB = 0.2979; // TODO: what is the best coefficient below?

    this._kA = 1;
  }

}
/**
 * Manhattan distance (sRGB coefficients)
 */


exports.ManhattanNommyde = ManhattanNommyde;

class ManhattanBT709 extends AbstractManhattan {
  _setDefaults() {
    this._kR = _bt.Y.RED;
    this._kG = _bt.Y.GREEN;
    this._kB = _bt.Y.BLUE; // TODO: what is the best coefficient below?

    this._kA = 1;
  }

}

exports.ManhattanBT709 = ManhattanBT709;
},{"./distanceCalculator":"node_modules/image-q/dist/esm/distance/distanceCalculator.js","../constants/bt709":"node_modules/image-q/dist/esm/constants/bt709.js"}],"node_modules/image-q/dist/esm/distance/pngQuant.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PNGQuant = void 0;

var _distanceCalculator = require("./distanceCalculator");

/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * pngQuant.ts - part of Image Quantization Library
 */

/**
 * TODO: check quality of this distance equation
 * TODO: ask author for usage rights
 * taken from:
 * {@link http://stackoverflow.com/questions/4754506/color-similarity-distance-in-rgba-color-space/8796867#8796867}
 * {@link https://github.com/pornel/pngquant/blob/cc39b47799a7ff2ef17b529f9415ff6e6b213b8f/lib/pam.h#L148}
 */
class PNGQuant extends _distanceCalculator.AbstractDistanceCalculator {
  /**
   * Author's comments
   * px_b.rgb = px.rgb + 0*(1-px.a) // blend px on black
   * px_b.a   = px.a   + 1*(1-px.a)
   * px_w.rgb = px.rgb + 1*(1-px.a) // blend px on white
   * px_w.a   = px.a   + 1*(1-px.a)
   *
   * px_b.rgb = px.rgb              // difference same as in opaque RGB
   * px_b.a   = 1
   * px_w.rgb = px.rgb - px.a       // difference simplifies to formula below
   * px_w.a   = 1
   *
   * (px.rgb - px.a) - (py.rgb - py.a)
   * (px.rgb - py.rgb) + (py.a - px.a)
   *
   */
  calculateRaw(r1, g1, b1, a1, r2, g2, b2, a2) {
    const alphas = (a2 - a1) * this._whitePoint.a;
    return this._colordifferenceCh(r1 * this._whitePoint.r, r2 * this._whitePoint.r, alphas) + this._colordifferenceCh(g1 * this._whitePoint.g, g2 * this._whitePoint.g, alphas) + this._colordifferenceCh(b1 * this._whitePoint.b, b2 * this._whitePoint.b, alphas);
  }

  _colordifferenceCh(x, y, alphas) {
    // maximum of channel blended on white, and blended on black
    // premultiplied alpha and backgrounds 0/1 shorten the formula
    const black = x - y;
    const white = black + alphas;
    return black * black + white * white;
  }

  _setDefaults() {}

}

exports.PNGQuant = PNGQuant;
},{"./distanceCalculator":"node_modules/image-q/dist/esm/distance/distanceCalculator.js"}],"node_modules/image-q/dist/esm/distance/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "AbstractDistanceCalculator", {
  enumerable: true,
  get: function () {
    return _distanceCalculator.AbstractDistanceCalculator;
  }
});
Object.defineProperty(exports, "CIE94Textiles", {
  enumerable: true,
  get: function () {
    return _cie.CIE94Textiles;
  }
});
Object.defineProperty(exports, "CIE94GraphicArts", {
  enumerable: true,
  get: function () {
    return _cie.CIE94GraphicArts;
  }
});
Object.defineProperty(exports, "CIEDE2000", {
  enumerable: true,
  get: function () {
    return _ciede.CIEDE2000;
  }
});
Object.defineProperty(exports, "CMetric", {
  enumerable: true,
  get: function () {
    return _cmetric.CMetric;
  }
});
Object.defineProperty(exports, "AbstractEuclidean", {
  enumerable: true,
  get: function () {
    return _euclidean.AbstractEuclidean;
  }
});
Object.defineProperty(exports, "Euclidean", {
  enumerable: true,
  get: function () {
    return _euclidean.Euclidean;
  }
});
Object.defineProperty(exports, "EuclideanBT709NoAlpha", {
  enumerable: true,
  get: function () {
    return _euclidean.EuclideanBT709NoAlpha;
  }
});
Object.defineProperty(exports, "EuclideanBT709", {
  enumerable: true,
  get: function () {
    return _euclidean.EuclideanBT709;
  }
});
Object.defineProperty(exports, "AbstractManhattan", {
  enumerable: true,
  get: function () {
    return _manhattan.AbstractManhattan;
  }
});
Object.defineProperty(exports, "Manhattan", {
  enumerable: true,
  get: function () {
    return _manhattan.Manhattan;
  }
});
Object.defineProperty(exports, "ManhattanBT709", {
  enumerable: true,
  get: function () {
    return _manhattan.ManhattanBT709;
  }
});
Object.defineProperty(exports, "ManhattanNommyde", {
  enumerable: true,
  get: function () {
    return _manhattan.ManhattanNommyde;
  }
});
Object.defineProperty(exports, "PNGQuant", {
  enumerable: true,
  get: function () {
    return _pngQuant.PNGQuant;
  }
});

var _distanceCalculator = require("./distanceCalculator");

var _cie = require("./cie94");

var _ciede = require("./ciede2000");

var _cmetric = require("./cmetric");

var _euclidean = require("./euclidean");

var _manhattan = require("./manhattan");

var _pngQuant = require("./pngQuant");
},{"./distanceCalculator":"node_modules/image-q/dist/esm/distance/distanceCalculator.js","./cie94":"node_modules/image-q/dist/esm/distance/cie94.js","./ciede2000":"node_modules/image-q/dist/esm/distance/ciede2000.js","./cmetric":"node_modules/image-q/dist/esm/distance/cmetric.js","./euclidean":"node_modules/image-q/dist/esm/distance/euclidean.js","./manhattan":"node_modules/image-q/dist/esm/distance/manhattan.js","./pngQuant":"node_modules/image-q/dist/esm/distance/pngQuant.js"}],"node_modules/image-q/dist/esm/palette/paletteQuantizer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AbstractPaletteQuantizer = void 0;

class AbstractPaletteQuantizer {
  quantizeSync() {
    for (const value of this.quantize()) {
      if (value.palette) {
        return value.palette;
      }
    }

    throw new Error('unreachable');
  }

}

exports.AbstractPaletteQuantizer = AbstractPaletteQuantizer;
},{}],"node_modules/image-q/dist/esm/utils/point.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Point = void 0;

var _bt = require("../constants/bt709");

/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * point.ts - part of Image Quantization Library
 */

/**
 * v8 optimized class
 * 1) "constructor" should have initialization with worst types
 * 2) "set" should have |0 / >>> 0
 */
class Point {
  // Lab : { L : number; a : number; b : number };
  static createByQuadruplet(quadruplet) {
    const point = new Point();
    point.r = quadruplet[0] | 0;
    point.g = quadruplet[1] | 0;
    point.b = quadruplet[2] | 0;
    point.a = quadruplet[3] | 0;

    point._loadUINT32();

    point._loadQuadruplet(); // point._loadLab();


    return point;
  }

  static createByRGBA(red, green, blue, alpha) {
    const point = new Point();
    point.r = red | 0;
    point.g = green | 0;
    point.b = blue | 0;
    point.a = alpha | 0;

    point._loadUINT32();

    point._loadQuadruplet(); // point._loadLab();


    return point;
  }

  static createByUint32(uint32) {
    const point = new Point();
    point.uint32 = uint32 >>> 0;

    point._loadRGBA();

    point._loadQuadruplet(); // point._loadLab();


    return point;
  }

  constructor() {
    this.uint32 = -1 >>> 0;
    this.r = this.g = this.b = this.a = 0;
    this.rgba = new Array(4);
    this.rgba[0] = 0;
    this.rgba[1] = 0;
    this.rgba[2] = 0;
    this.rgba[3] = 0;
    /*
     this.Lab = {
     L : 0.0,
     a : 0.0,
     b : 0.0
     };
     */
  }

  from(point) {
    this.r = point.r;
    this.g = point.g;
    this.b = point.b;
    this.a = point.a;
    this.uint32 = point.uint32;
    this.rgba[0] = point.r;
    this.rgba[1] = point.g;
    this.rgba[2] = point.b;
    this.rgba[3] = point.a;
    /*
     this.Lab.L = point.Lab.L;
     this.Lab.a = point.Lab.a;
     this.Lab.b = point.Lab.b;
     */
  }
  /*
   * TODO:
   Luminance from RGB:
       Luminance (standard for certain colour spaces): (0.2126*R + 0.7152*G + 0.0722*B) [1]
   Luminance (perceived option 1): (0.299*R + 0.587*G + 0.114*B) [2]
   Luminance (perceived option 2, slower to calculate):  sqrt( 0.241*R^2 + 0.691*G^2 + 0.068*B^2 ) ? sqrt( 0.299*R^2 + 0.587*G^2 + 0.114*B^2 ) (thanks to @MatthewHerbst) [http://alienryderflex.com/hsp.html]
   */


  getLuminosity(useAlphaChannel) {
    let r = this.r;
    let g = this.g;
    let b = this.b;

    if (useAlphaChannel) {
      r = Math.min(255, 255 - this.a + this.a * r / 255);
      g = Math.min(255, 255 - this.a + this.a * g / 255);
      b = Math.min(255, 255 - this.a + this.a * b / 255);
    } // var luma = this.r * Point._RED_COEFFICIENT + this.g * Point._GREEN_COEFFICIENT + this.b * Point._BLUE_COEFFICIENT;

    /*
     if(useAlphaChannel) {
     luma = (luma * (255 - this.a)) / 255;
     }
     */


    return r * _bt.Y.RED + g * _bt.Y.GREEN + b * _bt.Y.BLUE;
  }

  _loadUINT32() {
    this.uint32 = (this.a << 24 | this.b << 16 | this.g << 8 | this.r) >>> 0;
  }

  _loadRGBA() {
    this.r = this.uint32 & 0xff;
    this.g = this.uint32 >>> 8 & 0xff;
    this.b = this.uint32 >>> 16 & 0xff;
    this.a = this.uint32 >>> 24 & 0xff;
  }

  _loadQuadruplet() {
    this.rgba[0] = this.r;
    this.rgba[1] = this.g;
    this.rgba[2] = this.b;
    this.rgba[3] = this.a;
    /*
     var xyz = rgb2xyz(this.r, this.g, this.b);
     var lab = xyz2lab(xyz.x, xyz.y, xyz.z);
     this.lab.l = lab.l;
     this.lab.a = lab.a;
     this.lab.b = lab.b;
     */
  }

}

exports.Point = Point;
},{"../constants/bt709":"node_modules/image-q/dist/esm/constants/bt709.js"}],"node_modules/image-q/dist/esm/utils/pointContainer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PointContainer = void 0;

var _point = require("./point");

/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * pointContainer.ts - part of Image Quantization Library
 */

/**
 * v8 optimizations done.
 * fromXXX methods are static to move out polymorphic code from class instance itself.
 */
class PointContainer {
  constructor() {
    this._width = 0;
    this._height = 0;
    this._pointArray = [];
  }

  getWidth() {
    return this._width;
  }

  getHeight() {
    return this._height;
  }

  setWidth(width) {
    this._width = width;
  }

  setHeight(height) {
    this._height = height;
  }

  getPointArray() {
    return this._pointArray;
  }

  clone() {
    const clone = new PointContainer();
    clone._width = this._width;
    clone._height = this._height;

    for (let i = 0, l = this._pointArray.length; i < l; i++) {
      clone._pointArray[i] = _point.Point.createByUint32(this._pointArray[i].uint32 | 0); // "| 0" is added for v8 optimization
    }

    return clone;
  }

  toUint32Array() {
    const l = this._pointArray.length;
    const uint32Array = new Uint32Array(l);

    for (let i = 0; i < l; i++) {
      uint32Array[i] = this._pointArray[i].uint32;
    }

    return uint32Array;
  }

  toUint8Array() {
    return new Uint8Array(this.toUint32Array().buffer);
  }

  static fromHTMLImageElement(img) {
    const width = img.naturalWidth;
    const height = img.naturalHeight;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d'); // tslint:disable-line:no-non-null-assertion

    ctx.drawImage(img, 0, 0, width, height, 0, 0, width, height);
    return PointContainer.fromHTMLCanvasElement(canvas);
  }

  static fromHTMLCanvasElement(canvas) {
    const width = canvas.width;
    const height = canvas.height;
    const ctx = canvas.getContext('2d'); // tslint:disable-line:no-non-null-assertion

    const imgData = ctx.getImageData(0, 0, width, height);
    return PointContainer.fromImageData(imgData);
  }

  static fromImageData(imageData) {
    const width = imageData.width;
    const height = imageData.height;
    return PointContainer.fromUint8Array(imageData.data, width, height);
  }

  static fromUint8Array(uint8Array, width, height) {
    switch (Object.prototype.toString.call(uint8Array)) {
      case '[object Uint8ClampedArray]':
      case '[object Uint8Array]':
        break;

      default:
        uint8Array = new Uint8Array(uint8Array);
    }

    const uint32Array = new Uint32Array(uint8Array.buffer);
    return PointContainer.fromUint32Array(uint32Array, width, height);
  }

  static fromUint32Array(uint32Array, width, height) {
    const container = new PointContainer();
    container._width = width;
    container._height = height;

    for (let i = 0, l = uint32Array.length; i < l; i++) {
      container._pointArray[i] = _point.Point.createByUint32(uint32Array[i] | 0); // "| 0" is added for v8 optimization
    }

    return container;
  }

  static fromBuffer(buffer, width, height) {
    const uint32Array = new Uint32Array(buffer.buffer, buffer.byteOffset, buffer.byteLength / Uint32Array.BYTES_PER_ELEMENT);
    return PointContainer.fromUint32Array(uint32Array, width, height);
  }

}

exports.PointContainer = PointContainer;
},{"./point":"node_modules/image-q/dist/esm/utils/point.js"}],"node_modules/image-q/dist/esm/utils/palette.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hueGroup = hueGroup;
exports.Palette = void 0;

var _pointContainer = require("./pointContainer");

var _rgb2hsl = require("../conversion/rgb2hsl");

/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * palette.ts - part of Image Quantization Library
 */
// TODO: make paletteArray via pointContainer, so, export will be available via pointContainer.exportXXX
const hueGroups = 10;

function hueGroup(hue, segmentsNumber) {
  const maxHue = 360;
  const seg = maxHue / segmentsNumber;
  const half = seg / 2;

  for (let i = 1, mid = seg - half; i < segmentsNumber; i++, mid += seg) {
    if (hue >= mid && hue < mid + seg) return i;
  }

  return 0;
}

class Palette {
  constructor() {
    this._pointArray = [];
    this._i32idx = {};
    this._pointContainer = new _pointContainer.PointContainer();

    this._pointContainer.setHeight(1);

    this._pointArray = this._pointContainer.getPointArray();
  }

  add(color) {
    this._pointArray.push(color);

    this._pointContainer.setWidth(this._pointArray.length);
  }

  has(color) {
    for (let i = this._pointArray.length - 1; i >= 0; i--) {
      if (color.uint32 === this._pointArray[i].uint32) return true;
    }

    return false;
  } // TOTRY: use HUSL - http://boronine.com/husl/ http://www.husl-colors.org/ https://github.com/husl-colors/husl


  getNearestColor(colorDistanceCalculator, color) {
    return this._pointArray[this._getNearestIndex(colorDistanceCalculator, color) | 0];
  }

  getPointContainer() {
    return this._pointContainer;
  } // TOTRY: use HUSL - http://boronine.com/husl/

  /*
   public nearestIndexByUint32(i32) {
   var idx : number = this._nearestPointFromCache("" + i32);
   if (idx >= 0) return idx;
       var min = 1000,
   rgb = [
   (i32 & 0xff),
   (i32 >>> 8) & 0xff,
   (i32 >>> 16) & 0xff,
   (i32 >>> 24) & 0xff
   ],
   len = this._pointArray.length;
       idx = 0;
   for (var i = 0; i < len; i++) {
   var dist = Utils.distEuclidean(rgb, this._pointArray[i].rgba);
       if (dist < min) {
   min = dist;
   idx = i;
   }
   }
       this._i32idx[i32] = idx;
   return idx;
   }
   */


  _nearestPointFromCache(key) {
    return typeof this._i32idx[key] === 'number' ? this._i32idx[key] : -1;
  }

  _getNearestIndex(colorDistanceCalculator, point) {
    let idx = this._nearestPointFromCache('' + point.uint32);

    if (idx >= 0) return idx;
    let minimalDistance = Number.MAX_VALUE;
    idx = 0;

    for (let i = 0, l = this._pointArray.length; i < l; i++) {
      const p = this._pointArray[i];
      const distance = colorDistanceCalculator.calculateRaw(point.r, point.g, point.b, point.a, p.r, p.g, p.b, p.a);

      if (distance < minimalDistance) {
        minimalDistance = distance;
        idx = i;
      }
    }

    this._i32idx[point.uint32] = idx;
    return idx;
  }
  /*
   public reduce(histogram : ColorHistogram, colors : number) {
   if (this._pointArray.length > colors) {
   var idxi32 = histogram.getImportanceSortedColorsIDXI32();
       // quantize histogram to existing palette
   var keep = [], uniqueColors = 0, idx, pruned = false;
       for (var i = 0, len = idxi32.length; i < len; i++) {
   // palette length reached, unset all remaining colors (sparse palette)
   if (uniqueColors >= colors) {
   this.prunePal(keep);
   pruned = true;
   break;
   } else {
   idx = this.nearestIndexByUint32(idxi32[i]);
   if (keep.indexOf(idx) < 0) {
   keep.push(idx);
   uniqueColors++;
   }
   }
   }
       if (!pruned) {
   this.prunePal(keep);
   }
   }
   }
       // TODO: check usage, not tested!
   public prunePal(keep : number[]) {
   var colors = this._pointArray.length;
   for (var colorIndex = colors - 1; colorIndex >= 0; colorIndex--) {
   if (keep.indexOf(colorIndex) < 0) {
       if(colorIndex + 1 < colors) {
   this._pointArray[ colorIndex ] = this._pointArray [ colors - 1 ];
   }
   --colors;
   //this._pointArray[colorIndex] = null;
   }
   }
   console.log("colors pruned: " + (this._pointArray.length - colors));
   this._pointArray.length = colors;
   this._i32idx = {};
   }
   */
  // TODO: group very low lum and very high lum colors
  // TODO: pass custom sort order
  // TODO: sort criteria function should be placed to HueStats class


  sort() {
    this._i32idx = {};

    this._pointArray.sort((a, b) => {
      const hslA = (0, _rgb2hsl.rgb2hsl)(a.r, a.g, a.b);
      const hslB = (0, _rgb2hsl.rgb2hsl)(b.r, b.g, b.b); // sort all grays + whites together

      const hueA = a.r === a.g && a.g === a.b ? 0 : 1 + hueGroup(hslA.h, hueGroups);
      const hueB = b.r === b.g && b.g === b.b ? 0 : 1 + hueGroup(hslB.h, hueGroups);
      /*
       var hueA = (a.r === a.g && a.g === a.b) ? 0 : 1 + Utils.hueGroup(hslA.h, hueGroups);
       var hueB = (b.r === b.g && b.g === b.b) ? 0 : 1 + Utils.hueGroup(hslB.h, hueGroups);
       */

      const hueDiff = hueB - hueA;
      if (hueDiff) return -hueDiff;
      /*
       var lumDiff = Utils.lumGroup(+hslB.l.toFixed(2)) - Utils.lumGroup(+hslA.l.toFixed(2));
       if (lumDiff) return -lumDiff;
       */

      const lA = a.getLuminosity(true);
      const lB = b.getLuminosity(true);
      if (lB - lA !== 0) return lB - lA;
      const satDiff = (hslB.s * 100 | 0) - (hslA.s * 100 | 0);
      if (satDiff) return -satDiff;
      return 0;
    });
  }

}

exports.Palette = Palette;
},{"./pointContainer":"node_modules/image-q/dist/esm/utils/pointContainer.js","../conversion/rgb2hsl":"node_modules/image-q/dist/esm/conversion/rgb2hsl.js"}],"node_modules/image-q/dist/esm/utils/hueStatistics.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HueStatistics = void 0;

var _rgb2hsl = require("../conversion/rgb2hsl");

var _palette = require("./palette");

/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * hueStatistics.ts - part of Image Quantization Library
 */
class HueGroup {
  constructor() {
    this.num = 0;
    this.cols = [];
  }

}

class HueStatistics {
  constructor(numGroups, minCols) {
    this._numGroups = numGroups;
    this._minCols = minCols;
    this._stats = [];

    for (let i = 0; i <= numGroups; i++) {
      this._stats[i] = new HueGroup();
    }

    this._groupsFull = 0;
  }

  check(i32) {
    if (this._groupsFull === this._numGroups + 1) {
      this.check = function () {};
    }

    const r = i32 & 0xff;
    const g = i32 >>> 8 & 0xff;
    const b = i32 >>> 16 & 0xff;
    const hg = r === g && g === b ? 0 : 1 + (0, _palette.hueGroup)((0, _rgb2hsl.rgb2hsl)(r, g, b).h, this._numGroups);
    const gr = this._stats[hg];
    const min = this._minCols;
    gr.num++;

    if (gr.num > min) {
      return;
    }

    if (gr.num === min) {
      this._groupsFull++;
    }

    if (gr.num <= min) {
      this._stats[hg].cols.push(i32);
    }
  }

  injectIntoDictionary(histG) {
    for (let i = 0; i <= this._numGroups; i++) {
      if (this._stats[i].num <= this._minCols) {
        this._stats[i].cols.forEach(col => {
          if (!histG[col]) {
            histG[col] = 1;
          } else {
            histG[col]++;
          }
        });
      }
    }
  }

  injectIntoArray(histG) {
    for (let i = 0; i <= this._numGroups; i++) {
      if (this._stats[i].num <= this._minCols) {
        this._stats[i].cols.forEach(col => {
          if (histG.indexOf(col) === -1) {
            histG.push(col);
          }
        });
      }
    }
  }

}

exports.HueStatistics = HueStatistics;
},{"../conversion/rgb2hsl":"node_modules/image-q/dist/esm/conversion/rgb2hsl.js","./palette":"node_modules/image-q/dist/esm/utils/palette.js"}],"node_modules/image-q/dist/esm/utils/progressTracker.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProgressTracker = void 0;

class ProgressTracker {
  constructor(valueRange, progressRange) {
    this._range = valueRange;
    this._progressRange = progressRange;
    this._step = Math.max(1, this._range / (ProgressTracker.steps + 1) | 0);
    this._last = -this._step;
    this.progress = 0;
  }

  shouldNotify(current) {
    if (current - this._last >= this._step) {
      this._last = current;
      this.progress = Math.min(this._progressRange * this._last / this._range, this._progressRange);
      return true;
    }

    return false;
  }

}

exports.ProgressTracker = ProgressTracker;
ProgressTracker.steps = 100;
},{}],"node_modules/image-q/dist/esm/utils/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "HueStatistics", {
  enumerable: true,
  get: function () {
    return _hueStatistics.HueStatistics;
  }
});
Object.defineProperty(exports, "Palette", {
  enumerable: true,
  get: function () {
    return _palette.Palette;
  }
});
Object.defineProperty(exports, "Point", {
  enumerable: true,
  get: function () {
    return _point.Point;
  }
});
Object.defineProperty(exports, "PointContainer", {
  enumerable: true,
  get: function () {
    return _pointContainer.PointContainer;
  }
});
Object.defineProperty(exports, "ProgressTracker", {
  enumerable: true,
  get: function () {
    return _progressTracker.ProgressTracker;
  }
});
exports.arithmetic = void 0;

var arithmetic = _interopRequireWildcard(require("./arithmetic"));

exports.arithmetic = arithmetic;

var _hueStatistics = require("./hueStatistics");

var _palette = require("./palette");

var _point = require("./point");

var _pointContainer = require("./pointContainer");

var _progressTracker = require("./progressTracker");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
},{"./arithmetic":"node_modules/image-q/dist/esm/utils/arithmetic.js","./hueStatistics":"node_modules/image-q/dist/esm/utils/hueStatistics.js","./palette":"node_modules/image-q/dist/esm/utils/palette.js","./point":"node_modules/image-q/dist/esm/utils/point.js","./pointContainer":"node_modules/image-q/dist/esm/utils/pointContainer.js","./progressTracker":"node_modules/image-q/dist/esm/utils/progressTracker.js"}],"node_modules/image-q/dist/esm/palette/neuquant/neuquant.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NeuQuant = void 0;

var _palette = require("../../utils/palette");

var _point = require("../../utils/point");

var _paletteQuantizer = require("../paletteQuantizer");

var _utils = require("../../utils");

/*
 * NeuQuant Neural-Net Quantization Algorithm
 * ------------------------------------------
 *
 * Copyright (c) 1994 Anthony Dekker
 *
 * NEUQUANT Neural-Net quantization algorithm by Anthony Dekker, 1994. See
 * "Kohonen neural networks for optimal colour quantization" in "Network:
 * Computation in Neural Systems" Vol. 5 (1994) pp 351-367. for a discussion of
 * the algorithm.
 *
 * Any party obtaining a copy of these files from the author, directly or
 * indirectly, is granted, free of charge, a full and unrestricted irrevocable,
 * world-wide, paid up, royalty-free, nonexclusive right and license to deal in
 * this software and documentation files (the "Software"), including without
 * limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons who
 * receive copies from any such party to do so, with the only requirement being
 * that this copyright notice remain intact.
 */

/**
 * @preserve TypeScript port:
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * neuquant.ts - part of Image Quantization Library
 */
// bias for colour values
const networkBiasShift = 3;

class Neuron {
  constructor(defaultValue) {
    this.r = this.g = this.b = this.a = defaultValue;
  }
  /**
   * There is a fix in original NEUQUANT by Anthony Dekker (http://members.ozemail.com.au/~dekker/NEUQUANT.HTML)
   * @example
   * r = Math.min(255, (neuron.r + (1 << (networkBiasShift - 1))) >> networkBiasShift);
   */


  toPoint() {
    return _point.Point.createByRGBA(this.r >> networkBiasShift, this.g >> networkBiasShift, this.b >> networkBiasShift, this.a >> networkBiasShift);
  }

  subtract(r, g, b, a) {
    this.r -= r | 0;
    this.g -= g | 0;
    this.b -= b | 0;
    this.a -= a | 0;
  }

}

class NeuQuant extends _paletteQuantizer.AbstractPaletteQuantizer {
  constructor(colorDistanceCalculator, colors = 256) {
    super();
    this._distance = colorDistanceCalculator;
    this._pointArray = [];
    this._sampleFactor = 1;
    this._networkSize = colors;

    this._distance.setWhitePoint(255 << networkBiasShift, 255 << networkBiasShift, 255 << networkBiasShift, 255 << networkBiasShift);
  }

  sample(pointContainer) {
    this._pointArray = this._pointArray.concat(pointContainer.getPointArray());
  }

  *quantize() {
    this._init();

    yield* this._learn();
    yield {
      palette: this._buildPalette(),
      progress: 100
    };
  }

  _init() {
    this._freq = [];
    this._bias = [];
    this._radPower = [];
    this._network = [];

    for (let i = 0; i < this._networkSize; i++) {
      this._network[i] = new Neuron((i << networkBiasShift + 8) / this._networkSize | 0); // 1/this._networkSize

      this._freq[i] = NeuQuant._initialBias / this._networkSize | 0;
      this._bias[i] = 0;
    }
  }
  /**
   * Main Learning Loop
   */


  *_learn() {
    let sampleFactor = this._sampleFactor;
    const pointsNumber = this._pointArray.length;
    if (pointsNumber < NeuQuant._minpicturebytes) sampleFactor = 1;
    const alphadec = 30 + (sampleFactor - 1) / 3 | 0;
    const pointsToSample = pointsNumber / sampleFactor | 0;
    let delta = pointsToSample / NeuQuant._nCycles | 0;
    let alpha = NeuQuant._initAlpha;
    let radius = (this._networkSize >> 3) * NeuQuant._radiusBias;
    let rad = radius >> NeuQuant._radiusBiasShift;
    if (rad <= 1) rad = 0;

    for (let i = 0; i < rad; i++) {
      this._radPower[i] = alpha * ((rad * rad - i * i) * NeuQuant._radBias / (rad * rad)) >>> 0;
    }

    let step;

    if (pointsNumber < NeuQuant._minpicturebytes) {
      step = 1;
    } else if (pointsNumber % NeuQuant._prime1 !== 0) {
      step = NeuQuant._prime1;
    } else if (pointsNumber % NeuQuant._prime2 !== 0) {
      step = NeuQuant._prime2;
    } else if (pointsNumber % NeuQuant._prime3 !== 0) {
      step = NeuQuant._prime3;
    } else {
      step = NeuQuant._prime4;
    }

    const tracker = new _utils.ProgressTracker(pointsToSample, 99);

    for (let i = 0, pointIndex = 0; i < pointsToSample;) {
      if (tracker.shouldNotify(i)) {
        yield {
          progress: tracker.progress
        };
      }

      const point = this._pointArray[pointIndex];
      const b = point.b << networkBiasShift;
      const g = point.g << networkBiasShift;
      const r = point.r << networkBiasShift;
      const a = point.a << networkBiasShift;

      const neuronIndex = this._contest(b, g, r, a);

      this._alterSingle(alpha, neuronIndex, b, g, r, a);

      if (rad !== 0) this._alterNeighbour(rad, neuronIndex, b, g, r, a);
      /* alter neighbours */

      pointIndex += step;
      if (pointIndex >= pointsNumber) pointIndex -= pointsNumber;
      i++;
      if (delta === 0) delta = 1;

      if (i % delta === 0) {
        alpha -= alpha / alphadec | 0;
        radius -= radius / NeuQuant._radiusDecrease | 0;
        rad = radius >> NeuQuant._radiusBiasShift;
        if (rad <= 1) rad = 0;

        for (let j = 0; j < rad; j++) this._radPower[j] = alpha * ((rad * rad - j * j) * NeuQuant._radBias / (rad * rad)) >>> 0;
      }
    }
  }

  _buildPalette() {
    const palette = new _palette.Palette();

    this._network.forEach(neuron => {
      palette.add(neuron.toPoint());
    });

    palette.sort();
    return palette;
  }
  /**
   * Move adjacent neurons by precomputed alpha*(1-((i-j)^2/[r]^2)) in radpower[|i-j|]
   */


  _alterNeighbour(rad, i, b, g, r, al) {
    let lo = i - rad;
    if (lo < -1) lo = -1;
    let hi = i + rad;
    if (hi > this._networkSize) hi = this._networkSize;
    let j = i + 1;
    let k = i - 1;
    let m = 1;

    while (j < hi || k > lo) {
      const a = this._radPower[m++] / NeuQuant._alphaRadBias;

      if (j < hi) {
        const p = this._network[j++];
        p.subtract(a * (p.r - r), a * (p.g - g), a * (p.b - b), a * (p.a - al));
      }

      if (k > lo) {
        const p = this._network[k--];
        p.subtract(a * (p.r - r), a * (p.g - g), a * (p.b - b), a * (p.a - al));
      }
    }
  }
  /**
   * Move neuron i towards biased (b,g,r) by factor alpha
   */


  _alterSingle(alpha, i, b, g, r, a) {
    alpha /= NeuQuant._initAlpha;
    /* alter hit neuron */

    const n = this._network[i];
    n.subtract(alpha * (n.r - r), alpha * (n.g - g), alpha * (n.b - b), alpha * (n.a - a));
  }
  /**
   * Search for biased BGR values
   * description:
   *    finds closest neuron (min dist) and updates freq
   *    finds best neuron (min dist-bias) and returns position
   *    for frequently chosen neurons, freq[i] is high and bias[i] is negative
   *    bias[i] = _gamma*((1/this._networkSize)-freq[i])
   *
   * Original distance equation:
   *        dist = abs(dR) + abs(dG) + abs(dB)
   */


  _contest(b, g, r, a) {
    const multiplier = 255 * 4 << networkBiasShift;
    let bestd = ~(1 << 31);
    let bestbiasd = bestd;
    let bestpos = -1;
    let bestbiaspos = bestpos;

    for (let i = 0; i < this._networkSize; i++) {
      const n = this._network[i];
      const dist = this._distance.calculateNormalized(n, {
        r,
        g,
        b,
        a
      }) * multiplier | 0;

      if (dist < bestd) {
        bestd = dist;
        bestpos = i;
      }

      const biasdist = dist - (this._bias[i] >> NeuQuant._initialBiasShift - networkBiasShift);

      if (biasdist < bestbiasd) {
        bestbiasd = biasdist;
        bestbiaspos = i;
      }

      const betafreq = this._freq[i] >> NeuQuant._betaShift;
      this._freq[i] -= betafreq;
      this._bias[i] += betafreq << NeuQuant._gammaShift;
    }

    this._freq[bestpos] += NeuQuant._beta;
    this._bias[bestpos] -= NeuQuant._betaGamma;
    return bestbiaspos;
  }

}
/*
 four primes near 500 - assume no image has a length so large
 that it is divisible by all four primes
 */


exports.NeuQuant = NeuQuant;
NeuQuant._prime1 = 499;
NeuQuant._prime2 = 491;
NeuQuant._prime3 = 487;
NeuQuant._prime4 = 503;
NeuQuant._minpicturebytes = NeuQuant._prime4; // no. of learning cycles

NeuQuant._nCycles = 100; // defs for freq and bias

NeuQuant._initialBiasShift = 16; // bias for fractions

NeuQuant._initialBias = 1 << NeuQuant._initialBiasShift;
NeuQuant._gammaShift = 10; // gamma = 1024
// TODO: why gamma is never used?
// private static _gamma : number     = (1 << NeuQuant._gammaShift);

NeuQuant._betaShift = 10;
NeuQuant._beta = NeuQuant._initialBias >> NeuQuant._betaShift; // beta = 1/1024

NeuQuant._betaGamma = NeuQuant._initialBias << NeuQuant._gammaShift - NeuQuant._betaShift;
/*
 * for 256 cols, radius starts
 */

NeuQuant._radiusBiasShift = 6; // at 32.0 biased by 6 bits

NeuQuant._radiusBias = 1 << NeuQuant._radiusBiasShift; // and decreases by a factor of 1/30 each cycle

NeuQuant._radiusDecrease = 30;
/* defs for decreasing alpha factor */
// alpha starts at 1.0

NeuQuant._alphaBiasShift = 10; // biased by 10 bits

NeuQuant._initAlpha = 1 << NeuQuant._alphaBiasShift;
/* radBias and alphaRadBias used for radpower calculation */

NeuQuant._radBiasShift = 8;
NeuQuant._radBias = 1 << NeuQuant._radBiasShift;
NeuQuant._alphaRadBiasShift = NeuQuant._alphaBiasShift + NeuQuant._radBiasShift;
NeuQuant._alphaRadBias = 1 << NeuQuant._alphaRadBiasShift;
},{"../../utils/palette":"node_modules/image-q/dist/esm/utils/palette.js","../../utils/point":"node_modules/image-q/dist/esm/utils/point.js","../paletteQuantizer":"node_modules/image-q/dist/esm/palette/paletteQuantizer.js","../../utils":"node_modules/image-q/dist/esm/utils/index.js"}],"node_modules/image-q/dist/esm/palette/neuquant/neuquantFloat.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NeuQuantFloat = void 0;

var _palette = require("../../utils/palette");

var _point = require("../../utils/point");

var _paletteQuantizer = require("../paletteQuantizer");

var _utils = require("../../utils");

/*
 * NeuQuantFloat Neural-Net Quantization Algorithm
 * ------------------------------------------
 *
 * Copyright (c) 1994 Anthony Dekker
 *
 * NEUQUANT Neural-Net quantization algorithm by Anthony Dekker, 1994. See
 * "Kohonen neural networks for optimal colour quantization" in "Network:
 * Computation in Neural Systems" Vol. 5 (1994) pp 351-367. for a discussion of
 * the algorithm.
 *
 * Any party obtaining a copy of these files from the author, directly or
 * indirectly, is granted, free of charge, a full and unrestricted irrevocable,
 * world-wide, paid up, royalty-free, nonexclusive right and license to deal in
 * this software and documentation files (the "Software"), including without
 * limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons who
 * receive copies from any such party to do so, with the only requirement being
 * that this copyright notice remain intact.
 */

/**
 * @preserve TypeScript port:
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * neuquant.ts - part of Image Quantization Library
 */
// bias for colour values
const networkBiasShift = 3;

class NeuronFloat {
  constructor(defaultValue) {
    this.r = this.g = this.b = this.a = defaultValue;
  }
  /**
   * There is a fix in original NEUQUANT by Anthony Dekker (http://members.ozemail.com.au/~dekker/NEUQUANT.HTML)
   * @example
   * r = Math.min(255, (neuron.r + (1 << (networkBiasShift - 1))) >> networkBiasShift);
   */


  toPoint() {
    return _point.Point.createByRGBA(this.r >> networkBiasShift, this.g >> networkBiasShift, this.b >> networkBiasShift, this.a >> networkBiasShift);
  }

  subtract(r, g, b, a) {
    this.r -= r;
    this.g -= g;
    this.b -= b;
    this.a -= a;
  }

}

class NeuQuantFloat extends _paletteQuantizer.AbstractPaletteQuantizer {
  constructor(colorDistanceCalculator, colors = 256) {
    super();
    this._distance = colorDistanceCalculator;
    this._pointArray = [];
    this._sampleFactor = 1;
    this._networkSize = colors;

    this._distance.setWhitePoint(255 << networkBiasShift, 255 << networkBiasShift, 255 << networkBiasShift, 255 << networkBiasShift);
  }

  sample(pointContainer) {
    this._pointArray = this._pointArray.concat(pointContainer.getPointArray());
  }

  *quantize() {
    this._init();

    yield* this._learn();
    yield {
      palette: this._buildPalette(),
      progress: 100
    };
  }

  _init() {
    this._freq = [];
    this._bias = [];
    this._radPower = [];
    this._network = [];

    for (let i = 0; i < this._networkSize; i++) {
      this._network[i] = new NeuronFloat((i << networkBiasShift + 8) / this._networkSize); // 1/this._networkSize

      this._freq[i] = NeuQuantFloat._initialBias / this._networkSize;
      this._bias[i] = 0;
    }
  }
  /**
   * Main Learning Loop
   */


  *_learn() {
    let sampleFactor = this._sampleFactor;
    const pointsNumber = this._pointArray.length;
    if (pointsNumber < NeuQuantFloat._minpicturebytes) sampleFactor = 1;
    const alphadec = 30 + (sampleFactor - 1) / 3;
    const pointsToSample = pointsNumber / sampleFactor;
    let delta = pointsToSample / NeuQuantFloat._nCycles | 0;
    let alpha = NeuQuantFloat._initAlpha;
    let radius = (this._networkSize >> 3) * NeuQuantFloat._radiusBias;
    let rad = radius >> NeuQuantFloat._radiusBiasShift;
    if (rad <= 1) rad = 0;

    for (let i = 0; i < rad; i++) {
      this._radPower[i] = alpha * ((rad * rad - i * i) * NeuQuantFloat._radBias / (rad * rad));
    }

    let step;

    if (pointsNumber < NeuQuantFloat._minpicturebytes) {
      step = 1;
    } else if (pointsNumber % NeuQuantFloat._prime1 !== 0) {
      step = NeuQuantFloat._prime1;
    } else if (pointsNumber % NeuQuantFloat._prime2 !== 0) {
      step = NeuQuantFloat._prime2;
    } else if (pointsNumber % NeuQuantFloat._prime3 !== 0) {
      step = NeuQuantFloat._prime3;
    } else {
      step = NeuQuantFloat._prime4;
    }

    const tracker = new _utils.ProgressTracker(pointsToSample, 99);

    for (let i = 0, pointIndex = 0; i < pointsToSample;) {
      if (tracker.shouldNotify(i)) {
        yield {
          progress: tracker.progress
        };
      }

      const point = this._pointArray[pointIndex];
      const b = point.b << networkBiasShift;
      const g = point.g << networkBiasShift;
      const r = point.r << networkBiasShift;
      const a = point.a << networkBiasShift;

      const neuronIndex = this._contest(b, g, r, a);

      this._alterSingle(alpha, neuronIndex, b, g, r, a);

      if (rad !== 0) this._alterNeighbour(rad, neuronIndex, b, g, r, a);
      /* alter neighbours */

      pointIndex += step;
      if (pointIndex >= pointsNumber) pointIndex -= pointsNumber;
      i++;
      if (delta === 0) delta = 1;

      if (i % delta === 0) {
        alpha -= alpha / alphadec;
        radius -= radius / NeuQuantFloat._radiusDecrease;
        rad = radius >> NeuQuantFloat._radiusBiasShift;
        if (rad <= 1) rad = 0;

        for (let j = 0; j < rad; j++) this._radPower[j] = alpha * ((rad * rad - j * j) * NeuQuantFloat._radBias / (rad * rad));
      }
    }
  }

  _buildPalette() {
    const palette = new _palette.Palette();

    this._network.forEach(neuron => {
      palette.add(neuron.toPoint());
    });

    palette.sort();
    return palette;
  }
  /**
   * Move adjacent neurons by precomputed alpha*(1-((i-j)^2/[r]^2)) in radpower[|i-j|]
   */


  _alterNeighbour(rad, i, b, g, r, al) {
    let lo = i - rad;
    if (lo < -1) lo = -1;
    let hi = i + rad;
    if (hi > this._networkSize) hi = this._networkSize;
    let j = i + 1;
    let k = i - 1;
    let m = 1;

    while (j < hi || k > lo) {
      const a = this._radPower[m++] / NeuQuantFloat._alphaRadBias;

      if (j < hi) {
        const p = this._network[j++];
        p.subtract(a * (p.r - r), a * (p.g - g), a * (p.b - b), a * (p.a - al));
      }

      if (k > lo) {
        const p = this._network[k--];
        p.subtract(a * (p.r - r), a * (p.g - g), a * (p.b - b), a * (p.a - al));
      }
    }
  }
  /**
   * Move neuron i towards biased (b,g,r) by factor alpha
   */


  _alterSingle(alpha, i, b, g, r, a) {
    alpha /= NeuQuantFloat._initAlpha;
    /* alter hit neuron */

    const n = this._network[i];
    n.subtract(alpha * (n.r - r), alpha * (n.g - g), alpha * (n.b - b), alpha * (n.a - a));
  }
  /**
   * Search for biased BGR values
   * description:
   *    finds closest neuron (min dist) and updates freq
   *    finds best neuron (min dist-bias) and returns position
   *    for frequently chosen neurons, freq[i] is high and bias[i] is negative
   *    bias[i] = _gamma*((1/this._networkSize)-freq[i])
   *
   * Original distance equation:
   *        dist = abs(dR) + abs(dG) + abs(dB)
   */


  _contest(b, g, r, al) {
    const multiplier = 255 * 4 << networkBiasShift;
    let bestd = ~(1 << 31);
    let bestbiasd = bestd;
    let bestpos = -1;
    let bestbiaspos = bestpos;

    for (let i = 0; i < this._networkSize; i++) {
      const n = this._network[i];
      const dist = this._distance.calculateNormalized(n, {
        r,
        g,
        b,
        a: al
      }) * multiplier;

      if (dist < bestd) {
        bestd = dist;
        bestpos = i;
      }

      const biasdist = dist - (this._bias[i] >> NeuQuantFloat._initialBiasShift - networkBiasShift);

      if (biasdist < bestbiasd) {
        bestbiasd = biasdist;
        bestbiaspos = i;
      }

      const betafreq = this._freq[i] >> NeuQuantFloat._betaShift;
      this._freq[i] -= betafreq;
      this._bias[i] += betafreq << NeuQuantFloat._gammaShift;
    }

    this._freq[bestpos] += NeuQuantFloat._beta;
    this._bias[bestpos] -= NeuQuantFloat._betaGamma;
    return bestbiaspos;
  }

}
/*
 four primes near 500 - assume no image has a length so large
 that it is divisible by all four primes
 */


exports.NeuQuantFloat = NeuQuantFloat;
NeuQuantFloat._prime1 = 499;
NeuQuantFloat._prime2 = 491;
NeuQuantFloat._prime3 = 487;
NeuQuantFloat._prime4 = 503;
NeuQuantFloat._minpicturebytes = NeuQuantFloat._prime4; // no. of learning cycles

NeuQuantFloat._nCycles = 100; // defs for freq and bias

NeuQuantFloat._initialBiasShift = 16; // bias for fractions

NeuQuantFloat._initialBias = 1 << NeuQuantFloat._initialBiasShift;
NeuQuantFloat._gammaShift = 10; // gamma = 1024
// TODO: why gamma is never used?
// private static _gamma : number     = (1 << NeuQuantFloat._gammaShift);

NeuQuantFloat._betaShift = 10;
NeuQuantFloat._beta = NeuQuantFloat._initialBias >> NeuQuantFloat._betaShift; // beta = 1/1024

NeuQuantFloat._betaGamma = NeuQuantFloat._initialBias << NeuQuantFloat._gammaShift - NeuQuantFloat._betaShift;
/*
 * for 256 cols, radius starts
 */

NeuQuantFloat._radiusBiasShift = 6; // at 32.0 biased by 6 bits

NeuQuantFloat._radiusBias = 1 << NeuQuantFloat._radiusBiasShift; // and decreases by a factor of 1/30 each cycle

NeuQuantFloat._radiusDecrease = 30;
/* defs for decreasing alpha factor */
// alpha starts at 1.0

NeuQuantFloat._alphaBiasShift = 10; // biased by 10 bits

NeuQuantFloat._initAlpha = 1 << NeuQuantFloat._alphaBiasShift;
/* radBias and alphaRadBias used for radpower calculation */

NeuQuantFloat._radBiasShift = 8;
NeuQuantFloat._radBias = 1 << NeuQuantFloat._radBiasShift;
NeuQuantFloat._alphaRadBiasShift = NeuQuantFloat._alphaBiasShift + NeuQuantFloat._radBiasShift;
NeuQuantFloat._alphaRadBias = 1 << NeuQuantFloat._alphaRadBiasShift;
},{"../../utils/palette":"node_modules/image-q/dist/esm/utils/palette.js","../../utils/point":"node_modules/image-q/dist/esm/utils/point.js","../paletteQuantizer":"node_modules/image-q/dist/esm/palette/paletteQuantizer.js","../../utils":"node_modules/image-q/dist/esm/utils/index.js"}],"node_modules/image-q/dist/esm/palette/rgbquant/colorHistogram.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColorHistogram = void 0;

var _hueStatistics = require("../../utils/hueStatistics");

var _arithmetic = require("../../utils/arithmetic");

/*
 * Copyright (c) 2015, Leon Sorokin
 * All rights reserved. (MIT Licensed)
 *
 * ColorHistogram.js - an image quantization lib
 */

/**
 * @preserve TypeScript port:
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * colorHistogram.ts - part of Image Quantization Library
 */
class ColorHistogram {
  constructor(method, colors) {
    // 1 = by global population, 2 = subregion population threshold
    this._method = method; // if > 0, enables hues stats and min-color retention per group

    this._minHueCols = colors << 2; // opts.minHueCols || 0;
    // # of highest-frequency colors to start with for palette reduction

    this._initColors = colors << 2; // HueStatistics instance

    this._hueStats = new _hueStatistics.HueStatistics(ColorHistogram._hueGroups, this._minHueCols);
    this._histogram = Object.create(null); // tslint:disable-line:no-null-keyword
  }

  sample(pointContainer) {
    switch (this._method) {
      case 1:
        this._colorStats1D(pointContainer);

        break;

      case 2:
        this._colorStats2D(pointContainer);

        break;
    }
  }

  getImportanceSortedColorsIDXI32() {
    // TODO: fix typing issue in stableSort func
    const sorted = (0, _arithmetic.stableSort)(Object.keys(this._histogram), (a, b) => this._histogram[b] - this._histogram[a]);

    if (sorted.length === 0) {
      return [];
    }

    let idxi32;

    switch (this._method) {
      case 1:
        const initialColorsLimit = Math.min(sorted.length, this._initColors);
        const last = sorted[initialColorsLimit - 1];
        const freq = this._histogram[last];
        idxi32 = sorted.slice(0, initialColorsLimit); // add any cut off colors with same freq as last

        let pos = initialColorsLimit;
        const len = sorted.length;

        while (pos < len && this._histogram[sorted[pos]] === freq) {
          idxi32.push(sorted[pos++]);
        } // inject min huegroup colors


        this._hueStats.injectIntoArray(idxi32);

        break;

      case 2:
        idxi32 = sorted;
        break;

      default:
        // TODO: rethink errors
        throw new Error('Incorrect method');
    } // int32-ify values


    return idxi32.map(function (v) {
      return +v;
    });
  } // global top-population


  _colorStats1D(pointContainer) {
    const histG = this._histogram;
    const pointArray = pointContainer.getPointArray();
    const len = pointArray.length;

    for (let i = 0; i < len; i++) {
      const col = pointArray[i].uint32; // collect hue stats

      this._hueStats.check(col);

      if (col in histG) {
        histG[col]++;
      } else {
        histG[col] = 1;
      }
    }
  } // population threshold within subregions
  // FIXME: this can over-reduce (few/no colors same?), need a way to keep
  // important colors that dont ever reach local thresholds (gradients?)


  _colorStats2D(pointContainer) {
    const width = pointContainer.getWidth();
    const height = pointContainer.getHeight();
    const pointArray = pointContainer.getPointArray();
    const boxW = ColorHistogram._boxSize[0];
    const boxH = ColorHistogram._boxSize[1];
    const area = boxW * boxH;

    const boxes = this._makeBoxes(width, height, boxW, boxH);

    const histG = this._histogram;
    boxes.forEach(box => {
      let effc = Math.round(box.w * box.h / area) * ColorHistogram._boxPixels;

      if (effc < 2) effc = 2;
      const histL = {};

      this._iterateBox(box, width, i => {
        const col = pointArray[i].uint32; // collect hue stats

        this._hueStats.check(col);

        if (col in histG) {
          histG[col]++;
        } else if (col in histL) {
          if (++histL[col] >= effc) {
            histG[col] = histL[col];
          }
        } else {
          histL[col] = 1;
        }
      });
    }); // inject min huegroup colors

    this._hueStats.injectIntoDictionary(histG);
  } // iterates @bbox within a parent rect of width @wid; calls @fn, passing index within parent


  _iterateBox(bbox, wid, fn) {
    const b = bbox;
    const i0 = b.y * wid + b.x;
    const i1 = (b.y + b.h - 1) * wid + (b.x + b.w - 1);
    const incr = wid - b.w + 1;
    let cnt = 0;
    let i = i0;

    do {
      fn.call(this, i);
      i += ++cnt % b.w === 0 ? incr : 1;
    } while (i <= i1);
  }
  /**
   *    partitions a rectangle of width x height into
   *    array of boxes stepX x stepY (or less)
   */


  _makeBoxes(width, height, stepX, stepY) {
    const wrem = width % stepX;
    const hrem = height % stepY;
    const xend = width - wrem;
    const yend = height - hrem;
    const boxesArray = [];

    for (let y = 0; y < height; y += stepY) {
      for (let x = 0; x < width; x += stepX) {
        boxesArray.push({
          x,
          y,
          w: x === xend ? wrem : stepX,
          h: y === yend ? hrem : stepY
        });
      }
    }

    return boxesArray;
  }

}

exports.ColorHistogram = ColorHistogram;
ColorHistogram._boxSize = [64, 64];
ColorHistogram._boxPixels = 2;
ColorHistogram._hueGroups = 10;
},{"../../utils/hueStatistics":"node_modules/image-q/dist/esm/utils/hueStatistics.js","../../utils/arithmetic":"node_modules/image-q/dist/esm/utils/arithmetic.js"}],"node_modules/image-q/dist/esm/palette/rgbquant/rgbquant.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RGBQuant = void 0;

var _palette = require("../../utils/palette");

var _point = require("../../utils/point");

var _colorHistogram = require("./colorHistogram");

var _paletteQuantizer = require("../paletteQuantizer");

var _arithmetic = require("../../utils/arithmetic");

var _utils = require("../../utils");

/*
 * Copyright (c) 2015, Leon Sorokin
 * All rights reserved. (MIT Licensed)
 *
 * RGBQuant.js - an image quantization lib
 */

/**
 * @preserve TypeScript port:
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * rgbquant.ts - part of Image Quantization Library
 */
class RemovedColor {
  constructor(index, color, distance) {
    this.index = index;
    this.color = color;
    this.distance = distance;
  }

} // TODO: make input/output image and input/output palettes with instances of class Point only!


class RGBQuant extends _paletteQuantizer.AbstractPaletteQuantizer {
  constructor(colorDistanceCalculator, colors = 256, method = 2) {
    super();
    this._distance = colorDistanceCalculator; // desired final palette size

    this._colors = colors; // histogram to accumulate

    this._histogram = new _colorHistogram.ColorHistogram(method, colors);
    this._initialDistance = 0.01;
    this._distanceIncrement = 0.005;
  } // gathers histogram info


  sample(image) {
    /*
     var pointArray = image.getPointArray(), max = [0, 0, 0, 0], min = [255, 255, 255, 255];
           for (var i = 0, l = pointArray.length; i < l; i++) {
     var color = pointArray[i];
     for (var componentIndex = 0; componentIndex < 4; componentIndex++) {
     if (max[componentIndex] < color.rgba[componentIndex]) max[componentIndex] = color.rgba[componentIndex];
     if (min[componentIndex] > color.rgba[componentIndex]) min[componentIndex] = color.rgba[componentIndex];
     }
     }
     var rd = max[0] - min[0], gd = max[1] - min[1], bd = max[2] - min[2], ad = max[3] - min[3];
     this._distance.setWhitePoint(rd, gd, bd, ad);
           this._initialDistance = (Math.sqrt(rd * rd + gd * gd + bd * bd + ad * ad) / Math.sqrt(255 * 255 + 255 * 255 + 255 * 255)) * 0.01;
     */
    this._histogram.sample(image);
  } // reduces histogram to palette, remaps & memoizes reduced colors


  *quantize() {
    const idxi32 = this._histogram.getImportanceSortedColorsIDXI32();

    if (idxi32.length === 0) {
      throw new Error('No colors in image');
    }

    yield* this._buildPalette(idxi32);
  } // reduces similar colors from an importance-sorted Uint32 rgba array


  *_buildPalette(idxi32) {
    // reduce histogram to create initial palette
    // build full rgb palette
    const palette = new _palette.Palette();
    const colorArray = palette.getPointContainer().getPointArray();
    const usageArray = new Array(idxi32.length); // tslint:disable-line:prefer-array-literal

    for (let i = 0; i < idxi32.length; i++) {
      colorArray.push(_point.Point.createByUint32(idxi32[i]));
      usageArray[i] = 1;
    }

    const len = colorArray.length;
    const memDist = [];
    let palLen = len;
    let thold = this._initialDistance; // palette already at or below desired length

    const tracker = new _utils.ProgressTracker(palLen - this._colors, 99);

    while (palLen > this._colors) {
      memDist.length = 0; // iterate palette

      for (let i = 0; i < len; i++) {
        if (tracker.shouldNotify(len - palLen)) {
          yield {
            progress: tracker.progress
          };
        }

        if (usageArray[i] === 0) continue;
        const pxi = colorArray[i]; // if (!pxi) continue;

        for (let j = i + 1; j < len; j++) {
          if (usageArray[j] === 0) continue;
          const pxj = colorArray[j]; // if (!pxj) continue;

          const dist = this._distance.calculateNormalized(pxi, pxj);

          if (dist < thold) {
            // store index,rgb,dist
            memDist.push(new RemovedColor(j, pxj, dist));
            usageArray[j] = 0;
            palLen--;
          }
        }
      } // palette reduction pass
      // console.log("palette length: " + palLen);
      // if palette is still much larger than target, increment by larger initDist


      thold += palLen > this._colors * 3 ? this._initialDistance : this._distanceIncrement;
    } // if palette is over-reduced, re-add removed colors with largest distances from last round


    if (palLen < this._colors) {
      // sort descending
      (0, _arithmetic.stableSort)(memDist, function (a, b) {
        return b.distance - a.distance;
      });
      let k = 0;

      while (palLen < this._colors && k < memDist.length) {
        const removedColor = memDist[k]; // re-inject rgb into final palette

        usageArray[removedColor.index] = 1;
        palLen++;
        k++;
      }
    }

    let colors = colorArray.length;

    for (let colorIndex = colors - 1; colorIndex >= 0; colorIndex--) {
      if (usageArray[colorIndex] === 0) {
        if (colorIndex !== colors - 1) {
          colorArray[colorIndex] = colorArray[colors - 1];
        }

        --colors;
      }
    }

    colorArray.length = colors;
    palette.sort();
    yield {
      palette,
      progress: 100
    };
  }

}

exports.RGBQuant = RGBQuant;
},{"../../utils/palette":"node_modules/image-q/dist/esm/utils/palette.js","../../utils/point":"node_modules/image-q/dist/esm/utils/point.js","./colorHistogram":"node_modules/image-q/dist/esm/palette/rgbquant/colorHistogram.js","../paletteQuantizer":"node_modules/image-q/dist/esm/palette/paletteQuantizer.js","../../utils/arithmetic":"node_modules/image-q/dist/esm/utils/arithmetic.js","../../utils":"node_modules/image-q/dist/esm/utils/index.js"}],"node_modules/image-q/dist/esm/palette/wu/wuQuant.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WuQuant = exports.WuColorCube = void 0;

var _palette = require("../../utils/palette");

var _point = require("../../utils/point");

var _paletteQuantizer = require("../paletteQuantizer");

var _utils = require("../../utils");

/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * wuQuant.ts - part of Image Quantization Library
 */
function createArray1D(dimension1) {
  const a = [];

  for (let k = 0; k < dimension1; k++) {
    a[k] = 0;
  }

  return a;
}

function createArray4D(dimension1, dimension2, dimension3, dimension4) {
  const a = new Array(dimension1);

  for (let i = 0; i < dimension1; i++) {
    a[i] = new Array(dimension2);

    for (let j = 0; j < dimension2; j++) {
      a[i][j] = new Array(dimension3);

      for (let k = 0; k < dimension3; k++) {
        a[i][j][k] = new Array(dimension4);

        for (let l = 0; l < dimension4; l++) {
          a[i][j][k][l] = 0;
        }
      }
    }
  }

  return a;
}

function createArray3D(dimension1, dimension2, dimension3) {
  const a = new Array(dimension1);

  for (let i = 0; i < dimension1; i++) {
    a[i] = new Array(dimension2);

    for (let j = 0; j < dimension2; j++) {
      a[i][j] = new Array(dimension3);

      for (let k = 0; k < dimension3; k++) {
        a[i][j][k] = 0;
      }
    }
  }

  return a;
}

function fillArray3D(a, dimension1, dimension2, dimension3, value) {
  for (let i = 0; i < dimension1; i++) {
    a[i] = [];

    for (let j = 0; j < dimension2; j++) {
      a[i][j] = [];

      for (let k = 0; k < dimension3; k++) {
        a[i][j][k] = value;
      }
    }
  }
}

function fillArray1D(a, dimension1, value) {
  for (let i = 0; i < dimension1; i++) {
    a[i] = value;
  }
}

class WuColorCube {}

exports.WuColorCube = WuColorCube;

class WuQuant extends _paletteQuantizer.AbstractPaletteQuantizer {
  constructor(colorDistanceCalculator, colors = 256, significantBitsPerChannel = 5) {
    super();
    this._distance = colorDistanceCalculator;

    this._setQuality(significantBitsPerChannel);

    this._initialize(colors);
  }

  sample(image) {
    const pointArray = image.getPointArray();

    for (let i = 0, l = pointArray.length; i < l; i++) {
      this._addColor(pointArray[i]);
    }

    this._pixels = this._pixels.concat(pointArray);
  }

  *quantize() {
    yield* this._preparePalette();
    const palette = new _palette.Palette(); // generates palette

    for (let paletteIndex = 0; paletteIndex < this._colors; paletteIndex++) {
      if (this._sums[paletteIndex] > 0) {
        const sum = this._sums[paletteIndex];
        const r = this._reds[paletteIndex] / sum;
        const g = this._greens[paletteIndex] / sum;
        const b = this._blues[paletteIndex] / sum;
        const a = this._alphas[paletteIndex] / sum;

        const color = _point.Point.createByRGBA(r | 0, g | 0, b | 0, a | 0);

        palette.add(color);
      }
    }

    palette.sort();
    yield {
      palette,
      progress: 100
    };
  }

  *_preparePalette() {
    // preprocess the colors
    yield* this._calculateMoments();
    let next = 0;
    const volumeVariance = createArray1D(this._colors); // processes the cubes

    for (let cubeIndex = 1; cubeIndex < this._colors; ++cubeIndex) {
      // if cut is possible; make it
      if (this._cut(this._cubes[next], this._cubes[cubeIndex])) {
        volumeVariance[next] = this._cubes[next].volume > 1 ? this._calculateVariance(this._cubes[next]) : 0.0;
        volumeVariance[cubeIndex] = this._cubes[cubeIndex].volume > 1 ? this._calculateVariance(this._cubes[cubeIndex]) : 0.0;
      } else {
        // the cut was not possible, revert the index
        volumeVariance[next] = 0.0;
        cubeIndex--;
      }

      next = 0;
      let temp = volumeVariance[0];

      for (let index = 1; index <= cubeIndex; ++index) {
        if (volumeVariance[index] > temp) {
          temp = volumeVariance[index];
          next = index;
        }
      }

      if (temp <= 0.0) {
        this._colors = cubeIndex + 1;
        break;
      }
    }

    const lookupRed = [];
    const lookupGreen = [];
    const lookupBlue = [];
    const lookupAlpha = []; // precalculates lookup tables

    for (let k = 0; k < this._colors; ++k) {
      const weight = WuQuant._volume(this._cubes[k], this._weights);

      if (weight > 0) {
        lookupRed[k] = WuQuant._volume(this._cubes[k], this._momentsRed) / weight | 0;
        lookupGreen[k] = WuQuant._volume(this._cubes[k], this._momentsGreen) / weight | 0;
        lookupBlue[k] = WuQuant._volume(this._cubes[k], this._momentsBlue) / weight | 0;
        lookupAlpha[k] = WuQuant._volume(this._cubes[k], this._momentsAlpha) / weight | 0;
      } else {
        lookupRed[k] = 0;
        lookupGreen[k] = 0;
        lookupBlue[k] = 0;
        lookupAlpha[k] = 0;
      }
    }

    this._reds = createArray1D(this._colors + 1);
    this._greens = createArray1D(this._colors + 1);
    this._blues = createArray1D(this._colors + 1);
    this._alphas = createArray1D(this._colors + 1);
    this._sums = createArray1D(this._colors + 1); // scans and adds colors

    for (let index = 0, l = this._pixels.length; index < l; index++) {
      const color = this._pixels[index];
      const match = -1;
      let bestMatch = match;
      let bestDistance = Number.MAX_VALUE;

      for (let lookup = 0; lookup < this._colors; lookup++) {
        const foundRed = lookupRed[lookup];
        const foundGreen = lookupGreen[lookup];
        const foundBlue = lookupBlue[lookup];
        const foundAlpha = lookupAlpha[lookup];

        const distance = this._distance.calculateRaw(foundRed, foundGreen, foundBlue, foundAlpha, color.r, color.g, color.b, color.a);

        if (distance < bestDistance) {
          bestDistance = distance;
          bestMatch = lookup;
        }
      }

      this._reds[bestMatch] += color.r;
      this._greens[bestMatch] += color.g;
      this._blues[bestMatch] += color.b;
      this._alphas[bestMatch] += color.a;
      this._sums[bestMatch]++;
    }
  }

  _addColor(color) {
    const bitsToRemove = 8 - this._significantBitsPerChannel;
    const indexRed = (color.r >> bitsToRemove) + 1;
    const indexGreen = (color.g >> bitsToRemove) + 1;
    const indexBlue = (color.b >> bitsToRemove) + 1;
    const indexAlpha = (color.a >> bitsToRemove) + 1; // if(color.a > 10) {

    this._weights[indexAlpha][indexRed][indexGreen][indexBlue]++;
    this._momentsRed[indexAlpha][indexRed][indexGreen][indexBlue] += color.r;
    this._momentsGreen[indexAlpha][indexRed][indexGreen][indexBlue] += color.g;
    this._momentsBlue[indexAlpha][indexRed][indexGreen][indexBlue] += color.b;
    this._momentsAlpha[indexAlpha][indexRed][indexGreen][indexBlue] += color.a;
    this._moments[indexAlpha][indexRed][indexGreen][indexBlue] += this._table[color.r] + this._table[color.g] + this._table[color.b] + this._table[color.a]; // }
  }
  /**
   * Converts the histogram to a series of _moments.
   */


  *_calculateMoments() {
    const area = [];
    const areaRed = [];
    const areaGreen = [];
    const areaBlue = [];
    const areaAlpha = [];
    const area2 = [];
    const xarea = createArray3D(this._sideSize, this._sideSize, this._sideSize);
    const xareaRed = createArray3D(this._sideSize, this._sideSize, this._sideSize);
    const xareaGreen = createArray3D(this._sideSize, this._sideSize, this._sideSize);
    const xareaBlue = createArray3D(this._sideSize, this._sideSize, this._sideSize);
    const xareaAlpha = createArray3D(this._sideSize, this._sideSize, this._sideSize);
    const xarea2 = createArray3D(this._sideSize, this._sideSize, this._sideSize);
    let trackerProgress = 0;
    const tracker = new _utils.ProgressTracker(this._alphaMaxSideIndex * this._maxSideIndex, 99);

    for (let alphaIndex = 1; alphaIndex <= this._alphaMaxSideIndex; ++alphaIndex) {
      fillArray3D(xarea, this._sideSize, this._sideSize, this._sideSize, 0);
      fillArray3D(xareaRed, this._sideSize, this._sideSize, this._sideSize, 0);
      fillArray3D(xareaGreen, this._sideSize, this._sideSize, this._sideSize, 0);
      fillArray3D(xareaBlue, this._sideSize, this._sideSize, this._sideSize, 0);
      fillArray3D(xareaAlpha, this._sideSize, this._sideSize, this._sideSize, 0);
      fillArray3D(xarea2, this._sideSize, this._sideSize, this._sideSize, 0);

      for (let redIndex = 1; redIndex <= this._maxSideIndex; ++redIndex, ++trackerProgress) {
        if (tracker.shouldNotify(trackerProgress)) {
          yield {
            progress: tracker.progress
          };
        }

        fillArray1D(area, this._sideSize, 0);
        fillArray1D(areaRed, this._sideSize, 0);
        fillArray1D(areaGreen, this._sideSize, 0);
        fillArray1D(areaBlue, this._sideSize, 0);
        fillArray1D(areaAlpha, this._sideSize, 0);
        fillArray1D(area2, this._sideSize, 0);

        for (let greenIndex = 1; greenIndex <= this._maxSideIndex; ++greenIndex) {
          let line = 0;
          let lineRed = 0;
          let lineGreen = 0;
          let lineBlue = 0;
          let lineAlpha = 0;
          let line2 = 0.0;

          for (let blueIndex = 1; blueIndex <= this._maxSideIndex; ++blueIndex) {
            line += this._weights[alphaIndex][redIndex][greenIndex][blueIndex];
            lineRed += this._momentsRed[alphaIndex][redIndex][greenIndex][blueIndex];
            lineGreen += this._momentsGreen[alphaIndex][redIndex][greenIndex][blueIndex];
            lineBlue += this._momentsBlue[alphaIndex][redIndex][greenIndex][blueIndex];
            lineAlpha += this._momentsAlpha[alphaIndex][redIndex][greenIndex][blueIndex];
            line2 += this._moments[alphaIndex][redIndex][greenIndex][blueIndex];
            area[blueIndex] += line;
            areaRed[blueIndex] += lineRed;
            areaGreen[blueIndex] += lineGreen;
            areaBlue[blueIndex] += lineBlue;
            areaAlpha[blueIndex] += lineAlpha;
            area2[blueIndex] += line2;
            xarea[redIndex][greenIndex][blueIndex] = xarea[redIndex - 1][greenIndex][blueIndex] + area[blueIndex];
            xareaRed[redIndex][greenIndex][blueIndex] = xareaRed[redIndex - 1][greenIndex][blueIndex] + areaRed[blueIndex];
            xareaGreen[redIndex][greenIndex][blueIndex] = xareaGreen[redIndex - 1][greenIndex][blueIndex] + areaGreen[blueIndex];
            xareaBlue[redIndex][greenIndex][blueIndex] = xareaBlue[redIndex - 1][greenIndex][blueIndex] + areaBlue[blueIndex];
            xareaAlpha[redIndex][greenIndex][blueIndex] = xareaAlpha[redIndex - 1][greenIndex][blueIndex] + areaAlpha[blueIndex];
            xarea2[redIndex][greenIndex][blueIndex] = xarea2[redIndex - 1][greenIndex][blueIndex] + area2[blueIndex];
            this._weights[alphaIndex][redIndex][greenIndex][blueIndex] = this._weights[alphaIndex - 1][redIndex][greenIndex][blueIndex] + xarea[redIndex][greenIndex][blueIndex];
            this._momentsRed[alphaIndex][redIndex][greenIndex][blueIndex] = this._momentsRed[alphaIndex - 1][redIndex][greenIndex][blueIndex] + xareaRed[redIndex][greenIndex][blueIndex];
            this._momentsGreen[alphaIndex][redIndex][greenIndex][blueIndex] = this._momentsGreen[alphaIndex - 1][redIndex][greenIndex][blueIndex] + xareaGreen[redIndex][greenIndex][blueIndex];
            this._momentsBlue[alphaIndex][redIndex][greenIndex][blueIndex] = this._momentsBlue[alphaIndex - 1][redIndex][greenIndex][blueIndex] + xareaBlue[redIndex][greenIndex][blueIndex];
            this._momentsAlpha[alphaIndex][redIndex][greenIndex][blueIndex] = this._momentsAlpha[alphaIndex - 1][redIndex][greenIndex][blueIndex] + xareaAlpha[redIndex][greenIndex][blueIndex];
            this._moments[alphaIndex][redIndex][greenIndex][blueIndex] = this._moments[alphaIndex - 1][redIndex][greenIndex][blueIndex] + xarea2[redIndex][greenIndex][blueIndex];
          }
        }
      }
    }
  }
  /**
   * Computes the volume of the cube in a specific moment.
   */


  static _volumeFloat(cube, moment) {
    return moment[cube.alphaMaximum][cube.redMaximum][cube.greenMaximum][cube.blueMaximum] - moment[cube.alphaMaximum][cube.redMaximum][cube.greenMinimum][cube.blueMaximum] - moment[cube.alphaMaximum][cube.redMinimum][cube.greenMaximum][cube.blueMaximum] + moment[cube.alphaMaximum][cube.redMinimum][cube.greenMinimum][cube.blueMaximum] - moment[cube.alphaMinimum][cube.redMaximum][cube.greenMaximum][cube.blueMaximum] + moment[cube.alphaMinimum][cube.redMaximum][cube.greenMinimum][cube.blueMaximum] + moment[cube.alphaMinimum][cube.redMinimum][cube.greenMaximum][cube.blueMaximum] - moment[cube.alphaMinimum][cube.redMinimum][cube.greenMinimum][cube.blueMaximum] - (moment[cube.alphaMaximum][cube.redMaximum][cube.greenMaximum][cube.blueMinimum] - moment[cube.alphaMinimum][cube.redMaximum][cube.greenMaximum][cube.blueMinimum] - moment[cube.alphaMaximum][cube.redMaximum][cube.greenMinimum][cube.blueMinimum] + moment[cube.alphaMinimum][cube.redMaximum][cube.greenMinimum][cube.blueMinimum] - moment[cube.alphaMaximum][cube.redMinimum][cube.greenMaximum][cube.blueMinimum] + moment[cube.alphaMinimum][cube.redMinimum][cube.greenMaximum][cube.blueMinimum] + moment[cube.alphaMaximum][cube.redMinimum][cube.greenMinimum][cube.blueMinimum] - moment[cube.alphaMinimum][cube.redMinimum][cube.greenMinimum][cube.blueMinimum]);
  }
  /**
   * Computes the volume of the cube in a specific moment.
   */


  static _volume(cube, moment) {
    return WuQuant._volumeFloat(cube, moment) | 0;
  }
  /**
   * Splits the cube in given position][and color direction.
   */


  static _top(cube, direction, position, moment) {
    let result;

    switch (direction) {
      case WuQuant._alpha:
        result = moment[position][cube.redMaximum][cube.greenMaximum][cube.blueMaximum] - moment[position][cube.redMaximum][cube.greenMinimum][cube.blueMaximum] - moment[position][cube.redMinimum][cube.greenMaximum][cube.blueMaximum] + moment[position][cube.redMinimum][cube.greenMinimum][cube.blueMaximum] - (moment[position][cube.redMaximum][cube.greenMaximum][cube.blueMinimum] - moment[position][cube.redMaximum][cube.greenMinimum][cube.blueMinimum] - moment[position][cube.redMinimum][cube.greenMaximum][cube.blueMinimum] + moment[position][cube.redMinimum][cube.greenMinimum][cube.blueMinimum]);
        break;

      case WuQuant._red:
        result = moment[cube.alphaMaximum][position][cube.greenMaximum][cube.blueMaximum] - moment[cube.alphaMaximum][position][cube.greenMinimum][cube.blueMaximum] - moment[cube.alphaMinimum][position][cube.greenMaximum][cube.blueMaximum] + moment[cube.alphaMinimum][position][cube.greenMinimum][cube.blueMaximum] - (moment[cube.alphaMaximum][position][cube.greenMaximum][cube.blueMinimum] - moment[cube.alphaMaximum][position][cube.greenMinimum][cube.blueMinimum] - moment[cube.alphaMinimum][position][cube.greenMaximum][cube.blueMinimum] + moment[cube.alphaMinimum][position][cube.greenMinimum][cube.blueMinimum]);
        break;

      case WuQuant._green:
        result = moment[cube.alphaMaximum][cube.redMaximum][position][cube.blueMaximum] - moment[cube.alphaMaximum][cube.redMinimum][position][cube.blueMaximum] - moment[cube.alphaMinimum][cube.redMaximum][position][cube.blueMaximum] + moment[cube.alphaMinimum][cube.redMinimum][position][cube.blueMaximum] - (moment[cube.alphaMaximum][cube.redMaximum][position][cube.blueMinimum] - moment[cube.alphaMaximum][cube.redMinimum][position][cube.blueMinimum] - moment[cube.alphaMinimum][cube.redMaximum][position][cube.blueMinimum] + moment[cube.alphaMinimum][cube.redMinimum][position][cube.blueMinimum]);
        break;

      case WuQuant._blue:
        result = moment[cube.alphaMaximum][cube.redMaximum][cube.greenMaximum][position] - moment[cube.alphaMaximum][cube.redMaximum][cube.greenMinimum][position] - moment[cube.alphaMaximum][cube.redMinimum][cube.greenMaximum][position] + moment[cube.alphaMaximum][cube.redMinimum][cube.greenMinimum][position] - (moment[cube.alphaMinimum][cube.redMaximum][cube.greenMaximum][position] - moment[cube.alphaMinimum][cube.redMaximum][cube.greenMinimum][position] - moment[cube.alphaMinimum][cube.redMinimum][cube.greenMaximum][position] + moment[cube.alphaMinimum][cube.redMinimum][cube.greenMinimum][position]);
        break;

      default:
        throw new Error('impossible');
    }

    return result | 0;
  }
  /**
   * Splits the cube in a given color direction at its minimum.
   */


  static _bottom(cube, direction, moment) {
    switch (direction) {
      case WuQuant._alpha:
        return -moment[cube.alphaMinimum][cube.redMaximum][cube.greenMaximum][cube.blueMaximum] + moment[cube.alphaMinimum][cube.redMaximum][cube.greenMinimum][cube.blueMaximum] + moment[cube.alphaMinimum][cube.redMinimum][cube.greenMaximum][cube.blueMaximum] - moment[cube.alphaMinimum][cube.redMinimum][cube.greenMinimum][cube.blueMaximum] - (-moment[cube.alphaMinimum][cube.redMaximum][cube.greenMaximum][cube.blueMinimum] + moment[cube.alphaMinimum][cube.redMaximum][cube.greenMinimum][cube.blueMinimum] + moment[cube.alphaMinimum][cube.redMinimum][cube.greenMaximum][cube.blueMinimum] - moment[cube.alphaMinimum][cube.redMinimum][cube.greenMinimum][cube.blueMinimum]);

      case WuQuant._red:
        return -moment[cube.alphaMaximum][cube.redMinimum][cube.greenMaximum][cube.blueMaximum] + moment[cube.alphaMaximum][cube.redMinimum][cube.greenMinimum][cube.blueMaximum] + moment[cube.alphaMinimum][cube.redMinimum][cube.greenMaximum][cube.blueMaximum] - moment[cube.alphaMinimum][cube.redMinimum][cube.greenMinimum][cube.blueMaximum] - (-moment[cube.alphaMaximum][cube.redMinimum][cube.greenMaximum][cube.blueMinimum] + moment[cube.alphaMaximum][cube.redMinimum][cube.greenMinimum][cube.blueMinimum] + moment[cube.alphaMinimum][cube.redMinimum][cube.greenMaximum][cube.blueMinimum] - moment[cube.alphaMinimum][cube.redMinimum][cube.greenMinimum][cube.blueMinimum]);

      case WuQuant._green:
        return -moment[cube.alphaMaximum][cube.redMaximum][cube.greenMinimum][cube.blueMaximum] + moment[cube.alphaMaximum][cube.redMinimum][cube.greenMinimum][cube.blueMaximum] + moment[cube.alphaMinimum][cube.redMaximum][cube.greenMinimum][cube.blueMaximum] - moment[cube.alphaMinimum][cube.redMinimum][cube.greenMinimum][cube.blueMaximum] - (-moment[cube.alphaMaximum][cube.redMaximum][cube.greenMinimum][cube.blueMinimum] + moment[cube.alphaMaximum][cube.redMinimum][cube.greenMinimum][cube.blueMinimum] + moment[cube.alphaMinimum][cube.redMaximum][cube.greenMinimum][cube.blueMinimum] - moment[cube.alphaMinimum][cube.redMinimum][cube.greenMinimum][cube.blueMinimum]);

      case WuQuant._blue:
        return -moment[cube.alphaMaximum][cube.redMaximum][cube.greenMaximum][cube.blueMinimum] + moment[cube.alphaMaximum][cube.redMaximum][cube.greenMinimum][cube.blueMinimum] + moment[cube.alphaMaximum][cube.redMinimum][cube.greenMaximum][cube.blueMinimum] - moment[cube.alphaMaximum][cube.redMinimum][cube.greenMinimum][cube.blueMinimum] - (-moment[cube.alphaMinimum][cube.redMaximum][cube.greenMaximum][cube.blueMinimum] + moment[cube.alphaMinimum][cube.redMaximum][cube.greenMinimum][cube.blueMinimum] + moment[cube.alphaMinimum][cube.redMinimum][cube.greenMaximum][cube.blueMinimum] - moment[cube.alphaMinimum][cube.redMinimum][cube.greenMinimum][cube.blueMinimum]);

      default:
        // TODO: why here is return 0, and in this._top there is no default at all (now it is throw error)?
        return 0;
    }
  }
  /**
   * Calculates statistical variance for a given cube.
   */


  _calculateVariance(cube) {
    const volumeRed = WuQuant._volume(cube, this._momentsRed);

    const volumeGreen = WuQuant._volume(cube, this._momentsGreen);

    const volumeBlue = WuQuant._volume(cube, this._momentsBlue);

    const volumeAlpha = WuQuant._volume(cube, this._momentsAlpha);

    const volumeMoment = WuQuant._volumeFloat(cube, this._moments);

    const volumeWeight = WuQuant._volume(cube, this._weights);

    const distance = volumeRed * volumeRed + volumeGreen * volumeGreen + volumeBlue * volumeBlue + volumeAlpha * volumeAlpha;
    return volumeMoment - distance / volumeWeight;
  }
  /**
   * Finds the optimal (maximal) position for the cut.
   */


  _maximize(cube, direction, first, last, wholeRed, wholeGreen, wholeBlue, wholeAlpha, wholeWeight) {
    const bottomRed = WuQuant._bottom(cube, direction, this._momentsRed) | 0;
    const bottomGreen = WuQuant._bottom(cube, direction, this._momentsGreen) | 0;
    const bottomBlue = WuQuant._bottom(cube, direction, this._momentsBlue) | 0;
    const bottomAlpha = WuQuant._bottom(cube, direction, this._momentsAlpha) | 0;
    const bottomWeight = WuQuant._bottom(cube, direction, this._weights) | 0;
    let result = 0.0;
    let cutPosition = -1;

    for (let position = first; position < last; ++position) {
      // determines the cube cut at a certain position
      let halfRed = bottomRed + WuQuant._top(cube, direction, position, this._momentsRed);

      let halfGreen = bottomGreen + WuQuant._top(cube, direction, position, this._momentsGreen);

      let halfBlue = bottomBlue + WuQuant._top(cube, direction, position, this._momentsBlue);

      let halfAlpha = bottomAlpha + WuQuant._top(cube, direction, position, this._momentsAlpha);

      let halfWeight = bottomWeight + WuQuant._top(cube, direction, position, this._weights); // the cube cannot be cut at bottom (this would lead to empty cube)


      if (halfWeight !== 0) {
        let halfDistance = halfRed * halfRed + halfGreen * halfGreen + halfBlue * halfBlue + halfAlpha * halfAlpha;
        let temp = halfDistance / halfWeight;
        halfRed = wholeRed - halfRed;
        halfGreen = wholeGreen - halfGreen;
        halfBlue = wholeBlue - halfBlue;
        halfAlpha = wholeAlpha - halfAlpha;
        halfWeight = wholeWeight - halfWeight;

        if (halfWeight !== 0) {
          halfDistance = halfRed * halfRed + halfGreen * halfGreen + halfBlue * halfBlue + halfAlpha * halfAlpha;
          temp += halfDistance / halfWeight;

          if (temp > result) {
            result = temp;
            cutPosition = position;
          }
        }
      }
    }

    return {
      max: result,
      position: cutPosition
    };
  } // Cuts a cube with another one.


  _cut(first, second) {
    let direction;

    const wholeRed = WuQuant._volume(first, this._momentsRed);

    const wholeGreen = WuQuant._volume(first, this._momentsGreen);

    const wholeBlue = WuQuant._volume(first, this._momentsBlue);

    const wholeAlpha = WuQuant._volume(first, this._momentsAlpha);

    const wholeWeight = WuQuant._volume(first, this._weights);

    const red = this._maximize(first, WuQuant._red, first.redMinimum + 1, first.redMaximum, wholeRed, wholeGreen, wholeBlue, wholeAlpha, wholeWeight);

    const green = this._maximize(first, WuQuant._green, first.greenMinimum + 1, first.greenMaximum, wholeRed, wholeGreen, wholeBlue, wholeAlpha, wholeWeight);

    const blue = this._maximize(first, WuQuant._blue, first.blueMinimum + 1, first.blueMaximum, wholeRed, wholeGreen, wholeBlue, wholeAlpha, wholeWeight);

    const alpha = this._maximize(first, WuQuant._alpha, first.alphaMinimum + 1, first.alphaMaximum, wholeRed, wholeGreen, wholeBlue, wholeAlpha, wholeWeight);

    if (alpha.max >= red.max && alpha.max >= green.max && alpha.max >= blue.max) {
      direction = WuQuant._alpha; // cannot split empty cube

      if (alpha.position < 0) return false;
    } else {
      if (red.max >= alpha.max && red.max >= green.max && red.max >= blue.max) {
        direction = WuQuant._red;
      } else if (green.max >= alpha.max && green.max >= red.max && green.max >= blue.max) {
        direction = WuQuant._green;
      } else {
        direction = WuQuant._blue;
      }
    }

    second.redMaximum = first.redMaximum;
    second.greenMaximum = first.greenMaximum;
    second.blueMaximum = first.blueMaximum;
    second.alphaMaximum = first.alphaMaximum; // cuts in a certain direction

    switch (direction) {
      case WuQuant._red:
        second.redMinimum = first.redMaximum = red.position;
        second.greenMinimum = first.greenMinimum;
        second.blueMinimum = first.blueMinimum;
        second.alphaMinimum = first.alphaMinimum;
        break;

      case WuQuant._green:
        second.greenMinimum = first.greenMaximum = green.position;
        second.redMinimum = first.redMinimum;
        second.blueMinimum = first.blueMinimum;
        second.alphaMinimum = first.alphaMinimum;
        break;

      case WuQuant._blue:
        second.blueMinimum = first.blueMaximum = blue.position;
        second.redMinimum = first.redMinimum;
        second.greenMinimum = first.greenMinimum;
        second.alphaMinimum = first.alphaMinimum;
        break;

      case WuQuant._alpha:
        second.alphaMinimum = first.alphaMaximum = alpha.position;
        second.blueMinimum = first.blueMinimum;
        second.redMinimum = first.redMinimum;
        second.greenMinimum = first.greenMinimum;
        break;
    } // determines the volumes after cut


    first.volume = (first.redMaximum - first.redMinimum) * (first.greenMaximum - first.greenMinimum) * (first.blueMaximum - first.blueMinimum) * (first.alphaMaximum - first.alphaMinimum);
    second.volume = (second.redMaximum - second.redMinimum) * (second.greenMaximum - second.greenMinimum) * (second.blueMaximum - second.blueMinimum) * (second.alphaMaximum - second.alphaMinimum); // the cut was successful

    return true;
  }

  _initialize(colors) {
    this._colors = colors; // creates all the _cubes

    this._cubes = []; // initializes all the _cubes

    for (let cubeIndex = 0; cubeIndex < colors; cubeIndex++) {
      this._cubes[cubeIndex] = new WuColorCube();
    } // resets the reference minimums


    this._cubes[0].redMinimum = 0;
    this._cubes[0].greenMinimum = 0;
    this._cubes[0].blueMinimum = 0;
    this._cubes[0].alphaMinimum = 0; // resets the reference maximums

    this._cubes[0].redMaximum = this._maxSideIndex;
    this._cubes[0].greenMaximum = this._maxSideIndex;
    this._cubes[0].blueMaximum = this._maxSideIndex;
    this._cubes[0].alphaMaximum = this._alphaMaxSideIndex;
    this._weights = createArray4D(this._alphaSideSize, this._sideSize, this._sideSize, this._sideSize);
    this._momentsRed = createArray4D(this._alphaSideSize, this._sideSize, this._sideSize, this._sideSize);
    this._momentsGreen = createArray4D(this._alphaSideSize, this._sideSize, this._sideSize, this._sideSize);
    this._momentsBlue = createArray4D(this._alphaSideSize, this._sideSize, this._sideSize, this._sideSize);
    this._momentsAlpha = createArray4D(this._alphaSideSize, this._sideSize, this._sideSize, this._sideSize);
    this._moments = createArray4D(this._alphaSideSize, this._sideSize, this._sideSize, this._sideSize);
    this._table = [];

    for (let tableIndex = 0; tableIndex < 256; ++tableIndex) {
      this._table[tableIndex] = tableIndex * tableIndex;
    }

    this._pixels = [];
  }

  _setQuality(significantBitsPerChannel = 5) {
    this._significantBitsPerChannel = significantBitsPerChannel;
    this._maxSideIndex = 1 << this._significantBitsPerChannel;
    this._alphaMaxSideIndex = this._maxSideIndex;
    this._sideSize = this._maxSideIndex + 1;
    this._alphaSideSize = this._alphaMaxSideIndex + 1;
  }

}

exports.WuQuant = WuQuant;
WuQuant._alpha = 3;
WuQuant._red = 2;
WuQuant._green = 1;
WuQuant._blue = 0;
},{"../../utils/palette":"node_modules/image-q/dist/esm/utils/palette.js","../../utils/point":"node_modules/image-q/dist/esm/utils/point.js","../paletteQuantizer":"node_modules/image-q/dist/esm/palette/paletteQuantizer.js","../../utils":"node_modules/image-q/dist/esm/utils/index.js"}],"node_modules/image-q/dist/esm/palette/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "AbstractPaletteQuantizer", {
  enumerable: true,
  get: function () {
    return _paletteQuantizer.AbstractPaletteQuantizer;
  }
});
Object.defineProperty(exports, "NeuQuant", {
  enumerable: true,
  get: function () {
    return _neuquant.NeuQuant;
  }
});
Object.defineProperty(exports, "NeuQuantFloat", {
  enumerable: true,
  get: function () {
    return _neuquantFloat.NeuQuantFloat;
  }
});
Object.defineProperty(exports, "RGBQuant", {
  enumerable: true,
  get: function () {
    return _rgbquant.RGBQuant;
  }
});
Object.defineProperty(exports, "ColorHistogram", {
  enumerable: true,
  get: function () {
    return _colorHistogram.ColorHistogram;
  }
});
Object.defineProperty(exports, "WuQuant", {
  enumerable: true,
  get: function () {
    return _wuQuant.WuQuant;
  }
});
Object.defineProperty(exports, "WuColorCube", {
  enumerable: true,
  get: function () {
    return _wuQuant.WuColorCube;
  }
});

var _paletteQuantizer = require("./paletteQuantizer");

var _neuquant = require("./neuquant/neuquant");

var _neuquantFloat = require("./neuquant/neuquantFloat");

var _rgbquant = require("./rgbquant/rgbquant");

var _colorHistogram = require("./rgbquant/colorHistogram");

var _wuQuant = require("./wu/wuQuant");
},{"./paletteQuantizer":"node_modules/image-q/dist/esm/palette/paletteQuantizer.js","./neuquant/neuquant":"node_modules/image-q/dist/esm/palette/neuquant/neuquant.js","./neuquant/neuquantFloat":"node_modules/image-q/dist/esm/palette/neuquant/neuquantFloat.js","./rgbquant/rgbquant":"node_modules/image-q/dist/esm/palette/rgbquant/rgbquant.js","./rgbquant/colorHistogram":"node_modules/image-q/dist/esm/palette/rgbquant/colorHistogram.js","./wu/wuQuant":"node_modules/image-q/dist/esm/palette/wu/wuQuant.js"}],"node_modules/image-q/dist/esm/image/imageQuantizer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AbstractImageQuantizer = void 0;

class AbstractImageQuantizer {
  quantizeSync(pointContainer, palette) {
    for (const value of this.quantize(pointContainer, palette)) {
      if (value.pointContainer) {
        return value.pointContainer;
      }
    }

    throw new Error('unreachable');
  }

}

exports.AbstractImageQuantizer = AbstractImageQuantizer;
},{}],"node_modules/image-q/dist/esm/image/nearestColor.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NearestColor = void 0;

var _imageQuantizer = require("./imageQuantizer");

var _progressTracker = require("../utils/progressTracker");

/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * nearestColor.ts - part of Image Quantization Library
 */
class NearestColor extends _imageQuantizer.AbstractImageQuantizer {
  constructor(colorDistanceCalculator) {
    super();
    this._distance = colorDistanceCalculator;
  }
  /**
   * Mutates pointContainer
   */


  *quantize(pointContainer, palette) {
    const pointArray = pointContainer.getPointArray();
    const width = pointContainer.getWidth();
    const height = pointContainer.getHeight();
    const tracker = new _progressTracker.ProgressTracker(height, 99);

    for (let y = 0; y < height; y++) {
      if (tracker.shouldNotify(y)) {
        yield {
          progress: tracker.progress
        };
      }

      for (let x = 0, idx = y * width; x < width; x++, idx++) {
        // Image pixel
        const point = pointArray[idx]; // Reduced pixel

        point.from(palette.getNearestColor(this._distance, point));
      }
    }

    yield {
      pointContainer,
      progress: 100
    };
  }

}

exports.NearestColor = NearestColor;
},{"./imageQuantizer":"node_modules/image-q/dist/esm/image/imageQuantizer.js","../utils/progressTracker":"node_modules/image-q/dist/esm/utils/progressTracker.js"}],"node_modules/image-q/dist/esm/image/array.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorDiffusionArray = exports.ErrorDiffusionArrayKernel = void 0;

var _imageQuantizer = require("./imageQuantizer");

var _point = require("../utils/point");

var _arithmetic = require("../utils/arithmetic");

var _progressTracker = require("../utils/progressTracker");

/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * ditherErrorDiffusionArray.ts - part of Image Quantization Library
 */
// TODO: is it the best name for this enum "kernel"?
var ErrorDiffusionArrayKernel;
exports.ErrorDiffusionArrayKernel = ErrorDiffusionArrayKernel;

(function (ErrorDiffusionArrayKernel) {
  ErrorDiffusionArrayKernel[ErrorDiffusionArrayKernel["FloydSteinberg"] = 0] = "FloydSteinberg";
  ErrorDiffusionArrayKernel[ErrorDiffusionArrayKernel["FalseFloydSteinberg"] = 1] = "FalseFloydSteinberg";
  ErrorDiffusionArrayKernel[ErrorDiffusionArrayKernel["Stucki"] = 2] = "Stucki";
  ErrorDiffusionArrayKernel[ErrorDiffusionArrayKernel["Atkinson"] = 3] = "Atkinson";
  ErrorDiffusionArrayKernel[ErrorDiffusionArrayKernel["Jarvis"] = 4] = "Jarvis";
  ErrorDiffusionArrayKernel[ErrorDiffusionArrayKernel["Burkes"] = 5] = "Burkes";
  ErrorDiffusionArrayKernel[ErrorDiffusionArrayKernel["Sierra"] = 6] = "Sierra";
  ErrorDiffusionArrayKernel[ErrorDiffusionArrayKernel["TwoSierra"] = 7] = "TwoSierra";
  ErrorDiffusionArrayKernel[ErrorDiffusionArrayKernel["SierraLite"] = 8] = "SierraLite";
})(ErrorDiffusionArrayKernel || (exports.ErrorDiffusionArrayKernel = ErrorDiffusionArrayKernel = {})); // http://www.tannerhelland.com/4660/dithering-eleven-algorithms-source-code/


class ErrorDiffusionArray extends _imageQuantizer.AbstractImageQuantizer {
  constructor(colorDistanceCalculator, kernel, serpentine = true, minimumColorDistanceToDither = 0, calculateErrorLikeGIMP = false) {
    super();

    this._setKernel(kernel);

    this._distance = colorDistanceCalculator;
    this._minColorDistance = minimumColorDistanceToDither;
    this._serpentine = serpentine;
    this._calculateErrorLikeGIMP = calculateErrorLikeGIMP;
  }
  /**
   * adapted from http://jsbin.com/iXofIji/2/edit by PAEz
   * fixed version. it doesn't use image pixels as error storage, also it doesn't have 0.3 + 0.3 + 0.3 + 0.3 = 0 error
   * Mutates pointContainer
   */


  *quantize(pointContainer, palette) {
    const pointArray = pointContainer.getPointArray();
    const originalPoint = new _point.Point();
    const width = pointContainer.getWidth();
    const height = pointContainer.getHeight();
    const errorLines = [];
    let dir = 1;
    let maxErrorLines = 1; // initial error lines (number is taken from dithering kernel)

    for (const kernel of this._kernel) {
      const kernelErrorLines = kernel[2] + 1;
      if (maxErrorLines < kernelErrorLines) maxErrorLines = kernelErrorLines;
    }

    for (let i = 0; i < maxErrorLines; i++) {
      this._fillErrorLine(errorLines[i] = [], width);
    }

    const tracker = new _progressTracker.ProgressTracker(height, 99);

    for (let y = 0; y < height; y++) {
      if (tracker.shouldNotify(y)) {
        yield {
          progress: tracker.progress
        };
      } // always serpentine


      if (this._serpentine) dir = dir * -1;
      const lni = y * width;
      const xStart = dir === 1 ? 0 : width - 1;
      const xEnd = dir === 1 ? width : -1; // cyclic shift with erasing

      this._fillErrorLine(errorLines[0], width); // TODO: why it is needed to cast types here?


      errorLines.push(errorLines.shift());
      const errorLine = errorLines[0];

      for (let x = xStart, idx = lni + xStart; x !== xEnd; x += dir, idx += dir) {
        // Image pixel
        const point = pointArray[idx]; // originalPoint = new Utils.Point(),

        const error = errorLine[x];
        originalPoint.from(point);

        const correctedPoint = _point.Point.createByRGBA((0, _arithmetic.inRange0to255Rounded)(point.r + error[0]), (0, _arithmetic.inRange0to255Rounded)(point.g + error[1]), (0, _arithmetic.inRange0to255Rounded)(point.b + error[2]), (0, _arithmetic.inRange0to255Rounded)(point.a + error[3])); // Reduced pixel


        const palettePoint = palette.getNearestColor(this._distance, correctedPoint);
        point.from(palettePoint); // dithering strength

        if (this._minColorDistance) {
          const dist = this._distance.calculateNormalized(point, palettePoint);

          if (dist < this._minColorDistance) continue;
        } // Component distance


        let er;
        let eg;
        let eb;
        let ea;

        if (this._calculateErrorLikeGIMP) {
          er = correctedPoint.r - palettePoint.r;
          eg = correctedPoint.g - palettePoint.g;
          eb = correctedPoint.b - palettePoint.b;
          ea = correctedPoint.a - palettePoint.a;
        } else {
          er = originalPoint.r - palettePoint.r;
          eg = originalPoint.g - palettePoint.g;
          eb = originalPoint.b - palettePoint.b;
          ea = originalPoint.a - palettePoint.a;
        }

        const dStart = dir === 1 ? 0 : this._kernel.length - 1;
        const dEnd = dir === 1 ? this._kernel.length : -1;

        for (let i = dStart; i !== dEnd; i += dir) {
          const x1 = this._kernel[i][1] * dir;
          const y1 = this._kernel[i][2];

          if (x1 + x >= 0 && x1 + x < width && y1 + y >= 0 && y1 + y < height) {
            const d = this._kernel[i][0];
            const e = errorLines[y1][x1 + x];
            e[0] = e[0] + er * d;
            e[1] = e[1] + eg * d;
            e[2] = e[2] + eb * d;
            e[3] = e[3] + ea * d;
          }
        }
      }
    }

    yield {
      pointContainer,
      progress: 100
    };
  }

  _fillErrorLine(errorLine, width) {
    // shrink
    if (errorLine.length > width) {
      errorLine.length = width;
    } // reuse existing arrays


    const l = errorLine.length;

    for (let i = 0; i < l; i++) {
      const error = errorLine[i];
      error[0] = error[1] = error[2] = error[3] = 0;
    } // create missing arrays


    for (let i = l; i < width; i++) {
      errorLine[i] = [0.0, 0.0, 0.0, 0.0];
    }
  }

  _setKernel(kernel) {
    switch (kernel) {
      case ErrorDiffusionArrayKernel.FloydSteinberg:
        this._kernel = [[7 / 16, 1, 0], [3 / 16, -1, 1], [5 / 16, 0, 1], [1 / 16, 1, 1]];
        break;

      case ErrorDiffusionArrayKernel.FalseFloydSteinberg:
        this._kernel = [[3 / 8, 1, 0], [3 / 8, 0, 1], [2 / 8, 1, 1]];
        break;

      case ErrorDiffusionArrayKernel.Stucki:
        this._kernel = [[8 / 42, 1, 0], [4 / 42, 2, 0], [2 / 42, -2, 1], [4 / 42, -1, 1], [8 / 42, 0, 1], [4 / 42, 1, 1], [2 / 42, 2, 1], [1 / 42, -2, 2], [2 / 42, -1, 2], [4 / 42, 0, 2], [2 / 42, 1, 2], [1 / 42, 2, 2]];
        break;

      case ErrorDiffusionArrayKernel.Atkinson:
        this._kernel = [[1 / 8, 1, 0], [1 / 8, 2, 0], [1 / 8, -1, 1], [1 / 8, 0, 1], [1 / 8, 1, 1], [1 / 8, 0, 2]];
        break;

      case ErrorDiffusionArrayKernel.Jarvis:
        this._kernel = [[7 / 48, 1, 0], [5 / 48, 2, 0], [3 / 48, -2, 1], [5 / 48, -1, 1], [7 / 48, 0, 1], [5 / 48, 1, 1], [3 / 48, 2, 1], [1 / 48, -2, 2], [3 / 48, -1, 2], [5 / 48, 0, 2], [3 / 48, 1, 2], [1 / 48, 2, 2]];
        break;

      case ErrorDiffusionArrayKernel.Burkes:
        this._kernel = [[8 / 32, 1, 0], [4 / 32, 2, 0], [2 / 32, -2, 1], [4 / 32, -1, 1], [8 / 32, 0, 1], [4 / 32, 1, 1], [2 / 32, 2, 1]];
        break;

      case ErrorDiffusionArrayKernel.Sierra:
        this._kernel = [[5 / 32, 1, 0], [3 / 32, 2, 0], [2 / 32, -2, 1], [4 / 32, -1, 1], [5 / 32, 0, 1], [4 / 32, 1, 1], [2 / 32, 2, 1], [2 / 32, -1, 2], [3 / 32, 0, 2], [2 / 32, 1, 2]];
        break;

      case ErrorDiffusionArrayKernel.TwoSierra:
        this._kernel = [[4 / 16, 1, 0], [3 / 16, 2, 0], [1 / 16, -2, 1], [2 / 16, -1, 1], [3 / 16, 0, 1], [2 / 16, 1, 1], [1 / 16, 2, 1]];
        break;

      case ErrorDiffusionArrayKernel.SierraLite:
        this._kernel = [[2 / 4, 1, 0], [1 / 4, -1, 1], [1 / 4, 0, 1]];
        break;

      default:
        throw new Error('ErrorDiffusionArray: unknown kernel = ' + kernel);
    }
  }

}

exports.ErrorDiffusionArray = ErrorDiffusionArray;
},{"./imageQuantizer":"node_modules/image-q/dist/esm/image/imageQuantizer.js","../utils/point":"node_modules/image-q/dist/esm/utils/point.js","../utils/arithmetic":"node_modules/image-q/dist/esm/utils/arithmetic.js","../utils/progressTracker":"node_modules/image-q/dist/esm/utils/progressTracker.js"}],"node_modules/image-q/dist/esm/image/spaceFillingCurves/hilbertCurve.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hilbertCurve = hilbertCurve;

var _progressTracker = require("../../utils/progressTracker");

var Direction;

(function (Direction) {
  Direction[Direction["NONE"] = 0] = "NONE";
  Direction[Direction["UP"] = 1] = "UP";
  Direction[Direction["LEFT"] = 2] = "LEFT";
  Direction[Direction["RIGHT"] = 3] = "RIGHT";
  Direction[Direction["DOWN"] = 4] = "DOWN";
})(Direction || (Direction = {}));

function* hilbertCurve(width, height, callback) {
  const maxBound = Math.max(width, height);
  const level = Math.floor(Math.log(maxBound) / Math.log(2) + 1);
  const tracker = new _progressTracker.ProgressTracker(width * height, 99);
  const data = {
    width,
    height,
    level,
    callback,
    tracker,
    index: 0,
    x: 0,
    y: 0
  };
  yield* walkHilbert(data, Direction.UP);
  visit(data, Direction.NONE);
}

function* walkHilbert(data, direction) {
  if (data.level < 1) return;
  if (data.tracker.shouldNotify(data.index)) yield {
    progress: data.tracker.progress
  };
  data.level--;

  switch (direction) {
    case Direction.LEFT:
      yield* walkHilbert(data, Direction.UP);
      visit(data, Direction.RIGHT);
      yield* walkHilbert(data, Direction.LEFT);
      visit(data, Direction.DOWN);
      yield* walkHilbert(data, Direction.LEFT);
      visit(data, Direction.LEFT);
      yield* walkHilbert(data, Direction.DOWN);
      break;

    case Direction.RIGHT:
      yield* walkHilbert(data, Direction.DOWN);
      visit(data, Direction.LEFT);
      yield* walkHilbert(data, Direction.RIGHT);
      visit(data, Direction.UP);
      yield* walkHilbert(data, Direction.RIGHT);
      visit(data, Direction.RIGHT);
      yield* walkHilbert(data, Direction.UP);
      break;

    case Direction.UP:
      yield* walkHilbert(data, Direction.LEFT);
      visit(data, Direction.DOWN);
      yield* walkHilbert(data, Direction.UP);
      visit(data, Direction.RIGHT);
      yield* walkHilbert(data, Direction.UP);
      visit(data, Direction.UP);
      yield* walkHilbert(data, Direction.RIGHT);
      break;

    case Direction.DOWN:
      yield* walkHilbert(data, Direction.RIGHT);
      visit(data, Direction.UP);
      yield* walkHilbert(data, Direction.DOWN);
      visit(data, Direction.LEFT);
      yield* walkHilbert(data, Direction.DOWN);
      visit(data, Direction.DOWN);
      yield* walkHilbert(data, Direction.LEFT);
      break;

    default:
      break;
  }

  data.level++;
}

function visit(data, direction) {
  if (data.x >= 0 && data.x < data.width && data.y >= 0 && data.y < data.height) {
    data.callback(data.x, data.y);
    data.index++;
  }

  switch (direction) {
    case Direction.LEFT:
      data.x--;
      break;

    case Direction.RIGHT:
      data.x++;
      break;

    case Direction.UP:
      data.y--;
      break;

    case Direction.DOWN:
      data.y++;
      break;
  }
}
},{"../../utils/progressTracker":"node_modules/image-q/dist/esm/utils/progressTracker.js"}],"node_modules/image-q/dist/esm/image/riemersma.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorDiffusionRiemersma = void 0;

var _imageQuantizer = require("./imageQuantizer");

var _hilbertCurve = require("./spaceFillingCurves/hilbertCurve");

var _point = require("../utils/point");

var _arithmetic = require("../utils/arithmetic");

/**
 * @preserve
 * MIT License
 *
 * Copyright 2015-2018 Igor Bezkrovnyi
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 * riemersma.ts - part of Image Quantization Library
 */
class ErrorDiffusionRiemersma extends _imageQuantizer.AbstractImageQuantizer {
  constructor(colorDistanceCalculator, errorQueueSize = 16, errorPropagation = 1) {
    super();
    this._distance = colorDistanceCalculator;
    this._errorQueueSize = errorQueueSize;
    this._weights = ErrorDiffusionRiemersma._createWeights(errorPropagation, errorQueueSize);
  }
  /**
   * Mutates pointContainer
   */


  *quantize(pointContainer, palette) {
    const pointArray = pointContainer.getPointArray();
    const width = pointContainer.getWidth();
    const height = pointContainer.getHeight();
    const errorQueue = [];
    let head = 0;

    for (let i = 0; i < this._errorQueueSize; i++) {
      errorQueue[i] = {
        r: 0,
        g: 0,
        b: 0,
        a: 0
      };
    }

    yield* (0, _hilbertCurve.hilbertCurve)(width, height, (x, y) => {
      const p = pointArray[x + y * width];
      let r = p.r;
      let g = p.g;
      let b = p.b;
      let a = p.a;

      for (let i = 0; i < this._errorQueueSize; i++) {
        const weight = this._weights[i];
        const e = errorQueue[(i + head) % this._errorQueueSize];
        r += e.r * weight;
        g += e.g * weight;
        b += e.b * weight;
        a += e.a * weight;
      }

      const correctedPoint = _point.Point.createByRGBA((0, _arithmetic.inRange0to255Rounded)(r), (0, _arithmetic.inRange0to255Rounded)(g), (0, _arithmetic.inRange0to255Rounded)(b), (0, _arithmetic.inRange0to255Rounded)(a));

      const quantizedPoint = palette.getNearestColor(this._distance, correctedPoint); // update head and calculate tail

      head = (head + 1) % this._errorQueueSize;
      const tail = (head + this._errorQueueSize - 1) % this._errorQueueSize; // update error with new value

      errorQueue[tail].r = p.r - quantizedPoint.r;
      errorQueue[tail].g = p.g - quantizedPoint.g;
      errorQueue[tail].b = p.b - quantizedPoint.b;
      errorQueue[tail].a = p.a - quantizedPoint.a; // update point

      p.from(quantizedPoint);
    });
    yield {
      pointContainer,
      progress: 100
    };
  }

  static _createWeights(errorPropagation, errorQueueSize) {
    const weights = [];
    const multiplier = Math.exp(Math.log(errorQueueSize) / (errorQueueSize - 1));

    for (let i = 0, next = 1; i < errorQueueSize; i++) {
      weights[i] = (next + 0.5 | 0) / errorQueueSize * errorPropagation;
      next *= multiplier;
    }

    return weights;
  }

}

exports.ErrorDiffusionRiemersma = ErrorDiffusionRiemersma;
},{"./imageQuantizer":"node_modules/image-q/dist/esm/image/imageQuantizer.js","./spaceFillingCurves/hilbertCurve":"node_modules/image-q/dist/esm/image/spaceFillingCurves/hilbertCurve.js","../utils/point":"node_modules/image-q/dist/esm/utils/point.js","../utils/arithmetic":"node_modules/image-q/dist/esm/utils/arithmetic.js"}],"node_modules/image-q/dist/esm/image/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "AbstractImageQuantizer", {
  enumerable: true,
  get: function () {
    return _imageQuantizer.AbstractImageQuantizer;
  }
});
Object.defineProperty(exports, "NearestColor", {
  enumerable: true,
  get: function () {
    return _nearestColor.NearestColor;
  }
});
Object.defineProperty(exports, "ErrorDiffusionArray", {
  enumerable: true,
  get: function () {
    return _array.ErrorDiffusionArray;
  }
});
Object.defineProperty(exports, "ErrorDiffusionArrayKernel", {
  enumerable: true,
  get: function () {
    return _array.ErrorDiffusionArrayKernel;
  }
});
Object.defineProperty(exports, "ErrorDiffusionRiemersma", {
  enumerable: true,
  get: function () {
    return _riemersma.ErrorDiffusionRiemersma;
  }
});

var _imageQuantizer = require("./imageQuantizer");

var _nearestColor = require("./nearestColor");

var _array = require("./array");

var _riemersma = require("./riemersma");
},{"./imageQuantizer":"node_modules/image-q/dist/esm/image/imageQuantizer.js","./nearestColor":"node_modules/image-q/dist/esm/image/nearestColor.js","./array":"node_modules/image-q/dist/esm/image/array.js","./riemersma":"node_modules/image-q/dist/esm/image/riemersma.js"}],"node_modules/image-q/dist/esm/quality/ssim.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ssim = ssim;

var _bt = require("../constants/bt709");

// based on https://github.com/rhys-e/structural-similarity
// http://en.wikipedia.org/wiki/Structural_similarity
const K1 = 0.01; // tslint:disable-line:naming-convention

const K2 = 0.03; // tslint:disable-line:naming-convention

function ssim(image1, image2) {
  if (image1.getHeight() !== image2.getHeight() || image1.getWidth() !== image2.getWidth()) {
    throw new Error('Images have different sizes!');
  }

  const bitsPerComponent = 8;
  const L = (1 << bitsPerComponent) - 1; // tslint:disable-line:naming-convention

  const c1 = Math.pow(K1 * L, 2);
  const c2 = Math.pow(K2 * L, 2);
  let numWindows = 0;
  let mssim = 0.0; // calculate ssim for each window

  iterate(image1, image2, (lumaValues1, lumaValues2, averageLumaValue1, averageLumaValue2) => {
    // calculate variance and covariance
    let sigxy = 0.0;
    let sigsqx = 0.0;
    let sigsqy = 0.0;

    for (let i = 0; i < lumaValues1.length; i++) {
      sigsqx += Math.pow(lumaValues1[i] - averageLumaValue1, 2);
      sigsqy += Math.pow(lumaValues2[i] - averageLumaValue2, 2);
      sigxy += (lumaValues1[i] - averageLumaValue1) * (lumaValues2[i] - averageLumaValue2);
    }

    const numPixelsInWin = lumaValues1.length - 1;
    sigsqx /= numPixelsInWin;
    sigsqy /= numPixelsInWin;
    sigxy /= numPixelsInWin; // perform ssim calculation on window

    const numerator = (2 * averageLumaValue1 * averageLumaValue2 + c1) * (2 * sigxy + c2);
    const denominator = (Math.pow(averageLumaValue1, 2) + Math.pow(averageLumaValue2, 2) + c1) * (sigsqx + sigsqy + c2);
    const ssim = numerator / denominator;
    mssim += ssim;
    numWindows++;
  });
  return mssim / numWindows;
}

function iterate(image1, image2, callback) {
  const windowSize = 8;
  const width = image1.getWidth();
  const height = image1.getHeight();

  for (let y = 0; y < height; y += windowSize) {
    for (let x = 0; x < width; x += windowSize) {
      // avoid out-of-width/height
      const windowWidth = Math.min(windowSize, width - x);
      const windowHeight = Math.min(windowSize, height - y);
      const lumaValues1 = calculateLumaValuesForWindow(image1, x, y, windowWidth, windowHeight);
      const lumaValues2 = calculateLumaValuesForWindow(image2, x, y, windowWidth, windowHeight);
      const averageLuma1 = calculateAverageLuma(lumaValues1);
      const averageLuma2 = calculateAverageLuma(lumaValues2);
      callback(lumaValues1, lumaValues2, averageLuma1, averageLuma2);
    }
  }
}

function calculateLumaValuesForWindow(image, x, y, width, height) {
  const pointArray = image.getPointArray();
  const lumaValues = [];
  let counter = 0;

  for (let j = y; j < y + height; j++) {
    const offset = j * image.getWidth();

    for (let i = x; i < x + width; i++) {
      const point = pointArray[offset + i];
      lumaValues[counter] = point.r * _bt.Y.RED + point.g * _bt.Y.GREEN + point.b * _bt.Y.BLUE;
      counter++;
    }
  }

  return lumaValues;
}

function calculateAverageLuma(lumaValues) {
  let sumLuma = 0.0;

  for (const luma of lumaValues) {
    sumLuma += luma;
  }

  return sumLuma / lumaValues.length;
}
},{"../constants/bt709":"node_modules/image-q/dist/esm/constants/bt709.js"}],"node_modules/image-q/dist/esm/quality/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ssim", {
  enumerable: true,
  get: function () {
    return _ssim.ssim;
  }
});

var _ssim = require("./ssim");
},{"./ssim":"node_modules/image-q/dist/esm/quality/ssim.js"}],"node_modules/core-js/modules/_global.js":[function(require,module,exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],"node_modules/core-js/modules/_core.js":[function(require,module,exports) {
var core = module.exports = { version: '2.6.11' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],"node_modules/core-js/modules/_is-object.js":[function(require,module,exports) {
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],"node_modules/core-js/modules/_an-object.js":[function(require,module,exports) {
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":"node_modules/core-js/modules/_is-object.js"}],"node_modules/core-js/modules/_fails.js":[function(require,module,exports) {
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],"node_modules/core-js/modules/_descriptors.js":[function(require,module,exports) {
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_fails":"node_modules/core-js/modules/_fails.js"}],"node_modules/core-js/modules/_dom-create.js":[function(require,module,exports) {
var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_is-object":"node_modules/core-js/modules/_is-object.js","./_global":"node_modules/core-js/modules/_global.js"}],"node_modules/core-js/modules/_ie8-dom-define.js":[function(require,module,exports) {
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_descriptors":"node_modules/core-js/modules/_descriptors.js","./_fails":"node_modules/core-js/modules/_fails.js","./_dom-create":"node_modules/core-js/modules/_dom-create.js"}],"node_modules/core-js/modules/_to-primitive.js":[function(require,module,exports) {
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"./_is-object":"node_modules/core-js/modules/_is-object.js"}],"node_modules/core-js/modules/_object-dp.js":[function(require,module,exports) {
var anObject = require('./_an-object');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var toPrimitive = require('./_to-primitive');
var dP = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"./_an-object":"node_modules/core-js/modules/_an-object.js","./_ie8-dom-define":"node_modules/core-js/modules/_ie8-dom-define.js","./_to-primitive":"node_modules/core-js/modules/_to-primitive.js","./_descriptors":"node_modules/core-js/modules/_descriptors.js"}],"node_modules/core-js/modules/_property-desc.js":[function(require,module,exports) {
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],"node_modules/core-js/modules/_hide.js":[function(require,module,exports) {
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_object-dp":"node_modules/core-js/modules/_object-dp.js","./_property-desc":"node_modules/core-js/modules/_property-desc.js","./_descriptors":"node_modules/core-js/modules/_descriptors.js"}],"node_modules/core-js/modules/_has.js":[function(require,module,exports) {
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],"node_modules/core-js/modules/_uid.js":[function(require,module,exports) {
var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

},{}],"node_modules/core-js/modules/_library.js":[function(require,module,exports) {
module.exports = false;

},{}],"node_modules/core-js/modules/_shared.js":[function(require,module,exports) {

var core = require('./_core');
var global = require('./_global');
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: require('./_library') ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});

},{"./_core":"node_modules/core-js/modules/_core.js","./_global":"node_modules/core-js/modules/_global.js","./_library":"node_modules/core-js/modules/_library.js"}],"node_modules/core-js/modules/_function-to-string.js":[function(require,module,exports) {
module.exports = require('./_shared')('native-function-to-string', Function.toString);

},{"./_shared":"node_modules/core-js/modules/_shared.js"}],"node_modules/core-js/modules/_redefine.js":[function(require,module,exports) {

var global = require('./_global');
var hide = require('./_hide');
var has = require('./_has');
var SRC = require('./_uid')('src');
var $toString = require('./_function-to-string');
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

require('./_core').inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});

},{"./_global":"node_modules/core-js/modules/_global.js","./_hide":"node_modules/core-js/modules/_hide.js","./_has":"node_modules/core-js/modules/_has.js","./_uid":"node_modules/core-js/modules/_uid.js","./_function-to-string":"node_modules/core-js/modules/_function-to-string.js","./_core":"node_modules/core-js/modules/_core.js"}],"node_modules/core-js/modules/_a-function.js":[function(require,module,exports) {
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],"node_modules/core-js/modules/_ctx.js":[function(require,module,exports) {
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"./_a-function":"node_modules/core-js/modules/_a-function.js"}],"node_modules/core-js/modules/_export.js":[function(require,module,exports) {

var global = require('./_global');
var core = require('./_core');
var hide = require('./_hide');
var redefine = require('./_redefine');
var ctx = require('./_ctx');
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;

},{"./_global":"node_modules/core-js/modules/_global.js","./_core":"node_modules/core-js/modules/_core.js","./_hide":"node_modules/core-js/modules/_hide.js","./_redefine":"node_modules/core-js/modules/_redefine.js","./_ctx":"node_modules/core-js/modules/_ctx.js"}],"node_modules/core-js/modules/_invoke.js":[function(require,module,exports) {
// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};

},{}],"node_modules/core-js/modules/_html.js":[function(require,module,exports) {
var document = require('./_global').document;
module.exports = document && document.documentElement;

},{"./_global":"node_modules/core-js/modules/_global.js"}],"node_modules/core-js/modules/_cof.js":[function(require,module,exports) {
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],"node_modules/core-js/modules/_task.js":[function(require,module,exports) {


var ctx = require('./_ctx');
var invoke = require('./_invoke');
var html = require('./_html');
var cel = require('./_dom-create');
var global = require('./_global');
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (require('./_cof')(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};

},{"./_ctx":"node_modules/core-js/modules/_ctx.js","./_invoke":"node_modules/core-js/modules/_invoke.js","./_html":"node_modules/core-js/modules/_html.js","./_dom-create":"node_modules/core-js/modules/_dom-create.js","./_global":"node_modules/core-js/modules/_global.js","./_cof":"node_modules/core-js/modules/_cof.js"}],"node_modules/core-js/modules/web.immediate.js":[function(require,module,exports) {
var $export = require('./_export');
var $task = require('./_task');
$export($export.G + $export.B, {
  setImmediate: $task.set,
  clearImmediate: $task.clear
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_task":"node_modules/core-js/modules/_task.js"}],"node_modules/core-js/fn/set-immediate.js":[function(require,module,exports) {
require('../modules/web.immediate');
module.exports = require('../modules/_core').setImmediate;

},{"../modules/web.immediate":"node_modules/core-js/modules/web.immediate.js","../modules/_core":"node_modules/core-js/modules/_core.js"}],"node_modules/image-q/dist/esm/basicAPI.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildPaletteSync = buildPaletteSync;
exports.buildPalette = buildPalette;
exports.applyPaletteSync = applyPaletteSync;
exports.applyPalette = applyPalette;

var setImmediate = _interopRequireWildcard(require("core-js/fn/set-immediate"));

var distance = _interopRequireWildcard(require("./distance"));

var image = _interopRequireWildcard(require("./image"));

var palette = _interopRequireWildcard(require("./palette"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * helper.ts - part of Image Quantization Library
 */
function buildPaletteSync(images, {
  colorDistanceFormula,
  paletteQuantization,
  colors
} = {}) {
  const distanceCalculator = colorDistanceFormulaToColorDistance(colorDistanceFormula);
  const paletteQuantizer = paletteQuantizationToPaletteQuantizer(distanceCalculator, paletteQuantization, colors);
  images.forEach(image => paletteQuantizer.sample(image));
  return paletteQuantizer.quantizeSync();
}

async function buildPalette(images, {
  colorDistanceFormula,
  paletteQuantization,
  colors,
  onProgress
} = {}) {
  return new Promise((resolve, reject) => {
    const distanceCalculator = colorDistanceFormulaToColorDistance(colorDistanceFormula);
    const paletteQuantizer = paletteQuantizationToPaletteQuantizer(distanceCalculator, paletteQuantization, colors);
    images.forEach(image => paletteQuantizer.sample(image));
    let palette;
    let timerId;
    const iterator = paletteQuantizer.quantize();

    const next = () => {
      try {
        const result = iterator.next();

        if (result.done) {
          resolve(palette);
        } else {
          if (result.value.palette) palette = result.value.palette;
          if (onProgress) onProgress(result.value.progress);
          timerId = setImmediate(next);
        }
      } catch (error) {
        clearTimeout(timerId);
        reject(error);
      }
    };

    timerId = setImmediate(next);
  });
}

function applyPaletteSync(image, palette, {
  colorDistanceFormula,
  imageQuantization
} = {}) {
  const distanceCalculator = colorDistanceFormulaToColorDistance(colorDistanceFormula);
  const imageQuantizer = imageQuantizationToImageQuantizer(distanceCalculator, imageQuantization);
  return imageQuantizer.quantizeSync(image, palette);
}

async function applyPalette(image, palette, {
  colorDistanceFormula,
  imageQuantization,
  onProgress
} = {}) {
  return new Promise((resolve, reject) => {
    const distanceCalculator = colorDistanceFormulaToColorDistance(colorDistanceFormula);
    const imageQuantizer = imageQuantizationToImageQuantizer(distanceCalculator, imageQuantization);
    let outPointContainer;
    let timerId;
    const iterator = imageQuantizer.quantize(image, palette);

    const next = () => {
      try {
        const result = iterator.next();

        if (result.done) {
          resolve(outPointContainer);
        } else {
          if (result.value.pointContainer) outPointContainer = result.value.pointContainer;
          if (onProgress) onProgress(result.value.progress);
          timerId = setImmediate(next);
        }
      } catch (error) {
        clearTimeout(timerId);
        reject(error);
      }
    };

    timerId = setImmediate(next);
  });
}

function colorDistanceFormulaToColorDistance(colorDistanceFormula = 'euclidean-bt709') {
  switch (colorDistanceFormula) {
    case 'cie94-graphic-arts':
      return new distance.CIE94GraphicArts();

    case 'cie94-textiles':
      return new distance.CIE94Textiles();

    case 'ciede2000':
      return new distance.CIEDE2000();

    case 'color-metric':
      return new distance.CMetric();

    case 'euclidean':
      return new distance.Euclidean();

    case 'euclidean-bt709':
      return new distance.EuclideanBT709();

    case 'euclidean-bt709-noalpha':
      return new distance.EuclideanBT709NoAlpha();

    case 'manhattan':
      return new distance.Manhattan();

    case 'manhattan-bt709':
      return new distance.ManhattanBT709();

    case 'manhattan-nommyde':
      return new distance.ManhattanNommyde();

    case 'pngquant':
      return new distance.PNGQuant();

    default:
      throw new Error(`Unknown colorDistanceFormula ${colorDistanceFormula}`);
  }
}

function imageQuantizationToImageQuantizer(distanceCalculator, imageQuantization = 'floyd-steinberg') {
  switch (imageQuantization) {
    case 'nearest':
      return new image.NearestColor(distanceCalculator);

    case 'riemersma':
      return new image.ErrorDiffusionRiemersma(distanceCalculator);

    case 'floyd-steinberg':
      return new image.ErrorDiffusionArray(distanceCalculator, image.ErrorDiffusionArrayKernel.FloydSteinberg);

    case 'false-floyd-steinberg':
      return new image.ErrorDiffusionArray(distanceCalculator, image.ErrorDiffusionArrayKernel.FalseFloydSteinberg);

    case 'stucki':
      return new image.ErrorDiffusionArray(distanceCalculator, image.ErrorDiffusionArrayKernel.Stucki);

    case 'atkinson':
      return new image.ErrorDiffusionArray(distanceCalculator, image.ErrorDiffusionArrayKernel.Atkinson);

    case 'jarvis':
      return new image.ErrorDiffusionArray(distanceCalculator, image.ErrorDiffusionArrayKernel.Jarvis);

    case 'burkes':
      return new image.ErrorDiffusionArray(distanceCalculator, image.ErrorDiffusionArrayKernel.Burkes);

    case 'sierra':
      return new image.ErrorDiffusionArray(distanceCalculator, image.ErrorDiffusionArrayKernel.Sierra);

    case 'two-sierra':
      return new image.ErrorDiffusionArray(distanceCalculator, image.ErrorDiffusionArrayKernel.TwoSierra);

    case 'sierra-lite':
      return new image.ErrorDiffusionArray(distanceCalculator, image.ErrorDiffusionArrayKernel.SierraLite);

    default:
      throw new Error(`Unknown imageQuantization ${imageQuantization}`);
  }
}

function paletteQuantizationToPaletteQuantizer(distanceCalculator, paletteQuantization = 'wuquant', colors = 256) {
  switch (paletteQuantization) {
    case 'neuquant':
      return new palette.NeuQuant(distanceCalculator, colors);

    case 'rgbquant':
      return new palette.RGBQuant(distanceCalculator, colors);

    case 'wuquant':
      return new palette.WuQuant(distanceCalculator, colors);

    case 'neuquant-float':
      return new palette.NeuQuantFloat(distanceCalculator, colors);

    default:
      throw new Error(`Unknown paletteQuantization ${paletteQuantization}`);
  }
}
},{"core-js/fn/set-immediate":"node_modules/core-js/fn/set-immediate.js","./distance":"node_modules/image-q/dist/esm/distance/index.js","./image":"node_modules/image-q/dist/esm/image/index.js","./palette":"node_modules/image-q/dist/esm/palette/index.js"}],"node_modules/image-q/dist/esm/image-q.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "buildPalette", {
  enumerable: true,
  get: function () {
    return _basicAPI.buildPalette;
  }
});
Object.defineProperty(exports, "buildPaletteSync", {
  enumerable: true,
  get: function () {
    return _basicAPI.buildPaletteSync;
  }
});
Object.defineProperty(exports, "applyPalette", {
  enumerable: true,
  get: function () {
    return _basicAPI.applyPalette;
  }
});
Object.defineProperty(exports, "applyPaletteSync", {
  enumerable: true,
  get: function () {
    return _basicAPI.applyPaletteSync;
  }
});
exports.utils = exports.quality = exports.image = exports.palette = exports.distance = exports.conversion = exports.constants = void 0;

var constants = _interopRequireWildcard(require("./constants"));

exports.constants = constants;

var conversion = _interopRequireWildcard(require("./conversion"));

exports.conversion = conversion;

var distance = _interopRequireWildcard(require("./distance"));

exports.distance = distance;

var palette = _interopRequireWildcard(require("./palette"));

exports.palette = palette;

var image = _interopRequireWildcard(require("./image"));

exports.image = image;

var quality = _interopRequireWildcard(require("./quality"));

exports.quality = quality;

var utils = _interopRequireWildcard(require("./utils"));

exports.utils = utils;

var _basicAPI = require("./basicAPI");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
},{"./constants":"node_modules/image-q/dist/esm/constants/index.js","./conversion":"node_modules/image-q/dist/esm/conversion/index.js","./distance":"node_modules/image-q/dist/esm/distance/index.js","./palette":"node_modules/image-q/dist/esm/palette/index.js","./image":"node_modules/image-q/dist/esm/image/index.js","./quality":"node_modules/image-q/dist/esm/quality/index.js","./utils":"node_modules/image-q/dist/esm/utils/index.js","./basicAPI":"node_modules/image-q/dist/esm/basicAPI.js"}],"src/comparator.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function c1(a, b) {
  var dist = 0;

  for (var i = 0; i < a.data.length; ++i) {
    var d = Math.abs(a.data[i] / 255.0 - b.data[i] / 255.0);
    dist += d * d;
  }

  return dist;
}

function compare(a, b) {
  return c1(a, b);
}

exports.default = compare;
},{}],"src/brush.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function getRandomColor(palette) {
  if (palette.length > 0) {
    var num = palette[Math.floor(Math.random() * palette.length)]; //console.log(num.toString(16));

    return "#" + num.toString(16).substr(2, 6);
  } else {
    var letters = "0123456789ABCDEF";
    var color = "#";

    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
  }
}

function pointillist(ctx, palette) {
  ctx.fillStyle = getRandomColor(palette); //ctx.globalAlpha = 0.4 + Math.random() * 0.6;

  var x = Math.random() * ctx.canvas.width;
  var y = Math.random() * ctx.canvas.height;
  var rx = Math.random() * ctx.canvas.width * 0.03125;
  var ry = rx;
  ctx.beginPath();
  ctx.ellipse(x, y, rx, ry, 0, 0, 2 * Math.PI);
  ctx.fill();
}

function brush1(ctx, palette) {
  ctx.fillStyle = getRandomColor(palette); //ctx.globalAlpha = 0.4 + Math.random() * 0.6;

  var x = Math.random() * ctx.canvas.width;
  var y = Math.random() * ctx.canvas.height;
  var rx = Math.random() * ctx.canvas.width * 0.125;
  var ry = Math.random() * ctx.canvas.height * 0.125;
  var rot = Math.random() * Math.PI;
  ctx.beginPath();
  ctx.ellipse(x, y, rx, ry, rot, 0, 2 * Math.PI);
  ctx.fill();
}

function brush2(ctx, palette) {
  ctx.fillStyle = getRandomColor(palette);
  var x = Math.random() * ctx.canvas.width;
  var y = Math.random() * ctx.canvas.height;
  var rx = Math.random() * ctx.canvas.width * 0.25;
  var ry = Math.random() * ctx.canvas.height * 0.25;
  ctx.beginPath();
  ctx.fillRect(x, y, rx, ry);
}

function brushSmallRound(ctx, palette) {
  ctx.fillStyle = getRandomColor(palette);
  var x = Math.random() * ctx.canvas.width;
  var y = Math.random() * ctx.canvas.height;
  var rx = ctx.canvas.width * 0.025;
  var ry = Math.random() * ctx.canvas.height * 0.25;
  var rot = Math.random() * Math.PI;
  ctx.beginPath();
  ctx.ellipse(x, y, rx, ry, rot, 0, 2 * Math.PI);
  ctx.fill();
}

function brushBox(ctx, palette) {
  ctx.fillStyle = getRandomColor(palette);
  var x = Math.random() * ctx.canvas.width;
  var y = Math.random() * ctx.canvas.height;
  var rx = 0;
  var ry = 0;

  if (Math.random() > 0.49999999) {
    rx = ctx.canvas.width * 0.025;
    ry = Math.random() * ctx.canvas.height * 0.25;
  } else {
    ry = ctx.canvas.height * 0.025;
    rx = Math.random() * ctx.canvas.width * 0.25;
  }

  ctx.beginPath();
  ctx.fillRect(x, y, rx, ry);
}

function brush(cvs, palette) {
  var ctx = cvs.getContext("2d");
  var brushType = Math.random(); //   if (brushType < 0.33333333) {
  //     brush1(ctx);
  //   } else if (brushType < 0.6666666) {
  //     brushSmallRound(ctx);
  //   } else if (brushType < 0.833333333) {
  //     brush2(ctx);
  //   } else {
  //     brushBox(ctx);
  //   }
  //pointillist(ctx, palette);

  brush1(ctx, palette); //brushSmallRound(ctx);
  //brushBox(ctx);
  //brush2(ctx);

  return ctx.getImageData(0, 0, cvs.width, cvs.height);
}

exports.default = brush;
},{}],"src/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var image_q_1 = require("image-q");

var comparator_1 = __importDefault(require("./comparator"));

var brush_1 = __importDefault(require("./brush"));

var PainterApp =
/** @class */
function () {
  function PainterApp() {
    this.numStrokesTried = 0;
    this.numStrokesKept = 0;
    this.palette = new Uint32Array(0);
    this.similarity = Number.MAX_VALUE;
    this.image1 = document.createElement("canvas");
    this.imageTemp = document.createElement("canvas");
    this.image2 = document.createElement("canvas");
    this.statsEl = document.createElement("p");
    document.body.appendChild(this.image1);
    document.body.appendChild(this.image2);
    document.body.appendChild(this.statsEl);
    this.srcimg = new Image(); //this.srcimg.crossOrigin = "Anonymous";

    this.srcimg.setAttribute("crossOrigin", "");
    this.srcimg.onload = this.start.bind(this);
    this.srcimg.src = "https://upload.wikimedia.org/wikipedia/commons/7/71/Grant_DeVolson_Wood_-_American_Gothic.jpg";
    this.sourcePixels = this.image2.getContext("2d").createImageData(this.image2.width, this.image2.height);
    this.iterate = this.iterate.bind(this);
  }

  PainterApp.prototype.start = function () {
    var w = this.srcimg.naturalWidth;
    var h = this.srcimg.naturalHeight;
    var a = w / h;
    var tgtw = 200;
    var tgth = 200 / a;
    var ws = "" + tgtw + "px";
    var hs = "" + tgth + "px";
    this.image1.style.width = ws;
    this.image1.style.height = hs;
    this.imageTemp.style.width = ws;
    this.imageTemp.style.height = hs;
    this.image2.style.width = ws;
    this.image2.style.height = hs;
    var ctx = this.image2.getContext("2d"); // put our reference image into the srcimg canvas

    ctx.drawImage(this.srcimg, 0, 0, this.srcimg.naturalWidth, this.srcimg.naturalHeight, 0, 0, this.image2.width, this.image2.height); // now grab the downsampled pixels and hold onto them

    this.sourcePixels = ctx.getImageData(0, 0, this.image2.width, this.image2.height); // generate the palette.

    var inPointContainer = image_q_1.utils.PointContainer.fromUint8Array(this.sourcePixels.data, this.sourcePixels.width, this.sourcePixels.height); // convert
    //    this.palette = buildPaletteSync([inPointContainer]);

    var pal = image_q_1.buildPaletteSync([inPointContainer], {
      colorDistanceFormula: "euclidean",
      paletteQuantization: "neuquant",
      colors: 256
    });
    this.palette = pal.getPointContainer().toUint32Array(); // now we can start painting!

    this.iterate();
  };

  PainterApp.prototype.iterate = function () {
    this.numStrokesTried += 1; // 1. paint a brush stroke on imageTemp

    var testimage = brush_1.default(this.imageTemp, this.palette); // 2. compare images

    var newdiff = comparator_1.default(testimage, this.sourcePixels); //console.log(newdiff);
    // 3. if new distance is less than previous distance,
    //    keep the new image

    if (newdiff < this.similarity) {
      this.similarity = newdiff; // copy temp image into image1
      //grab the context from your destination canvas

      var destCtx = this.image1.getContext("2d"); //call its drawImage() function passing it the source canvas directly

      destCtx.drawImage(this.imageTemp, 0, 0);
      this.numStrokesKept += 1;
    } // 4. else don't
    else {
        // copy image1 into temp image
        //grab the context from your destination canvas
        var destCtx = this.imageTemp.getContext("2d"); //call its drawImage() function passing it the source canvas directly

        destCtx.drawImage(this.image1, 0, 0);
      }

    var TARGET = 0.1;

    if (this.similarity > TARGET) {
      // update the text readout.
      this.statsEl.innerText = "" + this.numStrokesKept + "/" + this.numStrokesTried + "=" + this.numStrokesKept / this.numStrokesTried;
      requestAnimationFrame(this.iterate);
    } else {
      console.log("THRESHOLD ACHIEVED!!!!!");
    }
  };

  return PainterApp;
}();

var mypainter = new PainterApp();
},{"image-q":"node_modules/image-q/dist/esm/image-q.js","./comparator":"src/comparator.ts","./brush":"src/brush.ts"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64614" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.ts"], null)
//# sourceMappingURL=/src.f10117fe.js.map