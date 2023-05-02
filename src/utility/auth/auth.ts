import { redirect } from "react-router-dom";

export const saveToken = (token: string) =>
  localStorage.setItem("token", token);

export const getToken = () => localStorage.getItem("token");

export const isAuth = () => !!localStorage.getItem("token");

export const unAuthUser = () => {
  localStorage.clear();
  return redirect("/login");
};

export const isUnauthorized = (status: number) => status === 401;
