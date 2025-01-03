import { Module } from '@nestjs/common';
import { AppController } from 'src/controllers/AppController';

@Module({
  // imports: [
  //   ConfigModule.forRoot(),
  //   JwtModule.register(JwtConfig.register()),
  //   TypeOrmModule.forRoot(DatabaseConfig.get()),
  //   TypeOrmModule.forFeature([UsersEntity, BarberEntity, BarberShopsEntity]),
  // ],
  // controllers: [AppController, UsersController, AuthController, BarberController, BarberShopsController],
  // providers: [UsersService, UserRepository, AuthService, BarberShopsService, BarberRepository, BarberShopsRepository, BarberService],
  controllers: [AppController],
})
export class AppModule {}
