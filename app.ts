import express from "express"
import * as dotenv from "dotenv"
import cors from "cors"
import sequelize from "./persist/sequelize"
import routerConfig from "./routes/route.config"

dotenv.config()

sequelize.sync({force: true}) //cannot await this for some reason. I don't have time to look into this. (potentially we can recieve requests before the database is ready)

cors()

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
routerConfig(app)
app.listen(process.env.PORT)
