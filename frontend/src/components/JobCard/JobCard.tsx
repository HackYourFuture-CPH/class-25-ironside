import React from 'react';
import './JobCard.css';
import { CiLocationOn } from 'react-icons/ci';
import { BsPeople } from 'react-icons/bs';
import randomLogo from '../../hooks/randomLogo';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

interface Job {
  job_id: number;
  title: string;
  title_description: string;
  description: string;
  skills: string;
  job_type: string;
  experience: string;
  requirement: string;
  name: string;
  location: string;
  is_remotework: boolean;
  about: string;
  applicant_count: number | null;
  logo: number;
}

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const applicantCount = job?.applicant_count ?? 0;
  return (
    <div className='job-card'>
      <div className='card-head'>
        <div className='logo'>
          <img src={randomLogo(job.logo)} alt='companylogo' />
        </div>

        <div className='card-title'>
          <Link
            to={`/jobdetails/${job.job_id}`}
            className='customLink'
            style={{ textDecoration: 'none' }}
          >
            <Typography variant='h3' component='h2'>
              {job.title}
            </Typography>
          </Link>
          <Typography variant='h4' component='h2'>
            {job.name}
          </Typography>
        </div>
      </div>

      <div className='job-descp'>
        <Typography variant='h4' component='h2'>
          {job.title_description}
        </Typography>
      </div>

      <div className='card-footer'>
        <Typography variant='h4' component='h2'>
          <BsPeople /> {applicantCount}
        </Typography>
        <Typography variant='h4' component='h2'>
          <CiLocationOn />
          {job.location}
        </Typography>
      </div>
    </div>
  );
};

export default JobCard;
