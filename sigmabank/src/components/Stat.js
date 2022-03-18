
import React, { useState } from "react";
import "../css/CreateAccount.css"

// Takes in a JSON object representing a stat and
// returns a table row representing the stat.
export function Stat(props){
  /**
   * Timestamps have a format of 'YYYY-MM-DDTHH:MM:SS.SSSZ', but we only
   * need the date.
   */

  return (
    <tr>
      <td>{props.stat.sid}</td>
      <td>{props.stat.description}</td>
      <td>{props.stat.stamp}</td>
    </tr>
  );
};
