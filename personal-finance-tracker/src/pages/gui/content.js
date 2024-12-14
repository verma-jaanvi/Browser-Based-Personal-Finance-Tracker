// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Create a style element and add CSS for the button and logo
    const style = document.createElement('style');
    style.innerHTML = `
      .finance-button {
        display: flex;
        align-items: center;
        padding: 10px;
        background-color: #4CAF50; /* Green background */
        border: none;
        color: white;
        cursor: pointer;
        border-radius: 5px;
      }
  
      .finance-logo {
        width: 20px; /* Adjust size of the logo */
        height: 20px;
        margin-right: 8px; /* Space between logo and title */
      }
  
      .finance-button:hover {
        background-color: #45a049; /* Darker green on hover */
      }
    `;
    
    // Append the style to the head of the document
    document.head.appendChild(style);
  
    // Create the button element
    const button = document.createElement('button');
    button.classList.add('finance-button'); // Add a class for styling
  
    // Create an image element for the logo
    const logo = document.createElement('img');
    logo.src = 'logo.png'; // Set the source for the logo image
    logo.alt = 'Logo'; // Alt text for the image
    logo.classList.add('finance-logo'); // Add class for styling
  
    // Add the logo to the button
    button.appendChild(logo);
  
    // Add the title to the button
    const title = document.createElement('span');
    title.textContent = 'Your finance'; // Set the title
    button.appendChild(title);
  
    // Set the button's click event to redirect to the dashboard
    button.addEventListener('click', function() {
      window.location.href = 'dashboard.js'; // Redirect to dashboard.js
    });
  
    // Append the button to the body or a specific container
    document.body.appendChild(button);
  });
  