var socket = io('http://localhost:5000');

function getCreateAccountTemplate(){

return `

<form id="create-account-form">

  <h1>Create Account</h1>

  <div class="form-group">
    <label>First Name</label>
    <input id="firstname" class="form-control"/>
  </div>
  <div class="form-group">
    <label>Last Name</label>
    <input id="lastname" class="form-control"/>
  </div>
  <div class="form-group">
    <label>Email</label>
    <input id="email" type="email" class="form-control"/>
  </div>
  <div class="form-group">
    <label>Password</label>
    <input id="password" type="password" class="form-control"/>
  </div>
  <div class="form-group">
    <button class="btn btn-primary">Create Account</button>
    &nbsp; or &nbsp;
    <a href="#/" class="btn btn-default">Login</a>
  </div>

  <div id="messages"></div>

</form>

      `;
}

function getProfileTemplate (profile){

return `

<div>

    <h1>Hello ${profile.firstname}!</h1>
    <p>You are logged in.</p>
    <div class="form-group">
        <button id="logout" class="btn btn-primary">Logout</button>
    </div>
    
</div>

       `;

}

function getLoginTemplate (){

return `
<form id="login-form">

    <h1>Login</h1>
    <div class="form-group">
        <label>Email</label>
        <input id="email" type="email" class="form-control"/>
    </div>
    <div class="form-group">
        <label>Password</label>
        <input id="password" type="password" class="form-control"/>
    </div>
    <div class="form-group">
        <button class="btn btn-primary">Login</button>
        &nbsp; or &nbsp;
        <a href="#/create-account" class="btn btn-default">Create Account</a>
    </div>
    <div id="messages"></div>
</form>
    `;

}

function createAccountController(){

    document.getElementById('create-account-form').addEventListener('submit', function (e){
    	e.preventDefault();
    	var user = {
    		email: document.getElementById('email').value,
    		password: document.getElementById('password').value,
    		firstname: document.getElementById('firstname').value,
    		lastname: document.getElementByIdI('lastname').value
    	};
    	socket.emit('user.create', user);
    });

}

function loginController(){

    document.getElementById('login-form').addEventListener('submit',function(e){
    	e.preventDefault();
    	var user = {
    		email: document.getElementById('email').value,
    		password: document.getElementById('password').value    		
    	};
    	socket.emit('user.login', user);
    });

}


function renderTemplate (tpl) {

	document.getElementById('main-container').innerHTML = tpl;

}

function userLoggedIn (data) {

	localStorage.token = data.token;
	renderTemplate(getProfileTemplate(data.profile));
	profileController(data);

}

function getRoute () {

	if(document.location.hash === '#/create-account') {

		renderTemplate(getCreateAccountTemplate());
		createAccountController();
		return;

	}

	renderTemplate(getLoginTemplate());
	loginController();
}

function showError (data) {

	alert(data.message);

}

function loginController(){

    document.getElementById('login-form').addEventListener('submit',function(e){
    	e.preventDefault();
    	var user = {
    		email: document.getElementById('email').value,
    		password: document.getElementById('password').value
    	};
    	socket.emit('user.login', user);
    });

}

function profileController(){

    document.getElementById('logout').addEventListener('click', function (e) {

        e.preventDefault();
        socket.emit('user.logout');
        delete localStorage.token;
        getRoute();

    });

}

(function () {

	socket.on('user.create.error', showError);
	socket.on('user.get.success', userLoggedIn);
	socket.on('user.login.error', showError);

	window.addEventListener('hashchange', getRoute);
	getRoute();

	// if we have token, send to server to authenticate

	if(localStorage.token){

		socket.emit('user.get', localStorage.token);

	}

}());