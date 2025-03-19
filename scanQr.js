document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById("start-button");
    const stopButton = document.getElementById("stop-button");
    const studentDataDiv = document.getElementById("student-data");
    const loadingDiv = document.getElementById("loading");
    const noDataDiv = document.getElementById("no-data");
    const historyList = document.getElementById("history-list");
    const successAnimation = document.getElementById("success-animation");
    const clearHistoryButton = document.getElementById("clear-history");

    // Dummy student data
    const dummyStudentData = {
        name: "Overcomer Tawose",
        id: "21/1280",
        department: "Computer Science",
        yearLevel: "300 level",
        status: "Active",
        event: "Lunch",
        checkinTime: new Date().toLocaleString(),
        mealPlan: "BLS Meal Plan",
        // photo: "/api/placeholder/100/100"
        photo: "/Assets/Remo.jpg"
    };

    // Function to simulate a successful scan
    function simulateScan() {
        loadingDiv.classList.remove("hidden");
        noDataDiv.classList.add("hidden");
        studentDataDiv.classList.add("hidden");

        // Simulate a delay for loading
        setTimeout(() => {
            loadingDiv.classList.add("hidden");
            displayStudentData(dummyStudentData);
            addToScanHistory(dummyStudentData);
            showSuccessAnimation();
        }, 1000);
    }

    // Function to display student data
    function displayStudentData(studentInfo) {
        document.getElementById("student-photo").src = studentInfo.photo;
        document.getElementById("student-name").textContent = studentInfo.name;
        document.getElementById("student-id").textContent = `Matric Number: ${studentInfo.id}`;
        document.getElementById("department").textContent = studentInfo.department;
        document.getElementById("year-level").textContent = studentInfo.yearLevel;
        document.getElementById("status").textContent = studentInfo.status;
        document.getElementById("event").textContent = studentInfo.event;
        document.getElementById("checkin-time").textContent = studentInfo.checkinTime;
        document.getElementById("meal-plan").textContent = studentInfo.mealPlan; // Display meal plan
        studentDataDiv.classList.remove("hidden"); // Show student data
    }

    // Function to add scanned student info to history
    function addToScanHistory(studentInfo) {
        const historyItem = document.createElement("div");
        historyItem.className = "history-item";
        historyItem.innerHTML = `
            <div class="history-photo">
                <img src="${studentInfo.photo}" alt="Student Photo">
            </div>
            <div class="history-details">
                <div class="history-name">${studentInfo.name}</div>
                <div class="history-id">Matric Number: ${studentInfo.id}</div>
                <div class="history-time">${studentInfo.checkinTime}</div>
                <div class="history-meal-plan">Meal Plan: ${studentInfo.mealPlan}</div>
            </div>
        `;
        historyList.appendChild(historyItem);
    }

    // Function to show success animation
    function showSuccessAnimation() {
        successAnimation.classList.add("show");
        setTimeout(() => {
            successAnimation.classList.remove("show");
        }, 2000);
    }

    // Event listeners for buttons
    startButton.addEventListener("click", simulateScan);
    stopButton.addEventListener("click", () => {
        // Reset the scanner and clear student data
        studentDataDiv.classList.add("hidden");
        noDataDiv.classList.add("hidden");
        loadingDiv.classList.add("hidden");
    });

    clearHistoryButton.addEventListener("click", () => {
        historyList.innerHTML = ""; // Clear history
    });
});