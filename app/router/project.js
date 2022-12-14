const fileUpload = require("express-fileupload");
const { ProjectController } = require("../http/controllers/project.controller");
const { checkLogin } = require("../http/middlewares/autoLogin");
const { expressValidatorMapper } = require("../http/middlewares/checkErrors");
const { createProjectValidator } = require("../http/validations/project");
const { mongoIDvalidator } = require("../http/validations/public");
const { uploadfile } = require("../modules/express-fileupload");

const router = require("express").Router();
router.post(
  "/create",
  fileUpload(),
  checkLogin,
  uploadfile,
  createProjectValidator(),
  expressValidatorMapper,
  ProjectController.createProject
);
router.get("/list", checkLogin, ProjectController.getAllProject);
router.get("/:id", checkLogin, mongoIDvalidator(), expressValidatorMapper, ProjectController.getProjectById);
router.delete("/remove/:id", checkLogin, mongoIDvalidator(), expressValidatorMapper, ProjectController.removeProject);
router.put("/edit/:id", checkLogin, mongoIDvalidator(), expressValidatorMapper, ProjectController.updateProject);
router.patch(
  "/update-image/:id",
  fileUpload(),
  checkLogin,
  uploadfile,
  mongoIDvalidator(),
  expressValidatorMapper,
  ProjectController.updateProjectImage
);
module.exports = {
  projectRoutes: router,
};
