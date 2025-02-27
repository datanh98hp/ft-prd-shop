import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class About {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ nullable: true })
    phone: string;
    @Column({ nullable: true })
    openTime: string;
    @Column({ nullable: true })
    email: string;
    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    fb: string;
    @Column({ nullable: true })
    instagram: string;
    @Column({ nullable: true })
    shopee: string;
    @Column({ nullable: true })
    tiki: string;
    @Column({ nullable: true })
    tiktok: string;

    @Column({ nullable: true })
    logo: string;

    @Column({ nullable: true })
    banners: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    // @CreateDateColumn({ nullable: true })
    // created_at: Date
    @UpdateDateColumn({ nullable: true })
    updated_at: Date

}