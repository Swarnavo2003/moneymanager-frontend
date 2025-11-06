import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { assets } from "../assets";
import Input from "../components/Input";
import { validateEmail } from "../utils/validation";
import axiosConfig from "../utils/axiosConfig";
import { API_ENDPOINTS } from "../utils/apiEndpoints";
import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContext(AppContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email.trim()) {
      setError("Please enter a valid email.");
      setIsLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter your password.");
      setIsLoading(false);
      return;
    }

    setError("");

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.LOGIN, {
        email,
        password,
      });

      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        setUser(user);
        toast.success("Login successful!");
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        console.error("Something went wrong", error);
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
      {/* Background Image with blur */}
      <img
        src={assets.login_bg}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover filter blur-sm"
      />

      <div className="relative z-10 w-full max-w-lg px-6">
        <div className="bg-white opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
          <h3 className="text-2xl font-semibold text-black text-center mb-2">
            Welcome Back
          </h3>
          <p className="text-sm text-slate-700 text-center mb-8">
            Please enter your details to login
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              placeHolder="johndoe@me.com"
              type="text"
            />
            <div className="col-span-2">
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                placeHolder="*********"
                type="password"
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
                {error}
              </p>
            )}
            <button
              className={`btn-primary w-full py-3 text-lg font-medium flex items-center justify-center gap-2 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5 ml-2" />
                  Please wait...
                </>
              ) : (
                "Login"
              )}
            </button>

            <p className="text-sm text-slate-800 text-center mt-2">
              Don't have an existing account?{" "}
              <Link
                to="/signup"
                className="font-medium text-primary underline hover:text-primary-dark transition-colors"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
