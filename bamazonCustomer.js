//bamazon varibles and getting everything set up
var mysql = require('mysql');
var inquirer = require('inquirer');
var table = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889, //the port number should be 8889
    user: "root", 
    password: "root", //if the "" dont work try root (always have problems with this)
    database: "Bamazon"
});
// make the connection!
// Connect to the database and create a function that runs the "displayProducts()" function which contains all the products organized in a table
function productItems() {
	connection.connect(function(err) {

		connection.query("SELECT * FROM products", function(err, res) {
		if (err) throw err
		else console.table(res , "\n");
		productId();
		});
	});
}
productItems();

//my values
// //'Tshirt', 'clothing', 9.99, 3),
// ('Basketball', 'sporting goods', 15.00, 10),
// ('Jersey', 'clothing', 20.00, 5),
// ('The Notebook', 'movies and tv', 10.00, 8),
// ('Ramen', 'grocery', 10.00, 30),
// ('The Bible', 'books', 0.25, 50),
// ('Memoirs of a Geisha', 'movies and tv', 10.00, 5),
// ('Puma Slides', 'shoes', 60.00, 10),
// ('Hamburger Helper', 'grocery', 3.99, 15),
// ('Baseball', 'sporting goods', 10.00, 6);




//prouction
function productId() {

	inquirer.prompt([

		{
		 type: "input",
		 name: "id",
		 message: "Please enter the Item ID of the product you would like to buy.\n",
		 validate: function(value) {
		 	if (!isNaN(value) && value < 11) {
		 		return true;
		 	}
		 	return false;
		 }
		},

		{
		 type: "input",
		 name: "quant",
		 message: "How many units of the product would you like to buy? \n",
		 validate: function(value) {
		 	if (!isNaN(value)) {
		 		return true;
		 	}
		 	return false;
			}
		}

		]).then(function(answer) {

			var userId = answer.id;
			console.log("Chosen item id: " , userId);

			var userQuant = answer.quant;
			console.log("Chosen quantity from stock: " , userQuant , "\n");

			connection.query("SELECT * FROM products WHERE ?", [{ item_id : answer.id }], function(err, res) {
				if (err) throw err;
				
				
				console.table(res);
				var current_quantity = res[0].stock_quantity;
				console.log("Current amount in stock: " , current_quantity);
				var price = res[0].price;
				var remaining_quantity = current_quantity - answer.quant;
				console.log("Remaining amount in stock: " , remaining_quantity);

				if(current_quantity > answer.quant) {

					console.log("Amount Remaining: " + remaining_quantity);
					console.log("Total Cost: " + (answer.quant * price) + "\n");

					connection.query("UPDATE products SET stock_quantity=? WHERE item_id=?",
                    [
                    remaining_quantity, answer.id
                    ],

					
						function(err, res){
							console.table(res);
						});

					connection.query("SELECT * FROM products", function(err, res) {

						console.log("This is the updated inventory of product items: ");
						console.log("------------------------------- \n");
						console.table(res);
					});

				} else {
					console.log("We don't have enough, please choose within the amount we have in stock.");
				}

			connection.end();

			});
		})

}