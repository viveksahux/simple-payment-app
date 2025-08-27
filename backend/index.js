import express from 'express';
import env from './config.js'
import cors from 'cors';

import mainRouter from './routes/main.js'

const app = express();
const PORT = env.PORT;
app.use(cors());
app.use(express.json());


app.use("/api/v1", mainRouter)

app.listen(PORT, ()=>{
    console.log(`Server Running on port : ${PORT}`);
})