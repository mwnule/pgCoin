import db from "../config/db.js";

const date_now = new Date();

const transactionSchema = new db.Schema({
  walletFrom: {
    type: db.Schema.Types.ObjectId,
    ref: "Wallet",
    required: true,
  },
  walletTo: {
    type: db.Schema.Types.ObjectId,
    ref: "Wallet",
    required: true,
  },
  // valor da transação
  amount: {
    type: Number,
    required: false,
  },
  // Tipo de transação (e.g., "transfer", "deposit", "withdraw")
  type: {
    type: String,
    required: true,
  },
  // Status da transação (e.g., "completed", "pending", "failed")
  status: {
    type: String,
    required: true,
  },
  // Tipo de moeda envolvida
  currency: {
    type: String,
    required: true,
  },
  // Detalhes opcionais sobre a transação
  details: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: date_now,
  },
});

const Transaction = db.model("transaction", transactionSchema);

export default Transaction;
