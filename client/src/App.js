import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import MainContent from "./components/Maincontent/MainContent";
import AddDepartmentForm from "./components/Department/AddDepartment";
import ViewDepartments from "./components/Department/DepartmentList";
import DoctorForm from "./components/Doctor/AddDoctor";
import AddPatient from "./components/Patient/AddPatient";
import PatientList from "./components/Patient/PatientList";
import MenuIcon from "@mui/icons-material/Menu";
import DoctorTable from "./components/Doctor/DoctorList";
import AppointmentList from "./components/Appointments/AppointmentList";
import PharmacyItemsForm from "./components/Pharmacy/ManageMedication";
import CollapsibleTable from "./components/Pharmacy/PharmacyInventory";
import Appointment from "./components/Appointments/AddAppointment";
import AddWardForm from "./components/Bedmanagement/AddWard";
import WardList from "./components/Bedmanagement/WardList";
import AddStaff from "./components/Staffmanagement/AddStaff";
import StaffList from "./components/Staffmanagement/Managestaff";
import VitalEvents from "./components/Vitalevents/VitalEvents";
import BirthRecordForm from "./components/Vitalevents/BirthRecordForm";
import DeathRecordForm from "./components/Vitalevents/DeathRecordForm";
import BirthRecord from "./components/Vitalevents/BirthRecord";
import DeathRecord from "./components/Vitalevents/DeathRecord";
import LaboratoryForm from "./components/Laboratory/LaboratoryForm";
import LabResult from "./components/Laboratory/LabResult";
import LaboratoryResults from "./components/Laboratory/LaboratoryResult";
import LaboratoryTest from "./components/Laboratory/LaboratoryTest";
import LabTest from "./components/Laboratory/LabTest";
import PatientSearch from "./components/Billing/PatientSearch";
import GenerateInvoice from "./components/Billing/GenerateInvoice";
import OutstandingBillsList from "./components/Billing/OutstandingBillsList";
import PatientBillingDashboard from "./components/Billing/PatientBillingDashboard";
import "./App.css";
import BillingContainer from "./components/Billing/BillingContainer";


const theme = createTheme();


const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className="app">
          <div className="header-container">
            <Header toggleSidebar={toggleSidebar} />
          </div>
          <div className="sidebar-content-container">
            <MenuIcon
              className="sidebar-toggler"
              onClick={toggleSidebar}
            ></MenuIcon>
            <div className="app-sidebar-container">
              <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
            <div className="content-container">
              <Routes>
                <Route path="/" element={<MainContent />} />
                <Route path="/AddDepartment" element={<AddDepartmentForm />} />
                <Route path="/DepartmentList" element={<ViewDepartments />} />
                <Route path="/addDoctor" element={<DoctorForm />} />
                <Route path="/DoctorList" element={<DoctorTable />} />
                <Route path="/AddPatient" element={<AddPatient />} />
                <Route path="/PatientList" element={<PatientList />} />
                <Route path="/scheduleappointment" element={<Appointment />} />
                <Route path="/viewappointments" element={<AppointmentList />} />
                <Route path="/manage-medication" element={<PharmacyItemsForm />}/>
                <Route path="/view-pharmacy-inventory" element={<CollapsibleTable />} />
                <Route path="/view-bed-occupancy" element={<WardList />} />
                <Route path="/manage-beds" element={<AddWardForm />} />
                <Route path="/manage-staff" element={<AddStaff />} />
                <Route path="/view-employee-records" element={<StaffList />} />
                <Route path="/vital-events" element={<VitalEvents />} />
                <Route path="birthrecords/add" element={<BirthRecordForm />} />
                <Route path="deathrecords/add" element={<DeathRecordForm />} />
                <Route path="birthrecords" element={<BirthRecord />} />
                <Route path="deathrecords" element={<DeathRecord />} />
                <Route path="LaboratoryForm" element={<LaboratoryForm/>} />
                <Route path="LaboratoryResult" element={<LaboratoryResults />} />
                <Route path="LaboratoryTest" element={<LaboratoryTest />} />
                <Route path="LabResult" element={<LabResult />} />
                <Route path="LabTest" element={<LabTest />} />
                <Route path="PatientSearch" element={< PatientSearch />} />
                <Route path="GenerateInvoice" element={<GenerateInvoice />} />
                <Route path="PatientBillingDashboard" element={<PatientBillingDashboard />} />
                <Route path="OutstandingBillsList" element={<OutstandingBillsList />} />
                <Route path="/Billing" element={<BillingContainer />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;

