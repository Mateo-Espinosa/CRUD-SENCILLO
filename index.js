const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const host = 'localhost';
const port = 3000;

const app = express();

app.use(bodyParser.json());

let productos = [];

// Consultar productos (GET)
app.get('/producto', (req, res) => {
  res.json(productos);
});

// Crear producto (POST)
app.post('/producto', (req, res) => {
  const newproducto = {
    id: productos.length + 1,
    ...req.body
  };
    
  productos.push(newproducto);
  console.log('Producto creado con éxito');
  res.send(newproducto);
});

// Actualizar producto (PUT)
app.put('/producto/:id', (req, res) => {
  const productofound = productos.find(product => product.id === parseInt(req.params.id));

  if (!productofound) {
    return res.status(404).json({
      message: 'Producto no encontrado'
    });
  }

  const newdata = req.body;

  productos = productos.map(p => (p.id === parseInt(req.params.id) ? {...p, ...newdata} : p));

  res.json({
    message: 'Producto actualizado con éxito'
  });
});

// Borrar producto (DELETE)
app.delete('/producto/:id', (req, res) => {
  const productofound = productos.find(product => product.id === parseInt(req.params.id));

  if (!productofound) {
    return res.status(404).json({
      message: 'Producto no encontrado'
    });
  }

  productos = productos.filter(productos => productos.id !== parseInt(req.params.id));
  res.json({
    message: 'Producto eliminado con éxito'
  });
});

// Consultar producto por ID (GET)
app.get('/producto/:id', (req, res) => {
  const productofound = productos.find(product => product.id === parseInt(req.params.id));

  if (!productofound) {
    return res.status(404).json({
      message: 'Producto no encontrado'
    });
  }

  res.json(productofound);
});

// Iniciar servidor
app.listen(port, host, () => {
  console.log(`Servidor iniciado en http://${host}:${port}`);
});

app.use((req, res) => {
  res.send('Hay un error');
});
