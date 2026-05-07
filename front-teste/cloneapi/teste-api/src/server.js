import 'dotenv/config';
import express from 'express';
import Routes from './routes/index.js';
import './models/index.js'
import fileUpload from 'express-fileupload';
import cors from 'cors';

const app = express();
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
}));
app.use(express.json({ limit: '50mb' }));
app.use(fileUpload({
  createParentPath: true,
}));
app.use('/public', express.static('public'))

Routes(app);
app.use((req, res) => {
  return res.status(404).send('f')
});
app.listen(process.env.API_PORT, () => {
  console.log('sistema rodando na porta ' + process.env.API_PORT);
});
