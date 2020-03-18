const AWS = require("aws-sdk");

const typeCheck = function (v, t) {
  return Object.prototype.toString.call(v) === '[object ' + t + ']';
};


exports.handler = async (event) => {
  if (typeCheck(event.Records, 'Array') 
    && typeCheck(event.Records[0].EventSource, 'String')
    && event.Records[0].EventSource === 'aws:sns') {

    event.Records.map(record => {
        console.log([record.Sns.Subject, record.Sns.Message].join(': '));
    });

  }
  return true;
};

