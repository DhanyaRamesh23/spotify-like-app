import React from "react";
import AddSongForm from "../components/AddSongForm";

import { hasToken } from "../services/Auth";
export default function AddSongPage() {
  if (!hasToken) {
    return <>Login to access</>;
  }
  return (
    <>
      <h2>Add a new song</h2>
      <AddSongForm />
    </>
  );
}
