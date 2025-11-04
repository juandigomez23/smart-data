import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";
import { redirect } from "next/navigation";

export default async function SessionPage() {
  const session = await getServerSession(authOptions);

  if (!session) return redirect('/login');

  const role = session.user?.role as string | undefined;
  if (role === 'admin' || role === 'owner') return redirect('/admin');
  return redirect('/asesor');
}
