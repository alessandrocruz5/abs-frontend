import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appointment } from '../models/appointment';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private apiUrl = 'https://localhost:7238/api/Appointment';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.apiUrl);
  }

  getAppointment(appointmentId: number): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.apiUrl}/${appointmentId}`);
  }

  getUserAppointments(): Observable<any> {
    const userId = this.authService.getCurrentUserId();
    return this.http.get<any>(`${this.apiUrl}/user/${userId}`);
  }

  createAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http
      .post<Appointment>(this.apiUrl, appointment)
      .pipe(catchError(this.handleError));
  }

  updateAppointment(
    appointmentId: number,
    appointment: Appointment
  ): Observable<Appointment> {
    return this.http
      .put<Appointment>(`${this.apiUrl}/${appointmentId}`, appointment)
      .pipe(catchError(this.handleError));
  }

  deleteAppointment(id: number): Observable<any> {
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error occurred
      console.error('An error occurred:', error.error.message);
    } else {
      // Backend returned an unsuccessful response code
      console.error(
        `Backend returned code ${error.status}, ` +
          `body was: ${JSON.stringify(error.error)}`
      );
    }
    // Return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
