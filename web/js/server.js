const serverName = document.getElementById("server-name");
const serverTextArea = document.getElementById("server-text-area");

const searchParams = new URLSearchParams(window.location.search);
serverName.textContent = searchParams.get("name");

serverTextArea.addEventListener("keyup", async (event) => {
    console.log("Change");

    const { value } = event.target;

    await fetch(`http://localhost:3000/api/update-notepad`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({noteName: searchParams.get("name"), noteContent: value})
    })
})