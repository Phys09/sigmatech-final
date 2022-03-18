import React, { useEffect, useState } from "react";
import { Stat } from './Stat';
import { endpoint, POST_FETCH } from '../APIfunctions';

export const StatList = () => {
  // Save the fetched data
  const [stats, setStats] = useState([]);

  // Payload for the 'get_stats' endpoint
  var payload = Object.assign(
    { body: JSON.stringify({ passwd: 'SIGMA_ADMIN_PASSWORD' }) },
    POST_FETCH
  );
  
  // To wait for all information before rendering, delay using 'useEffect()'
  useEffect(() => {
    fetch(endpoint("get_stats"), payload)
    .then((resp) => resp.json())
    .then(body => setStats(body));
  }, []);
  
  // Return header and table of stats only when required information is received
  return (
    <div>
      {
        stats &&
        <>
          <h3>Stats Log</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Description</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {stats.map(stat => (<Stat key={stat.sid} stat={stat} />))}
            </tbody>
          </table>
        </>
      }
    </div>
  );
};
