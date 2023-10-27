const express = require('express');
const app = express();
const cors = require('cors');
const listRoute = require('./route/listRoute');
const userRoute = require('./route/userRoute')
const db = require('./models');


require('./config/passport/passport')

app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(express.json());
app.use('/list', listRoute);
app.use('/user', userRoute),


db.sequelize.sync().then(() => {
    app.listen(8000,() => {console.log('server is running at port 8000')});
})
