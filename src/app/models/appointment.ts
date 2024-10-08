export interface Appointment {
  appointmentId?: number;
  userId?: number;
  appointmentDateTime: Date;
  description: string;
  status: string;
}
