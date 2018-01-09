function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    ajaxRequest("GET", "/api/public/api/users", "users", "req", username, password);
    $("#login").modal("hide");
}

function checkAdmin(result, username) {
    for (var i = 0; i < result.length; i++) {
        if (result[i].uname == username) {
            $(".admin").css("display", "inline");
            return;
        }
    }
}

function checkUser(result, username, password) {
    var match = 0;
    for (var i = 0; i < result.length; i++) {
        if (result[i].uname == username) {
            if (result[i].pass == password) {
                match++;
            }
        }
    }
    if (match > 0) {
        lUname = username;
        var req = {
            username: username
        };
        ajaxRequest("GET", "/api/public/api/admins", "admins", "dummy" ,username);
        ajaxRequest("POST", "/api/public/api/playlists", "playlists", req, username);
        ajaxRequest("GET", "/api/public/api/songs", "songs", null);
    }
    else {
        window.alert("Incorrect username or password");
    }
}