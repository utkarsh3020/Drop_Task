import { getEntities, saveEntity } from "./common";

interface shareObj {
  sharedWith: string;
  senderId: string;
  todoId: string;
}

interface todoObj {
  todoId: string;
  title: string;
  desc: string;
}

interface UserData {
  id: number;
  fname: string;
  lname: string;
  username: string;
  email: string;
  password: string;
}

interface ShareRecord {
  todoId: string;
  title: string;
  desc: string;
  from: string;
}

const SHARE: string = "shared_list";
const TODO: string = "todos";
const USERS: string = "users";

const sharedRecordGenerator = (
  shareTo: string,
  senderId: string,
  todoId: string
): shareObj => {
  return {
    sharedWith: shareTo,
    senderId: senderId,
    todoId: todoId,
  };
};
export const createShareRecord = (data: {
  receiver: string[];
  senderId: string;
  todoId: string;
}) => {
  const share_records = getEntities(SHARE);
  data.receiver.forEach((user) => {
    console.log(user);
    const record = sharedRecordGenerator(user, data.senderId, data.todoId);
    share_records.push(record);
  });
  saveEntity(SHARE, JSON.stringify(share_records));
};

export const getShareRecords = (userId: number) => {
  const shared_objs: shareObj[] = getEntities(SHARE);
  const users: UserData[] = getEntities(USERS);
  const todos = getEntities(TODO);

  const userName: string = users.filter((user) => user.id == userId)[0]
    .username;

  const sharedTodomaps = shared_objs.filter(
    (sharedMap) => sharedMap.sharedWith === userName
  );

  let result: ShareRecord[] = [];
  sharedTodomaps.forEach((obj: shareObj) => {
    if (obj != undefined) {
      const id: string = obj.senderId; //userId
      const todoId: string = obj.todoId; //todoID
      const sender = users.filter((user) => user.id == parseInt(id));

      let record = todos[id].filter(
        (todo: todoObj) => todo.todoId === todoId
      )[0];
      if (sender.length > 0) {
        record["from"] = sender[0].username;
      }
      result.push(record);
    }
  });
  return result;
};
