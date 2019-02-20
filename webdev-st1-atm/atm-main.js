const ATM = {
    init: function() {
      this.is_auth = false;
      this.current_user = false;
      this.current_type = false;
    },

    // all cash of ATM
    cash: 2000,
    // all available users
    users: [
        {number: "0000", pin: "000", debet: 0, type: "admin"}, // EXTENDED
        {number: "0025", pin: "123", debet: 675, type: "user"}
    ],
    //cash actions
    cash_actions: ["Init ATM, cash: 2000"],
    // authorization
    auth: function(number, pin) {
      if (this.is_auth || typeof(number) != "string" || typeof(pin) != "string") {
        return false;
      }

      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].number == number && this.users[i].pin == pin) {
          this.is_auth = true;
          this.current_user = i;
          this.current_type = this.users[i].type;
          return true;
        }
      }

      return false;
    },
    // check current debet
    check: function() {
      if (!this.is_auth) {
        return "not authorized user"
      }

      return this.users[this.current_user].debet;
    },
    // get cash - available for user only
    getCash: function(amount) {
      if (!this.is_auth) {
        return "not authorized user"
      }

      this.add_cash_action("withdrawal", amount);
      let new_debet = this.users[this.current_user].debet - amount;

      if (this.is_auth_user() && new_debet >= 0) {
        this.users[this.current_user].debet -= amount;
        this.cash = new_debet;
      }

      return this.users[this.current_user].debet;
    },
    // load cash - available for user only
    loadCash: function(amount){
      if (!this.is_auth) {
        return "not authorized user"
      }

      this.add_cash_action("top up", amount);

      if (this.is_auth_user() && amount > 0) {
        this.users[this.current_user].debet += amount;
        this.cash += amount;
      }

      return this.users[this.current_user].debet;
    },
    // check user
    is_auth_user: function() {
      return this.current_type != "admin" && this.is_auth;
    },
    // add cash action
    add_cash_action: function(operation, amount) {
      this.cash_actions.push("user: " + this.users[this.current_user].number + ", " + operation + ": " + amount);
    },
    // load cash to ATM - available for admin only - EXTENDED
    load_cash: function(addition) {
      if (!this.is_auth) {
        return "not authorized user"
      }

      this.add_cash_action("load cash to ATM", addition);

      if (this.current_type == "admin" && addition > 0) {
        this.cash += addition;
        return this.cash;
      }

      return -1;
    },
    // get report about cash actions - available for admin only - EXTENDED
    getReport: function() {
      if (this.current_type == "admin") {
        for (let action of this.cash_actions) {
          console.log(action);
        }
      }
    },
    // log out
    logout: function() {
      this.init();
      return true;
    }
};
ATM.init();
