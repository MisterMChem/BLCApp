$( document ).ready(function() {
	checkLogin();
});

function userSignedIn(user) {
	$("#loginContainer").hide();
	$("#mainContainer").show();
	console.log("signed in");

};

function checkLogin() {
	var provider = new firebase.auth.GoogleAuthProvider();
	var user = firebase.auth().currentUser;
	if (user) {
		userSignedIn(user);
	} else {
		$("#mainContainer").hide();

	}

};

function login() {
	var provider = new firebase.auth.GoogleAuthProvider();
	var user = firebase.auth().currentUser;

	if (user) {
		console.log("signed in");
  		// User is signed in.
  		userSignedIn(user);
	} else {
  		// No user is signed in.
  		$("#mainContainer").hide();
  		$("#loginContainer").show();
  		firebase.auth().signInWithPopup(provider).then(function(result) {
			// This gives you a Google Access Token. You can use it to access the Google API.
			var token = result.credential.accessToken;
			// The signed-in user info.
			var user = result.user;
			console.log(user);
			userSignedIn(user);
			// ...
		}).catch(function(error) {
		  	// Handle Errors here.
		  	var errorCode = error.code;
		  	var errorMessage = error.message;
		  	// The email of the user's account used.
		  	var email = error.email;
		  	// The firebase.auth.AuthCredential type that was used.
		  	var credential = error.credential;
		  	// ...
		});

	}

};