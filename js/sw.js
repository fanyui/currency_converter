var staticCache = 'currency-converter-v1';
self.addEventListener('install', function(event){
 event.waitUntil(
 	caches.open('converter1').then(function(cache){
 		return cache.addAll([
			 '/',
			 'js/index.js',
			 'css/styles.css'

		]);
 	})
 	)
})


self.addEventListener('fetch', function(event){
	event.respondWith( 
		caches.match(event.request).then(function(response){
			return response || fetch(event.request);
		})
	);
})

self.addEventListener('activate', function(event){
	event.waitUntil(
		caches.keys().then(function(cacheName){
			return Promise.all(
				cacheName.filter(function(cacheName){
					return cacheName.startsWith('currency-') && cacheName != staticCache; 
				}).map(function(cacheName){
					return caches.delete(cacheName);
				})
				);
		})
		)
})