import Pusher from "pusher";

const pusher = new Pusher({
    appId: "1820684",
    key: "903e264e874adc3e1f6b",
    secret: "d45818b7ecd8d7bf1121",
    cluster: "us2",
    useTLS: true
});

export default pusher;