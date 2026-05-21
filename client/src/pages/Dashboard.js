
import { useState } from "react";
import axios from "axios";
import Navbar from "../pages/Navbar";

function Dashboard() {
  const [pizza, setPizza] = useState({
    base: "",
    sauce: "",
    cheese: "",
    veggies: []
  });

  const [loading, setLoading] = useState(false);
  const [notify, setNotify] = useState({ show: false, msg: "", type: "" });

  const showMessage = (msg, type = "success") => {
    setNotify({ show: true, msg, type });

    setTimeout(() => {
      setNotify({ show: false, msg: "", type: "" });
    }, 2500);
  };

  const handleSelect = (type, value) => {
    setPizza({ ...pizza, [type]: value });
  };

  const handleVeggies = (value) => {
    if (pizza.veggies.includes(value)) {
      setPizza({
        ...pizza,
        veggies: pizza.veggies.filter(v => v !== value)
      });
    } else {
      setPizza({
        ...pizza,
        veggies: [...pizza.veggies, value]
      });
    }
  };

  const isValid = () => pizza.base && pizza.sauce && pizza.cheese;

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/orders/create",
        pizza,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
    } catch (err) {
      console.error(err);
      showMessage("Order failed ❌", "error");
    }
  };

  const handlePayment = async () => {
    if (!isValid()) {
      showMessage("Please complete your pizza 🍕", "error");
      return;
    }

    if (!window.Razorpay) {
      showMessage("Payment service unavailable ❌", "error");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/payment/create",
        pizza
      );

      const options = {
        key: "rzp_test_SfMfVF07SOYx2m",
        amount: res.data.amount,
        currency: "INR",
        order_id: res.data.id,
        theme: { color: "#ff6a00" },

        handler: async function () {
          await handleSubmit();
          showMessage("🍕 Order placed successfully!", "success");
        }
      };

      new window.Razorpay(options).open();
    } catch (err) {
      console.error(err);
      showMessage("Payment failed ❌", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <Navbar />

      {/* TOAST MESSAGE */}
      {notify.show && (
        <div style={{
          ...styles.toast,
          background:
            notify.type === "success"
              ? "linear-gradient(45deg,#00c853,#64dd17)"
              : "linear-gradient(45deg,#ff1744,#d50000)"
        }}>
          {notify.msg}
        </div>
      )}

      <div style={styles.wrapper}>
        <h1 style={styles.title}>🍕 Build Your Pizza</h1>

        <div style={styles.layout}>
          {/* LEFT */}
          <div style={styles.left}>
            <Section title="Base">
              {["Thin", "Thick", "Cheese Burst", "Pan"].map(item => (
                <Card
                  key={item}
                  label={item}
                  icon="🍞"
                  selected={pizza.base === item}
                  onClick={() => handleSelect("base", item)}
                />
              ))}
            </Section>

            <Section title="Sauce">
              {["Tomato", "BBQ", "Pesto"].map(item => (
                <Card
                  key={item}
                  label={item}
                  icon="🥫"
                  selected={pizza.sauce === item}
                  onClick={() => handleSelect("sauce", item)}
                />
              ))}
            </Section>

            <Section title="Cheese">
              {["Mozzarella", "Cheddar"].map(item => (
                <Card
                  key={item}
                  label={item}
                  icon="🧀"
                  selected={pizza.cheese === item}
                  onClick={() => handleSelect("cheese", item)}
                />
              ))}
            </Section>

            <Section title="Veggies">
              {["Onion", "Capsicum", "Olives"].map(item => (
                <Card
                  key={item}
                  label={item}
                  icon="🥬"
                  selected={pizza.veggies.includes(item)}
                  onClick={() => handleVeggies(item)}
                />
              ))}
            </Section>
          </div>

          {/* RIGHT */}
          <div style={styles.summary}>
            <h3>🧾 Your Pizza</h3>
            <p><b>Base:</b> {pizza.base || "-"}</p>
            <p><b>Sauce:</b> {pizza.sauce || "-"}</p>
            <p><b>Cheese:</b> {pizza.cheese || "-"}</p>
            <p><b>Veggies:</b> {pizza.veggies.join(", ") || "-"}</p>

            <button
              style={{
                ...styles.button,
                opacity: !isValid() || loading ? 0.6 : 1
              }}
              onClick={handlePayment}
              disabled={!isValid() || loading}
            >
              {loading ? "Processing..." : "Pay & Order 💳"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* COMPONENTS */

const Section = ({ title, children }) => (
  <div style={styles.section}>
    <h3 style={styles.sectionTitle}>{title}</h3>
    <div style={styles.grid}>{children}</div>
  </div>
);

const Card = ({ label, icon, selected, onClick }) => (
  <div
    onClick={onClick}
    style={{
      ...styles.card,
      border: selected ? "2px solid #ff6a00" : "1px solid #ddd",
      background: selected ? "#fff3e0" : "#fff"
    }}
  >
    <div style={styles.icon}>{icon}</div>
    <p>{label}</p>
  </div>
);

/* STYLES */

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #141e30, #243b55)",
    paddingTop: "75px"
  },

  wrapper: {
    width: "92%",
    maxWidth: "1200px",
    margin: "0 auto",
    color: "#fff"
  },

  title: {
    textAlign: "center",
    marginBottom: "25px",
    fontSize: "2.2rem"
  },

  layout: {
    display: "flex",
    gap: "25px",
    flexWrap: "wrap"
  },

  left: {
    flex: "2",
    minWidth: "280px"
  },

  section: {
    marginBottom: "20px"
  },

  sectionTitle: {
    marginBottom: "8px"
  },

  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px"
  },

  card: {
    flex: "1 1 110px",
    maxWidth: "140px",
    padding: "12px",
    borderRadius: "12px",
    cursor: "pointer",
    textAlign: "center",
    color: "#000",
    transition: "0.2s",
    boxShadow: "0 3px 10px rgba(0,0,0,0.1)"
  },

  icon: {
    fontSize: "24px",
    marginBottom: "5px"
  },

  summary: {
    flex: "1",
    minWidth: "260px",
    background: "#fff",
    color: "#000",
    padding: "18px",
    borderRadius: "14px",
    height: "fit-content",
    position: "sticky",
    top: "90px"
  },

  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(45deg, #ff6a00, #ee0979)",
    color: "#fff",
    marginTop: "15px"
  },

  toast: {
    position: "fixed",
    top: "80px",
    left: "50%",
    transform: "translateX(-50%)",
    padding: "12px 20px",
    borderRadius: "10px",
    color: "#fff",
    fontWeight: "500",
    zIndex: 2000,
    boxShadow: "0 8px 20px rgba(0,0,0,0.3)"
  }
};

export default Dashboard;