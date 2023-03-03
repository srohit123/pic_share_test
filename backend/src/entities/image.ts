import { Entity, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { FavouriteImage } from "./favourite"
import { User } from "./user"

@Entity("images")
export class Image {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  url: string;

  @Column({ nullable: false })
  title: string;

  @ManyToOne(type => User, user => user.images) 
  user: User; 

  @OneToMany(type => FavouriteImage, favouriteImage => favouriteImage.image) 
  favouriteImage: FavouriteImage; 

  @CreateDateColumn()
  created_date: Date;

  @UpdateDateColumn()
  updated_date: Date;
}
