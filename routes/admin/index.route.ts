import { Express } from "express";
import { systemConfig } from "../../config/system";
import { dashboardRoute } from "./dashboard.route";
import { topicRoute } from "./topic.route";
import { songRoute } from "./song.route";
import { singerRoute } from "./singer.route";
import { uploadRoute } from "./upload.route";

const adminRoute = (app: Express): void => {
  const PATH_ADMIN = `/${systemConfig.prefixAdmin}`;
  app.use(`${PATH_ADMIN}/dashboard`, dashboardRoute);
  app.use(`${PATH_ADMIN}/topics`, topicRoute);
  app.use(`${PATH_ADMIN}/songs`, songRoute);
  app.use(`${PATH_ADMIN}/singers`, singerRoute);
  app.use(`${PATH_ADMIN}/upload`, uploadRoute);
}

export default adminRoute;