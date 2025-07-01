import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const handleLoginSuccess = (credentialResponse: any) => {
    const decoded: any = jwtDecode(credentialResponse.credential);
    console.log("Google user:", decoded);
    // Optional: send to backend if needed
  };

  return (
    <div>
      <h2>Login</h2>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={() => console.log("Login failed")}
      />
    </div>
  );
};

export default Login;
