const serverName = document.getElementById("server-name");
const serverTextArea = document.getElementById("server-text-area");

const searchParams = new URLSearchParams(window.location.search);
const serverNameURL = searchParams.get("name");
serverName.textContent = serverNameURL

Pusher.logToConsole = true;

const pusher = new Pusher('903e264e874adc3e1f6b', {
  cluster: 'us2'
});

serverTextArea.addEventListener("keyup", async (event) => {
    console.log("Change");

    const { value } = event.target;

    await fetch(`http://localhost:3000/api/update-notepad`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({noteName: serverNameURL, noteContent: value, userId: pusher.sessionID})
    })
})

window.addEventListener("load", async () => {
    const data = await fetch(`http://localhost:3000/api/get-notepad/${serverNameURL}`).then(res => res.json());

    serverTextArea.value = data.content;

    console.log(data);
})

if(serverNameURL){
    const channel = pusher.subscribe(serverNameURL);
    channel.bind("updated-note", data => {
        if (data.content && data.userId !== pusher.sessionID) {
            serverTextArea.value = data.content;
        }
    });
}
