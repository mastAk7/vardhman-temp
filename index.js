import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import FileStore from 'session-file-store';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';


const fileStore = FileStore(session);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10000, // limit each IP to 100 requests
});


import productsRouter from './routes/products.routes.js'
import aboutRouter from './routes/about.routes.js'
import solutionsRouter from './routes/solutions.routes.js'
import newsRouter from './routes/news.routes.js'
import contactRouter from './routes/contact.routes.js'
import careersRouter from './routes/careers.routes.js'
import searchRouter from './routes/search.routes.js'
// import METARRouter from './routes/METAR.routes.js'
import homeRouter from './routes/home.routes.js'
import povRouter from './routes/pov.routes.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 4444;
const app = express();

app.disable('x-powered-by');
app.use(helmet());
app.use(limiter);
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))
app.use(express.json({ limit: '10kb' }));
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(session({
    secret: 'vardhman-secret-key',
    resave: false,
    saveUninitialized: false,
    store: new fileStore({
        path: './sessions',
        ttl: 86400 // 1 day
    }),
    cookie: {
        secure: false, // Set to false for development, true for production with HTTPS
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}));


app.use("/", homeRouter);
app.use("/about", aboutRouter);
app.use("/solutions", solutionsRouter);
app.use("/news", newsRouter);
app.use("/careers", careersRouter);
app.use("/contact", contactRouter);
app.use("/search", searchRouter);
// app.use("/metar",METARRouter);
app.use("/pov", povRouter);
app.use("/", productsRouter);


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})