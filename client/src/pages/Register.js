import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [verifyLink, setVerifyLink] = useState("");

  // 🔥 NEW: Toast state
  const [message, setMessage] = useState("");
  const [type, setType] = useState(""); // success | error

  const showMessage = (msg, msgType) => {
    setMessage(msg);
    setType(msgType);

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.password) {
      showMessage("All fields are required", "error");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        form
      );

      setVerifyLink(res.data.verificationLink);
      showMessage("Registered successfully 🎉", "success");

    } catch (err) {
      showMessage(
        err.response?.data?.msg || err.message,
        "error"
      );
    }
  };

  return (
    <div style={styles.container}>

      {/* 🔥 TOAST MESSAGE */}
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

      {/* LEFT SIDE */}
      <div style={styles.left}>
        <h1 style={styles.brand}>🍕 Pizza App</h1>
        <p style={styles.subtitle}>
          Create your own delicious pizza experience
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div style={styles.right}>
        <div style={styles.card}>
          <h2 style={styles.title}>Create Account</h2>

          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            style={styles.input}
          />

          <button onClick={handleSubmit} style={styles.button}>
            Register 🚀
          </button>

          {/* VERIFY BOX */}
          {verifyLink && (
            <div style={styles.verifyBox}>
              <p>📧 Verify your email:</p>
              <a href={verifyLink} style={styles.verifyLink}>
                Click here
              </a>
            </div>
          )}

          <p style={styles.text}>
            Already have an account?{" "}
            <span style={styles.link} onClick={() => navigate("/")}>
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

// 🎨 STYLES
const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "sans-serif",
    position: "relative"
  },

  // 🔥 TOAST
  toast: {
    position: "absolute",
    top: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    padding: "12px 20px",
    borderRadius: "10px",
    color: "#fff",
    fontWeight: "bold",
    boxShadow: "0 4px 15px rgba(0,0,0,0.3)"
  },

  left: {
    flex: 1,
    background: "linear-gradient(135deg, #ff6a00, #ee0979)",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px",
    textAlign: "center"
  },

  brand: {
    fontSize: "40px",
    marginBottom: "10px"
  },

  subtitle: {
    fontSize: "16px",
    opacity: 0.9
  },

  right: {
    flex: 1,
    background: "#f8f9fa",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  card: {
    width: "350px",
    padding: "30px",
    borderRadius: "15px",
    background: "#fff",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
  },

  title: {
    marginBottom: "20px"
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ddd"
  },

  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(45deg, #ff6a00, #ee0979)",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer"
  },

  verifyBox: {
    marginTop: "15px",
    padding: "10px",
    background: "#e8f5e9",
    borderRadius: "8px"
  },

  verifyLink: {
    color: "#2e7d32",
    fontWeight: "bold",
    textDecoration: "none"
  },

  text: {
    marginTop: "15px",
    fontSize: "14px"
  },

  link: {
    color: "#ee0979",
    cursor: "pointer",
    fontWeight: "bold"
  }
};

export default Register;



