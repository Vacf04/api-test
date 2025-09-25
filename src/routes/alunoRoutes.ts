import { Router } from 'express';
import AlunoController from '../controllers/AlunoController.js';
import loginRequired from '../middlewares/loginRequired.js';

const router = Router();

router.get('/', AlunoController.index);
router.post('/', loginRequired, AlunoController.create);
router.put('/:id', loginRequired, AlunoController.update);
router.delete('/:id', loginRequired, AlunoController.delete);
router.get('/:id', AlunoController.show);

export default router;
