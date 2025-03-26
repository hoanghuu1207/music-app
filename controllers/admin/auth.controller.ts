import { Request, Response } from "express";
import { systemConfig } from "../../config/system";
import * as adminServices from "../../services/auth.service";

// [GET] /admin/auth/login
export const login = async (req: Request, res: Response) => {
  res.render("admin/pages/auth/login", {
    titlePage: "Đăng nhập trang quản trị"
  });
}

// [POST] /admin/auth/login
export const loginPost = async (req: Request, res: Response) => {
  try{
    const foundUser = await adminServices.login(req.body, res);

    if(foundUser) {
      res.redirect(`/${systemConfig.prefixAdmin}/dashboard`);
    }
  } catch (error) {
    // Handle error
    console.log(error);
  }
}

// [GET] /admin/auth/register
export const register = async (req: Request, res: Response) => {
  try {
    await adminServices.register(req.body);
    
    res.redirect("/admin/auth/login");
  } catch (error) {
    // Handle error
    console.log(error);
  }
}

// [GET] /admin/auth/logout
export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token");

  res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);
}