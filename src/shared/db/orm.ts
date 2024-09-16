import { MikroORM } from "@mikro-orm/core";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";

export const orm =  await MikroORM.init({
    entities: ['dist/**/*.entity.js'],
    entitiesTs : ['dist/**/*.entity.ts']

})


