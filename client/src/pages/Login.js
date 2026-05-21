import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const [message, setMessage] = useState("");
  const [type, setType] = useState(""); // success | error

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const showMessage = (msg, msgType) => {
    setMessage(msg);
    setType(msgType);

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );

      localStorage.setItem("token", res.data.token);

      showMessage("Login successful 🎉", "success");

      setTimeout(() => {
        if (res.data.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      }, 1000);

    } catch (err) {
      showMessage(
        err.response?.data?.msg || "Login failed",
        "error"
      );
    }
  };

  const handleForgotPassword = async () => {
    const email = prompt("Enter your email to reset password:");
    if (!email) return;

    try {
      await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email }
      );

      showMessage("Reset link sent 📧", "success");

    } catch (err) {
      showMessage(
        err.response?.data?.msg || err.message,
        "error"
      );
    }
  };

  return (
    <div style={styles.container}>

      {/* 🔥 MESSAGE BOX */}
      {message && (
        <div
          style={{
            ...styles.toast,
            background:
              type === "success"
                ? "linear-gradient(45deg, #4caf50, #2e7d32)"
                : "linear-gradient(45deg, #ff4d4d, #b71c1c)"
          }}
        >
          {message}
        </div>
      )}

      <div style={styles.card}>
        <h1 style={styles.logo}>🍕 Pizza App</h1>
        <h2 style={styles.title}>Welcome Back</h2>

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          style={styles.input}
        />

        <button onClick={handleSubmit} style={styles.button}>
          Login
        </button>

        <p style={styles.forgot} onClick={handleForgotPassword}>
          Forgot Password?
        </p>

        <p style={styles.text}>
          Don't have an account?{" "}
          <span
            style={styles.link}
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

// 🎨 STYLES
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #1f1c2c, #928dab)",
    position: "relative"
  },

  // 🔥 TOAST MESSAGE
  toast: {
    position: "absolute",
    top: "20px",
    padding: "12px 20px",
    borderRadius: "10px",
    color: "#fff",
    fontWeight: "bold",
    boxShadow: "0 4px 15px rgba(0,0,0,0.3)"
  },

  card: {
    width: "350px",
    padding: "35px",
    borderRadius: "20px",
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(15px)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
    textAlign: "center",
    color: "#fff",
  },

  logo: {
    marginBottom: "10px",
    fontSize: "28px",
  },

  title: {
    marginBottom: "20px",
    fontWeight: "300",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
    background: "rgba(255,255,255,0.2)",
    color: "#fff",
  },

  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(45deg, #ff6a00, #ee0979)",
    color: "#fff",
    cursor: "pointer"
  },

  forgot: {
    marginTop: "10px",
    cursor: "pointer",
    fontSize: "13px",
    opacity: "0.8",
  },

  text: {
    marginTop: "15px",
    fontSize: "14px",
  },

  link: {
    color: "#ffd700",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Login; 