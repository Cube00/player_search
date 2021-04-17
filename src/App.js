import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [player, setPlayer] = useState();
  const [state, setState] = useState('');
  const [value, setValue] = useState('');

  const options = {
    method: 'GET',
    url: 'https://free-nba.p.rapidapi.com/players/'+value,
    headers: {
      'x-rapidapi-key': '0a86052304msh589c04b0ba83872p11d86fjsnb7879687220f',
      'x-rapidapi-host': 'free-nba.p.rapidapi.com'
    }
  };

  useEffect(()=>{
    axios.request(options).then((response)=>{
      setPlayer(response.data);
    }).catch((error)=>{
      console.error(error);
    });
  },[state])

  const handleChange = (e) => {
    setValue(e.target.value);
    setState(e.target.value);
  }

  return(
    <>
    <h2 className="title">Search Nba player by id</h2>
      <form>
        <input
          name="id"
          className="search-id"
          placeholder="search by id"
          value={value}
          onChange={handleChange}
          autoComplete="off"
        />
      </form>
      {player !== undefined ? <section className="player">
        <div className="pl-item">
          {player.first_name !== undefined ?
            <div>
              <img className="image" src="https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"/>
              <h2>{player.first_name} {player.last_name}</h2>
            </div>:
            ''
          }

          <div className="spans">
              {player.height_feet !== undefined ?
                <span>Height: {player.height_feet}</span>:
                ''
              }
              {player.position !== undefined ?
                <span>Position: {player.position}</span>:
                ''
              }
          </div>
          {player.team !== undefined ?
            <div className="club">
              <span>City: {player.team.city}</span>
              <span>Abbreviation: {player.team.abbreviation}</span>
              <span>Conference: {player.team.conference}</span>
              <span>Division: {player.team.division}</span>
              <span>Full name: {player.team.full_name}</span>
            </div> :
            ''
          }
        </div>
      </section>
      : 'please select player' }
    </>
  )
}

export default App;
