require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const errors = require('./src/middlewares/error');
const user = require('./src/controllers/userControler');
const category = require('./src/controllers/categoryController');
const post = require('./src/controllers/blogPostController');

const { PORT } = process.env || 3000;
const app = express();

app.use(bodyParser.json());

app.post('/login', rescue(user.login));

app.post('/user', rescue(user.createUser));
app.get('/user/:id', rescue(user.validateToken), rescue(user.getById));
app.get('/user', rescue(user.validateToken), rescue(user.getAll));
app.delete('/user/me', rescue(user.validateToken), rescue(user.deleteUser));

app.post('/categories', rescue(user.validateToken), rescue(category.createCategory));
app.get('/categories', rescue(user.validateToken), rescue(category.getAll));

app.post('/post', rescue(user.validateToken), rescue(post.createPost));
app.get('/post/:id', rescue(user.validateToken), rescue(post.getPostById));
app.get('/post', rescue(user.validateToken), rescue(post.getAllPosts));
app.put('/post/:id', rescue(user.validateToken), rescue(post.editPost));
app.delete('/post/:id', rescue(user.validateToken), rescue(post.deletePost));

app.use(errors);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
