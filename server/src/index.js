import express from "express";
import { getRedisInstance } from "./redis";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/api/update-notepad", (req, res) => {
    const {noteName, noteContent} = req.body;

    const redisInstance = getRedisInstance();

    const noteObj = {
        content: noteContent,
    }

    const expire = 60000 * 60 * 24;

    redisInstance.set(noteName, JSON.stringify(noteObj), "PX", expire);
})

app.listen(3000, () => {
    console.log("Server running on port 3000");
});