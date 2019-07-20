// Import MySQL connection.
var connection = require("./connection.js");


function printQuestionMarks(num) {
    var arr = [];
  
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
  }
  


// / Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}


var orm = {

    all: function(tableInput, cb){
        connection.query('SELECT * FROM ' + tableInput+ ';' , function(err,res){
            if(err) throw err;
            cb(res)
        })
    },


    create: function(table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;
    
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";
    
        console.log(queryString);
    
        connection.query(queryString, vals, function(err, result) {
          if (err) {
            throw err;
          }
    
          cb(result);
        });
      },
     
      update: function(table, objColVals, condition, cb) {

        console.log()
        var queryString = "UPDATE " + table;
    
        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE id = ";
        queryString += condition;
    
        console.log(queryString);
        connection.query(queryString, function(err, result) {
          if (err) {
            throw err;
          }
    
          cb(result);
        });
      }
    };






//     update: function(tableInput, condition, cb){
//         var queryString= "UPDATE" + tableInput;
//         queryString += "SET"
//         queryString += "SET devoured=true WHERE id="
//         queryString += condition;
//         console.log(queryString)
//         connection.query(queryString, function(err,res){
//             if(err) throw err;
//             cb(res)
//         });
//     },
    
//     create: function(tableInput, val, cb){
//         var queryString = "INSERT INTO ?? VALUES ??";
//         console.log(queryString);
//         connection.query(queryString, [tableInput, val],function(err, res){
//             if(err) throw err;

//             cb(result);
//         });
//     }
// }


module.exports = orm;