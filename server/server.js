const express = require('express');
const connectDB=require('./config/db')
const app = express();
const cors=require('cors')
const authRoute=require('./routes/authRoute')
const postRoute=require('./routes/postRoute')
const notificationRoute=require('./routes/notificationRoute')
require('./jobs/notificationCleaner')

app.use(cors())
app.use(express.json())


connectDB();

app.use('/',authRoute);
app.use('/',postRoute);
app.use('/',notificationRoute);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});