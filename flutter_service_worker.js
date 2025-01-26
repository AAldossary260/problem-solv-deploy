'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "922845d965953883896cb03c5bc30b3a",
"assets/AssetManifest.bin.json": "f94de106b482671a483a3fe3ac3d9a7f",
"assets/AssetManifest.json": "78ce37964ce8b269a31b7dedcfe0812b",
"assets/FontManifest.json": "35b206722122c03b794fd04b9b5ed7a0",
"assets/fonts/MaterialIcons-Regular.otf": "8376fb424efc901bb568e70ab36963af",
"assets/fonts/Tajawal-Bold.ttf": "73222b42f57d11db8ed71c1752e121c0",
"assets/fonts/Tajawal-Medium.ttf": "1472d65abf09fa765956fd3d32dadf48",
"assets/images/email.png": "c32338f34b5871fb35443812a61c262a",
"assets/images/facebook-logo.png": "654968b3afbccac492c7025c104896ec",
"assets/images/github.png": "058246330cce51a83ea8833e11fad7e8",
"assets/images/icon.png": "c5ab74ec116598996efced4752c3a5ce",
"assets/images/internet.png": "bcbfe36ce0280290a2a59d75456eb04b",
"assets/images/linkedin.png": "260c5c7c9e5f9e6923d0c6e69d77f84f",
"assets/images/telephone.png": "901c72840d0f779cd5ee147d75d20e5c",
"assets/images/user.png": "ccf06429758ead3a0001c880240b2e9c",
"assets/images/waite.json": "576f38ecdb5da7091749c3ecb4cb9f24",
"assets/images/whatsapp.png": "f33779e9d1e56011099c4d3b4fb76285",
"assets/NOTICES": "9b29924ab447b4c97a2fda7876536151",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "17ee8e30dde24e349e70ffcdc0073fb0",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "f3307f62ddff94d2cd8b103daf8d1b0f",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "04f83c01dded195a11d21c2edf643455",
"assets/packages/uicons_bold_rounded/font/uicons_bold_rounded.ttf": "edc9ae25a3b63b7a354338147fbeaa30",
"assets/packages/uicons_bold_straight/font/uicons_bold_straight.ttf": "553af576fba028fa0d0da64c37b534ca",
"assets/packages/uicons_brands/font/uicons_brands.ttf": "efbfb2a241ff49f1a22160361b66a1a3",
"assets/packages/uicons_regular_rounded/font/uicons_regular_rounded.ttf": "ef9bc8b8078dffe8491fb20e5c521280",
"assets/packages/uicons_regular_straight/font/uicons_regular_straight.ttf": "741d4bdce4e72aa808046a72b0d995eb",
"assets/packages/uicons_solid_rounded/font/uicons_solid_rounded.ttf": "4b98c06c43f97bf30373fc23e0648d98",
"assets/packages/uicons_solid_straight/font/uicons_solid_straight.ttf": "4cfd54f5ee52863f78707b11893a21fa",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "66177750aff65a66cb07bb44b8c6422b",
"canvaskit/canvaskit.js.symbols": "48c83a2ce573d9692e8d970e288d75f7",
"canvaskit/canvaskit.wasm": "1f237a213d7370cf95f443d896176460",
"canvaskit/chromium/canvaskit.js": "671c6b4f8fcc199dcc551c7bb125f239",
"canvaskit/chromium/canvaskit.js.symbols": "a012ed99ccba193cf96bb2643003f6fc",
"canvaskit/chromium/canvaskit.wasm": "b1ac05b29c127d86df4bcfbf50dd902a",
"canvaskit/skwasm.js": "694fda5704053957c2594de355805228",
"canvaskit/skwasm.js.symbols": "262f4827a1317abb59d71d6c587a93e2",
"canvaskit/skwasm.wasm": "9f0c0c02b82a910d12ce0543ec130e60",
"canvaskit/skwasm.worker.js": "89990e8c92bcb123999aa81f7e203b1c",
"favicon.png": "1c0ded2ceb0114e98c2e18afd7099b35",
"flutter.js": "f393d3c16b631f36852323de8e583132",
"flutter_bootstrap.js": "344beb8fd14d3804df03c528eaeed93b",
"icons/Icon-192.png": "eaeaef42c2a3a2e0f1620ac1e39bc03f",
"icons/Icon-512.png": "50f0cd6ab48b8f5bfa0e56d04555122a",
"icons/Icon-maskable-192.png": "eaeaef42c2a3a2e0f1620ac1e39bc03f",
"icons/Icon-maskable-512.png": "50f0cd6ab48b8f5bfa0e56d04555122a",
"index.html": "e7e5b522919fc4b306349f1c14470956",
"/": "e7e5b522919fc4b306349f1c14470956",
"main.dart.js": "95c260fdb2841c95e316f2f6d9487d71",
"manifest.json": "f16eff8e719aad70ac690c17b682e95c",
"version.json": "8e7bd9742e1f54b1ca5c443ab0e74c96"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
