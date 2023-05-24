import * as dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;

const MONGODB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@${process.env.DB_DOMAIN}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

export { PORT, MONGODB_URI, JWT_SECRET_KEY };