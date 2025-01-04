import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from 'src/common/configs/DatabaseConfig';
import { JwtConfig } from 'src/common/configs/JwtConfig';
import { AppController } from 'src/controllers/AppController';
import { UsersController } from 'src/controllers/UsersController';
import { UsersEntity } from 'src/entities/UsersEntity';
import { UserRepository } from 'src/repositories/UserRepository';
import { UsersService } from 'src/services/UsersService';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register(JwtConfig.register()),
    TypeOrmModule.forRoot(DatabaseConfig.get()),
    TypeOrmModule.forFeature([UsersEntity]),
  ],
  // controllers: [UsersController, AuthController, BarberController, BarberShopsController],
  // providers: [ AuthService, BarberShopsService, BarberRepository, BarberShopsRepository, BarberService],
  controllers: [AppController, UsersController],
  providers: [UsersService, UserRepository],
})
export class AppModule {}
