document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("intro-form");
  const clearBtn = document.getElementById("clear");
  const addCourseBtn = document.getElementById("add-course");
  const coursesDiv = document.getElementById("courses");

  // Prevent form refresh
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    displayIntroPage();
  });

  // Clear all inputs
  clearBtn.addEventListener("click", () => {
    form.reset();
    document.querySelectorAll("input, textarea").forEach((el) => el.value = "");
  });

  // Add course fields
  addCourseBtn.addEventListener("click", () => {
    const newCourse = document.createElement("div");
    newCourse.classList.add("course");
    newCourse.innerHTML = `
      <input type="text" name="courseDept" placeholder="Department" required>
      <input type="text" name="courseNum" placeholder="Number" required>
      <input type="text" name="courseName" placeholder="Course name" required>
      <input type="text" name="courseReason" placeholder="Reason" required>
      <button type="button" class="delete-course">Delete</button>
    `;
    coursesDiv.insertBefore(newCourse, addCourseBtn);

    newCourse.querySelector(".delete-course").addEventListener("click", () => newCourse.remove());
  });

  // Create the display page
  function displayIntroPage() {
    const data = Object.fromEntries(new FormData(form).entries());
    const imageFile = form.picture.files[0];
    const imgURL = imageFile ? URL.createObjectURL(imageFile) : "images/Jordi.jpg";

    const html = `
      <h2>Introduction</h2>
      <img src="${imgURL}" alt="Photo of ${data.firstName} ${data.lastName}">
      <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
      <p><strong>Personal Background:</strong> ${data.personalBackground}</p>
      <p><strong>Professional Background:</strong> ${data.professionalBackground}</p>
      <p><strong>Academic Background:</strong> ${data.academicBackground}</p>
      <p><strong>Background in this Course:</strong> ${data.courseBackground}</p>
      <p><strong>Primary Computer Platform:</strong> ${data.platform}</p>
      <p><strong>Courses I’m Taking:</strong></p>
      <ul>
        ${[...document.querySelectorAll(".course")].map(course => {
          const [dept, num, name, reason] = [...course.querySelectorAll("input")].map(i => i.value);
          return `<li>${dept} ${num}: ${name} — ${reason}</li>`;
        }).join("")}
      </ul>
      <p><strong>Interesting Story:</strong> ${data.story || "(None)"}</p>
      <p><strong>Something Else:</strong> ${data.something || "(None)"}</p>
      <p><em>${data.caption}</em></p>
      <div style="text-align:center;">
        <button id="reset-page">Reset Form</button>
      </div>
    `;

    document.querySelector("main").innerHTML = html;

    document.getElementById("reset-page").addEventListener("click", () => location.reload());
  }
});