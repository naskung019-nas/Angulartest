import axios, { AxiosResponse } from 'axios';

export class AuthService {
  private baseUrl: string = 'http://localhost:3000/api';

  async login(value: any): Promise<AxiosResponse<any>> {
    try {
      const response = await axios.post(`${this.baseUrl}/login`, value);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async register(value: any): Promise<AxiosResponse<any>> {
    try {
      const response = await axios.post(`${this.baseUrl}/register`, value);
      return response;
    } catch (error) {
      throw error;
    }
  }
}
