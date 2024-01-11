import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Event } from '../../events/event.entity';

@Entity()
export class Attendee {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;    

    @ManyToOne(() => Event, (event) => event.attendees,{nullable:false })     
    @JoinColumn(
        {
            name:'event_Id'            
        }
    )
    event:Event;
}