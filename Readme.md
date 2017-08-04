# Mongoose Authenticate

[![Greenkeeper badge](https://badges.greenkeeper.io/nicholaswyoung/mongoose-authenticatable.svg)](https://greenkeeper.io/)

Simple authentication methods for your Mongoose models.

## Usage

```javascript
var authenticatable = require('mongoose-authenticatable')
var Account = new mongoose.Schema()
Account.plugin(authenticatable)
```

Then, the plugin will automatically add fields for email, password, and an ```authenticate``` method that works like so:

```javascript
Account.findOne({ email: 'test@example.org' }, function (err, account) {
   account.authenticate(password, function (err, valid) {
      // if valid auth succeeded
   })
})
```

## License

Copyright (C) 2013 Original Machine LLC. All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

* Neither the name of the project nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

This software is provided by the copyright holders and contributors "as is" and
any express or implied warranties, including, but not limited to, the implied
warranties of merchantability and fitness for a particular purpose are
disclaimed. In no event shall the copyright holder be liable for any direct,
indirect, incidental, special, exemplary, or consequential damages (including,
but not limited to, procurement of substitute goods or services; loss of use,
data, or profits; or business interruption) however caused and on any theory of
liability, whether in contract, strict liability, or tort (including negligence
or otherwise) arising in any way out of the use of this software, even if
advised of the possibility of such damage.
