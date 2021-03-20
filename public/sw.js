
var CACHE_STATIC_NAME = 'static_v2';
var CACHE_DYNAMIC_NAME = 'dynamic_v2';

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
          '../src/components/Login.js'
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
 event.respondWith(
   fetch(event.request)
     .then(function(res) {
       return caches.open(CACHE_DYNAMIC_NAME)
               .then(function(cache) {
                 cache.put(event.request.url, res.clone());
                 return res;
               })
     })
     .catch(function(err) {
      if (event.request.method == "GET"){
        return caches.match(event.request)
          .then(function(response) {
            if (response) {
              return response;
            }
          })
      } else if (event.request.method == "POST"){
        // If it doesn't work, post a failure message to the client
        console.log(event.clientId);
        self.clients.get(event.clientId).then(function(client) {
           client.postMessage({
             message: "Post unsuccessful.",
             alert: "Post unsuccessful." // A string we instantiated earlier
           });
        });
       // Respond with the page that the request originated from
       return caches.match(event.request.clone().referrer);
      }
    })
 );
});

self.addEventListener('sync', function(event) {
  console.log('[Service Worker] Background syncing', event);
  if (event.tag === 'sync-new-posts') {
    console.log('[Service Worker] Syncing new Posts');
    event.waitUntil(function(){
      // readAllData('sync-posts')
      //   .then(function(data) {
      //     for (var dt of data) {
            data = localStorage.getItem('sync-posts');
            await axios({
              method: 'POST',
              withCredentials: false,
              url: 'http://localhost:9000/meter-reading/contract-accounts/000800005001', //url: process.env.API_URL + '/app/session', //http://localhost:3000/login
              data: data,
              })
            // fetch('https://pwagram-99adf.firebaseio.com/posts.json', {
            //   method: 'POST',
            //   headers: {
            //     'Content-Type': 'application/json',
            //     'Accept': 'application/json'
            //   },
            //   body: JSON.stringify({
            //     id: dt.id,
            //     title: dt.title,
            //     location: dt.location,
            //     image: 'https://firebasestorage.googleapis.com/v0/b/pwagram-99adf.appspot.com/o/sf-boat.jpg?alt=media&token=19f4770c-fc8c-4882-92f1-62000ff06f16'
            //   })
            // })
              .then(function(res) {
                console.log('Sent data', res);
                if (res.ok) {
                  //deleteItemFromData('sync-posts', dt.id);
                  localStorage.removeItem('sync-posts')
                }
              })
              .catch(function(err) {
                console.log('Error while sending data', err);
              });
          }

        //})
    );
  }
});

// Cache then Network
// self.addEventListener('fetch', function(event) {
//   if (event.request.method == "GET"){
//     event.respondWith(
//       caches.open(CACHE_DYNAMIC_NAME)
//         .then(function(cache) {
//           return fetch(event.request)
//             .then(function(res) {
//               cache.put(event.request, res.clone());
//               return res;
//             });
//         })
//     );
//   } else if (event.request.method == "POST"){
//      event.respondWith(
//        // Try to get the response from the network
//        fetch(event.request.clone()).catch(function(){
//         // If it doesn't work, post a failure message to the client
//         console.log(event.clientId);
//         self.clients.get(event.clientId).then(function(client) {
//           client.postMessage({
//             message: "Post unsuccessful.",
//             alert: "Post unsuccessful." // A string we instantiated earlier
//           });
//         });
//       // Respond with the page that the request originated from
//       return caches.match(event.request.clone().referrer);
//       })
//     );
//   }
// });

// else if (event.request.method == "POST"){
//   event.respondWith(
//     // Try to get the response from the network
//     fetch(event.request.clone()).catch(function() {
//       // If it doesn't work, post a failure message to the client
//       self.clients.get(event.clientId).then(function(client) {
//         client.postMessage({
//           message: "Post unsuccessful.",
//           alert: "Post unsuccessful." // A string we instantiated earlier
//         });
//       });
//     });
//     // Respond with the page that the request originated from
//     return caches.match(event.request.clone().referrer);
    
//   );
// }

//First Try: 
// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.match(event.request)
//       .then(function(response) {
//         if (response) {
//           return response;
//         } else {
//           return fetch(event.request)
//             .then(function(res) {
//               return caches.open(CACHE_DYNAMIC_NAME)
//                 .then(function(cache) {
//                   cache.put(event.request.url, res.clone());
//                   return res;
//                 })
//             })
//             .catch(function(err) {
//               return caches.open(CACHE_STATIC_NAME)
//               .then(function(cache) {     
//                 return cache.match('/test.html')
//                     .then(function(test) {
//                       console.log("[Service Worker] Return Offline Page!")
//                       if (test) {
//                         return test;
//                       } else {
//                         console.log("Offline Response Empty!")
//                         return test
//                       }
//                     });
//             });
//             });
//         }
//       })
//   );
// });


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

