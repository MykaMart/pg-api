let 	express 	= require('express');
let 	bodyParser	= require('body-parser');
let 	morgan		= require('morgan');
let 	pg 			= require('pg');

let pool = new pg.Pool({
	port: 5432,
	password: '',
	database: '"countries"',
	max: 10,
	host: 'localhost',
	user: 'postgres'
});

pool.connect((err, client, done) => {
	if(err) {
		return console.log(err);
	} else {
		var country_name 	= 'tttttttt';
		var continent_name 	= 'Europe';
		var id              = Math.random().toFixed(3)*100;

		client.query('INSERT INTO country (country_name, continent_name, id) VALUES($1, $2, $3)', [ country_name, continent_name, id ], (err, table) => {
			done();
			if(err) {
				return console.log(err);
			} else {
				console.log('INSERTED DATA SUCCESS');
				client.end();
			}
		})
	}
});

let 	app			= express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));



app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(3000, () => {
	console.log('listening')
})