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
// filtering buttons
var allFilters = document.querySelectorAll("[data-filter]");
// selecting project nodelist
var projectsGroup = document.querySelectorAll(".portfolio-item");
// carsoul
var carouselIndicator = document.querySelectorAll(".carousel-indicator");
var carouselNext = document.querySelector("#next-testimonial");
var carouselPrev = document.querySelector("#prev-testimonial");
var carouselTest = document.getElementById("testimonials-carousel");

// selecting dark/light mode toggle and adding behavior to it
document
    .getElementById("theme-toggle-button")
    .addEventListener("click", function (e) {
        document.documentElement.classList.toggle("dark");
        if (document.documentElement.classList.contains("dark")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
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

// the toggling function to open and close setting
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

// adding the functions to the elements that should open and close settings
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
            handelingFonts(innerOption, innerOption.contains(e.target));
            if (innerOption.contains(e.target)) {
                localStorage.setItem(
                    "font",
                    `font-${innerOption.getAttribute("data-font")}`
                );
            }
        });
    });
});

// refector handeling fonts
function handelingFonts(target, theCondition) {
    target.classList.toggle("active", theCondition);
    if (theCondition) {
        target.ariaChecked = "true";
        document.body.classList.add(`font-${target.getAttribute("data-font")}`);
    } else {
        target.ariaChecked = "false";
        document.body.classList.remove(
            `font-${target.getAttribute("data-font")}`
        );
    }
}

// give color theme some magic
var selectedClasses = [
    "ring-2",
    "ring-primary",
    "ring-offset-2",
    "ring-offset-white",
    "dark:ring-offset-slate-900",
    "active",
];

var colorSelectorButtons = document.querySelectorAll("*[data-primary]");
colorSelectorButtons.forEach(function (button) {
    button.addEventListener("click", function (e) {
        colorSelectorButtons.forEach(function (innerButton) {
            handelingTheme(innerButton, innerButton.contains(e.target));
            if (innerButton.contains(e.target)) {
                localStorage.setItem(
                    "theme-color",
                    `${innerButton.getAttribute("title")}`
                );
            }
        });
    });
});

// handeling color theme
function handelingTheme(target, theCondition) {
    selectedClasses.forEach(function (aClass) {
        target.classList.toggle(aClass, theCondition);
    });
    if (theCondition) {
        document
            .querySelector('head meta[name="theme-color"]')
            .setAttribute("content", target.getAttribute("data-primary"));
    }
}

// if there is something in local storage show it
function showLocalStorage() {
    if (localStorage.getItem("theme")) {
        document.documentElement.classList.replace(
            "dark",
            localStorage.getItem("theme")
        );
    }
    if (localStorage.getItem("font")) {
        fontOptions.forEach((innerOption) => {
            handelingFonts(
                innerOption,
                `font-${innerOption.getAttribute("data-font")}` ===
                    localStorage.getItem("font")
            );
        });
    }
    if (localStorage.getItem("theme-color")) {
        colorSelectorButtons.forEach((button) => {
            handelingTheme(
                button,
                localStorage.getItem("theme-color") ===
                    button.getAttribute("title")
            );
        });
    }
}

showLocalStorage();

document.getElementById("reset-settings").addEventListener("click", () => {
    localStorage.setItem("theme", "dark");
    localStorage.setItem("font", "font-tajawal");
    localStorage.setItem("theme-color", "Purple Blue");
    showLocalStorage();
});

// nav and tabs
var nonSelectedButtonClasses = [
    "dark:bg-slate-800",
    "text-slate-600",
    "dark:text-slate-300",
];
var selectedButtonClasses = [
    "bg-linear-to-r",
    "from-primary",
    "to-secondary",
    "text-white",
];
projectsGroup.forEach((project) => {
    project.style.transition = "opacity 0.3s, transform 0.3s;";
});
allFilters.forEach((filter) => {
    filter.addEventListener("click", (e) => {
        allFilters.forEach((innerFilter) => {
            innerFilter.classList.toggle(
                "active",
                innerFilter.contains(e.target)
            );
            console.log(innerFilter.contains(e.target));
            if (innerFilter.classList.contains("active")) {
                selectedButtonClasses.forEach((aClass) => {
                    innerFilter.classList.add(aClass);
                });
                nonSelectedButtonClasses.forEach((aClass) => {
                    innerFilter.classList.remove(aClass);
                });
            } else {
                selectedButtonClasses.forEach((aClass) => {
                    innerFilter.classList.remove(aClass);
                });
                nonSelectedButtonClasses.forEach((aClass) => {
                    innerFilter.classList.add(aClass);
                });
            }
            innerFilter.ariaPressed = "false";
            if (innerFilter.contains(e.target)) {
                innerFilter.ariaPressed = "true";
            }
        });
        projectsGroup.forEach((project) => {
            if (
                project.getAttribute("data-category") ===
                    filter.getAttribute("data-filter") ||
                filter.getAttribute("data-filter") === "all"
            ) {
                requestAnimationFrame(() => {
                    project.style.opacity = "1";
                    project.style.transform = "scale(1)";
                });
                project.style.display = "block";
            } else {
                project.style.opacity = "0";
                project.style.transform = "scale(0.8)";
                project.style.display = "none";
            }
        });
    });
});

// carousel
carouselIndicator.forEach((indicator) => {
    indicator.addEventListener("click", (e) => {
        carouselIndicator.forEach((innerIndicator) => {
            blessTheChoicenIndicator(
                innerIndicator,
                innerIndicator.contains(e.target)
            );
        });
    });
});

function blessTheChoicenIndicator(choicenIndicator, theCondition) {
    choicenIndicator.classList.toggle("active", theCondition);
    if (theCondition) {
        choicenIndicator.classList.replace("bg-slate-400", "bg-accent");
        choicenIndicator.classList.replace("dark:bg-slate-600", "scale-125");
        var addition;
        if (window.innerWidth > 1024) {
            addition = 100 / 3;
        } else if (window.innerWidth > 640 ) {
            addition = 50;
        } else if (window.innerWidth < 640) {
            addition = 100;
        }
        carouselTest.style.transform = `translateX(${
            choicenIndicator.getAttribute("data-index") * addition
        }%)`;
    } else {
        choicenIndicator.classList.replace("bg-accent", "bg-slate-400");
        choicenIndicator.classList.replace("scale-125", "dark:bg-slate-600");
    }
}

carouselNext.addEventListener("click", (_) => {
    moveUsingArrows("next");
});

carouselPrev.addEventListener("click", (_) => {
    moveUsingArrows("prev");
});

function moveUsingArrows(direct) {
    var theChoicen;
    carouselIndicator.forEach((indicator) => {
        if (indicator.classList.contains("active")) {
            theChoicen = +indicator.getAttribute("data-index");
        }
    });
    if (direct === "next") {
        if (theChoicen === 3) {
            return;
        }
        console.log("nextFirreeddd")
        carouselIndicator.forEach((indicator) => {
            blessTheChoicenIndicator(
                indicator,
                carouselIndicator[theChoicen + 1] === indicator
            );
        });
    } else {
        if (theChoicen === 0) {
            return;
        }
        console.log("I firrrreeddd")
        carouselIndicator.forEach((indicator) => {
            blessTheChoicenIndicator(
                indicator,
                carouselIndicator[theChoicen - 1] === indicator
            );
        });
    }
}
