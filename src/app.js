import express from "express";
import "dotenv/config";
import walletRouter from "./routes/wallet-router.js";
import userRouter from "./routes/user-route.js";
import transactionRouter from "./routes/transaction-route.js";

const app = express();
app.use(express.json());

app.use("/user", userRouter);
app.use("/wallet", walletRouter);
app.use("/transaction", transactionRouter);

app.listen(process.env.API_PORT, () => {
  console.log("Server is running on port " + process.env.API_PORT);
});
