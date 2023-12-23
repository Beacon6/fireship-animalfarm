import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const { searchAnimals, animals } = useSearchAnimals();

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
          <Animal key={animal.idx} type={animal.type} name={animal.name} age={animal.age} />
        ))}

        {animals.length === 0 && 'No animals found'}
      </ul>
    </main>
  );
}

export default App;

function useSearchAnimals() {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    const lastQuery = localStorage.getItem('lastQuery');
    searchAnimals(lastQuery);
  }, []);

  const searchAnimals = async (q) => {
    const response = await fetch('http://localhost:8080/animalfarm?' + new URLSearchParams({ q }));
    const data = await response.json();
    setAnimals(data);

    localStorage.setItem('lastQuery', q);
  };

  return ({ searchAnimals, animals });
}

function Animal({ type, name, age }) {
  return (
    <li>
      <strong>{type}</strong> {name} ({age} years old)
    </li>
  );
}
