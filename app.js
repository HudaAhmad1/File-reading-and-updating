var async = require('async');
const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})
// start of code
var path;
rl.question(` Enter path `, (paths) => {
    path = paths;
    console.log(employeesData(path));
    rl.close()

})

// ... ...Function Employee Data ... ... ... ...//

function employeesData(path) {
    const fs = require("fs");
    fs.readFile(path, function (err, data) {
        try {
            var values = JSON.parse(data);
            console.log(path + " JSON File.");
            console.table(values.employees);

            const rl = require('readline').createInterface({
                input: process.stdin,
                output: process.stdout
            })
            rl.question(` Please update the row or column? `, (update) => {
                rl.close()
                if (update === "row") {
                    const rl = require('readline').createInterface({
                        input: process.stdin,
                        output: process.stdout
                    })
                    var info = {};
                    async.series([
                        (callback) => {
                            rl.question(`Please enter id: `, function (data) {
                                info.id = Number(data);
                                callback();
                            })
                        },

                        (callback) => {
                            rl.question(`Please enter name: `, function (data) {
                                info.name = data;
                                callback();
                            })
                        },

                        (callback) => {
                            rl.question(`Please enter age: `, function (data) {
                                rl.close();
                                info.age = Number(data);
                                callback();
                                var obj = values.employees;
                                for (i = 0; i < obj.length; i++) {
                                    if (obj[i].id == info.id) {
                                        obj[i].name = info.name;
                                        obj[i].age = info.age;
                                    }
                                }

                                fs.writeFile(path, '{"employees":' + JSON.stringify(obj) + '}', (err) => {
                                    if (err) console.log('Error writing file:', err)
                                });
                                console.table(values.employees);
                            })
                        }

                    ]);

                    () => {
                    }

                }
                else if (update === "column") {
                    const rl = require('readline').createInterface({
                        input: process.stdin,
                        output: process.stdout
                    })
                    var info = {};
                    async.series([
                        (callback) => {

                            console.log("NOTE: When entering a column name that doesn't exist, it will be added to the json file.")
                            rl.question(`Please enter column name: `, function (data) {
                                info.colName = data;
                                callback();
                            })
                        },

                        (callback) => {
                            rl.question(`Please enter new data: `, function (data) {
                                rl.close();
                                info.value = data;
                                callback();
                                var i = 0;
                                var obj = values.employees;

                                for (i = 0; i < obj.length; i++) {
                                    obj[i][info.colName] = info.value;
                                }

                                fs.writeFile(path, '{"employees":' + JSON.stringify(obj) + '}', (err) => {
                                    if (err) console.log('Error writing file:', err)
                                });
                                console.table(values.employees);
                            })
                        }

                    ]);

                    () => {
                    }

                } else {
                    console.log("Erorr input...")
                }
            })

        }
        catch (err) {
            console.log(path + " not JSON File! ");
        }

    });
}

