import { Request, Response } from "express";
import { systemConfig } from "../../config/system";

import Singer from "../../models/singer.model";

// [GET] /admin/singers
export const index = async (req: Request, res: Response) => {
  const singers = await Singer.find({
    deleted: false
  });

  res.render("admin/pages/singers/index", {
    titlePage: "Quản lý ca sĩ",
    singers
  });
}

// [GET] /admin/singers/create
export const create = async (req: Request, res: Response) => {
  res.render("admin/pages/singers/create", {
    titlePage: "Thêm mới ca sĩ"
  });
}

// [POST] /admin/singers/create
export const createPost = async (req: Request, res: Response) => {
  let avatar = "";

  if(req.body.avatar){
    avatar = req.body.avatar[0];
  }

  const singer = {
    fullName: req.body.fullName,
    avatar: avatar,
    status: req.body.status
  }

  const newSinger = new Singer(singer);
  await newSinger.save();

  res.redirect(`/${systemConfig.prefixAdmin}/singers`);
}

// [GET] /admin/singers/edit/:id
export const edit = async (req: Request, res: Response) => {
  const singer = await Singer.findById(req.params.id);

  res.render("admin/pages/singers/edit", {
    titlePage: "Chỉnh sửa thông tin ca sĩ",
    singer
  });
}

// [PATCH] /admin/singers/edit/:id
export const editPatch = async (req: Request, res: Response) => {
  const id = req.params.id;
  
  const singer = {
    fullName: req.body.fullName,
    status: req.body.status
  }

  if(req.body.avatar){
    singer["avatar"] = req.body.avatar[0];
  }

  await Singer.updateOne({
    _id: id
  }, singer);

  res.redirect("back");
}