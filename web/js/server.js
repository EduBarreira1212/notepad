const serverName = document.getElementById("server-name");
const serverTextArea = document.getElementById("server-text-area");

const searchParams = new URLSearchParams(window.location.search);
const serverNameURL = searchParams.get("name");
serverName.textContent = serverNameURL

serverTextArea.addEventListener("keyup", async (event) => {
    console.log("Change");

    const { value } = event.target;

    await fetch(`http://localhost:3000/api/update-notepad`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({noteName: serverNameURL, noteContent: value})
    })
})

window.addEventListener("load", async () => {
    const data = await fetch(`http://localhost:3000/api/get-notepad/${serverNameURL}`).then(res => res.json());

    serverTextArea.value = data.content;

    console.log(data);
})