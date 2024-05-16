import { TattooList } from "./TattooList";
import { Tattooist } from "./Tattooist";
import { User } from "./User";

export class Appointment {
  id: number;
  date: Date | null;
  time: string;
  status: boolean;
  user: string | null;
  tattooList: TattooList | null;
  tattooIst: Tattooist | null;

  constructor() {
    this.id = 0;
    this.date = null;
    this.time = '';
    this.status = false;
    this.user = '';
    this.tattooList = null;
    this.tattooIst = null;
  }
}
