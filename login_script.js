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