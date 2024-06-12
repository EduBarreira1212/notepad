const serverName = document.getElementById("server-name");
const serverTextArea = document.getElementById("server-text-area");

const searchParams = new URLSearchParams(window.location.search);
serverName.textContent = searchParams.get("name");

serverTextArea.addEventListener("keyup", (event) => {
    console.log("Change");
})