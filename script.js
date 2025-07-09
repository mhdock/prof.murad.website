document.addEventListener('DOMContentLoaded', function() {
    // Expandable sections functionality
    const expandableBtns = document.querySelectorAll('.expandable-btn');
    
    expandableBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const section = this.parentElement;
            section.classList.toggle('active');
            
            // Close other sections when one is opened
            if (section.classList.contains('active')) {
                document.querySelectorAll('.expandable-section').forEach(sec => {
                    if (sec !== section) {
                        sec.classList.remove('active');
                    }
                });
            }
        });
    });
    
    // Open first section by default
    if (expandableBtns.length > 0) {
        expandableBtns[0].click();
    }
});