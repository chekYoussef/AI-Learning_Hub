// src/components/Login.tsx
import { useGoogleLogin } from "@react-oauth/google";
// import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { user, setUser } = useAuth();
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );

        const userData = await res.json();
        console.log("Google user:", userData);

        setUser(userData); // Set user in parent App
        localStorage.setItem("localUser", JSON.stringify(userData));

        await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },
    onError: () => console.log("Login Failed"),
  });

  return (
    <div>
      {!user ? (
        <a
          href="#login"
          onClick={(e) => {
            e.preventDefault();
            login();
          }}
        >
          Login
        </a>
      ) : (
        <div className="profile-bubble">
          <button
            className="btn p-0 border-0 bg-transparent"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src={user.picture}
              alt="profile"
              style={{ width: "40px", height: "40px", borderRadius: "50%" }}
            />
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <button
                className="dropdown-item"
                onClick={() => {
                  localStorage.removeItem("localUser");
                  setUser(null);
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Login;
