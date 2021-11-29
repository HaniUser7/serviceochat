const express = require('express');
const app = express();


const PORT = process.env.PORT || 4000;
const connectDB = require('./config/db.js');
connectDB();

app.use('/api/files', require('./routes/files'));

app.listen(PORT, () => {
	console.log(`listen on port ${PORT}`);
});
