// Handle Tabs
function openTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

    document.getElementById(tabName).classList.add('active');
    document.querySelector(`[onclick="openTab('${tabName}')"]`).classList.add('active');
}

// Default Tab
document.addEventListener("DOMContentLoaded", () => {
    openTab('register');
});

// Handle Modal Open/Close
const modal = document.getElementById("register-modal");
const openFormBtn = document.getElementById("open-form");
const closeModal = document.querySelector(".close");

openFormBtn.addEventListener("click", () => {
    modal.style.display = "flex";
});

closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
});

// Handle Form Submission
document.getElementById("submit-registration").addEventListener("click", () => {
    const mealPlan = document.getElementById("meal-plan").value;
    const receipt = document.getElementById("receipt-upload").files[0];

    if (!mealPlan || !receipt) {
        alert("Please select a meal plan and upload a receipt.");
        return;
    }

    alert("Meal Plan Registered Successfully!\nAwaiting Approval.");
    modal.style.display = "none";
});
