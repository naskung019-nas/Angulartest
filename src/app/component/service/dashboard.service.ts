import axios, { AxiosResponse } from 'axios';


export class DashboardService {
    private baseUrl: string = 'http://localhost:3000';
  
    async getDashboardSummary(): Promise<AxiosResponse<any>> {
      return await axios.get(`${this.baseUrl}/dashboardSummary`);
    }
  }