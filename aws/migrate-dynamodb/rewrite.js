
/** rewrites table config for create cmd **/

var skel = '{"AttributeDefinitions":[{"AttributeName":"","AttributeType":"B"}],"TableName":"","KeySchema":[{"AttributeName":"","KeyType":"HASH"}],"LocalSecondaryIndexes":[{"IndexName":"","KeySchema":[{"AttributeName":"","KeyType":"HASH"}],"Projection":{"ProjectionType":"ALL","NonKeyAttributes":[""]}}],"GlobalSecondaryIndexes":[{"IndexName":"","KeySchema":[{"AttributeName":"","KeyType":"HASH"}],"Projection":{"ProjectionType":"KEYS_ONLY","NonKeyAttributes":[""]},"ProvisionedThroughput":{"ReadCapacityUnits":0,"WriteCapacityUnits":0}}],"BillingMode":"PROVISIONED","ProvisionedThroughput":{"ReadCapacityUnits":0,"WriteCapacityUnits":0},"StreamSpecification":{"StreamEnabled":true,"StreamViewType":"KEYS_ONLY"},"SSESpecification":{"Enabled":true,"SSEType":"KMS","KMSMasterKeyId":""},"Tags":[{"Key":"","Value":""}]}';

var tblname = process.argv[2];
var createjson = JSON.parse(skel);

console.log(tblname);

const fs = require('fs');

try {

  const cfg = fs.readFileSync('cfg_' + tblname + '.json', 'utf8');
  const data = JSON.parse(cfg);
  
  createjson.AttributeDefinitions = JSON.parse(JSON.stringify(data.Table.AttributeDefinitions));
  
  
  createjson.TableName = data.Table.TableName;
  createjson.KeySchema = data.Table.KeySchema;
  
  if(data.Table.hasOwnProperty("LocalSecondaryIndexes")){
     createjson.LocalSecondaryIndexes = JSON.parse(JSON.stringify(data.Table.LocalSecondaryIndexes));
  }else{
    delete createjson.LocalSecondaryIndexes;    
  }
  
  if(data.Table.hasOwnProperty("GlobalSecondaryIndexes")){
    createjson.GlobalSecondaryIndexes = JSON.parse(JSON.stringify(data.Table.GlobalSecondaryIndexes));
 }else{
   delete createjson.GlobalSecondaryIndexes;    
 }
 
if(data.Table.hasOwnProperty('StreamSpecification')){
  createjson.StreamSpecification = JSON.parse(JSON.stringify(data.Table.StreamSpecification));
}else{
  delete createjson.StreamSpecification
}

if(data.Table.hasOwnProperty('SSESpecification')){
  createjson.SSESpecification = JSON.parse(JSON.stringify(data.Table.SSESpecification));
}else{
  delete createjson.SSESpecification;  
}

if(data.Table.hasOwnProperty('Tags')){
  createjson.Tags = JSON.parse(JSON.stringify(data.Table.Tags));
}else{
  delete createjson.Tags;  
}


  createjson.BillingMode = data.Table.BillingModeSummary.BillingMode;
  if(createjson.BillingMode == 'PROVISIONED'){
    createjson.ProvisionedThroughput = JSON.parse(JSON.stringify(data.Table.ProvisionedThroughput));
  }else{
    delete createjson.ProvisionedThroughput;
  }
  
  fs.writeFileSync('create_' + tblname +'.json', JSON.stringify(createjson, null, 4));
  
} catch (err) {
  console.error(err);
}


