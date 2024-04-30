// import React, { useState, useEffect } from "react";
// import { useCookies } from "react-cookie";

// const SaveUsernameToCookie = () => {
//   const [cookies, setCookie, removeCookie] = useCookies(["user"]);
//   const [user, setUser] = useState(null);
//   const [countdown, setCountdown] = useState(5 * 1000);

//   useEffect(() => {
//     const userCookie = cookies.user;
//     if (userCookie) {
//       setUser(userCookie);
//     }
//   }, [cookies]);

//   useEffect(() => {
//     if (user) {
//       setCookie("user", user, { path: "/" });

//       const timer = setTimeout(() => {
//         removeCookie("user");
//       }, countdown);

//       return () => clearTimeout(timer);
//     }
//   }, [countdown, user, setCookie, removeCookie]);

//   useEffect(() => {
//     const userCookie = cookies.user;
//     if (!userCookie) {
//       console.log("Usuário deslogado");
//     } else {
//       console.log("Usuário logado");
//     }
//   }, [cookies]);

//   return null;
// };

// export default SaveUsernameToCookie;
