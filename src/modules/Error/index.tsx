import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorScreen = () => {
  const errorInfo = useRouteError();
  console.log(errorInfo);
  return <>This is ErrorScreen Screen</>;
};

export default ErrorScreen;
