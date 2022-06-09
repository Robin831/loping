import { useEffect } from "react";
import { BrowserRouter as Router, Navigate, Outlet, Route, Routes } from "react-router-dom"
import { useAppStore } from "../context/AppContext"
import { auth } from "../firebaseSetup";
import useGetInitialData from "../hooks/useGetInitialData";
import Laktat from "../Laktat"
import LoginPage from "../pages/LoginPage";

export default () => {
    const { user, setUser } = useAppStore();
    const { initData } = useGetInitialData();

    useEffect(() => {
        checkAuthState();
    }, []);

    useEffect(() => {
        if (!user) return;
        initData();
    }, [user])

    const checkAuthState = () => {
        auth.onAuthStateChanged(user => setUser(user));
    }

    const LoginRoute = () => {
        if (user) {
            return (
                <Route path="/login" element={<Navigate to="/overview" />}></Route>
            );
        }
        return <Route path="/login" element={<LoginPage />} />;
    };

    const PrivateOutlet = () => {
        return user ? (
            <Outlet />
        ) : (
            <Navigate to="/login" />
        );
    };

    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />}></Route>
                    {LoginRoute()}
                    <Route path="/*" element={<PrivateOutlet />}>
                        <Route path="overview" element={<Laktat />} />
                    </Route>
                </Routes>
            </Router>
        </>
    )
}