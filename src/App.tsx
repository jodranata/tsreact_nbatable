import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import paginationFactory from 'react-bootstrap-table2-paginator';
import './App.css';

interface DataTypes {
  assists_per_game: string;
  blocks_per_game: string;
  defensive_rebounds_per_game: string;
  field_goal_percentage: string;
  field_goals_attempted_per_game: string;
  field_goals_made_per_game: string;
  free_throw_percentage: string;
  games_played: string;
  minutes_per_game: string;
  name: string;
  offensive_rebounds_per_game: string;
  player_efficiency_rating: string;
  points_per_game: string;
  rebounds_per_game: string;
  steals_per_game: string;
  team_acronym: string;
  team_name: string;
  three_point_attempted_per_game: string;
  three_point_made_per_game: string;
  three_point_percentage: string;
  turnovers_per_game: string;
}

const App = () => {
  const [players, setPlayers] = useState<DataTypes[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getPlayerData = async () => {
    try {
      setLoading(true);
      const data: AxiosResponse<DataTypes[]> = await axios.get(
        'https://nba-players.herokuapp.com/players-stats',
      );
      setPlayers(data.data);
      return setLoading(false);
    } catch (err) {
      setLoading(false);
      return new Error('Error fetching Data');
    }
  };

  const columns = [
    { dataField: 'name', text: 'Player Name' },
    { dataField: 'points_per_game', text: 'Points Per Game' },
    { dataField: 'team_name', text: 'Player Team' },
  ];

  useEffect(() => {
    getPlayerData();
  }, []);
  return (
    <div className="App">
      <header>
        <h1>Template for Typescript - React App</h1>
      </header>
      <Container>
        {loading ? (
          <Spinner animation="grow" />
        ) : (
          <BootstrapTable
            keyField="name"
            data={players}
            columns={columns}
            pagination={paginationFactory({})}
          />
        )}
      </Container>
    </div>
  );
};

export default App;
