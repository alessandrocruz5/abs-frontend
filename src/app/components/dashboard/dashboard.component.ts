import { Component } from '@angular/core';
import { Appointment } from '../../models/appointment';
import { AppointmentService } from '../../services/appointment.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  appointments: Appointment[] = [];

  constructor(
    private appointmentService: AppointmentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUserAppointments();
  }

  loadUserAppointments() {
    this.appointmentService.getUserAppointments().subscribe({
      next: (data) => {
        this.appointments = data;
      },
      error: (error) => {
        console.error('Failed to load appointments', error);
      },
    });
  }

  loadAppointments() {
    this.appointmentService.getAppointments().subscribe(
      (appointments) => {
        this.appointments = appointments;
        console.log(this.appointments);
      },
      (error) => {
        console.error('Failed to load appointments', error);
      }
    );
  }

  // trackByAppointment(index: number, appointment: any): number {
  //   return appointment.id;
  // }

  // editAppointment(appointment: Appointment) {
  //   // You might want to open a modal or navigate to an edit page here
  //   // For this example, we'll just update the appointment directly
  //   const updatedAppointment: Appointment = {
  //     ...appointment,
  //     description: 'Updated description', // Replace with actual updated data
  //   };

  //   this.appointmentService
  //     .updateAppointment(appointment.id!, updatedAppointment)
  //     .subscribe({
  //       next: (response) => {
  //         console.log('Appointment updated successfully', response);
  //         this.loadUserAppointments();
  //       },
  //       error: (error) => {
  //         console.error('Failed to update appointment', error);
  //       },
  //     });
  // }

  // deleteAppointment(id: number) {
  //   this.appointmentService.deleteAppointment(id).subscribe({
  //     next: (response) => {
  //       console.log('Appointment deleted successfully', response);
  //       this.loadUserAppointments();
  //     },
  //     error: (error) => {
  //       console.error('Failed to delete appointment', error);
  //     },
  //   });
  // }

  editAppointment(appointmentId: number) {
    this.router.navigate(['/edit-appointment', appointmentId]);
  }

  deleteAppointment(appointment: Appointment) {
    if (appointment.appointmentId === undefined) {
      console.error('Cannot delete appointment without an ID', appointment);
      return;
    }

    console.log('Attempting to delete appointment:', appointment.appointmentId);
    if (confirm('Are you sure you want to delete this appointment?')) {
      console.log('Deletion confirmed, calling API...');
      this.appointmentService
        .deleteAppointment(appointment.appointmentId)
        .subscribe({
          next: () => {
            console.log('Appointment deleted successfully');
            this.loadUserAppointments();
          },
          error: (error) => {
            console.error('Failed to delete appointment', error);
          },
        });
    } else {
      console.log('Deletion cancelled');
    }
  }
}
