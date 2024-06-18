import Pusher from "pusher";
import dotenv from 'dotenv';

dotenv.config({path: '../.env'});

const pusher = new Pusher({
    appId: "1821246",
    key: "7618bc1ca4744eea6825",
    secret: process.env.PUSHER_SECRET,
    cluster: "us2",
    useTLS: true
});

export default pusher;