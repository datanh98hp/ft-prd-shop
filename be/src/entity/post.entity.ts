import { User } from "src/entity/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({})
    title: string;
    @Column({})
    subtitle: string;
    @Column({})
    slug: string;
    @Column({ nullable: true })
    thumb: string;
    @Column({ type: 'text' })
    content: string;

    @ManyToOne(() => User, (user) => user.photos)
    user: User;
    
    @CreateDateColumn({ nullable: true })
    created_at: Date
    @UpdateDateColumn({ nullable: true })
    updated_at: Date
    

}
