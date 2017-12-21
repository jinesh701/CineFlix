$("form").submit(event => {
  event.preventDefault();
  registerUser();
  $("#new-first-name").val("");
  $("#new-username").val("");
  $("#new-password").val("");
  $("#new-confirm-password").val("");
});
