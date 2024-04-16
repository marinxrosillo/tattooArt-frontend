import { Appointment } from "./Appointment";

export class TattooList {
  id: number;
  name: string;
  description: string;
  color: boolean;
  size: string;
  price: number;
  file: string;
  appointments: Appointment[];

  constructor() {
    this.id = 0;
    this.name = '';
    this.description = '';
    this.color = false;
    this.size = '';
    this.price = 0;
    this.file = '';
    this.appointments = [];
  }
}
