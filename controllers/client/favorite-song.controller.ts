import { Request, Response } from "express";
import FavoriteSong from "../../models/favorite-song.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";

// [GET] /favorite-songs
export const index = async (req: Request, res: Response) => {
  const favoriteSongs = await FavoriteSong.find({
    //userId: ""
    deleted: false
  });

  for (const favoriteSong of favoriteSongs) {
    const infoSong = await Song.findOne({
      _id: favoriteSong.songId,
      deleted: false
    });

    const infoSinger = await Singer.findOne({
      _id: infoSong.singerId,
      deleted: false
    });

    favoriteSong["infoSong"] = infoSong;
    favoriteSong["infoSinger"] = infoSinger;
  }

  res.render("client/pages/favorite-songs/index", {
    titlePage: "Bài hát yêu thích",
    favoriteSongs: favoriteSongs
  });
};