# node-cms-api

This module adds a convenient and promise-based wrapper for RPI's Club Management
System API. A token is required for use, which can be obtained through CMS or by emailing the
Rensselaer Union Systems Administrators.

## Usage

```javascript
var cms = require('cms-api')('[add your token here]');
```

It is highly recommended that you do **not** let your API key be publicly accessible. As such, the best option for storing your key would be in a separate file that is included on your project's `.gitignore` and is not available to the end user.

Then, where you want to call the API:

```javascript
cms.getRCS('[rcs id here]').then(function (response) {
    console.log(response);
});
```

As of now, the current endpoints supported by this module are:
* `getRCS(rcs_id)` - this module takes a Rensselaer Computing System user id and returns user data
* `getRIN(rin)` - this module takes a Rensselaer Identification Number and returns user data
* `getWTG(rcs_id)` - this module takes a Rensselaer Computing System user id and returns whether or not the user is a member of the Web Technologies Group
* `getRNE(rcs_id)` - this module takes a Rensselaer Computing System user id and returns whether or not the user is a member of the Rules and Elections Committee
* `getOrgs(rin)` - this module takes a Rensselaer Identification Number and returns club objects where the user is an officer
* `getAllOrgs(rin)` - this module takes a Rensselaer Identification Number and returns club objects where the user is either a member or an officer
