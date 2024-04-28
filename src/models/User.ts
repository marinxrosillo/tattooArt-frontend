import { Appointment } from "./Appointment";

export class User {
  id: number;
  name: string;
  username: string;
  password: string;
  email: string;
  isAdmin: boolean;
  locked: boolean;
  disabled: boolean;
  appointments: Appointment[];

  constructor() {
    this.id = 0;
    this.name = '';
    this.username = '';
    this.password = '';
    this.email = '';
    this.isAdmin = false;
    this.locked = false;
    this.disabled = false;
    this.appointments = [];
  }
}
