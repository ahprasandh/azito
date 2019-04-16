import Todo from "../../model/azito/todo";
import AzitoResponse from '../../utils/azito/AzitoResponse'

export function getAllTodos(req, res, next) {
  Todo.getTodos(req.session.user.userName,"v1").then(todosCollection => {
    res.status(200).send(new AzitoResponse("todos",todosCollection,req).getResponse());
  }).catch(err =>next(err));
  
}

export function createTodo(req, res, next) {
  Todo.addTodo(req.session.user.userName,req.body,"v1").then(todo => {
    res.status(201).send(todo);
  }).catch(err =>next(err));
}