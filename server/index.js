import express from 'express';
import cors from 'cors';
import Chance from 'chance';

const chance = new Chance();

const app = express();
app.use(cors());
app.use(express.json());

const animals = [...Array(250).keys()].map(idx => {
  return {
    idx,
    type: chance.animal(),
    age: chance.age(),
    name: chance.name(),
  }
});

app.get('/animalfarm', (req, res) => {
  const q = req.query.q?.toLowerCase() || '';
  const results = animals.filter(animal => animal.type.toLowerCase().includes(q));

  res.send(results);
});

app.listen(8080, () => console.log('Search animals on http://localhost:8080/animalfarm'));
