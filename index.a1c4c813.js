// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
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
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"3qIoN":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "28ea12f9d8a2a85de3894bfba1c4c813";
// @flow
/*global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE*/
/*::
import type {
HMRAsset,
HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
(string): mixed;
cache: {|[string]: ParcelModule|};
hotData: mixed;
Module: any;
parent: ?ParcelRequire;
isParcelRequire: true;
modules: {|[string]: [Function, {|[string]: string|}]|};
HMR_BUNDLE_ID: string;
root: ParcelRequire;
}
interface ParcelModule {
hot: {|
data: mixed,
accept(cb: (Function) => void): void,
dispose(cb: (mixed) => void): void,
// accept(deps: Array<string> | string, cb: (Function) => void): void,
// decline(): void,
_acceptCallbacks: Array<(Function) => void>,
_disposeCallbacks: Array<(mixed) => void>,
|};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || (function () {}));
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, /*: {|[string]: boolean|}*/
acceptedAssets, /*: {|[string]: boolean|}*/
/*: {|[string]: boolean|}*/
assetsToAccept;
function getHostname() {
  return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
  return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = getHostname();
  var port = getPort();
  var protocol = HMR_SECURE || location.protocol == 'https:' && !(/localhost|127.0.0.1|0.0.0.0/).test(hostname) ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
  // $FlowFixMe
  ws.onmessage = function (event) /*: {data: string, ...}*/
  {
    checkedAssets = {
      /*: {|[string]: boolean|}*/
    };
    acceptedAssets = {
      /*: {|[string]: boolean|}*/
    };
    assetsToAccept = [];
    var data = /*: HMRMessage*/
    JSON.parse(event.data);
    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH);
      // Handle HMR Update
      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        if (didAccept) {
          handled = true;
        }
      });
      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(module.bundle.root, asset);
        });
        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];
          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }
    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      }
      // Render the fancy html overlay
      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      // $FlowFixMe
      document.body.appendChild(overlay);
    }
  };
  ws.onerror = function (e) {
    console.error(e.message);
  };
  ws.onclose = function (e) {
    if (undefined !== 'test') {
      console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}
function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }
  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]>*/
{
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
        parents.push([bundle, k]);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    if (link.parentNode !== null) {
      // $FlowFixMe
      link.parentNode.removeChild(link);
    }
  };
  newLink.setAttribute('href', // $FlowFixMe
  link.getAttribute('href').split('?')[0] + '?' + Date.now());
  // $FlowFixMe
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      // $FlowFixMe[incompatible-type]
      var href = /*: string*/
      links[i].getAttribute('href');
      var hostname = getHostname();
      var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
      var absolute = (/^https?:\/\//i).test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
      if (!absolute) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
function hmrApply(bundle, /*: ParcelRequire*/
asset) /*:  HMRAsset*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (asset.type === 'css') {
    reloadCSS();
    return;
  }
  let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
  if (deps) {
    var fn = new Function('require', 'module', 'exports', asset.output);
    modules[asset.id] = [fn, deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, /*: ParcelRequire*/
id, /*: ParcelRequire*/
/*: string*/
depsByBundle) /*: ?{ [string]: { [string]: string } }*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
    // If we reached the root bundle without finding where the asset should go,
    // there's nothing to do. Mark as "accepted" so we don't reload the page.
    if (!bundle.parent) {
      return true;
    }
    return hmrAcceptCheck(bundle.parent, id, depsByBundle);
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
  return getParents(module.bundle.root, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1], null);
  });
}
function hmrAcceptRun(bundle, /*: ParcelRequire*/
id) /*: string*/
{
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached && cached.hot) {
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
      var assetsToAlsoAccept = cb(function () {
        return getParents(module.bundle.root, id);
      });
      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }
  acceptedAssets[id] = true;
}

},{}],"2BXqz":[function(require,module,exports) {
!function(){function t(t){return t&&t.__esModule?t.default:t}function e(t,e){var i=t.__state.conversionName.toString(),n=Math.round(t.r),o=Math.round(t.g),r=Math.round(t.b),a=t.a,s=Math.round(t.h),l=t.s.toFixed(1),d=t.v.toFixed(1);if(e||"THREE_CHAR_HEX"===i||"SIX_CHAR_HEX"===i){for(var c=t.hex.toString(16);c.length<6;)c="0"+c;return"#"+c}return"CSS_RGB"===i?"rgb("+n+","+o+","+r+")":"CSS_RGBA"===i?"rgba("+n+","+o+","+r+","+a+")":"HEX"===i?"0x"+t.hex.toString(16):"RGB_ARRAY"===i?"["+n+","+o+","+r+"]":"RGBA_ARRAY"===i?"["+n+","+o+","+r+","+a+"]":"RGB_OBJ"===i?"{r:"+n+",g:"+o+",b:"+r+"}":"RGBA_OBJ"===i?"{r:"+n+",g:"+o+",b:"+r+",a:"+a+"}":"HSV_OBJ"===i?"{h:"+s+",s:"+l+",v:"+d+"}":"HSVA_OBJ"===i?"{h:"+s+",s:"+l+",v:"+d+",a:"+a+"}":"unknown format"}var i=Array.prototype.forEach,n=Array.prototype.slice,o={BREAK:{},extend:function(t){return this.each(n.call(arguments,1),(function(e){(this.isObject(e)?Object.keys(e):[]).forEach(function(i){this.isUndefined(e[i])||(t[i]=e[i])}.bind(this))}),this),t},defaults:function(t){return this.each(n.call(arguments,1),(function(e){(this.isObject(e)?Object.keys(e):[]).forEach(function(i){this.isUndefined(t[i])&&(t[i]=e[i])}.bind(this))}),this),t},compose:function(){var t=n.call(arguments);return function(){for(var e=n.call(arguments),i=t.length-1;i>=0;i--)e=[t[i].apply(this,e)];return e[0]}},each:function(t,e,n){if(t)if(i&&t.forEach&&t.forEach===i)t.forEach(e,n);else if(t.length===t.length+0){var o,r=void 0;for(r=0,o=t.length;r<o;r++)if(r in t&&e.call(n,t[r],r)===this.BREAK)return}else for(var a in t)if(e.call(n,t[a],a)===this.BREAK)return},defer:function(t){setTimeout(t,0)},debounce:function(t,e,i){var n=void 0;return function(){var o=this,r=arguments;function a(){n=null,i||t.apply(o,r)}var s=i||!n;clearTimeout(n),n=setTimeout(a,e),s&&t.apply(o,r)}},toArray:function(t){return t.toArray?t.toArray():n.call(t)},isUndefined:function(t){return void 0===t},isNull:function(t){return null===t},isNaN:function(t){function e(e){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}((function(t){return isNaN(t)})),isArray:Array.isArray||function(t){return t.constructor===Array},isObject:function(t){return t===Object(t)},isNumber:function(t){return t===t+0},isString:function(t){return t===t+""},isBoolean:function(t){return!1===t||!0===t},isFunction:function(t){return t instanceof Function}},r=[{litmus:o.isString,conversions:{THREE_CHAR_HEX:{read:function(t){var e=t.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);return null!==e&&{space:"HEX",hex:parseInt("0x"+e[1].toString()+e[1].toString()+e[2].toString()+e[2].toString()+e[3].toString()+e[3].toString(),0)}},write:e},SIX_CHAR_HEX:{read:function(t){var e=t.match(/^#([A-F0-9]{6})$/i);return null!==e&&{space:"HEX",hex:parseInt("0x"+e[1].toString(),0)}},write:e},CSS_RGB:{read:function(t){var e=t.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);return null!==e&&{space:"RGB",r:parseFloat(e[1]),g:parseFloat(e[2]),b:parseFloat(e[3])}},write:e},CSS_RGBA:{read:function(t){var e=t.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);return null!==e&&{space:"RGB",r:parseFloat(e[1]),g:parseFloat(e[2]),b:parseFloat(e[3]),a:parseFloat(e[4])}},write:e}}},{litmus:o.isNumber,conversions:{HEX:{read:function(t){return{space:"HEX",hex:t,conversionName:"HEX"}},write:function(t){return t.hex}}}},{litmus:o.isArray,conversions:{RGB_ARRAY:{read:function(t){return 3===t.length&&{space:"RGB",r:t[0],g:t[1],b:t[2]}},write:function(t){return[t.r,t.g,t.b]}},RGBA_ARRAY:{read:function(t){return 4===t.length&&{space:"RGB",r:t[0],g:t[1],b:t[2],a:t[3]}},write:function(t){return[t.r,t.g,t.b,t.a]}}}},{litmus:o.isObject,conversions:{RGBA_OBJ:{read:function(t){return!!(o.isNumber(t.r)&&o.isNumber(t.g)&&o.isNumber(t.b)&&o.isNumber(t.a))&&{space:"RGB",r:t.r,g:t.g,b:t.b,a:t.a}},write:function(t){return{r:t.r,g:t.g,b:t.b,a:t.a}}},RGB_OBJ:{read:function(t){return!!(o.isNumber(t.r)&&o.isNumber(t.g)&&o.isNumber(t.b))&&{space:"RGB",r:t.r,g:t.g,b:t.b}},write:function(t){return{r:t.r,g:t.g,b:t.b}}},HSVA_OBJ:{read:function(t){return!!(o.isNumber(t.h)&&o.isNumber(t.s)&&o.isNumber(t.v)&&o.isNumber(t.a))&&{space:"HSV",h:t.h,s:t.s,v:t.v,a:t.a}},write:function(t){return{h:t.h,s:t.s,v:t.v,a:t.a}}},HSV_OBJ:{read:function(t){return!!(o.isNumber(t.h)&&o.isNumber(t.s)&&o.isNumber(t.v))&&{space:"HSV",h:t.h,s:t.s,v:t.v}},write:function(t){return{h:t.h,s:t.s,v:t.v}}}}}],a=void 0,s=void 0,l=function(){s=!1;var t=arguments.length>1?o.toArray(arguments):arguments[0];return o.each(r,(function(e){if(e.litmus(t))return o.each(e.conversions,(function(e,i){if(a=e.read(t),!1===s&&!1!==a)return s=a,a.conversionName=i,a.conversion=e,o.BREAK})),o.BREAK})),s},d=void 0,c={hsv_to_rgb:function(t,e,i){var n=Math.floor(t/60)%6,o=t/60-Math.floor(t/60),r=i*(1-e),a=i*(1-o*e),s=i*(1-(1-o)*e),l=[[i,s,r],[a,i,r],[r,i,s],[r,a,i],[s,r,i],[i,r,a]][n];return{r:255*l[0],g:255*l[1],b:255*l[2]}},rgb_to_hsv:function(t,e,i){var n=Math.min(t,e,i),o=Math.max(t,e,i),r=o-n,a=void 0;return 0===o?{h:NaN,s:0,v:0}:(a=t===o?(e-i)/r:e===o?2+(i-t)/r:4+(t-e)/r,(a/=6)<0&&(a+=1),{h:360*a,s:r/o,v:o/255})},rgb_to_hex:function(t,e,i){var n=this.hex_with_component(0,2,t);return n=this.hex_with_component(n,1,e),n=this.hex_with_component(n,0,i)},component_from_hex:function(t,e){return t>>8*e&255},hex_with_component:function(t,e,i){return i<<(d=8*e)|t&~(255<<d)}},h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},u=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},_=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),p=function t(e,i,n){null===e&&(e=Function.prototype);var o=Object.getOwnPropertyDescriptor(e,i);if(void 0===o){var r=Object.getPrototypeOf(e);return null===r?void 0:t(r,i,n)}if("value"in o)return o.value;var a=o.get;return void 0!==a?a.call(n):void 0},f=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)},m=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e},g=function(){function t(){if(u(this,t),this.__state=l.apply(this,arguments),!1===this.__state)throw new Error("Failed to interpret color arguments");this.__state.a=this.__state.a||1}return _(t,[{key:"toString",value:function(){return e(this)}},{key:"toHexString",value:function(){return e(this,!0)}},{key:"toOriginal",value:function(){return this.__state.conversion.write(this)}}]),t}();function b(t,e,i){Object.defineProperty(t,e,{get:function(){return"RGB"===this.__state.space||g.recalculateRGB(this,e,i),this.__state[e]},set:function(t){"RGB"!==this.__state.space&&(g.recalculateRGB(this,e,i),this.__state.space="RGB"),this.__state[e]=t}})}function v(t,e){Object.defineProperty(t,e,{get:function(){return"HSV"===this.__state.space||g.recalculateHSV(this),this.__state[e]},set:function(t){"HSV"!==this.__state.space&&(g.recalculateHSV(this),this.__state.space="HSV"),this.__state[e]=t}})}g.recalculateRGB=function(t,e,i){if("HEX"===t.__state.space)t.__state[e]=c.component_from_hex(t.__state.hex,i);else{if("HSV"!==t.__state.space)throw new Error("Corrupted color state");o.extend(t.__state,c.hsv_to_rgb(t.__state.h,t.__state.s,t.__state.v))}},g.recalculateHSV=function(t){var e=c.rgb_to_hsv(t.r,t.g,t.b);o.extend(t.__state,{s:e.s,v:e.v}),o.isNaN(e.h)?o.isUndefined(t.__state.h)&&(t.__state.h=0):t.__state.h=e.h},g.COMPONENTS=["r","g","b","h","s","v","hex","a"],b(g.prototype,"r",2),b(g.prototype,"g",1),b(g.prototype,"b",0),v(g.prototype,"h"),v(g.prototype,"s"),v(g.prototype,"v"),Object.defineProperty(g.prototype,"a",{get:function(){return this.__state.a},set:function(t){this.__state.a=t}}),Object.defineProperty(g.prototype,"hex",{get:function(){return"HEX"!==this.__state.space&&(this.__state.hex=c.rgb_to_hex(this.r,this.g,this.b),this.__state.space="HEX"),this.__state.hex},set:function(t){this.__state.space="HEX",this.__state.hex=t}});var y=function(){function t(e,i){u(this,t),this.initialValue=e[i],this.domElement=document.createElement("div"),this.object=e,this.property=i,this.__onChange=void 0,this.__onFinishChange=void 0}return _(t,[{key:"onChange",value:function(t){return this.__onChange=t,this}},{key:"onFinishChange",value:function(t){return this.__onFinishChange=t,this}},{key:"setValue",value:function(t){return this.object[this.property]=t,this.__onChange&&this.__onChange.call(this,t),this.updateDisplay(),this}},{key:"getValue",value:function(){return this.object[this.property]}},{key:"updateDisplay",value:function(){return this}},{key:"isModified",value:function(){return this.initialValue!==this.getValue()}}]),t}(),w={};o.each({HTMLEvents:["change"],MouseEvents:["click","mousemove","mousedown","mouseup","mouseover"],KeyboardEvents:["keydown"]},(function(t,e){o.each(t,(function(t){w[t]=e}))}));var x=/(\d+(\.\d+)?)px/;function C(t){if("0"===t||o.isUndefined(t))return 0;var e=t.match(x);return o.isNull(e)?0:parseFloat(e[1])}var E={makeSelectable:function(t,e){void 0!==t&&void 0!==t.style&&(t.onselectstart=e?function(){return!1}:function(){},t.style.MozUserSelect=e?"auto":"none",t.style.KhtmlUserSelect=e?"auto":"none",t.unselectable=e?"on":"off")},makeFullscreen:function(t,e,i){var n=i,r=e;o.isUndefined(r)&&(r=!0),o.isUndefined(n)&&(n=!0),t.style.position="absolute",r&&(t.style.left=0,t.style.right=0),n&&(t.style.top=0,t.style.bottom=0)},fakeEvent:function(t,e,i,n){var r=i||{},a=w[e];if(!a)throw new Error("Event type "+e+" not supported.");var s=document.createEvent(a);switch(a){case"MouseEvents":var l=r.x||r.clientX||0,d=r.y||r.clientY||0;s.initMouseEvent(e,r.bubbles||!1,r.cancelable||!0,window,r.clickCount||1,0,0,l,d,!1,!1,!1,!1,0,null);break;case"KeyboardEvents":var c=s.initKeyboardEvent||s.initKeyEvent;o.defaults(r,{cancelable:!0,ctrlKey:!1,altKey:!1,shiftKey:!1,metaKey:!1,keyCode:void 0,charCode:void 0}),c(e,r.bubbles||!1,r.cancelable,window,r.ctrlKey,r.altKey,r.shiftKey,r.metaKey,r.keyCode,r.charCode);break;default:s.initEvent(e,r.bubbles||!1,r.cancelable||!0)}o.defaults(s,n),t.dispatchEvent(s)},bind:function(t,e,i,n){var o=n||!1;return t.addEventListener?t.addEventListener(e,i,o):t.attachEvent&&t.attachEvent("on"+e,i),E},unbind:function(t,e,i,n){var o=n||!1;return t.removeEventListener?t.removeEventListener(e,i,o):t.detachEvent&&t.detachEvent("on"+e,i),E},addClass:function(t,e){if(void 0===t.className)t.className=e;else if(t.className!==e){var i=t.className.split(/ +/);-1===i.indexOf(e)&&(i.push(e),t.className=i.join(" ").replace(/^\s+/,"").replace(/\s+$/,""))}return E},removeClass:function(t,e){if(e)if(t.className===e)t.removeAttribute("class");else{var i=t.className.split(/ +/),n=i.indexOf(e);-1!==n&&(i.splice(n,1),t.className=i.join(" "))}else t.className=void 0;return E},hasClass:function(t,e){return new RegExp("(?:^|\\s+)"+e+"(?:\\s+|$)").test(t.className)||!1},getWidth:function(t){var e=getComputedStyle(t);return C(e["border-left-width"])+C(e["border-right-width"])+C(e["padding-left"])+C(e["padding-right"])+C(e.width)},getHeight:function(t){var e=getComputedStyle(t);return C(e["border-top-width"])+C(e["border-bottom-width"])+C(e["padding-top"])+C(e["padding-bottom"])+C(e.height)},getOffset:function(t){var e=t,i={left:0,top:0};if(e.offsetParent)do{i.left+=e.offsetLeft,i.top+=e.offsetTop,e=e.offsetParent}while(e);return i},isActive:function(t){return t===document.activeElement&&(t.type||t.href)}},A=function(t){function e(t,i){u(this,e);var n=m(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,i)),o=n;return n.__prev=n.getValue(),n.__checkbox=document.createElement("input"),n.__checkbox.setAttribute("type","checkbox"),E.bind(n.__checkbox,"change",(function(){o.setValue(!o.__prev)}),!1),n.domElement.appendChild(n.__checkbox),n.updateDisplay(),n}return f(e,t),_(e,[{key:"setValue",value:function(t){var i=p(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setValue",this).call(this,t);return this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue()),this.__prev=this.getValue(),i}},{key:"updateDisplay",value:function(){return!0===this.getValue()?(this.__checkbox.setAttribute("checked","checked"),this.__checkbox.checked=!0,this.__prev=!0):(this.__checkbox.checked=!1,this.__prev=!1),p(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e}(y),k=function(t){function e(t,i,n){u(this,e);var r=m(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,i)),a=n,s=r;if(r.__select=document.createElement("select"),o.isArray(a)){var l={};o.each(a,(function(t){l[t]=t})),a=l}return o.each(a,(function(t,e){var i=document.createElement("option");i.innerHTML=e,i.setAttribute("value",t),s.__select.appendChild(i)})),r.updateDisplay(),E.bind(r.__select,"change",(function(){var t=this.options[this.selectedIndex].value;s.setValue(t)})),r.domElement.appendChild(r.__select),r}return f(e,t),_(e,[{key:"setValue",value:function(t){var i=p(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setValue",this).call(this,t);return this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue()),i}},{key:"updateDisplay",value:function(){return E.isActive(this.__select)?this:(this.__select.value=this.getValue(),p(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this))}}]),e}(y),S=function(t){function e(t,i){u(this,e);var n=m(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,i)),o=n;function r(){o.setValue(o.__input.value)}return n.__input=document.createElement("input"),n.__input.setAttribute("type","text"),E.bind(n.__input,"keyup",r),E.bind(n.__input,"change",r),E.bind(n.__input,"blur",(function(){o.__onFinishChange&&o.__onFinishChange.call(o,o.getValue())})),E.bind(n.__input,"keydown",(function(t){13===t.keyCode&&this.blur()})),n.updateDisplay(),n.domElement.appendChild(n.__input),n}return f(e,t),_(e,[{key:"updateDisplay",value:function(){return E.isActive(this.__input)||(this.__input.value=this.getValue()),p(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e}(y);function O(t){var e=t.toString();return e.indexOf(".")>-1?e.length-e.indexOf(".")-1:0}var T=function(t){function e(t,i,n){u(this,e);var r=m(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,i)),a=n||{};return r.__min=a.min,r.__max=a.max,r.__step=a.step,o.isUndefined(r.__step)?0===r.initialValue?r.__impliedStep=1:r.__impliedStep=Math.pow(10,Math.floor(Math.log(Math.abs(r.initialValue))/Math.LN10))/10:r.__impliedStep=r.__step,r.__precision=O(r.__impliedStep),r}return f(e,t),_(e,[{key:"setValue",value:function(t){var i=t;return void 0!==this.__min&&i<this.__min?i=this.__min:void 0!==this.__max&&i>this.__max&&(i=this.__max),void 0!==this.__step&&i%this.__step!=0&&(i=Math.round(i/this.__step)*this.__step),p(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setValue",this).call(this,i)}},{key:"min",value:function(t){return this.__min=t,this}},{key:"max",value:function(t){return this.__max=t,this}},{key:"step",value:function(t){return this.__step=t,this.__impliedStep=t,this.__precision=O(t),this}}]),e}(y);var L=function(t){function e(t,i,n){u(this,e);var r=m(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,i,n));r.__truncationSuspended=!1;var a=r,s=void 0;function l(){a.__onFinishChange&&a.__onFinishChange.call(a,a.getValue())}function d(t){var e=s-t.clientY;a.setValue(a.getValue()+e*a.__impliedStep),s=t.clientY}function c(){E.unbind(window,"mousemove",d),E.unbind(window,"mouseup",c),l()}return r.__input=document.createElement("input"),r.__input.setAttribute("type","text"),E.bind(r.__input,"change",(function(){var t=parseFloat(a.__input.value);o.isNaN(t)||a.setValue(t)})),E.bind(r.__input,"blur",(function(){l()})),E.bind(r.__input,"mousedown",(function(t){E.bind(window,"mousemove",d),E.bind(window,"mouseup",c),s=t.clientY})),E.bind(r.__input,"keydown",(function(t){13===t.keyCode&&(a.__truncationSuspended=!0,this.blur(),a.__truncationSuspended=!1,l())})),r.updateDisplay(),r.domElement.appendChild(r.__input),r}return f(e,t),_(e,[{key:"updateDisplay",value:function(){var t,i,n;return this.__input.value=this.__truncationSuspended?this.getValue():(t=this.getValue(),i=this.__precision,n=Math.pow(10,i),Math.round(t*n)/n),p(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e}(T);function P(t,e,i,n,o){return n+(t-e)/(i-e)*(o-n)}var M=function(t){function e(t,i,n,o,r){u(this,e);var a=m(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,i,{min:n,max:o,step:r})),s=a;function l(t){t.preventDefault();var e=s.__background.getBoundingClientRect();return s.setValue(P(t.clientX,e.left,e.right,s.__min,s.__max)),!1}function d(){E.unbind(window,"mousemove",l),E.unbind(window,"mouseup",d),s.__onFinishChange&&s.__onFinishChange.call(s,s.getValue())}function c(t){var e=t.touches[0].clientX,i=s.__background.getBoundingClientRect();s.setValue(P(e,i.left,i.right,s.__min,s.__max))}function h(){E.unbind(window,"touchmove",c),E.unbind(window,"touchend",h),s.__onFinishChange&&s.__onFinishChange.call(s,s.getValue())}return a.__background=document.createElement("div"),a.__foreground=document.createElement("div"),E.bind(a.__background,"mousedown",(function(t){document.activeElement.blur(),E.bind(window,"mousemove",l),E.bind(window,"mouseup",d),l(t)})),E.bind(a.__background,"touchstart",(function(t){if(1!==t.touches.length)return;E.bind(window,"touchmove",c),E.bind(window,"touchend",h),c(t)})),E.addClass(a.__background,"slider"),E.addClass(a.__foreground,"slider-fg"),a.updateDisplay(),a.__background.appendChild(a.__foreground),a.domElement.appendChild(a.__background),a}return f(e,t),_(e,[{key:"updateDisplay",value:function(){var t=(this.getValue()-this.__min)/(this.__max-this.__min);return this.__foreground.style.width=100*t+"%",p(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e}(T),R=function(t){function e(t,i,n){u(this,e);var o=m(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,i)),r=o;return o.__button=document.createElement("div"),o.__button.innerHTML=void 0===n?"Fire":n,E.bind(o.__button,"click",(function(t){return t.preventDefault(),r.fire(),!1})),E.addClass(o.__button,"button"),o.domElement.appendChild(o.__button),o}return f(e,t),_(e,[{key:"fire",value:function(){this.__onChange&&this.__onChange.call(this),this.getValue().call(this.object),this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue())}}]),e}(y),D=function(t){function e(t,i){u(this,e);var n=m(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,i));n.__color=new g(n.getValue()),n.__temp=new g(0);var r=n;n.domElement=document.createElement("div"),E.makeSelectable(n.domElement,!1),n.__selector=document.createElement("div"),n.__selector.className="selector",n.__saturation_field=document.createElement("div"),n.__saturation_field.className="saturation-field",n.__field_knob=document.createElement("div"),n.__field_knob.className="field-knob",n.__field_knob_border="2px solid ",n.__hue_knob=document.createElement("div"),n.__hue_knob.className="hue-knob",n.__hue_field=document.createElement("div"),n.__hue_field.className="hue-field",n.__input=document.createElement("input"),n.__input.type="text",n.__input_textShadow="0 1px 1px ",E.bind(n.__input,"keydown",(function(t){13===t.keyCode&&p.call(this)})),E.bind(n.__input,"blur",p),E.bind(n.__selector,"mousedown",(function(){E.addClass(this,"drag").bind(window,"mouseup",(function(){E.removeClass(r.__selector,"drag")}))})),E.bind(n.__selector,"touchstart",(function(){E.addClass(this,"drag").bind(window,"touchend",(function(){E.removeClass(r.__selector,"drag")}))}));var a,s=document.createElement("div");function d(t){b(t),E.bind(window,"mousemove",b),E.bind(window,"touchmove",b),E.bind(window,"mouseup",h),E.bind(window,"touchend",h)}function c(t){v(t),E.bind(window,"mousemove",v),E.bind(window,"touchmove",v),E.bind(window,"mouseup",_),E.bind(window,"touchend",_)}function h(){E.unbind(window,"mousemove",b),E.unbind(window,"touchmove",b),E.unbind(window,"mouseup",h),E.unbind(window,"touchend",h),f()}function _(){E.unbind(window,"mousemove",v),E.unbind(window,"touchmove",v),E.unbind(window,"mouseup",_),E.unbind(window,"touchend",_),f()}function p(){var t=l(this.value);!1!==t?(r.__color.__state=t,r.setValue(r.__color.toOriginal())):this.value=r.__color.toString()}function f(){r.__onFinishChange&&r.__onFinishChange.call(r,r.__color.toOriginal())}function b(t){-1===t.type.indexOf("touch")&&t.preventDefault();var e=r.__saturation_field.getBoundingClientRect(),i=t.touches&&t.touches[0]||t,n=i.clientX,o=i.clientY,a=(n-e.left)/(e.right-e.left),s=1-(o-e.top)/(e.bottom-e.top);return s>1?s=1:s<0&&(s=0),a>1?a=1:a<0&&(a=0),r.__color.v=s,r.__color.s=a,r.setValue(r.__color.toOriginal()),!1}function v(t){-1===t.type.indexOf("touch")&&t.preventDefault();var e=r.__hue_field.getBoundingClientRect(),i=1-((t.touches&&t.touches[0]||t).clientY-e.top)/(e.bottom-e.top);return i>1?i=1:i<0&&(i=0),r.__color.h=360*i,r.setValue(r.__color.toOriginal()),!1}return o.extend(n.__selector.style,{width:"122px",height:"102px",padding:"3px",backgroundColor:"#222",boxShadow:"0px 1px 3px rgba(0,0,0,0.3)"}),o.extend(n.__field_knob.style,{position:"absolute",width:"12px",height:"12px",border:n.__field_knob_border+(n.__color.v<.5?"#fff":"#000"),boxShadow:"0px 1px 3px rgba(0,0,0,0.5)",borderRadius:"12px",zIndex:1}),o.extend(n.__hue_knob.style,{position:"absolute",width:"15px",height:"2px",borderRight:"4px solid #fff",zIndex:1}),o.extend(n.__saturation_field.style,{width:"100px",height:"100px",border:"1px solid #555",marginRight:"3px",display:"inline-block",cursor:"pointer"}),o.extend(s.style,{width:"100%",height:"100%",background:"none"}),H(s,"top","rgba(0,0,0,0)","#000"),o.extend(n.__hue_field.style,{width:"15px",height:"100px",border:"1px solid #555",cursor:"ns-resize",position:"absolute",top:"3px",right:"3px"}),(a=n.__hue_field).style.background="",a.style.cssText+="background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);",a.style.cssText+="background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",a.style.cssText+="background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",a.style.cssText+="background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",a.style.cssText+="background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",o.extend(n.__input.style,{outline:"none",textAlign:"center",color:"#fff",border:0,fontWeight:"bold",textShadow:n.__input_textShadow+"rgba(0,0,0,0.7)"}),E.bind(n.__saturation_field,"mousedown",d),E.bind(n.__saturation_field,"touchstart",d),E.bind(n.__field_knob,"mousedown",d),E.bind(n.__field_knob,"touchstart",d),E.bind(n.__hue_field,"mousedown",c),E.bind(n.__hue_field,"touchstart",c),n.__saturation_field.appendChild(s),n.__selector.appendChild(n.__field_knob),n.__selector.appendChild(n.__saturation_field),n.__selector.appendChild(n.__hue_field),n.__hue_field.appendChild(n.__hue_knob),n.domElement.appendChild(n.__input),n.domElement.appendChild(n.__selector),n.updateDisplay(),n}return f(e,t),_(e,[{key:"updateDisplay",value:function(){var t=l(this.getValue());if(!1!==t){var e=!1;o.each(g.COMPONENTS,(function(i){if(!o.isUndefined(t[i])&&!o.isUndefined(this.__color.__state[i])&&t[i]!==this.__color.__state[i])return e=!0,{}}),this),e&&o.extend(this.__color.__state,t)}o.extend(this.__temp.__state,this.__color.__state),this.__temp.a=1;var i=this.__color.v<.5||this.__color.s>.5?255:0,n=255-i;o.extend(this.__field_knob.style,{marginLeft:100*this.__color.s-7+"px",marginTop:100*(1-this.__color.v)-7+"px",backgroundColor:this.__temp.toHexString(),border:this.__field_knob_border+"rgb("+i+","+i+","+i+")"}),this.__hue_knob.style.marginTop=100*(1-this.__color.h/360)+"px",this.__temp.s=1,this.__temp.v=1,H(this.__saturation_field,"left","#fff",this.__temp.toHexString()),this.__input.value=this.__color.toString(),o.extend(this.__input.style,{backgroundColor:this.__color.toHexString(),color:"rgb("+i+","+i+","+i+")",textShadow:this.__input_textShadow+"rgba("+n+","+n+","+n+",.7)"})}}]),e}(y),B=["-moz-","-o-","-webkit-","-ms-",""];function H(t,e,i,n){t.style.background="",o.each(B,(function(o){t.style.cssText+="background: "+o+"linear-gradient("+e+", "+i+" 0%, "+n+" 100%); "}))}var F=function(t,e){var i=e||document,n=document.createElement("style");n.type="text/css",n.innerHTML=t;var o=i.getElementsByTagName("head")[0];try{o.appendChild(n)}catch(t){}},I='<div id="dg-save" class="dg dialogue">\n\n  Here\'s the new load parameter for your <code>GUI</code>\'s constructor:\n\n  <textarea id="dg-new-constructor"></textarea>\n\n  <div id="dg-save-locally">\n\n    <input id="dg-local-storage" type="checkbox"/> Automatically save\n    values to <code>localStorage</code> on exit.\n\n    <div id="dg-local-explain">The values saved to <code>localStorage</code> will\n      override those passed to <code>dat.GUI</code>\'s constructor. This makes it\n      easier to work incrementally, but <code>localStorage</code> is fragile,\n      and your friends may not see the same values you do.\n\n    </div>\n\n  </div>\n\n</div>',N=function(t,e){var i=t[e];return o.isArray(arguments[2])||o.isObject(arguments[2])?new k(t,e,arguments[2]):o.isNumber(i)?o.isNumber(arguments[2])&&o.isNumber(arguments[3])?o.isNumber(arguments[4])?new M(t,e,arguments[2],arguments[3],arguments[4]):new M(t,e,arguments[2],arguments[3]):o.isNumber(arguments[4])?new L(t,e,{min:arguments[2],max:arguments[3],step:arguments[4]}):new L(t,e,{min:arguments[2],max:arguments[3]}):o.isString(i)?new S(t,e):o.isFunction(i)?new R(t,e,""):o.isBoolean(i)?new A(t,e):null};var j=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){setTimeout(t,1e3/60)},V=function(){function t(){u(this,t),this.backgroundElement=document.createElement("div"),o.extend(this.backgroundElement.style,{backgroundColor:"rgba(0,0,0,0.8)",top:0,left:0,display:"none",zIndex:"1000",opacity:0,WebkitTransition:"opacity 0.2s linear",transition:"opacity 0.2s linear"}),E.makeFullscreen(this.backgroundElement),this.backgroundElement.style.position="fixed",this.domElement=document.createElement("div"),o.extend(this.domElement.style,{position:"fixed",display:"none",zIndex:"1001",opacity:0,WebkitTransition:"-webkit-transform 0.2s ease-out, opacity 0.2s linear",transition:"transform 0.2s ease-out, opacity 0.2s linear"}),document.body.appendChild(this.backgroundElement),document.body.appendChild(this.domElement);var e=this;E.bind(this.backgroundElement,"click",(function(){e.hide()}))}return _(t,[{key:"show",value:function(){var t=this;this.backgroundElement.style.display="block",this.domElement.style.display="block",this.domElement.style.opacity=0,this.domElement.style.webkitTransform="scale(1.1)",this.layout(),o.defer((function(){t.backgroundElement.style.opacity=1,t.domElement.style.opacity=1,t.domElement.style.webkitTransform="scale(1)"}))}},{key:"hide",value:function(){var t=this,e=function e(){t.domElement.style.display="none",t.backgroundElement.style.display="none",E.unbind(t.domElement,"webkitTransitionEnd",e),E.unbind(t.domElement,"transitionend",e),E.unbind(t.domElement,"oTransitionEnd",e)};E.bind(this.domElement,"webkitTransitionEnd",e),E.bind(this.domElement,"transitionend",e),E.bind(this.domElement,"oTransitionEnd",e),this.backgroundElement.style.opacity=0,this.domElement.style.opacity=0,this.domElement.style.webkitTransform="scale(1.1)"}},{key:"layout",value:function(){this.domElement.style.left=window.innerWidth/2-E.getWidth(this.domElement)/2+"px",this.domElement.style.top=window.innerHeight/2-E.getHeight(this.domElement)/2+"px"}}]),t}();F(function(t){if(t&&"undefined"!=typeof window){var e=document.createElement("style");return e.setAttribute("type","text/css"),e.innerHTML=t,document.head.appendChild(e),t}}(".dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear;border:0;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button.close-top{position:relative}.dg.main .close-button.close-bottom{position:absolute}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-y:visible}.dg.a.has-save>ul.close-top{margin-top:0}.dg.a.has-save>ul.close-bottom{margin-top:27px}.dg.a.has-save>ul.closed{margin-top:0}.dg.a .save-row{top:0;z-index:1002}.dg.a .save-row.close-top{position:relative}.dg.a .save-row.close-bottom{position:fixed}.dg li{-webkit-transition:height .1s ease-out;-o-transition:height .1s ease-out;-moz-transition:height .1s ease-out;transition:height .1s ease-out;-webkit-transition:overflow .1s linear;-o-transition:overflow .1s linear;-moz-transition:overflow .1s linear;transition:overflow .1s linear}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li>*{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px;overflow:hidden}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .c{float:left;width:60%;position:relative}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:7px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .cr.color{overflow:visible}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.color{border-left:3px solid}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2FA1D6}.dg .cr.number input[type=text]{color:#2FA1D6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2FA1D6;max-width:100%}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}\n"));var G="Default",z=function(){try{return!!window.localStorage}catch(t){return!1}}(),U=void 0,X=!0,K=void 0,W=!1,Y=[],J=function t(e){var i=this,n=e||{};this.domElement=document.createElement("div"),this.__ul=document.createElement("ul"),this.domElement.appendChild(this.__ul),E.addClass(this.domElement,"dg"),this.__folders={},this.__controllers=[],this.__rememberedObjects=[],this.__rememberedObjectIndecesToControllers=[],this.__listening=[],n=o.defaults(n,{closeOnTop:!1,autoPlace:!0,width:t.DEFAULT_WIDTH}),n=o.defaults(n,{resizable:n.autoPlace,hideable:n.autoPlace}),o.isUndefined(n.load)?n.load={preset:G}:n.preset&&(n.load.preset=n.preset),o.isUndefined(n.parent)&&n.hideable&&Y.push(this),n.resizable=o.isUndefined(n.parent)&&n.resizable,n.autoPlace&&o.isUndefined(n.scrollable)&&(n.scrollable=!0);var r,a=z&&"true"===localStorage.getItem(et(this,"isLocal")),s=void 0,l=void 0;if(Object.defineProperties(this,{parent:{get:function(){return n.parent}},scrollable:{get:function(){return n.scrollable}},autoPlace:{get:function(){return n.autoPlace}},closeOnTop:{get:function(){return n.closeOnTop}},preset:{get:function(){return i.parent?i.getRoot().preset:n.load.preset},set:function(t){i.parent?i.getRoot().preset=t:n.load.preset=t,function(t){for(var e=0;e<t.__preset_select.length;e++)t.__preset_select[e].value===t.preset&&(t.__preset_select.selectedIndex=e)}(this),i.revert()}},width:{get:function(){return n.width},set:function(t){n.width=t,rt(i,t)}},name:{get:function(){return n.name},set:function(t){n.name=t,l&&(l.innerHTML=n.name)}},closed:{get:function(){return n.closed},set:function(e){n.closed=e,n.closed?E.addClass(i.__ul,t.CLASS_CLOSED):E.removeClass(i.__ul,t.CLASS_CLOSED),this.onResize(),i.__closeButton&&(i.__closeButton.innerHTML=e?t.TEXT_OPEN:t.TEXT_CLOSED)}},load:{get:function(){return n.load}},useLocalStorage:{get:function(){return a},set:function(t){z&&(a=t,t?E.bind(window,"unload",s):E.unbind(window,"unload",s),localStorage.setItem(et(i,"isLocal"),t))}}}),o.isUndefined(n.parent)){if(this.closed=n.closed||!1,E.addClass(this.domElement,t.CLASS_MAIN),E.makeSelectable(this.domElement,!1),z&&a){i.useLocalStorage=!0;var d=localStorage.getItem(et(this,"gui"));d&&(n.load=JSON.parse(d))}this.__closeButton=document.createElement("div"),this.__closeButton.innerHTML=t.TEXT_CLOSED,E.addClass(this.__closeButton,t.CLASS_CLOSE_BUTTON),n.closeOnTop?(E.addClass(this.__closeButton,t.CLASS_CLOSE_TOP),this.domElement.insertBefore(this.__closeButton,this.domElement.childNodes[0])):(E.addClass(this.__closeButton,t.CLASS_CLOSE_BOTTOM),this.domElement.appendChild(this.__closeButton)),E.bind(this.__closeButton,"click",(function(){i.closed=!i.closed}))}else{void 0===n.closed&&(n.closed=!0);var c=document.createTextNode(n.name);E.addClass(c,"controller-name"),l=Q(i,c);E.addClass(this.__ul,t.CLASS_CLOSED),E.addClass(l,"title"),E.bind(l,"click",(function(t){return t.preventDefault(),i.closed=!i.closed,!1})),n.closed||(this.closed=!1)}n.autoPlace&&(o.isUndefined(n.parent)&&(X&&(K=document.createElement("div"),E.addClass(K,"dg"),E.addClass(K,t.CLASS_AUTO_PLACE_CONTAINER),document.body.appendChild(K),X=!1),K.appendChild(this.domElement),E.addClass(this.domElement,t.CLASS_AUTO_PLACE)),this.parent||rt(i,n.width)),this.__resizeHandler=function(){i.onResizeDebounced()},E.bind(window,"resize",this.__resizeHandler),E.bind(this.__ul,"webkitTransitionEnd",this.__resizeHandler),E.bind(this.__ul,"transitionend",this.__resizeHandler),E.bind(this.__ul,"oTransitionEnd",this.__resizeHandler),this.onResize(),n.resizable&&function(t){var e=void 0;function i(i){return i.preventDefault(),t.width+=e-i.clientX,t.onResize(),e=i.clientX,!1}function n(){E.removeClass(t.__closeButton,J.CLASS_DRAG),E.unbind(window,"mousemove",i),E.unbind(window,"mouseup",n)}function r(o){return o.preventDefault(),e=o.clientX,E.addClass(t.__closeButton,J.CLASS_DRAG),E.bind(window,"mousemove",i),E.bind(window,"mouseup",n),!1}t.__resize_handle=document.createElement("div"),o.extend(t.__resize_handle.style,{width:"6px",marginLeft:"-3px",height:"200px",cursor:"ew-resize",position:"absolute"}),E.bind(t.__resize_handle,"mousedown",r),E.bind(t.__closeButton,"mousedown",r),t.domElement.insertBefore(t.__resize_handle,t.domElement.firstElementChild)}(this),s=function(){z&&"true"===localStorage.getItem(et(i,"isLocal"))&&localStorage.setItem(et(i,"gui"),JSON.stringify(i.getSaveObject()))},this.saveToLocalStorageIfPossible=s,n.parent||((r=i.getRoot()).width+=1,o.defer((function(){r.width-=1})))};function Q(t,e,i){var n=document.createElement("li");return e&&n.appendChild(e),i?t.__ul.insertBefore(n,i):t.__ul.appendChild(n),t.onResize(),n}function q(t){E.unbind(window,"resize",t.__resizeHandler),t.saveToLocalStorageIfPossible&&E.unbind(window,"unload",t.saveToLocalStorageIfPossible)}function Z(t,e){var i=t.__preset_select[t.__preset_select.selectedIndex];i.innerHTML=e?i.value+"*":i.value}function $(t,e){var i=t.getRoot(),n=i.__rememberedObjects.indexOf(e.object);if(-1!==n){var o=i.__rememberedObjectIndecesToControllers[n];if(void 0===o&&(o={},i.__rememberedObjectIndecesToControllers[n]=o),o[e.property]=e,i.load&&i.load.remembered){var r=i.load.remembered,a=void 0;if(r[t.preset])a=r[t.preset];else{if(!r.Default)return;a=r.Default}if(a[n]&&void 0!==a[n][e.property]){var s=a[n][e.property];e.initialValue=s,e.setValue(s)}}}}function tt(t,e,i,n){if(void 0===e[i])throw new Error('Object "'+e+'" has no property "'+i+'"');var r=void 0;if(n.color)r=new D(e,i);else{var a=[e,i].concat(n.factoryArgs);r=N.apply(t,a)}n.before instanceof y&&(n.before=n.before.__li),$(t,r),E.addClass(r.domElement,"c");var s=document.createElement("span");E.addClass(s,"property-name"),s.innerHTML=r.property;var l=document.createElement("div");l.appendChild(s),l.appendChild(r.domElement);var d=Q(t,l,n.before);return E.addClass(d,J.CLASS_CONTROLLER_ROW),r instanceof D?E.addClass(d,"color"):E.addClass(d,h(r.getValue())),function(t,e,i){if(i.__li=e,i.__gui=t,o.extend(i,{options:function(e){if(arguments.length>1){var n=i.__li.nextElementSibling;return i.remove(),tt(t,i.object,i.property,{before:n,factoryArgs:[o.toArray(arguments)]})}if(o.isArray(e)||o.isObject(e)){var r=i.__li.nextElementSibling;return i.remove(),tt(t,i.object,i.property,{before:r,factoryArgs:[e]})}},name:function(t){return i.__li.firstElementChild.firstElementChild.innerHTML=t,i},listen:function(){return i.__gui.listen(i),i},remove:function(){return i.__gui.remove(i),i}}),i instanceof M){var n=new L(i.object,i.property,{min:i.__min,max:i.__max,step:i.__step});o.each(["updateDisplay","onChange","onFinishChange","step","min","max"],(function(t){var e=i[t],o=n[t];i[t]=n[t]=function(){var t=Array.prototype.slice.call(arguments);return o.apply(n,t),e.apply(i,t)}})),E.addClass(e,"has-slider"),i.domElement.insertBefore(n.domElement,i.domElement.firstElementChild)}else if(i instanceof L){var r=function(e){if(o.isNumber(i.__min)&&o.isNumber(i.__max)){var n=i.__li.firstElementChild.firstElementChild.innerHTML,r=i.__gui.__listening.indexOf(i)>-1;i.remove();var a=tt(t,i.object,i.property,{before:i.__li.nextElementSibling,factoryArgs:[i.__min,i.__max,i.__step]});return a.name(n),r&&a.listen(),a}return e};i.min=o.compose(r,i.min),i.max=o.compose(r,i.max)}else i instanceof A?(E.bind(e,"click",(function(){E.fakeEvent(i.__checkbox,"click")})),E.bind(i.__checkbox,"click",(function(t){t.stopPropagation()}))):i instanceof R?(E.bind(e,"click",(function(){E.fakeEvent(i.__button,"click")})),E.bind(e,"mouseover",(function(){E.addClass(i.__button,"hover")})),E.bind(e,"mouseout",(function(){E.removeClass(i.__button,"hover")}))):i instanceof D&&(E.addClass(e,"color"),i.updateDisplay=o.compose((function(t){return e.style.borderLeftColor=i.__color.toString(),t}),i.updateDisplay),i.updateDisplay());i.setValue=o.compose((function(e){return t.getRoot().__preset_select&&i.isModified()&&Z(t.getRoot(),!0),e}),i.setValue)}(t,d,r),t.__controllers.push(r),r}function et(t,e){return document.location.href+"."+e}function it(t,e,i){var n=document.createElement("option");n.innerHTML=e,n.value=e,t.__preset_select.appendChild(n),i&&(t.__preset_select.selectedIndex=t.__preset_select.length-1)}function nt(t,e){e.style.display=t.useLocalStorage?"block":"none"}function ot(t){var e=t.__save_row=document.createElement("li");E.addClass(t.domElement,"has-save"),t.__ul.insertBefore(e,t.__ul.firstChild),E.addClass(e,"save-row");var i=document.createElement("span");i.innerHTML="&nbsp;",E.addClass(i,"button gears");var n=document.createElement("span");n.innerHTML="Save",E.addClass(n,"button"),E.addClass(n,"save");var r=document.createElement("span");r.innerHTML="New",E.addClass(r,"button"),E.addClass(r,"save-as");var a=document.createElement("span");a.innerHTML="Revert",E.addClass(a,"button"),E.addClass(a,"revert");var s=t.__preset_select=document.createElement("select");if(t.load&&t.load.remembered?o.each(t.load.remembered,(function(e,i){it(t,i,i===t.preset)})):it(t,G,!1),E.bind(s,"change",(function(){for(var e=0;e<t.__preset_select.length;e++)t.__preset_select[e].innerHTML=t.__preset_select[e].value;t.preset=this.value})),e.appendChild(s),e.appendChild(i),e.appendChild(n),e.appendChild(r),e.appendChild(a),z){var l=document.getElementById("dg-local-explain"),d=document.getElementById("dg-local-storage");document.getElementById("dg-save-locally").style.display="block","true"===localStorage.getItem(et(0,"isLocal"))&&d.setAttribute("checked","checked"),nt(t,l),E.bind(d,"change",(function(){t.useLocalStorage=!t.useLocalStorage,nt(t,l)}))}var c=document.getElementById("dg-new-constructor");E.bind(c,"keydown",(function(t){!t.metaKey||67!==t.which&&67!==t.keyCode||U.hide()})),E.bind(i,"click",(function(){c.innerHTML=JSON.stringify(t.getSaveObject(),void 0,2),U.show(),c.focus(),c.select()})),E.bind(n,"click",(function(){t.save()})),E.bind(r,"click",(function(){var e=prompt("Enter a new preset name.");e&&t.saveAs(e)})),E.bind(a,"click",(function(){t.revert()}))}function rt(t,e){t.domElement.style.width=e+"px",t.__save_row&&t.autoPlace&&(t.__save_row.style.width=e+"px"),t.__closeButton&&(t.__closeButton.style.width=e+"px")}function at(t,e){var i={};return o.each(t.__rememberedObjects,(function(n,r){var a={},s=t.__rememberedObjectIndecesToControllers[r];o.each(s,(function(t,i){a[i]=e?t.initialValue:t.getValue()})),i[r]=a})),i}function st(t){0!==t.length&&j.call(window,(function(){st(t)})),o.each(t,(function(t){t.updateDisplay()}))}J.toggleHide=function(){W=!W,o.each(Y,(function(t){t.domElement.style.display=W?"none":""}))},J.CLASS_AUTO_PLACE="a",J.CLASS_AUTO_PLACE_CONTAINER="ac",J.CLASS_MAIN="main",J.CLASS_CONTROLLER_ROW="cr",J.CLASS_TOO_TALL="taller-than-window",J.CLASS_CLOSED="closed",J.CLASS_CLOSE_BUTTON="close-button",J.CLASS_CLOSE_TOP="close-top",J.CLASS_CLOSE_BOTTOM="close-bottom",J.CLASS_DRAG="drag",J.DEFAULT_WIDTH=245,J.TEXT_CLOSED="Close Controls",J.TEXT_OPEN="Open Controls",J._keydownHandler=function(t){"text"===document.activeElement.type||72!==t.which&&72!==t.keyCode||J.toggleHide()},E.bind(window,"keydown",J._keydownHandler,!1),o.extend(J.prototype,{add:function(t,e){return tt(this,t,e,{factoryArgs:Array.prototype.slice.call(arguments,2)})},addColor:function(t,e){return tt(this,t,e,{color:!0})},remove:function(t){this.__ul.removeChild(t.__li),this.__controllers.splice(this.__controllers.indexOf(t),1);var e=this;o.defer((function(){e.onResize()}))},destroy:function(){if(this.parent)throw new Error("Only the root GUI should be removed with .destroy(). For subfolders, use gui.removeFolder(folder) instead.");this.autoPlace&&K.removeChild(this.domElement);var t=this;o.each(this.__folders,(function(e){t.removeFolder(e)})),E.unbind(window,"keydown",J._keydownHandler,!1),q(this)},addFolder:function(t){if(void 0!==this.__folders[t])throw new Error('You already have a folder in this GUI by the name "'+t+'"');var e={name:t,parent:this};e.autoPlace=this.autoPlace,this.load&&this.load.folders&&this.load.folders[t]&&(e.closed=this.load.folders[t].closed,e.load=this.load.folders[t]);var i=new J(e);this.__folders[t]=i;var n=Q(this,i.domElement);return E.addClass(n,"folder"),i},removeFolder:function(t){this.__ul.removeChild(t.domElement.parentElement),delete this.__folders[t.name],this.load&&this.load.folders&&this.load.folders[t.name]&&delete this.load.folders[t.name],q(t);var e=this;o.each(t.__folders,(function(e){t.removeFolder(e)})),o.defer((function(){e.onResize()}))},open:function(){this.closed=!1},close:function(){this.closed=!0},hide:function(){this.domElement.style.display="none"},show:function(){this.domElement.style.display=""},onResize:function(){var t=this.getRoot();if(t.scrollable){var e=E.getOffset(t.__ul).top,i=0;o.each(t.__ul.childNodes,(function(e){t.autoPlace&&e===t.__save_row||(i+=E.getHeight(e))})),window.innerHeight-e-20<i?(E.addClass(t.domElement,J.CLASS_TOO_TALL),t.__ul.style.height=window.innerHeight-e-20+"px"):(E.removeClass(t.domElement,J.CLASS_TOO_TALL),t.__ul.style.height="auto")}t.__resize_handle&&o.defer((function(){t.__resize_handle.style.height=t.__ul.offsetHeight+"px"})),t.__closeButton&&(t.__closeButton.style.width=t.width+"px")},onResizeDebounced:o.debounce((function(){this.onResize()}),50),remember:function(){if(o.isUndefined(U)&&((U=new V).domElement.innerHTML=I),this.parent)throw new Error("You can only call remember on a top level GUI.");var t=this;o.each(Array.prototype.slice.call(arguments),(function(e){0===t.__rememberedObjects.length&&ot(t),-1===t.__rememberedObjects.indexOf(e)&&t.__rememberedObjects.push(e)})),this.autoPlace&&rt(this,this.width)},getRoot:function(){for(var t=this;t.parent;)t=t.parent;return t},getSaveObject:function(){var t=this.load;return t.closed=this.closed,this.__rememberedObjects.length>0&&(t.preset=this.preset,t.remembered||(t.remembered={}),t.remembered[this.preset]=at(this)),t.folders={},o.each(this.__folders,(function(e,i){t.folders[i]=e.getSaveObject()})),t},save:function(){this.load.remembered||(this.load.remembered={}),this.load.remembered[this.preset]=at(this),Z(this,!1),this.saveToLocalStorageIfPossible()},saveAs:function(t){this.load.remembered||(this.load.remembered={},this.load.remembered.Default=at(this,!0)),this.load.remembered[t]=at(this),this.preset=t,it(this,t,!0),this.saveToLocalStorageIfPossible()},revert:function(t){o.each(this.__controllers,(function(e){this.getRoot().load.remembered?$(t||this.getRoot(),e):e.setValue(e.initialValue),e.__onFinishChange&&e.__onFinishChange.call(e,e.getValue())}),this),o.each(this.__folders,(function(t){t.revert(t)})),t||Z(this.getRoot(),!1)},listen:function(t){var e=0===this.__listening.length;this.__listening.push(t),e&&st(this.__listening)},updateDisplay:function(){o.each(this.__controllers,(function(t){t.updateDisplay()})),o.each(this.__folders,(function(t){t.updateDisplay()}))}});var lt=J,dt={};(function(){function t(t){if(t=t||{},this.method=t.method||2,this.colors=t.colors||256,this.initColors=t.initColors||4096,this.initDist=t.initDist||.01,this.distIncr=t.distIncr||.005,this.hueGroups=t.hueGroups||10,this.satGroups=t.satGroups||10,this.lumGroups=t.lumGroups||10,this.minHueCols=t.minHueCols||0,this.hueStats=this.minHueCols?new e(this.hueGroups,this.minHueCols):null,this.boxSize=t.boxSize||[64,64],this.boxPxls=t.boxPxls||2,this.palLocked=!1,this.dithKern=t.dithKern||null,this.dithSerp=t.dithSerp||!1,this.dithDelta=t.dithDelta||0,this.histogram={},this.idxrgb=t.palette?t.palette.slice(0):[],this.idxi32=[],this.i32idx={},this.i32rgb={},this.useCache=!1!==t.useCache,this.cacheFreq=t.cacheFreq||10,this.reIndex=t.reIndex||0==this.idxrgb.length,this.colorDist="manhattan"==t.colorDist?l:s,this.idxrgb.length>0){var i=this;this.idxrgb.forEach((function(t,e){var n=(255<<24|t[2]<<16|t[1]<<8|t[0])>>>0;i.idxi32[e]=n,i.i32idx[n]=e,i.i32rgb[n]=t}))}}function e(t,e){this.numGroups=t,this.minCols=e,this.stats={};for(var i=-1;i<t;i++)this.stats[i]={num:0,cols:[]};this.groupsFull=0}t.prototype.sample=function(t,e){if(this.palLocked)throw"Cannot sample additional images, palette already assembled.";var i=p(t,e);switch(this.method){case 1:this.colorStats1D(i.buf32);break;case 2:this.colorStats2D(i.buf32,i.width)}},t.prototype.reduce=function(t,e,i,n){if(this.palLocked||this.buildPal(),i=i||this.dithKern,n=void 0!==n?n:this.dithSerp,e=e||1,i)var o=this.dither(t,i,n);else for(var r=p(t).buf32,a=r.length,s=(o=new Uint32Array(a),0);s<a;s++){var l=r[s];o[s]=this.nearestColor(l)}if(1==e)return new Uint8Array(o.buffer);if(2==e){var d=[];for(a=o.length,s=0;s<a;s++){l=o[s];d[s]=this.i32idx[l]}return d}},t.prototype.dither=function(t,e,i){var n={FloydSteinberg:[[7/16,1,0],[3/16,-1,1],[5/16,0,1],[1/16,1,1]],FalseFloydSteinberg:[[3/8,1,0],[3/8,0,1],[2/8,1,1]],Stucki:[[8/42,1,0],[4/42,2,0],[2/42,-2,1],[4/42,-1,1],[8/42,0,1],[4/42,1,1],[2/42,2,1],[1/42,-2,2],[2/42,-1,2],[4/42,0,2],[2/42,1,2],[1/42,2,2]],Atkinson:[[1/8,1,0],[1/8,2,0],[1/8,-1,1],[1/8,0,1],[1/8,1,1],[1/8,0,2]],Jarvis:[[7/48,1,0],[5/48,2,0],[3/48,-2,1],[5/48,-1,1],[7/48,0,1],[5/48,1,1],[3/48,2,1],[1/48,-2,2],[3/48,-1,2],[5/48,0,2],[3/48,1,2],[1/48,2,2]],Burkes:[[.25,1,0],[4/32,2,0],[2/32,-2,1],[4/32,-1,1],[.25,0,1],[4/32,1,1],[2/32,2,1]],Sierra:[[5/32,1,0],[3/32,2,0],[2/32,-2,1],[4/32,-1,1],[5/32,0,1],[4/32,1,1],[2/32,2,1],[2/32,-1,2],[3/32,0,2],[2/32,1,2]],TwoSierra:[[.25,1,0],[3/16,2,0],[1/16,-2,1],[2/16,-1,1],[3/16,0,1],[2/16,1,1],[1/16,2,1]],SierraLite:[[.5,1,0],[1/4,-1,1],[1/4,0,1]]};if(!e||!n[e])throw"Unknown dithering kernel: "+e;for(var o=n[e],r=p(t),a=r.buf32,s=r.width,l=r.height,d=(a.length,i?-1:1),c=0;c<l;c++){i&&(d*=-1);for(var h=c*s,u=1==d?0:s-1,_=1==d?s:0;u!==_;u+=d){var f=h+u,m=a[f],g=255&m,b=(65280&m)>>8,v=(16711680&m)>>16,y=this.nearestColor(m),w=255&y,x=(65280&y)>>8,C=(16711680&y)>>16;if(a[f]=255<<24|C<<16|x<<8|w,this.dithDelta)if(this.colorDist([g,b,v],[w,x,C])<this.dithDelta)continue;for(var E=g-w,A=b-x,k=v-C,S=1==d?0:o.length-1,O=1==d?o.length:0;S!==O;S+=d){var T=o[S][1]*d,L=o[S][2],P=L*s;if(T+u>=0&&T+u<s&&L+c>=0&&L+c<l){var M=o[S][0],R=f+(P+T),D=255&a[R],B=(65280&a[R])>>8,H=(16711680&a[R])>>16,F=Math.max(0,Math.min(255,D+E*M)),I=Math.max(0,Math.min(255,B+A*M)),N=Math.max(0,Math.min(255,H+k*M));a[R]=255<<24|N<<16|I<<8|F}}}}return a},t.prototype.buildPal=function(t){if(!(this.palLocked||this.idxrgb.length>0&&this.idxrgb.length<=this.colors)){var e=this.histogram,i=function(t,e){var i=[];for(var n in t)i.push(n);return _.call(i,(function(i,n){return e?t[n]-t[i]:t[i]-t[n]}))}(e,!0);if(0==i.length)throw"Nothing has been sampled, palette cannot be built.";switch(this.method){case 1:for(var n=this.initColors,o=e[i[n-1]],r=i.slice(0,n),a=n,s=i.length;a<s&&e[i[a]]==o;)r.push(i[a++]);this.hueStats&&this.hueStats.inject(r);break;case 2:r=i}r=r.map((function(t){return+t})),this.reducePal(r),!t&&this.reIndex&&this.sortPal(),this.useCache&&this.cacheHistogram(r),this.palLocked=!0}},t.prototype.palette=function(t,e){return this.buildPal(e),t?this.idxrgb:new Uint8Array(new Uint32Array(this.idxi32).buffer)},t.prototype.prunePal=function(t){for(var e,i=0;i<this.idxrgb.length;i++)t[i]||(e=this.idxi32[i],this.idxrgb[i]=null,this.idxi32[i]=null,delete this.i32idx[e]);if(this.reIndex){for(var n=[],o=[],r={},a=(i=0,0);i<this.idxrgb.length;i++)this.idxrgb[i]&&(e=this.idxi32[i],n[a]=this.idxrgb[i],r[e]=a,o[a]=e,a++);this.idxrgb=n,this.idxi32=o,this.i32idx=r}},t.prototype.reducePal=function(t){if(this.idxrgb.length>this.colors){for(var e,i=t.length,n={},o=0,r=!1,a=0;a<i;a++)o!=this.colors||r||(this.prunePal(n),r=!0),e=this.nearestIndex(t[a]),o<this.colors&&!n[e]&&(n[e]=!0,o++);r||(this.prunePal(n),r=!0)}else{var s=t.map((function(t){return[255&t,(65280&t)>>8,(16711680&t)>>16]})),l=i=s.length,d=this.initDist;if(l>this.colors){for(;l>this.colors;){var c=[];for(a=0;a<i;a++){var h=s[a];t[a];if(h)for(var u=a+1;u<i;u++){var p=s[u],f=t[u];if(p){var m=this.colorDist(h,p);m<d&&(c.push([u,p,f,m]),delete s[u],l--)}}}d+=l>3*this.colors?this.initDist:this.distIncr}if(l<this.colors){_.call(c,(function(t,e){return e[3]-t[3]}));for(var g=0;l<this.colors;)s[c[g][0]]=c[g][1],l++,g++}}for(i=s.length,a=0;a<i;a++)s[a]&&(this.idxrgb.push(s[a]),this.idxi32.push(t[a]),this.i32idx[t[a]]=this.idxi32.length-1,this.i32rgb[t[a]]=s[a])}},t.prototype.colorStats1D=function(t){for(var e,i=this.histogram,n=t.length,o=0;o<n;o++)(4278190080&(e=t[o]))>>24!=0&&(this.hueStats&&this.hueStats.check(e),e in i?i[e]++:i[e]=1)},t.prototype.colorStats2D=function(t,e){var i=this.boxSize[0],n=this.boxSize[1],o=i*n,r=function(t,e,i,n){for(var o=t%i,r=e%n,a=t-o,s=e-r,l=[],d=0;d<e;d+=n)for(var c=0;c<t;c+=i)l.push({x:c,y:d,w:c==a?o:i,h:d==s?r:n});return l}(e,t.length/e,i,n),a=this.histogram,s=this;r.forEach((function(i){var n,r=Math.max(Math.round(i.w*i.h/o)*s.boxPxls,2),l={};!function(t,e,i){var n=t,o=n.y*e+n.x,r=(n.y+n.h-1)*e+(n.x+n.w-1),a=0,s=e-n.w+1,l=o;do{i.call(this,l),l+=++a%n.w==0?s:1}while(l<=r)}(i,e,(function(e){(4278190080&(n=t[e]))>>24!=0&&(s.hueStats&&s.hueStats.check(n),n in a?a[n]++:n in l?++l[n]>=r&&(a[n]=l[n]):l[n]=1)}))})),this.hueStats&&this.hueStats.inject(a)},t.prototype.sortPal=function(){var t=this;this.idxi32.sort((function(e,i){var n=t.i32idx[e],o=t.i32idx[i],r=t.idxrgb[n],a=t.idxrgb[o],s=d(r[0],r[1],r[2]),l=d(a[0],a[1],a[2]),h=r[0]==r[1]&&r[1]==r[2]?-1:c(s.h,t.hueGroups),u=(a[0]==a[1]&&a[1]==a[2]?-1:c(l.h,t.hueGroups))-h;if(u)return-u;var _=+l.l.toFixed(2)-+s.l.toFixed(2);if(_)return-_;var p=+l.s.toFixed(2)-+s.s.toFixed(2);return p?-p:void 0})),this.idxi32.forEach((function(e,i){t.idxrgb[i]=t.i32rgb[e],t.i32idx[e]=i}))},t.prototype.nearestColor=function(t){var e=this.nearestIndex(t);return null===e?0:this.idxi32[e]},t.prototype.nearestIndex=function(t){if((4278190080&t)>>24==0)return null;if(this.useCache&&""+t in this.i32idx)return this.i32idx[t];for(var e,i=1e3,n=[255&t,(65280&t)>>8,(16711680&t)>>16],o=this.idxrgb.length,r=0;r<o;r++)if(this.idxrgb[r]){var a=this.colorDist(n,this.idxrgb[r]);a<i&&(i=a,e=r)}return e},t.prototype.cacheHistogram=function(t){for(var e=0,i=t[e];e<t.length&&this.histogram[i]>=this.cacheFreq;i=t[e++])this.i32idx[i]=this.nearestIndex(i)},e.prototype.check=function(t){this.groupsFull==this.numGroups+1&&(this.check=function(){});var e=255&t,i=(65280&t)>>8,n=(16711680&t)>>16,o=e==i&&i==n?-1:c(d(e,i,n).h,this.numGroups),r=this.stats[o],a=this.minCols;r.num++,r.num>a||(r.num==a&&this.groupsFull++,r.num<=a&&this.stats[o].cols.push(t))},e.prototype.inject=function(t){for(var e=-1;e<this.numGroups;e++)if(this.stats[e].num<=this.minCols)switch(h(t)){case"Array":this.stats[e].cols.forEach((function(e){-1==t.indexOf(e)&&t.push(e)}));break;case"Object":this.stats[e].cols.forEach((function(e){t[e]?t[e]++:t[e]=1}))}};var i=.2126,n=.7152,o=.0722;function r(t,e,r){return Math.sqrt(i*t*t+n*e*e+o*r*r)}var a=Math.sqrt(65025);function s(t,e){var r=e[0]-t[0],s=e[1]-t[1],l=e[2]-t[2];return Math.sqrt(i*r*r+n*s*s+o*l*l)/a}function l(t,e){var r=Math.abs(e[0]-t[0]),a=Math.abs(e[1]-t[1]),s=Math.abs(e[2]-t[2]);return(i*r+n*a+o*s)/254.99999999999997}function d(t,e,i){var n,o,a,s,l;if(t/=255,e/=255,i/=255,(n=Math.max(t,e,i))==(o=Math.min(t,e,i)))a=s=0;else{switch(l=n-o,s=(n+o)/2>.5?l/(2-n-o):l/(n+o),n){case t:a=(e-i)/l+(e<i?6:0);break;case e:a=(i-t)/l+2;break;case i:a=(t-e)/l+4}a/=6}return{h:a,s:s,l:r(t,e,i)}}function c(t,e){var i=1/e,n=i/2;if(t>=1-n||t<=n)return 0;for(var o=1;o<e;o++){var r=o*i;if(t>=r-n&&t<=r+n)return o}}function h(t){return Object.prototype.toString.call(t).slice(8,-1)}var u,_="xyzvwtursopqmnklhijfgdeabc"==(u="abcdefghijklmnopqrstuvwxyz").split("").sort((function(t,e){return~~(u.indexOf(e)/2.3)-~~(u.indexOf(t)/2.3)})).join("")?Array.prototype.sort:function(t){var e=h(this[0]);if("Number"==e||"String"==e){for(var i,n={},o=this.length,r=0;r<o;r++)i=this[r],n[i]||0===n[i]||(n[i]=r);return this.sort((function(e,i){return t(e,i)||n[e]-n[i]}))}n=this.map((function(t){return t}));return this.sort((function(e,i){return t(e,i)||n.indexOf(e)-n.indexOf(i)}))};function p(t,e){var i,n,o,r,a,s;switch(h(t)){case"HTMLImageElement":(i=document.createElement("canvas")).width=t.naturalWidth,i.height=t.naturalHeight,(n=i.getContext("2d")).drawImage(t,0,0);case"Canvas":case"HTMLCanvasElement":i=i||t,n=n||i.getContext("2d");case"CanvasRenderingContext2D":n=n||t,i=i||n.canvas,o=n.getImageData(0,0,i.width,i.height);case"ImageData":e=(o=o||t).width,r="CanvasPixelArray"==h(o.data)?new Uint8Array(o.data):o.data;case"Array":case"CanvasPixelArray":r=r||new Uint8Array(t);case"Uint8Array":case"Uint8ClampedArray":r=r||t,a=new Uint32Array(r.buffer);case"Uint32Array":a=a||t,r=r||new Uint8Array(a.buffer),e=e||a.length,s=a.length/e}return{can:i,ctx:n,imgd:o,buf8:r,buf32:a,width:e,height:s}}this.RgbQuant=t,dt&&(dt=t)}).call(dt);var ct=t(dt);function ht(t){if(t.length>0){const e=t[Math.floor(Math.random()*t.length)];return`rgb(${e[0]},${e[1]},${e[2]})`}for(var e="#",i=0;i<6;i++)e+="0123456789ABCDEF"[Math.floor(16*Math.random())];return e}const ut=[new class{paint(t,e){t.fillStyle=ht(e);const i=Math.random()*t.canvas.width,n=Math.random()*t.canvas.height,o=Math.random()*t.canvas.width*.125,r=Math.random()*t.canvas.height*.125,a=Math.random()*Math.PI;t.beginPath(),t.ellipse(i,n,o,r,a,0,2*Math.PI),t.fill()}},new class{paint(t,e){t.fillStyle=ht(e);const i=Math.random()*t.canvas.width,n=Math.random()*t.canvas.height,o=Math.random()*t.canvas.width*.03125,r=o;t.beginPath(),t.ellipse(i,n,o,r,0,0,2*Math.PI),t.fill()}},new class{paint(t,e){t.fillStyle=ht(e);const i=Math.random()*t.canvas.width,n=Math.random()*t.canvas.height,o=Math.random()*t.canvas.width*.25,r=Math.random()*t.canvas.height*.25;t.beginPath(),t.fillRect(i,n,o,r)}},new class{paint(t,e){t.fillStyle=ht(e);const i=Math.random()*t.canvas.width,n=Math.random()*t.canvas.height;let o=0,r=0;Math.random()>.49999999?(o=.025*t.canvas.width,r=Math.random()*t.canvas.height*.25):(r=.025*t.canvas.height,o=Math.random()*t.canvas.width*.25),t.beginPath(),t.fillRect(i,n,o,r)}}],_t={"American Gothic":"https://upload.wikimedia.org/wikipedia/commons/c/cc/Grant_Wood_-_American_Gothic_-_Google_Art_Project.jpg","Mona Lisa":"https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/1280px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg","Bedroom In Arles":"https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Vincent_van_Gogh_-_De_slaapkamer_-_Google_Art_Project.jpg/2560px-Vincent_van_Gogh_-_De_slaapkamer_-_Google_Art_Project.jpg","Persistence of Memory":"https://images2.minutemediacdn.com/image/upload/c_fill,g_auto,h_1248,w_2220/f_auto,q_auto,w_1100/v1554925323/shape/mentalfloss/clocks_1.png","The Shoemaker":"https://uploads6.wikiart.org/images/jacob-lawrence/the-shoemaker-1945(1).jpg","Sharbat Gula":"https://upload.wikimedia.org/wikipedia/en/b/b4/Sharbat_Gula.jpg","Larry Bird":"https://upload.wikimedia.org/wikipedia/commons/2/2f/Larry_Bird_Lipofsky.jpg"},pt=300,ft=[];new class{constructor(){this.play=!1,this.animationId=0,this.gui=new lt,this.guiState={brush:0,image:_t["American Gothic"],usePalette:!0,alpha0:1,alpha1:1},this.brush=ut[0],this.numStrokesTried=0,this.numStrokesKept=0,this.palette=[],this.similarity=Number.MAX_VALUE,this.image1=document.createElement("canvas"),this.imageTemp=document.createElement("canvas"),this.image2=document.createElement("canvas"),this.statsEl=document.createElement("p"),document.body.appendChild(this.image1),document.body.appendChild(this.image2),document.body.appendChild(this.statsEl),this.srcimg=new Image,this.srcimg.setAttribute("crossOrigin",""),this.srcimg.onload=this.start.bind(this),this.srcimg.crossOrigin="",this.srcimg.src=_t["American Gothic"],this.sourcePixels=this.image2.getContext("2d").createImageData(this.image2.width,this.image2.height),this.iterate=this.iterate.bind(this),this.setupGui()}start(){this.play=!1;const t=this.srcimg.naturalWidth/this.srcimg.naturalHeight;let e=pt,i=pt/t;t>1&&(i=pt,e=pt*t);const n=e+"px",o=i+"px";this.image1.style.width=n,this.image1.style.height=o,this.image1.width=e,this.image1.height=i,this.imageTemp.style.width=n,this.imageTemp.style.height=o,this.imageTemp.width=e,this.imageTemp.height=i,this.image2.style.width=n,this.image2.style.height=o,this.image2.width=e,this.image2.height=i;this.image2.getContext("2d").drawImage(this.srcimg,0,0,this.srcimg.naturalWidth,this.srcimg.naturalHeight,0,0,this.image2.width,this.image2.height);const r=this;setTimeout((()=>{const t=r.image2.getContext("2d");r.sourcePixels=t.getImageData(0,0,this.image2.width,this.image2.height);const e=new ct({colors:256,method:2,boxSize:[64,64],boxPxls:2,initColors:4096,minHueCols:0,dithKern:null,dithDelta:0,dithSerp:!1,palette:[],reIndex:!1,useCache:!0,cacheFreq:10,colorDist:"euclidean"});e.sample(r.sourcePixels),r.palette=e.palette(!0),r.restartPainting()}),0)}restartPainting(){cancelAnimationFrame(this.animationId),this.animationId=0;this.image1.getContext("2d").clearRect(0,0,this.image1.width,this.image1.height);this.imageTemp.getContext("2d").clearRect(0,0,this.imageTemp.width,this.imageTemp.height),this.numStrokesTried=0,this.numStrokesKept=0,this.similarity=Number.MAX_VALUE,this.play=!0,this.iterate()}setupGui(){this.gui.add(this.guiState,"image",_t).name("Image").onChange((t=>{this.play=!1,cancelAnimationFrame(this.animationId),this.animationId=0,this.srcimg.src=t})),this.gui.add(this.guiState,"usePalette").name("Limit Palette"),this.gui.add(this.guiState,"brush",{Round:0,Pointillist:1,Boxy:2,Strips:3}).name("Brush").onChange((t=>{this.brush=ut[t]})),this.gui.add(this.guiState,"alpha0",0,1).name("Opacity Min"),this.gui.add(this.guiState,"alpha1",0,1).name("Opacity Max"),this.gui.add(this,"restartPainting").name("Restart")}brushStroke(t,e,i){const n=t.getContext("2d");return n.globalAlpha=Math.random()*Math.abs(this.guiState.alpha1-this.guiState.alpha0)+Math.min(this.guiState.alpha0,this.guiState.alpha1),e.paint(n,i),n.getImageData(0,0,t.width,t.height)}iterate(){this.numStrokesTried+=1;const t=this.brushStroke(this.imageTemp,this.brush,this.guiState.usePalette?this.palette:ft),e=(i=t,n=this.sourcePixels,function(t,e){let i,n,o,r=0;for(let a=0;a<t.data.length;a+=4)i=t.data[a]/255-e.data[a]/255,r+=i*i,n=t.data[a+1]/255-e.data[a+1]/255,r+=n*n,o=t.data[a+2]/255-e.data[a+2]/255,r+=o*o;return r}(i,n));var i,n,o;e<this.similarity?(this.similarity=e,(o=this.image1.getContext("2d")).globalCompositeOperation="copy",o.drawImage(this.imageTemp,0,0),this.numStrokesKept+=1):(o=this.imageTemp.getContext("2d")).drawImage(this.image1,0,0);this.play&&this.similarity>.1&&(this.updateStats(),this.animationId=requestAnimationFrame(this.iterate))}updateStats(){this.numStrokesTried%100==0&&(this.statsEl.innerText="Brushstrokes: "+this.numStrokesKept+"/"+this.numStrokesTried+"="+this.numStrokesKept/this.numStrokesTried+"\nSimilarity: "+this.similarity)}}}();

},{}]},["3qIoN","2BXqz"], "2BXqz", "parcelRequire5ca2")

//# sourceMappingURL=index.a1c4c813.js.map
