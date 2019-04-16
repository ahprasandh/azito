var router = require('express').Router();
import * as loginController from "../controller/login.controller";
import * as appController from "../controller/app.controller";
import * as errorController from "../controller/error.controller";
import securityRules from "./homeRules";


require('../utils/security/routeValidator').initRules(securityRules);
router.use(require('../utils/security/routeValidator').routeValidator);

//Routing starts here
router.get('/', appController.rootRedirect);
router.get("/login", loginController.loadLoginForm);
router.post('/auth/login', loginController.loginUser);

router.post('/auth/signup', loginController.signupUser);

router.post('/auth/logout', loginController.logoutUser);

router.get('/accounts', appController.loadIAM_UI);
// route for user signup
router.route('/signup')
  .get(loginController.loadLoginForm)
  .post(loginController.signupUser);

router.get('/app', appController.loadApp);

router.use(errorController.errorUI);

module.exports = router;