// JobApplicationSuccess.tsx
import React from 'react';
import { Typography, Button } from '@mui/material';
import styles from './JobApplicationSuccess.module.css';
import { Link } from 'react-router-dom';

type JobApplicationSuccessProps = {
  jobDetails: {
    title: string;
    name: string;
    location: string;
  };
};

const JobApplicationSuccess: React.FC<JobApplicationSuccessProps> = ({ jobDetails }) => {
  return (
    <div className={styles.applyContainerSuccess}>
      <div className={styles.successMessage}>
        <Typography variant='h5'>Job application submitted successfully for:</Typography>
        <Typography variant='h6'>
          {jobDetails.title} at {jobDetails.name}
        </Typography>
        <Typography variant='body1'>Location: {jobDetails.location}</Typography>
        <div className={styles.additionalActions}>
          <Link to={`/`} className='customLink'>
            <Button variant='outlined' color='primary'>
              Explore more jobs
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobApplicationSuccess;
