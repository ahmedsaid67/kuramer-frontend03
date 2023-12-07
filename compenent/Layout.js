import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { deleteTokenFromCookie } from "../context/features/lib/common";
import { getCookie } from "cookies-next";
import { setUser, userLoggedOut } from "../context/features/user/userSlice";
import { loginSuccess, logout } from "../context/features/auth/loginSlice";
import { showMessage } from "../context/features/message/messageSlice";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useRouter } from 'next/router';

const Layout = ({ children }) =>{

  const router = useRouter();
  // Yolu kontrol et
  const isPanelPage = router.pathname.includes('/panel');

  const dispatch = useDispatch();


    useEffect(() => {
        axios.defaults.headers.common["Accept-Language"] = "tr-tr"; // navigator.language || navigator.userLanguage || "tr-tr";
        axios.defaults.baseURL ="http://127.0.0.1:8000/api"
        axios.interceptors.response.use(
          (response) => {
            return response;
          },
    
          async (err) => {
            const originalConfig = err.config;
            if (err.response.status === 401) {  // yanıt 401 hatası dönecek ise;
              axios.defaults.headers.common["Authorization"] = null;
              if (getCookie("token"))
                console.log("token süresi bitti")
                dispatch(
                  showMessage({
                    message: "token",
                    variant: "info",
                  })
                );
              deleteTokenFromCookie();
              dispatch(userLoggedOut());
              dispatch(logout());
              return Promise.reject(err);
            }
            return Promise.reject(err);    // cokies de bir token var ama süresi bittiğinden hata döndürüyor o zaman hata yanıtını al
                                           // cokies deki tokeni sil axiosdaki bu tokuna ait head dakş formatı sil ve authenticate olarak
                                           // adlandırılmış state yi false yap.
          }
        );
        async function getUser() {
          try {
            const res = await axios.get("/appname/user-info/");


            console.log("res:",res)
            dispatch(loginSuccess());
            dispatch(setUser(res.data));
            //setLoading(false);
          } catch (err) {
            //setLoading(false);
            console.log(err);
          }
        }
    
        const token = getCookie("token");
        console.log("layout-getcookie-token:",token)
        if (token) {
          axios.defaults.headers.common["Authorization"] = `token ${token}`;
          getUser();
        } else {
          //setLoading(false);
        }
        return () => {};   
                                         
      }, [dispatch]);

    return(
      <>
        {isPanelPage ? (
          // Eğer panel sayfasındaysa, Sidebar ve children içeriğini yan yana göster
          <div style={{ display: 'flex' }}>
            <Sidebar/>
            <div>{children}</div>
          </div>
        ) : (
          // Değilse, sadece Navbar ve children içeriğini göster
          <>
            <Navbar/>
            <div>{children}</div>
          </>
        )}
      </>
    )
}


export default Layout;
