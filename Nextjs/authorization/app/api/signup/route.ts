import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { prisma } from "../../lib/prisma";

// const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password, username, name, surname } = await req.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Email and password required" }), { status: 400 });
    }

    const existingUser = await prisma.users.findUnique({ where: { email } });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists" }), { status: 400 });
    }

    const hashedPassword = await hash(password, 12);

    const user = await prisma.users.create({
      data: { email, password: hashedPassword, username, name, surname },
    });

    return new Response(JSON.stringify({ message: "User created", user: { email: user.email } }), {
      status: 201,
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Something went wrong" }), { status: 500 });
  }
}
