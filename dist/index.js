(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CONST = exports.Str = undefined;

var _str = require('./lib/str');

var _str2 = _interopRequireDefault(_str);

var _constants = require('./lib/constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Str = exports.Str = _str2.default;
var CONST = exports.CONST = _constants2.default;

},{"./lib/constants":2,"./lib/str":3}],2:[function(require,module,exports){
'use strict';

/* eslint-disable no-useless-escape */

var emailBaseRegex = "([\\w\\-\\+\\'#]+(?:\\.[\\w\\-\\+]+)*@(?:[\\w\\-]+\\.)+[a-z]{2,})";

module.exports = {
  REG_EXP: {
    /**
     * Regular expression to check that a domain is valid
     *
     * @type RegExp
     */
    DOMAIN: /^[\w-\.]*\.\w{2,}$/,

    /**
     * Regular expression to check that a basic name is valid
     *
     * @type RegExp
     */
    FREE_NAME: /^[^\r\n\t]{1,256}$/,

    /**
     * Regular expression to check that a card is masked
     *
     * @type RegExp
     */
    MASKED_CARD: /^\d{0,6}[X]+\d{4,7}$/,

    /**
     * Regular expression to check that an email address is valid
     *
     * @type RegExp
     */
    EMAIL_VALID: new RegExp('^' + emailBaseRegex + '$', 'i'),

    /**
     * Regular expression to search for valid email addresses in a string
     *
     * @type RegExp
     */
    EMAIL_SEARCH: new RegExp(emailBaseRegex, 'gi')
  }
};

},{}],3:[function(require,module,exports){
'use strict';

var CONST = require('./constants');

module.exports = {

    /**
     * Return true if the string is ending with the provided suffix
     *
     * @param {String} str String ot search in
     * @param {String} suffix What to look for
     * @return {Bool}
     */

    endsWith: function endsWith(str, suffix) {
        if (!str || !suffix) {
            return false;
        }
        return str.substr(-suffix.length) === suffix;
    },


    /**
     * Converts a USD string into th number of cents it represents.
     *
     * @param {String}  amountStr     A string representing a USD value.
     * @param {Boolean} allowFraction Flag indicating if fractions of cents should be
     *                               allowed in the output.
     *
     * @return {Number} The cent value of the @p amountStr.
     */
    fromUSDToNumber: function fromUSDToNumber(amountStr, allowFraction) {
        var amount = String(amountStr).replace(/[^\d\.\-\(\)]+/g, '');
        if (amount.match(/\(.*\)/)) {
            var modifiedAmount = amount.replace(/[\(\)]/g, '');
            amount = '-' + modifiedAmount;
        }
        amount = Number(amount) * 100;
        return allowFraction ? amount : Math.round(amount);
    },


    /**
     * Convert new line to <br />
     *
     * @param {String} str
     * @returns {string}
     */
    nl2br: function nl2br(str) {
        return str.replace(/\n/g, '<br />');
    },


    /**
     * Decodes the given HTML encoded string.
     *
     * @param {String} s The string to decode.
     * @return {String} The decoded string.
     */
    htmlDecode: function htmlDecode(s) {
        return $('<div></div>').html(s).text();
    },


    /**
     * HTML encodes the given string.
     *
     * @param {String} s The string to encode.
     * @return {String} @p s HTML encoded.
     */
    htmlEncode: function htmlEncode(s) {
        return $('<div/>').text(s).html();
    },


    /**
     * HTML encoding insensitive equals.
     *
     * @param {String} first string to compare
     * @param {String} second string to compare
     * @return {Boolean} true when first === second, ignoring HTML encoding
     */
    htmlEncodingInsensitiveEquals: function htmlEncodingInsensitiveEquals(first, second) {
        return first === second || this.htmlDecode(first) === second || this.htmlEncode(first) === second;
    },


    /**
     * Creates an ID that can be used as an HTML attribute from @p str.
     *
     * @param {String} str A string to create an ID from.
     * @return {String} The ID string made from @p str.
     */
    makeID: function makeID(str) {
        var modifiedString = String(str).replace(/[^A-Za-z0-9]/g, '_').toUpperCase();
        return 'id_' + modifiedString;
    },


    /**
     * Extracts an ID made with Str.makeID from a larger string.
     *
     * @param {String} str A string containing an id made with Str.makeID
     * @return {String|null} The ID string.
     */
    extractID: function extractID(str) {
        var matches = str.match(/id[A-Z0-9_]+/);
        return matches.length > 0 ? matches[0] : null;
    },


    /**
     * Modifies the string so the first letter of each word is capitalized and the
     * rest lowercased.
     *
     * @param {String} val The string to modify
     * @return {String}
     */
    recapitalize: function recapitalize(val) {
        // First replace every letter with its lowercase equivalent
        // Cast to string.
        var str = String(val);
        if (str.length <= 0) {
            return str;
        }
        str = str.substr(0, 1).toUpperCase() + str.substr(1).toLowerCase();

        function recap_callback(t, a, b) {
            return a + b.toUpperCase();
        }
        return str.replace(
        // **NOTE: Match to _libfop.php
        new RegExp('([^A-Za-z\'.0-9])([a-z])', 'g'), recap_callback);
    },


    /**
     * Replace all the non alphanumerical character by _
     *
     * @param {string} input
     * @returns {string}
     */
    sanitizeToAlphaNumeric: function sanitizeToAlphaNumeric(input) {
        return String(input).replace(/[^\d\w]/g, '_');
    },


    /**
     * Strip out all the non numerical characters
     *
     * @param {string} input
     * @returns {string}
     */
    stripNonNumeric: function stripNonNumeric(input) {
        return String(input).replace(/[^\d]/g, '');
    },


    /**
     * Strips all non ascii characters from a string
     * @param {string} input
     * @returns {string} The ascii version of the string.
     */
    stripNonASCIICharacters: function stripNonASCIICharacters(input) {
        return String(input).replace(/[\u0000-\u0019\u0080-\uffff]/g, '');
    },


    /**
     * Shortens the @p text to @p length and appends an ellipses to it.
     *
     * The ellipses will only be appended if @p text is longer than the @p length
     * given.
     *
     * @param {String} val   The string to reduce in size.
     * @param {Number} length The maximal length desired.
     * @return {String} The shortened @p text.
     */
    shortenText: function shortenText(val, length) {
        // Remove extra spaces because they don't show up in html anyway.
        var text = String(val).replace(/\s+/g, ' ');
        var truncatedText = text.substr(0, length - 3);
        return text.length > length ? truncatedText + '...' : text;
    },


    /**
     * Returns true if the haystack begins with the needle
     *
     * @param {String} haystack  The full string to be searched
     * @param {String} needle    The case-sensitive string to search for
     * @return {Boolean} Retruns true if the haystack starts with the needle.
     */
    startsWith: function startsWith(haystack, needle) {
        return module.exports.isString(haystack) && module.exports.isString(needle) && haystack.substring(0, needle.length) === needle;
    },


    /**
     * Gets the textual value of the given string.
     *
     * @deprecated use htmlDecode() instead
     * @param {String} str The string to fetch the text value from.
     * @return {String} The text from within the HTML string.
     */
    stripHTML: function stripHTML(str) {
        return module.exports.htmlDecode(str);
    },


    /**
     * Modifies the string so the first letter of the string is capitalized
     *
     * @param {String} str The string to modify.
     * @return {String} The recapitalized string.
     */
    UCFirst: function UCFirst(str) {
        return str.substr(0, 1).toUpperCase() + str.substr(1);
    },


    /**
     * Returns a string containing all the characters str from the beginning
     * of str to the first occurrence of substr.
     * Example: Str.cutAfter( 'hello$%world', '$%' ) // returns 'hello'
     *
     * @param {String} str The string to modify.
     * @param {String} substr The substring to search for.
     * @return {String} The cut/trimmed string.
     */
    cutAfter: function cutAfter(str, substr) {
        var index = str.indexOf(substr);
        if (index !== -1) {
            return str.substring(0, index);
        }
        return str;
    },


    /**
     * Returns a string containing all the characters str from after the first
     * occurrence of substr to the end of the string.
     * Example: Str.cutBefore( 'hello$%world', '$%' ) // returns 'world'
     *
     * @param {String} str The string to modify.
     * @param {String} substr The substring to search for.
     * @return {String} The cut/trimmed string.
     */
    cutBefore: function cutBefore(str, substr) {
        var index = str.indexOf(substr);
        if (index !== -1) {
            return str.substring(index + substr.length);
        }
        return str;
    },


    /**
     * Checks that the string is a domain name (e.g. example.com)
     *
     * @param {String} string The string to check for domainnameness.
     *
     * @returns {Boolean} True iff the string is a domain name
     */
    isValidDomainName: function isValidDomainName(string) {
        return Boolean(String(string).match(CONST.REG_EXP.DOMAIN));
    },


    /**
     * Checks that the string is an email address.
     * NOTE: TLDs are not just 2-4 characters. Keep this in sync with _inputrules.php
     *
     * @param {String} string The string to check for email validity.
     *
     * @returns {Boolean} True iff the string is an email
     */
    isValidEmail: function isValidEmail(string) {
        return Boolean(String(string).match(CONST.REG_EXP.EMAIL_VALID));
    },


    /**
     * Extract the email addresses from a string
     *
     * @param {string} string
     * @returns {array|null}
     */
    extractEmail: function extractEmail(string) {
        return String(string).match(CONST.REG_EXP.EMAIL_SEARCH);
    },


    /**
     * Extracts the domain name from the given email address
     * (e.g. "domain.com" for "joe@domain.com").
     *
     * @param {String} email The email address.
     *
     * @returns {String} The domain name in the email address.
     */
    extractEmailDomain: function extractEmailDomain(email) {
        return module.exports.cutBefore(email, '@');
    },


    /**
     * Tries to extract the company name from the given email address
     * (e.g. "yelp" for "joe@yelp.co.uk").
     *
     * @param {String} email The email address.
     *
     * @returns {String} The company name in the email address or null.
     */
    extractCompanyNameFromEmailDomain: function extractCompanyNameFromEmailDomain(email) {
        var domain = this.extractEmailDomain(email);
        if (!domain) {
            return null;
        }

        var domainParts = domain.split('.');
        if (!domainParts.length) {
            return null;
        }

        return domainParts[0];
    },


    /**
     * Extracts the local part from the given email address
     * (e.g. "joe" for "joe@domain.com").
     *
     * @param {String} email The email address.
     *
     * @returns {String} The local part in the email address.
     */
    extractEmailLocalPart: function extractEmailLocalPart(email) {
        return module.exports.cutAfter(email, '@');
    },


    /**
     * Escapes all special RegExp characters from a string
     *
     * @param {String} string The subject
     *
     * @returns {String} The escaped string
     */
    escapeForRegExp: function escapeForRegExp(string) {
        return string.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
    },


    /**
     * Escapes all special RegExp characters from a string except for the period
     *
     * @param {String} string The subject
     * @returns {String} The escaped string
     */
    escapeForExpenseRule: function escapeForExpenseRule(string) {
        return string.replace(/[\-\[\]\/\{\}\(\)\*\+\?\\\^\$\|]/g, '\\$&');
    },


    /**
     * Adds a backslash in front of each of colon
     * if they don't already have a backslash in front of them
     *
     * @param {String} string The subject
     * @returns {String} The escaped string
     */
    addBackslashBeforeColonsForTagNamesComingFromQBD: function addBackslashBeforeColonsForTagNamesComingFromQBD(string) {
        return string.replace(/([^\\]):/g, '$1\\:');
    },


    /**
     * Removes backslashes from string
     * eg: myString\[\]\* -> myString[]*
     *
     * @param {String} string
     * @returns {String}
     */
    stripBackslashes: function stripBackslashes(string) {
        return string.replace(/\\/g, '');
    },


    /**
     * Checks if a string's length is in the specified range
     *
     * @param {String} string The subject
     * @param {Number} minimumLength
     * @param {Number} [maximumLength]
     *
     * @returns {Boolean} true if the length is in the range, false otherwise
     */
    isOfLength: function isOfLength(string, minimumLength, maximumLength) {
        if (!module.exports.isString(string)) {
            return false;
        }
        if (string.length < minimumLength) {
            return false;
        }
        if (!module.exports.isUndefined(maximumLength) && string.length > maximumLength) {
            return false;
        }
        return true;
    },


    /**
     * Count the number of occurences of needle in haystack.
     * This is faster than counting the results of haystack.match( /needle/g )
     * via http://stackoverflow.com/questions/4009756/how-to-count-string-occurrence-in-string
     *
     * @param {String} haystack The string to look inside of
     * @param {String} needle What we're looking for
     * @param {Boolean} allowOverlapping Defaults to false
     *
     * @returns {Integer} The number of times needle is in haystack.
     */
    occurences: function occurences(haystack, needle, allowOverlapping) {
        var count = 0;
        var pos = 0;

        // Force strings for input
        var haystackStr = String(haystack);
        var needleStr = String(needle);

        if (needleStr.length <= 0) {
            return haystackStr.length + 1;
        }

        var step = allowOverlapping ? 1 : needleStr.length;

        while (pos >= 0) {
            pos = haystackStr.indexOf(needleStr, pos);
            if (pos >= 0) {
                count++;
                pos += step;
            }
        }
        return count;
    },


    /**
     * Uppercases the first letter of each word
     * via https://github.com/kvz/phpjs/blob/master/functions/strings/ucwords.js
     *
     * @param   {String}  str to uppercase words
     * @returns {String}  Uppercase worded string
     */
    ucwords: function ucwords(str) {
        return String(str).replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g, function ($1) {
            return $1.toUpperCase();
        });
    },


    /**
     * Returns true if the haystack contains the needle
     *
     * @param {String} haystack The full string to be searched
     * @param {String} needle The case-sensitive string to search for
     *
     * @return {Boolean} Retruns true if the haystack contains the needle
     */
    contains: function contains(haystack, needle) {
        return haystack.indexOf(needle) !== -1;
    },


    /**
     * Returns true if the haystack contains the needle, ignoring case
     *
     * @param {String} haystack The full string to be searched
     * @param {String} needle The case-insensitive string to search for
     *
     * @return {Boolean} Retruns true if the haystack contains the needle, ignoring case
     */
    caseInsensitiveContains: function caseInsensitiveContains(haystack, needle) {
        return this.contains(haystack.toLowerCase(), needle.toLowerCase());
    },


    /**
     * Case insensitive compare function
     *
     * @param {String} string1 string to compare
     * @param {String} string2 string to compare
     *
     * @return {Number} -1 if first string < second string
     *                   1 if first string > second string
     *                   0 if first string = second string
     */
    caseInsensitiveCompare: function caseInsensitiveCompare(string1, string2) {
        var lowerCase1 = string1.toLocaleLowerCase();
        var lowerCase2 = string2.toLocaleLowerCase();

        return this.compare(lowerCase1, lowerCase2);
    },


    /**
     * Case insensitive equals
     *
     * @param {String} first string to compare
     * @param {String} second string to compare
     * @return {Boolean} true when first == second except for case
     */
    caseInsensitiveEquals: function caseInsensitiveEquals(first, second) {
        return this.caseInsensitiveCompare(first, second) === 0;
    },


    /**
     * Compare function
     *
     * @param {String} string1 string to compare
     * @param {String} string2 string to compare
     *
     * @return {Number} -1 if first string < second string
     *                   1 if first string > second string
     *                   0 if first string = second string
     */
    compare: function compare(string1, string2) {
        if (string1 < string2) {
            return -1;
        } else if (string1 > string2) {
            return 1;
        }
        return 0;
    },


    /**
     * Check if a file extension is supported by SmartReports
     * @param  {String}  filename
     * @return {Boolean}
     */
    isFileExtensionSmartReportsValid: function isFileExtensionSmartReportsValid(filename) {
        // Allowed extensions. Make sure to keep them in sync with those defined
        // in SmartReport_Utils::templateFileUploadCheck()
        var allowedExtensions = ['xls', 'xlsx', 'xlsm', 'xltm'];
        var extension = filename.split('.').pop().toLowerCase();
        return allowedExtensions.indexOf(extension) > -1;
    },


    /**
     * Mask Permanent Account Number (PAN) the same way Auth does
     * @param {Number|String} number account number
     * @return {String} masked account number
     */
    maskPAN: function maskPAN(number) {
        // cast to string
        var accountNumber = String(number);
        var len = accountNumber.length;

        // Hide these numbers completely
        // We should not be getting account numbers this small or large
        if (len < 6 || len > 20) {
            return this.maskFirstNCharacters(accountNumber, len, 'X');
        }

        // Can show last 4
        if (len < 14) {
            return this.maskFirstNCharacters(accountNumber, len - 4, 'X');
        }

        // Can show first 6 and last 4
        var first = accountNumber.substr(0, 6);
        var last = accountNumber.substr(7);
        var masked = this.maskFirstNCharacters(last, len - 11, 'X');
        return '' + first + masked;
    },


    /**
     * Checks if something is a string
     * Stolen from underscore
     * @param  {Mixed} obj
     * @return {Boolean}
     */
    isString: function isString(obj) {
        return module.exports.isTypeOf(obj, 'String');
    },


    /**
     * Checks if something is a number
     * Stolen from underscore
     * @param  {Mixed} obj
     * @return {Boolean}
     */
    isNumber: function isNumber(obj) {
        return module.exports.isTypeOf(obj, 'Number');
    },


    /**
     * Checks if something is a certain type
     * Stolen from underscore
     * @param  {Mixed} obj
     * @param  {String} type one of ['Arguments', 'Function', 'String', 'Number', 'Date',
     *                       'RegExp', 'Error', 'Symbol', 'Map', 'WeakMap', 'Set', 'WeakSet']
     * @return {Boolean}
     */
    isTypeOf: function isTypeOf(obj, type) {
        return toString.call(obj) === '[object ' + type + ']';
    },


    /**
     * Checks to see if something is undefined
     * Stolen from underscore
     * @param  {Mixed} obj
     * @return {Boolean}
     */
    isUndefined: function isUndefined(obj) {
        return obj === void 0;
    },


    /**
     * Replace first N characters of the string with maskChar
     * eg: maskFirstNCharacters( '1234567890', 6, 'X' ) yields XXXXXX7890
     * @param {String} str string to mask
     * @param {Number} n number of characters we want to mask from the string
     * @param {String} mask string we want replace the first N chars with
     * @return {String} masked string
     */
    maskFirstNCharacters: function maskFirstNCharacters(str, n, mask) {
        // if str is empty, str or mask aren't strings,
        // or n is not a number, do nothing
        if (!module.exports.isString(str) || !module.exports.isString(mask) || str.length === 0 || !module.exports.isNumber(n)) {
            return str;
        }

        return str.substring(0, n).replace(/./g, mask) + str.substring(n);
    },


    /**
     * Trim a string
     *
     * @param {String} str
     * @returns {string}
     */
    trim: function trim(str) {
        return $.trim(str);
    },


    /**
     * Convert a percentage string like '25%' to 25/
     * @param {String} percentageString The percentage as a string
     * @returns {Number}
     */
    percentageStringToNumber: function percentageStringToNumber(percentageString) {
        return Number(module.exports.cutAfter(percentageString, '%'));
    },


    /**
     * Remoce all the spaces from a string
     * @param {string} input
     * @returns {string}
     */
    removeSpaces: function removeSpaces(input) {
        return String(input).replace(' ', '');
    },


    /**
     * Returns the proper phrase depending on the count that is passed.
     * Example:
     * console.log(Str.pluralize('puppy', 'puppies', 1)); // puppy
     * console.log(Str.pluralize('puppy', 'puppies', 3)); // puppies
     *
     * @param {String} singular form of the phrase
     * @param {String} plural form of the phrase
     * @param {Number} n the count which determines the plurality
     *
     * @return {String}
     */
    pluralize: function pluralize(singular, plural, n) {
        if (!n || n > 1) {
            return plural;
        }
        return singular;
    },


    /**
     * Returns whether or not a string is an encrypted number or not.
     *
     * @param {String} number that we want to see if its encrypted or not
     *
     * @return {Boolean} Whether or not this string is an encrpypted number
     */
    isEncryptedCardNumber: function isEncryptedCardNumber(number) {
        return (/[A-Fa-f0-9]+/.test(number) && number.length % 32 === 0
        );
    },


    /**
     * Converts a value to boolean.
     * @param {mixed} value
     * @return {boolean}
     */
    toBool: function toBool(value) {
        if (module.exports.isString(value)) {
            return value === 'true';
        }
        return Boolean(value);
    },


    /**
     * Checks if a string could be the masked version of another one.
     *
     * @param {String} first string to compare
     * @param {String} second string to compare
     * @param {String} [mask] defaults to X
     * @return {Boolean} true when first could be the masked version of second
     */
    maskedEquals: function maskedEquals(first, second, mask) {
        var firsts = first.match(/.{1,1}/g);
        var seconds = second.match(/.{1,1}/g);
        var defaultMask = mask || 'X';

        if (firsts.length !== seconds.length) {
            return false;
        }

        for (var i = 0; i < firsts.length; i++) {
            if (firsts[i] !== seconds[i] && firsts[i] !== defaultMask && seconds[i] !== defaultMask) {
                return false;
            }
        }

        return true;
    }
};

},{"./constants":2}]},{},[1]);