import { Appointment } from "./Appointment";

export class Tattooist {
  id: number;
  name: string;
  speciality: string;
  availability: boolean;
  appointments: Appointment[];

  constructor() {
    this.id = 0;
    this.name = '';
    this.speciality = '';
    this.availability = false;
    this.appointments = [];
  }
}
