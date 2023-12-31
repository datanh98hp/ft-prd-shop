import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Country {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    code: string;
    @Column()
    country_name: string;
}
