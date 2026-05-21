import { useEffect, useState } from "react";
import axios from "axios";

function Admin() {
  const [orders, setOrders] = useState([]);
  const [inventory, setInventory] = useState([]);

  const fetchOrders = async () => {
    const res = await axios.get("http://localhost:5000/api/orders/all");
    setOrders(res.data);
  };

  const fetchInventory = async () => {
    const res = await axios.get("http://localhost:5000/api/inventory");
    setInventory(res.data);
  };

  useEffect(() => {
    fetchOrders();
    fetchInventory();
  }, []);

  const updateStatus = async (id, status) => {
    await axios.put(
      `http://localhost:5000/api/orders/update/${id}`,
      { status }
    );
    fetchOrders();
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        
        <h1 style={styles.title}>👨‍🍳 Admin Dashboard</h1>

        {/* 🔴 ALERT */}
        <div style={styles.alertBox}>
          <h3 style={{ marginBottom: "10px" }}>⚠️ Low Stock Alerts</h3>
          {inventory.filter(i => i.quantity < 20).length === 0 ? (
            <p style={{ color: "#0f0" }}>All stock levels are good ✔</p>
          ) : (
            inventory
              .filter(i => i.quantity < 20)
              .map(item => (
                <p key={item._id} style={styles.alertText}>
                  {item.name} - {item.quantity} left
                </p>
              ))
          )}
        </div>

        {/* 📦 INVENTORY */}
        <h2 style={styles.sectionTitle}>📦 Inventory</h2>
        <div style={styles.grid}>
          {inventory.map(item => (
            <div key={item._id} style={styles.card}>
              <h3>{item.name}</h3>
              <p>Stock: {item.quantity}</p>
            </div>
          ))}
        </div>

        {/* 📋 ORDERS */}
        <h2 style={styles.sectionTitle}>📋 Orders</h2>

        <div style={styles.ordersGrid}>
          {orders.map(order => (
            <div key={order._id} style={styles.orderCard}>
              
              <div style={styles.orderTop}>
                <h3>{order.base}</h3>
                <span style={styles.status}>{order.status}</span>
              </div>

              <p><b>Sauce:</b> {order.sauce}</p>
              <p><b>Cheese:</b> {order.cheese}</p>
              <p><b>Veggies:</b> {order.veggies.join(", ")}</p>

              <div style={styles.btnGroup}>
                <button
                  style={styles.btn}
                  onClick={() => updateStatus(order._id, "In Kitchen")}
                >
                  In Kitchen
                </button>

                <button
                  style={{ ...styles.btn, background: "#28a745" }}
                  onClick={() => updateStatus(order._id, "Delivered")}
                >
                  Delivered
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

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
    maxWidth: "1100px",
    color: "#fff"
  },
  title: {
    textAlign: "center",
    marginBottom: "30px"
  },
  sectionTitle: {
    margin: "20px 0 10px"
  },
  alertBox: {
    background: "#1e1e2f",
    padding: "15px",
    borderRadius: "12px",
    marginBottom: "20px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
  },
  alertText: {
    color: "#ff4d4d"
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "15px"
  },
  card: {
    background: "#ffffff10",
    padding: "15px",
    borderRadius: "12px",
    width: "140px",
    textAlign: "center",
    backdropFilter: "blur(10px)"
  },
  ordersGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "15px"
  },
  orderCard: {
    background: "#ffffff10",
    padding: "15px",
    borderRadius: "12px",
    backdropFilter: "blur(10px)"
  },
  orderTop: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px"
  },
  status: {
    background: "#ff6a00",
    padding: "5px 10px",
    borderRadius: "8px",
    fontSize: "12px"
  },
  btnGroup: {
    display: "flex",
    gap: "10px",
    marginTop: "10px"
  },
  btn: {
    padding: "8px",
    border: "none",
    borderRadius: "8px",
    background: "#ff6a00",
    color: "#fff",
    cursor: "pointer",
    flex: 1
  }
};

export default Admin;





/*import { useEffect, useState } from "react";
import axios from "axios";

function Admin() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await axios.get("http://localhost:5000/api/orders/all");
    setOrders(res.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    await axios.put(
      `http://localhost:5000/api/orders/update/${id}`,
      { status }
    );

    fetchOrders(); // refresh
  };

  return (
    <div>
      <h2>Admin Dashboard 👨‍🍳</h2>

      {orders.map((order) => (
        <div key={order._id} style={{ border: "1px solid", margin: "10px", padding: "10px" }}>
          <p><b>Base:</b> {order.base}</p>
          <p><b>Sauce:</b> {order.sauce}</p>
          <p><b>Cheese:</b> {order.cheese}</p>
          <p><b>Status:</b> {order.status}</p>

          <button onClick={() => updateStatus(order._id, "In Kitchen")}>
            In Kitchen
          </button>

          <button onClick={() => updateStatus(order._id, "Delivered")}>
            Delivered
          </button>
        </div>
      ))}
    </div>
  );
}

export default Admin;*/