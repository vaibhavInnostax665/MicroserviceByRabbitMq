import express from "express";
import consumerRoute from "./routes/consumer.route.js"

const app = express();

app.use(express.json());
app.use('/consume',consumerRoute)

app.listen(5000, ()=>{
    console.log("Server running on port 5000");
})