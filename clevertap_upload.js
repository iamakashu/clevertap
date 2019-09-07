


const csv = require('csv-parser');
const fs = require('fs');

var request = require('request');

var headers = {
    'X-CleverTap-Account-Id': 'KK4-R6K-565Z',
    'X-CleverTap-Passcode': 'PASSCODE', 
    'Content-Type': 'application/json; charset=utf-8'
};


fs.createReadStream('TAM Test Data Upload - Sheet1.csv')
  .pipe(csv())
  .on('data', (row) => {
    // console.log(row['User ID']);
    // console.log(row['Location']);
    // console.log(row['Customer Type']);
    // console.log(row['Subcription ID']);
    // console.log(row['Gender']);
    // 'Male' ,  // Female
    // console.log(row);

    var profileData = {};
    profileData["Location"] =  row["Location"];
    profileData["Customer Type"] = row["Customer Type"];
    profileData["Subcription ID"] = row["Subcription ID"];
    profileData["Gender"] = row["Gender"] == "Female" ? "F" : "M";

    var userObject = {};
    userObject["objectId"] = row["User ID"];
    userObject["type"] = "profile";
    userObject["profileData"] = profileData;

    var d = [];
    d.push(userObject);

    var requestObject = {};
    requestObject["d"] = d;

    var requestString = JSON.stringify(requestObject);

    // console.log(requestString);


    var options = {
        url: 'https://api.clevertap.com/1/upload',
        method: 'POST',
        headers: headers,
        body: requestString
    };
    
    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
        else {
            //console.log(response.statusCode);
            console.log(body);
        }
    }
    
    request(options, callback);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });