import { TypeOrmModuleOptions } from "@nestjs/typeorm"
import { Event } from "../events/event.entity";
import { registerAs } from "@nestjs/config";

export default registerAs(
    'ormconfig',
    ():TypeOrmModuleOptions=>(
    {
        type:'mysql',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [Event],
        synchronize: false,
}));