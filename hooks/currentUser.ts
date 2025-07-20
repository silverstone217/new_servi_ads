"use client";
import { useSession } from "next-auth/react";

const useCurrentUser = () => {
  const { data: session } = useSession();

  const user = session ? session.user : null;

  return user;
};

export default useCurrentUser;
