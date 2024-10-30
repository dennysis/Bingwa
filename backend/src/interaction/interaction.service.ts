import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Interaction } from './interaction.entity';

@Injectable()
export class InteractionService {
  constructor(
    @InjectRepository(Interaction)
    private interactionsRepository: Repository<Interaction>,
  ) {}

  findAll(): Promise<Interaction[]> {
    return this.interactionsRepository.find();
  }

  findOne(id: number): Promise<Interaction | null> {
    return this.interactionsRepository.findOne({ where: { id } });
  }

  create(interaction: Interaction): Promise<Interaction> {
    return this.interactionsRepository.save(interaction);
  }

  async update(id: number, interaction: Interaction): Promise<Interaction> {
    await this.interactionsRepository.update(id, interaction);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.interactionsRepository.delete(id);
  }
}