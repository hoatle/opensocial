/**
 * Locale.js
 * Utility for Locale, dynamic binding message bundle with arguments
 * Usage:
 * eXo.social.Locale.Lang(); the same as prefs.getLang();
 * eXo.social.Locale.getCountry(); the same as prefs.getCountry();
 * eXo.social.Locale.getMsg(key); the same as prefs.getMsg(key);
 * eXo.social.Locale.getMsg(key, args); dynamic binding argument to message bundle
 * @author	hoatle <hoatlevan at gmail dot com>
 * @since	October 27, 2009
 * @copyright	eXo Platform
 */

(function() {
	//prefs object to get lang, country, message bundle
	var prefs;
	
	/**
	 * private function to lazily initialize prefs object
	 */
	function getPrefs() {
		if (!prefs) {
			prefs = new gadgets.Prefs();
		}
		return prefs;
	}
	/**
	 * Class definition
	 */
	var Locale = function() {
		
	}
	/**
	 * gets current lang
	 * @static
	 */
	Locale.getLang = function() {
		prefs = getPrefs();
		return prefs.getLang();
	}
	/**
	 * gets current country
	 * @static
	 */
	Locale.getCountry = function() {
		prefs = getPrefs();
		return prefs.getCountry();
	}
	/**
	 * alternative for prefs.getMsg(key)
	 * uses to getMsg with provided key and substitute args
	 * <p>
	 * eg: <msg key="test">Test for {0}, {1}</msg>
	 * If args does not match num of {\d}, warning and try to replace by corresponding index.
	 * {0} should be replaced by args[0], etc.,
	 * If args not provided, functions as prefs.getMsg(key)
	 * @param	key String
	 * @param	opt_args Array
	 * @static
	 */
	Locale.getMsg = function(key, opt_args) {
		prefs = getPrefs();
		if (!key) {
			debug.warn('key is null!');
			return '';
		}
		var msg = prefs.getMsg(key);
		if (msg === '') {
			debug.warn('Can not find resource bundle with key = ' + key);
			return msg;
		}
		if (!opt_args) return msg;
		
		//checks if number of {\d} in msg matches opt_args.length
		var regex = /{\d+}/g;
		var matches = msg.match(regex);
		if (matches.length !== opt_args.length) {
			debug.warn("required " + matches.length + " args, provided: " + opt_args.length);
		}
		//substitutes by index: {0} in msg should be replaced by opt_args[0] and so on
		for (var i = 0, l = matches.length; i < l; i++) {
			var index = matches[i].match(/\d+/g)[0];
			//TODO should improve performance
			var strToReplace = opt_args[index];
			if (!strToReplace) {
				debug.warn('matches[' + i + ']: ' + matches[i] + ' but no opt_args[' + index + ']');
			} else {
				msg = msg.replace(matches[i], opt_args[index]);
			}
		}
		return msg;
	}
	//Expose
	window.eXo = window.eXo || {};
	window.eXo.social = window.eXo.social || {};
	window.eXo.social.Locale = Locale;
})();