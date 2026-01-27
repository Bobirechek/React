import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "../../lib/prisma";

/**
 * GET /api/user
 * Получить данные ТЕКУЩЕГО пользователя
 */
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const user = await prisma.users.findUnique({
    where: { email: session.user?.email },
    select: {
        id: true,
        email: true,
        username: true,
        name: true,
        surname: true,
    },
  });

  return NextResponse.json(user);
}

/**
 * PUT /api/user
 * Обновить данные ТЕКУЩЕГО пользователя
 */
export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const data = await req.json();

  const updatedUser = await prisma.users.update({
    where: { email: session.user?.email },
    data,
    select: {
        id: true,
        email: true,
        username: true,
        name: true,
        surname: true,
    },
  });

  return NextResponse.json(updatedUser);
}
