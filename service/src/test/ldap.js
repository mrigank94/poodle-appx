const deasync = require('deasync');
const ldap = require('ldapjs');

let client = ldap.createClient({
  url: 'ldap://app-x.org:389/'
});

var opts = {
    filter: '(&(objectClass=person)(cn=centos))',
    scope: 'sub',
    attributes: ['memberOf']
}

//client.bind('cn=admin,dc=app-x,dc=org', '23KXH4nOBLv4bBdT1hKphMzsUAqdeghs', (err, result) => {
client.bind('cn=guest,ou=people,dc=app-x,dc=org', 'P@@dle101', (err, result) => {
    if (err) {
        console.log(`FAILURE: ${err}`)
        return
    }
    //console.log(result)
    console.log(`SUCCESS: ${result}`)
    client.search('dc=app-x,dc=org', opts, function (err, search) {
        if (err) {
            console.log(`FAILURE: ${err}`)
            return
        }
        search.on('searchEntry', function (entry) {
            var object = entry.object;
            console.log(object);
        })
    })
})

/*
var LdapClient = require('ldapjs-client');
var client = new LdapClient({ url: 'ldap://192.168.1.200:389' });

try {
  await client.bind('admin', '23KXH4nOBLv4bBdT1hKphMzsUAqdeghs');
  console.log('Bind successful')
} catch (e) {
  console.log('Bind failed')
}
*/
