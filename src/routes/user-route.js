import { Router } from "express";
import {
  store,
  index,
  show,
  update,
  destroy,
  signup,
  login,
} from "../controllers/user-controller.js";

import check_token from "../middleware/check_token.js";
import check_role from "../middleware/check_role.js"
import via_cep from "../middleware/via_cep.js"

const router = Router();

router.post("/", check_token, check_role(["ADM"]), via_cep, store);
router.get("/", check_token, check_role(["USU", "ADM"]), index); 
router.get("/:id", check_token, show);
router.put("/:id", check_token,via_cep, update);
router.delete("/:id", check_token, destroy);

router.post("/signup", signup);
router.post("/login", login);

export default router;
