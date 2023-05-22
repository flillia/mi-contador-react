// Cacheando nuetro sitio web.
const CACHE_ELEMENTS = [
    "./",
    "https://unpkg.com/react@18/umd/react.production.min.js",
    "https://unpkg.com/react-dom@18/umd/react-dom.production.min.js",
    "https://unpkg.com/@babel/standalone/babel.min.js",
    "./style.css",
    "./components/Contador.js"
];

// Nombre del cache - Siempre comienza con vx_
const CACHE_NAME = "v3_cache_contador_react";

// Evento - Cuando se registra/instala.
self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            cache.addAll(CACHE_ELEMENTS).then(()=> {
                self.skipWaiting()
            }).catch(console.log)
        })
    );
});

// activar el service worker
self.addEventListener("activate", (e) => {

    const cacheWhiteList = [CACHE_NAME];

    e.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(cacheNames.map(cacheName => {
                // Con el ampersan si no se cumple es n ull
                return cacheWhiteList.indexOf(cacheName) === -1 && caches.delete(cacheName)
            }))
        }).then(() => self.clients.claim())
    );
});

// Fetch: Busca nueva version de archivos y devuelve las respuestas cacheadas
// Si cachea nueva hace la peticion y responder una nueva cosa.
self.addEventListener("fetch", (e) => {
    e.respondWith(
        // Si existe en cache devuelvo sino lo busco en Internet para devolverlo.
        caches.match(e.request).then((res) => {
            if(res) {
                return res;
            }

            return fetch(e.request);
        })
    );
});