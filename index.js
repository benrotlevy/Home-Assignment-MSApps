import path, { dirname } from "path";
import { fileURLToPath } from "url";
import express from "express";

const PORT = process.env.PORT || 5000;

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDirectoryPath = path.join(__dirname, "client/build");

app.use(express.static(publicDirectoryPath));
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
});
