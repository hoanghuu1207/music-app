import { Express } from "express";
import { topicRoute } from "./topic.route";
import { songRoute } from "./song.route";
import { favoriteSongRoute } from "./favorite-song.route";
import { searchRoute } from "./search.route";
import { homeRoute } from "./home.route"

const clientRoute = (app: Express): void => {
  app.use(`/`, homeRoute);
  app.use(`/topics`, topicRoute);
  app.use(`/songs`, songRoute);
  app.use(`/favorite-songs`, favoriteSongRoute);
  app.use(`/search`, searchRoute);
};

export default clientRoute;