import { getEntities, saveEntity } from "./common";
import base64 from "react-native-base64";

interface UserData {
  id: number;
  fname: string;
  lname: string;
  username: string;
  email: string;
  password: string;
}

const USERS: string = "users";

// For Reading the form data of user
export const createUser = (data: Partial<UserData>) => {
  let users = getEntities(USERS);

  const obj = users.filter((user: UserData) => user.username === data.username);
  if (obj.length > 0) {
    return {};
  }

  var user = {
    ...data,
    id: Date.now(),
  };

  users.push(user);
  saveEntity(USERS, JSON.stringify(users));
  return user;
};

// Login
export const loginUser = (data: Partial<UserData>) => {
  const authenticated_users: UserData[] = getEntities(USERS);
  return authenticated_users.find((user) => {
    return user.username == data.username && user.password == data.password;
  });
};

export const userList = () => {
  const users = getEntities(USERS);
  let option: any[] = [];
  users.forEach((user: UserData) => {
    const name = user.fname + " " + user.lname;
    option.push({ label: name, value: user.username });
  });
  return option;
};
