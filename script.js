document.addEventListener('DOMContentLoaded', function() {
    // Handle expandable sections
    const expandableBtns = document.querySelectorAll('.expandable-btn');
    
    expandableBtns.forEach(btn => {
        // Set the first section to be open by default
        if(btn.textContent.includes('Overview')) {
            const content = btn.nextElementSibling;
            const icon = btn.querySelector('i');
            content.style.display = 'block';
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
        }
        
        btn.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            if (content.style.display === 'block') {
                content.style.display = 'none';
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            } else {
                content.style.display = 'block';
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            }
        });
    });

    // Form validation for appointment form
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        // Add current year to year dropdown if not already present
        const yearSelect = document.getElementById('year');
        const currentYear = new Date().getFullYear();
        
        // Check if current year exists in options
        let yearExists = false;
        for(let i = 0; i < yearSelect.options.length; i++) {
            if(yearSelect.options[i].value == currentYear) {
                yearExists = true;
                break;
            }
        }
        
        if(!yearExists) {
            const newOption = new Option(currentYear, currentYear);
            yearSelect.add(newOption, 1); // Add at position 1 (after "Select Year")
        }

        appointmentForm.addEventListener('submit', function(e) {
            let isValid = true;
            let firstInvalidField = null;
            
            // Check all required fields
            const requiredFields = this.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = 'red';
                    
                    // Store reference to first invalid field
                    if (!firstInvalidField) {
                        firstInvalidField = field;
                    }
                } else {
                    field.style.borderColor = '#ddd';
                }
            });

            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields.');
                
                // Scroll to first invalid field
                if (firstInvalidField) {
                    firstInvalidField.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                    firstInvalidField.focus();
                }
            }
        });
    }

    // Set current year in footer
    const yearElement = document.querySelector('.copyright');
    if (yearElement) {
        yearElement.innerHTML = yearElement.innerHTML.replace('&copy; <script>document.write(new Date().getFullYear())</script>', 
            `&copy; ${new Date().getFullYear()}`);
    }
});
// Dynamic Time Options Based on Day Selection
document.getElementById('day').addEventListener('change', function() {
    const day = this.value;
    const timeSelect = document.getElementById('time');
    
    // Clear existing options
    timeSelect.innerHTML = '<option value="">Select Time</option>';
    
    // Add time slots based on selected day
    if (day === 'Monday') {
        addTimeOption(timeSelect, 'Monday 9:00 am');
        addTimeOption(timeSelect, 'Monday 10:00 am');
    } 
    else if (day === 'Tuesday') {
        addTimeOption(timeSelect, 'Tuesday 11:20 am');
        addTimeOption(timeSelect, 'Tuesday 12:00 pm');
    } 
    else if (day === 'Wednesday') {
        addTimeOption(timeSelect, 'Wednesday 9:00 am');
        addTimeOption(timeSelect, 'Wednesday 10:00 am');
        addTimeOption(timeSelect, 'Wednesday 4:20 pm');
    }
});

function addTimeOption(selectElement, value) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = value;
    selectElement.appendChild(option);
}
