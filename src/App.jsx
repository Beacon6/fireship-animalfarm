import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [animals, setAnimals] = useState([]);

  const searchAnimals = async (q) => {
    const response = await fetch('http://localhost:8080/animalfarm?' + new URLSearchParams({ q }));
    const data = await response.json();
    setAnimals(data);
  }

  return (
    <main>
      <h1>Animal Farm 🦧</h1>

      <input
        type='text'
        placeholder='Search'
        onChange={(e) => searchAnimals(e.target.value)}
      />

      <ul>
        {animals.map((animal) => (
          <li id={animal.idx}>
            <strong>{animal.type}</strong> {animal.name} ({animal.age} years old)
          </li>
        ))}

        {animals.length === 0 && 'No animals found'}
      </ul>
    </main>
  );
}

export default App;
