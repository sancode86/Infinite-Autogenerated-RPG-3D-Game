function preferencesOpen() {
  var menuId = document.getElementById("optionsMenu");
  if (optionsMenu.style.display == "block") {
    preferencesClose();
  }
  optionsMenu.style.display = "block";
}
function preferencesClose() {
  var menuId = document.getElementById("optionsMenu");
  menuId.setAttribute(
    "class",
    "optionsMenu animate__animated animate__fadeOut"
  );

  setTimeout(function () {
    optionsMenu.style.display = "none";
  }, 550);
  setTimeout(function () {
    menuId.setAttribute(
      "class",
      "optionsMenu animate__animated animate__fadeIn"
    );
  }, 850);
}
