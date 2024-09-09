import { Sequelize } from "sequelize"

const sequelize = new Sequelize('sqlite::memory:') // I'm using sqlite in memory to save some time
export default sequelize