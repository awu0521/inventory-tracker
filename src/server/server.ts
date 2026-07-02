import express from "express";
export const app = express();
export const PORT = 3000;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});