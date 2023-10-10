import { useEffect } from 'react';
import useAdminStore from '../store/admin.store';

export const useAdminData = () => {
  const jobsRequest = useAdminStore((state) => state.jobsRequest);
  const getJobRequest = useAdminStore((state) => state.getJobRequest);
  const usersCount = useAdminStore((state) => state.usersCount);
  const getUserCount = useAdminStore((state) => state.getUserCount);
  const companiesCount = useAdminStore((state) => state.companiesCount);
  const getComaniesCount = useAdminStore((state) => state.getComaniesCount);
  const jobsCount = useAdminStore((state) => state.jobsCount);
  const getJobsCount = useAdminStore((state) => state.getJobsCount);
  const openJobsCount = useAdminStore((state) => state.openJobsCount);
  const getOpenJobsCount = useAdminStore((state) => state.getOpenJobsCount);

  useEffect(() => {
    getJobRequest();
    getUserCount();
    getComaniesCount();
    getJobsCount();
    getOpenJobsCount();
  }, []);

  return { usersCount, companiesCount, jobsCount, jobsRequest, openJobsCount };
};