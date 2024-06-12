const input = document.getElementById("server-input");
const button = document.getElementById("server-input-btn");

button.addEventListener("click", () => {
    if(!input.value){
        return;
    }
    window.location.href = `./server.html?name=${input.value}`
})