import { useEffect, useState } from "react";
import axios from "axios";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/orders",
        { headers: { Authorization: token } }
      );

      setOrders(res.data);
    };

    fetchOrders();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <h1 style={styles.title}>📦 My Orders</h1>

        {orders.length === 0 ? (
          <p style={styles.empty}>No orders yet 🍕</p>
        ) : (
          <div style={styles.grid}>
            {orders.map(order => (
              <div key={order._id} style={styles.card}>
                
                <div style={styles.top}>
                  <h3>{order.base}</h3>
                  <span style={getStatusStyle(order.status)}>
                    {order.status}
                  </span>
                </div>

                <p><b>Sauce:</b> {order.sauce}</p>
                <p><b>Cheese:</b> {order.cheese}</p>
                <p><b>Veggies:</b> {order.veggies.join(", ")}</p>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// 🎯 Dynamic status colors
const getStatusStyle = (status) => {
  let color = "#999";

  if (status === "Order Received") color = "#ffc107";
  if (status === "In Kitchen") color = "#17a2b8";
  if (status === "Delivered") color = "#28a745";

  return {
    background: color,
    padding: "5px 10px",
    borderRadius: "8px",
    fontSize: "12px",
    color: "#fff"
  };
};

// 🎨 PREMIUM STYLES
const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #141e30, #243b55)",
    display: "flex",
    justifyContent: "center",
    padding: "20px"
  },
  wrapper: {
    width: "100%",
    maxWidth: "1000px",
    color: "#fff"
  },
  title: {
    textAlign: "center",
    marginBottom: "30px"
  },
  empty: {
    textAlign: "center",
    opacity: 0.7
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "15px"
  },
  card: {
    background: "#ffffff10",
    padding: "15px",
    borderRadius: "12px",
    backdropFilter: "blur(10px)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
  },
  top: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px"
  }
};

export default MyOrders;