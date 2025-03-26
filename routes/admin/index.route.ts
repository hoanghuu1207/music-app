import { Express } from "express";
import { systemConfig } from "../../config/system";
import { dashboardRoute } from "./dashboard.route";
import { topicRoute } from "./topic.route";
import { songRoute } from "./song.route";
import { singerRoute } from "./singer.route";
import { uploadRoute } from "./upload.route";
import { authRoute } from "./auth.route";
import { auth } from "../../middlewares/admin/auth.middleware";

const adminRoute = (app: Express): void => {
  const PATH_ADMIN = `/${systemConfig.prefixAdmin}`;
  app.use(`${PATH_ADMIN}/dashboard`, auth, dashboardRoute);
  app.use(`${PATH_ADMIN}/topics`, auth, topicRoute);
  app.use(`${PATH_ADMIN}/songs`, auth, songRoute);
  app.use(`${PATH_ADMIN}/singers`, auth, singerRoute);
  app.use(`${PATH_ADMIN}/upload`, auth, uploadRoute);

  app.use(`${PATH_ADMIN}/auth`, authRoute);
}

export default adminRoute;