import { Router } from "express";
import multer from "multer";
const router: Router = Router();

const upload = multer();

import * as uploadCloud from "../../middlewares/admin/uploadCloud.middleware";

import * as controller from "../../controllers/admin/songs.controller";

router.get("/", controller.index);
router.get("/create", controller.create);
router.post("/create",
            upload.fields([
              {name: "avatar", maxCount: 1},
              {name: "audio", maxCount: 1}
            ]), 
            uploadCloud.uploadFields, 
            controller.createPost);
router.get("/edit/:id", controller.edit);
router.patch("/edit/:id",
            upload.fields([
              {name: "avatar", maxCount: 1},
              {name: "audio", maxCount: 1}
            ]), 
            uploadCloud.uploadFields, 
            controller.editPatch);

export const songRoute: Router = router;