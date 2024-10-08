import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AppointmentService } from '../../services/appointment.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-appointment',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './book-appointment.component.html',
  styleUrl: './book-appointment.component.scss',
})
export class BookAppointmentComponent implements OnInit {
  appointmentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private authService: AuthService,
    private router: Router
  ) {
    this.appointmentForm = this.fb.group({
      appointmentDateTime: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // No need to set userId here, we'll do it in onSubmit
  }

  onSubmit() {
    if (this.appointmentForm.valid) {
      const appointmentData = {
        ...this.appointmentForm.value,
        userId: this.authService.getCurrentUserId(),
        status: 'Scheduled',
      };

      console.log('Appointment data being sent:', appointmentData);
      this.appointmentService.createAppointment(appointmentData).subscribe({
        next: (response) => {
          console.log('Appointment booked successfully', response);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Failed to book appointment', error);
          if (error.error && error.error.errors) {
            console.log('Validation errors:', error.error.errors);
          }
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
