/* jshint esversion: 9 */
// Lambda URL shortener function, called via API Gateway
// Creates an Amazon S3 object with random name and adds metadata for http redirect
const AWS = require('aws-sdk');
const url = require('url');
const uid = require('uuid5');
const s3 = new AWS.S3({ region: process.env.BUCKET_REGION });

// generate a 7 char shortid
const shortid = () => {
  return 'xxxxxx'.replace(/x/g, (c) => {
    return (Math.random() * 36 | 0).toString(36);
  });
};

const getRes = (url_short, err) => {
  var headers = {
    'Content-Type': 'application/json'
  };
  return {
    statusCode: err ? '400' : '200',
    body: err ? '{"message": "' + err.message + '"}' : url_short,
    headers: headers
  };
};

const is_urllong_used = async (s3_bucket, url_long_id) => {

  let s3test = new Promise((s, f) => {
    s3.headObject({ Bucket: s3_bucket, Key: url_long_id }, (err, data) => {
      if (err) {
        if (err.code === "NotFound") {
          s(false);
        } else {
          f(err);
        }
      } else {
        s(true);
      }
    });
  });
  const isUsed = await s3test;
  return isUsed;
};

const is_shortid_used = async (s3_bucket, key_short) => {

  let s3test = new Promise((s, f) => {
    s3.headObject({ Bucket: s3_bucket, Key: key_short }, (err, data) => {
      if (err) {
        // we should normall have a NotFound error showing that the id is not already in use
        if (err.code === "NotFound") {
          s(false);
        } else {
          // treat all other errors as fatal
          f(err);
        }
      } else {
        s(true);
      }
    });
  });
  const isUsed = await s3test;
  return isUsed;
};

const write_redirector = async (s3_bucket, key_short, url_long) => {

  let s3Writer = new Promise((s, f) => {
    s3.putObject({ Bucket: s3_bucket, Key: key_short, Body: "", WebsiteRedirectLocation: url_long, ContentType: "text/plain" },
      (err, data) => {
        if (err) { f(err); }
        else {
          s(true);
        }
      });
  });
  const wroteItem = await s3Writer;
  return wroteItem;
};

const write_long_id = async (s3_bucket, url_long_id, key_short) => {

  let s3Writer = new Promise((s, f) => {
    s3.putObject({ Bucket: s3_bucket, Key: url_long_id, Body: key_short, ContentType: "text/plain" },
      (err, data) => {
        if (err) { f(err); }
        else {
          s(key_short);
        }
      });
  });
  const wroteItem = await s3Writer;
  return wroteItem;
};

const get_existing_short_id = async (s3_bucket, url_long_id) => {

  let s3reader = new Promise((s, f) => {
    s3.getObject({
      Bucket: s3_bucket,
      Key: url_long_id
    }, function (err, data) {
      if (err) {
        f(err);
      } else {
        s(data.Body.toString());
      }
    });
  });
  const item = await s3reader;
  return item;
};

const get_shortid_redirect = async (s3_bucket, key_short) => {

  let s3Metadata = new Promise((s, f) => {
    s3.headObject({ Bucket: s3_bucket, Key: key_short }, (err, data) => {
      if (err) {
        // we should normall have a NotFound error showing that the id is not already in use
        if (err.code === "NotFound") {
          s(false);
        } else {
          // treat all other errors as fatal
          f(err);
        }
      } else {
        s(data.WebsiteRedirectLocation);
      }
    });
  });
  const metadata = await s3Metadata;
  return metadata;
};



const check_and_create_s3_redirect = async (s3_bucket, key_short, url_long, cb) => {
  try {
    // lets check if long url is already shortened
    var url_long_id = uid(url_long);
    var long_exists = await is_urllong_used(s3_bucket, url_long_id);
    if (long_exists) {
      key_short = await get_existing_short_id(s3_bucket, url_long_id);
    } else {
      var short_exists = await is_shortid_used(s3_bucket, key_short);
      if (short_exists) {
        key_short = shortid();
        short_exists = await is_shortid_used(s3_bucket, key_short);
        if (short_exists) {
          key_short = shortid();
          short_exists = await is_shortid_used(s3_bucket, key_short);
          if (short_exists) {
            return getRes(null, "Cannot create Short URL");
          }
        }
      }
      await write_redirector(s3_bucket, key_short, url_long);
      await write_long_id(s3_bucket, url_long_id, key_short);
    }
    const ret_url = "http://" + s3_bucket + "/" + key_short; // s3_bucket is same as url 
    console.log("Success, short_url = " + ret_url);
    return ret_url;

  } catch (err) {
    console.log(err);
    return false;
  }
};

const delete_s3_item = async (s3_bucket, item_key) => {
  console.log("Delete Item: s3://%s/%s", s3_bucket, item_key);
  var unlink = new Promise((s, f) => {
    var params = {
      Bucket: s3_bucket,
      Key: item_key
    };
    s3.deleteObject(params, function (err, data) {
      if (err) f(err);
      else s();
    });
  });

  await unlink;
};

const replace_s3_redirect = async (s3_bucket, id_short, url_long, cb) => {

  console.log("ShortID to replace: %s", id_short);
  var old_long_url = await get_shortid_redirect(s3_bucket, id_short);
  var old_long_url_id = uid(old_long_url);

  await delete_s3_item(s3_bucket, id_short).catch((err) => { console.log(err); });
  await delete_s3_item(s3_bucket, old_long_url_id).catch((err) => { console.log(err); });

  const res = await check_and_create_s3_redirect(s3_bucket, id_short, url_long, cb);
  return res;
};


exports.handler = async (event) => {
  console.log("%j", event);
  const data = JSON.parse(event.body);
  const url_long = data.url;
  const s3_bucket = process.env.BUCKET_NAME;

  // check if url is valid
  const url_check = url.parse(url_long);
  if (!((url_check) && (url_check.host))) { return getRes("", "Invalid URL format"); }

  console.log("Long URL to shorten: " + url_long);
  var id_short = shortid();
  var res;

  if (data.hasOwnProperty('id_short')) {
    id_short = data.id_short;
  } 
   res = await check_and_create_s3_redirect(s3_bucket, id_short, url_long);
  
  return getRes(res, null);
};

