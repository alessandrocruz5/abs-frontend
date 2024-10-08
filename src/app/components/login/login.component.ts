import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { firstValueFrom, tap, catchError } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  token: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  // onSubmit() {
  //   this.authService.login(this.username, this.password, this.token).subscribe(
  //     (response) => {
  //       console.log('Login successful', response);
  //       localStorage.setItem('token', response.token);
  //       this.router.navigate(['/dashboard']);
  //     },
  //     (error) => {
  //       console.error('Login failed', error);
  //     }
  //   );
  // }

  async onSubmit() {
    try {
      const response = await firstValueFrom(
        this.authService.login(this.username, this.password).pipe(
          tap((response) => {
            console.log('Login successful', response);
            localStorage.setItem('token', response.token);
          }),
          catchError((error) => {
            console.error('Login failed', error);
            throw error;
          })
        )
      );
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error('Login failed', error);
    }
  }
}
