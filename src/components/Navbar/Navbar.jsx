// import React, { useContext, useEffect, useState } from "react";
// import "./Navbar.css";
// import { assets } from "../../assets/assets";
// import { Link } from "react-router-dom";
// import { StoreContext } from "../../Context/StoreContext";

// const Navbar = ({ setShowLogin }) => {
//   const [menu, setMenu] = useState("home");
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");

//   const { getTotalCartAmount, setUserToken, setUserId, userToken } =
//     useContext(StoreContext);

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     alert(`Searching for: ${searchTerm}`);
//   };

//   const handleLogout = () => {
//     // Remove from localStorage
//     localStorage.removeItem("token");
//     localStorage.removeItem("userId");

//     // Update the context to trigger re-render
//     setUserToken(null);
//     setUserId("");

//     alert("Logged out successfully!");
//   };

//   useEffect(() => {
//     const handleStorageChange = () => {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setUserToken(null);
//         setUserId("");
//       }
//     };

//     window.addEventListener("storage", handleStorageChange);

//     // Cleanup event listener on component unmount
//     return () => window.removeEventListener("storage", handleStorageChange);
//   }, [setUserToken, setUserId]);

//   return (
//     <div className="navbar">
//       <Link to="/">
//         <img className="logo" src={assets.logo} alt="Logo" />
//       </Link>

//       <ul className="navbar-menu">
//         <Link
//           to="/"
//           onClick={() => setMenu("home")}
//           className={menu === "home" ? "active" : ""}
//         >
//           home
//         </Link>
//         <a
//           href="#explore-menu"
//           onClick={() => setMenu("menu")}
//           className={menu === "menu" ? "active" : ""}
//         >
//           menu
//         </a>
//         <a
//           href="#footer"
//           onClick={() => setMenu("contact")}
//           className={menu === "contact" ? "active" : ""}
//         >
//           contact us
//         </a>
//         <Link
//           to="/feedback"
//           onClick={() => setMenu("feedback")}
//           className={menu === "feedback" ? "active" : ""}
//         >
//           feedback
//         </Link>
//       </ul>

//       <div className="navbar-right">
//         <img
//           src={assets.search_icon}
//           alt="search"
//           className="search-icon"
//           onClick={() => setSearchOpen(!searchOpen)}
//         />

//         {searchOpen && (
//           <form onSubmit={handleSearchSubmit}>
//             <input
//               type="text"
//               className="search-input"
//               placeholder="Search food..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </form>
//         )}

//         <Link to="/cart" className="navbar-search-icon">
//           <img src={assets.basket_icon} alt="cart" />
//           <div className={getTotalCartAmount() > 0 ? "dot" : ""}></div>
//         </Link>

//         {userToken ? (
//           <button onClick={handleLogout}>logout</button>
//         ) : (
//           <button onClick={() => setShowLogin(true)}>sign in</button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { getTotalCartAmount, updateUserSession, userToken } =
    useContext(StoreContext);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    alert(`Searching for: ${searchTerm}`);
  };

  const handleLogout = () => {
    updateUserSession("", ""); // ✅ clear user session
    alert("Logged out successfully!");
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("userId");
      if (!token || !id) {
        updateUserSession("", "");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [updateUserSession]);

  return (
    <div className="navbar">
      <Link to="/">
        <img className="logo" src={assets.logo} alt="Logo" />
      </Link>

      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact")}
          className={menu === "contact" ? "active" : ""}
        >
          contact us
        </a>
        <Link
          to="/feedback"
          onClick={() => setMenu("feedback")}
          className={menu === "feedback" ? "active" : ""}
        >
          feedback
        </Link>
      </ul>

      <div className="navbar-right">
        <img
          src={assets.search_icon}
          alt="search"
          className="search-icon"
          onClick={() => setSearchOpen(!searchOpen)}
        />

        {searchOpen && (
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              className="search-input"
              placeholder="Search food..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
        )}

        <Link to="/cart" className="navbar-search-icon">
          <img src={assets.basket_icon} alt="cart" />
          <div className={getTotalCartAmount() > 0 ? "dot" : ""}></div>
        </Link>

        {userToken ? (
          <button onClick={handleLogout}>logout</button>
        ) : (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
