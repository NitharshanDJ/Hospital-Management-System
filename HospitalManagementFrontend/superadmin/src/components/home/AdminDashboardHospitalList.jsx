import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { backendUrls } from '../../mainConfigs';
import { Link } from 'react-router-dom';

const AdminDashboardHospitalList = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [hospitalList, setHospitalList] = useState([])
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        axios.post(backendUrls.hospitalSearch).then((result) => {
            const {data} = result;  
            setHospitalList(data);
            setIsLoading(false);
        }).catch((err) => {
            alert('Error in Connecting to Server!');
            setIsLoading(false);
        })
    }, []);
    
    const handleHospitalSearch = (event) => {
        event?.preventDefault();
        axios.post(backendUrls.hospitalSearch, {
            searchValue
        }).then((result) => {
            const {data} = result;  
            setHospitalList(data);
            setIsLoading(false);
        }).catch((err) => {
            alert('Error in Connecting to Server!');
            setIsLoading(false);
        });
        return false;
    }


    return ( 
        <div className="adminDashboard__banner__hospitalList">
            <form onSubmit={handleHospitalSearch} className="adminDashboard__banner__searchHospital mb-3 form-inline">
                <input className="form-control" value={searchValue} onChange={(event) => {
                        setSearchValue(event.target.value.trim())
                        if(!event.target.value.trim()){
                            handleHospitalSearch()
                        }
                    }} type="search" placeholder="Enter Name (or) Short Code" aria-label="Search" />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
            {
                isLoading ? (
                    <div className="adminDashboard__loader">
                        <div className="spinner-border text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                ):(
                    hospitalList.map((item, i) => {
                        return (
                            <div key={i} className='adminDashboard__banner__hospital'>
                                <div className="d-flex flex-column">
                                    <span className="adminDashboard__hospital_title">{item.name}</span>
                                    <span>{item.shortCode}</span>
                                </div>
                                <div className="d-flex justify-content-center flex-column">
                                    <Link to={`/superadmin/hospitals/manage/${item.id}`} className="btn btn-success my-2 my-sm-0">Manage</Link>
                                </div>
                            </div>
                        );
                    })
                )
            }
        </div>
    );
}
 
export default AdminDashboardHospitalList;