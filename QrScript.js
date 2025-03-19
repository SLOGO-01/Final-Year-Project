document.getElementById("generate-qr").addEventListener("click", function () {
    const studentID = document.getElementById("matric-number").innerText;
    const mealPlan = document.getElementById("meal-plan").innerText;
    const course = document.getElementById("course").innerText;

    // Create QR Code Data
    const qrData = `Student ID: ${studentID}\nMeal Plan: ${mealPlan}\nCourse: ${course}`;
    
    // Clear previous QR code
    document.getElementById("qrcode").innerHTML = "";

    // Generate QR Code
    new QRCode(document.getElementById("qrcode"), {
        text: qrData,
        width: 150,
        height: 150
    });

    // Show Download Button
    document.getElementById("download-qr").style.display = "block";

    // Set Expiry Timer
    setTimeout(() => {
        document.getElementById("qrcode").innerHTML = "";
        document.getElementById("expiry-info").innerText = "QR Code expired. Please generate a new one.";
        document.getElementById("expiry-info").style.display = "block";
    }, 300000); // 5 minutes (300,000 ms)
});

// QR Code Download Feature
document.getElementById("download-qr").addEventListener("click", function () {
    const qrCanvas = document.querySelector("#qrcode canvas");
    const qrImage = qrCanvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = qrImage;
    link.download = "meal-card-qr.png";
    link.click();
});

