import React from 'react';
import { Link } from 'react-router-dom';
import '../../dashboard.css';
import AdminDashboardHospitalList from './AdminDashboardHospitalList';
import dashboardBg from '../../assets/dashboardBg.svg';

const Dashboard = () => {
    
    return ( 
        <main>
            <section className="adminsDashboard_background">
                <img src={dashboardBg} alt="Background"/>    
            </section>            
            <section className="adminDashboard_banner">
                <section className="adminDashboard_stats">
                    <h4 className="adminDashboard_bannerTitle mt-2 pl-3 pr-3">Overview</h4>
                    <div>
                        <div className="adminDashboard_statsCard bg-primary text-white d-flex flex-column align-items-center justify-content-center">
                            <span>Cases</span>
                            <h1>546</h1>
                        </div>
                    </div>
                    <div>
                        <div className="adminDashboard_statsCard  bg-success text-white flex-column d-flex align-items-center justify-content-center">
                            <span>Recovered</span>
                            <h1>355</h1>
                        </div>
                    </div>
                    <div>
                        <div className="adminDashboard_statsCard bg-danger text-white flex-column d-flex align-items-center justify-content-center">
                            <span>Deaths</span>
                            <h1>70</h1>
                        </div>
                    </div>
                    <div>
                        <div className="adminDashboard_statsCard bg-secondary text-white flex-column d-flex align-items-center justify-content-center">
                            <span>Tests</span>
                            <h1>2345</h1>
                        </div>
                    </div>
                </section>
                <section className="adminDashboard_banner_actions">
                    <header className="adminDashboard_bannerTitle mt-2 pr-4 pl-3 justify-content-between">
                        <h4>My Hospitals</h4>
                        <Link to='/superadmin/hospitals'>View All</Link>
                    </header>
                    <AdminDashboardHospitalList />
                </section>
            </section>
        </main>
    );
}
 
export default Dashboard;