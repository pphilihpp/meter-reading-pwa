
var CACHE_STATIC_NAME = 'static_v3';
var CACHE_DYNAMIC_NAME = 'dynamic_v3';

self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installing Service Worker ...', event);
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME)
      .then(function(cache) {
        console.log('[Service Worker] Precaching App Shell');
        cache.addAll([
          // '/',
          // '/index.html',
          // //'../src/App.js',
          // '../src/index.js',
          // '../src/index.css',
          // '../src/logo.svg',
          // '../src/components/Button.js',
          //'../src/components/Login.js'
          //'../src/components/Logout.js',
          // '../src/components/Navbar.js',
          // 'offline',
          // //'../src/data/FaqData.js',
          // '../src/components/Contracts/Account.js',
          // '../src/components/Contracts/Contract.js',
          // '../src/components/Contracts/Contracts.js',
          // //'../src/components/Faq/Accordion.js',
          //'../src/components/Faq/Faq.js',
          // '../src/components/styles/GlobalStyles.js'
          '/test.html'
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

//First Try: 

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        } else {
          return fetch(event.request)
            .then(function(res) {
              return caches.open(CACHE_DYNAMIC_NAME)
                .then(function(cache) {
                  cache.put(event.request.url, res.clone());
                  return res;
                })
            })
            .catch(function(err) {
              return caches.open(CACHE_STATIC_NAME)
              .then(function(cache) {     
                return cache.match('/test.html')
                    .then(function(test) {
                      console.log("[Service Worker] Return Offline Page!")
                      if (test) {
                        return test;
                      } else {
                        console.log("Offline Response Empty!")
                        return test
                      }
                    });
            });
            });
        }
      })
  );
});


// Cache then Network
//self.addEventListener('fetch', function(event) {
//  event.respondWith(
//    caches.open(CACHE_DYNAMIC_NAME)
//      .then(function(cache) {
//        return fetch(event.request)
//          .then(function(res) {
//            cache.put(event.request, res.clone());
//            return res;
//          });
//      })
//  );
//});

//Network with Cache Fallback
// self.addEventListener('fetch', function(event) {
//  event.respondWith(
//    fetch(event.request)
//      .then(function(res) {
//        return caches.open(CACHE_DYNAMIC_NAME)
//                .then(function(cache) {
//                  cache.put(event.request.url, res.clone());
//                  return res;
//                })
//      })
//      .catch(function(err) {
//        return caches.match(event.request)
//         .then(function(response) {
//           if (response) {
//             return response;
//           }
//         })
//         .catch(function(err) {
//             return caches.open(CACHE_STATIC_NAME)
//             .then(function(cache) {
//               console.log("[Service Worker] Return Offline Page!")
//               return cache.match('../src/components/Login.js');
//             });
//         });;
//      })
//  );
// });

// Network-only
// self.addEventListener('fetch', function (event) {
//  event.respondWith(
//    fetch(event.request)
//  );
//});

// Cache-only
//self.addEventListener('fetch', function (event) {
//  event.respondWith(
//    caches.match(event.request)
//  );
//});

