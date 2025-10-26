document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("intro-form");
  const clearBtn = document.getElementById("clear");
  const addCourseBtn = document.getElementById("add-course");
  const coursesDiv = document.getElementById("courses");

  // Prevent form refresh on submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    displayIntroPage();
  });

  // Clear all inputs
  clearBtn.addEventListener("click", () => {
    form.reset();
    document.querySelectorAll("input, textarea").forEach((el) => (el.value = ""));
  });

  // Add new course fields
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

    newCourse
      .querySelector(".delete-course")
      .addEventListener("click", () => newCourse.remove());
  });

  // Create the display page
  function displayIntroPage() {
    const data = Object.fromEntries(new FormData(form).entries());
    const imageFile = form.picture.files[0];
    const imgURL = imageFile ? URL.createObjectURL(imageFile) : "images/Jordi.jpg";

    // Handle mascot and divider
    const mascotTitle = `${data.mascotAdj} ${data.mascotAnimal}`;
    const divider = data.divider || "~";

    const html = `
      <h2>${divider} ${mascotTitle} Introduction ${divider}</h2>
      <img src="${imgURL}" alt="Photo of ${data.firstName} ${data.lastName}">
      <figcaption style="text-align:center;"><em>${data.caption}</em></figcaption>

      <p><strong>Name:</strong> ${data.firstName} ${data.middleName ? data.middleName + " " : ""}${data.lastName}${data.nickname ? ` (${data.nickname})` : ""}</p>
      <p><strong>Personal Background:</strong> ${data.personalBackground}</p>
      <p><strong>Professional Background:</strong> ${data.professionalBackground}</p>
      <p><strong>Academic Background:</strong> ${data.academicBackground}</p>
      <p><strong>Background in this Course:</strong> ${data.courseBackground}</p>
      <p><strong>Primary Computer Platform:</strong> ${data.platform}</p>

      <p><strong>Courses I’m Taking:</strong></p>
      <ul>
        ${[...document.querySelectorAll(".course")]
          .map((course) => {
            const [dept, num, name, reason] = [
              ...course.querySelectorAll("input"),
            ].map((i) => i.value);
            return `<li><strong>${dept} ${num} - ${name}:</strong> ${reason}</li>`;
          })
          .join("")}
      </ul>

      <p><strong>Interesting Story:</strong> ${data.story || "(None)"}</p>
      <p><strong>Something Else:</strong> ${data.something || "(None)"}</p>

      <hr>

      <p><strong>Acknowledgment:</strong> ${data.ackStatement}</p>
      <p><strong>Date:</strong> ${data.ackDate || "(Not provided)"}</p>

      <div style="text-align:center; margin-top:20px;">
        <button id="reset-page">Reset Form</button>
      </div>
    `;

    document.querySelector("main").innerHTML = html;

    document
      .getElementById("reset-page")
      .addEventListener("click", () => location.reload());
  }
});