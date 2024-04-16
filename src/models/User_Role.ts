import { User } from "./User";

export class UserRole {
  idUserRole: number;
  role: string;
  grantedDate: Date | null;
  user: User | null;

  constructor() {
    this.idUserRole = 0;
    this.role = '';
    this.grantedDate = null;
    this.user = null;
  }
}
