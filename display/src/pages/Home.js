import { useEffect } from 'react'
import { useAirplanesContext } from "../hooks/useAirplanesContext"
import '../index.css'

// components
import AirplaneDetails from '../components/AirplaneDetails'

/*
function that creates the home page

fetches airplane data using the backend API
displays the data to the home page
*/


const Home = () => {

    // getting all airplanes and dispatch from the context
    const {airplanes, dispatch} = useAirplanesContext()

    // gets all airplanes using api
    const fetchAirplanes = async () => {

      const response = await fetch('/api/airplanes/', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ik1heCIsInJvbGVzIjoiQWRtaW4iLCJpYXQiOjE3MTkzMzQ3Njl9.V7lqhmQZ996Vs3jNxLwjD01inR8aiuy8hpI-gm9IiFE'
        }
      });
        
        // getting json array of airplane objects
        const json = await response.json()

        //if the airplane data is returned with no errors
        if (response.ok) {
            
            dispatch({type: 'SET_AIRPLANES', payload: json})
        }
    }

    useEffect(() => {

        // getting array of all airplane objects using backend api and putting it in the context

        const intervalId = setInterval(fetchAirplanes, 2000);
        return ()=> clearInterval(intervalId)
    })


    return (
        <div className="home">
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Arrive From</th>
                  <th>Flight</th>
                  <th>Scheduled</th>
                  <th>Gate</th>
                  <th>Status</th>
                  <th> </th>
                  <th>Depart To</th>
                  <th>Flight</th>
                  <th>Scheduled</th>
                  <th>Gate</th>
                  <th>Status</th>
                 </tr>
              </thead>
              <tbody>
                {airplanes && airplanes.map((airplane) => (
                   <AirplaneDetails key={airplane._id} airplane={airplane}/>
                ))}
              </tbody>
            </table>
        </div>
    )
}

export default Home