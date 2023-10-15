import express, { Router } from 'express';
import {
  getCompanies,
  getCompaniesById,
  getJobsByCompanyId,
  postCompany,
} from '../../controllers/company';

const companyRoute: Router = express.Router();

// to fetch company details from database
companyRoute.get('/', getCompanies);

// to fetch company details with jobs from database
companyRoute.get('/:id', getCompaniesById);

// to fetch company details with jobs from database
companyRoute.get('/:id/jobs', getJobsByCompanyId);

// to insert company details into database
companyRoute.post('/', postCompany);

export default companyRoute;
