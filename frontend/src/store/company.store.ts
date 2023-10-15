import { create } from 'zustand';
import api from '../api';

export interface Job {
  id: number;
  title: string;
  description: string;
  skills: string;
  experience: number;
}

export interface Company {
  id: number;
  name: string;
  location: string;
  about: string;
  skills: string;
  description: string;
  requirement: string;
  jobs: Job[];
}

interface CompanyStore {
  companies: Company[];
  selectedCompany: Company | null;
  fetchCompanies: () => Promise<void>;
  fetchCompanyById: (companyId: number) => Promise<void>;
}

const useCompanyStore = create<CompanyStore>((set) => ({
  companies: [] as Company[],
  selectedCompany: null,
  fetchCompanies: async () => {
    try {
      const request = await api();
      const response = await request.get('/company');
      const companies = await response.data;

      set({ companies });
    } catch (err) {
      console.error(err);
    }
  },
  fetchCompanyById: async (companyId: number) => {
    try {
      const request = await api();

      // Fetch company data
      const companyResponse = await request.get(`/company/${companyId}`);
      const company = await companyResponse.data;

      // Fetch jobs for the company
      const jobsResponse = await request.get(`/company/${companyId}/jobs`);
      const jobs = await jobsResponse.data;

      // Ensure jobs is an array, or set it to an empty array if undefined
      const jobsArray = Array.isArray(jobs) ? jobs : [];

      // Combine company data with jobs
      const selectedCompany = { ...company, jobs: jobsArray };

      // Set the selected company
      set({ selectedCompany });
    } catch (err) {
      console.error(err);
    }
  },
}));

export default useCompanyStore;
