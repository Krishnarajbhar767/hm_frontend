import { useEffect, useRef } from "react";
import AppRoutes from "./routes/AppRoutes.jsx";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, setUser } from "./redux/slices/userSlice";
import { setIsProductLoaded, setProducts } from "./redux/slices/productSlice";
import {
    setCategories,
    setIsCategoriesLoaded,
} from "./redux/slices/categorySlice";
import { setCart } from "./redux/slices/cartSlice";
import { setWishList } from "./redux/slices/wishListSlice";
import authApis from "./services/api/auth/auth.apis";
import productApis from "./services/api/public/products.apis";
import categoriesApi from "./services/api/public/category.api";
import axiosInstance from "./utils/apiConnector";
import { handleAxiosError } from "./utils/handleAxiosError";
import { setFabrics } from "./redux/slices/fabricSlice.js";

function App() {
    const dispatch = useDispatch();

    const isProductLoaded = useSelector((state) => state.product?.isLoaded);
    const isCategoryLoaded = useSelector((state) => state.category?.isLoaded);
    const token = useSelector((state) => state?.user?.token);
    const user = useSelector((state) => state?.user?.user);

    const hasFetchedUser = useRef(false);

    const fetchUser = async () => {
        try {
            const userData = await authApis.getUser(token);
            dispatch(setUser(userData));
        } catch (error) {
            dispatch(clearUser());
            handleAxiosError(error);
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

    // Fetch products only once
    useEffect(() => {
        if (!isProductLoaded) {
            fetchProducts();
        }
    }, [isProductLoaded]);

    // Fetch categories only once
    useEffect(() => {
        if (!isCategoryLoaded) {
            fetchCategories();
        }
    }, [isCategoryLoaded]);

    // Fetch user only once if token is available
    useEffect(() => {
        if (token && !user && !hasFetchedUser.current) {
            hasFetchedUser.current = true;
            fetchUser();
        }
    }, [token, user]);

    // Fetch cart and wishlist only when user is available
    useEffect(() => {
        const loadUserData = async () => {
            try {
                if (user) {
                    const [cartRes, wishListRes] = await Promise.all([
                        axiosInstance.get(`/user/cart/${user._id}`),
                        axiosInstance.get(`/user/wishlist/${user._id}`),
                    ]);
                    dispatch(setCart(cartRes.data));
                    dispatch(setWishList(wishListRes.data));
                } else {
                    const localCart =
                        JSON.parse(localStorage.getItem("cart")) || [];
                    dispatch(setCart(localCart));
                }
            } catch (error) {
                handleAxiosError(error);
            }
        };
        loadUserData();
    }, [user]);

    const fetchFabrics = async () => {
        try {
            const res = await axiosInstance.get("/admin/fabrics/");
            dispatch(setFabrics(res.data));
        } catch (err) {
            console.error("Error fetching fabrics", err);
            handleAxiosError(err);
        }
    };

    useEffect(() => {
        fetchFabrics();
    }, []);
    return <AppRoutes />;
}

export default App;
