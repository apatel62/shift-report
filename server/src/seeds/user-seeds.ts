import { User } from "../models/user.js";

export const seedUsers = async () => {
  await User.bulkCreate(
    [
      {
        username: "keaton",
        password: "password",
        email: "keatongreer1@gmail.com",
        role: "admin",
      },
      {
        username: "arjun",
        password: "dakkad",
        email: "arjunpatel9217@gmail.com",
        role: "admin",
      },
      {
        username: "destinee",
        password: "password",
        email: "desmil.co@gmail.com",
        role: "admin",
      },
      {
        username: "testuser",
        password: "password",
        email: "",
        role: "employee",
      },
    ],
    { individualHooks: true }
  );
};
