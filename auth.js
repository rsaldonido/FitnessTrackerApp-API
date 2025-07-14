const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = "FitnessTrackerAPI";

// Generating a token
module.exports.createAccessToken = (user) => {
	const data = {
		id : user._id,
		email : user.email
	}
	return jwt.sign(data, JWT_SECRET_KEY, {});
}


// Verify token
module.exports.verify = (req, res, next) => {
	let token = req.headers.authorization;

	if(typeof token === "undefined"){
	    return res.send({ auth: "Failed. No Token" });
	} else {

	    console.log(token);
	    token = token.slice(7, token.lenght);
	    console.log(token);


	    //Token decryption

	    jwt.verify(token, JWT_SECRET_KEY, function(err, decodedToken){
	        if(err) {
	            return res.send({
	                auth: "Failed",
	                message: err.message
	            });
	        } else {
	            console.log("Result from verify method:")
	            console.log(decodedToken);

	            req.user = decodedToken;

	            next();
	        }
	    })

	}
}

// Error Handler
module.exports.errorHandler = (err, req, res, next) => {
	const statusCode = err.status || 500
	const errorMessage = err.message || 'Internal Server Error'

	res.status(statusCode).json({
		error : {
			message : errorMessage,
			errorCode : err.code || 'SERVER_ERROR',
			details : err.details
		}
	})
}