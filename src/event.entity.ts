import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Event{
    @PrimaryColumn()
    id: number;

    @Column('varchar', {length: 100})
    name: string;
    
    @Column('varchar', {length: 1000})
    description: string;

    @Column('date', {nullable: true})
    when: Date;

    @Column('varchar', {length: 1000})
    address: string;
}