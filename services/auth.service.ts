import { Response } from 'express';
import mongoose, { FilterQuery } from 'mongoose';
import AdminModel, { I_AdminDocument } from '../models/admin.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { systemConfig } from "../config/system";

export async function register(user: FilterQuery<I_AdminDocument>): Promise<void> {
  try {
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);

    await AdminModel.create(user);
  } catch (error) {
    throw error;
  }
}

export async function login(user: FilterQuery<I_AdminDocument>, res: Response) {
  try {
    const foundUser = await AdminModel.findOne({ email: user.email});

    if (!foundUser) {
      res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);
      
      throw new Error("Email not correct");
    }

    const isMatch = bcrypt.compareSync(user.password, foundUser.password);

    if (isMatch) {
      const token = jwt.sign({ _id: foundUser._id?.toString(), email: foundUser.email }, process.env.SECRET_KEY, {
        expiresIn: '2 days',
      });

      res.cookie("token", token, { 
        maxAge: 2 * 24 * 60 * 60 * 1000, httpOnly: true 
      });
      
      return { user: { _id: foundUser._id, email: foundUser.email }, token: token };
    } else {
      res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);
      
      throw new Error('Password is not correct');
    }
  } catch (error) {
    throw error;
  }
}