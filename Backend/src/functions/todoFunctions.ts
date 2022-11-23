import { getEntities, saveEntity } from "./common";
import { v4 as uuidv4 } from "uuid";

interface todoObj {
  todoId: string;
  title: string;
  desc: string;
}

const TODO: string = "todos";

export function readDataFromTodos() {
  return getEntities(TODO);
}

export const getTodos = (userId: string): any[] => {
  const todo_records = getEntities(TODO);
  return todo_records[userId];
};

export const getTodoById = (userId: string, todoId: string) => {
  const userTodos = getTodos(userId);
  return userTodos.find((todo) => todo.todoId === todoId);
};

const recordGenerator = (title: string, desc: string): todoObj => {
  return {
    todoId: uuidv4(),
    title: title,
    desc: desc,
  };
};

export const saveTodo = (data: { id: number; title: string; desc: string }) => {
  let todo_records = getEntities(TODO);
  const todo_obj = recordGenerator(data.title, data.desc);
  if (todo_records.hasOwnProperty(data.id)) {
    let todos: todoObj[] = todo_records[data.id];
    todos = [...todos, todo_obj];
    todo_records[data.id] = todos;
  } else {
    let todos: todoObj[] = [todo_obj];
    todo_records[data.id] = todos;
  }
  saveEntity(TODO, JSON.stringify(todo_records));
};

export const destroyTodo = (userId: string, todoId: string) => {
  let todos = getEntities(TODO);
  const user_todos = todos[userId];
  const findIndex = user_todos.findIndex(
    (todo: todoObj) => todo.todoId === todoId
  );
  console.log("findIndex->" + findIndex);
  findIndex !== -1 && user_todos.splice(findIndex, 1);
  todos[userId] = user_todos;
  console.log(user_todos);
  saveEntity(TODO, JSON.stringify(todos));
};
