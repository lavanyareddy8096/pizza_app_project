# OIBSIP_WebDevelopment_Task1

# 🍕 Full Stack Pizza Ordering Web App

This project is developed as part of my Web Development Internship at Oasis Infobyte.

---

## 📌 Objective

To build a full stack web application where users can customize and order pizzas, and admins can manage orders, inventory, and track order status.

---

## 🛠️ Tech Stack

- Frontend: React.js  
- Backend: Node.js, Express.js  
- Database: MongoDB  
- Authentication: JWT (JSON Web Token)  
- Payment Gateway: Razorpay (Test Mode)

---

## ✨ Features

### 👤 User Features

- User Registration & Login  
- Email Verification System  
- Forgot Password Functionality  
- Build Custom Pizza  
  - Choose Base  
  - Select Sauce  
  - Choose Cheese  
  - Add Veggies  
- Razorpay Payment Integration (Test Mode)  
- View Order History  
- Track Order Status (Real-time updates)

---

### 👨‍🍳 Admin Features

- Admin Login  
- View All Orders  
- Update Order Status  
  - Order Received  
  - In Kitchen  
  - Delivered  
- Inventory Management System  
- Low Stock Alerts  

---

## 🔄 Application Workflow

1. User registers and verifies email  
2. User logs into the system  
3. Builds a custom pizza  
4. Makes payment using Razorpay  
5. Order is saved in database  
6. Admin views and processes order  
7. Admin updates order status  
8. User can track order status in dashboard  

---

## 📸 Screenshots

### 🔐 Login Page
![Login](./client/public/screenshots/login.png)

### 📝 Register Page
![Register](./client/public/screenshots/register.png)

### 🍕 Dashboard (Pizza Builder)
![Dashboard](./client/public/screenshots/dashboard.png)

### 👨‍🍳 Admin Dashboard
![Admin](./client/public/screenshots/admin.png)

### 📦 My Orders Page
![Orders](./client/public/screenshots/orders.png)
---

## 🚀 How to Run Locally

### 1. Clone Repository

git clone https://github.com/adarsh4k/OIBSIP_WebDevelopment_Task1.git  
cd OIBSIP_WebDevelopment_Task1  

---

### 2. Install Dependencies

Backend:

cd server  
npm install  

Frontend:

cd client  
npm install  

---

### 3. Setup Environment Variables

Create a `.env` file inside server/ and add:

MONGO_URI=your_mongodb_connection  
JWT_SECRET=your_secret_key  
RAZORPAY_KEY_ID=your_key  
RAZORPAY_KEY_SECRET=your_secret  

---

### 4. Run Application

Start Backend:

cd server  
npm start  

Start Frontend:

cd client  
npm start  

---

## 📦 Outcome

Successfully built a full stack web application with authentication, payment integration, admin panel, and real-time order tracking.

---

## 🔗 Links

- GitHub Repository: https://github.com/adarsh4k/OIBSIP_WebDevelopment_Task1  


---

## 🙌 Acknowledgment

Thanks to Oasis Infobyte for providing this internship opportunity.

---

## 📌 Author

Adarsh
