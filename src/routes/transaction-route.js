
import { Router } from 'express';
import {
    transaction
} from '../controllers/transaction-controller.js';

const router = Router();

router.post('/:wallet_id/:to_wallet_id', transaction);

export default router;