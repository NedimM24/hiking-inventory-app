//app.ts entry point
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import router from './routes/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
