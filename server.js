const express = require('express');

const mongoose = require('mongoose');

const body_parser = require('body-parser');

const session = require('express-session');

const app = express();

const product= require("./model/product");

// Databse connnection

mongoose.connect('mongodb://127.0.0.1:27017/product').then(e =>{
    console.log("mongodb is conneced");
})

app.use(body_parser.urlencoded({ extended : false }));

app.use(body_parser.json());

//middleware for serving static file
app.use(express.static('public'));

//Set up EJS as template engine
app.set('view engine', 'ejs');

//Set up Session Middleware
app.use(session({
	secret : '1234567890abcdefghijklmnopqrstuvwxyz',
	resave : false,
	saveUninitialized : true,
	cookie : { secure : false }
}));



//Create Route for Load Product Data
app.get("/", async (request, response) => {

	if (!request.session.cart) {
		request.session.cart = [];
	}
	

	const products= await product.find({});
	response.render("product",{products:products, cart : request.session.cart });

});
//Create Route for Add Item into Cart
app.post('/add_cart', (request, response) => {

	const product_id = request.body.product_id;

	const product_name = request.body.product_name;

	const product_price = request.body.product_price;

	let count = 0;

	for(let i = 0; i < request.session.cart.length; i++)
	{

		
		if(request.session.cart[i].product_id === product_id)
		{
			request.session.cart[i].quantity += 1;

			count++;
		}

	}

	if(count === 0)
	{
		const cart_data = {
			product_id : product_id,
			product_name : product_name,
			product_price : parseFloat(product_price),
			quantity : 1
		};

		
	}

	response.redirect("/");

});
app.listen(3000, () => {

	console.log('Server has started on port number 3000');

});