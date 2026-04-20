import { dataStore } from "./dataStore.js";


const adminAccount = {
  username: "admin",
  password: "adminIsGoated",
  role: "Admin"
};

//signup
export function createUser(userData) {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const exists = users.find(u => u.username === userData.username);
  if (exists) {
    return { success: false, message: "Username already exists." };
  }

  const newUser = {
    username: userData.username,
    password: userData.password,
    role: "Passenger"
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  return { success: true, user: newUser };
}

//login
export function loginUser(username, password) {
  // check admin first
  if (username === adminAccount.username && password === adminAccount.password) {
    return { success: true, role: "Admin", user: adminAccount };
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    return { success: false, message: "Invalid credentials." };
  }

  return { success: true, role: "Passenger", user };
}