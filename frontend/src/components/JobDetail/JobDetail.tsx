import React, { useEffect } from 'react';
import './JobDetail.css';
import randomLogo from '../../hooks/randomLogo';
import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import useJobStore from '../../store/jobstore';
import JobCard from '../JobCard/JobCard';
import { Link } from 'react-router-dom';

type JobDetailParams = {
  jobId: string;
};

function JobDetail() {
  const { jobId } = useParams<JobDetailParams>();
  const jobs = useJobStore((state) => state.jobs);
  const fetchJobs = useJobStore((state) => state.fetchJobs);
  useEffect(() => {
    fetchJobs();
  }, []);
  const selectedJob = jobs.find((job) => job.job_id === Number(jobId));
  if (!selectedJob) {
    return <div>Job not found</div>;
  }

  const relatedJobs = jobs.filter((job) => job.job_id !== selectedJob.job_id);
  const similarityCriteria = {
    title: selectedJob.title,
    location: selectedJob.location,
    name: selectedJob.name,
    job_type: selectedJob.job_type,
  };
  const similarJobs = relatedJobs.filter((job) => {
    return (
      job.title === similarityCriteria.title ||
      job.location === similarityCriteria.location ||
      job.name === similarityCriteria.name ||
      job.job_type === similarityCriteria.job_type
    );
  });

  // Slice the first three similar jobs
  const topJobs = similarJobs.slice(0, 3);

  const JobSkillsArray = selectedJob.skills.split(',');
  const JobDescpArray = selectedJob.description.split(',');

  let jobRequirements: string[] = [];
  if (selectedJob.requirement) {
    jobRequirements = selectedJob.requirement.split(',');
  }

  return (
    //   main div
    <section className='job-detail-wrapper'>
      <div className='left-container'>
        {/* header div  */}
        <div className='job-detail-header'>
          <div className='logo-wrapper'>
            <img src={randomLogo(selectedJob.logo)} alt='logo-company' />
            <div className='company-job'>
              <Typography variant='h2' component='h2'>
                {selectedJob.title}
              </Typography>
              <div className='jobType'>
                <Link to={`/CompanyDetails/${selectedJob.id}`} className='customLinkCompany'>
                  <Typography variant='h4' component='h2' className='customLinkCompany'>
                    {selectedJob.name}
                  </Typography>
                </Link>
                <Typography variant='h4' component='h2'>
                  {selectedJob.is_remotework ? 'Remote' : 'In-Office'}
                </Typography>
                <Typography variant='h4' component='h2'>
                  {selectedJob.job_type}
                </Typography>

                <Typography variant='h4' component='h2'>
                  {selectedJob.experience} years experience
                </Typography>
              </div>
            </div>
          </div>

          <div className='apply-btn-container'>
            <Link to={`/applyform/${jobId}`} className='customLink'>
              <button type='submit' className='btn-apply'>
                Apply
              </button>
            </Link>
          </div>
        </div>

        <div className='job-detail-main-container'>
          <div className='job-description'>
            <div className='job-subhead'>
              <Typography variant='body1' component='h2'>
                Job Description
              </Typography>
            </div>
            <Typography variant='h4' component='h2'>
              {JobDescpArray.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </Typography>
          </div>
          <div className='skill-container'>
            <Typography variant='body1' component='h2'>
              Skills
            </Typography>
            <ul className='skillsList'>
              {JobSkillsArray.map((skill, index) => (
                <li key={index} className='skillItem'>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
          <div className='requirement-container'>
            <div className='job-subhead'>
              <Typography variant='body1' component='h2'>
                Requirement
              </Typography>
            </div>
            <Typography variant='h4' component='h2'>
              {jobRequirements.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </Typography>
          </div>

          <div className='about-company-container'>
            <div className='job-subhead'>
              <Typography variant='body1' component='h2'>
                About Company
              </Typography>
            </div>
            <Typography variant='h4' component='h2'>
              {selectedJob.about}
            </Typography>
          </div>
        </div>
      </div>
      <div className='right-container'>
        <div className='related-job-title'>
          <Typography variant='h3' component='h2'>
            Related Jobs
          </Typography>
        </div>
        <div className='job-card-container'>
          {topJobs.map((job) => (
            <JobCard key={job.job_id} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default JobDetail;
