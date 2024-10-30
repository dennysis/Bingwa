import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { LeadModule } from './lead/lead.module';
import { CustomerModule } from './customer/customer.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { ProjectModule } from './project/project.module';
import { InteractionModule } from './interaction/interaction.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', // or '127.0.0.1'
      port: 3306,
      username: 'dennysis',
      password: 'Passcore2024!',
      database: 'dennysis',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    CustomerModule,
    LeadModule,
    RoleModule,
    ProjectModule,
    InteractionModule,
  ],
})
export class AppModule {}
