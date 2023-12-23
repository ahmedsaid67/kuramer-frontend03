// components/Layout.js

import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { deleteTokenFromCookie } from "../context/features/lib/common";
import { getCookie } from "cookies-next";
import { setUser, userLoggedOut } from "../context/features/user/userSlice";
import { loginSuccess, logout } from "../context/features/auth/loginSlice";
import { showMessage } from "../context/features/message/messageSlice";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { useRouter } from 'next/router';
import styles from "../styles/Layout.module.css";

const Layout = ({ children }) => {
  const router = useRouter();
  const isPanelPage = router.pathname.includes('/panel');
  const dispatch = useDispatch();

  useEffect(() => {
    axios.defaults.headers.common["Accept-Language"] = "tr-tr";
    axios.defaults.baseURL = "http://127.0.0.1:8000/api";
    axios.interceptors.response.use(
      (response) => response,
      async (err) => {
        const originalConfig = err.config;
        if (err.response.status === 401) {
          axios.defaults.headers.common["Authorization"] = null;
          if (getCookie("token")) {
            console.log("token süresi bitti");
            dispatch(
              showMessage({
                message: "token",
                variant: "info",
              })
            );
          }
          deleteTokenFromCookie();
          dispatch(userLoggedOut());
          dispatch(logout());
          return Promise.reject(err);
        }
        return Promise.reject(err);
      }
    );

    async function getUser() {
      try {
        const res = await axios.get("/appname/user-info/");
        console.log("res:", res);
        dispatch(loginSuccess());
        dispatch(setUser(res.data));
      } catch (err) {
        console.log(err);
      }
    }

    const token = getCookie("token");
    console.log("layout-getcookie-token:", token);
    if (token) {
      axios.defaults.headers.common["Authorization"] = `token ${token}`;
      getUser();
    }
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        {isPanelPage ? (
          <div className={styles.panelContainer}>
            <Sidebar />
            <div className={styles.panelContent}>{children}</div>
          </div>
        ) : (
          <div className={styles.pageContainer}>
            <Navbar />
            <div className={styles.pageContent}>{children}</div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
