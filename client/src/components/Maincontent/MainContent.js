
import React, { useState, useEffect } from 'react';
import { IconButton, Typography, CircularProgress, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { GroupAdd, Group, Hotel, EventNote, ReportProblem } from '@material-ui/icons';
import './MainContent.css';

const MainContent = () => {
  const [patientsJoined, setPatientsJoined] = useState(null);
  const [patientsDischarged, setPatientsDischarged] = useState(null);
  const [availableBeds, setAvailableBeds] = useState(null);
  const [vitalEvents, setVitalEvents] = useState([]);

  const fetchPatientsJoinedCount = async () => {
    return Math.floor(Math.random() * 10);
  };

  const fetchPatientsDischargedCount = async () => {
    return Math.floor(Math.random() * 5);
  };

  const fetchAvailableBedsCount = async () => {
    return Math.floor(Math.random() * 50);
  };

  const fetchVitalEvents = async () => {
    return [
      "Emergency in ICU",
      "Alert: Low Medication Stock",
      "Critical: Blood Bank Supply Shortage"
    ];
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const joinedToday = await fetchPatientsJoinedCount();
        const dischargedToday = await fetchPatientsDischargedCount();
        const beds = await fetchAvailableBedsCount();
        const events = await fetchVitalEvents();

        setPatientsJoined(joinedToday);
        setPatientsDischarged(dischargedToday);
        setAvailableBeds(beds);
        setVitalEvents(events);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);
  return (
    <div className='main-content-grid'>
      <div className="main-content-section">
        <div className="centered-content">
          <Typography variant="h6">
            <IconButton><GroupAdd /></IconButton>Patients Joined:
          </Typography>
          {patientsJoined !== null ? (
            <Typography>{patientsJoined}</Typography>
          ) : (
            <CircularProgress size={24} />
          )}
        </div>
      </div>

      <div className="main-content-section">
        <div className="centered-content">
          <Typography variant="h6">
            <IconButton><Group /></IconButton>Patients Discharged:
          </Typography>
          {patientsDischarged !== null ? (
            <Typography>{patientsDischarged}</Typography>
          ) : (
            <CircularProgress size={24} />
          )}
        </div>
      </div>

      <div className="main-content-section">
        <div className='centered-content'>
          <Typography variant="h6">
            <IconButton><Hotel /></IconButton>Beds Availability:
          </Typography>
          {availableBeds !== null ? (
            <Typography>{availableBeds}</Typography>
          ) : (
            <CircularProgress size={24} />
          )}
        </div>
      </div>


      <div className="main-content-section">
        <div className='centered-content'>
          <Typography variant="h6"><IconButton><EventNote /></IconButton>Vital Events:</Typography>
          <List>
            {vitalEvents.map((event, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <ReportProblem />
                </ListItemIcon>
                <ListItemText primary={event} />
              </ListItem>
            ))}
          </List>
        </div>
      </div>
    </div>

  );
};

export default MainContent;
