import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";

//[GET] /
export const index = async (req: Request, res: Response) => {
  const topics = await Topic.find({
    deleted: false
  }).limit(4);
  
  const songs = await Song.find({
    status: "active",
    deleted: false
  }).select("avatar title slug singerId")
    .limit(8)
    .sort({ like: "desc" });

  for (const song of songs) {
    const infoSinger = await Singer.findOne({
      _id: song.singerId,
      status: "active",
      deleted: false
    });

    song["infoSinger"] = infoSinger;
  }

  res.render("client/pages/home/index", {
    titlePage: "Music Website - Nghe nhạc trực tuyến",
    topics,
    songs
  });
}