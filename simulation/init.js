const airplanes = [
    { arrivingFrom: "LAX", arrivalFlight: "HA3", arrivalTime: 480, arrivalStatus: "On-time", departingTo: "LAX", departureFlight: "HA2", departureTime: 540, departureStatus: "On-time", gate: 1},
    { arrivingFrom: "SFO", arrivalFlight: "UA397", arrivalTime: 600, arrivalStatus: "On-time", departingTo: "SFO", departureFlight: "UA396", departureTime: 660, departureStatus: "On-time", gate: 2},
    { arrivingFrom: "SEA", arrivalFlight: "DL837", arrivalTime: 720, arrivalStatus: "On-time", departingTo: "SEA", departureFlight: "DL836", departureTime: 780, departureStatus: "On-time", gate: 3},
    { arrivingFrom: "LAS", arrivalFlight: "HA19", arrivalTime: 840, arrivalStatus: "On-time", departingTo: "LAS", departureFlight: "HA18", departureTime: 900, departureStatus: "On-time", gate: 4},
    { arrivingFrom: "PHS", arrivalFlight: "AA693", arrivalTime: 960, arrivalStatus: "On-time", departingTo: "PHS", departureFlight: "AA692", departureTime: 1020, departureStatus: "On-time", gate: 5},
    { arrivingFrom: "NRT", arrivalFlight: "JL782", arrivalTime: 1080, arrivalStatus: "On-time", departingTo: "NRT", departureFlight: "JL781", departureTime: 1140, departureStatus: "On-time", gate: 1},
    { arrivingFrom: "ICN", arrivalFlight: "KE55", arrivalTime: 1200, arrivalStatus: "On-time", departingTo: "ICN", departureFlight: "KE54", departureTime: 1260, departureStatus: "On-time", gate: 2},
    { arrivingFrom: "SYD", arrivalFlight: "QF5", arrivalTime: 1320, arrivalStatus: "On-time", departingTo: "SYD", departureFlight: "QF5", departureTime: 1380, departureStatus: "On-time", gate: 3},
    { arrivingFrom: "AKL", arrivalFlight: "NZ10", arrivalTime: 0, arrivalStatus: "On-time", departingTo: "AKL", departureFlight: "NZ9", departureTime: 60, departureStatus: "On-time", gate: 4},
    { arrivingFrom: "YVR", arrivalFlight: "AC517", arrivalTime: 120, arrivalStatus: "On-time", departingTo: "YVR", departureFlight: "AC516", departureTime: 180, departureStatus: "On-time", gate: 5},
];
 

  // Function to send a POST request
async function sendPostRequest(data) {
    return await fetch('http://localhost:2000/api/airplanes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ik1heCIsInJvbGVzIjoiQWRtaW4iLCJpYXQiOjE3MTkzMzQ3Njl9.V7lqhmQZ996Vs3jNxLwjD01inR8aiuy8hpI-gm9IiFE'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
  }
  
async function sendAirplanesSequentially(airplanes) {
    for (let i = 0; i < airplanes.length; i++) {
      try {
        const data = await sendPostRequest(airplanes[i]);
        console.log('Success:', data);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }
  
sendAirplanesSequentially(airplanes);
