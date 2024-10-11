import { MikroORM } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { defineConfig } from '@mikro-orm/mysql'; 

export const orm = await MikroORM.init(defineConfig({
    entities: ['dist/**/*.entity.js'],
    entitiesTs: ['dist/**/*.entity.ts'],
    dbName: 'sysvol',
    clientUrl: 'mysql://root:12345@localhost:3382/sysvol',
    highlighter: new SqlHighlighter(),
    debug: true,
    schemaGenerator: {
        disableForeignKeys: true,
        createForeignKeyConstraints: true,
        ignoreSchema: [],
    },
}));

export const syncSchema = async () => {
    const generator = orm.getSchemaGenerator();
    /* 
     await generator.dropSchema()
     await generator.createSchema()
    */
    await generator.updateSchema();
};