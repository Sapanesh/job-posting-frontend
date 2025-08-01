import * as React from "react";
import { Navigate } from "react-router";

export type ProtectedRouteProps = {
  isAuthenticated: boolean;
  authenticationPath: string;
  outlet: React.JSX.Element;
};

export default function ProtectedRoute({
  isAuthenticated,
  authenticationPath,
  outlet,
}: ProtectedRouteProps) {
  if (isAuthenticated) {
    return outlet;
  } else {
    return <Navigate to={{ pathname: authenticationPath }} />;
  }
}
 