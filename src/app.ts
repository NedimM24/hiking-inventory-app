//app.ts entry point

import express from "express";
import router from "./routes/index.js";

const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

app.use("/", router);

app.listen(3000, () => {
    console.log("Server running on port 3000");
    
});