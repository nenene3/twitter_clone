import express ,{Request,Response}from "express";
import * as authController from '../controllers/authController'
import { protectAuth, RequestWithUser } from "../middlewares/authMiddleWare";
import User from "../models/UserModel";

const router = express.Router()

router.get('/',(req,res)=>{
    console.log('hi')
    res.send('asdasdasd')
})

router.post('/login',authController.login)
router.post('/register',authController.register)

router.get('/protect',protectAuth,(req:RequestWithUser,res:Response)=>{
    console.log(req.user)
})

router.get('/users',async(req,res)=>{
    try{
         
        const users = await User.find().select('+password')
        res.json(users)

    }catch(e){
        res.json({error:'error'})
    }
})

router.get('/user',protectAuth,authController.getUser)
router.post('/logout',authController.logout)
router.get('/currentuser',protectAuth,authController.getcurrentuser)

export default router