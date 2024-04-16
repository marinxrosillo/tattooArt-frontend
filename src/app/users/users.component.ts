import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  user: any = null;
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

  getById(id: number): void {
    this.userService.getById(id)
      .subscribe(user => this.user = user);
  }

  createUser(): void {
    this.userService.createUser(this.newUser)
      .subscribe(user => {
        this.users.push(user);
        this.newUser = {};
      });
  }

  updateUser(user: any): void {
    this.editingUser = { ...user };
  }

  saveUser(): void {
    if (this.editingUser) {
      this.userService.updateUser(this.editingUser)
        .subscribe(() => {
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
        this.users = this.users.filter(user => user.id !== userId);
      });
  }
}
