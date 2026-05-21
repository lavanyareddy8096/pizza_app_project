import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Verify() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("loading"); // loading | success | error

  useEffect(() => {
    const verify = async () => {
      try {
        await axios.get(
          `http://localhost:5000/api/auth/verify/${token}`
        );

        setStatus("success");

        setTimeout(() => {
          navigate("/");
        }, 2000);

      } catch (err) {
        setStatus("error");

        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    };

    verify();
  }, [token, navigate]);

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        {status === "loading" && (
          <>
            <h2>⏳ Verifying Email...</h2>
            <p>Please wait a moment</p>
          </>
        )}

        {status === "success" && (
          <>
            <h2 style={{ color: "#4caf50" }}>✅ Email Verified!</h2>
            <p>Redirecting to login...</p>
          </>
        )}

        {status === "error" && (
          <>
            <h2 style={{ color: "#ff4d4d" }}>❌ Verification Failed</h2>
            <p>Redirecting to login...</p>
          </>
        )}

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
    background: "linear-gradient(135deg, #141e30, #243b55)"
  },
  card: {
    background: "#ffffff10",
    padding: "30px",
    borderRadius: "15px",
    backdropFilter: "blur(10px)",
    textAlign: "center",
    color: "#fff",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
  }
};

export default Verify;