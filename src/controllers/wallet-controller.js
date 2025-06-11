import Wallet from "../models/wallet-model.js";

export const store = async (req, res) => {
  try {
    const wallet = await Wallet.create(req.body);
    return res.status(201).json(wallet);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

export const index = async (req, res) => {
  try {
    const wallet = await Wallet.find().exec();
    return res.status(200).json(wallet);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

export const update = async (req, res) => {
  try {
    const wallet = await Wallet.findByIdAndUpdate(
      req.params.id,
      req.body
    ).exec();
    return res.status(200).json(wallet);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

export const destroy = async (req, res) => {
  try {
    const wallet = await Wallet.findByIdAndDelete(req.params.id).exec();
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};
