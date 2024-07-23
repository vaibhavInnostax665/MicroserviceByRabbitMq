import express from "express";
import providerRoutes from "./routes/provider.route.js"
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/provider",providerRoutes)

app.listen(6000, ()=>{
    console.log(" provider server listening on 6000");
})