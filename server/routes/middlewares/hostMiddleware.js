/** 
 * A module that provides host middleware
 * @module hostMiddleware 
 * 
 */

/**
 * HTTP request must comes from same host, otherwise it returns 403 HTTP Error (Forbidden)
 * @function
 * @param  {Any} req  HTTP request
 * @param  {Any} res  HTTP response
 * @param  {Any} next Method to call to pass the call to the next middleware function once the current middleware is finished
 */
const sameHost = (req, res, next) => {
	if (req.headers.host.includes('localhost')) {
		next();
	} else {
		res.status(403).send();
	}
};

/**
 * HTTP request must comes from another host, otherwise it returns 403 HTTP Error (Forbidden)
 * @function
 * @param  {Any} req  HTTP request
 * @param  {Any} res  HTTP response
 * @param  {Any} next Method to call to pass the call to the next middleware function once the current middleware is finished
 */
const otherHost = (req, res, next) => {
	if (req.headers.host.includes('localhost')) {
		res.status(403).send();
	} else {
		next();
	}
};

module.exports = {
	sameHost,
	otherHost
}