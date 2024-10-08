import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { Appointment } from '../../models/appointment';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-edit-appointment',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './edit-appointment.component.html',
  styleUrl: './edit-appointment.component.scss',
})
export class EditAppointmentComponent implements OnInit {
  appointmentForm: FormGroup;
  appointmentId: number | null = null;
  currentAppointment: Appointment | null = null;

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.appointmentForm = this.fb.group({
      appointmentDateTime: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.appointmentId = +params['id'];
        this.loadAppointment(this.appointmentId);
      } else {
        console.error('No appointment ID provided');
        this.router.navigate(['/dashboard']);
      }
    });
  }

  loadAppointment(id: number) {
    this.appointmentService.getAppointment(id).subscribe({
      next: (appointment) => {
        this.currentAppointment = appointment;
        this.appointmentForm.patchValue({
          appointmentDateTime: appointment.appointmentDateTime,
          description: appointment.description,
        });
      },
      error: (error) => {
        console.error('Error loading appointment', error);
        this.router.navigate(['/dashboard']);
      },
    });
  }

  onSubmit() {
    if (
      this.appointmentForm.valid &&
      this.currentAppointment &&
      this.appointmentId
    ) {
      const updatedAppointment: Appointment = {
        ...this.currentAppointment,
        ...this.appointmentForm.value,
      };

      this.appointmentService
        .updateAppointment(this.appointmentId, updatedAppointment)
        .subscribe({
          next: () => {
            console.log('Appointment updated successfully');
            this.router.navigate(['/dashboard']);
          },
          error: (error) => console.error('Error updating appointment', error),
        });
    }
  }
}
