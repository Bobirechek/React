import { PrismaClient } from "../generated/prisma";
import { PrismaPg } from '@prisma/adapter-pg'

// В Next.js dev режиме при hot reload может создаваться несколько экземпляров PrismaClient
// Чтобы избежать ошибок с "too many connections", используем глобальную переменную
declare global {
  var prisma: PrismaClient | undefined;
}

// Если Prisma уже есть в глобальном объекте, используем его, иначе создаём новый
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL})
export const prisma = new PrismaClient({ adapter })
// export const prisma =
//   global.prisma ||
//   new PrismaClient({
//     adapter: {
//       url: process.env.DATABASE_URL, // <- сюда прописывай свою PostgreSQL БД
//     },
//     log: ["query", "info", "warn", "error"], // опционально, для логов запросов
//   });

// В dev режиме сохраняем PrismaClient в глобальной переменной
if (process.env.NODE_ENV !== "production") global.prisma = prisma;
