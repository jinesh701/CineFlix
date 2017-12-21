function stayLoggedIn() {
  var cookie = document.cookie;
  if (cookie === "token=blah") {
    window.location = "/profile";
  } else if (cookie === "token=") {
    window.location = "/login";
  }
}

stayLoggedIn();
