var xml = require('xml');
 
exports.generateXML = function(contact) {
  return xml({
    'atom:entry':
    [
        {
            '_attr': {
                'xmlns:atom': 'http://www.w3.org/2005/Atom',
                'xmlns:gd': 'http://schemas.google.com/g/2005'
            }
        },
        {
            'atom:category': {
                '_attr': {
                    'scheme': 'http://schemas.google.com/g/2005#kind',
                    'term': 'http://schemas.google.com/contact/2008#contact'
                }
            }
        },
        {
            'gd:name': [
                { 'gd:fullName': contact.name }
            ]
        },
        {
            'gd:email': {
                '_attr': {
                    'rel': 'http://schemas.google.com/g/2005#work',
                    'primary': 'true',
                    'address': contact.email,
                    'displayName': contact.name
                }
            }
        }
    ]
}, true);
};