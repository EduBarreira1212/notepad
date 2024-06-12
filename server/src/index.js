import express from "express";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(3000, () => {
    console.log("Server running on port 3000");
});