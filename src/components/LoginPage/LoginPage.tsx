import { useForm } from "react-hook-form";
import styles from "./LoginPage.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

interface LoginPageProps {
  username: string;
  password: string;
}

interface AuthContextType {
  saveUserData: () => void;
}

export default function LoginPage() {
  let { saveUserData } = useContext(AuthContext) as AuthContextType;
  // Ensure saveUserData is called to update user data after login

  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPageProps>();
  let navigate = useNavigate();

  let onSubmit = async (data: LoginPageProps) => {
    try {
      let response = await axios.post("https://dummyjson.com/auth/login", {
        username: data.username,
        password: data.password,
      });
      localStorage.setItem("userToken", response?.data?.accessToken);
      saveUserData(); // Call to update user data in context

      toast.success("Login successful! Redirecting...", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });

      // Wait a sec to let user see the toast, then navigate
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);

      console.log("Login Success:", response.data);
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Login failed", {
          position: "top-right",
          autoClose: 3000,
        });
        console.error("API Error:", error.response?.data);
      } else {
        toast.error("Unexpected error occurred", {
          position: "top-right",
          autoClose: 3000,
        });
        console.error("Unexpected Error:", error);
      }
    }
  };

  return (
    <>
      <div className={styles.container}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.form}
          noValidate
        >
          <h2 className={styles.title}>Login</h2>

          <label>User Name</label>
          <input
            placeholder="Username"
            className={styles.input}
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && (
            <p className={styles["text-danger"]}>{errors.username.message}</p>
          )}
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            className={styles.input}
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className={styles["text-danger"]}>{errors.password.message}</p>
          )}

          <button type="submit" className={styles.button}>
            Login
          </button>
        </form>
      </div>
    </>
  );
}
