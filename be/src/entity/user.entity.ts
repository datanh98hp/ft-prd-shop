import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Post } from "./post.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    usermame: string;

    @Column()
    password: string;

    @Column({ unique: true })
    email: string;
    @Column({ nullable: true, default: null })
    refresh_token: string
    @Column({ default: 'normal' })
    role: string;

    @Column({ nullable: true })
    profileImg: string;

    @Column({ type: 'text', nullable: true })
    bio: string
    @CreateDateColumn({ nullable: true })
    created_at: Date;
    @UpdateDateColumn({ nullable: true })
    updated_at: Date;

    @OneToMany(type => Post, post => post.author)
    posts: Post[];
}