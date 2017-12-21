function userLogin(user) {
  var getUser = user;
  var username = $("#username").val();
  var password = $("#password").val();

  if (username === getUser.username && password === getUser.password) {
    window.location.href = "/profile";
    document.cookie = "token=blah";
    return;
  } else if (username !== getUser.username && password !== getUser.password) {
    document.getElementById("incorrect-info").innerHTML =
      "Incorrect username or password. Please try again.";
    return;
  }
}

$("form").submit(event => {
  event.preventDefault();
  userLoginData();
  userLogin();
  $("#username").val("");
  $("#password").val("");
});
