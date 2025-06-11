import db from "../config/db.js";

const date_now = new Date();

const walletSchema = new db.Schema({
    userId: {
        type: db.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // Saldo atual da carteira
    balance: {
        type: Number,
        required: false
    },
     // Tipo de moeda (e.g., "USD", "BRL", "BTC")
    currency: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: date_now
    }
});

const Wallet = db.model("Wallet", walletSchema);

export default Wallet;
