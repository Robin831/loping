import { useEffect } from "react";
import { BrowserRouter as Router, Navigate, Outlet, Route, Routes } from "react-router-dom"
import PageHeaderComponent from "../Components/page-header/PageHeader";
import { useAppStore } from "../context/AppContext"
import { auth } from "../firebaseSetup";
import useGetInitialData from "../hooks/useGetInitialData";
import { useResponsiveHandler } from "../hooks/useResponsiveHandler";
import Laktat from "../Laktat"
import LaktatMobile from "../Components/laktat-mobile/LaktatMobile";
import LoginPage from "../pages/LoginPage";
import { Wrapper } from "./App.style";
import MeasurementPage from "../pages/measurement-page/MeasurementPage";

export default () => {
    const { user, setUser } = useAppStore();
    const { initData } = useGetInitialData();
    const { isMobile } = useResponsiveHandler();

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
            <Wrapper>
                <PageHeaderComponent></PageHeaderComponent>
                <Router>
                    <Routes>
                        <Route path="/" element={<Navigate to="/login" />}></Route>
                        {LoginRoute()}
                        <Route path="/*" element={<PrivateOutlet />}>
                            <Route path="overview" element={isMobile ? <LaktatMobile /> : <Laktat />} />
                            <Route path="measurement" element={<MeasurementPage />} />
                        </Route>
                    </Routes>
                </Router>
            </Wrapper>
        </>
    )
}