import express from "express";
import bodyParser from "body-parser";
import resourceRoutes from "./routes/resourceRoutes.ts";

const app = express();

app.use(bodyParser.json());
app.use("/api/resources", resourceRoutes);

export default app;
