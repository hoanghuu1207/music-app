import { Request, Response } from "express";

// [GER] /admin/dashboard
export const index = async (req: Request, res: Response) => {
  res.render("admin/pages/dashboard/index", {
    titlePage: "Tổng quan",
  });
}