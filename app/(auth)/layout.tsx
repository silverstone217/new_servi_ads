import { getUser } from "@/actions/auth-actions";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
};

async function AuthLayout({ children }: Props) {
  const user = await getUser();
  if (user) {
    redirect("/");
  }
  return <div>{children}</div>;
}

export default AuthLayout;
