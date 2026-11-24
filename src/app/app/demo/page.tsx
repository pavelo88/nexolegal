import { redirect } from "next/navigation";

export default async function DemoAppPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const params = await searchParams;
  const role = (params.role || "cliente").toLowerCase();

  if (role === "admin") {
    redirect("/admin");
  } else if (role === "abogado") {
    redirect("/abogado");
  } else if (role === "b2b") {
    redirect("/empresas");
  } else {
    redirect("/user");
  }
}
