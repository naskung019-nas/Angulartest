import axios, { AxiosResponse } from 'axios';

export class DataService {
    private baseUrl: string = 'http://localhost:3000/api';

    async getSchedule(): Promise<any[]> {
        const response = await axios.get(`${this.baseUrl}/get_schedule`);
        return response.data;
    }
  
    async getUsers(): Promise<any[]> {
        const response = await axios.get(`${this.baseUrl}/users`);
        return response.data;
    }

    async getWorkSite(): Promise<any[]> {
        const response = await axios.get(`${this.baseUrl}/worksite`);
        return response.data;
    }

    async getAssignment(): Promise<any[]> {
        const response = await axios.get(`${this.baseUrl}/assignment`);
        return response.data;
    }
    async addShift(shiftData: any): Promise<any> {
        const response = await axios.post(`${this.baseUrl}/create_schedule`, shiftData);
        return response.data;
      }
  }