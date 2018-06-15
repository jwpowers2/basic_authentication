function getCreateAccountTemplate(){

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