import { HttpException, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateAttendeeDto } from './dto/create-attendee.dto';
import { UpdateAttendeeDto } from './dto/update-attendee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendee } from './entities/attendee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AttendeeService {

  private readonly logger = new Logger(AttendeeService.name);
  
  constructor(
    @InjectRepository(Attendee)
    private readonly repository:Repository<Attendee>
  ) { }

  async findAll() {
    try {
      this.logger.log(`Finding all attendees`);
      return await this.repository.find();
    } catch (error) {
        this.logger.error(error);
        throw new HttpException(`Internal Server Error ${error.message}`, 500);
    }
  }

  async findOne(id: number) {
    
    this.logger.log(`Finding attendee with id ${id}`);

    try {
      const attendee = await this.repository.find({
        where: {
          id
        }
      });
  
      if(attendee.length === 0) {
        this.logger.warn(`Attendee with id ${id} not found`);
        throw new NotFoundException(`Attendee with id ${id} not found`);        
      }

      return attendee;

    } catch (error) {
      this.logger.error(error);
      throw new HttpException(`Internal Server Error ${error.message}`, 500);
    }

  }

  create(createAttendeeDto: CreateAttendeeDto) {
    try {

      this.logger.log(`Creating new attendee ${createAttendeeDto.name}, event_id: ${createAttendeeDto.event_id}`);
      this.repository.save(createAttendeeDto);  
    } catch (error) {
      this.logger.log(error);
      throw new HttpException(`Internal Server Error ${error.message}`, 500);
    }
    
  }

  update(id: number, updateAttendeeDto: UpdateAttendeeDto) {
    return `This action updates a #${id} attendee`;
  }

  remove(id: number) {
    return `This action removes a #${id} attendee`;
  }
}
