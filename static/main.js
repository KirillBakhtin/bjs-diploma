class Profile {
    constructor({ username, name: { firstName, lastName }, password}) {
        this.username = username;
        this.name = {firstName, lastName};
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
                callback(err, data);
            }
        ); 
    };

    performLogin(callback) {
        return ApiConnector.performLogin (
            {
                username: this.username,
                password: this.password,
            },
            (err, data) => {
                console.log(`Authorizing user ${this.username}`);
                callback(err, data);
            }
        );
    };

    addMoney({currency, amount}, callback) {
        return ApiConnector.addMoney (
            {currency, amount},
            (err, data) => {
                console.log(`Adding ${amount} of ${currency} to ${this.username}`);
                callback(err, data);
            }
        );
    };

    convertMoney({fromCurrency, targetCurrency, targetAmount}, callback) {
        return ApiConnector.convertMoney (
            {fromCurrency, targetCurrency, targetAmount},
            (err, data) => {
                console.log(`Converting ${fromCurrency} to ${targetAmount} ${targetCurrency}`);
                callback(err, data);
            }
        );
    };

    transferMoney({to, amount}, callback) {
        return ApiConnector.transferMoney (
            {to, amount},
            (err, data) => {
                console.log(`Transfering ${amount} to ${to}`);
                callback(err, data);
            }
        );
    }
};

function getStocks(callback) {
    return ApiConnector.getStocks (
        (err, data) => {
            console.log (`Getting stock info`);
            callback(err, data);
        }
    );
};


function main() {
    const user1 = new Profile({
        username: 'Ubivez', 
        name: {
            firstName: 'Grigori', 
            lastName: 'Zabelin'
        }, 
        password: '000000'
    });
    
    const user2 = new Profile({
        username: 'Timur007', 
        name: {
            firstName: 'Timur', 
            lastName: 'Rodriges'
        }, 
        password: '123456'
    });
    
    const startCapital = { currency: 'EUR', amount: 1000000 };

    getStocks((err, data) => {
        if (err) {
            console.error('Error during getting stocks');
        }
        const stocksInfo = data[0]; 

    user1.createUser (
        (err, data) => {
            if (err) {
                console.log (`Failed to create user ${user1.username}`);
            } else {
                console.log(`${user1.username} is created`);
                user1.performLogin(
                    (err, data) => {
                        if (err) {
                            console.log(`Failed to authorize user ${user1.username}`)
                        } else {
                            console.log(`${user1.username} is Authorized!`);
                            
                            user1.addMoney(startCapital, (err, data) => {
                                if (err) {
                                    console.log(`Failed to add money to ${user1.username}`)
                                } else {
                                    console.log(`Added ${startCapital.amount} ${startCapital.currency} to ${user1.username}`);
                                    
                                    const targetAmount = stocksInfo['EUR_NETCOIN'] * startCapital.amount;
                                    user1.convertMoney({
                                        fromCurrency: startCapital.currency, 
                                        targetCurrency: 'NETCOIN',
                                        targetAmount: targetAmount
                                    },
                                    (err, data) => {
                                        if (err) {
                                            console.log(`Failed to convert money`);
                                        } else {
                                            console.log(`Converted to coins ${user1.username}`);
                                            
                                            user2.createUser(
                                                (err, data) => {
                                                    if (err) {
                                                        console.log(`Failed to create user ${user2.username}`);
                                                    } else {
                                                        console.log (`${user2.username} is created`);
                                                        user1.transferMoney ({
                                                            to: user2.username,
                                                            amount: targetAmount,
                                                            },
                                                            (err, data) => {
                                                                if (err) {
                                                                    console.log(`Failed to transfer money`)
                                                                } else {
                                                                    console.log(`Transfering ${targetAmount} of netcoins to ${user2.username} \n${user2.username} got ${targetAmount} of netcoins`)
                                                                }
                                                            });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                }); 
                            
                            }
                        });
                    }
                });
        });
}

main();

    
