import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();


app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());


//cors allow origin
app.use(cors({
    origin: ["http://localhost:3000"], //pour le frontend
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true
}));



export default app;