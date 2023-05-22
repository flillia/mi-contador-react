/*
if("serviceWorker" in navigator) {
    console.log("Si existe");
}
*/

if(navigator.serviceWorker) {
    navigator.serviceWorker.register("./serviceWorker.js");
}