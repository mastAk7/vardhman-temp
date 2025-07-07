import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';


import productsRouter from './routes/products.routes.js'
import aboutRouter from './routes/about.routes.js'
import solutionsRouter from './routes/solutions.routes.js'
import newsRouter from './routes/news.routes.js'
import contactRouter from './routes/contact.routes.js'
import careersRouter from './routes/careers.routes.js'
import searchRouter from './routes/search.routes.js'
import METARRouter from './routes/METAR.routes.js'
import homeRouter from './routes/home.routes.js'
import povRouter from './routes/pov.routes.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const app = express();

app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

app.use(session({
    secret: 'vardhman-secret-key', // Change this to a secure secret
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to true if using HTTPS
}));


app.use("/",homeRouter);
app.use("/",productsRouter);
app.use("/about",aboutRouter);
app.use("/solutions",solutionsRouter);
app.use("/news",newsRouter);
app.use("/careers",careersRouter);
app.use("/contact",contactRouter);
app.use("/search",searchRouter);
app.use("/metar",METARRouter);
app.use("/pov",povRouter);


app.listen(PORT, ()=> {
    console.log(`http://localhost:${PORT}`);
})