import { Booking, BookingFormData } from '@/types/booking';

export class BookingService {
  private bookings: Booking[] = [];

  async createBooking(formData: BookingFormData): Promise<Booking> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const booking: Booking = {
          ...formData,
          id: `booking-${Date.now()}`,
          status: 'pending',
          createdAt: new Date().toISOString()
        };
        this.bookings.push(booking);
        resolve(booking);
      }, 300);
    });
  }

  async getBookingById(id: string): Promise<Booking | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const booking = this.bookings.find(b => b.id === id);
        resolve(booking || null);
      }, 100);
    });
  }

  async getUserBookings(): Promise<Booking[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.bookings), 100);
    });
  }
}

export const bookingService = new BookingService();
