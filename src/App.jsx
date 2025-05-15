import { useEffect } from "react";
import Footer from "./components/common/Footer";
import Header from "./components/common/Header";
import AppRoutes from "./routes/appRoutes";
import { handleAxiosError } from "./utils/handleAxiosError";
import authApis from "./services/api/auth/auth.apis";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/slices/userSlice";

function App() {
    const dispatch = useDispatch();
    const token = useSelector((state) => state?.user?.token);
    const user = useSelector((state) => state?.user?.user);
    const fetchUser = async () => {
        if (token && !user) {
            try {
                const userData = await authApis.getUser(token);
                dispatch(setUser(userData));
            } catch (error) {
                handleAxiosError(error);
            }
        }
    };

    useEffect(() => {
        fetchUser();
    });
    return <AppRoutes />;
}

export default App;
