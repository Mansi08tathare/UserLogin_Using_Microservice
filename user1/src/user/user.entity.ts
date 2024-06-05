import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'user'})
export class User
{
@PrimaryGeneratedColumn()
id:number;

@Column()
Name:string;

@Column()
Email:string;

@Column()
Password:string;

}