// Create container
const container = document.createElement('div');
container.id = 'insights-container';

// Chart placeholder (you can integrate with a library like Chart.js)
const chart = document.createElement('div');
chart.id = 'chart';
chart.innerText = '📊 Chart Placeholder';
container.appendChild(chart);

// Dashboard button
const button = document.createElement('button');
button.id = 'dashboard-button';
button.innerText = 'Visit Dashboard';
button.onclick = () => {
  window.open('https://your-dashboard-link.com', '_blank');
};
container.appendChild(button);

// Add the container to the body
document.body.appendChild(container);

// Style the container
container.style.position = 'fixed';
container.style.bottom = '20px';
container.style.right = '20px';
container.style.width = '300px';
container.style.padding = '10px';
container.style.backgroundColor = '#f9f9f9';
container.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
container.style.borderRadius = '8px';
container.style.fontFamily = 'Arial, sans-serif';
chart.style.height = '150px';
chart.style.textAlign = 'center';
chart.style.padding = '20px';
button.style.marginTop = '10px';
button.style.padding = '10px';
button.style.width = '100%';
button.style.border = 'none';
button.style.backgroundColor = '#007bff';
button.style.color = '#fff';
button.style.borderRadius = '5px';
button.style.cursor = 'pointer';
button.onmouseover = () => (button.style.backgroundColor = '#0056b3');
button.onmouseout = () => (button.style.backgroundColor = '#007bff');
