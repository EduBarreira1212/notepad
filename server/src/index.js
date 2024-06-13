import express from "express";
import cors from "cors"
import { getRedisInstance } from "./redis.js";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())

app.post("/api/update-notepad", (req, res) => {
    const {noteName, noteContent} = req.body;

    const redisInstance = getRedisInstance();

    const noteObj = {
        content: noteContent,
    }

    const expire = 60000 * 60 * 24;

    redisInstance.set(noteName, JSON.stringify(noteObj), "PX", expire);
    res.status(200).send(noteObj);
})

app.get("/api/get-notepad/:noteName", async (req, res) => {
    const {noteName} = req.params;

    const redisInstance = getRedisInstance();

    const note = JSON.parse(await redisInstance.get(noteName));

    if(note){
        return res.status(200).send(note);
    }

    return res.sendStatus(404);
})

app.listen(3000, () => {
    console.log("Server running on port 3000");
});