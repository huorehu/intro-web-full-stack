const ATM = {
    ACTION_MESSAGE: {
        succ_auth: "successful authorization",
        unsucc_auth: "unsuccessful authorization",
        already_auth: "already authorized",
        permission_denied: "permission denied",
        check: "check account debit",
        withdrawal: "withdrawal cash",
        not_enough_cash: "not enough cash in the ATM",
        insufficient_debit: "insufficient debit",
        top_up_account: "top up account",
        load_cash: "load cash to ATM",
        get_report: "get a report",
        logout: "logout"
    },

    MESSAGE_COLOR: {
        red: "color: red",
        orange: "color: orange",
        green: "color: green"
    },

    // all cash of ATM
    cash: 2000,

    // all available users
    users: [
        {number: "0000", pin: "000", debit: 0, type: "admin"}, // EXTENDED
        {number: "0025", pin: "123", debit: 675, type: "user"}
    ],

    // authorization
    auth: function (number, pin) {
        if (this.is_auth) {
            this.printMessage(this.users[this.current_user].number, this.ACTION_MESSAGE['already_auth'], "green");
            return;
        }

        if (!/\d{4}/.test(number) || !/\d{3}/.test(pin)) {
            this.printMessage("not authorized", this.ACTION_MESSAGE['unsucc_auth'], "red");
            return;
        }

        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].number === number && this.users[i].pin === pin) {
                this.is_auth = true;
                this.current_user = i;
                this.current_type = this.users[i].type;
                this.printMessage(this.users[this.current_user].number, this.ACTION_MESSAGE['succ_auth'], "green");
                return;
            }
        }

        this.printMessage("not authorized", this.ACTION_MESSAGE['unsucc_auth'], "red");
    },

    // check current debit
    check: function () {
        if (!this.is_auth) {
            this.printMessage("not authorized", "attempt " + this.ACTION_MESSAGE['check'] + ", " + this.ACTION_MESSAGE['permission_denied'], "red");
            return;
        }

        this.printMessage(this.users[this.current_user].number, "debit: " + this.users[this.current_user].debit, "green");
    },

    // get cash - available for user only
    getCash: function (amount) {
        const ACTION = this.ACTION_MESSAGE['withdrawal'] + " " + amount;

        if (!this.validateAccess(ACTION, (a, b) =>  a === b, amount)) {
            return;
        }

        if (!this.isEnoughDebit(amount)) {
            this.printMessage(this.users[this.current_user].number, this.ACTION_MESSAGE['insufficient_debit'], "orange");
            return;
        }

        if (!this.isEnoughCash(amount)) {
            this.printMessage(this.users[this.current_user].number, this.ACTION_MESSAGE['not_enough_cash'], "orange")
            return;
        }

        this.users[this.current_user].debit -= amount;
        this.cash -= amount;
        this.printMessage(this.users[this.current_user].number, ACTION, "green");
    },

    // load cash - available for user only
    loadCash: function (amount) {
        const ACTION = this.ACTION_MESSAGE['top_up_account'] + " " + amount;

        if (!this.validateAccess(ACTION, (a, b) =>  a === b, amount)) {
            return;
        }

        this.users[this.current_user].debit += amount;
        this.cash += amount;
        this.printMessage(this.users[this.current_user].number, this.ACTION_MESSAGE['top_up_account']
            + ", current debit: " + this.users[this.current_user].debit, "green");
    },

    // load cash to ATM - available for admin only - EXTENDED
    load_cash: function (addition) {
        const ACTION = this.ACTION_MESSAGE['load_cash'] + " " + addition;

        if (!this.validateAccess(ACTION, (a, b) =>  a !== b, addition)) {
            return;
        }

        this.cash += addition;
        this.printMessage(this.users[this.current_user].number, ACTION + ", current ATM cash: " + this.cash, "green");
    },

    // get report about cash actions - available for admin only - EXTENDED
    getReport: function () {
        if (this.current_type === "admin") {
            for (let action of this.cash_actions) {
                let message_color;

                if (action.includes("not authorized") || action.includes("denied")) {
                    message_color = 'red';
                } else if (action.includes("insufficient") || action.includes("attempt")) {
                    message_color = 'orange';
                } else {
                    message_color = 'green';
                }

                console.log("%c" + action, this.MESSAGE_COLOR[message_color]);
            }
            return;
        }

        this.printMessage(this.is_auth ? this.users[this.current_user].number : "not authorized",
            "attempt read ATM report, " + this.ACTION_MESSAGE['permission_denied'], "red");
    },

    // log out
    logout: function () {
        if (this.is_auth) {
            this.printMessage(this.users[this.current_user].number, this.ACTION_MESSAGE['logout'], "green");
            this.init();
        } else {
            console.log("%cYou are not authorized!", this.MESSAGE_COLOR['orange']);
        }
    },

    /* private methods */
    // ATM initialization
    init: function () {
        this.is_auth = false;
        this.current_user = false;
        this.current_type = false;
    },

    // initializes cash actions
    initCashActionATM: function () {
        this.cash_actions = ["Init ATM: cash " + this.cash + " - " + this.getCurrentDate()];
    },

    printMessage: function(user, message, color) {
        this.log_action(user, message);
        console.log("%c" + message, this.MESSAGE_COLOR[color]);
    },

    // log action
    log_action: function (user, message) {
        this.cash_actions.push(user + ": " + message + " - " + this.getCurrentDate());
    },

    // returns current date and time
    getCurrentDate: function () {
        return new Date().toLocaleString();
    },

    isEnoughDebit: function (amount) {
        return this.users[this.current_user].debit - amount > 0;
    },

    isEnoughCash: function (amount) {
        return this.cash - amount >= 0
    },

    isCorrectAmount: function (amount) {
        return amount > 0 && Number.isInteger(amount);
    },

    validateAccess: function (action, compareFunc, amount) {
        if (!this.is_auth) {
            this.printMessage("not authorized", "attempt " + action + ", " + this.ACTION_MESSAGE['permission_denied'], "red");
            return false;
        }

        if (compareFunc(this.current_type, "admin")) {
            this.printMessage(this.users[this.current_user].number, "attempt " + action + ", " + this.ACTION_MESSAGE['permission_denied'], "red")
            return false;
        }

        if (!this.isCorrectAmount(amount)) {
            this.printMessage(this.users[this.current_user].number, "attempt " + action, "orange");
            return false;
        }

        return true;
    }
};
ATM.init();
ATM.initCashActionATM();
