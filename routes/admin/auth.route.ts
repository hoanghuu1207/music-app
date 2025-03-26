import { Router } from 'express';

import * as controller from '../../controllers/admin/auth.controller';

const router: Router = Router();

router.get('/login', controller.login);
router.post('/login', controller.loginPost);

router.get('/register', controller.register);
router.get('/logout', controller.logout);

export const authRoute: Router = router;