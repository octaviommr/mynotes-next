"use server"

import { signOut } from "./auth"

/* 
  Set up the server action called by log out button.

  Behind the scenes, this creates a "POST" API endpoint.
*/
export async function logOut() {
  // sign out using Auth.js, redirecting the user back to the log in page
  await signOut({ redirectTo: "/login" })
}
