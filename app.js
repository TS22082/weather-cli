const inquirer = require("inquirer");
const weather = require("weather-js");

weatherSearch = () => {
  inquirer
    .prompt({
      type: "input",
      message: "Enter a zip OR city st",
      name: "userSearch"
    })
    .then(res => {
      weather.find({ search: res.userSearch, degreeType: "F" }, function(
        err,
        result
      ) {
        if (err) console.log(err);
        console.log(result);
        mainMenu();
      });
    });
};

mainMenu = () => {
  inquirer
    .prompt({
      type: "list",
      message: "What would you like to do?",
      choices: ["Search", "Quit"],
      name: "main"
    })
    .then(res => {
      if (res.main === "Quit") {
        process.exit();
      } else {
        weatherSearch();
      }
    });
};

mainMenu();
