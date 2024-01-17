const fs = require('fs');
const express = require ("express");
const morgan = require('morgan');
const users = require('./routes/users');
const posts = require('./routes/posts');
const products = require('./routes/products');
const myMiddleware = require('./myMiddlewares/middlewares');
const error = require('./utilites/error');

const app = express();
const PORT = 3000;
// app.get('/', (req , res) => {
//     console.log(req.url);
//     res.send('<h1>Hello Express</h1>');
// });

// app engine
app.engine('perscholas', (filePath, options, callback) => {
    // templete file
    fs.readFile(filePath, (err, content) => {
        // if there is a error reading the file return!
        if (err) return callback(err);

        const rendered = content
        .toString()
        .replaceAll('#title#' , `${options.title}`)
        .replaceAll('#content#' , `${options.content}`)

        return callback(null , rendered);
    })
});

// config
app.set('views' , './views');// sets the views for the app
app.set('view engine', 'perscholas');// sets the templete engine for the app

//middelware
app.use(myMiddleware);
app.use(morgan('dev'));
app.use(express.static('./styles'));
app.use(express.static('./assets'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// button
app.get('/download', (req , res) => {
    res.download('./assets/Snorlax_Funny.jpg');
});

// user creation
app.post ('/user', (req , res) => {
    console.log(req.url);
    console.log(req.method);
    res.send('Creating new user.....')
});

// user Info and Password
app.get('/user', (req , res) => {
    console.log(req.url);
     res.send('Sending the user info!');
 });
 app.get('/user/:username/:password',(req , res) => {
    console.log(req.params);
    res.send(`Sending Profile info for User: ${req.params.userID}`);
});

app.post ('/post', (req , res) => {
    console.log(req.url);
    console.log(req.method);
    res.send('Creating new posts.....')
});

// products page
app.get('/products' , (req , res) => {
    console.log(req.url)
    res.send('<h2>Products page</h2>');
});
// brands
app.get('/shop/:brand' , (req , res) => {
    console.log(req.params.brand);
    res.send('Sending products......');
});
app.get('/', (req , res) => {
    console.log(req.url);
    res.render('index.perscholas', {title: "Gotta Catch Them All!", content: 'Life RN!'});
});
app.get('/login', (req, res) => {
    res.send('<h1>Login Page</h1>')
});

app.use ('/api/users', users);
app.use('/api/posts', posts);
app.use('api/products', products);


app.get('/', (req, res) => {
  res.send('Work in progress!');
});


// 404 Not Found Middleware
app.use((req, res, next) => {
    next(error(404, "Resource not found!"));
});
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: err.message });
  });

app.listen(5000)

/*
catch all route for redirect
*/
app.all('*' ,(req, res) => {
    res.redirect('https://perscholas.org');
});

// Port for server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});