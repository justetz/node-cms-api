// Club Management System API operations
var https = require('https'),
    Q = require('q');

var defaults = {
    method: "GET",
    host: 'cms.union.rpi.edu',
    headers: {
        "Authorization": "Token ",
        "Content-Type": "application/json"
    }
};

var endpoints = {
    rcs:     '/api/users/view_rcs/%/',
    rin:     '/api/users/view_rin/%/',
    wtg:     '/api/users/get_if_wtg/%/',
    rne:     '/api/users/get_if_rne/%/',
    orgs:    '/api/users/get_orgs/%/',
    allOrgs: '/api/users/get_all_orgs/%/'
};

var execute = function(path) {
    var options = {
        method: defaults.method,
        host: defaults.host,
        path: path,
        headers: defaults.headers
    };

    var deferred  = Q.defer();

    var req = https.request(options, function(response) {
        response.setEncoding('utf8');

        var responseData = '';

        response.on('data', function(data) {
            responseData += data;
        });

        response.on('end', function() {
            deferred.resolve(responseData);
        });
    });

    req.on('error', function(err) {
        deferred.reject(err);
    });

    req.end();

    return deferred.promise;
};

module.exports = function (token) {
  if(!token) {
    throw "You need to specify a token!";
  } else {
    defaults.headers["Authorization"] = "Token " + token;
  }

  return {
    getRCS: function (rcs_id) {
        return execute(endpoints.rcs.replace(/%/g, rcs_id));
    },
    getRIN: function (rin) {
        return execute(endpoints.rin.replace(/%/g, rin));
    },
    getWTG: function(rcs_id) {
        return execute(endpoints.wtg.replace(/%/g, rcs_id));
    },
    getRNE: function(rcs_id) {
        return execute(endpoints.rne.replace(/%/g, rcs_id));
    },
    getOrgs: function(rin) {
        return execute(endpoints.orgs.replace(/%/g, rin));
    },
    getAllOrgs: function(rin) {
        return execute(endpoints.allOrgs.replace(/%/g, rin));
    }
  };
};
