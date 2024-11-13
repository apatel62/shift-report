import { User } from "../models/user.js";

export const seedUsers = async () => {
  await User.bulkCreate(
    [
      { username: "keaton", password: "password" },
      { username: "arjun", password: "dakkad" },
      { username: "destinee", password: "password" },
    ],
    { individualHooks: true }
  );
};
