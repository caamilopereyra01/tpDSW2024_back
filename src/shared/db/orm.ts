import { MikroORM } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { defineConfig } from '@mikro-orm/mysql'; 
import { clienteRouter } from '../../cliente/cliente.routes.js';

export const orm = await MikroORM.init(
  defineConfig({
    entities: ['dist/**/*.entity.js'], // Entidades compiladas en JavaScript
    entitiesTs: ['src/**/*.entity.ts'], // Entidades en TypeScript
    dbName: 'sysvol',
    clientUrl: 'mysql://root:12345@localhost:3382/sysvol',
    // también veo que podría escribirse:
    // clientUrl: process.env.DATABASE_URL,   y guardar la URL en .env (ver archivo env)
    highlighter: new SqlHighlighter(),
    debug: true,
    schemaGenerator: {
      disableForeignKeys: true,
      createForeignKeyConstraints: true,
      ignoreSchema: [],
    },
  })
);

const config = {
  entities: ['dist/**/*.entity.js'], // Entidades compiladas en JavaScript
  entitiesTs: ['src/**/*.entity.ts'], // Entidades en TypeScript
  dbName: 'sysvol',
  clientUrl: 'mysql://root:12345@localhost:3382/sysvol',
};
const start = async()=>{
    const orm = await MikroORM.init(config)
    const adminOptions = {
        
    }

}

export const syncSchema = async () => {
    const generator = orm.getSchemaGenerator();
    /* 
     await generator.dropSchema()
     await generator.createSchema()
    */
    await generator.updateSchema();
};
