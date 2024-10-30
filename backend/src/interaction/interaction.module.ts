import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InteractionController } from './interaction.controller';
import { InteractionService } from './interaction.service';
import { Interaction } from './interaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Interaction])],
  controllers: [InteractionController],
  providers: [InteractionService],
})
export class InteractionModule {}