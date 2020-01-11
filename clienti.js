const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request');

const port = process.argv.slice(2)[0];
const app = express();

app.use(bodyParser.json());

const magazinService = 'http://localhost:8081';

const clienti = [
  {
      id: 1,
      name: 'Vasilica',
      RequestedComponent: ['Procesor'],      
      assginedShop: 0
  },
  {
      id: 2,
      name: 'Mitica',
      RequestedComponent: ['HDD'],      
      assginedShop: 0
  },
  {
      id: 3,
      name: 'Bilibosca',
      RequestedComponent: ['CD-ROM'],      
      assginedShop: 0
  }
];

app.get('/clienti', (req, res) => {
  console.log('Returning clienti list');
  res.send(clienti);
});

app.post('/assignment', (req, res) => {
  
  request.post({
      headers: {'content-type': 'application/json'},      
      url: `${magazinService}/magazin/${req.body.magazinId}`,
      body: `{
          "busy": true
          
      }`
  }, (err, raspunsMagazin, body) => {
      if (!err) {
          const clientID = parseInt(req.body.clientID);
          const client = clienti.find(subject => subject.id === clientID);
              
          client.assginedShop = req.body.magazinId;
          res.status(202).send(client);
      } else {
          res.status(400).send({problem: `Magazin Service responded with issue ${err}`});
      }
  });

});





console.log(`clienti service listening on port ${port}`);
app.listen(port);