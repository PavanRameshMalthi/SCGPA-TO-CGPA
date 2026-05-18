document.addEventListener(
  "DOMContentLoaded",
  () => {

    let semesterCount = 0;

    const semestersDiv =
      document.getElementById(
        "semesters"
      );

    const result =
      document.getElementById(
        "result"
      );

    const emptyState =
      document.getElementById(
        "emptyState"
      );

    const semesterCounter =
      document.getElementById(
        "semesterCount"
      );

    const creditCounter =
      document.getElementById(
        "creditCount"
      );

    // Buttons

    document
      .getElementById(
        "addSemesterBtn"
      )
      .addEventListener(
        "click",
        addSemester
      );

    document
      .getElementById(
        "calculateBtn"
      )
      .addEventListener(
        "click",
        calculate
      );

    document
      .getElementById(
        "resetBtn"
      )
      .addEventListener(
        "click",
        resetAll
      );

    // Theme Toggle

    const themeToggle =
      document.getElementById(
        "themeToggle"
      );

    themeToggle.addEventListener(
      "click",
      () => {

        document.body.classList.toggle(
          "dark"
        );

        const icon =
          themeToggle.querySelector("i");

        if (
          document.body.classList.contains(
            "dark"
          )
        ) {

          icon.classList.remove(
            "fa-moon"
          );

          icon.classList.add(
            "fa-sun"
          );

        } else {

          icon.classList.remove(
            "fa-sun"
          );

          icon.classList.add(
            "fa-moon"
          );

        }

      }
    );

    // Add Semester

    function addSemester() {

      semesterCount++;

      updateStats();

      emptyState.style.display =
        "none";

      const semesterDiv =
        document.createElement("div");

      semesterDiv.classList.add(
        "semester"
      );

      semesterDiv.innerHTML = `

        <div class="semester-top">

          <label>
            Semester ${semesterCount}
          </label>

          <button class="remove-btn">
            <i class="fa-solid fa-xmark"></i>
          </button>

        </div>

        <input
          type="number"
          class="sgpa"
          placeholder="Enter Semester SGPA"
          min="0"
          max="10"
          step="0.01"
        >

        <input
          type="number"
          class="credit"
          placeholder="Enter Total Credits"
          min="1"
        >

      `;

      // Remove Semester

      semesterDiv
        .querySelector(".remove-btn")
        .addEventListener(
          "click",
          () => {

            semesterDiv.remove();

            semesterCount--;

            updateStats();

            if (
              semesterCount === 0
            ) {

              emptyState.style.display =
                "block";

            }

          }
        );

      semestersDiv.appendChild(
        semesterDiv
      );

    }

    // Calculate CGPA

    function calculate() {

      const sgpas =
        document.querySelectorAll(
          ".sgpa"
        );

      const credits =
        document.querySelectorAll(
          ".credit"
        );

      let totalWeightedSGPA = 0;

      let totalCredits = 0;

      for (
        let i = 0;
        i < sgpas.length;
        i++
      ) {

        const sgpa =
          parseFloat(
            sgpas[i].value
          );

        const credit =
          parseFloat(
            credits[i].value
          );

        if (
          isNaN(sgpa) ||
          isNaN(credit)
        ) {

          alert(
            "Please fill all semesters properly."
          );

          return;
        }

        totalWeightedSGPA +=
          sgpa * credit;

        totalCredits += credit;

      }

      if (totalCredits === 0) {

        alert(
          "Please add semesters."
        );

        return;

      }

      // CGPA Formula

      const cgpa =
        totalWeightedSGPA /
        totalCredits;

      // Percentage Formula

      const percentage =
        cgpa * 10;

      result.style.display =
        "block";

      result.innerHTML = `

        <h2>
          🎉 Result
        </h2>

        <div class="result-info">

          <div class="result-box">

            <h3>CGPA</h3>

            <p>
              ${cgpa.toFixed(2)}
            </p>

          </div>

          <div class="result-box">

            <h3>Percentage</h3>

            <p>
              ${percentage.toFixed(2)}%
            </p>

          </div>

        </div>

      `;

      creditCounter.innerText =
        totalCredits;

    }

    // Reset

    function resetAll() {

      const confirmReset =
        confirm(
          "Reset everything?"
        );

      if (!confirmReset)
        return;

      semestersDiv.innerHTML = "";

      result.style.display =
        "none";

      semesterCount = 0;

      updateStats();

      emptyState.style.display =
        "block";

    }

    // Update Stats

    function updateStats() {

      semesterCounter.innerText =
        semesterCount;

    }

  }
);