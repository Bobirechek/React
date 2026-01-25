import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Profile() {
  const session = await getServerSession(authOptions);

  if (!session) {
    // если пользователь не авторизован, редирект на логин
    redirect("/login");
  }

  return (
    <div>
      <h1>Profile page</h1>
      <p>Welcome, {session.user?.email}</p>
    </div>
  );
}
