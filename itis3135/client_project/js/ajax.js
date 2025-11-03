function loadTrainingDetails() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "extra_info.txt", true);
  xhr.onload = function () {
    if (this.status === 200) {
      document.getElementById("ajax-content").innerHTML = this.responseText;
    } else {
      document.getElementById("ajax-content").innerHTML = "Unable to load content.";
    }
  };
  xhr.onerror = function () {
    document.getElementById("ajax-content").innerHTML = "Error loading file.";
  };
  xhr.send();
}