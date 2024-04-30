import { Entity, Column, PrimaryGeneratedColumn, Unique, BeforeUpdate, AfterUpdate, AfterInsert, BeforeInsert } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Unique(["email"])
  email: string;

  @Column()
  password: string;

  @Column()
  created_at: Date = new Date();

  @Column()
  updated_at: Date = new Date();

  @BeforeInsert()
  private emailToLowerCase() {
    console.log("Before insert");
    this.email = this.email.toLowerCase();
    console.log(this);
  }

  @AfterInsert()
  private logInsert() {
    console.log("After insert ", this);
  }


  @BeforeUpdate()
  private logUpdate() {
    this.updated_at = new Date();
    console.log("Before update ", this);
  }

  @AfterUpdate()
  private updateDate() {
    console.log("After update ", this);
  }
};
