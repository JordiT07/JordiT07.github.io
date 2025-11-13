// generate_json.js

document.addEventListener("DOMContentLoaded", () => {
  const generateBtn = document.getElementById("generate-json-btn");
  const form = document.getElementById("intro-form");

  generateBtn.addEventListener("click", () => {

    // Basic info
    const firstName = form.querySelector('[name="firstName"]').value;
    const middleName = form.querySelector('[name="middleName"]').value;
    const nickname = form.querySelector('[name="nickname"]').value;
    const lastName = form.querySelector('[name="lastName"]').value;

    // Personal info
    const personalBackground = form.querySelector('[name="personalBackground"]').value;
    const professionalBackground = form.querySelector('[name="professionalBackground"]').value;
    const academicBackground = form.querySelector('[name="academicBackground"]').value;
    const courseBackground = form.querySelector('[name="courseBackground"]').value;
    const primaryComputer = form.querySelector('[name="platform"]').value;

    // Courses
    const courses = [...form.querySelectorAll('.course')].map(courseDiv => {
      return {
        department: courseDiv.querySelector('[name="courseDept"]').value,
        number: courseDiv.querySelector('[name="courseNum"]').value,
        name: courseDiv.querySelector('[name="courseName"]').value,
        reason: courseDiv.querySelector('[name="courseReason"]').value
      };
    });

    // Mascot & Divider
    const divider = form.querySelector('[name="divider"]').value;
    const mascotAdjective = form.querySelector('[name="mascotAdj"]').value;
    const mascotAnimal = form.querySelector('[name="mascotAnimal"]').value;

    // Image & caption
    const pictureInput = form.querySelector('[name="picture"]');
    const image = pictureInput.files[0] ? URL.createObjectURL(pictureInput.files[0]) : "";
    const imageCaption = form.querySelector('[name="caption"]').value;

    // Construct JSON object
    const introJSON = {
      firstName: firstName,
      preferredName: nickname || "",
      middleInitial: middleName || "",
      lastName: lastName,
      divider: divider,
      mascotAdjective: mascotAdjective,
      mascotAnimal: mascotAnimal,
      image: image,
      imageCaption: imageCaption,
      personalStatement: "",
      personalBackground: personalBackground,
      professionalBackground: professionalBackground,
      academicBackground: academicBackground,
      subjectBackground: courseBackground,
      primaryComputer: primaryComputer,
      courses: courses,
      links: [
        { name: "GitHub", href: "" },
        { name: "GitHub Page", href: "" },
        { name: "freeCodeCamp", href: "" },
        { name: "Codecademy", href: "" },
        { name: "LinkedIn", href: "" }
      ]
    };

    // Convert to formatted JSON string
    const jsonString = JSON.stringify(introJSON, null, 2);

    // Replace form with highlighted JSON block
    form.innerHTML = `
<section>
  <pre><code class="json">${jsonString.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>
</section>
`;

    // Highlight using Highlight.js
    if (typeof hljs !== "undefined") {
      document.querySelectorAll("pre code").forEach(block => hljs.highlightElement(block));
    }

    // Update H2 title
    document.querySelector("h2").textContent = "Introduction JSON";
  });
});