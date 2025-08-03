const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth'); // Not relevant to schedule
let scheduled = require('./routes/sheduleRoutes');
let userRoute=require('./routes/userRoutes');
let course=require('./routes/courseRoutes');
let exam=require('./routes/examRoutes');

const app = express();

app.use(express.json());
app.use('/api', authRoutes);
app.use('/api', scheduled);
app.use('/user',userRoute);
app.use('/api',course);
app.use('/api',exam);


module.exports = app;

/*
implemented crud operation of schedule course and exam
*/