!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e()
else if("function"==typeof define&&define.amd)define([],e)
else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).toolbox=e()}}(function(){return function e(t,n,r){function o(c,s){if(!n[c]){if(!t[c]){var a="function"==typeof require&&require
if(!s&&a)return a(c,!0)
if(i)return i(c,!0)
var u=new Error("Cannot find module '"+c+"'")
throw u.code="MODULE_NOT_FOUND",u}var f=n[c]={exports:{}}
t[c][0].call(f.exports,function(e){var n=t[c][1][e]
return o(n||e)},f,f.exports,e,t,n,r)}return n[c].exports}for(var i="function"==typeof require&&require,c=0;c<r.length;c++)o(r[c])
return o}({1:[function(e,t,n){"use strict"
function r(e,t){((t=t||{}).debug||a.debug)&&console.log("[sw-toolbox] "+e)}function o(e){var t
return e&&e.cache&&(t=e.cache.name),t=t||a.cache.name,caches.open(t)}function i(e,t,n){var o=e.url,i=n.maxAgeSeconds,c=n.maxEntries,s=n.name,a=Date.now()
return r("Updating LRU order for "+o+". Max entries is "+c+", max age is "+i),u.getDb(s).then(function(e){return u.setTimestampForUrl(e,o,a)}).then(function(e){return u.expireEntries(e,c,i,a)}).then(function(e){r("Successfully updated IDB.")
var n=e.map(function(e){return t.delete(e)})
return Promise.all(n).then(function(){r("Done with cache cleanup.")})}).catch(function(e){r(e)})}function c(e){var t=Array.isArray(e)
if(t&&e.forEach(function(e){"string"==typeof e||e instanceof Request||(t=!1)}),!t)throw new TypeError("The precache method expects either an array of strings and/or Requests or a Promise that resolves to an array of strings and/or Requests.")
return e}var s,a=e("./options"),u=e("./idb-cache-expiration")
t.exports={debug:r,fetchAndCache:function(e,t){var n=(t=t||{}).successResponses||a.successResponses
return fetch(e.clone()).then(function(r){return"GET"===e.method&&n.test(r.status)&&o(t).then(function(n){n.put(e,r).then(function(){var r=t.cache||a.cache;(r.maxEntries||r.maxAgeSeconds)&&r.name&&function(e,t,n){var r=i.bind(null,e,t,n)
s=s?s.then(r):r()}(e,n,r)})}),r.clone()})},openCache:o,renameCache:function(e,t,n){return r("Renaming cache: ["+e+"] to ["+t+"]",n),caches.delete(t).then(function(){return Promise.all([caches.open(e),caches.open(t)]).then(function(t){var n=t[0],r=t[1]
return n.keys().then(function(e){return Promise.all(e.map(function(e){return n.match(e).then(function(t){return r.put(e,t)})}))}).then(function(){return caches.delete(e)})})})},cache:function(e,t){return o(t).then(function(t){return t.add(e)})},uncache:function(e,t){return o(t).then(function(t){return t.delete(e)})},precache:function(e){e instanceof Promise||c(e),a.preCacheItems=a.preCacheItems.concat(e)},validatePrecacheInput:c}},{"./idb-cache-expiration":2,"./options":4}],2:[function(e,t,n){"use strict"
var r="sw-toolbox-",o=1,i="store",c="url",s="timestamp",a={}
t.exports={getDb:function(e){return e in a||(a[e]=function(e){return new Promise(function(t,n){var a=indexedDB.open(r+e,o)
a.onupgradeneeded=function(){a.result.createObjectStore(i,{keyPath:c}).createIndex(s,s,{unique:!1})},a.onsuccess=function(){t(a.result)},a.onerror=function(){n(a.error)}})}(e)),a[e]},setTimestampForUrl:function(e,t,n){return new Promise(function(r,o){var c=e.transaction(i,"readwrite")
c.objectStore(i).put({url:t,timestamp:n}),c.oncomplete=function(){r(e)},c.onabort=function(){o(c.error)}})},expireEntries:function(e,t,n,r){return function(e,t,n){return t?new Promise(function(r,o){var a=1e3*t,u=[],f=e.transaction(i,"readwrite"),h=f.objectStore(i)
h.index(s).openCursor().onsuccess=function(e){var t=e.target.result
if(t&&n-a>t.value[s]){var r=t.value[c]
u.push(r),h.delete(r),t.continue()}},f.oncomplete=function(){r(u)},f.onabort=o}):Promise.resolve([])}(e,n,r).then(function(n){return function(e,t){return t?new Promise(function(n,r){var o=[],a=e.transaction(i,"readwrite"),u=a.objectStore(i),f=u.index(s),h=f.count()
f.count().onsuccess=function(){var e=h.result
e>t&&(f.openCursor().onsuccess=function(n){var r=n.target.result
if(r){var i=r.value[c]
o.push(i),u.delete(i),e-o.length>t&&r.continue()}})},a.oncomplete=function(){n(o)},a.onabort=r}):Promise.resolve([])}(e,t).then(function(e){return n.concat(e)})})}}},{}],3:[function(e,t,n){"use strict"
function r(e){return e.reduce(function(e,t){return e.concat(t)},[])}e("serviceworker-cache-polyfill")
var o=e("./helpers"),i=e("./router"),c=e("./options")
t.exports={fetchListener:function(e){var t=i.match(e.request)
t?e.respondWith(t(e.request)):i.default&&"GET"===e.request.method&&0===e.request.url.indexOf("http")&&e.respondWith(i.default(e.request))},activateListener:function(e){o.debug("activate event fired")
var t=c.cache.name+"$$$inactive$$$"
e.waitUntil(o.renameCache(t,c.cache.name))},installListener:function(e){var t=c.cache.name+"$$$inactive$$$"
o.debug("install event fired"),o.debug("creating cache ["+t+"]"),e.waitUntil(o.openCache({cache:{name:t}}).then(function(e){return Promise.all(c.preCacheItems).then(r).then(o.validatePrecacheInput).then(function(t){return o.debug("preCache list: "+(t.join(", ")||"(none)")),e.addAll(t)})}))}}},{"./helpers":1,"./options":4,"./router":6,"serviceworker-cache-polyfill":16}],4:[function(e,t,n){"use strict"
var r
r=self.registration?self.registration.scope:self.scope||new URL("./",self.location).href,t.exports={cache:{name:"$$$toolbox-cache$$$"+r+"$$$",maxAgeSeconds:null,maxEntries:null},debug:!1,networkTimeoutSeconds:null,preCacheItems:[],successResponses:/^0|([123]\d\d)|(40[14567])|410$/}},{}],5:[function(e,t,n){"use strict"
var r=new URL("./",self.location).pathname,o=e("path-to-regexp"),i=function(e,t,n,i){t instanceof RegExp?this.fullUrlRegExp=t:(0!==t.indexOf("/")&&(t=r+t),this.keys=[],this.regexp=o(t,this.keys)),this.method=e,this.options=i,this.handler=n}
i.prototype.makeHandler=function(e){var t
if(this.regexp){var n=this.regexp.exec(e)
t={},this.keys.forEach(function(e,r){t[e.name]=n[r+1]})}return function(e){return this.handler(e,t,this.options)}.bind(this)},t.exports=i},{"path-to-regexp":15}],6:[function(e,t,n){"use strict"
var r=e("./route"),o=e("./helpers"),i=function(e,t){for(var n=e.entries(),r=n.next(),o=[];!r.done;){new RegExp(r.value[0]).test(t)&&o.push(r.value[1]),r=n.next()}return o},c=function(){this.routes=new Map,this.routes.set(RegExp,new Map),this.default=null};["get","post","put","delete","head","any"].forEach(function(e){c.prototype[e]=function(t,n,r){return this.add(e,t,n,r)}}),c.prototype.add=function(e,t,n,i){var c
i=i||{},t instanceof RegExp?c=RegExp:c=(c=i.origin||self.location.origin)instanceof RegExp?c.source:function(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}(c),e=e.toLowerCase()
var s=new r(e,t,n,i)
this.routes.has(c)||this.routes.set(c,new Map)
var a=this.routes.get(c)
a.has(e)||a.set(e,new Map)
var u=a.get(e),f=s.regexp||s.fullUrlRegExp
u.has(f.source)&&o.debug('"'+t+'" resolves to same regex as existing route.'),u.set(f.source,s)},c.prototype.matchMethod=function(e,t){var n=new URL(t),r=n.origin,o=n.pathname
return this._match(e,i(this.routes,r),o)||this._match(e,[this.routes.get(RegExp)],t)},c.prototype._match=function(e,t,n){if(0===t.length)return null
for(var r=0;r<t.length;r++){var o=t[r],c=o&&o.get(e.toLowerCase())
if(c){var s=i(c,n)
if(s.length>0)return s[0].makeHandler(n)}}return null},c.prototype.match=function(e){return this.matchMethod(e.method,e.url)||this.matchMethod("any",e.url)},t.exports=new c},{"./helpers":1,"./route":5}],7:[function(e,t,n){"use strict"
var r=e("../helpers")
t.exports=function(e,t,n){return r.debug("Strategy: cache first ["+e.url+"]",n),r.openCache(n).then(function(t){return t.match(e).then(function(t){return t||r.fetchAndCache(e,n)})})}},{"../helpers":1}],8:[function(e,t,n){"use strict"
var r=e("../helpers")
t.exports=function(e,t,n){return r.debug("Strategy: cache only ["+e.url+"]",n),r.openCache(n).then(function(t){return t.match(e)})}},{"../helpers":1}],9:[function(e,t,n){"use strict"
var r=e("../helpers"),o=e("./cacheOnly")
t.exports=function(e,t,n){return r.debug("Strategy: fastest ["+e.url+"]",n),new Promise(function(i,c){var s=!1,a=[],u=function(e){a.push(e.toString()),s?c(new Error('Both cache and network failed: "'+a.join('", "')+'"')):s=!0},f=function(e){e instanceof Response?i(e):u("No result returned")}
r.fetchAndCache(e.clone(),n).then(f,u),o(e,t,n).then(f,u)})}},{"../helpers":1,"./cacheOnly":8}],10:[function(e,t,n){t.exports={networkOnly:e("./networkOnly"),networkFirst:e("./networkFirst"),cacheOnly:e("./cacheOnly"),cacheFirst:e("./cacheFirst"),fastest:e("./fastest")}},{"./cacheFirst":7,"./cacheOnly":8,"./fastest":9,"./networkFirst":11,"./networkOnly":12}],11:[function(e,t,n){"use strict"
var r=e("../options"),o=e("../helpers")
t.exports=function(e,t,n){var i=(n=n||{}).successResponses||r.successResponses,c=n.networkTimeoutSeconds||r.networkTimeoutSeconds
return o.debug("Strategy: network first ["+e.url+"]",n),o.openCache(n).then(function(t){var r,s,a=[]
if(c){var u=new Promise(function(n){r=setTimeout(function(){t.match(e).then(function(e){e&&n(e)})},1e3*c)})
a.push(u)}var f=o.fetchAndCache(e,n).then(function(e){if(r&&clearTimeout(r),i.test(e.status))return e
throw o.debug("Response was an HTTP error: "+e.statusText,n),s=e,new Error("Bad response")}).catch(function(r){return o.debug("Network or response error, fallback to cache ["+e.url+"]",n),t.match(e).then(function(e){if(e)return e
if(s)return s
throw r})})
return a.push(f),Promise.race(a)})}},{"../helpers":1,"../options":4}],12:[function(e,t,n){"use strict"
var r=e("../helpers")
t.exports=function(e,t,n){return r.debug("Strategy: network only ["+e.url+"]",n),fetch(e)}},{"../helpers":1}],13:[function(e,t,n){"use strict"
var r=e("./options"),o=e("./router"),i=e("./helpers"),c=e("./strategies"),s=e("./listeners")
i.debug("Service Worker Toolbox is loading"),self.addEventListener("install",s.installListener),self.addEventListener("activate",s.activateListener),self.addEventListener("fetch",s.fetchListener),t.exports={networkOnly:c.networkOnly,networkFirst:c.networkFirst,cacheOnly:c.cacheOnly,cacheFirst:c.cacheFirst,fastest:c.fastest,router:o,options:r,cache:i.cache,uncache:i.uncache,precache:i.precache}},{"./helpers":1,"./listeners":3,"./options":4,"./router":6,"./strategies":10}],14:[function(e,t,n){t.exports=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)}},{}],15:[function(e,t,n){function r(e){for(var t,n=[],r=0,o=0,i="";null!=(t=d.exec(e));){var c=t[0],s=t[1],u=t.index
if(i+=e.slice(o,u),o=u+c.length,s)i+=s[1]
else{var f=e[o],h=t[2],p=t[3],l=t[4],g=t[5],m=t[6],v=t[7]
i&&(n.push(i),i="")
var x=null!=h&&null!=f&&f!==h,w="+"===m||"*"===m,y="?"===m||"*"===m,b=t[2]||"/",E=l||g||(v?".*":"[^"+b+"]+?")
n.push({name:p||r++,prefix:h||"",delimiter:b,optional:y,repeat:w,partial:x,asterisk:!!v,pattern:a(E)})}}return o<e.length&&(i+=e.substr(o)),i&&n.push(i),n}function o(e){return encodeURI(e).replace(/[\/?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function i(e){return encodeURI(e).replace(/[?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function c(e){for(var t=new Array(e.length),n=0;n<e.length;n++)"object"==typeof e[n]&&(t[n]=new RegExp("^(?:"+e[n].pattern+")$"))
return function(n,r){for(var c="",s=n||{},a=(r||{}).pretty?o:encodeURIComponent,u=0;u<e.length;u++){var f=e[u]
if("string"!=typeof f){var h,p=s[f.name]
if(null==p){if(f.optional){f.partial&&(c+=f.prefix)
continue}throw new TypeError('Expected "'+f.name+'" to be defined')}if(l(p)){if(!f.repeat)throw new TypeError('Expected "'+f.name+'" to not repeat, but received `'+JSON.stringify(p)+"`")
if(0===p.length){if(f.optional)continue
throw new TypeError('Expected "'+f.name+'" to not be empty')}for(var d=0;d<p.length;d++){if(h=a(p[d]),!t[u].test(h))throw new TypeError('Expected all "'+f.name+'" to match "'+f.pattern+'", but received `'+JSON.stringify(h)+"`")
c+=(0===d?f.prefix:f.delimiter)+h}}else{if(h=f.asterisk?i(p):a(p),!t[u].test(h))throw new TypeError('Expected "'+f.name+'" to match "'+f.pattern+'", but received "'+h+'"')
c+=f.prefix+h}}else c+=f}return c}}function s(e){return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function a(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function u(e,t){return e.keys=t,e}function f(e){return e.sensitive?"":"i"}function h(e,t){for(var n=(t=t||{}).strict,r=!1!==t.end,o="",i=e[e.length-1],c="string"==typeof i&&/\/$/.test(i),a=0;a<e.length;a++){var u=e[a]
if("string"==typeof u)o+=s(u)
else{var h=s(u.prefix),p="(?:"+u.pattern+")"
u.repeat&&(p+="(?:"+h+p+")*"),o+=p=u.optional?u.partial?h+"("+p+")?":"(?:"+h+"("+p+"))?":h+"("+p+")"}}return n||(o=(c?o.slice(0,-2):o)+"(?:\\/(?=$))?"),o+=r?"$":n&&c?"":"(?=\\/|$)",new RegExp("^"+o,f(t))}function p(e,t,n){return l(t=t||[])?n||(n={}):(n=t,t=[]),e instanceof RegExp?function(e,t){var n=e.source.match(/\((?!\?)/g)
if(n)for(var r=0;r<n.length;r++)t.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null})
return u(e,t)}(e,t):l(e)?function(e,t,n){for(var r=[],o=0;o<e.length;o++)r.push(p(e[o],t,n).source)
return u(new RegExp("(?:"+r.join("|")+")",f(n)),t)}(e,t,n):function(e,t,n){for(var o=r(e),i=h(o,n),c=0;c<o.length;c++)"string"!=typeof o[c]&&t.push(o[c])
return u(i,t)}(e,t,n)}var l=e("isarray")
t.exports=p,t.exports.parse=r,t.exports.compile=function(e){return c(r(e))},t.exports.tokensToFunction=c,t.exports.tokensToRegExp=h
var d=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g")},{isarray:14}],16:[function(e,t,n){!function(){var e=Cache.prototype.addAll,t=navigator.userAgent.match(/(Firefox|Chrome)\/(\d+\.)/)
if(t)var n=t[1],r=parseInt(t[2])
e&&(!t||"Firefox"===n&&r>=46||"Chrome"===n&&r>=50)||(Cache.prototype.addAll=function(e){function t(e){this.name="NetworkError",this.code=19,this.message=e}var n=this
return t.prototype=Object.create(Error.prototype),Promise.resolve().then(function(){if(arguments.length<1)throw new TypeError
return e=e.map(function(e){return e instanceof Request?e:String(e)}),Promise.all(e.map(function(e){"string"==typeof e&&(e=new Request(e))
var n=new URL(e.url).protocol
if("http:"!==n&&"https:"!==n)throw new t("Invalid scheme")
return fetch(e.clone())}))}).then(function(r){if(r.some(function(e){return!e.ok}))throw new t("Incorrect response status")
return Promise.all(r.map(function(t,r){return n.put(e[r],t)}))}).then(function(){})},Cache.prototype.add=function(e){return this.addAll([e])})}()},{}]},{},[13])(13)})
