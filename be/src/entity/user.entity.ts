import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
    created_at: Date
    @UpdateDateColumn({ nullable: true })
    updated_at: Date

}