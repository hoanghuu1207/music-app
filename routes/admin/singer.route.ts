import {Router} from 'express';
import multer from 'multer';

const upload = multer();

import * as uploadCloud from '../../middlewares/admin/uploadCloud.middleware';
import * as controller from '../../controllers/admin/singer.controller';

const router: Router = Router();

router.get('/', controller.index);
router.get('/create', controller.create);
router.post('/create',
              upload.fields(
                [
                  {name: 'avatar', maxCount: 1}
                ]
              ),
              uploadCloud.uploadFields,
              controller.createPost);
router.get('/edit/:id', controller.edit);
router.patch('/edit/:id', controller.editPatch);

export const singerRoute: Router = router;