function showTab(tabId, btn) {
      document.querySelectorAll(".section").forEach(section => {
        section.classList.remove("active");
      });
      document.querySelectorAll(".tabs button").forEach(button => {
        button.classList.remove("active");
      });

      document.getElementById(tabId).classList.add("active");
      btn.classList.add("active");
    }

    function calculateAttendance() {
      const total = parseInt(document.getElementById("totalClasses").value);
      const attended = parseInt(document.getElementById("attendedClasses").value);
      const result = document.getElementById("attendanceResult");

      if (isNaN(total) || isNaN(attended) || total <= 0 || attended < 0 || attended > total) {
        result.innerHTML = "Please enter valid class details.";
        return;
      }

      const percentage = ((attended / total) * 100).toFixed(2);

      if (attended / total >= 0.75) {
        const bunkAllowed = Math.floor((attended / 0.75) - total);
        result.innerHTML = `
          Current Attendance: <span class="highlight">${percentage}%</span><br>
          You can bunk <span class="highlight">${bunkAllowed}</span> more class(es) and stay above 75%.
        `;
      } else {
        const needToAttend = Math.ceil((0.75 * total - attended) / 0.25);
        result.innerHTML = `
          Current Attendance: <span class="highlight">${percentage}%</span><br>
          You need to attend <span class="highlight">${needToAttend}</span> more class(es) continuously to reach 75%.
        `;
      }
    }

    function generateSubjects() {
      const num = parseInt(document.getElementById("numSubjects").value);
      const container = document.getElementById("subjectsContainer");
      container.innerHTML = "";

      if (isNaN(num) || num < 1 || num > 10) return;

      for (let i = 1; i <= num; i++) {
        container.innerHTML += `
          <div class="subject-row">
            <div class="subject-title">Subject ${i}</div>
            <div class="row-grid">
              <div>
                <label>Grade</label>
                <select class="grade">
                  <option value="">Select Grade</option>
                  <option value="10">S</option>
                  <option value="9">A</option>
                  <option value="8">B</option>
                  <option value="7">C</option>
                  <option value="6">D</option>
                  <option value="0">F</option>
                </select>
              </div>
              <div>
                <label>Credits</label>
                <input type="number" class="credit" min="1" step="1" placeholder="Enter credits" />
              </div>
            </div>
          </div>
        `;
      }
    }

    function calculateSGPA() {
      const grades = document.querySelectorAll(".grade");
      const credits = document.querySelectorAll(".credit");
      const result = document.getElementById("gpaResult");

      if (grades.length === 0) {
        result.innerHTML = "Please select number of subjects first.";
        return;
      }

      let totalCreditPoints = 0;
      let totalCredits = 0;
      let hasFail = false;

      for (let i = 0; i < grades.length; i++) {
        const gradePoint = parseFloat(grades[i].value);
        const credit = parseFloat(credits[i].value);

        if (isNaN(gradePoint) || isNaN(credit) || credit <= 0) {
          result.innerHTML = "Please select all grades and enter valid credits.";
          return;
        }

        if (gradePoint === 0) {
          hasFail = true;
        }

        totalCreditPoints += gradePoint * credit;
        totalCredits += credit;
      }

      const sgpa = (totalCreditPoints / totalCredits).toFixed(2);

      result.innerHTML = `
        Total Credits: <span class="highlight">${totalCredits}</span><br>
        Total Credit Points: <span class="highlight">${totalCreditPoints}</span><br>
        SGPA: <span class="highlight">${sgpa}</span>
        ${hasFail ? "<br><span class='highlight'>Note: You have at least one F grade.</span>" : ""}
      `;
    }
