import React from 'react';
import style from './CompanyList.module.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useCompanyStore, { Company } from '../../store/company.store';
import locationSvg from '../adminDetails/assets/Location.svg';
import CompanyLogo from '../../assets/Logo Tumbnail.svg';
import BookmarkSvg from '../../assets/Bookmark.svg';

const CompanyList: React.FC = () => {
  const { companies, fetchCompanies } = useCompanyStore();
  const [searchCountry, setSearchCountry] = useState('');
  const [searchCompany, setSearchCompany] = useState('');

  useEffect(() => {
    fetchCompanies();
  }, []);

  const filteredCompanies = companies.filter((company) => {
    const companyMatches = company.name.toLowerCase().includes(searchCompany.toLowerCase());
    const countryMatches = company.location.toLowerCase().includes(searchCountry.toLowerCase());
    return companyMatches && countryMatches;
  });

  const clearSearch = () => {
    setSearchCountry('');
    setSearchCompany('');
  };

  return (
    <section className={style.content}>
      <div className={style.searchContainer}>
        <input
          type='text'
          placeholder='Search By Country'
          className={style.inputField}
          value={searchCountry}
          onChange={(e) => setSearchCountry(e.target.value)}
        />
        <input
          type='text'
          placeholder='Search By Company'
          className={style.inputField}
          value={searchCompany}
          onChange={(e) => setSearchCompany(e.target.value)}
        />
        <button type='submit' className={style.searchBtn} onClick={clearSearch}>
          Clear Search
        </button>
      </div>

      <div className={style.title}>
        <h3>Top Company</h3>
      </div>
      <div className={style.cardContent}>
        {filteredCompanies.map((company: Company) => (
          <div key={company.id} className={`${style.cardContainer}`}>
            <div className={style.logoTitle}>
              <div className={style.logo}>
                <img src={CompanyLogo} alt='companylogo' />
              </div>
              <div className={style.companyTitle}>
                <div>
                  {' '}
                  <Link to={`/CompanyDetails/${company.id}`} className={style.customLink}>
                    {company.name}
                  </Link>
                </div>
              </div>
            </div>

            <div className={style.description}>{company.about}</div>
            <div className={style.location}>
              <img src={locationSvg} alt='locationSvg' /> {company.location}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CompanyList;
