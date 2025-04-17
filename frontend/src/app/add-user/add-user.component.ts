import { Component, inject } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  username: string = '';
  password: string = '';
  private userService = inject(UserService);
  private router = inject(Router);

  addUser(): void {
    const user = { username: this.username, password: this.password };
    this.userService.createUser(user).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
