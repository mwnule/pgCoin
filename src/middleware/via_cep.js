import axios from "axios";

const cep_endereco = (req, res, next) => {
  req.body.zipcode = req.body.zipcode.replaceAll(".", "").replaceAll("-", "");
  if (req.body.zipcode.length == 8 && !isNaN(Number(req.body.zipcode))) {
    axios
      .get(`https://viacep.com.br/ws/${req.body.zipcode}/json/`)
      .then((resposta) => {
        delete req.body.zipcode;

        req.body.zipcode = resposta.data;

        next();
      });
  } else {
    res.status(400).json();

  }
};

export default cep_endereco;
