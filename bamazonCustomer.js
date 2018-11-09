const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require("cli-table");

var connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    displayProducts();
});

var table = new Table({
    head: ['ID', 'Product', 'Department', "Price", "Stock"]
    , colWidths: [5, 35, 35, 7, 10]
});

function displayProducts() {
    connection.query("SELECT * FROM products", function (err, data) {
        if (err) throw err;

        console.log("---------------------------------------------------------------------------")
        console.log("Welcome to our marketplace! Here are all of our products for sale!");
        console.log("---------------------------------------------------------------------------")

        for (let i = 0; i < data.length; i++) {
            table.push(
                [
                data[i].id, 
                data[i].product_name,
                data[i].department_name,
                 "$" + data[i].price, 
                 data[i].stock_quantity
                ]
            )
        }

        console.log(table.toString());
        selectItem();
    });
}

function selectItem() {

    connection.query("SELECT * FROM products", function (err, data) {

        if (err) throw err;
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "Select the ID for the item you would like to purchase!",
                    name: "id_question",
                    validate: function (id) {
                        if (id < data.length + 1) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                },
                {
                    type: "input",
                    message: "Please indicate the amount of units you would like to purchase",
                    name: "quantity_question",
                    validate: function (units) {
                        if (isNaN(units) === false) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                },
            ])
            .then(function (inquirerResponse) {
                
                console.log("Product Item #" + inquirerResponse.id_question);
                console.log(inquirerResponse.quantity_question + " Quantity");


                if (inquirerResponse.quantity > 200) {
                    console.log("Sorry, we don't carry anything in that quantity")
                } else {
                    console.log("Awesome! Your order will be shipped soon");
                }


            });
        });
    }
    

// 'function postMenu() {
//     inquirer
//         .prompt([
//             {
//                 type: "input",
//                 message: "What would you like to sell?",
//                 name: "auction"
//             },
//             {
//                 type: "input",
//                 message: "What is the starting bid of this item? (in dollars)",
//                 name: "startingBid"
//             },
//         ])
//         .then(function (inquirerResponse) {
//             // console.log(inquirerResponse.auction);
//             // console.log(inquirerResponse.startingBid);
//             createAuction(inquirerResponse.auction, inquirerResponse.startingBid)
//             // if (inquirerResponse.question === "BID ON AN ITEM") {
//             //     console.log("You decided to BID on an item! Select something to bid on")
//             // } else {
//             //     console.log("You decided to POST an item. What would you like to post?")
//             // }
//         });
// }

// // function createAuction(auction, startingBid) {
// //     console.log("Creating a new item...\n");
// //     var query = connection.query(
// //         "INSERT INTO auctionItems SET ?",
// //         {
// //             auction: auction,
// //             current_bid: startingBid,
// //             current_bidder: "No Bids Yet!"
// //         },
// //         function (err, res) {
// //         }
// //     );
// //     // logs the actual query being run
// //     console.log(query.sql);
// // }