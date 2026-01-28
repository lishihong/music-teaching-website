export interface BookingFormData {
  courseId: string;
  studentName: string;
  phone: string;
  email: string;
  preferredDate: string;
  timeSlot: string;
  message?: string;
}

export interface Booking extends BookingFormData {
  id: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
}
