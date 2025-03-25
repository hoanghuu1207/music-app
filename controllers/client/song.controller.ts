import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import FavoriteSong from "../../models/favorite-song.model";

// [GET] /songs/:slugTopic
export const list = async (req: Request, res: Response) => {
  const topic = await Topic.findOne({
    slug: req.params.slugTopic,
    status: "active",
    deleted: false
  });
  
  const songs = await Song.find({
    topicId: topic.id,
    status: "active",
    deleted: false
  }).select("avatar title slug singerId like");

  for (const song of songs) {
    const infoSinger = await Singer.findOne({
      _id: song.singerId,
      status: "active",
      deleted: false
    });

    song["infoSinger"] = infoSinger;
  }

  res.render("client/pages/songs/list", {
    titlePage: topic.title,
    songs: songs,
  });
};

// [GET] /songs/detail/:slugSong
export const detail = async (req: Request, res: Response) => {
  const slugSong: string = req.params.slugSong;

  console.log(slugSong);

  const song = await Song.findOne({
    slug: slugSong,
    deleted: false,
    status: "active"
  });

  console.log(song);

  const singer = await Singer.findOne({
    _id: song.singerId,
    deleted: false,
    status: "active"
  }).select("fullName");

  const topic = await Topic.findOne({
    _id: song.topicId,
    deleted: false,
    status: "active"
  }).select("title");

  const favoriteSong = await FavoriteSong.findOne({
    songId: song.id,
    // userId: ""
  });

  song["isFavoriteSong"] = favoriteSong ? true : false;

  res.render("client/pages/songs/detail", {
    titlePage: "Chi tiết bài hát",
    song: song,
    singer: singer,
    topic: topic
  });
};

// [PATCH] /songs/like/:typeLike/:idSong
export const like = async (req: Request, res: Response) => {
  const typeLike: string = req.params.typeLike;
  const idSong: string = req.params.idSong;

  const song = await Song.findOne({
    _id: idSong,
    deleted: false,
    status: "active"
  });

  const newLike: number = typeLike == "like" ? song.like + 1 : song.like - 1;

  await Song.updateOne(
    {
      _id: idSong
    },{
      like: newLike
    }
  );

  // like: ["id_user_1", "id_user_2"]

  res.json({
    code: 200,
    message: "Cập nhật thành công",
    like: newLike
  });
};

// [PATCH] /songs/favorite-song/:typeFavorite/:idSong
export const favorite = async (req: Request, res: Response) => {
  const typeFavorite: string = req.params.typeFavorite;
  const idSong: string = req.params.idSong;

  switch(typeFavorite){
    case "favorite":
      const existFavoriteSong = await FavoriteSong.findOne({
        songId: idSong
      });

      if(!existFavoriteSong){
        const newFavoriteSong = new FavoriteSong({
          //userId
          songId: idSong
        });
        await newFavoriteSong.save();
      }
      break;

    case "unfavorite":
      await FavoriteSong.deleteOne(
        {
          songId: idSong
        }
      );
      break;
    
    default:
      break;
  }

  res.json({
    code: 200,
    message: "Cập nhật thành công"
  });
};

// [PATCH] /songs/listen/:idSong
export const listen = async (req: Request, res: Response) => {
  const idSong: string = req.params.idSong;

  const song = await Song.findOne({
    _id: idSong,
    deleted: false
  });

  const listen: number = song.listen + 1;

  await Song.updateOne(
    {
      _id: idSong
    },
    {
      listen: listen
    }
  );

  const newSong = await Song.findOne({
    deleted: false,
    _id: idSong
  });

  res.json({
    code: 200,
    message: "Thành công",
    listen: newSong.listen
  });
}