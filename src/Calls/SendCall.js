import React from "react";

//This will be called from the button click in Dashboard.js
//will send the payload to the backend 
//Payload: Directions, Age, Day, Time, Gender, Month, 

export const sendPayloadToBackend = async (data) => {
    try {
      const response = await fetch('http://localhost:5000/api/sentdata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      console.log(responseData);
      return responseData;
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
  };
  