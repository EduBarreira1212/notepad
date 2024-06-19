import { Redis } from "ioredis";

let instance;

export const getRedisInstance = () => {
    if(!instance){
        instance = new Redis({
            host: "redis-15251.c276.us-east-1-2.ec2.redns.redis-cloud.com",
            port: "15251",
            username: "default",
            password: process.env.DB_PASSWORD
        });
    
        instance.on('connect', () => console.log("Redis connected"));
        instance.on("error", (error) => console.log("Redis error", error));
    }
    

    return instance;
}