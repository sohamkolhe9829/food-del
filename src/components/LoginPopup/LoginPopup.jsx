// import React, { useContext, useState } from "react";
// import "./LoginPopup.css";
// import { assets } from "../../assets/assets";
// import { StoreContext } from "../../Context/StoreContext"; // ✅ import context

// const LoginPopup = ({ setShowLogin }) => {
//   const [currState, setCurrState] = useState("Sign Up");
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");

//   const { setUserToken, setUserId } = useContext(StoreContext); // ✅ use context

//   const handleSubmit = async () => {
//     const endpoint =
//       currState === "Sign Up"
//         ? "http://localhost:3000/api/user/register"
//         : "http://localhost:3000/api/user/login";

//     const payload =
//       currState === "Sign Up" ? { name, email, password } : { email, password };

//     try {
//       const response = await fetch(endpoint, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json();

//       if (data.success) {
//         setMessage(
//           "✅ " +
//             (currState === "Sign Up" ? "Registered" : "Logged in") +
//             " successfully!"
//         );

//         // ✅ Save to localStorage
//         localStorage.setItem("userId", data.userId);
//         localStorage.setItem("token", data.token);

//         // ✅ Update context to trigger Navbar re-render
//         setUserId(data.userId);
//         setUserToken(data.token);

//         setShowLogin(false);
//       } else {
//         setMessage("❌ " + data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       setMessage("❌ Error connecting to server");
//     }
//   };

//   return (
//     <div className="login-popup">
//       <div className="login-popup-container">
//         <div className="login-popup-title">
//           <h2>{currState}</h2>
//           <img
//             onClick={() => setShowLogin(false)}
//             src={assets.cross_icon}
//             alt=""
//           />
//         </div>

//         <div className="login-popup-inputs">
//           {currState === "Sign Up" && (
//             <input
//               type="text"
//               placeholder="Your name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//           )}
//           <input
//             type="email"
//             placeholder="Your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>

//         <button onClick={handleSubmit}>
//           {currState === "Login" ? "Login" : "Create account"}
//         </button>

//         {message && (
//           <p style={{ color: message.startsWith("✅") ? "green" : "red" }}>
//             {message}
//           </p>
//         )}

//         <div className="login-popup-condition">
//           <input type="checkbox" />
//           <p>By continuing, I agree to the terms of use & privacy policy.</p>
//         </div>

//         {currState === "Login" ? (
//           <p>
//             Create a new account?{" "}
//             <span onClick={() => setCurrState("Sign Up")}>Click here</span>
//           </p>
//         ) : (
//           <p>
//             Already have an account?{" "}
//             <span onClick={() => setCurrState("Login")}>Login here</span>
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LoginPopup;

import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Optional: for disabling button

  const { updateUserSession } = useContext(StoreContext); // ✅ Correctly using the context method

  const handleSubmit = async () => {
    setLoading(true);

    const endpoint =
      currState === "Sign Up"
        ? "http://localhost:3000/api/user/register"
        : "http://localhost:3000/api/user/login";

    const payload =
      currState === "Sign Up"
        ? { name: name.trim(), email: email.trim(), password }
        : { email: email.trim(), password };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        setMessage(
          "✅ " +
            (currState === "Sign Up" ? "Registered" : "Logged in") +
            " successfully!"
        );

        // ✅ Save to localStorage
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("token", data.token);

        // ✅ Update context properly
        updateUserSession(data.token, data.userId);

        setShowLogin(false);
      } else {
        setMessage("❌ " + data.message);
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-popup">
      <div className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="close"
          />
        </div>

        <div className="login-popup-inputs">
          {currState === "Sign Up" && (
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button onClick={handleSubmit} disabled={loading}>
          {loading
            ? "Please wait..."
            : currState === "Login"
            ? "Login"
            : "Create account"}
        </button>

        {message && (
          <p style={{ color: message.startsWith("✅") ? "green" : "red" }}>
            {message}
          </p>
        )}

        <div className="login-popup-condition">
          <input type="checkbox" />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>

        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginPopup;
