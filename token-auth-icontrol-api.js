//curl -k  -X POST -u admin:changeme -d "{'user': {'link':'https://192.168.218.150/mgmt/shared/authz/users/admin'}, 'timeout': 1200, 'address':'192.168.218.1'}"  https://192.168.218.150/mgmt/shared/authz/tokens
//curl -k  -X POST -u admin:changeme -d "{'user': {'link':'https://192.168.218.15/mgmt/shared/authz/users/admin'}, 'timeout': 1200, 'address':'192.168.218.1'}"  https://192.168.218.15/mgmt/shared/authz/tokens
//curl -H "X-F5-Auth-Token: OGZUQAXH6BNYMGZQ33K2VVMABG" https://localhost/mgmt/shared/echo

var https = require('https');
// var username = 'admin';
// var password = 'changeme';
// var password = 'admin';
var iControlRESTUrl = '/mgmt/shared/authz/tokens';
var restServer = '192.168.218.150';
var maxTokenRequest = 1;
var count = 0;

var data = 
{
	'user': {'link':'https://192.168.218.150/mgmt/shared/authz/users/admin'}, 
	'timeout': 1200,
	'address':'192.168.218.1'
};

var options = 
{
	host: restServer,
	port: 443,
	method: 'POST',
	path: iControlRESTUrl,
	auth: 'admin:admin',
	rejectUnauthorized: false,
	headers: 
	{
		'Content-Type': 'application/json',
	}
};

function processResponse(resp)
{
	console.log(resp.statusCode);

	if ((resp.statusCode == 200) && (count <= maxTokenRequest))
	{
		var req = https.request(options, processResponse);
		req.write(JSON.stringify(data));
		req.end();
		count++;
		console.log('******** count: ', count, ' ****************');
	}

	resp.on('data', function(body)
	{
		console.log(JSON.parse(body));
	});

	resp.on('error', function(e)
	{
		console.error(e);
	});
}

var req = https.request(options, processResponse);
console.log(data);
req.write(JSON.stringify(data));
req.end();
count++;
console.log('******** count: ', count, ' ****************');

req.on('error', function(e)
{
	console.error(e);
});
