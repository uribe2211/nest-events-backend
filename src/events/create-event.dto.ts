import { IsDateString, IsString, Length } from "class-validator";

export class CreateEventDto{
    @IsString()
    @Length(5, 100,{message:'The name length must be between 5 and 100 characters'})
    name: string;

    @Length(5, 100,{message:'The description length must be between 5 and 100 characters'})
    description: string;

    @IsDateString()
    when: string;

    @Length(5, 100,{groups:['create'],message:'The address length must be between 5 and 100 characters'})
    @Length(10, 100,{groups:['update'],message:'The address length must be between 10 and 100 characters'})
    address: string;
};