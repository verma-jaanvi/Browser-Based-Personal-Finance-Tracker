
//to change the background of cointainer when dashboard is active
document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.nav-link'); // All tab links
    const container = document.querySelector('.container'); // The container element

    tabs.forEach((tab) => {
        tab.addEventListener('click', function () {
            // Check if the clicked tab is the dashboard tab
            if (tab.id === 'dashboard-tab' && tab.classList.contains('active')) {
                container.style.backgroundColor = 'rgba(0,0,0,0)'; // New background color for dashboard
            } else {
                container.style.backgroundColor = 'rgb(6, 26, 64)'; // Default background color
            }
        });
    });
});



