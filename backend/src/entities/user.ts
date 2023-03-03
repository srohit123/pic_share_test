import { Entity, Column, CreateDateColumn, UpdateDateColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { FavouriteImage } from "./favourite"
import { Image } from "./image"

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  username: string;

  @OneToMany(type => Image, image => image.user) images: Image[]; 

  @OneToMany(type => FavouriteImage, favouriteImage => favouriteImage.user) 
  favouriteImages: FavouriteImage[]; 

  @CreateDateColumn()
  created_date: Date;

  @UpdateDateColumn()
  updated_date: Date;
}
