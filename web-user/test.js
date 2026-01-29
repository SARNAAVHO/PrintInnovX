import dotenv from "dotenv";
dotenv.config(); // 👈 MUST be here, before reading env

import pkg from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const { PrismaClient } = pkg;
const { Pool } = pg;

/* 🔍 DEBUG — TEMPORARY */
// console.log("DB URL:", process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

export default prisma;
