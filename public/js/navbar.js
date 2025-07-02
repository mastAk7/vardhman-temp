document.addEventListener('DOMContentLoaded', function () {
    // Mobile dropdown functionality
    if (window.innerWidth < 992) {
        // Handle main dropdown toggles
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            const dropdownToggle = dropdown.querySelector('.nav-link.dropdown-toggle');
            const arrow = dropdown.querySelector('.dropdown-toggle-arrow');
            const dropdownMenu = dropdown.querySelector('.dropdown-menu');

            // Only handle clicks on the arrow icon for dropdown toggle
            if (arrow && dropdownMenu) {
                arrow.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();

                    // Toggle arrow rotation
                    const icon = this.querySelector('i');
                    if (dropdownMenu.classList.contains('show')) {
                        icon.className = 'fa fa-caret-down';
                    } else {
                        icon.className = 'fa fa-caret-up';
                    }

                    // Close other open dropdowns
                    document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
                        if (menu !== dropdownMenu) {
                            menu.classList.remove('show');
                            // Reset other arrows
                            const otherDropdown = menu.closest('.dropdown');
                            const otherArrow = otherDropdown.querySelector('.dropdown-toggle-arrow i');
                            if (otherArrow) {
                                otherArrow.className = 'fa fa-caret-down';
                            }
                        }
                    });

                    // Toggle current dropdown
                    dropdownMenu.classList.toggle('show');
                });
            }

            // Allow the dropdown toggle link to navigate normally
            if (dropdownToggle) {
                dropdownToggle.addEventListener('click', function (e) {
                    e.stopPropagation();
                });
            }
        });

        // Handle submenu toggles
        document.querySelectorAll('.dropdown-submenu').forEach(submenu => {
            const submenuToggle = submenu.querySelector('.dropdown-item.dropdown-toggle');
            const arrow = submenu.querySelector('.dropdown-toggle-arrow');
            const submenuDropdown = submenu.querySelector('.submenu');

            // Only handle clicks on the arrow for submenu toggle
            if (arrow && submenuDropdown) {
                arrow.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();

                    // Toggle arrow rotation
                    const icon = this.querySelector('i');
                    if (submenuDropdown.classList.contains('show')) {
                        icon.className = 'fa fa-caret-down';
                    } else {
                        icon.className = 'fa fa-caret-up';
                    }

                    // Close other open submenus in the same parent dropdown
                    const parentDropdown = submenu.closest('.dropdown-menu');
                    if (parentDropdown) {
                        parentDropdown.querySelectorAll('.submenu.show').forEach(menu => {
                            if (menu !== submenuDropdown) {
                                menu.classList.remove('show');
                                // Reset other submenu arrows
                                const otherSubmenu = menu.closest('.dropdown-submenu');
                                const otherArrow = otherSubmenu.querySelector('.dropdown-toggle-arrow i');
                                if (otherArrow) {
                                    otherArrow.className = 'fa fa-caret-down';
                                }
                            }
                        });
                    }

                    // Toggle current submenu
                    submenuDropdown.classList.toggle('show');
                });
            }

            // Allow submenu toggle links to work as normal links (if they have hrefs)
            if (submenuToggle) {
                submenuToggle.addEventListener('click', function (e) {
                    const href = this.getAttribute('href');
                    if (href && href !== '#') {
                        e.stopPropagation();
                    } else {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                });
            }
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', function (e) {
            if (!e.target.closest('.dropdown')) {
                document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
                    menu.classList.remove('show');
                    // Reset arrows
                    const dropdown = menu.closest('.dropdown');
                    const arrow = dropdown.querySelector('.dropdown-toggle-arrow i');
                    if (arrow) {
                        arrow.className = 'fa fa-caret-down';
                    }
                });
                document.querySelectorAll('.submenu.show').forEach(menu => {
                    menu.classList.remove('show');
                    // Reset submenu arrows
                    const submenu = menu.closest('.dropdown-submenu');
                    const arrow = submenu.querySelector('.dropdown-toggle-arrow i');
                    if (arrow) {
                        arrow.className = 'fa fa-caret-down';
                    }
                });
            }
        });
    }

    // Handle window resize to reset dropdowns when switching between mobile/desktop
    window.addEventListener('resize', function () {
        if (window.innerWidth >= 992) {
            // Remove show classes when switching to desktop view
            document.querySelectorAll('.dropdown-menu.show, .submenu.show').forEach(menu => {
                menu.classList.remove('show');
            });
            // Reset all arrows
            document.querySelectorAll('.dropdown-toggle-arrow i').forEach(arrow => {
                arrow.className = 'fa fa-caret-down';
            });
        }
    });

    // Active nav highlighting
    function setActiveNavItem() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');

        // Remove active class from all links
        navLinks.forEach(link => link.classList.remove('active'));

        let exactMatch = false;

        // First, try to find an exact match
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPath) {
                link.classList.add('active');
                exactMatch = true;
            }
        });

        // If no exact match, find the best partial match
        if (!exactMatch) {
            navLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href !== '/' && currentPath.startsWith(href)) {
                    link.classList.add('active');
                }
            });
        }
    }

    // Set active nav item on page load
    setActiveNavItem();

    // Update active nav item when navigating with browser back/forward buttons
    window.addEventListener('popstate', setActiveNavItem);
});