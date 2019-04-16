var router = require('express').Router();
import * as usersController from "../controller/users.controller";
import * as errorController from "../controller/error.controller";
import * as productmapController from "../controller/azito/productmap.controller"
import * as settingsController from "../controller/azito/settings.controller"
import * as todosController from "../controller/azito/todos.controller"
import securityRules from "./apiRules";

require('../utils/security/routeValidator').initRules(securityRules);
router.use(require('../utils/security/routeValidator').routeValidator);

//Routing starts here
router.route('/v1/users/me')
  .get(usersController.getMyinfo)
  .put(usersController.updateMyinfo).delete(usersController.closeAccount);

router.route('/v1/productmap').get(productmapController.getProductmap)
router.route('/v1/settings').get(settingsController.getSettings).patch(settingsController.saveSettings);

router.route('/v1/todos')
  .get(todosController.getAllTodos)
  .post(todosController.createTodo);

router.use(errorController.errorAPI);

module.exports = router;