import express, { Express } from "express";
import multer from "multer";
import { jwtCheck, jwtParse } from "../middleware/auth";
import MyRestaurantController from "../controllers/MyRestaurantController";
import { validateMyRestaurantRequest } from "../middleware/validation";
const router = express.Router();
const storage = multer.memoryStorage();

const upload = multer({
    storage:storage,
    limits:{
        fileSize:5*1024*1024,
    },
});

router.get("/",jwtCheck,jwtParse,MyRestaurantController.getMyRestaurant);

router.post("/",upload.single("imageFile"),
    validateMyRestaurantRequest,jwtCheck,jwtParse,
 MyRestaurantController.createMyRestaurant   
);

router.put(
    "/",
    upload.single("imageFile"),
    validateMyRestaurantRequest,
    jwtCheck,
    jwtParse,
    MyRestaurantController.updateMyRestaurant
  );

  router.get(
    "/order",
    jwtCheck,
    jwtParse,
    MyRestaurantController.getMyRestaurantOrders
  );
  
  router.patch(
    "/order/:orderId/status",
    jwtCheck,
    jwtParse,
    MyRestaurantController.updateOrderStatus
  );
  
export default router;
