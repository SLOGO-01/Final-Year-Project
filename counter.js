document.addEventListener("DOMContentLoaded", function () {
    const counters = document.querySelectorAll(".counter");
    
    counters.forEach(counter => {
        const target = +counter.getAttribute("data-target"); // Get target number
        let count = 0;
        const increment = target / 110; // Adjust speed

        function updateCounter() {
            count += increment;
            if (count < target) {
                counter.innerText = Math.ceil(count);
                requestAnimationFrame(updateCounter); // Smooth animation
            } else {
                counter.innerText = target; // Ensure exact final value
            }
        }
        
        updateCounter();
    });
});
