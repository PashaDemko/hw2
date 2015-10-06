define( ['models/users', 'views/users'] , function(Users,viewUsers){
	function gogo(){
		usersd = new Users();
		 usersd.fetch();

		usersview = new viewUsers ({collection : usersd})

		$(document.body).append(usersview.render().el);


	}

	return {
		gogo : gogo
	}
});