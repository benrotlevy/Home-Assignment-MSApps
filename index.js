import express from "express";
import { dataRouter } from "./routes/routes.js";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use("", dataRouter);

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
});
