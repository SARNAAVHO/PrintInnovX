import dotenv from "dotenv";
dotenv.config(); // must be first

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;
