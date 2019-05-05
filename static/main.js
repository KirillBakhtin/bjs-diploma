"use strict"

class Profile {
    constructor({ username, name: { firstname, lastname }, password}) {
        this.username = username;
        this.name = {firstname, lastname};
        this.password = password;
    };

    createUser(callback) {
        return ApiConnector.createUser (
            {
            username: this.username,
			name: this.name,
            password: this.password,
            },
            (err, data) => {
                console.log (`Creating user ${this.username}`);
                callback (err, data);
            }
        ) 
    };

    performLogin(callback) {
        return ApiConnector.performLogin (
            {
                username: this.username,
                password: this.password,
            },
            (err, data) => {
                console.log(`Authorizing user ${this.username}`);
                callback (err, data);
            }
        )

    };

    addMoney({currency, amount}, callback) {
        return ApiConnector.addMoney (
            {currency, amount},
            (err, data) => {
                console.log(`Adding ${amount} of ${curency} to ${this.username}`);
                callback (err, data);
            }
        )
    };

    convertMoney({fromCurrency, toCurrency, targetAmount}, callback) {
        return ApiConnector.convertMoney (
            {fromCurrency, toCurrency, targetAmount},
            (err, data) => {
                console.log(`Converting ${fromCurrency} to ${targetAmount} ${toCurrency}`);
                callback (err, data);
            }
        )
    };

    transferMoney({to, amount}, callback) {
        return ApiConnector.transferMoney (
            {to, amount},
            (err, data) => {
                console.log(`Transfering ${amount} to ${to}`);
                callback (err, data);
            }
        )
    }
};

function getStocks(callback) {
    return ApiConnector.getStocks (
        (err, data) => {
            console.log (`Getting stock info`);
            callback (err, data)
        }
    )
};


function main() {
    let user1 = new Profile ({
        username: 'Ubivez', 
        name: {
            firstname: 'Grigori', 
            lastname: 'Zabelin'
        }, 
        password: '000000'
    });
    
    let user2 = new Profile ({
        username: 'Timur007', 
        name: {
            firstname: 'Timur', 
            lastname: 'Rodriges'
        }, 
        password: '123456'
    });
    
    const money = { currency: 'EUR', amount: 500000 };

    getStocks((err, data) => {
        if (err) {
            console.error('Error during getting stocks');
        }
        const stocksInfo = data[data.length - 1]; 
    });

    user1.createUser (
        (err, data) => {
            if (err) {
                console.log (`Failed to create user ${user1.username}`);

            } else {
                console.log(`${user1.username} is created`);
            }
        }
    );    
};

main();

    
