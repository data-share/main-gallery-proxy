const express = require('express');
const compression = require('compression');
// const router = express.Router();
// const morgan = require('morgan');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');
// const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const port = process.env.PORT || 3005;

app.use(compression());
// app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/../public')));

// Bookings
// Bookings
app.get('/:restaurantId', (reqProxy, resProxy) => {
  axios.get(`http://13.57.236.176/${reqProxy.params.restaurantId}`)
    .then((response) => {
      resProxy.status(200).send(response.data)
    });
});

app.get('/api/bookings/restaurantName/:restaurantId', (reqProxy, resProxy) => {
  axios.get(`http://13.57.236.176/api/bookings/restaurantName/${reqProxy.params.restaurantId}`)
    .then((response) => {
      resProxy.status(200).send(response.data)
    })
   .catch((err) => {
      resProxy.status(400).send(err)
    })
});

app.get('/api/bookings/:restaurantId', (reqProxy, resProxy) => {
  axios.get(`http://13.57.236.176/api/bookings/${reqProxy.params.restaurantId}`)
    .then((response) => {
      resProxy.status(200).send(response.data)
    })
    .catch((err) => {
      resProxy.status(400).send(err)
    })
});

app.post('/api/bookings/:restaurantId', (reqProxy, resProxy) => {
  axios.get(`http://13.57.236.176/api/bookings/${reqProxy.params.restaurantId}`, {
    params: reqProxy.query
  })
  .then((response) => {
    resProxy.status(200).send(response.data)
  })
  .catch((err) => {
    resProxy.status(400).send(err)
  })
});

//Photos

app.get('/api/restaurants/:id/photos', (reqProxy, resProxy) => {
axios.get(`http://3.86.33.200/api/restaurants/${reqProxy.params.id}/photos`)
  .then((response) => {
    resProxy.status(200).send(response.data)
  })
  .catch((err) => {
    resProxy.status(400).send(err)
  })
});

//Popular Dishes
app.get('/api/restaurant/:id', (reqProxy, resProxy) => {
axios.get(`http://52.53.226.190/api/restaurant/${reqProxy.params.id}`)
  .then((response) => {
    resProxy.status(200).send(response.data)
  })
	.catch((err) => {
    resProxy.status(400).send(err)
  })

});

app.get('/api/dish/:id', (reqProxy, resProxy) => {
axios.get(`http://52.53.226.190/api/restaurant/${reqProxy.params.id}`)
  .then((response) => {
    resProxy.status(200).send(response.data)
  })
	.catch((err) => {
    resProxy.status(400).send(err)
  })

});
	
//Reviews
app.get('/api/restaurants/:id/reviews', (reqProxy, resProxy) => {
axios.get(`http://localhost/api/restaurants/${reqProxy.params.id}`)
  .then((response) => {
    resProxy.status(200).send(response.data)
  });
});

app.get('/api/restaurants/:id/reviews', (reqProxy, resProxy) => {
axios.get(`http://localhost:3002/api/restaurants/:id/reviews/${reqProxy.params.id}`)
  .then((response) => {
    resProxy.status(200).send(response.data)
  });
});

app.listen(port, () => {
    console.log(`server running on http://localhost:${port}`);
  });
