import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrls } from './../../mainConfigs';
import '../../hospitalDetails.css';

const AdminManageHospital = ({match, history}) => {

    const hospitalID = match.params.id
    const [hospitalData, setHospitalData] = useState({});
    const [hospitalStaffs, setHospitalStaffs] = useState([]);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [newUser, setNewUser] = useState({
        email: '',
        password: ''
    });


    useEffect(() => {
        axios.get(`${backendUrls.hospitalById}${hospitalID}`).then((res) => {
            setHospitalData(res.data);
            fetchHospitalStaffs(res.data.id);
        }).catch((err) => {
            alert('Server Error!');
        });
        // eslint-disable-next-line
    }, [hospitalID])


    const fetchHospitalStaffs = (id) => {
        axios.get(`${backendUrls.staffUserByHospital(id)}`).then((res) => {
            setHospitalStaffs(res.data);
        }).catch((err) => {
            alert("Server Error!");
        });
    }

    const handleAddNewStaffUser = (event) => {
        event.preventDefault();
        if(newUser.email === '') {
            alert('Email ID Required!');
            return false;
        }
        if(newUser.password === '') {
            alert('Password Required');
            return false;
        }
        if(newUser.password.length < 8) {
            alert('Password must be at least 8 chars long!');
            return false;
        }
        axios.post(backendUrls.staffUser, {
            email: newUser.email + `@${hospitalData?.shortCode?.toLowerCase()}.com`,
            password: newUser.password
        }).then((result) => {          
            if(result.status === 226) {
                alert(result.data);
            }else{
                setNewUser({
                    email: '',
                    password: ''
                });
                fetchHospitalStaffs(hospitalData.id);
            }
        }).catch((err) => {
            alert('Server Error!');
        });
        
    }

    const handleDeleteStaffUser = (id) => {
        if(window.confirm('Are You Sure want to delete the user?')){
            axios.delete(backendUrls.staffUserById(id)).then((res) => {
                if(res.status === 204) {
                    fetchHospitalStaffs(hospitalData.id);
                }else{
                    alert('Error in Deleting the User!');
                }
            }).catch((err) => {
                alert('Server Error!');
            });
        }

    }

    const handleDeleteHospital = (id) => {
        if(window.confirm('Are You Sure want to delete this Hospital? If you delete it, all your patients record will also gets deleted!'))
        {
            axios.delete(`${backendUrls.hospitalById}${id}`).then((res) => {
                history.push('/superadmin');
            }).catch((err) => {
                alert('Error in Deleting!');
            });
        }
    }


    
    return ( 
        <main>
            <section className="adminHospitalDetails__container">
                <section className="adminHospitalDetails__banner">
                    <h5 className="m-2">Details</h5>
                    <div className="adminHospitalDetails__name mt-3">
                        {hospitalData.name}
                    </div>
                    <div className="adminHospitalDetails__bed">
                        <div className="d-flex align-items-center">
                            <i className="material-icons">hotel</i>
                            <span>Total Beds: </span>
                            <div className="adminHospitalDetails__beds ml-2">
                                {hospitalData.totalBeds}
                            </div>  
                        </div>
                        <div className="d-flex align-items-center">
                            <i className="material-icons">airline_seat_individual_suite</i>
                            <span>Free Beds: </span>
                            <div className="adminHospitalDetails__beds ml-2">
                                {hospitalData.totalBeds}
                            </div>
                        </div>
                    </div>
                    <div className="adminHospitalDetails__location mt-3 mb-2">
                        <div className="mapouter">
                            <div className="gmap_canvas">
                                <iframe title="Hospital Location" width="100%" height="500" id="gmap_canvas" src={`https://maps.google.com/maps?q=${hospitalData.address}&t=&z=13&ie=UTF8&iwloc=&output=embed`} frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0">
                                </iframe>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => {
                        if(hospitalData.id) {
                            handleDeleteHospital(hospitalData.id)
                        }
                    }} className="btn btn-danger adminHospitalDetails__delete bg-danger mt-3">Delete</button>
                </section>
                <section className="adminHospitalDetails__users">
                    <h5 className="m-2">Manage Staffs</h5>
                    <div className="adminHospitalDetails__userLists">
                        <form onSubmit={handleAddNewStaffUser} className="adminHospitalDetails__user">
                            <div className="input-group mb-3">
                                <input type="text" required value={newUser.email} onChange={
                                    (event) => {
                                        setNewUser((prev) => {
                                            return {
                                                ...prev,
                                                email: event.target.value.trim()
                                            }
                                        })
                                    }
                                } className="form-control" placeholder="Staff's Email" />
                                <div className="input-group-append">
                                    <span className="input-group-text">{`@${hospitalData?.shortCode?.toLowerCase()}.com`}</span>
                                </div>
                            </div>
                            <div className="container-fluid p-0 d-flex align-items-center">
                                <input className="form-control adminHospitalDetails__newPassword" onChange={
                                    (event) => {
                                        setNewUser((prev) => {
                                            return {
                                                ...prev,
                                                password: event.target.value.trim()
                                            }
                                        })
                                    }
                                }  value={newUser.password} required type={ passwordVisible ? 'text':"password"} placeholder="Staff's Password"  />
                                <i className="material-icons" onClick={() => setPasswordVisible(!passwordVisible)}>
                                    { passwordVisible ? 'visibility_off' : 'visibility' }
                                </i>
                            </div>
                            <button className='btn btn-primary mt-3' type="submit">Add New Staff</button>
                        </form>
                        {
                            hospitalStaffs.map((staff) => {
                                return (
                                    <div key={staff.id} className="adminHospitalDetails__user container-fluid p-0 pt-2 pb-2 d-flex align-items-center">
                                        <input className="form-control adminHospitalDetails__newPassword" type="text" placeholder={staff.email} readOnly  />
                                        <i className="material-icons" onClick={() => handleDeleteStaffUser(staff.id)}>delete</i>
                                    </div>
                                );
                            })
                        }
                    </div>
                </section>
            </section>
        </main>
    );
}
 
export default AdminManageHospital;