/**
 * Module dependencies.
 */
var util = require('util')
  , OAuthStrategy = require('passport-oauth').OAuthStrategy
  , InternalOAuthError = require('passport-oauth').InternalOAuthError;


/**
 * `Strategy` constructor.
 *
 * The 500px authentication strategy authenticates requests by delegating to
 * 500px using the OAuth protocol.
 *
 * Applications must supply a `verify` callback which accepts a `token`,
 * `tokenSecret` and service-specific `profile`, and then calls the `done`
 * callback supplying a `user`, which should be set to `false` if the
 * credentials are not valid.  If an exception occured, `err` should be set.
 *
 * Options:
 *   - `consumerKey`     identifies client to 500px
 *   - `consumerSecret`  secret used to establish ownership of the consumer key
 *   - `callbackURL`     URL to which 500px will redirect the user after obtaining authorization
 *
 * Examples:
 *
 *     passport.use(new _500pxStrategy({
 *         consumerKey: '123-456-789',
 *         consumerSecret: 'shhh-its-a-secret'
 *         callbackURL: 'https://www.example.net/auth/500px/callback'
 *       },
 *       function(token, tokenSecret, profile, done) {
 *         User.findOrCreate(..., function (err, user) {
 *           done(err, user);
 *         });
 *       }
 *     ));
 *
 * @param {Object} options
 * @param {Function} verify
 * @api public
 */
function Strategy(options, verify) {
  options = options || {};
  options.requestTokenURL = options.requestTokenURL || 'https://api.500px.com/v1/oauth/request_token';
  options.accessTokenURL = options.accessTokenURL || 'https://api.500px.com/v1/oauth/access_token';
  options.userAuthorizationURL = options.userAuthorizationURL || 'https://api.500px.com/v1/oauth/authorize';
  options.sessionKey = options.sessionKey || 'oauth:500px';

  OAuthStrategy.call(this, options, verify);
  this.name = '500px';
}

/**
 * Inherit from `OAuthStrategy`.
 */
util.inherits(Strategy, OAuthStrategy);

/**
 * Retrieve user profile from 500px.
 *
 * This function constructs a normalized profile, with the following properties:
 *
 *   - `provider`         always set to `facebook`
 *   - `id`               the user's 500px ID
 *   - `username`         the user's 500px username
 *   - `displayName`      the user's full name
 *   - `name.familyName`  the user's last name
 *   - `name.givenName`   the user's first name
 *   - `profileUrl`       the URL of the profile for the user on 500px
 *   - `emails`           the proxied or contact email address granted by the user
 *
 * @param {String} accessToken
 * @param {Function} done
 * @api protected
 */
Strategy.prototype.userProfile = function(token, tokenSecret, params, done) {
  this._oauth.get('https://api.500px.com/v1/users', token, tokenSecret, function (err, body, res) {
    if (err) { return done(new InternalOAuthError('failed to fetch user profile', err)); }
    
    try {
      var json = JSON.parse(body);
      
      var profile = { provider: '500px' };
      profile.id = json.user.id;
      profile.username = json.user.username;
      profile.displayName = json.user.fullname;
      profile.name = { familyName: json.user.lastname,
                       givenName: json.user.firstname };
      profile.profileUrl = 'http://500px.com/'+json.user.username;
      profile.emails = [{ value: json.user.email }];
      
      profile._raw = body;
      profile._json = json;

      done(null, profile);
    } catch(e) {
      done(e);
    }
  });
}


/**
 * Expose `Strategy`.
 */
module.exports = Strategy;
