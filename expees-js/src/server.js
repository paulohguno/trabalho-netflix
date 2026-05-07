import 'dotenv/config';
import express from 'express'
import routes from './routes/index.js';
import './models/index.js'
import fileUpload from 'express-fileupload';
import cors from 'cors';
import path from 'path';

const app = express();
app.use(cors());


app.use('/media', express.static(path.join(process.cwd(), 'src', 'utils', 'images')));

app.use(express.json());
app.use(fileUpload({
    createParentPath: true
}))


routes(app)



app.use(cors());

app.listen(process.env.API_PORT, () => {
    console.log('sistema rodando na porta ' + process.env.API_PORT)
})

