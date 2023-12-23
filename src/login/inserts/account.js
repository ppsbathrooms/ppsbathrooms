let currentNavItem = 'account'
navItems = ['account', 'settings']

$('#navbarAccount').click(e => {
    if (currentNavItem != 'account') {
        currentNavItem = 'account'
        navNavigate('account')
    }
})

$('#navbarSettings').click(e => {
    if (currentNavItem != 'settings') {
        currentNavItem = 'settings'
        navNavigate('settings')
    }
})

function navNavigate(navItem) {
    $.each(navItems, function (index, element) {
        $('#' + element).hide();
    });
    $('#' + navItem).fadeIn(100)
}