import { Controller, Delete, Get, Post, Patch, Param, Body, HttpCode, ParseIntPipe,  UsePipes, Logger, HttpException, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './create-event.dto';
import { UpdateEventDto } from './update-event.dto';
import { Event } from './event.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('/events')
export class EventsController {
  private readonly logger = new Logger(EventsController.name);

  constructor(
    @InjectRepository(Event)
    private readonly repository:Repository<Event>
  ) { }


  @Get()
  async findAll(){
    try {
      this.logger.log(`Finding all event`);
      return await this.repository.find();  
    } 
    catch (error) {

        this.logger.log(error);
        throw new HttpException(`Internal Server Error ${error.message}`, 500);
      }    
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id){
    
    const event = await this.repository.find({
      where: {
        id
      }
    });

    if(!event){
      throw new NotFoundException(`Event with id ${id} not found`);
    }

    return event;

  }

  @UsePipes()
  @Post()
  @HttpCode(201)
  async create(@Body() input:CreateEventDto) {
    
    const event={
      ... input,
      when: new Date(input.when)
    }

    this.repository.save(event);
    
    return event;

  }

  @Patch(':id')
  async update(@Param('id') id, @Body() input:UpdateEventDto) {
    
    const event =await this.repository.findOne(id);

    if(!event){
      throw new NotFoundException(`Event with id ${id} not found`);
    }

    return await this.repository.save(   {
      ... event,
      ... input,
      when: input.when? new Date(input.when): event.when
    })
      
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id) {

    const event=await this.repository.findOne(id);

    if(!event){
      throw new NotFoundException(`Event with id ${id} not found`);
    }

    await this.repository.remove(event);
    
  }
}
