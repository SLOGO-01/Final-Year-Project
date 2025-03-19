// Sample data to simulate fetching from a server
const sampleRequests = [
    {
        studentName: "Weje Chioma",
        receiptImage: "path/to/receipt1.jpg",
        mealPlan: "Lunch,Supper",
        studentInfo: "Matric Number: 21/3427, Department: Computer Science",
        status: "pending" // Status can be 'pending', 'approved', or 'rejected'
    },
    {
        studentName: "Sowole Heelz",
        receiptImage: "path/to/receipt2.jpg",
        mealPlan: "Breakfast,Supper",
        studentInfo: "Matric Number:22/5340, Department: Animal Science",
        status: "pending"
    },
    {
        studentName: "Osebor Winston",
        receiptImage: "path/to/receipt2.jpg",
        mealPlan: "Lunch,Supper",
        studentInfo: "Matric Number:21/9026 , Department: Theology",
        status: "pending"
    },
    {
        studentName: "Overcomer Tawose",
        receiptImage: "path/to/receipt2.jpg",
        mealPlan: "Breakfast,Lunch,Supper",
        studentInfo: "Matric Number: 21/7185, Department: Music",
        status: "pending"
    }
];

// Function to fetch requests (simulated)
function fetchRequests() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(sampleRequests);
        }, 1000);
    });
}

// Function to add a new request card
function addNewRequest(studentName, receiptImage, mealPlan, studentInfo, status) {
    const requestCards = document.getElementById('request-cards');
    const newCard = document.createElement('div');
    newCard.className = 'request-card';
    
    newCard.innerHTML = `
        <div class="card-header">
            <h3>${studentName}</h3>
            ${status === 'pending' ? `
                <button class="approve-btn">Approve</button>
                <button class="reject-btn">Reject</button>
            ` : ''}
        </div>
        <div class="card-content">
            <p>Click to view details...</p>
        </div>
        <div class="card-details hidden">
            <img src="${receiptImage}" alt="Receipt" class="receipt-image">
            <p><strong>Selected Meal Plan:</strong> ${mealPlan}</p>
            <p><strong>Student Info:</strong> ${studentInfo}</p>
            <p class="status"><strong>Status:</strong> ${status.charAt(0).toUpperCase() + status.slice(1)}</p> <!-- Status message -->
        </div>
    `;

    // Add click event to open modal
    newCard.onclick = function() {
        openModal(studentName, receiptImage, mealPlan, studentInfo, status);
    };

    // Add event listeners for approve and reject buttons
    const approveButton = newCard.querySelector('.approve-btn');
    const rejectButton = newCard.querySelector('.reject-btn');

    if (approveButton) {
        approveButton.onclick = function(event) {
            event.stopPropagation(); // Prevent the card from toggling
            approveRequest(newCard);
        };
    }

    if (rejectButton) {
        rejectButton.onclick = function(event) {
            event.stopPropagation(); // Prevent the card from toggling
            rejectRequest(newCard);
        };
    }

    requestCards.appendChild(newCard);
}

// Function to open the modal
function openModal(studentName, receiptImage, mealPlan, studentInfo, status) {
    const modal = document.getElementById("infoModal");
    const modalBody = document.getElementById("modal-body");
    
    modalBody.innerHTML = `
        <h3>${studentName}</h3>
        <img src="${receiptImage}" alt="Receipt" style="width: 100%; border-radius: 8px;">
        <p><strong>Selected Meal Plan:</strong> ${mealPlan}</p>
        <p><strong>Student Info:</strong> ${studentInfo}</p>
        <p><strong>Status:</strong> ${status.charAt(0).toUpperCase() + status.slice(1)}</p> <!-- Status message -->
    `;
    
    modal.style.display = "flex"; // Show the modal
}

// Function to close the modal
function closeModal() {
    const modal = document.getElementById("infoModal");
    modal.style.display = "none"; // Hide the modal
}


// Function to initialize the page
async function init() {
    const requests = await fetchRequests();
    requests.forEach(request => {
        addNewRequest(request.studentName, request.receiptImage, request.mealPlan, request.studentInfo, request.status);
    });
}

// Event listener for closing the modal
document.querySelector(".close-btn").onclick = closeModal;

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById("infoModal");
    if (event.target == modal) {
        closeModal();
    }
};

// Function to approve a request
function approveRequest(card) {
    const approvedRequests = document.getElementById('approved-requests');
    
    // Update status and move to approved section
    const statusElement = card.querySelector('.status'); // Updated selector
    statusElement.innerHTML = "<strong>Status:</strong> Approved"; // Update status on card

    // Clone the card without buttons
    const updatedCard = card.cloneNode(true);
    const approveButton = updatedCard.querySelector('.approve-btn');
    const rejectButton = updatedCard.querySelector('.reject-btn');
    
    // Remove buttons from the cloned card
    if (approveButton) approveButton.remove();
    if (rejectButton) rejectButton.remove();

    approvedRequests.appendChild(updatedCard); // Append to approved section
    card.remove(); // Remove the card from the current requests
}

// Function to reject a request
function rejectRequest(card) {
    const rejectedRequests = document.getElementById('rejected-requests');
    
    // Update status and move to rejected section
    const statusElement = card.querySelector('.status'); // Updated selector
    statusElement.innerHTML = "<strong>Status:</strong> Rejected"; // Update status on card

    // Clone the card without buttons
    const updatedCard = card.cloneNode(true);
    const approveButton = updatedCard.querySelector('.approve-btn');
    const rejectButton = updatedCard.querySelector('.reject-btn');
    
    // Remove buttons from the cloned card
    if (approveButton) approveButton.remove();
    if (rejectButton) rejectButton.remove();

    rejectedRequests.appendChild(updatedCard); // Append to rejected section
    card.remove(); // Remove the card from the current requests
}
// Function to show approved requests
function showApproved() {
    document.getElementById('approved-requests').classList.add('active');
    document.getElementById('rejected-requests').classList.remove('active');
    document.getElementById('approved-tab').classList.add('active');
    document.getElementById('rejected-tab').classList.remove('active');
}

// Function to show rejected requests
function showRejected() {
    document.getElementById('approved-requests').classList.remove('active');
    document.getElementById('rejected-requests').classList.add('active');
    document.getElementById('approved-tab').classList.remove('active');
    document.getElementById('rejected-tab').classList.add('active');
}

// Event listeners for the navbar tabs
document.getElementById('approved-tab').addEventListener('click', showApproved);
document.getElementById('rejected-tab').addEventListener('click', showRejected);

// Initialize to show approved requests by default
showApproved();

// Call the init function to load requests on page load
init();