import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { SharedModule } from './shared/shared.module';
import { SocketModule } from './socket/socket.module';
import { CacheModule, CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
export const RedisOptions: CacheModuleAsyncOptions = {
  isGlobal: true,
  useFactory: async () => {
    const store = await redisStore({
      url: process.env.REDIS_URL,
    });
    return {
      store: () => store,
      ttl: 86400000, // 1 day (remove this if you dont want to clear cache automatically)
    };
  },
};
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('PGHOST'),
        port: 5432,
        username: configService.get('PGUSER'),
        password: configService.get('PGPASSWORD'),
        database: configService.get('PGDATABASE'),
        timezone: 'Asia/Yangon',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: true,
        ssl: true
      }),
    }),
    SharedModule,
    CustomerModule,
    SocketModule,
    // CacheModule.registerAsync(RedisOptions)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
