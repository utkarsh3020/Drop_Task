import * as fs from "fs";
import path from "path";

/*
 *File Paths
 */

const FILE_PATH_TODO: string = path.join("database", "todos.json");
const FILE_PATH_SHARED: string = path.join("database", "shared_list.json");

/*
 * The Functions declared now are for updating and reading the todos.json
 */
const recordGenerator = (id: number, title: string, desc: string): string => {
  let record: string = `{"todoId":${
    id + 1
  },"title":"${title}", "description":"${desc}"}`;

  return record;
};

export function readDataFromTodos() {
  return fs.readFile(FILE_PATH_TODO, "utf8", (err: any, data) => {
    if (err) {
      console.log(err);
    }
    return JSON.parse(data);
  });
}

export const saveDataToTodos = (data: any) => {
  // Reading the database using Sync Method
  const database = JSON.parse(fs.readFileSync(FILE_PATH_TODO, "utf8"));

  const id = parseInt(data.id);
  const todos_objects = database[id - 1].todos;
  var jsonObj = JSON.parse(
    recordGenerator(todos_objects.length, data.title, data.description)
  );
  console.log(jsonObj);
  database[id - 1].todos.push(jsonObj);
  var jsonContent = JSON.stringify(database);

  fs.writeFile(FILE_PATH_TODO, jsonContent, "utf8", (err: any) => {
    if (err) {
      console.log("An error occured while writing to the JSON File!!");
      return console.log(err);
    }
    console.log("The JSON File has been updated!!");
  });
};

export const getDataFromTodos = (userId: string): any[] => {
  // Reading the database using Sync Method
  const users = JSON.parse(fs.readFileSync(FILE_PATH_TODO, "utf8"));
  const id = parseInt(userId);
  return users[id - 1].todos;
};

// export const getTodoById = (userId: string, todoId: string) => {
//   const userTodos = getDataFromTodos(userId);
//   return userTodos.find((todo) => todo.todoId === parseInt(todoId));
// };

/*
 * The Functions declared now are for updating and reading the shared_list.json
 */

const sharedRecordGenerator = (
  ind: number,
  to: number,
  from: number,
  todoId: number
): string => {
  var record: string = `{
    "recordId":${ind},
    "to":${to},
    "from":${from},
    "todoId":${todoId}
  }`;

  return record;
};

export const saveDataToShared = (data: any) => {
  // Reading the database using Sync Method
  const database = JSON.parse(fs.readFileSync(FILE_PATH_SHARED, "utf8"));
  const len: number = database.length;

  const fromId: number = parseInt(data.fromId);
  const todoId: number = parseInt(data.todoId);
  const sharedIds: number[] = JSON.parse(data.sharedIds);

  const shared_to_count: number = sharedIds.length;
  var i = 1;
  for (; i <= shared_to_count; i++) {
    var jsonObj = JSON.parse(
      sharedRecordGenerator(len + i, sharedIds[i - 1], fromId, todoId)
    );
    database.push(jsonObj);
  }

  var jsonContent = JSON.stringify(database);

  fs.writeFile(FILE_PATH_SHARED, jsonContent, "utf8", (err: any) => {
    if (err) {
      console.log("An error occured while writing to the JSON File!!");
      return console.log(err);
    }
    console.log("The JSON File has been updated!!");
  });
};

export const getSharedRecords = (userId: number): any[] => {
  // const id = parseInt(userId);

  //Reading both the databases
  const shared_objs: any[] = JSON.parse(
    fs.readFileSync(FILE_PATH_SHARED, "utf8")
  );
  const users: any[] = JSON.parse(fs.readFileSync(FILE_PATH_TODO, "utf8"));

  //Intialized empty array to append records
  var response: any[] = [];

  // const sharedTodomaps = shared_objs.filter(
  //   (sharedMap) => sharedMap.to === userId
  // );

  // return users.reduce((result, user) => {
  //   if (
  //     sharedTodomaps.some((sharedTodomap) => sharedTodomap.from === user.id)
  //   ) {
  //     const sharedTodos = user.todos.filter((todo: { id: any }) =>
  //       sharedTodomaps.some((sharedTodomap) => sharedTodomap.todoId === todo.id)
  //     );
  //     result = result.push(...sharedTodos);
  //   }
  //   return result;
  // }, []);

  for (var i: number = 0; i < shared_objs.length; i++) {
    if (shared_objs[i].to === userId) {
      var fromid: number = shared_objs[i].from; //userId
      var todoId: number = shared_objs[i].todoId; //todoID

      response.push(users[fromid - 1].todos[todoId - 1]); //Appending objects to repsonse variable
    }
  }
  return response;
};
