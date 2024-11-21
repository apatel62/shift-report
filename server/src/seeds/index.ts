import { seedUsers } from "./user-seeds.js";
import { seedReports } from "./report-seeds.js";
import { seedMachines } from "./machine-seeds.js";
import { sequelize } from "../models/index.js";

const seedAll = async (): Promise<void> => {
  try {
    await sequelize.sync({ force: true });
    console.log("\n----- DATABASE SYNCED -----\n");

    await seedUsers();
    console.log("\n----- USERS SEEDED -----\n");

    await seedReports();
    console.log("\n----- REPORTS SEEDED -----\n");

    await seedMachines();
    console.log("\n----- MACHINES SEEDED -----\n");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedAll();
