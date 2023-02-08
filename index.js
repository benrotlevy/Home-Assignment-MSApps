import express from "express";
import { dataRouter } from "./routes/routes.js";
import cors from "cors";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use("", dataRouter);
app.use(cors());

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
});
