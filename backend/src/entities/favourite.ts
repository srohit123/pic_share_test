import { Entity, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, PrimaryGeneratedColumn, Index } from "typeorm"
import { Image } from "./image"
import { User } from "./user"

@Entity("favourite_images")
@Index(['user', 'image'], { unique: true })
export class FavouriteImage {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(type => Image, image => image.favouriteImage) image: Image;

  @ManyToOne(type => User, user => user.favouriteImages) user: User; 

  @CreateDateColumn()
  created_date: Date;

  @UpdateDateColumn()
  updated_date: Date;
}
