const input = document.getElementById("server-input");
const button = document.getElementById("server-input-btn");
const userInput = document.getElementById("user-input");

button.addEventListener("click", () => {
    if(!input.value && !userInput.value){
        return;
    }

    localStorage.setItem("username", userInput.value);

    const randomNumber = Math.floor(Math.random() * 1000);
    localStorage.setItem("user_id", `${userInput.value}-${randomNumber}`);

    window.location.href = `./server.html?name=${input.value}`
})