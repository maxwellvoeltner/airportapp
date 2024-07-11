
function minutesToTime(minutes) {
    const hours = (Math.floor(minutes / 60)) % 24;
    const mins = minutes % 60;
    
    const hoursStr = String(hours).padStart(2, '0'); // Ensure two digits for hours
    const minsStr = String(mins).padStart(2, '0');   // Ensure two digits for minutes
    
    return `${hoursStr}:${minsStr}`;
}

const AirplaneDetails = ({ airplane }) => {
    

    return (
            <tr>
              <td>{airplane.arrivingFrom}</td>
              <td>{airplane.arrivalFlight}</td>
              <td>{minutesToTime(airplane.arrivalTime)}</td>
              <td>{airplane.gate}</td>
              {(airplane.arrivalStatus !== "On-time") && (airplane.arrivalStatus !== "Arrived") ? <td style={{color: 'gold'}}><strong>{airplane.arrivalStatus}</strong></td> : <td>{airplane.arrivalStatus}</td> }
              <td style={{width: '10px'}}></td>
              <td> {airplane.departingTo}</td>
              <td>{airplane.departureFlight}</td>
              <td>{minutesToTime(airplane.departureTime)}</td>
              <td>{airplane.gate}</td>
              {(airplane.departureStatus !== "On-time") && (airplane.departureStatus !== "Departed") ? <td style={{color: 'gold'}}><strong>{airplane.departureStatus}</strong></td> : <td>{airplane.departureStatus}</td> }
            </tr>
    )
}

export default AirplaneDetails
