import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={styles.nav}>
      <h2 style={styles.logo} onClick={() => navigate("/dashboard")}>
        🍕 Pizza App
      </h2>

      <div style={styles.menu}>
        <button onClick={() => navigate("/dashboard")} style={styles.btn}>
          Dashboard
        </button>

        <button onClick={() => navigate("/orders")} style={styles.btn}>
          My Orders
        </button>

        <button onClick={logout} style={styles.logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: "65px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 5%",
    background: "rgba(20, 30, 48, 0.95)",
    backdropFilter: "blur(10px)",
    color: "#fff",
    zIndex: 99999,
    boxShadow: "0 2px 10px rgba(0,0,0,0.3)"
  },

  logo: {
    cursor: "pointer",
    fontSize: "1.4rem",
    fontWeight: "600"
  },

  menu: {
    display: "flex",
    gap: "10px",
    alignItems: "center"
  },

  btn: {
    background: "transparent",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.3)",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer"
  },

  logout: {
    background: "linear-gradient(45deg, #ff4d4d, #ff0000)",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer"
  }
};

export default Navbar;