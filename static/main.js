class Profile {
    constructor(username, {firstname, lastname}, password) {
        this.username = username;
        this.name = {firstname, lastname};
        this.password = password;
    };

    create(callback) {
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

    logIn({username, password}, callback) {

    }
};

const ivan = new Profile('Ivan', {firstname: 'Ivan', lastname: 'Fedorov'}, 123456);

console.log(ivan);
