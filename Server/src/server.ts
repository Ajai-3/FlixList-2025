import http from "http";
import app from "./app.ts";
import connectDB from "./db/db.ts";

const port = process.env.PORT;

const server = http.createServer(app);


connectDB();

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
