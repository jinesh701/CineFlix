$("form").submit(event => {
  event.preventDefault();
  userLogin();
  $("#username").val("");
  $("#password").val("");
});
