import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import dotenv from 'dotenv';
dotenv.config();

export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token
  const {username, password} = req.body;
  const user = await User.findOne({
    where: { username },
  });

  if(!user) {
    return res.status(404).json({ message: 'User not found!' });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if(!validPassword) {
    return res.status(400).json({ message: 'Incorrect Password!'});
  }
  const secretKey = process.env.JWT_SECRET_KEY || '';
  const token = jwt.sign({id: user.id, username: user.username}, secretKey, {expiresIn: '1h'});
  return res.json({ token });
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;