let mongo = require('../../utils/persistence/mongodb');
import AzitoError from "../../utils/errors/AzitoError";

class Todo {
  constructor(id, title, createdTime, todoTime, snoozeCount) {
    this.id = id;
    this.title = title;
    this.createdTime = createdTime;
    this.todoTime = todoTime;
    this.snoozeCount = snoozeCount;
  }

  setId(id) {
    this.id = id;
  }

  getAsJSON() {
    return {
      id: this.id,
      title: this.title,
      createdTime: this.createdTime,
      todoTime: this.todoTime,
      snoozeCount: this.snoozeCount
    }
  }

  getDBJSON() {
    return {
      title: this.title,
      createdTime: this.createdTime,
      todoTime: this.todoTime,
      snoozeCount: this.snoozeCount
    }
  }

  static getTodos(userName, version) {
    return new Promise((resolve, reject) => {
      var todos = [];
      mongo.getUserDb(userName).collection('todos').find().limit(100).forEach(doc => {
        if (doc) {
          var todoObject = new Todo(doc._id, doc.title, doc.createdTime, doc.todoTime, doc.snoozeCount);
          todos.push(todoObject.getAsJSON(version));
        } else {
          reject(new AzitoError("AZITO_SERVER_500"))
        }
      },()=>{
        resolve(todos);
      });
    });
  }


  static addTodo(userName, todo, version) {
    return new Promise((resolve, reject) => {
      var todoObject = new Todo(null, todo.title, new Date().getTime(), todo.todoTime, 0);
      mongo.getUserDb(userName).collection('todos').insertOne(todoObject.getDBJSON("v1"), (err, doc) => {
        if (err || doc == null) {
          reject(new AzitoError("AZITO_SERVER_500"))
        } else {
          console.log(doc.ops[0]._id)
          todoObject.setId(doc.ops[0]._id);
          resolve(todoObject.getAsJSON(version));
        }
      })
    });
  }


}
export default Todo