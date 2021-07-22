import  { Router } from 'express';
import AuthController from './controllers/AuthController';
import PermissionController from './controllers/PermissionController';
import ProductController from './controllers/ProductController';
import RoleController from './controllers/RoleController';
import UserController from './controllers/UserController';
import { is } from './middlewares/authMiddleware';
// import authMiddleware from './middlewares/authMiddleware';

const router = Router();

router.post("/login", AuthController.authenticate);

router.post("/users", UserController.create);
router.get("/users", UserController.index);

router.get("/roles", RoleController.index);
router.post("/roles", RoleController.create);

router.get("/permissions", PermissionController.index);
router.post("/permissions", PermissionController.create);

router.get("/products", is(["admin"]), ProductController.index);
router.post("/products", is(["admin"]), ProductController.create);

export default router;