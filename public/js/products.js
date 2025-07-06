document.addEventListener('DOMContentLoaded', function() {
    // Initialize filter functionality
    initializeFilters();
    
    // Initialize view toggle
    initializeViewToggle();
    
    // Initialize search functionality
    initializeSearch();
    
    // Initialize clear filters
    initializeClearFilters();
    
    // Initialize from URL parameters
    initializeFromUrl();
});

function initializeFilters() {
    // Handle filter header clicks (accordion)
    const filterHeaders = document.querySelectorAll('.filter-header');
    
    filterHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const filterId = this.dataset.filter;
            const content = document.getElementById(filterId + '-content');
            
            // Toggle active class
            this.classList.toggle('active');
            content.classList.toggle('active');
        });
    });
    
    // Handle filter changes
    const filterInputs = document.querySelectorAll('input[type="radio"]');
    
    filterInputs.forEach(input => {
        input.addEventListener('change', function() {
            if (this.checked) {
                updateFilters();
            }
        });
    });
    
    // Initialize accordion state - open first few sections by default
    const defaultOpenSections = ['sectors', 'categories'];
    defaultOpenSections.forEach(section => {
        const header = document.querySelector(`[data-filter="${section}"]`);
        const content = document.getElementById(section + '-content');
        if (header && content) {
            header.classList.add('active');
            content.classList.add('active');
        }
    });
    
    // Handle category selection to show/hide classifications
    const categoryInputs = document.querySelectorAll('input[name="category"]');
    categoryInputs.forEach(input => {
        input.addEventListener('change', function() {
            // Hide all classification sections
            const allClassifications = document.querySelectorAll('[id^="classifications-"]');
            allClassifications.forEach(section => {
                section.style.display = 'none';
            });
            
            // Show classifications for selected category
            if (this.checked) {
                const categoryId = this.value;
                const classificationsSection = document.getElementById(`classifications-${categoryId}`);
                if (classificationsSection) {
                    classificationsSection.style.display = 'block';
                }
            }
        });
    });
    
    // Handle classification selection to auto-select parent category
    const classificationInputs = document.querySelectorAll('input[name="classification"]');
    classificationInputs.forEach(input => {
        input.addEventListener('change', function() {
            if (this.checked) {
                // Find the parent category for this classification
                const classificationId = this.value;
                const parentCategoryId = findParentCategory(classificationId);
                
                if (parentCategoryId) {
                    // Auto-select the parent category
                    const parentCategoryInput = document.querySelector(`input[name="category"][value="${parentCategoryId}"]`);
                    if (parentCategoryInput && !parentCategoryInput.checked) {
                        parentCategoryInput.checked = true;
                        
                        // Trigger the category change event to show classifications
                        parentCategoryInput.dispatchEvent(new Event('change'));
                    }
                }
            }
        });
    });
    
    // Initialize classification visibility based on current selection
    const selectedCategory = document.querySelector('input[name="category"]:checked');
    if (selectedCategory) {
        const categoryId = selectedCategory.value;
        const classificationsSection = document.getElementById(`classifications-${categoryId}`);
        if (classificationsSection) {
            classificationsSection.style.display = 'block';
        }
    }
}

// Helper function to find parent category for a classification
function findParentCategory(classificationId) {
    // This assumes your HTML structure has classification inputs with data attributes
    // or you can determine the parent category from the classification ID
    
    // Method 1: If you have data attributes on the classification inputs
    const classificationInput = document.querySelector(`input[name="classification"][value="${classificationId}"]`);
    if (classificationInput && classificationInput.dataset.parentCategory) {
        return classificationInput.dataset.parentCategory;
    }
    
    // Method 2: If classifications are grouped in sections with IDs like "classifications-{categoryId}"
    const classificationInputs = document.querySelectorAll('input[name="classification"]');
    for (const input of classificationInputs) {
        if (input.value === classificationId) {
            // Find the parent section
            const parentSection = input.closest('[id^="classifications-"]');
            if (parentSection) {
                // Extract category ID from section ID (e.g., "classifications-air_traffic_management" -> "air_traffic_management")
                const sectionId = parentSection.id;
                const categoryId = sectionId.replace('classifications-', '');
                return categoryId;
            }
        }
    }
    
    return null;
}

function initializeViewToggle() {
    const gridViewBtn = document.getElementById('grid-view');
    const listViewBtn = document.getElementById('list-view');
    const productsGrid = document.getElementById('products-grid');
    
    gridViewBtn.addEventListener('click', function() {
        productsGrid.classList.remove('list-view');
        this.classList.add('active');
        listViewBtn.classList.remove('active');
    });
    
    listViewBtn.addEventListener('click', function() {
        productsGrid.classList.add('list-view');
        this.classList.add('active');
        gridViewBtn.classList.remove('active');
    });
}

function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    let searchTimeout;
    
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            updateFilters();
        }, 500); // Debounce search
    });
}

