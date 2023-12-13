import { Request, Response } from "express";
import { convertToSlug } from "../../helpers/convertToSlug";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";

//[GET] /search/:type
export const result = async  (req: Request, res: Response) => {
  const type = req.params.type;
  const keyword: string = `${req.query.keyword}`;

  let newSongs = [];

  if(keyword){
    const keywordRegex = new RegExp(keyword, "i");

    const stringSlug = convertToSlug(keyword);
    const stringSlugRegex = new RegExp(stringSlug, "i");
    
    const songs = await Song.find({
      $or: [
        { title: keywordRegex },
        { slug: stringSlugRegex }
      ],
      deleted: false
    });

    for (const song of songs) {
      const infoSinger = await Singer.findOne({
        _id: song.singerId,
        deleted: false
      });

      // song["infoSinger"] = infoSinger;
      newSongs.push({
        // id: song.id,
        title: song.title,
        avatar: song.avatar,
        like: song.like,
        slug: song.slug,
        infoSinger: {
          fullName: infoSinger.fullName
        }
      });
    }

    // newSongs = songs;
  }

  switch(type){
    case "result":
      res.render("client/pages/search/result", {
        titlePage: `Kết quả: ${keyword}`,
        keyword,
        songs: newSongs
      });
      break;
    
    case "suggest":
      res.json({
        code: 200,
        message: "Thành công",
        songs: newSongs
      })
      break;

    default:
      break;
  }
};