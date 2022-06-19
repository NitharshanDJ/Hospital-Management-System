import React from 'react';
const AddNewHospital = () => {
    return (
        <main>
            <section className="adminAllHospitals__container">
                <header className="d-flex justify-content-between p-2">
                    <h4 className="ml-2">New Hospital</h4>
                </header>
                <section className="addNewHospital__wrapper">
                    <form>
                        <div class="form-group">
                            <label for="hospital_name">Hospital Name</label>
                            <input type="text" class="form-control" id="hospital_name" placeholder="Enter Hospital Name" />
                        </div>
                        <div class="form-group">
                            <label for="hospital_shortCode">Short Code</label>
                            <input type="text" class="form-control" id="hospital_shortCode" placeholder="Enter Short Code" />
                            <small class="form-text text-muted">Define a Unique Short Code for this Hospital.</small>
                        </div>
                        <div class="form-group">
                            <label for="hospital_shortCode">Total Beds</label>
                            <input type="number" class="form-control" id="hospital_beds" placeholder="Enter No. of Beds" />
                        </div>
                        <div class="form-group">
                            <label for="hospital_address">Location</label>
                            <input type="text" class="form-control" id="hospital_address" placeholder="Enter Location" />
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </section>
            </section>
        </main>
    );
}
 
export default AddNewHospital;