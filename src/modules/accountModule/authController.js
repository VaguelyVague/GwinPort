import * as userModel from "../models/userModel.js";

export function signup(req) {
  return userModel.createUser(req);
}

export function login(req) {
  return userModel.loginUser(req.username, req.password);
}