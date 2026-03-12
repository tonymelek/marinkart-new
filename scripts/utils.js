
function navigateTo(url) {
    const target = url.startsWith('/') ? '_self' : '_blank';
    window.open(url, target);
}
function navigateToLocation(name) {
    console.log(window.globalVars.locations);

    const location = window.globalVars.locations.find(loc => loc.name.toLowerCase() == name.toLowerCase());
    if (!location) return;
    window.open(`https://www.google.com/maps/search/?api=1&query=${location.coords[0]},${location.coords[1]}`, '_blank');
}

async function handleSubmit(e) {
    e.preventDefault(); // Prevent default form submission
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // 1. Basic Validation Check
    let isValid = true;
    for (let [key, value] of formData.entries()) {
        if (!value.trim()) {
            isValid = false;
            break;
        }
    }

    if (!isValid) {
        alert("Please fill out all required fields.");
        return;
    }

    // 2. Visual Loading State
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerText;
    submitBtn.innerText = "Sending...";
    submitBtn.disabled = true;

    try {
        // Replace with your actual API endpoint
        console.log('Submitting data:', data);
        // Simulated API call - replace with your actual fetch if ready
        /*
        const response = await fetch('https://api.marinkart.com/inquiry', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        */

        // Simulating a successful response for now
        await new Promise(resolve => setTimeout(resolve, 1000));

        alert("Thank you! Your inquiry has been sent successfully.");
        form.reset();

    } catch (error) {
        console.error('Submission failed:', error);
        alert("Something went wrong. Please try again later.");
    } finally {
        submitBtn.innerText = originalText;
        submitBtn.disabled = false;
    }
}

function setMinDateToToday(event) {
    const today = new Date().toISOString().split('T')[0];
    const year = today.split('-')[0];

    event.target.setAttribute('min', today);
    event.target.setAttribute('max', `${year}-12-31`);
}

async function handleBookingFormSubmit(e) {
    e.preventDefault(); // Prevents page reload

    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries())

    // 1. Validation (HTML 'required' attribute covers most, this adds a safety layer)
    const allFields = Array.from(formData.values());
    if (allFields.some(val => val.trim() === "") || allFields.length === 0) {
        alert("Please ensure all fields are filled correctly.");
        return;
    }

    // 2. Prepare for API Request
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerText = "Processing...";

    try {
        // Send data to your backend
        const response = await fetch('/api/booking', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const res = await response.json();
            // 3. Success Redirect
            window.location.href = `/inquiry_result.html?inquiry_id=${res.id}`;
        } else {
            alert("Submission failed. Please try again.");
        }
    } catch (err) {
        alert("An error occurred. Check your connection.");
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerText = "Confirm Course Booking";
    }
}