function initializeClearFilters() {
    const clearBtn = document.getElementById('clear-filters');
    
    clearBtn.addEventListener('click', function() {
        // Clear all radio buttons
        const radioInputs = document.querySelectorAll('input[type="radio"]');
        radioInputs.forEach(input => {
            input.checked = false;
        });
        
        // Clear search input
        const searchInput = document.getElementById('search-input');
        searchInput.value = '';
        
        // Hide all classification sections
        const allClassifications = document.querySelectorAll('[id^="classifications-"]');
        allClassifications.forEach(section => {
            section.style.display = 'none';
        });
        
        // Update filters
        updateFilters();
    });
}

function updateFilters() {
    const formData = new FormData();
    
    // Get all filter values
    const sectorInput = document.querySelector('input[name="sector"]:checked');
    const categoryInput = document.querySelector('input[name="category"]:checked');
    const classificationInput = document.querySelector('input[name="classification"]:checked');
    const marketInput = document.querySelector('input[name="market"]:checked');
    const typeInput = document.querySelector('input[name="type"]:checked');
    const searchInput = document.getElementById('search-input');
    
    // Build query string
    const params = new URLSearchParams();
    
    if (sectorInput) params.append('sector', sectorInput.value);
    if (categoryInput) params.append('category', categoryInput.value);
    if (classificationInput) params.append('classification', classificationInput.value);
    if (marketInput) params.append('market', marketInput.value);
    if (typeInput) params.append('type', typeInput.value);
    if (searchInput.value.trim()) params.append('search', searchInput.value.trim());
    
    // Determine the base URL
    let baseUrl = '/products';
    
    // If sector is selected, use sector-specific URL
    if (sectorInput) {
        baseUrl = `/products/${sectorInput.value}`;
        params.delete('sector'); // Remove sector from query params since it's in the URL
    }
    // If category is selected (but no sector), use category-specific URL
    else if (categoryInput) {
        baseUrl = `/products/category/${categoryInput.value}`;
        params.delete('category'); // Remove category from query params since it's in the URL
    }
    // If classification is selected (but no category or sector), use classification-specific URL
    else if (classificationInput) {
        baseUrl = `/products/classification/${classificationInput.value}`;
        params.delete('classification'); // Remove classification from query params since it's in the URL
    }
    
    // Navigate to the new URL
    const queryString = params.toString();
    const newUrl = queryString ? `${baseUrl}?${queryString}` : baseUrl;
    
    window.location.href = newUrl;
}

// Utility function to get URL parameters
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Initialize filter state from URL on page load
function initializeFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Set search input
    const searchParam = urlParams.get('search');
    if (searchParam) {
        const searchInput = document.getElementById('search-input');
        searchInput.value = searchParam;
    }
    
    // Set radio buttons based on URL parameters
    const filterParams = ['sector', 'category', 'classification', 'market', 'type'];
    filterParams.forEach(param => {
        const value = urlParams.get(param);
        if (value) {
            const input = document.querySelector(`input[name="${param}"][value="${value}"]`);
            if (input) {
                input.checked = true;
            }
        }
    });
    
    // Also check URL path for sector/category/classification
    const pathParts = window.location.pathname.split('/');
    if (pathParts.length >= 3) {
        const lastPart = pathParts[pathParts.length - 1];
        const secondLastPart = pathParts[pathParts.length - 2];
        
        // Check if it's a sector URL
        if (pathParts.length === 3 && pathParts[1] === 'products' && lastPart !== 'products') {
            const sectorInput = document.querySelector(`input[name="sector"][value="${lastPart}"]`);
            if (sectorInput) {
                sectorInput.checked = true;
            }
        }
        
        // Check if it's a category URL
        if (secondLastPart === 'category') {
            const categoryInput = document.querySelector(`input[name="category"][value="${lastPart}"]`);
            if (categoryInput) {
                categoryInput.checked = true;
            }
        }
        
        // Check if it's a classification URL
        if (secondLastPart === 'classification') {
            const classificationInput = document.querySelector(`input[name="classification"][value="${lastPart}"]`);
            if (classificationInput) {
                classificationInput.checked = true;
                
                // Auto-select parent category
                const parentCategoryId = findParentCategory(lastPart);
                if (parentCategoryId) {
                    const parentCategoryInput = document.querySelector(`input[name="category"][value="${parentCategoryId}"]`);
                    if (parentCategoryInput) {
                        parentCategoryInput.checked = true;
                        
                        // Show the classifications section
                        const classificationsSection = document.getElementById(`classifications-${parentCategoryId}`);
                        if (classificationsSection) {
                            classificationsSection.style.display = 'block';
                        }
                    }
                }
            }
        }
    }
    
    // After setting all filters from URL, handle any selected classification to auto-select its category
    const selectedClassification = document.querySelector('input[name="classification"]:checked');
    if (selectedClassification) {
        const classificationId = selectedClassification.value;
        const parentCategoryId = findParentCategory(classificationId);
        
        if (parentCategoryId) {
            const parentCategoryInput = document.querySelector(`input[name="category"][value="${parentCategoryId}"]`);
            if (parentCategoryInput && !parentCategoryInput.checked) {
                parentCategoryInput.checked = true;
                
                // Show the classifications section
                const classificationsSection = document.getElementById(`classifications-${parentCategoryId}`);
                if (classificationsSection) {
                    classificationsSection.style.display = 'block';
                }
            }
        }
    }
}