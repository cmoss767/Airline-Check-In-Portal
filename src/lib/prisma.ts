import { PrismaClient } from '@prisma/client';

// In a real application, you would use a more robust solution for managing
// the Prisma Client instance, but for this project, a global instance is sufficient.
const prisma = new PrismaClient();

export default prisma; 