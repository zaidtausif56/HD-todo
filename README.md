# HD Notes ✨

A modern, responsive note-taking application built with React, TypeScript, Node.js, and Supabase that helps you organize your thoughts efficiently.

![image](https://github.com/user-attachments/assets/963d2b5a-395a-4d61-b93d-c32ffe3c14f2)

![image](https://github.com/user-attachments/assets/40900e70-64a9-48ce-af56-3ab5cad5c6a9)

![image](https://github.com/user-attachments/assets/d9be36e5-e2b4-44a3-88a0-8e353c620c2b)



## ✨ Features

- **🔐 Secure Authentication**

  - Email-based OTP authentication
  - Protected routes and sessions
  - JWT token management
  - Protected API endpoints

- **📝 Note Management**

  - Create and delete notes
  - Real-time updates
  - Clean and intuitive interface


 
## 🚀 Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm or yarn
- Supabase account
- Email service provider (for OTP)

### Installation

#### Frontend Setup

1. Clone the repository

```bash
git clone https://github.com/yourusername/hd-notes.git
cd hd-notes
```

2. Navigate to the frontend directory

```bash
cd frontend
```

3. Install dependencies

```bash
npm install
```

###### Core Dependencies

```bash
npm install react react-dom react-router-dom
npm install axios@1.7.7 typescript
```

###### Development Dependencies

```bash
npm install --save-dev @types/react @types/react-dom
npm install --save-dev @testing-library/react @testing-library/jest-dom
npm install --save-dev @testing-library/user-event
npm install --save-dev @types/jest @types/node
```

4. Create a .env file in the frontend directory

```env
REACT_APP_API_URL=http://localhost:4001
```

5. Start the development server

```bash
npm start
```

#### Backend Setup

1. Navigate to the backend directory

```bash
cd backend
```

2. Install dependencies

```bash
npm install
```

###### Core Dependencies

```bash
npm install express@4.21.1 @supabase/supabase-js
npm install cors@2.8.5 dotenv
npm install express-session@1.18.1 jsonwebtoken
npm install nodemailer@6.9.16 otp-generator
```

###### Development Dependencies

```bash
npm install --save-dev typescript ts-node
npm install --save-dev @types/express @types/cors
npm install --save-dev @types/express-session
npm install --save-dev @types/jsonwebtoken
npm install --save-dev @types/node
npm install --save-dev @types/nodemailer
npm install --save-dev @types/otp-generator
```

3. Create a .env file in the backend directory

```env
PORT=4001
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
JWT_SECRET=your_jwt_secret
OTP_SECRET=your_otp_secret
SESSION_SECRET=your_session_secret

# Email Configuration
SMTP_HOST=your_smtp_host
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
```

4. Set up Supabase Database Tables

Create the following tables in your Supabase dashboard:

**Users Table (hdusers)**

```sql
create table hdusers (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text unique not null,
  dob date not null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);
```

**Notes Table (notes)**

```sql
create table notes (
  id uuid default uuid_generate_v4() primary key,
  userid uuid references hdusers(id),
  notedata text not null,
  completed boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now())
);
```
#### Schema

![image](https://github.com/user-attachments/assets/309aaa94-1bc2-43a9-9b2f-fba7dd94ced8)



5. Start the server

```bash
npm run dev
# or for production
npm start
```

## 🎯 Usage

1. Register a new account with your email
2. Verify your email using the OTP sent
3. Login using email and OTP
4. Create, view, and manage notes in the dashboard
5. Use the "Keep me logged in" option for extended sessions

## 🎨 Technologies Used

### Frontend

- React 18.3
- TypeScript 4.9
- React Router v7
- Axios for API calls
- Context API for state management
- Modern CSS3 with responsive design

### Backend

- Node.js with Express
- TypeScript 5.7
- Supabase (PostgreSQL)
- JWT for authentication
- Nodemailer for OTP delivery
- Express Session management

## 🔒 Security Features

- Email-based OTP authentication
- JWT token authentication
- Protected API routes
- Session management
- CORS configuration
- Environment variable protection

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## 📞 Support

For support, email zaidtausif56@gmail.com or create an issue in this repository.

## 🌟 Acknowledgments

- Special thanks to the Supabase team for their excellent database service
- Thanks to the open-source community

---

Made with ❤️ by Md Zaid Tausif
