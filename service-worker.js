const cacheName = 'nic-pwa-v1';
// Chemins corrigés : on utilise des chemins relatifs (commençant par './')
const filesToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        console.log('Mise en cache des fichiers pour le Service Worker');
        return cache.addAll(filesToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si la ressource est dans le cache, on la retourne.
        // Sinon, on la récupère sur le réseau.
        return response || fetch(event.request);
      })
  );
});
