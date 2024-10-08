export interface User {
  id?: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  preferredContactMethod: string;
  isEmailVerified: boolean;
}
