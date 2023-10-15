import style from './company.module.css';
import CompanyList from '../../components/Company/CompanyList';
function Company() {
  return (
    <div className={style.content}>
      <div className={style.main}>
        <CompanyList />
      </div>
    </div>
  );
}

export default Company;
