//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;

(function(){

///////////////////////////////////////////////////////////////////////////////////////////
//                                                                                       //
// packages/overture8_wordcloud2/packages/overture8_wordcloud2.js                        //
//                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////
                                                                                         //
(function () {                                                                           // 1
                                                                                         // 2
///////////////////////////////////////////////////////////////////////////////////      // 3
//                                                                               //      // 4
// packages/overture8:wordcloud2/wordcloud2.js                                   //      // 5
//                                                                               //      // 6
///////////////////////////////////////////////////////////////////////////////////      // 7
                                                                                 //      // 8
/*!                                                                              // 1    // 9
 * wordcloud2.js                                                                 // 2    // 10
 * http://timdream.org/wordcloud2.js/                                            // 3    // 11
 *                                                                               // 4    // 12
 * Copyright 2011 - 2013 Tim Chien                                               // 5    // 13
 * Released under the MIT license                                                // 6    // 14
 */                                                                              // 7    // 15
                                                                                 // 8    // 16
'use strict';                                                                    // 9    // 17
                                                                                 // 10   // 18
// setImmediate                                                                  // 11   // 19
if (!window.setImmediate) {                                                      // 12   // 20
  window.setImmediate = (function setupSetImmediate() {                          // 13   // 21
    return window.msSetImmediate ||                                              // 14   // 22
    window.webkitSetImmediate ||                                                 // 15   // 23
    window.mozSetImmediate ||                                                    // 16   // 24
    window.oSetImmediate ||                                                      // 17   // 25
    (function setupSetZeroTimeout() {                                            // 18   // 26
      if (!window.postMessage || !window.addEventListener) {                     // 19   // 27
        return null;                                                             // 20   // 28
      }                                                                          // 21   // 29
                                                                                 // 22   // 30
      var callbacks = [undefined];                                               // 23   // 31
      var message = 'zero-timeout-message';                                      // 24   // 32
                                                                                 // 25   // 33
      // Like setTimeout, but only takes a function argument.  There's           // 26   // 34
      // no time argument (always zero) and no arguments (you have to            // 27   // 35
      // use a closure).                                                         // 28   // 36
      var setZeroTimeout = function setZeroTimeout(callback) {                   // 29   // 37
        var id = callbacks.length;                                               // 30   // 38
        callbacks.push(callback);                                                // 31   // 39
        window.postMessage(message + id.toString(36), '*');                      // 32   // 40
                                                                                 // 33   // 41
        return id;                                                               // 34   // 42
      };                                                                         // 35   // 43
                                                                                 // 36   // 44
      window.addEventListener('message', function setZeroTimeoutMessage(evt) {   // 37   // 45
        // Skipping checking event source, retarded IE confused this window      // 38   // 46
        // object with another in the presence of iframe                         // 39   // 47
        if (typeof evt.data !== 'string' ||                                      // 40   // 48
            evt.data.substr(0, message.length) !== message/* ||                  // 41   // 49
            evt.source !== window */) {                                          // 42   // 50
          return;                                                                // 43   // 51
        }                                                                        // 44   // 52
                                                                                 // 45   // 53
        evt.stopImmediatePropagation();                                          // 46   // 54
                                                                                 // 47   // 55
        var id = parseInt(evt.data.substr(message.length), 36);                  // 48   // 56
        if (!callbacks[id]) {                                                    // 49   // 57
          return;                                                                // 50   // 58
        }                                                                        // 51   // 59
                                                                                 // 52   // 60
        callbacks[id]();                                                         // 53   // 61
        callbacks[id] = undefined;                                               // 54   // 62
      }, true);                                                                  // 55   // 63
                                                                                 // 56   // 64
      /* specify clearImmediate() here since we need the scope */                // 57   // 65
      window.clearImmediate = function clearZeroTimeout(id) {                    // 58   // 66
        if (!callbacks[id]) {                                                    // 59   // 67
          return;                                                                // 60   // 68
        }                                                                        // 61   // 69
                                                                                 // 62   // 70
        callbacks[id] = undefined;                                               // 63   // 71
      };                                                                         // 64   // 72
                                                                                 // 65   // 73
      return setZeroTimeout;                                                     // 66   // 74
    })() ||                                                                      // 67   // 75
    // fallback                                                                  // 68   // 76
    function setImmediateFallback(fn) {                                          // 69   // 77
      window.setTimeout(fn, 0);                                                  // 70   // 78
    };                                                                           // 71   // 79
  })();                                                                          // 72   // 80
}                                                                                // 73   // 81
                                                                                 // 74   // 82
if (!window.clearImmediate) {                                                    // 75   // 83
  window.clearImmediate = (function setupClearImmediate() {                      // 76   // 84
    return window.msClearImmediate ||                                            // 77   // 85
    window.webkitClearImmediate ||                                               // 78   // 86
    window.mozClearImmediate ||                                                  // 79   // 87
    window.oClearImmediate ||                                                    // 80   // 88
    // "clearZeroTimeout" is implement on the previous block ||                  // 81   // 89
    // fallback                                                                  // 82   // 90
    function clearImmediateFallback(timer) {                                     // 83   // 91
      window.clearTimeout(timer);                                                // 84   // 92
    };                                                                           // 85   // 93
  })();                                                                          // 86   // 94
}                                                                                // 87   // 95
                                                                                 // 88   // 96
(function(global) {                                                              // 89   // 97
                                                                                 // 90   // 98
  // Check if WordCloud can run on this browser                                  // 91   // 99
  var isSupported = (function isSupported() {                                    // 92   // 100
    var canvas = document.createElement('canvas');                               // 93   // 101
    if (!canvas || !canvas.getContext) {                                         // 94   // 102
      return false;                                                              // 95   // 103
    }                                                                            // 96   // 104
                                                                                 // 97   // 105
    var ctx = canvas.getContext('2d');                                           // 98   // 106
    if (!ctx.getImageData) {                                                     // 99   // 107
      return false;                                                              // 100  // 108
    }                                                                            // 101  // 109
    if (!ctx.fillText) {                                                         // 102  // 110
      return false;                                                              // 103  // 111
    }                                                                            // 104  // 112
                                                                                 // 105  // 113
    if (!Array.prototype.some) {                                                 // 106  // 114
      return false;                                                              // 107  // 115
    }                                                                            // 108  // 116
    if (!Array.prototype.push) {                                                 // 109  // 117
      return false;                                                              // 110  // 118
    }                                                                            // 111  // 119
                                                                                 // 112  // 120
    return true;                                                                 // 113  // 121
  }());                                                                          // 114  // 122
                                                                                 // 115  // 123
  // Find out if the browser impose minium font size by                          // 116  // 124
  // drawing small texts on a canvas and measure it's width.                     // 117  // 125
  var miniumFontSize = (function getMiniumFontSize() {                           // 118  // 126
    if (!isSupported) {                                                          // 119  // 127
      return;                                                                    // 120  // 128
    }                                                                            // 121  // 129
                                                                                 // 122  // 130
    var ctx = document.createElement('canvas').getContext('2d');                 // 123  // 131
                                                                                 // 124  // 132
    // start from 20                                                             // 125  // 133
    var size = 20;                                                               // 126  // 134
                                                                                 // 127  // 135
    // two sizes to measure                                                      // 128  // 136
    var hanWidth, mWidth;                                                        // 129  // 137
                                                                                 // 130  // 138
    while (size) {                                                               // 131  // 139
      ctx.font = size.toString(10) + 'px sans-serif';                            // 132  // 140
      if ((ctx.measureText('\uFF37').width === hanWidth) &&                      // 133  // 141
          (ctx.measureText('m').width) === mWidth) {                             // 134  // 142
        return (size + 1);                                                       // 135  // 143
      }                                                                          // 136  // 144
                                                                                 // 137  // 145
      hanWidth = ctx.measureText('\uFF37').width;                                // 138  // 146
      mWidth = ctx.measureText('m').width;                                       // 139  // 147
                                                                                 // 140  // 148
      size--;                                                                    // 141  // 149
    }                                                                            // 142  // 150
                                                                                 // 143  // 151
    return 0;                                                                    // 144  // 152
  })();                                                                          // 145  // 153
                                                                                 // 146  // 154
  // Based on http://jsfromhell.com/array/shuffle                                // 147  // 155
  var shuffleArray = function shuffleArray(arr) {                                // 148  // 156
    for (var j, x, i = arr.length; i;                                            // 149  // 157
      j = Math.floor(Math.random() * i),                                         // 150  // 158
      x = arr[--i], arr[i] = arr[j],                                             // 151  // 159
      arr[j] = x) {}                                                             // 152  // 160
    return arr;                                                                  // 153  // 161
  };                                                                             // 154  // 162
                                                                                 // 155  // 163
  var WordCloud = function WordCloud(elements, options) {                        // 156  // 164
    if (!isSupported) {                                                          // 157  // 165
      return;                                                                    // 158  // 166
    }                                                                            // 159  // 167
                                                                                 // 160  // 168
    if (!Array.isArray(elements)) {                                              // 161  // 169
      elements = [elements];                                                     // 162  // 170
    }                                                                            // 163  // 171
                                                                                 // 164  // 172
    elements.forEach(function(el, i) {                                           // 165  // 173
      if (typeof el === 'string') {                                              // 166  // 174
        elements[i] = document.getElementById(el);                               // 167  // 175
        if (!elements[i]) {                                                      // 168  // 176
          throw 'The element id specified is not found.';                        // 169  // 177
        }                                                                        // 170  // 178
      } else if (!el.tagName && !el.appendChild) {                               // 171  // 179
        throw 'You must pass valid HTML elements, or ID of the element.';        // 172  // 180
      }                                                                          // 173  // 181
    });                                                                          // 174  // 182
                                                                                 // 175  // 183
    /* Default values to be overwritten by options object */                     // 176  // 184
    var settings = {                                                             // 177  // 185
      list: [],                                                                  // 178  // 186
      fontFamily: '"Trebuchet MS", "Heiti TC", "微軟正黑體", ' +                      // 179  // 187
                  '"Arial Unicode MS", "Droid Fallback Sans", sans-serif',       // 180  // 188
      fontWeight: 'normal',                                                      // 181  // 189
      color: 'random-dark',                                                      // 182  // 190
      minSize: 0, // 0 to disable                                                // 183  // 191
      weightFactor: 1,                                                           // 184  // 192
      clearCanvas: true,                                                         // 185  // 193
      backgroundColor: '#fff',  // opaque white = rgba(255, 255, 255, 1)         // 186  // 194
                                                                                 // 187  // 195
      gridSize: 8,                                                               // 188  // 196
      origin: null,                                                              // 189  // 197
                                                                                 // 190  // 198
      drawMask: false,                                                           // 191  // 199
      maskColor: 'rgba(255,0,0,0.3)',                                            // 192  // 200
      maskGapWidth: 0.3,                                                         // 193  // 201
                                                                                 // 194  // 202
      wait: 0,                                                                   // 195  // 203
      abortThreshold: 0, // disabled                                             // 196  // 204
      abort: function noop() {},                                                 // 197  // 205
                                                                                 // 198  // 206
      minRotation: - Math.PI / 2,                                                // 199  // 207
      maxRotation: Math.PI / 2,                                                  // 200  // 208
                                                                                 // 201  // 209
      shuffle: true,                                                             // 202  // 210
      rotateRatio: 0.1,                                                          // 203  // 211
                                                                                 // 204  // 212
      shape: 'circle',                                                           // 205  // 213
      ellipticity: 0.65,                                                         // 206  // 214
                                                                                 // 207  // 215
      hover: null,                                                               // 208  // 216
      click: null                                                                // 209  // 217
    };                                                                           // 210  // 218
                                                                                 // 211  // 219
    if (options) {                                                               // 212  // 220
      for (var key in options) {                                                 // 213  // 221
        if (key in settings) {                                                   // 214  // 222
          settings[key] = options[key];                                          // 215  // 223
        }                                                                        // 216  // 224
      }                                                                          // 217  // 225
    }                                                                            // 218  // 226
                                                                                 // 219  // 227
    /* Convert weightFactor into a function */                                   // 220  // 228
    if (typeof settings.weightFactor !== 'function') {                           // 221  // 229
      var factor = settings.weightFactor;                                        // 222  // 230
      settings.weightFactor = function weightFactor(pt) {                        // 223  // 231
        return pt * factor; //in px                                              // 224  // 232
      };                                                                         // 225  // 233
    }                                                                            // 226  // 234
                                                                                 // 227  // 235
    /* Convert shape into a function */                                          // 228  // 236
    if (typeof settings.shape !== 'function') {                                  // 229  // 237
      switch (settings.shape) {                                                  // 230  // 238
        case 'circle':                                                           // 231  // 239
        /* falls through */                                                      // 232  // 240
        default:                                                                 // 233  // 241
          // 'circle' is the default and a shortcut in the code loop.            // 234  // 242
          settings.shape = 'circle';                                             // 235  // 243
          break;                                                                 // 236  // 244
                                                                                 // 237  // 245
        case 'cardioid':                                                         // 238  // 246
          settings.shape = function shapeCardioid(theta) {                       // 239  // 247
            return 1 - Math.sin(theta);                                          // 240  // 248
          };                                                                     // 241  // 249
          break;                                                                 // 242  // 250
                                                                                 // 243  // 251
        /*                                                                       // 244  // 252
                                                                                 // 245  // 253
        To work out an X-gon, one has to calculate "m",                          // 246  // 254
        where 1/(cos(2*PI/X)+m*sin(2*PI/X)) = 1/(cos(0)+m*sin(0))                // 247  // 255
        http://www.wolframalpha.com/input/?i=1%2F%28cos%282*PI%2FX%29%2Bm*sin%28 // 248  // 256
        2*PI%2FX%29%29+%3D+1%2F%28cos%280%29%2Bm*sin%280%29%29                   // 249  // 257
                                                                                 // 250  // 258
        Copy the solution into polar equation r = 1/(cos(t') + m*sin(t'))        // 251  // 259
        where t' equals to mod(t, 2PI/X);                                        // 252  // 260
                                                                                 // 253  // 261
        */                                                                       // 254  // 262
                                                                                 // 255  // 263
        case 'diamond':                                                          // 256  // 264
        case 'square':                                                           // 257  // 265
          // http://www.wolframalpha.com/input/?i=plot+r+%3D+1%2F%28cos%28mod+   // 258  // 266
          // %28t%2C+PI%2F2%29%29%2Bsin%28mod+%28t%2C+PI%2F2%29%29%29%2C+t+%3D   // 259  // 267
          // +0+..+2*PI                                                          // 260  // 268
          settings.shape = function shapeSquare(theta) {                         // 261  // 269
            var thetaPrime = theta % (2 * Math.PI / 4);                          // 262  // 270
            return 1 / (Math.cos(thetaPrime) + Math.sin(thetaPrime));            // 263  // 271
          };                                                                     // 264  // 272
          break;                                                                 // 265  // 273
                                                                                 // 266  // 274
        case 'triangle-forward':                                                 // 267  // 275
          // http://www.wolframalpha.com/input/?i=plot+r+%3D+1%2F%28cos%28mod+   // 268  // 276
          // %28t%2C+2*PI%2F3%29%29%2Bsqrt%283%29sin%28mod+%28t%2C+2*PI%2F3%29   // 269  // 277
          // %29%29%2C+t+%3D+0+..+2*PI                                           // 270  // 278
          settings.shape = function shapeTriangle(theta) {                       // 271  // 279
            var thetaPrime = theta % (2 * Math.PI / 3);                          // 272  // 280
            return 1 / (Math.cos(thetaPrime) +                                   // 273  // 281
                        Math.sqrt(3) * Math.sin(thetaPrime));                    // 274  // 282
          };                                                                     // 275  // 283
          break;                                                                 // 276  // 284
                                                                                 // 277  // 285
        case 'triangle':                                                         // 278  // 286
        case 'triangle-upright':                                                 // 279  // 287
          settings.shape = function shapeTriangle(theta) {                       // 280  // 288
            var thetaPrime = (theta + Math.PI * 3 / 2) % (2 * Math.PI / 3);      // 281  // 289
            return 1 / (Math.cos(thetaPrime) +                                   // 282  // 290
                        Math.sqrt(3) * Math.sin(thetaPrime));                    // 283  // 291
          };                                                                     // 284  // 292
          break;                                                                 // 285  // 293
                                                                                 // 286  // 294
        case 'pentagon':                                                         // 287  // 295
          settings.shape = function shapePentagon(theta) {                       // 288  // 296
            var thetaPrime = (theta + 0.955) % (2 * Math.PI / 5);                // 289  // 297
            return 1 / (Math.cos(thetaPrime) +                                   // 290  // 298
                        0.726543 * Math.sin(thetaPrime));                        // 291  // 299
          };                                                                     // 292  // 300
          break;                                                                 // 293  // 301
                                                                                 // 294  // 302
        case 'star':                                                             // 295  // 303
          settings.shape = function shapeStar(theta) {                           // 296  // 304
            var thetaPrime = (theta + 0.955) % (2 * Math.PI / 10);               // 297  // 305
            if ((theta + 0.955) % (2 * Math.PI / 5) - (2 * Math.PI / 10) >= 0) { // 298  // 306
              return 1 / (Math.cos((2 * Math.PI / 10) - thetaPrime) +            // 299  // 307
                          3.07768 * Math.sin((2 * Math.PI / 10) - thetaPrime));  // 300  // 308
            } else {                                                             // 301  // 309
              return 1 / (Math.cos(thetaPrime) +                                 // 302  // 310
                          3.07768 * Math.sin(thetaPrime));                       // 303  // 311
            }                                                                    // 304  // 312
          };                                                                     // 305  // 313
          break;                                                                 // 306  // 314
      }                                                                          // 307  // 315
    }                                                                            // 308  // 316
                                                                                 // 309  // 317
    /* Make sure gridSize is a whole number and is not smaller than 4px */       // 310  // 318
    settings.gridSize = Math.max(Math.floor(settings.gridSize), 4);              // 311  // 319
                                                                                 // 312  // 320
    /* shorthand */                                                              // 313  // 321
    var g = settings.gridSize;                                                   // 314  // 322
    var maskRectWidth = g - settings.maskGapWidth;                               // 315  // 323
                                                                                 // 316  // 324
    /* normalize rotation settings */                                            // 317  // 325
    var rotationRange = Math.abs(settings.maxRotation - settings.minRotation);   // 318  // 326
    var minRotation = Math.min(settings.maxRotation, settings.minRotation);      // 319  // 327
                                                                                 // 320  // 328
    /* information/object available to all functions, set when start() */        // 321  // 329
    var grid, // 2d array containing filling information                         // 322  // 330
      ngx, ngy, // width and height of the grid                                  // 323  // 331
      center, // position of the center of the cloud                             // 324  // 332
      maxRadius;                                                                 // 325  // 333
                                                                                 // 326  // 334
    /* timestamp for measuring each putWord() action */                          // 327  // 335
    var escapeTime;                                                              // 328  // 336
                                                                                 // 329  // 337
    /* function for getting the color of the text */                             // 330  // 338
    var getTextColor;                                                            // 331  // 339
    switch (settings.color) {                                                    // 332  // 340
      case 'random-dark':                                                        // 333  // 341
        getTextColor = function getRandomDarkColor() {                           // 334  // 342
          return 'rgb(' +                                                        // 335  // 343
            Math.floor(Math.random() * 128).toString(10) + ',' +                 // 336  // 344
            Math.floor(Math.random() * 128).toString(10) + ',' +                 // 337  // 345
            Math.floor(Math.random() * 128).toString(10) + ')';                  // 338  // 346
        };                                                                       // 339  // 347
        break;                                                                   // 340  // 348
                                                                                 // 341  // 349
      case 'random-light':                                                       // 342  // 350
        getTextColor = function getRandomLightColor() {                          // 343  // 351
          return 'rgb(' +                                                        // 344  // 352
            Math.floor(Math.random() * 128 + 128).toString(10) + ',' +           // 345  // 353
            Math.floor(Math.random() * 128 + 128).toString(10) + ',' +           // 346  // 354
            Math.floor(Math.random() * 128 + 128).toString(10) + ')';            // 347  // 355
        };                                                                       // 348  // 356
        break;                                                                   // 349  // 357
                                                                                 // 350  // 358
      default:                                                                   // 351  // 359
        if (typeof settings.color === 'function') {                              // 352  // 360
          getTextColor = settings.color;                                         // 353  // 361
        }                                                                        // 354  // 362
        break;                                                                   // 355  // 363
    }                                                                            // 356  // 364
                                                                                 // 357  // 365
    /* Interactive */                                                            // 358  // 366
    var interactive = false;                                                     // 359  // 367
    var infoGrid = [];                                                           // 360  // 368
    var hovered;                                                                 // 361  // 369
                                                                                 // 362  // 370
    var getInfoGridFromMouseEvent = function getInfoGridFromMouseEvent(evt) {    // 363  // 371
      var canvas = evt.currentTarget;                                            // 364  // 372
      var rect = canvas.getBoundingClientRect();                                 // 365  // 373
      var eventX = evt.clientX - rect.left;                                      // 366  // 374
      var eventY = evt.clientY - rect.top;                                       // 367  // 375
                                                                                 // 368  // 376
      var x = Math.floor(eventX * ((canvas.width / rect.width) || 1) / g);       // 369  // 377
      var y = Math.floor(eventY * ((canvas.height / rect.height) || 1) / g);     // 370  // 378
                                                                                 // 371  // 379
      return infoGrid[x][y];                                                     // 372  // 380
    };                                                                           // 373  // 381
                                                                                 // 374  // 382
    var wordcloudhover = function wordcloudhover(evt) {                          // 375  // 383
      var info = getInfoGridFromMouseEvent(evt);                                 // 376  // 384
                                                                                 // 377  // 385
      if (hovered === info) {                                                    // 378  // 386
        return;                                                                  // 379  // 387
      }                                                                          // 380  // 388
                                                                                 // 381  // 389
      hovered = info;                                                            // 382  // 390
      if (!info) {                                                               // 383  // 391
        settings.hover(undefined, undefined, evt);                               // 384  // 392
                                                                                 // 385  // 393
        return;                                                                  // 386  // 394
      }                                                                          // 387  // 395
                                                                                 // 388  // 396
      settings.hover(info.item, info.dimension, evt);                            // 389  // 397
                                                                                 // 390  // 398
    };                                                                           // 391  // 399
                                                                                 // 392  // 400
    var wordcloudclick = function wordcloudclick(evt) {                          // 393  // 401
      var info = getInfoGridFromMouseEvent(evt);                                 // 394  // 402
      if (!info) {                                                               // 395  // 403
        return;                                                                  // 396  // 404
      }                                                                          // 397  // 405
                                                                                 // 398  // 406
      settings.click(info.item, info.dimension, evt);                            // 399  // 407
    };                                                                           // 400  // 408
                                                                                 // 401  // 409
    /* Get points on the grid for a given radius away from the center */         // 402  // 410
    var pointsAtRadius = [];                                                     // 403  // 411
    var getPointsAtRadius = function getPointsAtRadius(radius) {                 // 404  // 412
      if (pointsAtRadius[radius]) {                                              // 405  // 413
        return pointsAtRadius[radius];                                           // 406  // 414
      }                                                                          // 407  // 415
                                                                                 // 408  // 416
      // Look for these number of points on each radius                          // 409  // 417
      var T = radius * 8;                                                        // 410  // 418
                                                                                 // 411  // 419
      // Getting all the points at this radius                                   // 412  // 420
      var t = T;                                                                 // 413  // 421
      var points = [];                                                           // 414  // 422
                                                                                 // 415  // 423
      if (radius === 0) {                                                        // 416  // 424
        points.push([center[0], center[1], 0]);                                  // 417  // 425
      }                                                                          // 418  // 426
                                                                                 // 419  // 427
      while (t--) {                                                              // 420  // 428
        // distort the radius to put the cloud in shape                          // 421  // 429
        var rx = 1;                                                              // 422  // 430
        if (settings.shape !== 'circle') {                                       // 423  // 431
          rx = settings.shape(t / T * 2 * Math.PI); // 0 to 1                    // 424  // 432
        }                                                                        // 425  // 433
                                                                                 // 426  // 434
        // Push [x, y, t]; t is used solely for getTextColor()                   // 427  // 435
        points.push([                                                            // 428  // 436
          center[0] + radius * rx * Math.cos(-t / T * 2 * Math.PI),              // 429  // 437
          center[1] + radius * rx * Math.sin(-t / T * 2 * Math.PI) *             // 430  // 438
            settings.ellipticity,                                                // 431  // 439
          t / T * 2 * Math.PI]);                                                 // 432  // 440
      }                                                                          // 433  // 441
                                                                                 // 434  // 442
      pointsAtRadius[radius] = points;                                           // 435  // 443
      return points;                                                             // 436  // 444
    };                                                                           // 437  // 445
                                                                                 // 438  // 446
    /* Return true if we had spent too much time */                              // 439  // 447
    var exceedTime = function exceedTime() {                                     // 440  // 448
      return ((settings.abortThreshold > 0) &&                                   // 441  // 449
        ((new Date()).getTime() - escapeTime > settings.abortThreshold));        // 442  // 450
    };                                                                           // 443  // 451
                                                                                 // 444  // 452
    /* Get the deg of rotation according to settings, and luck. */               // 445  // 453
    var getRotateDeg = function getRotateDeg() {                                 // 446  // 454
      if (settings.rotateRatio === 0) {                                          // 447  // 455
        return 0;                                                                // 448  // 456
      }                                                                          // 449  // 457
                                                                                 // 450  // 458
      if (Math.random() > settings.rotateRatio) {                                // 451  // 459
        return 0;                                                                // 452  // 460
      }                                                                          // 453  // 461
                                                                                 // 454  // 462
      if (rotationRange === 0) {                                                 // 455  // 463
        return minRotation;                                                      // 456  // 464
      }                                                                          // 457  // 465
                                                                                 // 458  // 466
      return minRotation + Math.random() * rotationRange;                        // 459  // 467
    };                                                                           // 460  // 468
                                                                                 // 461  // 469
    var getTextInfo = function getTextInfo(word, weight, rotateDeg) {            // 462  // 470
      // calculate the acutal font size                                          // 463  // 471
      // fontSize === 0 means weightFactor function wants the text skipped,      // 464  // 472
      // and size < minSize means we cannot draw the text.                       // 465  // 473
      var debug = false;                                                         // 466  // 474
      var fontSize = settings.weightFactor(weight);                              // 467  // 475
      if (fontSize <= settings.minSize) {                                        // 468  // 476
        return false;                                                            // 469  // 477
      }                                                                          // 470  // 478
                                                                                 // 471  // 479
      // Scale factor here is to make sure fillText is not limited by            // 472  // 480
      // the minium font size set by browser.                                    // 473  // 481
      // It will always be 1 or 2n.                                              // 474  // 482
      var mu = 1;                                                                // 475  // 483
      if (fontSize < miniumFontSize) {                                           // 476  // 484
        mu = (function calculateScaleFactor() {                                  // 477  // 485
          var mu = 2;                                                            // 478  // 486
          while (mu * fontSize < miniumFontSize) {                               // 479  // 487
            mu += 2;                                                             // 480  // 488
          }                                                                      // 481  // 489
          return mu;                                                             // 482  // 490
        })();                                                                    // 483  // 491
      }                                                                          // 484  // 492
                                                                                 // 485  // 493
      var fcanvas = document.createElement('canvas');                            // 486  // 494
      var fctx = fcanvas.getContext('2d', { willReadFrequently: true });         // 487  // 495
                                                                                 // 488  // 496
      fctx.font = settings.fontWeight + ' ' +                                    // 489  // 497
        (fontSize * mu).toString(10) + 'px ' + settings.fontFamily;              // 490  // 498
                                                                                 // 491  // 499
      // Estimate the dimension of the text with measureText().                  // 492  // 500
      var fw = fctx.measureText(word).width / mu;                                // 493  // 501
      var fh = Math.max(fontSize * mu,                                           // 494  // 502
                        fctx.measureText('m').width,                             // 495  // 503
                        fctx.measureText('\uFF37').width) / mu;                  // 496  // 504
                                                                                 // 497  // 505
      // Create a boundary box that is larger than our estimates,                // 498  // 506
      // so text don't get cut of (it sill might)                                // 499  // 507
      var boxWidth = fw + fh * 2;                                                // 500  // 508
      var boxHeight = fh * 3;                                                    // 501  // 509
      var fgw = Math.ceil(boxWidth / g);                                         // 502  // 510
      var fgh = Math.ceil(boxHeight / g);                                        // 503  // 511
      boxWidth = fgw * g;                                                        // 504  // 512
      boxHeight = fgh * g;                                                       // 505  // 513
                                                                                 // 506  // 514
      // Calculate the proper offsets to make the text centered at               // 507  // 515
      // the preferred position.                                                 // 508  // 516
                                                                                 // 509  // 517
      // This is simply half of the width.                                       // 510  // 518
      var fillTextOffsetX = - fw / 2;                                            // 511  // 519
      // Instead of moving the box to the exact middle of the preferred          // 512  // 520
      // position, for Y-offset we move 0.4 instead, so Latin alphabets look     // 513  // 521
      // vertical centered.                                                      // 514  // 522
      var fillTextOffsetY = - fh * 0.4;                                          // 515  // 523
                                                                                 // 516  // 524
      // Calculate the actual dimension of the canvas, considering the rotation. // 517  // 525
      var cgh = Math.ceil((boxWidth * Math.abs(Math.sin(rotateDeg)) +            // 518  // 526
                           boxHeight * Math.abs(Math.cos(rotateDeg))) / g);      // 519  // 527
      var cgw = Math.ceil((boxWidth * Math.abs(Math.cos(rotateDeg)) +            // 520  // 528
                           boxHeight * Math.abs(Math.sin(rotateDeg))) / g);      // 521  // 529
      var width = cgw * g;                                                       // 522  // 530
      var height = cgh * g;                                                      // 523  // 531
                                                                                 // 524  // 532
      fcanvas.setAttribute('width', width);                                      // 525  // 533
      fcanvas.setAttribute('height', height);                                    // 526  // 534
                                                                                 // 527  // 535
      if (debug) {                                                               // 528  // 536
        // Attach fcanvas to the DOM                                             // 529  // 537
        document.body.appendChild(fcanvas);                                      // 530  // 538
        // Save it's state so that we could restore and draw the grid correctly. // 531  // 539
        fctx.save();                                                             // 532  // 540
      }                                                                          // 533  // 541
                                                                                 // 534  // 542
      // Scale the canvas with |mu|.                                             // 535  // 543
      fctx.scale(1 / mu, 1 / mu);                                                // 536  // 544
      fctx.translate(width * mu / 2, height * mu / 2);                           // 537  // 545
      fctx.rotate(- rotateDeg);                                                  // 538  // 546
                                                                                 // 539  // 547
      // Once the width/height is set, ctx info will be reset.                   // 540  // 548
      // Set it again here.                                                      // 541  // 549
      fctx.font = settings.fontWeight + ' ' +                                    // 542  // 550
        (fontSize * mu).toString(10) + 'px ' + settings.fontFamily;              // 543  // 551
                                                                                 // 544  // 552
      // Fill the text into the fcanvas.                                         // 545  // 553
      // XXX: We cannot because textBaseline = 'top' here because                // 546  // 554
      // Firefox and Chrome uses different default line-height for canvas.       // 547  // 555
      // Please read https://bugzil.la/737852#c6.                                // 548  // 556
      // Here, we use textBaseline = 'middle' and draw the text at exactly       // 549  // 557
      // 0.5 * fontSize lower.                                                   // 550  // 558
      fctx.fillStyle = '#000';                                                   // 551  // 559
      fctx.textBaseline = 'middle';                                              // 552  // 560
      fctx.fillText(word, fillTextOffsetX * mu,                                  // 553  // 561
                    (fillTextOffsetY + fontSize * 0.5) * mu);                    // 554  // 562
                                                                                 // 555  // 563
      // Get the pixels of the text                                              // 556  // 564
      var imageData = fctx.getImageData(0, 0, width, height).data;               // 557  // 565
                                                                                 // 558  // 566
      if (exceedTime()) {                                                        // 559  // 567
        return false;                                                            // 560  // 568
      }                                                                          // 561  // 569
                                                                                 // 562  // 570
      if (debug) {                                                               // 563  // 571
        // Draw the box of the original estimation                               // 564  // 572
        fctx.strokeRect(fillTextOffsetX * mu,                                    // 565  // 573
                        fillTextOffsetY, fw * mu, fh * mu);                      // 566  // 574
        fctx.restore();                                                          // 567  // 575
      }                                                                          // 568  // 576
                                                                                 // 569  // 577
      // Read the pixels and save the information to the occupied array          // 570  // 578
      var occupied = [];                                                         // 571  // 579
      var gx = cgw, gy, x, y;                                                    // 572  // 580
      var bounds = [cgh / 2, cgw / 2, cgh / 2, cgw / 2];                         // 573  // 581
      while (gx--) {                                                             // 574  // 582
        gy = cgh;                                                                // 575  // 583
        while (gy--) {                                                           // 576  // 584
          y = g;                                                                 // 577  // 585
          singleGridLoop: {                                                      // 578  // 586
            while (y--) {                                                        // 579  // 587
              x = g;                                                             // 580  // 588
              while (x--) {                                                      // 581  // 589
                if (imageData[((gy * g + y) * width +                            // 582  // 590
                               (gx * g + x)) * 4 + 3]) {                         // 583  // 591
                  occupied.push([gx, gy]);                                       // 584  // 592
                                                                                 // 585  // 593
                  if (gx < bounds[3]) {                                          // 586  // 594
                    bounds[3] = gx;                                              // 587  // 595
                  }                                                              // 588  // 596
                  if (gx > bounds[1]) {                                          // 589  // 597
                    bounds[1] = gx;                                              // 590  // 598
                  }                                                              // 591  // 599
                  if (gy < bounds[0]) {                                          // 592  // 600
                    bounds[0] = gy;                                              // 593  // 601
                  }                                                              // 594  // 602
                  if (gy > bounds[2]) {                                          // 595  // 603
                    bounds[2] = gy;                                              // 596  // 604
                  }                                                              // 597  // 605
                                                                                 // 598  // 606
                  if (debug) {                                                   // 599  // 607
                    fctx.fillStyle = 'rgba(255, 0, 0, 0.5)';                     // 600  // 608
                    fctx.fillRect(gx * g, gy * g, g - 0.5, g - 0.5);             // 601  // 609
                  }                                                              // 602  // 610
                  break singleGridLoop;                                          // 603  // 611
                }                                                                // 604  // 612
              }                                                                  // 605  // 613
            }                                                                    // 606  // 614
            if (debug) {                                                         // 607  // 615
              fctx.fillStyle = 'rgba(0, 0, 255, 0.5)';                           // 608  // 616
              fctx.fillRect(gx * g, gy * g, g - 0.5, g - 0.5);                   // 609  // 617
            }                                                                    // 610  // 618
          }                                                                      // 611  // 619
        }                                                                        // 612  // 620
      }                                                                          // 613  // 621
                                                                                 // 614  // 622
      if (debug) {                                                               // 615  // 623
        fctx.fillStyle = 'rgba(0, 255, 0, 0.5)';                                 // 616  // 624
        fctx.fillRect(bounds[3] * g,                                             // 617  // 625
                      bounds[0] * g,                                             // 618  // 626
                      (bounds[1] - bounds[3] + 1) * g,                           // 619  // 627
                      (bounds[2] - bounds[0] + 1) * g);                          // 620  // 628
      }                                                                          // 621  // 629
                                                                                 // 622  // 630
      // Return information needed to create the text on the real canvas         // 623  // 631
      return {                                                                   // 624  // 632
        mu: mu,                                                                  // 625  // 633
        occupied: occupied,                                                      // 626  // 634
        bounds: bounds,                                                          // 627  // 635
        gw: cgw,                                                                 // 628  // 636
        gh: cgh,                                                                 // 629  // 637
        fillTextOffsetX: fillTextOffsetX,                                        // 630  // 638
        fillTextOffsetY: fillTextOffsetY,                                        // 631  // 639
        fillTextWidth: fw,                                                       // 632  // 640
        fillTextHeight: fh,                                                      // 633  // 641
        fontSize: fontSize                                                       // 634  // 642
      };                                                                         // 635  // 643
    };                                                                           // 636  // 644
                                                                                 // 637  // 645
    /* Determine if there is room available in the given dimension */            // 638  // 646
    var canFitText = function canFitText(gx, gy, gw, gh, occupied) {             // 639  // 647
      // Go through the occupied points,                                         // 640  // 648
      // return false if the space is not available.                             // 641  // 649
      var i = occupied.length;                                                   // 642  // 650
      while (i--) {                                                              // 643  // 651
        var px = gx + occupied[i][0];                                            // 644  // 652
        var py = gy + occupied[i][1];                                            // 645  // 653
                                                                                 // 646  // 654
        if (px >= ngx || py >= ngy || px < 0 || py < 0 || !grid[px][py]) {       // 647  // 655
          return false;                                                          // 648  // 656
        }                                                                        // 649  // 657
      }                                                                          // 650  // 658
      return true;                                                               // 651  // 659
    };                                                                           // 652  // 660
                                                                                 // 653  // 661
    /* Actually draw the text on the grid */                                     // 654  // 662
    var drawText = function drawText(gx, gy, info, word, weight,                 // 655  // 663
                                     distance, theta, rotateDeg, attributes) {   // 656  // 664
                                                                                 // 657  // 665
      var fontSize = info.fontSize;                                              // 658  // 666
      var color;                                                                 // 659  // 667
      if (getTextColor) {                                                        // 660  // 668
        color = getTextColor(word, weight, fontSize, distance, theta);           // 661  // 669
      } else {                                                                   // 662  // 670
        color = settings.color;                                                  // 663  // 671
      }                                                                          // 664  // 672
                                                                                 // 665  // 673
      var dimension;                                                             // 666  // 674
      var bounds = info.bounds;                                                  // 667  // 675
      dimension = {                                                              // 668  // 676
        x: (gx + bounds[3]) * g,                                                 // 669  // 677
        y: (gy + bounds[0]) * g,                                                 // 670  // 678
        w: (bounds[1] - bounds[3] + 1) * g,                                      // 671  // 679
        h: (bounds[2] - bounds[0] + 1) * g                                       // 672  // 680
      };                                                                         // 673  // 681
                                                                                 // 674  // 682
      elements.forEach(function(el) {                                            // 675  // 683
        if (el.getContext) {                                                     // 676  // 684
          var ctx = el.getContext('2d');                                         // 677  // 685
          var mu = info.mu;                                                      // 678  // 686
                                                                                 // 679  // 687
          // Save the current state before messing it                            // 680  // 688
          ctx.save();                                                            // 681  // 689
          ctx.scale(1 / mu, 1 / mu);                                             // 682  // 690
                                                                                 // 683  // 691
          ctx.font = settings.fontWeight + ' ' +                                 // 684  // 692
                     (fontSize * mu).toString(10) + 'px ' + settings.fontFamily; // 685  // 693
          ctx.fillStyle = color;                                                 // 686  // 694
                                                                                 // 687  // 695
          // Translate the canvas position to the origin coordinate of where     // 688  // 696
          // the text should be put.                                             // 689  // 697
          ctx.translate((gx + info.gw / 2) * g * mu,                             // 690  // 698
                        (gy + info.gh / 2) * g * mu);                            // 691  // 699
                                                                                 // 692  // 700
          if (rotateDeg !== 0) {                                                 // 693  // 701
            ctx.rotate(- rotateDeg);                                             // 694  // 702
          }                                                                      // 695  // 703
                                                                                 // 696  // 704
          // Finally, fill the text.                                             // 697  // 705
                                                                                 // 698  // 706
          // XXX: We cannot because textBaseline = 'top' here because            // 699  // 707
          // Firefox and Chrome uses different default line-height for canvas.   // 700  // 708
          // Please read https://bugzil.la/737852#c6.                            // 701  // 709
          // Here, we use textBaseline = 'middle' and draw the text at exactly   // 702  // 710
          // 0.5 * fontSize lower.                                               // 703  // 711
          ctx.textBaseline = 'middle';                                           // 704  // 712
          ctx.fillText(word, info.fillTextOffsetX * mu,                          // 705  // 713
                             (info.fillTextOffsetY + fontSize * 0.5) * mu);      // 706  // 714
                                                                                 // 707  // 715
          // The below box is always matches how <span>s are positioned          // 708  // 716
          /* ctx.strokeRect(info.fillTextOffsetX, info.fillTextOffsetY,          // 709  // 717
            info.fillTextWidth, info.fillTextHeight); */                         // 710  // 718
                                                                                 // 711  // 719
          // Restore the state.                                                  // 712  // 720
          ctx.restore();                                                         // 713  // 721
        } else {                                                                 // 714  // 722
          // drawText on DIV element                                             // 715  // 723
          var span = document.createElement('span');                             // 716  // 724
          var transformRule = '';                                                // 717  // 725
          transformRule = 'rotate(' + (- rotateDeg / Math.PI * 180) + 'deg) ';   // 718  // 726
          if (info.mu !== 1) {                                                   // 719  // 727
            transformRule +=                                                     // 720  // 728
              'translateX(-' + (info.fillTextWidth / 4) + 'px) ' +               // 721  // 729
              'scale(' + (1 / info.mu) + ')';                                    // 722  // 730
          }                                                                      // 723  // 731
          var styleRules = {                                                     // 724  // 732
            'position': 'absolute',                                              // 725  // 733
            'display': 'block',                                                  // 726  // 734
            'font': settings.fontWeight + ' ' +                                  // 727  // 735
                    (fontSize * info.mu) + 'px ' + settings.fontFamily,          // 728  // 736
            'left': ((gx + info.gw / 2) * g + info.fillTextOffsetX) + 'px',      // 729  // 737
            'top': ((gy + info.gh / 2) * g + info.fillTextOffsetY) + 'px',       // 730  // 738
            'width': info.fillTextWidth + 'px',                                  // 731  // 739
            'height': info.fillTextHeight + 'px',                                // 732  // 740
            'color': color,                                                      // 733  // 741
            'lineHeight': fontSize + 'px',                                       // 734  // 742
            'whiteSpace': 'nowrap',                                              // 735  // 743
            'transform': transformRule,                                          // 736  // 744
            'webkitTransform': transformRule,                                    // 737  // 745
            'msTransform': transformRule,                                        // 738  // 746
            'transformOrigin': '50% 40%',                                        // 739  // 747
            'webkitTransformOrigin': '50% 40%',                                  // 740  // 748
            'msTransformOrigin': '50% 40%'                                       // 741  // 749
          };                                                                     // 742  // 750
          span.textContent = word;                                               // 743  // 751
          for (var cssProp in styleRules) {                                      // 744  // 752
            span.style[cssProp] = styleRules[cssProp];                           // 745  // 753
          }                                                                      // 746  // 754
          if (attributes) {                                                      // 747  // 755
            for (var attribute in attributes) {                                  // 748  // 756
              span.setAttribute(attribute, attributes[attribute]);               // 749  // 757
            }                                                                    // 750  // 758
          }                                                                      // 751  // 759
          el.appendChild(span);                                                  // 752  // 760
        }                                                                        // 753  // 761
      });                                                                        // 754  // 762
    };                                                                           // 755  // 763
                                                                                 // 756  // 764
    /* Help function to updateGrid */                                            // 757  // 765
    var fillGridAt = function fillGridAt(x, y, drawMask, dimension, item) {      // 758  // 766
      if (x >= ngx || y >= ngy || x < 0 || y < 0) {                              // 759  // 767
        return;                                                                  // 760  // 768
      }                                                                          // 761  // 769
                                                                                 // 762  // 770
      grid[x][y] = false;                                                        // 763  // 771
                                                                                 // 764  // 772
      if (drawMask) {                                                            // 765  // 773
        var ctx = elements[0].getContext('2d');                                  // 766  // 774
        ctx.fillRect(x * g, y * g, maskRectWidth, maskRectWidth);                // 767  // 775
      }                                                                          // 768  // 776
                                                                                 // 769  // 777
      if (interactive) {                                                         // 770  // 778
        infoGrid[x][y] = { item: item, dimension: dimension };                   // 771  // 779
      }                                                                          // 772  // 780
    };                                                                           // 773  // 781
                                                                                 // 774  // 782
    /* Update the filling information of the given space with occupied points.   // 775  // 783
       Draw the mask on the canvas if necessary. */                              // 776  // 784
    var updateGrid = function updateGrid(gx, gy, gw, gh, info, item) {           // 777  // 785
      var occupied = info.occupied;                                              // 778  // 786
      var drawMask = settings.drawMask;                                          // 779  // 787
      var ctx;                                                                   // 780  // 788
      if (drawMask) {                                                            // 781  // 789
        ctx = elements[0].getContext('2d');                                      // 782  // 790
        ctx.save();                                                              // 783  // 791
        ctx.fillStyle = settings.maskColor;                                      // 784  // 792
      }                                                                          // 785  // 793
                                                                                 // 786  // 794
      var dimension;                                                             // 787  // 795
      if (interactive) {                                                         // 788  // 796
        var bounds = info.bounds;                                                // 789  // 797
        dimension = {                                                            // 790  // 798
          x: (gx + bounds[3]) * g,                                               // 791  // 799
          y: (gy + bounds[0]) * g,                                               // 792  // 800
          w: (bounds[1] - bounds[3] + 1) * g,                                    // 793  // 801
          h: (bounds[2] - bounds[0] + 1) * g                                     // 794  // 802
        };                                                                       // 795  // 803
      }                                                                          // 796  // 804
                                                                                 // 797  // 805
      var i = occupied.length;                                                   // 798  // 806
      while (i--) {                                                              // 799  // 807
        fillGridAt(gx + occupied[i][0], gy + occupied[i][1],                     // 800  // 808
                   drawMask, dimension, item);                                   // 801  // 809
      }                                                                          // 802  // 810
                                                                                 // 803  // 811
      if (drawMask) {                                                            // 804  // 812
        ctx.restore();                                                           // 805  // 813
      }                                                                          // 806  // 814
    };                                                                           // 807  // 815
                                                                                 // 808  // 816
    /* putWord() processes each item on the list,                                // 809  // 817
       calculate it's size and determine it's position, and actually             // 810  // 818
       put it on the canvas. */                                                  // 811  // 819
    var putWord = function putWord(item) {                                       // 812  // 820
      var word, weight, attributes;                                              // 813  // 821
      if (Array.isArray(item)) {                                                 // 814  // 822
        word = item[0];                                                          // 815  // 823
        weight = item[1];                                                        // 816  // 824
      } else {                                                                   // 817  // 825
        word = item.word;                                                        // 818  // 826
        weight = item.weight;                                                    // 819  // 827
        attributes = item.attributes;                                            // 820  // 828
      }                                                                          // 821  // 829
      var rotateDeg = getRotateDeg();                                            // 822  // 830
                                                                                 // 823  // 831
      // get info needed to put the text onto the canvas                         // 824  // 832
      var info = getTextInfo(word, weight, rotateDeg);                           // 825  // 833
                                                                                 // 826  // 834
      // not getting the info means we shouldn't be drawing this one.            // 827  // 835
      if (!info) {                                                               // 828  // 836
        return false;                                                            // 829  // 837
      }                                                                          // 830  // 838
                                                                                 // 831  // 839
      if (exceedTime()) {                                                        // 832  // 840
        return false;                                                            // 833  // 841
      }                                                                          // 834  // 842
                                                                                 // 835  // 843
      // Skip the loop if we have already know the bounding box of               // 836  // 844
      // word is larger than the canvas.                                         // 837  // 845
      var bounds = info.bounds;                                                  // 838  // 846
      if ((bounds[1] - bounds[3] + 1) > ngx ||                                   // 839  // 847
        (bounds[2] - bounds[0] + 1) > ngy) {                                     // 840  // 848
        return false;                                                            // 841  // 849
      }                                                                          // 842  // 850
                                                                                 // 843  // 851
      // Determine the position to put the text by                               // 844  // 852
      // start looking for the nearest points                                    // 845  // 853
      var r = maxRadius + 1;                                                     // 846  // 854
                                                                                 // 847  // 855
      var tryToPutWordAtPoint = function(gxy) {                                  // 848  // 856
        var gx = Math.floor(gxy[0] - info.gw / 2);                               // 849  // 857
        var gy = Math.floor(gxy[1] - info.gh / 2);                               // 850  // 858
        var gw = info.gw;                                                        // 851  // 859
        var gh = info.gh;                                                        // 852  // 860
                                                                                 // 853  // 861
        // If we cannot fit the text at this position, return false              // 854  // 862
        // and go to the next position.                                          // 855  // 863
        if (!canFitText(gx, gy, gw, gh, info.occupied)) {                        // 856  // 864
          return false;                                                          // 857  // 865
        }                                                                        // 858  // 866
                                                                                 // 859  // 867
        // Actually put the text on the canvas                                   // 860  // 868
        drawText(gx, gy, info, word, weight,                                     // 861  // 869
                 (maxRadius - r), gxy[2], rotateDeg, attributes);                // 862  // 870
                                                                                 // 863  // 871
        // Mark the spaces on the grid as filled                                 // 864  // 872
        updateGrid(gx, gy, gw, gh, info, item);                                  // 865  // 873
                                                                                 // 866  // 874
        // Return true so some() will stop and also return true.                 // 867  // 875
        return true;                                                             // 868  // 876
      };                                                                         // 869  // 877
                                                                                 // 870  // 878
      while (r--) {                                                              // 871  // 879
        var points = getPointsAtRadius(maxRadius - r);                           // 872  // 880
                                                                                 // 873  // 881
        if (settings.shuffle) {                                                  // 874  // 882
          points = [].concat(points);                                            // 875  // 883
          shuffleArray(points);                                                  // 876  // 884
        }                                                                        // 877  // 885
                                                                                 // 878  // 886
        // Try to fit the words by looking at each point.                        // 879  // 887
        // array.some() will stop and return true                                // 880  // 888
        // when putWordAtPoint() returns true.                                   // 881  // 889
        // If all the points returns false, array.some() returns false.          // 882  // 890
        var drawn = points.some(tryToPutWordAtPoint);                            // 883  // 891
                                                                                 // 884  // 892
        if (drawn) {                                                             // 885  // 893
          // leave putWord() and return true                                     // 886  // 894
          return true;                                                           // 887  // 895
        }                                                                        // 888  // 896
      }                                                                          // 889  // 897
      // we tried all distances but text won't fit, return false                 // 890  // 898
      return false;                                                              // 891  // 899
    };                                                                           // 892  // 900
                                                                                 // 893  // 901
    /* Send DOM event to all elements. Will stop sending event and return        // 894  // 902
       if the previous one is canceled (for cancelable events). */               // 895  // 903
    var sendEvent = function sendEvent(type, cancelable, detail) {               // 896  // 904
      if (cancelable) {                                                          // 897  // 905
        return !elements.some(function(el) {                                     // 898  // 906
          var evt = document.createEvent('CustomEvent');                         // 899  // 907
          evt.initCustomEvent(type, true, cancelable, detail || {});             // 900  // 908
          return !el.dispatchEvent(evt);                                         // 901  // 909
        }, this);                                                                // 902  // 910
      } else {                                                                   // 903  // 911
        elements.forEach(function(el) {                                          // 904  // 912
          var evt = document.createEvent('CustomEvent');                         // 905  // 913
          evt.initCustomEvent(type, true, cancelable, detail || {});             // 906  // 914
          el.dispatchEvent(evt);                                                 // 907  // 915
        }, this);                                                                // 908  // 916
      }                                                                          // 909  // 917
    };                                                                           // 910  // 918
                                                                                 // 911  // 919
    /* Start drawing on a canvas */                                              // 912  // 920
    var start = function start() {                                               // 913  // 921
      // For dimensions, clearCanvas etc.,                                       // 914  // 922
      // we only care about the first element.                                   // 915  // 923
      var canvas = elements[0];                                                  // 916  // 924
                                                                                 // 917  // 925
      if (canvas.getContext) {                                                   // 918  // 926
        ngx = Math.floor(canvas.width / g);                                      // 919  // 927
        ngy = Math.floor(canvas.height / g);                                     // 920  // 928
      } else {                                                                   // 921  // 929
        var rect = canvas.getBoundingClientRect();                               // 922  // 930
        ngx = Math.floor(rect.width / g);                                        // 923  // 931
        ngy = Math.floor(rect.height / g);                                       // 924  // 932
      }                                                                          // 925  // 933
                                                                                 // 926  // 934
      // Sending a wordcloudstart event which cause the previous loop to stop.   // 927  // 935
      // Do nothing if the event is canceled.                                    // 928  // 936
      if (!sendEvent('wordcloudstart', true)) {                                  // 929  // 937
        return;                                                                  // 930  // 938
      }                                                                          // 931  // 939
                                                                                 // 932  // 940
      // Determine the center of the word cloud                                  // 933  // 941
      center = (settings.origin) ?                                               // 934  // 942
        [settings.origin[0]/g, settings.origin[1]/g] :                           // 935  // 943
        [ngx / 2, ngy / 2];                                                      // 936  // 944
                                                                                 // 937  // 945
      // Maxium radius to look for space                                         // 938  // 946
      maxRadius = Math.floor(Math.sqrt(ngx * ngx + ngy * ngy));                  // 939  // 947
                                                                                 // 940  // 948
      /* Clear the canvas only if the clearCanvas is set,                        // 941  // 949
         if not, update the grid to the current canvas state */                  // 942  // 950
      grid = [];                                                                 // 943  // 951
                                                                                 // 944  // 952
      var gx, gy, i;                                                             // 945  // 953
      if (!canvas.getContext || settings.clearCanvas) {                          // 946  // 954
        elements.forEach(function(el) {                                          // 947  // 955
          if (el.getContext) {                                                   // 948  // 956
            var ctx = el.getContext('2d');                                       // 949  // 957
            ctx.fillStyle = settings.backgroundColor;                            // 950  // 958
            ctx.clearRect(0, 0, ngx * (g + 1), ngy * (g + 1));                   // 951  // 959
            ctx.fillRect(0, 0, ngx * (g + 1), ngy * (g + 1));                    // 952  // 960
          } else {                                                               // 953  // 961
            el.textContent = '';                                                 // 954  // 962
            el.style.backgroundColor = settings.backgroundColor;                 // 955  // 963
          }                                                                      // 956  // 964
        });                                                                      // 957  // 965
                                                                                 // 958  // 966
        /* fill the grid with empty state */                                     // 959  // 967
        gx = ngx;                                                                // 960  // 968
        while (gx--) {                                                           // 961  // 969
          grid[gx] = [];                                                         // 962  // 970
          gy = ngy;                                                              // 963  // 971
          while (gy--) {                                                         // 964  // 972
            grid[gx][gy] = true;                                                 // 965  // 973
          }                                                                      // 966  // 974
        }                                                                        // 967  // 975
      } else {                                                                   // 968  // 976
        /* Determine bgPixel by creating                                         // 969  // 977
           another canvas and fill the specified background color. */            // 970  // 978
        var bctx = document.createElement('canvas').getContext('2d');            // 971  // 979
                                                                                 // 972  // 980
        bctx.fillStyle = settings.backgroundColor;                               // 973  // 981
        bctx.fillRect(0, 0, 1, 1);                                               // 974  // 982
        var bgPixel = bctx.getImageData(0, 0, 1, 1).data;                        // 975  // 983
                                                                                 // 976  // 984
        /* Read back the pixels of the canvas we got to tell which part of the   // 977  // 985
           canvas is empty.                                                      // 978  // 986
           (no clearCanvas only works with a canvas, not divs) */                // 979  // 987
        var imageData =                                                          // 980  // 988
          canvas.getContext('2d').getImageData(0, 0, ngx * g, ngy * g).data;     // 981  // 989
                                                                                 // 982  // 990
        gx = ngx;                                                                // 983  // 991
        var x, y;                                                                // 984  // 992
        while (gx--) {                                                           // 985  // 993
          grid[gx] = [];                                                         // 986  // 994
          gy = ngy;                                                              // 987  // 995
          while (gy--) {                                                         // 988  // 996
            y = g;                                                               // 989  // 997
            singleGridLoop: while (y--) {                                        // 990  // 998
              x = g;                                                             // 991  // 999
              while (x--) {                                                      // 992  // 1000
                i = 4;                                                           // 993  // 1001
                while (i--) {                                                    // 994  // 1002
                  if (imageData[((gy * g + y) * ngx * g +                        // 995  // 1003
                                 (gx * g + x)) * 4 + i] !== bgPixel[i]) {        // 996  // 1004
                    grid[gx][gy] = false;                                        // 997  // 1005
                    break singleGridLoop;                                        // 998  // 1006
                  }                                                              // 999  // 1007
                }                                                                // 1000
              }                                                                  // 1001
            }                                                                    // 1002
            if (grid[gx][gy] !== false) {                                        // 1003
              grid[gx][gy] = true;                                               // 1004
            }                                                                    // 1005
          }                                                                      // 1006
        }                                                                        // 1007
                                                                                 // 1008
        imageData = bctx = bgPixel = undefined;                                  // 1009
      }                                                                          // 1010
                                                                                 // 1011
      // fill the infoGrid with empty state if we need it                        // 1012
      if (settings.hover || settings.click) {                                    // 1013
                                                                                 // 1014
        interactive = true;                                                      // 1015
                                                                                 // 1016
        /* fill the grid with empty state */                                     // 1017
        gx = ngx + 1;                                                            // 1018
        while (gx--) {                                                           // 1019
          infoGrid[gx] = [];                                                     // 1020
        }                                                                        // 1021
                                                                                 // 1022
        if (settings.hover) {                                                    // 1023
          canvas.addEventListener('mousemove', wordcloudhover);                  // 1024
        }                                                                        // 1025
                                                                                 // 1026
        if (settings.click) {                                                    // 1027
          canvas.addEventListener('click', wordcloudclick);                      // 1028
        }                                                                        // 1029
                                                                                 // 1030
        canvas.addEventListener('wordcloudstart', function stopInteraction() {   // 1031
          canvas.removeEventListener('wordcloudstart', stopInteraction);         // 1032
                                                                                 // 1033
          canvas.removeEventListener('mousemove', wordcloudhover);               // 1034
          canvas.removeEventListener('click', wordcloudclick);                   // 1035
          hovered = undefined;                                                   // 1036
        });                                                                      // 1037
      }                                                                          // 1038
                                                                                 // 1039
      i = 0;                                                                     // 1040
      var loopingFunction, stoppingFunction;                                     // 1041
      if (settings.wait !== 0) {                                                 // 1042
        loopingFunction = window.setTimeout;                                     // 1043
        stoppingFunction = window.clearTimeout;                                  // 1044
      } else {                                                                   // 1045
        loopingFunction = window.setImmediate;                                   // 1046
        stoppingFunction = window.clearImmediate;                                // 1047
      }                                                                          // 1048
                                                                                 // 1049
      var addEventListener = function addEventListener(type, listener) {         // 1050
        elements.forEach(function(el) {                                          // 1051
          el.addEventListener(type, listener);                                   // 1052
        }, this);                                                                // 1053
      };                                                                         // 1054
                                                                                 // 1055
      var removeEventListener = function removeEventListener(type, listener) {   // 1056
        elements.forEach(function(el) {                                          // 1057
          el.removeEventListener(type, listener);                                // 1058
        }, this);                                                                // 1059
      };                                                                         // 1060
                                                                                 // 1061
      var anotherWordCloudStart = function anotherWordCloudStart() {             // 1062
        removeEventListener('wordcloudstart', anotherWordCloudStart);            // 1063
        stoppingFunction(timer);                                                 // 1064
      };                                                                         // 1065
                                                                                 // 1066
      addEventListener('wordcloudstart', anotherWordCloudStart);                 // 1067
                                                                                 // 1068
      var timer = loopingFunction(function loop() {                              // 1069
        if (i >= settings.list.length) {                                         // 1070
          stoppingFunction(timer);                                               // 1071
          sendEvent('wordcloudstop', false);                                     // 1072
          removeEventListener('wordcloudstart', anotherWordCloudStart);          // 1073
                                                                                 // 1074
          return;                                                                // 1075
        }                                                                        // 1076
        escapeTime = (new Date()).getTime();                                     // 1077
        var drawn = putWord(settings.list[i]);                                   // 1078
        var canceled = !sendEvent('wordclouddrawn', true, {                      // 1079
          item: settings.list[i], drawn: drawn });                               // 1080
        if (exceedTime() || canceled) {                                          // 1081
          stoppingFunction(timer);                                               // 1082
          settings.abort();                                                      // 1083
          sendEvent('wordcloudabort', false);                                    // 1084
          sendEvent('wordcloudstop', false);                                     // 1085
          removeEventListener('wordcloudstart', anotherWordCloudStart);          // 1086
          return;                                                                // 1087
        }                                                                        // 1088
        i++;                                                                     // 1089
        timer = loopingFunction(loop, settings.wait);                            // 1090
      }, settings.wait);                                                         // 1091
    };                                                                           // 1092
                                                                                 // 1093
    // All set, start the drawing                                                // 1094
    start();                                                                     // 1095
  };                                                                             // 1096
                                                                                 // 1097
  WordCloud.isSupported = isSupported;                                           // 1098
  WordCloud.miniumFontSize = miniumFontSize;                                     // 1099
                                                                                 // 1100
  // Expose the library as an AMD module                                         // 1101
  if (typeof global.define === 'function' && global.define.amd) {                // 1102
    global.define('wordcloud', [], function() { return WordCloud; });            // 1103
  } else {                                                                       // 1104
    global.WordCloud = WordCloud;                                                // 1105
  }                                                                              // 1106
                                                                                 // 1107
})(window);                                                                      // 1108
                                                                                 // 1109
///////////////////////////////////////////////////////////////////////////////////      // 1118
                                                                                         // 1119
}).call(this);                                                                           // 1120
                                                                                         // 1121
                                                                                         // 1122
                                                                                         // 1123
                                                                                         // 1124
                                                                                         // 1125
                                                                                         // 1126
(function () {                                                                           // 1127
                                                                                         // 1128
///////////////////////////////////////////////////////////////////////////////////      // 1129
//                                                                               //      // 1130
// packages/overture8:wordcloud2/overture8:wordcloud2.js                         //      // 1131
//                                                                               //      // 1132
///////////////////////////////////////////////////////////////////////////////////      // 1133
                                                                                 //      // 1134
// Write your package code here!                                                 // 1    // 1135
                                                                                 // 2    // 1136
///////////////////////////////////////////////////////////////////////////////////      // 1137
                                                                                         // 1138
}).call(this);                                                                           // 1139
                                                                                         // 1140
///////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['overture8:wordcloud2'] = {};

})();
