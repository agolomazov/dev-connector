const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to mongoDB
mongoose
	.connect(db)
	.then(() => console.log('MongoDB Connected'))
	.catch(e => console.log(e));

app.get('/', (req, res) => {
	res.send('Hello!!!');
});

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const PORT = process.env.PORT || 5000;

app.listen(PORT, err => {
	if (!err) {
		console.log('Server is running!!!');
	}
});
