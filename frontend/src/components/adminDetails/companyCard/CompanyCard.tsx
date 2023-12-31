import React, { useState } from 'react';
import locationSvg from '../assets/Location.svg';
import style from './company.module.css';
import useAdminStore from '../../../store/admin.store';
import { CompanyPropsType } from '../types/types';
import { useEffect } from 'react';
import Map from '../../../map/Map';
import randomLogo from '../../../hooks/randomLogo';
import useNotificationStore from '../../../store/notification.store';
import Notification from '../../notification/Notification';

const CompanyCard: React.FC<CompanyPropsType> = ({ company }) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const deleteCompany = useAdminStore((state) => state.deleteCompany);
  const addcompany = useAdminStore((state) => state.addcompany);
  const [isShowAbout, setIsShowAbout] = useState(false);
  const { notification } = useNotificationStore();

  const handleDenyClick = async (id: number) => {
    useNotificationStore.setState({
      notification: {
        message: `${company.name} Denied from listing!`,
        severity: 'warning',
      },
    });
    setTimeout(() => {
      deleteCompany(id);
    }, 300);
    setIsClicked(true);
  };
  const handleApproveClick = async (id: number) => {
    useNotificationStore.setState({
      notification: {
        message: `${company.name} approved successfully!`,
        severity: 'success',
      },
    });
    setTimeout(() => {
      addcompany(id);
    }, 300);
    setIsClicked(true);
  };
  useEffect(() => {
    setTimeout(() => {
      setIsClicked(false);
    }, 300);
    setIsShowAbout(false);
  }, [company]);

  return (
    <div className={style.cardContent}>
      {notification && (
        <Notification message={notification.message} severity={notification?.severity} />
      )}
      <div className={`${style.cardContainer} ${isClicked ? style.fadeOut : ''}`}>
        <div className={style.title} onClick={() => setIsShowAbout(!isShowAbout)}>
          <div className={style.logo}>
            <img src={randomLogo(company.logo)} alt='company-logo' />
          </div>
          <div className={style.name}>{company.name}</div>
        </div>
        <div className={style.location}>{company.location}</div>
        <div className={style.img}>
          <img src={locationSvg} alt='locationSvg' />
        </div>
        <div className={style.buttons}>
          <button
            className={`${style.btn} ${style.deny}`}
            onClick={() => handleDenyClick(company.id)}
          >
            X
          </button>
          <button
            className={`${style.btn} ${style.approve}`}
            onClick={() => handleApproveClick(company.id)}
          >
            Aprove
          </button>
        </div>
      </div>
      <div className={`${isShowAbout ? style.about : style.hidden}`}>
        <div>{company.about}</div>
        <div className={style.map}>
          <Map city={company.location} />
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
