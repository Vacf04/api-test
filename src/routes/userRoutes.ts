import { Router } from 'express';
import UserController from '../controllers/UserController.js';

const router = Router();

router.post('/', UserController.create);
router.get('/', UserController.index);
router.get('/:id', UserController.show);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.delete);

export default router;
