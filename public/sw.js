importScripts('idb.js');
importScripts('utility.js');

var CACHE_STATIC_NAME = 'static_v1';
var CACHE_DYNAMIC_NAME = 'dynamic_v1';

self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installing Service Worker ...', event);
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME)
      .then(function(cache) {
        console.log('[Service Worker] Precaching App Shell');
        cache.addAll([
          '/',
          '/index.html',
          '../src/App.js',
          '../src/index.js',
          '../src/components/Login.js'
        ]);
      })
  )
});

self.addEventListener('activate', function(event) {
  console.log('[Service Worker] Activating Service Worker ....', event);
  event.waitUntil(
    caches.keys()
      .then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
            console.log('[Service Worker] Removing old cache.', key);
            return caches.delete(key);
          }
        }));
      })
  );
  return self.clients.claim();
});


//Network with Cache Fallback
self.addEventListener('fetch', function(event) {
  if (event.request.method == "GET" && event.request.referrer == "http://localhost:3000/"){
    event.respondWith(
      fetch(event.request)
      .then(function(res) {
        return caches.open(CACHE_DYNAMIC_NAME)
                .then(function(cache) {
                  cache.put(event.request.url, res.clone());
                  return res;
                })
      })
      .catch(function() {
          return caches.match(event.request)
            .then(function(response) {
              if (response) {
                return response;
              }
            })

      })
    );
  } else if (event.request.method == "POST" && event.request.referrer == "http://localhost:3000/"){
    fetch(event.request)
    .catch(function() {
      // If it doesn't work, post a failure message to the client
      self.clients.get(event.clientId).then(function(client) {
        client.postMessage({
          message: "Post unsuccessful.",
          alert: "Post unsuccessful." // A string we instantiated earlier
        });
      });
      // Respond with the page that the request originated from
      return caches.match(event.request.referrer);
    })
  }

});

//IndexedDB
self.addEventListener('sync', function(event) {
  console.log('[Service Worker] Background syncing', event);
  if (event.tag === 'sync-new-posts') {
    console.log('[Service Worker] Syncing new Posts');
    event.waitUntil(
      readAllData('sync-posts')
        .then(function(data) {
          for (var dt of data) {
            fetch('http://localhost:9000/meter-reading/contract-accounts/000800005001', {
              method: 'POST',
              withCredentials: false,
              body: JSON.stringify(dt.data)
            })
            .then(function(res) {
              console.log('Sent data', res);
              if (res.ok) {
                deleteItemFromData('sync-posts', dt.id); // Isn't working correctly!
              }
            })
            .catch(function(err) {
              console.log('Error while sending data', err);
            });
          }

        })
    );
  }
});

