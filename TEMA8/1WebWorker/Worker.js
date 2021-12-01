self.addEventListener("message", function (e) {

    console.log("The boss says " + e.data);
    hora = new Date();

    console.log("A joan li queda " + hora + "de vida");

    this.self.postMessage("hellow Steven you are the beast and this is your time "+hora);

})