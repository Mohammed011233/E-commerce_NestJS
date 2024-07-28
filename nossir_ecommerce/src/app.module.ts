import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import path from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { InventoryModule } from './inventory/inventory.module';
import dotenvConfig from './configration/dotenv.config';


@Module({
  imports: [
        // Load all configuration files from the config directory
    // ConfigModule.load(path.resolve(__dirname, 'configration', '*.ts')),

    ConfigModule.forRoot({
      load: [dotenvConfig],
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: `mongodb://${config.get('database.username')}:${config.get('database.password')}@${config.get('database.host')}:${config.get('database.port')}/`,
        dbName: `${config.get('database.dbName')}`,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService]
    }),

    InventoryModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  
}
