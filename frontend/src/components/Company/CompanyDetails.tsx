import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useCompanyStore, { Job } from '../../store/company.store';
import CompanyLogo from '../../assets/Logo Tumbnail.svg';
import JobCard from '../JobCard/JobCard';
import style from './CompanyDetails.module.css';
import { Typography } from '@mui/material';
import Map from '../../map/Map';

type CompanyDetailParams = {
  companyId: string;
};

const CompanyDetail: React.FC = () => {
  const { companyId } = useParams<CompanyDetailParams>();
  const fetchCompanyById = useCompanyStore((state) => state.fetchCompanyById);
  const selectedCompany = useCompanyStore((state) => state.selectedCompany);

  useEffect(() => {
    fetchCompanyById(Number(companyId));
  }, [companyId, fetchCompanyById]);

  if (!selectedCompany) {
    return <div>Loading...</div>;
  }

  console.log('Selected Company:', selectedCompany);

  let jobRequirements: string[] = [];
  if (selectedCompany.requirement) {
    jobRequirements = selectedCompany.requirement.split(',');
  }
  console.log(selectedCompany.location);
  return (
    //   main div
    <section className={style.companyDetailWrapper}>
      <div className={style.leftContainer}>
        {/* header div  */}
        <div className={style.companyDetailHeader}>
          <div className={style.logoWrapper}>
            <img src={CompanyLogo} alt='logo-company' />
            <div className={style.companyJob}>
              <Typography variant='h2' component='h2'>
                {selectedCompany.name}
              </Typography>
              <div className='companyType'>
                <Typography variant='h4' component='h2'>
                  {selectedCompany.location}
                </Typography>
              </div>
            </div>
          </div>
        </div>

        <div className={style.companyDetailMainContainer}>
          <div className={style.aboutCompanyContainer}>
            <div className={style.jobSubhead}>
              <Typography variant='body1' component='h2'>
                About Company
              </Typography>
            </div>
            <Typography variant='h4' component='h2'>
              {selectedCompany.about}
            </Typography>
          </div>

          <div className='skill-container'>
            <Typography variant='body1' component='h2'>
              Services
            </Typography>
            <ul className='skillsList'>
              {selectedCompany.jobs.slice(0, 3).map((job) => (
                <li key={job.id}>{job.skills}</li>
              ))}
            </ul>
          </div>

          <div className={style.jobDescription}>
            <div className={style.jobSubhead}>
              <Typography variant='body1' component='h2'>
                Available Positions
              </Typography>
            </div>
            <div className={style.jobListContainer}>
              {selectedCompany.jobs.map((job) => (
                <div key={job.id} className={style.jobList}>
                  <div className={style.jobName}>
                    <div>
                      <Typography variant='body1' component='h2'>
                        {job.title}
                      </Typography>
                    </div>
                    <div>
                      <Typography variant='h4' component='h2'>
                        {job.experience} years Experience
                      </Typography>
                    </div>
                  </div>
                  <div className={style.jobDescription}>
                    <Typography variant='h4' component='p'>
                      {job.description}
                    </Typography>
                  </div>
                </div>
              ))}
              <hr></hr>
            </div>
          </div>

          <div className={style.companyAddress}>
            <div className={style.jobSubhead}>
              <Typography variant='body1' component='h2'>
                Office Address
              </Typography>
              {selectedCompany.location}
            </div>
            <Typography variant='h4' component='h2'>
              <div className={style.map}>
                {' '}
                <Map city={selectedCompany.location} />
              </div>
            </Typography>
          </div>
        </div>
      </div>
      <div className={style.rightContainer}>
        {/* <div className='job-card-container'>
          {jobs.slice(0, 3).map((job) => (
            <JobCard key={job.job_id} job={job} />
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default CompanyDetail;
