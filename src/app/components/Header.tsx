import React from "react";
import Link from "next/link";
import { getUser, getSignInUrl, signOut } from "@workos-inc/authkit-nextjs";

const Header = async () => {
  const { user } = await getUser();
  const signInUrl = await getSignInUrl();

  return (
    <header className="mt-4">
      <div className="flex items-center justify-between font-black text-xl">
        <Link href={"/"}>
          {" "}
          <span className="text-purple-600">Let </span>{" "}
          <span className="text-yellow-400">Colabodev</span>
        </Link>
        <nav className="flex gap-2 ">
          {!user && (
            <Link className="bg-gray-200 py-2 px-4 rounded-md" href={signInUrl}>
              Login
            </Link>
          )}
          {user && (
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button
                className="bg-gray-200 py-2 px-4 rounded-md"
                type="submit"
              >
                Logout
              </button>
            </form>
          )}

          <Link
            className="bg-blue-600 text-white py-2 px-4 rounded-md"
            href={"/new-post"}
          >
            Post
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
