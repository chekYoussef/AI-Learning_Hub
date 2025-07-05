import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";

const Login = () => {
  const [user, setUser] = useState<any>(null);

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

        if (!res.ok) {
          throw new Error("Failed to fetch user info");
        }

        const userData = await res.json();
        console.log("Google user:", userData);
        setUser(userData);

        // ✅ Send to your backend
        await fetch("/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
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
          <img
            src={user.picture}
            alt="profile"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Login;
