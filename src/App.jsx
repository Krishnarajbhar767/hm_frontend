import { useEffect } from "react";
import Footer from "./components/common/Footer";
import Header from "./components/common/Header";
import AppRoutes from "./routes/AppRoutes.jsx";
import { handleAxiosError } from "./utils/handleAxiosError";
import authApis from "./services/api/auth/auth.apis";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, setUser } from "./redux/slices/userSlice";
import productApis from "./services/api/public/products.apis";
import { setIsProductLoaded, setProducts } from "./redux/slices/productSlice";
import categoriesApi from "./services/api/public/category.api";
import {
    setCategories,
    setIsCategoriesLoaded,
} from "./redux/slices/categorySlice";
import { setCart } from "./redux/slices/cartSlice";
import axiosInstance from "./utils/apiConnector";
import { setWishList } from "./redux/slices/wishListSlice";

function App() {
    const dispatch = useDispatch();
    const isProductLoaded = useSelector((state) => state.product?.isLoaded);
    const isCategoryLoaded = useSelector((state) => state.category?.isLoaded);
    const token = useSelector((state) => state?.user?.token);
    const user = useSelector((state) => state?.user?.user);

    const fetchUser = async () => {
        if (token && !user) {
            try {
                const userData = await authApis.getUser(token);
                dispatch(setUser(userData));
            } catch (error) {
                dispatch(clearUser());
                handleAxiosError(error);
            }
        }
    };
    const fetchProducts = async () => {
        try {
            const products = await productApis.getAllProduct();
            dispatch(setProducts(products));
            dispatch(setIsProductLoaded(true));
        } catch (error) {
            handleAxiosError(error);
        }
    };
    const fetchCategories = async () => {
        try {
            const categories = await categoriesApi.getAllCategories();
            dispatch(setCategories(categories));
            dispatch(setIsCategoriesLoaded(true));
        } catch (error) {
            handleAxiosError(error);
        }
    };

    useEffect(() => {
        if (!isProductLoaded) {
            fetchProducts();
        }
    }, [isProductLoaded]);
    useEffect(() => {
        if (!isCategoryLoaded) {
            fetchCategories();
        }
    }, [isCategoryLoaded]);
    useEffect(() => {
        fetchUser();
    });

    useEffect(() => {
        if (user) {
            (async () => {
                const res = await axiosInstance.get(`/user/cart/${user._id}`);
                dispatch(setCart(res.data));
            })();

            (async () => {
                const res = await axiosInstance.get(
                    `/user/wishlist/${user?._id}`
                );
                console.log(res.data);
                dispatch(setWishList(res.data));
            })();
        } else {
            dispatch(setCart(JSON.parse(localStorage.getItem("cart")) || []));
        }
    }, [localStorage, user]);

    return <AppRoutes />;
}

export default App;
