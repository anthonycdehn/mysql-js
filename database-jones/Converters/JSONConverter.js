/*
 Copyright (c) 2014, Oracle and/or its affiliates. All rights
 reserved.
 
 This program is free software; you can redistribute it and/or
 modify it under the terms of the GNU General Public License
 as published by the Free Software Foundation; version 2 of
 the License.
 
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 GNU General Public License for more details.
 
 You should have received a copy of the GNU General Public License
 along with this program; if not, write to the Free Software
 Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA
 02110-1301  USA
*/

/**********************
  This is the standard TypeConverter class used with JSON columns.
  A JavaScript object is converted to and from a string in the database.

  Writing from JavaScript to DB, this converter takes a JavaScript object and
  returns a string using JSON.stringify. 

  Reading from DB to JavaScript, this converter takes a string formatted as 
  JSON.stringify and parses it into a JavaScript object to store in a field.
  
************************/

"use strict";

var udebug = unified_debug.getLogger("JSONConverter.js");

exports.toDB = function(jsValue) {
  var result;
  try {
    result = JSON.stringify(jsValue);
  } catch(ignore) {
    // if any errors, leave undefined which does not send anything to the database
  }
  if (udebug.is_detail()) {
    udebug.log_detail('JSONConverter toDB jsValue:', jsValue, 'result: (', typeof result, ')', result);
  }
  return result;
};

exports.fromDB = function(dbValue) {
  var result;
  try {
    result = JSON.parse(dbValue);
  } catch(ignore) {
    // if any errors, pass through as undefined
  }
  if (udebug.is_detail()) {
    udebug.log_detail('JSONConverter fromDB dbValue:', dbValue, 'result: (', typeof result, ')', result);
  }
  return result;
};
