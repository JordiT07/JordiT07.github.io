document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("intro-form");
  const clearBtn = document.getElementById("clear");
  const addCourseBtn = document.getElementById("add-course");
  const coursesDiv = document.getElementById("courses");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    displayIntroPage();
  });

  clearBtn.addEventListener("click", () => {
    form.reset();
    document.querySelectorAll("input, textarea").forEach(input => input.value = "");
  });

  addCourseBtn.addEventListener("click", () => {
    const newCourse = document.createElement("div");
    newCourse.classList.add("course");
    newCourse.innerHTML = `
      <input type="text" name="dept" placeholder="Department" required />
      <input type="text" name="num" placeholder="Number" required />
      <input type="text" name="name" placeholder="Course name" required />
      <input type="text" name="reason" placeholder="Reason" required />
      <button type="button" class="delete-course">Delete</button>
    `;
    coursesDiv.insertBefore(newCourse, addCourseBtn);

    newCourse.querySelector(".delete-course").addEventListener("click", () => {
      newCourse.remove();
    });
  });

  function displayIntroPage() {
    const data = Object.fromEntries(new FormData(form).entries());
    const html = `
      <h2>Introduction</h2>
      <p><strong>${data.firstName} ${data.lastName}</strong></p>
      <p>${data.statement}</p>
      <img src="${data.picture ? URL.createObjectURL(form.picture.files[0]) : "images/yourphoto.jpg"}" alt="Profile Image" width="200">
      <p><em>${data.caption}</em></p>
      <p>Favorite Quote: "${data.quote}" - ${data.author}</p>
      <a href="#" id="reset-page">Reset Form</a>
    `;
    document.querySelector("main").innerHTML = html;

    document.getElementById("reset-page").addEventListener("click", () => location.reload());
  }
});