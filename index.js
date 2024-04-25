import express from 'express';
import { connected } from './DB/db.js';
import { AuthRoutes } from './Routers/Auth.Routes.js';
import { bookRoutes } from './Routers/Book.Routes.js';

const app = express();
app.use(express.json());
app.use("/users",AuthRoutes);
app.use("/books",bookRoutes);

app.get('/',(req,res)=>{
    res.json({msg:"heyyy!"})
})

app.listen(8080,async ()=>{
    try {
        console.log("server is connected");
        await connected;
        console.log('db is connected')
    } catch (error) {
        console.log(error);
    }
})