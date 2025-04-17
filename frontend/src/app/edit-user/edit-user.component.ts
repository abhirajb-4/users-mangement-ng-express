import { Component, inject } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports:[CommonModule, FormsModule],
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  username: string = '';
  password: string = '';
  id: string = '';
  private userService = inject(UserService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    // Fetch user data and populate the form
    this.userService.getUsers().subscribe((data: any) => {
      const user = data.find((user: any) => user._id === this.id);
      this.username = user.username;
      this.password = user.password;
    });
  }

  updateUser(): void {
    const user = { username: this.username, password: this.password };
    this.userService.updateUser(this.id, user).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
