const serverName = document.getElementById("server-name");
const userQty = document.getElementById("users-quantity");
const serverTextArea = document.getElementById("server-text-area");

const searchParams = new URLSearchParams(window.location.search);
const serverNameURL = searchParams.get("name");
serverName.textContent = serverNameURL

const pusher = new Pusher('7618bc1ca4744eea6825', {
  cluster: 'us2',
  channelAuthorization: {
    endpoint: "http://localhost:3000/pusher/auth",
    paramsProvider: () => {
        return {
            user_id: localStorage.getItem("user_id"),
            username: localStorage.getItem("username"),
        }
    }
  },
  userAuthentication: {
    endpoint: "http://localhost:3000/pusher/authenticate",
    paramsProvider: () => {
        return {
            user_id: localStorage.getItem("user_id"),
            username: localStorage.getItem("username"),
        }
    }
  }
});

serverTextArea.addEventListener("keyup", async (event) => {
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
})

if(serverNameURL){
    pusher.signin();

    const channel = pusher.subscribe(serverNameURL);
    channel.bind("updated-note", data => {
        if (data.content && data.userId !== pusher.sessionID) {
            serverTextArea.value = data.content;
        }
    });

    channel.bind("pusher:member_added", () => {
        userQty.textContent = Number(userQty.textContent) + 1;
    })

    channel.bind("pusher:member_removed", () => {
        userQty.textContent = Number(userQty.textContent) - 1;
    })

    channel.bind("pusher:subscription_succeeded", () => {
        userQty.textContent = channel.members.count;
    })
}