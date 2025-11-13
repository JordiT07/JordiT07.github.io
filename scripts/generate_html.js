// generate_html.js

document.addEventListener("DOMContentLoaded", () => {
  const generateBtn = document.getElementById("generate-html-btn");
  const form = document.getElementById("intro-form");

  generateBtn.addEventListener("click", () => {

    // Grab basic info
    const firstName = form.querySelector('[name="firstName"]').value;
    const middleName = form.querySelector('[name="middleName"]').value;
    const nickname = form.querySelector('[name="nickname"]').value;
    const lastName = form.querySelector('[name="lastName"]').value;

    // Personal info
    const personalBackground = form.querySelector('[name="personalBackground"]').value;
    const professionalBackground = form.querySelector('[name="professionalBackground"]').value;
    const academicBackground = form.querySelector('[name="academicBackground"]').value;
    const courseBackground = form.querySelector('[name="courseBackground"]').value;
    const platform = form.querySelector('[name="platform"]').value;

    // Courses (handles multiple courses)
    const courses = [...form.querySelectorAll('.course')].map(courseDiv => {
      const dept = courseDiv.querySelector('[name="courseDept"]').value;
      const num = courseDiv.querySelector('[name="courseNum"]').value;
      const name = courseDiv.querySelector('[name="courseName"]').value;
      const reason = courseDiv.querySelector('[name="courseReason"]').value;
      return { dept, num, name, reason };
    });

    // Mascot & Acknowledgment
    const mascotAdj = form.querySelector('[name="mascotAdj"]').value;
    const mascotAnimal = form.querySelector('[name="mascotAnimal"]').value;
    const divider = form.querySelector('[name="divider"]').value;
    const ackStatement = form.querySelector('[name="ackStatement"]').value;
    const ackDate = form.querySelector('[name="ackDate"]').value;

    // Additional details
    const story = form.querySelector('[name="story"]').value;
    const something = form.querySelector('[name="something"]').value;
    const caption = form.querySelector('[name="caption"]').value;
    const pictureInput = form.querySelector('[name="picture"]');
    const picture = pictureInput.files[0] ? URL.createObjectURL(pictureInput.files[0]) : "";

    // Build HTML string
    let htmlOutput = `<h2>Introduction HTML</h2>\n`;
    htmlOutput += `<h3>${firstName} ${middleName ? middleName + ' ' : ''}${nickname ? '"' + nickname + '" ' : ''}${lastName} ${divider} ${mascotAdj} ${mascotAnimal}</h3>\n`;

    if (picture) {
      htmlOutput += `<figure>\n  <img src="${picture}" alt="Headshot of ${firstName} ${lastName}" />\n  <figcaption>${caption}</figcaption>\n</figure>\n`;
    }

    htmlOutput += `<ul>\n`;
    htmlOutput += `  <li><strong>Personal Background:</strong> ${personalBackground}</li>\n`;
    htmlOutput += `  <li><strong>Professional Background:</strong> ${professionalBackground}</li>\n`;
    htmlOutput += `  <li><strong>Academic Background:</strong> ${academicBackground}</li>\n`;
    htmlOutput += `  <li><strong>Background in this Course:</strong> ${courseBackground}</li>\n`;
    htmlOutput += `  <li><strong>Primary Computer Platform:</strong> ${platform}</li>\n`;
    htmlOutput += `  <li><strong>Courses I’m Taking:</strong>\n    <ul>\n`;
    courses.forEach(c => {
      htmlOutput += `      <li>${c.dept} ${c.num} - ${c.name} (${c.reason})</li>\n`;
    });
    htmlOutput += `    </ul>\n  </li>\n`;
    htmlOutput += `  <li><strong>Interesting Story:</strong> ${story}</li>\n`;
    htmlOutput += `  <li><strong>Something Else:</strong> ${something}</li>\n`;
    htmlOutput += `  <li><strong>Acknowledgment:</strong> ${ackStatement} (${ackDate})</li>\n`;
    htmlOutput += `</ul>`;

    // Replace form with code block and escape HTML for display
    form.innerHTML = `
<section>
  <pre><code class="html">${htmlOutput.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>
</section>
`;

    // Highlight code using Highlight.js
    if (typeof hljs !== "undefined") {
      document.querySelectorAll("pre code").forEach(block => {
        hljs.highlightElement(block);
      });
    }

    // Update page title H2
    document.querySelector("h2").textContent = "Introduction HTML";
  });
});