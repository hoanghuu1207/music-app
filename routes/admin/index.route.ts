import { Express } from "express";
import { systemConfig } from "../../config/system";
import { dashboardRoute } from "./dashboard.route";
import { topicRoute } from "./topic.route";
import { songRoute } from "./song.route";
import { uploadRoute } from "./upload.route";

const adminRoute = (app: Express): void => {
  const PATH_AMIN = `/${systemConfig.prefixAdmin}`;
  app.use(`${PATH_AMIN}/dashboard`, dashboardRoute);
  app.use(`${PATH_AMIN}/topics`, topicRoute);
  app.use(`${PATH_AMIN}/songs`, songRoute);
  app.use(`${PATH_AMIN}/upload`, uploadRoute);
}

export default adminRoute;