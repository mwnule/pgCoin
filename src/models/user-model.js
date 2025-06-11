import db from "../config/db.js";
import bcrypt from "bcrypt";

const userSchema = new db.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
      },
      required: true,
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
  },
  permission_type: {
    type: String,
    enum: ["ADM", "REC", "USU"],
    required: true,
    default: "REC",
  },
  phones: {
    type: Array,
  },
  house_number: {
    type: String,
  },
  zipcode: {
    type: Object,
    minLength: 8,
    maxLength: 8,
  },
});

userSchema.pre("save", async function () {
  // Monta o hash criptografado
  this.password = await bcrypt.hash(this.password, 10);
});

// Define um método para a classe
userSchema.methods.senhaCorreta = async function (senha) {
  return await bcrypt.compare(senha, this.password);
};

const User = db.model("User", userSchema);

export default User;
