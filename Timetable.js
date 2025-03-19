
// Timetable page scripting
const navItems = document.querySelectorAll(".nav-item");
const navHighlight = document.querySelector(".nav-highlight");
const navLinks = document.querySelector(".nav-links");
const contentSections = document.querySelectorAll(".content-section");

function updateHighlight(element) {
    const itemRect = element.getBoundingClientRect();
    const parentRect = navLinks.getBoundingClientRect();

    // Update width and position relative to nav-links
    navHighlight.style.width = `${itemRect.width}px`;
    navHighlight.style.transform = `translateX(${itemRect.left - parentRect.left}px)`;
}

// Set initial position for the active item
const activeItem = document.querySelector(".nav-item.active");
if (activeItem) updateHighlight(activeItem);

// Show the corresponding content section
function showContent(targetId) {
    contentSections.forEach(section => {
        section.classList.remove("active");
        if (section.id === targetId) {
            section.classList.add("active");
        }
    });
}

navItems.forEach(item => {
    item.addEventListener("click", function(event) {
        event.preventDefault(); // Prevent default anchor behavior

        // Remove "active" class from all nav items
        navItems.forEach(nav => nav.classList.remove("active"));

        // Add "active" class to the clicked nav item
        this.classList.add("active");

        // Update highlight position
        updateHighlight(this);

        // Show the corresponding content
        const targetId = this.getAttribute("data-target");
        showContent(targetId);
    });
});