# 🎫 Quick Desk – Ticketing & Support System

Quick Desk is a robust role-based ticketing system designed for managing internal support queries or customer issues with features like threaded conversations, email notifications, and upvote/downvote voting. Ideal for both enterprise and public-facing support use cases.

---

## 👥 User Roles & Functionalities

### 1. **End Users (Employees/Customers)**
- 🔐 Register & Login
- 📝 Create Tickets with:
  - Subject
  - Description
  - Category
  - Optional attachment
- 👁️ View status of their submitted tickets
- 📧 Email notifications for:
  - Ticket creation
  - Ticket status updates
- 💬 Reply only to their own tickets
- 👍 Upvote / 👎 Downvote tickets
- 📊 **Dashboard Features**:
  - Search & filter:
    - Open / Closed tickets
    - Category-based search
    - Only their own tickets
  - Sort by:
    - Most replied
    - Recently modified
  - Pagination and sorting
  - Threaded ticket conversations (timeline)
  - Profile & settings management

---

### 2. **Support Agents**
- 📥 View and assign tickets
- 🔄 Update ticket status:
  - `Open → In Progress → Resolved → Closed`
- 💬 Add comments and updates
- 📝 Create tickets like end users
- 📊 **Dashboard Features**:
  - Ticket queues: My Tickets, All Tickets
  - Actions: Reply, Share, Update status

---

### 3. **Admin**
- 👤 Manage users, roles, and permissions
- 🗂️ Manage categories
- 🔧 Full access to all tickets and user management

---

## 📌 Core Functional Requirements

### 🔐 Authentication
- Secure registration and login
- Role-based access control

### 🎫 Ticket Management
- Ticket creation, assignment, updates, resolution
- Ticket Status Flow:
  - `Open → In Progress → Resolved → Closed`

### 💬 Communication
- Threaded conversations (timeline-style)
- Email notifications

### 🔍 Filtering & Search
- Filter by:
  - Category
  - Status
  - Reply count
  - Last updated
- Sorting & pagination

### 🔼 Voting System
- Upvote/downvote tickets to highlight priority

### 🖥️ Role-Based Dashboard UI
- Distinct interfaces for:
  - End Users
  - Support Agents
  - Admins

---

## 🚀 Tech Stack
- **Frontend**: React + Tailwind CSS + Vite
- **Backend**: Node.js + Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Email**: Nodemailer
- **File Uploads**: Multer

---

## 📁 Project Structure

QuickDesk/
│
├── Frontend/         # React + Tailwind (Vite)
│
└── Backend/          # Node.js + Express + MongoDB

---

## 🛠️ Setup Instructions

1. **Clone the repo**  
   ```bash
   git clone https://github.com/Atul-op/CodeInColorOdoo.git
   cd CodeInColorOdoo
2. **Backend Setup**
   ```bash
   cd Backend
   npm install
   npm start
3. **Frontend Setup**
   ```bash
   cd QuickDesk
   npm install
   npm run dev
