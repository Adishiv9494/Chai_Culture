// Persistent countdown using localStorage
        function initializeCountdown() {
            // Check if we already have a launch date in localStorage
            let launchDate = localStorage.getItem('royalChaiLaunchDate');
            
            if (!launchDate) {
                // Set launch date to 3 months from now
                const newLaunchDate = new Date();
                newLaunchDate.setMonth(newLaunchDate.getMonth() + 3);
                // Set to end of day (23:59:59)
                newLaunchDate.setHours(23, 59, 59, 999);
                
                // Store in localStorage
                localStorage.setItem('royalChaiLaunchDate', newLaunchDate.getTime());
                launchDate = newLaunchDate.getTime();
            } else {
                launchDate = parseInt(launchDate);
            }
            
            return launchDate;
        }
        
        // Update countdown display
        function updateCountdown() {
            const launchTime = initializeCountdown();
            const now = new Date().getTime();
            const timeLeft = launchTime - now;
            
            // Calculate days, hours, minutes, seconds
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            // Update the display with animation
            updateCountdownElement('days', days);
            updateCountdownElement('hours', hours);
            updateCountdownElement('minutes', minutes);
            updateCountdownElement('seconds', seconds);
            
            // Update progress bar
            const totalTime = 90 * 24 * 60 * 60 * 1000; // 90 days in milliseconds
            const elapsedTime = totalTime - timeLeft;
            const progressPercentage = Math.min(100, (elapsedTime / totalTime) * 100);
            document.getElementById('progress-bar').style.width = `${progressPercentage}%`;
            
            // If the countdown is over
            if (timeLeft < 0) {
                clearInterval(countdownInterval);
                document.querySelector('.countdown').innerHTML = "<h3 style='color: var(--gold-secondary); font-family: Cinzel;'>We're Live Now!</h3>";
                document.getElementById('progress-bar').style.width = '100%';
            }
        }
        
        // Update individual countdown element with animation
        function updateCountdownElement(elementId, newValue) {
            const element = document.getElementById(elementId);
            const currentValue = parseInt(element.textContent);
            
            if (currentValue !== newValue) {
                // Add animation class
                element.classList.add('updating');
                
                // Update value
                element.textContent = newValue.toString().padStart(2, '0');
                
                // Remove animation class after animation completes
                setTimeout(() => {
                    element.classList.remove('updating');
                }, 300);
            }
        }
        
        // Initialize countdown
        let countdownInterval = setInterval(updateCountdown, 1000);
        updateCountdown(); // Initial call
        
        // Form submission handler
        document.getElementById('signup-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const messageElement = document.getElementById('form-message');
            
            // Simple validation
            if (!name || !email) {
                showMessage("Please fill in all fields", "error");
                return;
            }
            
            if (!isValidEmail(email)) {
                showMessage("Please enter a valid email address", "error");
                return;
            }
            
            // Store in localStorage to simulate submission
            const submissions = JSON.parse(localStorage.getItem('royalChaiSubmissions') || '[]');
            submissions.push({ name, email, date: new Date().toISOString() });
            localStorage.setItem('royalChaiSubmissions', JSON.stringify(submissions));
            
            // Show success message
            showMessage(`Thank you, ${name}! You'll be the first to know when Royal Chai launches.`, "success");
            
            // Reset the form
            document.getElementById('signup-form').reset();
        });
        
        // Show message function
        function showMessage(text, type) {
            const messageElement = document.getElementById('form-message');
            messageElement.textContent = text;
            messageElement.className = `message ${type}`;
            
            // Clear the message after 5 seconds
            setTimeout(() => {
                messageElement.textContent = "";
                messageElement.className = "message";
            }, 5000);
        }
        
        // Email validation function
        function isValidEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }
        
        // Add subtle animation to elements on page load
        document.addEventListener('DOMContentLoaded', function() {
            // Animate logo
            const logo = document.querySelector('.logo');
            logo.style.transform = 'scale(0.5) rotate(-180deg)';
            logo.style.opacity = '0';
            
            setTimeout(() => {
                logo.style.transition = 'transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 1s ease';
                logo.style.transform = 'scale(1) rotate(0)';
                logo.style.opacity = '1';
            }, 300);
            
            // Animate tagline
            const tagline = document.querySelector('.tagline');
            tagline.style.opacity = '0';
            tagline.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                tagline.style.transition = 'opacity 1s ease, transform 1s ease';
                tagline.style.opacity = '1';
                tagline.style.transform = 'translateY(0)';
            }, 800);
            
            // Animate right panel
            const rightPanel = document.querySelector('.right-panel');
            rightPanel.style.opacity = '0';
            rightPanel.style.transform = 'translateX(30px)';
            
            setTimeout(() => {
                rightPanel.style.transition = 'opacity 1s ease, transform 1s ease';
                rightPanel.style.opacity = '1';
                rightPanel.style.transform = 'translateX(0)';
            }, 1200);
        });