import { Navigate, Route, Routes, RoutesProps } from "react-router-dom";
import Login from "../screens/Login/Login";
import Dashboard from "../screens/Dashboard/Dashboard";
import { useSelector } from "react-redux";
import { RootState } from "../config/Store";
import { UserState } from "../reducer/AuthReducer";
import ProtectedRoute from "./ProtectedRoute";
import Main from "../screens/Main";

const Navigation = () => {
    const login: any = useSelector<RootState, UserState>((state) => state.userLogin);

    interface ProtectedRouteProps extends RoutesProps {
        isAuthenticated: boolean;
        authenticationPath: string;
    }

    const defaultProtectedRouteProps: Omit<ProtectedRouteProps, "outlet"> = {
        isAuthenticated: localStorage.getItem("token") != null,
        authenticationPath: "/login",
    };

    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate replace to="/login" />} />
                <Route
                    path="/login"
                    element={
                        defaultProtectedRouteProps.isAuthenticated || login.loginSuccess ? (
                            <Navigate replace to="/dashboard" />
                        ) : (
                            <Login />
                        )
                    }
                />
                <Route
                    path="/"
                    element={
                        <ProtectedRoute
                            {...defaultProtectedRouteProps}
                            outlet={<Main />}
                        />
                    }
                >
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>
                <Route path="*" element={<Navigate replace to="/login" />} />
            </Routes>
        </>
    )
}

export default Navigation;