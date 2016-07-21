$( document ).ready(function() {
	getAttendees();
});

function getAttendees(){
	firebase.database().ref('Users/').once('value').then(function(snapshot){
		var UsersObject = snapshot.val();
    	var keys = Object.keys(UsersObject);
    	var currentUser;
    	for (var i = 0; i < keys.length; i++) {
    		var currentUser = UsersObject[keys[i]];
    		var row = document.createElement("row");
    		$(row).addClass("row userBox");
    		var col1 = document.createElement("div");
    		$(col1).addClass("col-lg-3");
    		$(row).append(col1);
    		var col2 = document.createElement("div");
    		$(col2).addClass("col-lg-9");
    		$(row).append(col2);
    		var image = document.createElement("img");
    		$(image).attr("src", currentUser.photo);
    		$(image).addClass("listPhoto");
    		$(col1).append(image);
    		var nameText = document.createElement("h3");
    		nameText.innerHTML = currentUser.fullname;
    		$(col2).append(nameText);
    		$(nameText).addClass("listName");
    		var detailText = document.createElement("p");
    		detailText.innerHTML = currentUser.loc;
    		$(detailText).addClass("listDetail");
    		$(col2).append(detailText);
    		var tw = document.createElement("p");
    		tw.innerHTML = '<i class="fa fa-twitter"></i> ' + currentUser.twitter + ',  <a href="'+currentUser.facebook+'"><i class="fa fa-facebook"></i> Facebook</a>,  <a href="'+currentUser.linkedin+'"><i class="fa fa-linkedin"></i> LinkedIn</a>';
    		$(tw).addClass("detailText");
    		$(col2).append(tw);

    		$("#attendRow").append(row);

    	}



	});
}
