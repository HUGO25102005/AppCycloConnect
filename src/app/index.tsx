import React from "react";
import { Redirect } from "expo-router";

/**
 * Pantalla inicial que redirige al login
 */
export default function Index() {
  return <Redirect href="/auth/login" />;
}
