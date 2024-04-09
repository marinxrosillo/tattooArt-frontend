import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  newUser: any = {};
  editingUser: any = null;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

  addUser(): void {
    this.userService.addUser(this.newUser)
      .subscribe(user => {
        this.users.push(user);
        this.newUser = {};
      });
  }

  editUser(user: any): void {
    this.editingUser = { ...user }; // Realiza una copia del usuario para edición
  }

  saveUser(): void {
    if (this.editingUser) {
      this.userService.editUser(this.editingUser)
        .subscribe(() => {
          // Actualiza el usuario editado en la lista
          const index = this.users.findIndex(user => user.id === this.editingUser.id);
          if (index !== -1) {
            this.users[index] = { ...this.editingUser };
          }
          this.editingUser = null;
        });
    }
  }

  cancelEdit(): void {
    this.editingUser = null;
  }

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId)
      .subscribe(() => {
        // Elimina el usuario de la lista
        this.users = this.users.filter(user => user.id !== userId);
      });
  }
}