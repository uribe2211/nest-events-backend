import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Attendee } from "../attendee/entities/attendee.entity";

@Entity()
export class Event{
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', {length: 100})
    name: string;
    
    @Column('varchar', {length: 1000})
    description: string;

    @Column('date', {nullable: true})
    when: Date;

    @Column('varchar', {length: 1000})
    address: string;

    @OneToMany( () => Attendee, (attendee) => attendee.event,{nullable: false})
    attendees: Attendee[];
}