import { Controller, Delete, Get, Post, Patch, Param, Body, HttpCode, Injectable } from '@nestjs/common';
import { CreateEventDto } from './create-event.dto';
import { UpdateEventDto } from './update-event.dto';
import { Event } from './event.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('/events')
export class EventsController {

  constructor(
    @InjectRepository(Event)
    private readonly repository:Repository<Event>
  ) { }

  private events:Event[] = [];


  @Get()
  async findAll(){
    return await this.repository.find();
  }

  @Get(':id')
  async findOne(@Param('id') id){

    const event = await this.repository.findOne(id);
    return event;

  }

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

    await this.repository.remove(event);
    
  }
}
