import dotenv from "dotenv";
dotenv.config();

export const config = {
   port: process.env.PORT,
   isProd: process.env.NODE_ENV  ?? "development",
   
}