import { SignInForm } from "@/components/auth/authComponent";
import GreetingComponent from "@/components/auth/GreetingComponent";
import React from "react";

function page() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:block">
        <GreetingComponent />
      </div>
      {/* form */}
      <SignInForm />
    </div>
  );
}

export default page;
