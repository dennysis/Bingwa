import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { InteractionService } from './interaction.service';
import { Interaction } from './interaction.entity';

@Controller('crm/interactions')
export class InteractionController {
  constructor(private readonly interactionService: InteractionService) {}

  @Get()
  findAll(): Promise<Interaction[]> {
    return this.interactionService.findAll();
  }
//   @Get('search')
// search(@Query('criteria') criteria: string): Promise<Interaction[]> {
//   return this.interactionService.findByCriteria(criteria);
// }
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Interaction> {
    return this.interactionService.findOne(id);
  }

  @Post()
  create(@Body() interaction: Interaction): Promise<Interaction> {
    return this.interactionService.create(interaction);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() interaction: Interaction): Promise<Interaction> {
    return this.interactionService.update(id, interaction);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.interactionService.delete(id);
  }
}