import Wallet from "../models/wallet-model.js";
import Transaction from "../models/transaction-model.js";

// Alteração: store agora retorna o conteúdo em vez de enviar uma resposta
export const store = async (data) => {
  try {
    const content = await Transaction.create(data);
    return content;
  } catch (error) {
    throw error;
  }
};

async function verifyWallet(wallet_id) {
  const wallet = await Wallet.findById(wallet_id).exec();
  return wallet.balance;
}

async function updateFromWallet(wallet_id, dowWallet) {
  const wallet = await Wallet.findByIdAndUpdate(wallet_id, { balance: dowWallet }).exec();
  return wallet.balance;
}

async function updateToWallet(wallet_id, upWallet) {
  const wallet = await Wallet.findByIdAndUpdate(wallet_id, { balance: upWallet }).exec();
  return wallet.balance;
}

export const transaction = async (req, res) => {
  const amountFromWallet = await verifyWallet(req.params.wallet_id);
  const upWallet = amountFromWallet + req.body.amount;
  //todo retirar o valor da carteira de quem recebe a transação corrigir
  const dowWallet = amountFromWallet - req.body.amount;

  try {
    if (amountFromWallet > req.body.amount) {

      await updateFromWallet(req.params.wallet_id, dowWallet);
      await updateToWallet(req.params.to_wallet_id, upWallet);


      const content = await store(req.body);

      // Envia a resposta final
      return res.status(200).json({
        message: "Transaction approved",
        transaction: content,
      });
    } else {
      return res.status(403).json("Don't have money");
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json("Transaction not approved");
  }
};
