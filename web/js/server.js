const serverName = document.getElementById("server-name");
const userQty = document.getElementById("users-quantity");
const serverTextArea = document.getElementById("server-text-area");

const searchParams = new URLSearchParams(window.location.search);
serverName.textContent = searchParams.get("name");
const serverNameURL = `presence-${searchParams.get("name")}`;


const baseURL = "https://notepad-hbva.onrender.com";

const pusher = new Pusher('7618bc1ca4744eea6825', {
  cluster: 'us2',
  channelAuthorization: {
    endpoint: `${baseURL}/pusher/auth`,
    paramsProvider: () => {
        return {
            user_id: localStorage.getItem("user_id"),
            username: localStorage.getItem("username"),
        }
    }
  },
  userAuthentication: {
    endpoint: `${baseURL}/pusher/authenticate`,
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

    await fetch(`${baseURL}/api/update-notepad`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({noteName: serverNameURL, noteContent: value, userId: pusher.sessionID})
    })
})

window.addEventListener("load", async () => {
    const data = await fetch(`${baseURL}/api/get-notepad/${serverNameURL}`).then(res => res.json());

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