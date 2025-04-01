import express from "express";
import dotenv from "dotenv";
import cors from 'cors'


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({origin:'*',allowedHeaders: ['Content-Type', 'Authorization'],credentials:true}
))
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello, Express with TypeScript!");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
