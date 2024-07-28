import * as dotenv from "dotenv";
// import { dot } from "node:test/reporters";

dotenv.config();

export default () =>({
    port:parseInt(process.env.port, 10) || 3000 ,
    database:{
        username: process.env.MONGO_INITDB_ROOT_USERNAME,
        password: process.env.MONGO_INITDB_ROOT_PASSWORD,
        host: process.env.MONGO_HOST,
        port: parseInt(process.env.MONGO_PORT, 10) || 27017,
        dbName: process.env.MONGO_DB,
    }

})