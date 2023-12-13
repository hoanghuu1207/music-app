import { Request, Response } from "express";
import Topic from "../../models/topic.model";

//[GET] /topics
export const topics = async (req: Request, res: Response) => {
  const topics = await Topic.find({
    deleted: false
  });
  
  res.render("client/pages/topics/index", {
    titlePage: "Chủ đề bài hát",
    topics
  });
};