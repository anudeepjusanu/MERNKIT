const request = require('request');
const fs = require('fs');

const options = {
  method: 'POST',
  url: 'https://rest-dev.evergent.com/ccb/getMasterData',
  headers:
   {
     'Content-Type': 'application/json'
   },
  body: { GetMasterDataRequest: { apiUser: 'ccb3dev', apiPassword: 'password1' } },
  json: true
};

request(options, (error, response, body) => {
  if (error) throw new Error(error);
  const { responseCode } = body.GetMasterDataResponse;
  if (responseCode === '1') {
    const { GetMasterDataResponse } = body;
    delete GetMasterDataResponse.responseCode;
    delete GetMasterDataResponse.status;
    const newLocal = 'app/config/masterData.js';
    const data = JSON.stringify(GetMasterDataResponse);
    const stringData = `export default masterData =${ data}`;

    fs.writeFile(newLocal, stringData, (err) => {
      if (err) throw err;
      console.log('File saved successfully');
    });
  } else {
    console.log('Something went wrong!');
  }
});
