# Passport-500px

[Passport](http://passportjs.org/) strategy for authenticating with [500px](http://www.500px.com/)
using the OAuth 1.0a API.

This module lets you authenticate using 500px in your Node.js applications.
By plugging into Passport, 500px authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).

## Installation

    $ npm install passport-500px

## Usage

#### Configure Strategy

The 500px authentication strategy authenticates users using a 500px account
and OAuth tokens.  The strategy requires a `verify` callback, which accepts
these credentials and calls `done` providing a user, as well as `options`
specifying a consumer key, consumer secret, and callback URL.

    passport.use(new _500pxStrategy({
        consumerKey: _500px_OAUTH_KEY,
        consumerSecret: _500px_OAUTH_SECRET,
        callbackURL: "http://localhost:3000/auth/500px/callback"
      },
      function(token, tokenSecret, profile, done) {
        User.findOrCreate({ '500pxId': profile.id }, function (err, user) {
          return done(err, user);
        });
      }
    ));

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'500px'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

    app.get('/auth/500px',
      passport.authenticate('500px'),
      function(req, res){
        // The request will be redirected to 500px for authentication, so this
        // function will not be called.
      });
    
    app.get('/auth/500px/callback', 
      passport.authenticate('500px', { failureRedirect: '/login' }),
      function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
      });

## Examples

For a complete, working example, refer to the [login example](https://github.com/jeremybenaim/passport-500px/tree/master/examples/login).

[![Build Status](https://secure.travis-ci.org/jaredhanson/passport-500px.png)](http://travis-ci.org/jeremybenaim/passport-500px)

## Credits

  - [Jeremy Benaim](http://github.com/jeremybenaim)
  - based on [Jared Hanson](http://github.com/jaredhanson) previous work

## License

(The MIT License)

Copyright (c) 2012 Jared Hanson

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
