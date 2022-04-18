import React, { useState, useEffect, useContext } from 'react';
import tableData from '../services/api';
import TableContext from '../context/tableContext';

function Table() {
  const [data, setData] = useState([]);
  const [makeFetch, setMakeFetch] = useState(false);
  const { name } = useContext(TableContext);

  useEffect(() => {
    async function fetchTable() {
      const result = await tableData();
      setData(result.results);
    }
    if (makeFetch === false) {
      fetchTable();
      setMakeFetch(true);
    } else if (name.filterByName.name.length === 0) {
      fetchTable();
    }
    if (name.filterByName.name.length > 0) {
      const userInput = name.filterByName.name;
      const filtred = data.filter((e) => (
        e.name.toLowerCase().includes(userInput)
      ));
      if (filtred.length > 0) {
        setData(filtred);
      }
    }
  }, [name]);

  return (
    <table border="1">
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>Url</th>
        </tr>
      </thead>
      <tbody>
        {data.map((e, index) => (
          <tr key={ index }>
            <td>{e.name}</td>
            <td>{e.rotation_period}</td>
            <td>{e.orbital_period}</td>
            <td>{e.diameter}</td>
            <td>{e.climate}</td>
            <td>{e.gravity}</td>
            <td>{e.terrain}</td>
            <td>{e.surface_water}</td>
            <td>{e.population}</td>
            <td>{e.films}</td>
            <td>{e.created}</td>
            <td>{e.edited}</td>
            <td>{e.url}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
