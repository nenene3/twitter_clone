import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from 'cors'
import {router as postRouter} from "./routes/postRouter";
import cookieParser from "cookie-parser";
import  authRouter from "./routes/authRouter";


dotenv.config();
export const app = express();

// Middleware
app.use(cors({origin:'*',allowedHeaders: ['Content-Type', 'Authorization'],credentials:true}
))


app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use((req,res,next)=>{
  console.log(req.cookies)
  next()
})


// Routes

app.use('/api/posts',postRouter)
app.use('/api/auth',authRouter)

app.get("/", (req, res) => {
  res.send("Hello, Express with TypeScript!");
});


app.use(errorHandler)
app.use(notFound)