import { Appointment } from "./Appointment";
import { UserRole } from "./User_Role";

export class User {
  id: number;
  name: string;
  username: string;
  password: string;
  email: string;
  street: string;
  number: string;
  zipCode: string;
  locked: boolean;
  disabled: boolean;
  roles: UserRole[];
  appointments: Appointment[];

  constructor() {
    this.id = 0;
    this.name = '';
    this.username = '';
    this.password = '';
    this.email = '';
    this.street = '';
    this.number = '';
    this.zipCode = '';
    this.locked = false;
    this.disabled = false;
    this.roles = [];
    this.appointments = [];
  }
}
