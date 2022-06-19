import React, { useEffect, useState } from 'react';
import '../../allHospitals.css'
import axios from 'axios';
import { backendUrls } from './../../mainConfigs';
import { Link } from 'react-router-dom';

const AllManageHospitals = () => {
    
    const [hospitalList, setHospitalList] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 

    

    useEffect(() => {
        axios.get(backendUrls.hospitals).then((res) => {
            setHospitalList(res.data);
            setIsLoading(false);
        }).catch((err) => {
            alert('Server Error!');
        });
    }, []);

    return (
        <main>
            <section className="adminAllHospitals__container">
                <header className="d-flex justify-content-between p-2">
                    <h4 className="ml-2">My Hospitals</h4>
                    <Link to='/superadmin/hospitals/add' className="btn btn-primary">Add Hospital</Link>
                </header>
                <section className="adminAllHospitals__hospitalsList">
                    
                    {
                        isLoading ? (
                            <div class="spinner-border text-primary" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                        ): (

                            hospitalList.map((item) => {
                                return (
                                    <div key={item.id} className="adminAllHospitals__hospital">
                                        <div className="hospital_name">{item.name}</div>                      
                                        <div className="d-flex align-items-center">
                                            <div className="hospital_shortCode">{item.shortCode}</div>                      
                                            <div className="hospital_address ml-2 mr-auto d-flex align-items-center">
                                                <i className="material-icons">location_city</i>
                                                <span className="ml-1">{item.address}</span>
                                            </div>
                                            <Link to={`/superadmin/hospitals/manage/${item.id}`} className="btn btn-info">Manage</Link>
                                        </div>  

                                    </div>
                                );
                            })
                        )
                    }

                    
                </section>
            </section>
        </main>
    );
}
 
export default AllManageHospitals;