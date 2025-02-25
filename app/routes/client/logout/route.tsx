import { redirect } from "react-router";
import { signOut } from "firebase/auth";
import { auth } from "~/lib/firebase";

export async function action() {
  signOut(auth);
  return redirect('/client/login/');
}