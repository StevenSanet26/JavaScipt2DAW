var worker = new Worker("Worker.js");

worker.addEventListener("message", function (e) {
    alert("Joan feo " + e.data);
})

worker.postMessage("Joan Pons Sanchis fill de puta");


