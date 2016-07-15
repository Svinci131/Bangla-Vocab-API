module.exports = function( url ) {
  return new Promise(function (resolve, reject){
    request( url, function( err, response, body ){
      if ( err ) {
        reject( err );
      }
      else {
        resolve( body );
      }
    });
  });
}
