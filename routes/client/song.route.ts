import { Router } from "express";
const router: Router = Router();

import * as controller from "../../controllers/client/song.controller";

router.get("/:slugTopic", controller.list);
router.get("/detail/:slugSong", controller.detail);
router.patch("/like/:typeLike/:idSong", controller.like);
router.patch("/favorite-song/:typeFavorite/:idSong", controller.favorite);
router.patch("/listen/:idSong", controller.listen);

export const songRoute: Router = router;