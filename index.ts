import express, { Express } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import * as database from "./config/database";
import methodOverride from "method-override";
import cookieParser from "cookie-parser";

import clientRoute from "./routes/client/index.route";
import adminRoute from "./routes/admin/index.route";
import { systemConfig } from "./config/system";
import path from "path";

dotenv.config();
database.connect();

const app: Express = express();
const port: number = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

app.use(express.json());

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(cookieParser());

app.use(morgan('dev'));

app.locals.prefixAdmin = systemConfig.prefixAdmin;

clientRoute(app);
adminRoute(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});