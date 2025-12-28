// ^ Write your JavaScript code here
var secLinks = document.querySelectorAll('a[role="menuitem"]');
var sections = document.querySelectorAll("section");
var scrollUpButton = document.getElementById("scroll-to-top");
var settingsSiderbar = document.getElementById("settings-sidebar");
var settingsToggle = document.getElementById("settings-toggle");
var closeSettingsButton = document.getElementById("close-settings");
var settingsAriaHiddenItems = document.querySelectorAll(
    "settings-sidebar *[aria-hidden]"
);
var mobileMenuBtn = document.querySelector(".mobile-menu-btn");
var menubar = document.querySelector('div[role="menubar"]');
var fontOptions = document.querySelectorAll(".font-option");

// selecting dark/light mode toggle and adding behavior to it
document
    .getElementById("theme-toggle-button")
    .addEventListener("click", function (e) {
        document.documentElement.classList.toggle("dark");
    });

//  creating window js observer
var observer = new IntersectionObserver(function (observeList) {
    observeList.forEach((observeItem) => {
        if (observeItem.isIntersecting) {
            var id = observeItem.target.id;
            secLinks.forEach((link) => {
                link.classList.toggle(
                    "active",
                    link.getAttribute("href") === `#${id}`
                );
            });
        }
    });
});

// populating observed items list in the window observer
sections.forEach((section) => observer.observe(section));

// adding behavior to up button
scrollUpButton.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
});

// showing and hidding up button regarding where are we
window.addEventListener("scroll", function () {
    var theCondition =
        this.window.scrollY >
        this.document.getElementById("hero-section").offsetHeight;
    scrollUpButton.classList.toggle("opacity-0", !theCondition);
    scrollUpButton.classList.toggle("invisible", !theCondition);
});

// toggling settings side bar

// the toggling function
function togglineSettings() {
    settingsSiderbar.classList.toggle("translate-x-full");
    settingsToggle.ariaExpanded =
        settingsToggle.ariaExpanded === "true" ? "false" : "true";
    if (settingsToggle.ariaExpanded === "true") {
        settingsSiderbar.ariaHidden = "false";
        closeSettingsButton.ariaHidden = "false";
        settingsToggle.style.right = "20rem";
        closeSettingsButton.focus();
    } else {
        settingsSiderbar.blur();
        closeSettingsButton.blur();
        document.body.focus();
        settingsSiderbar.ariaHidden = "true";
        closeSettingsButton.ariaHidden = "true";
        settingsToggle.style.right = "0";
    }
}

// adding the functions to the elements
settingsToggle.addEventListener("click", function () {
    togglineSettings();
});
closeSettingsButton.addEventListener("click", function () {
    togglineSettings();
});

window.addEventListener("click", function (e) {
    var isClickedOnWindow =
        settingsSiderbar.contains(e.target) ||
        settingsToggle.contains(e.target);

    if (
        !isClickedOnWindow &&
        !settingsSiderbar.classList.contains("translate-x-full")
    ) {
        togglineSettings();
    }
});

// clicking menubar icon to open menubar
mobileMenuBtn.addEventListener("click", function () {
    menubar.classList.toggle("active");
});

// give font options some magic
fontOptions.forEach((option) => {
    option.addEventListener("click", function (e) {
        fontOptions.forEach((innerOption) => {
            innerOption.classList.toggle(
                "active",
                innerOption.contains(e.target)
            );
            if (innerOption.contains(e.target)) {
                innerOption.ariaChecked = "true";
                document.body.classList.add(
                    `font-${innerOption.getAttribute("data-font")}`
                );
            } else {
                innerOption.ariaChecked = "false";
                document.body.classList.remove(
                    `font-${innerOption.getAttribute("data-font")}`
                );
            }
        });
    });
});
