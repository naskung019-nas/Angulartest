import axios, { AxiosResponse } from 'axios';

export class ShiftService {
  private baseUrl: string = 'http://localhost:3000';

  async addShift(newShift: any): Promise<AxiosResponse<any>> {
    return await axios.post(`${this.baseUrl}/addRecord`, newShift);
  }

  async loadShifts(): Promise<AxiosResponse<any>> {
    return await axios.get(`${this.baseUrl}/getRecord`);
  }
}
