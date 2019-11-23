const inquirer = require("inquirer");
const weather = require("weather-js");
const fs = require("fs");

readArchives = () => {
  fs.readFile("archive.txt", "utf8", (err, data) => {
    if (err) throw err;
    console.log(data);
    mainMenu();
  });
};

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
        const name = result[0].location.name,
          date = result[0].current.date,
          temp = result[0].current.temperature;

        const log = `\nname: ${name}\ndate: ${date}\ntemp: ${temp} F\n--------------------`;

        fs.appendFile("archive.txt", log, err => {
          if (err) throw err;
        });
        console.log(log);

        console.log("process complete :)");
        mainMenu();
      });
    });
};

mainMenu = () => {
  inquirer
    .prompt({
      type: "list",
      message: "What would you like to do?",
      choices: ["Search", "Read Archives", "Quit"],
      name: "main"
    })
    .then(res => {
      switch (res.main) {
        case "Quit":
          process.exit();
          break;
        case "Search":
          weatherSearch();
          break;
        case "Read Archives":
          readArchives();
          break;
        default:
          break;
      }
    });
};

mainMenu();
