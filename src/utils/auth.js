import storage from "./storage";

export const getToken = () => storage.get("token");

export const setToken = (token) => storage.set("token", token);

export const removeToken = () => storage.remove("token");
