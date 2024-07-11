const locs = ["LAX", "SFO", "SEA", "LAS", "PHS", "NRT", "ICN", "SYD", "AKL", "YVR"]
const arrivalStatuses = ["In air", "On-appch", "Landing", "On-time"]
const departureStatuses = ["Boarding", "On runway", "Departed", "On-time"]

async function sendPostRequest(loc, data) {
    return await fetch('http://localhost:2000/api/airplanes/' + loc, {
      method: 'PATCH',
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

async function runtest() {

  while (true) {
    
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    for (let i = 0; i < locs.length; i++) {

        for (let j = 0; j < arrivalStatuses.length; j++) {

            let data = {"arrivalStatus": arrivalStatuses[j]}
            await sendPostRequest(locs[i], data)
            await delay(2000)
        }

        for (let k = 0; k < departureStatuses.length; k++) {

            let data = {"departureStatus": departureStatuses[k]}
            await sendPostRequest(locs[i], data)
            await delay(2000)
        }
    }
  }
}

runtest()