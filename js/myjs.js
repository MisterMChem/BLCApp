$( document ).ready(function() {
	checkLogin();
});
var selectedFile;
var uid = "";
var photo = "";
var fullname = "";
var email = "";
var twitter, linkedin, facebook, mobile, loc, website = "";

function userSignedIn(user) {
	uid = user.uid;

    firebase.database().ref('Users/' + uid).once('value').then(function(snapshot) {
    	var data = snapshot.val();
    	if (data){
    	
	    	//photo
	    	if (data.photourl) {
	    		photo = data.photourl;
	    	} else if (user.photoURL) {
	    		photo = user.photoURL;
	    	}
	    	//name
	    	if (data.fullname) {
	    		fullname = data.fullname; 
	    	} else if (user.displayName) {
	    		fullname = user.displayName;
	    	}
	    	//email
	    	if (data.email) {
	    		email = data.email;
	    	} else if (user.email) {
	    		email = user.email;
	    	}
	    	//twitter
	    	if (data.twitter) {
	    		twitter = data.twitter;
	    	}
	    	//linkedin
	    	if (data.linkedin) {
	    		linkedin = data.linkedin;
	    	}
	    	//facebook
	    	if (data.facebook) {
	    		facebook = data.facebook;
	    	}
	    	//mobile
	    	if (data.mobile) {
	    		mobile = data.mobile;
	    	}
	    	//location
	    	if (data.loc) {
	    		loc = data.loc;
	    	}
	    	//website
	    	if (data.website) {
	    		website = data.website;
	    	}
		} else {
			if (user.photoURL) {
	    		photo = user.photoURL;
	    	}
	    	console.log(user.displayName);
	    	if (user.displayName) {
	    		fullname = user.displayName;
	    	}
	    	if (user.email) {
	    		email = user.email;
	    	}
		}
		$("#profileImg").attr("src", photo);
		$("#name").html("Hello, " + fullname);
		$("#fullname").val(fullname);
		$("#location").val(loc);
		$("#twitter").val(twitter);
		$("#linkedin").val(linkedin);
		$("#facebook").val(facebook);
		$("#mobile").val(mobile);
		$("#email").val(email);
		$("#website").val(website);
	});

	$("#loginContainer").hide();
	$("#mainContainer").show();


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
		  	console.log(errorMessage);
		});

	}

};

function submitProfile() {

	firebase.database().ref('Users/' + uid).set({
		photo: photo,
    	fullname: $("#fullname").val(),
    	email: $("#email").val(),
    	twitter: $("#twitter").val(),
    	facebook: $("#facebook").val(),
    	linkedin: $("#linkedin").val(),
    	website: $("#website").val(),
    	mobile: $("#mobile").val(),
    	loc: $("#location").val()
	}).then(function(result) {
		$("#successAlert").show();
		setTimeout(function() {
    		$(".alert").hide();
		}, 3000);
	});
}

$("#file").on("change", function(event) {
	selectedFile = event.target.files[0];
	// Create a root reference
	var filename = selectedFile.name;
	var storageRef = firebase.storage().ref('/userImages/' + uid);
	var uploadTask = storageRef.put(selectedFile);

	// Register three observers:
	// 1. 'state_changed' observer, called any time the state changes
	// 2. Error observer, called on failure
	// 3. Completion observer, called on successful completion
	uploadTask.on('state_changed', function(snapshot){
	  // Observe state change events such as progress, pause, and resume
	  // See below for more detail
	}, function(error) {
	  // Handle unsuccessful uploads
	}, function() {
	  // Handle successful uploads on complete
	  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
	  var downloadURL = uploadTask.snapshot.downloadURL;
	  photo = downloadURL;
	});
});
