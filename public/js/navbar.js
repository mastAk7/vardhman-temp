document.addEventListener('DOMContentLoaded', function () {
    // Mobile dropdown behavior only
    if (window.innerWidth < 992) {
        const dropdowns = document.querySelectorAll('.dropdown');
        const submenus = document.querySelectorAll('.dropdown-submenu');

        dropdowns.forEach(dropdown => {
            const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
            const dropdownMenu = dropdown.querySelector('.dropdown-menu');

            if (dropdownToggle && dropdownMenu) {
                dropdownToggle.addEventListener('click', function (e) {
                    e.preventDefault();
                    dropdownMenu.classList.toggle('show');
                });
            }
        });

        submenus.forEach(submenu => {
            const submenuToggle = submenu.querySelector('.dropdown-toggle');
            const submenuDropdown = submenu.querySelector('.submenu');

            if (submenuToggle && submenuDropdown) {
                submenuToggle.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    submenuDropdown.classList.toggle('show');
                });
            }
        });
    }

    // Active nav highlighting
    function setActiveNavItem() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        let exactMatch = false;
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPath) {
                link.classList.add('active');
                exactMatch = true;
            }
        });

        if (!exactMatch) {
            navLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href !== '/' && currentPath.startsWith(href)) {
                    link.classList.add('active');
                }
            });
        }
    }

    setActiveNavItem();
    window.addEventListener('popstate', setActiveNavItem);
});