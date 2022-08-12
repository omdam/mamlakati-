
jQuery(document).ready(function ($) {

    const mapData = {
        "SAU1096": {
            name_en: "Najran",
            name_ar: "نجران",
            url: "list.html",
            cities: "4 مدن داخلية"
        },
        "SAU1097": {
            name_en: "Ar Riyad",
            name_ar: "الرياض",
            url: "list.html",
            cities: "4 مدن داخلية"
        },
        "SAU1098": {
            name_en: "Ash Sharqiyah",
            name_ar: "أش شرقيه",
            url: "list.html",
            cities: "4 مدن داخلية"
        },
        "SAU845": {
            name_en: "Al Madinah",
            name_ar: "المدينة",
            url: "list.html",
            cities: "4 مدن داخلية"
        },
        "SAU846": {
            name_en: "Al Quassim",
            name_ar: "القصيم",
            url: "list.html",
            cities: "4 مدن داخلية"
        },
        "SAU847": {
            name_en: "Ha'il",
            name_ar: "هيل",
            url: "list.html",
            cities: "4 مدن داخلية"
        },
        "SAU848": {
            name_en: "Tabuk",
            name_ar: "تبوك",
            url: "list.html",
            cities: "4 مدن داخلية"
        },
        "SAU861": {
            name_en: "Al Hudud ash Shamaliyah",
            name_ar: "الحدود الشمالية",
            url: "list.html",
            cities: "4 مدن داخلية"
        },
        "SAU862": {
            name_en: "Al Jawf",
            name_ar: "الجوف",
            url: "list.html",
            cities: "4 مدن داخلية"
        },
        "SAU885": {
            name_en: "Al Bahah",
            name_ar: "الباحة",
            url: "list.html",
            cities: "4 مدن داخلية"
        },
        "SAU886": {
            name_en: "Asir",
            name_ar: "عسير",
            url: "list.html",
            cities: "4 مدن داخلية"
        },
        "SAU887": {
            name_en: "Jizan",
            name_ar: "جزان",
            url: "list.html",
            cities: "4 مدن داخلية"
        },
        "SAU888": {
            name_en: "Makkah",
            name_ar: "مكة",
            url: "list.html",
            cities: "4 مدن داخلية"
        },
    }

    // insert region
    controleRegionDetailFromSuadiMap(mapData)

    toggleAppearenceOfPassword($)
    confirmationCodeInputs($)
    openAnotherFormInRegisterModal($)
    navlistToglleInSmallSize($);
    stickyNavbar($);
    lazyLoad();


    $(".view-icon.grid-icon").click(function (e) {
        $(".view-icon.grid-icon").addClass("active");
        $(".view-icon.list-icon").removeClass("active");
        $(".cities-grid").removeClass("list");
    });
    $(".view-icon.list-icon").click(function (e) {
        $(".view-icon.list-icon").addClass("active");
        $(".view-icon.grid-icon").removeClass("active");
        $(".cities-grid").addClass("list");
    });

    var galleryThumbs = new Swiper(".gallery-thumbs", {
        slidesPerView: 4,
        breakpoints: {
            0: {
                spaceBetween: 10,
                direction: "horizontal",
            },
            1200: {
                spaceBetween: 30,
                direction: "vertical",
            },
        },
    });
    var galleryMain = new Swiper(".gallery-main", {
        spaceBetween: 30,
        navigation: {
            nextEl: ".gallery-main .swiper-btn-next",
            prevEl: ".gallery-main .swiper-btn-prev",
        },
        thumbs: {
            swiper: galleryThumbs,
        },
    });
});

/********************************
 *
 * append new region into the div next to the map   *
 *
********************************/
function controleRegionDetailFromSuadiMap(mapData) {
    if ($(".suadi_map__ path").length) {

        const appendNewRegion = appendRegion.bind($(".suadi_map__ path").first());
        appendNewRegion((mapData))

        $(".suadi_map__ path").on("click", function (e) {
            e.preventDefault();

            const appendNewRegion = appendRegion.bind(this);
            appendNewRegion((mapData))

        });
    }
}

/********************************
 *
 * append new region into the div next to the map   *
 *
********************************/
function appendRegion(mapData) {


    $(this).addClass("active").siblings().removeClass("active");
    const regionKey = $(this).attr("id");
    const region = mapData[regionKey];

    // append html 
    let regionHtnl = '<h3 class="head__">' + region.name_ar + '</h3>';
    regionHtnl += '<span class="nums_of_cities__">' + region.cities + '</span>';
    regionHtnl += ' <a class="link_button__" href="' + region.url + '">عرض التفاصيل</a>';

    $("#add_map_region_data").html(regionHtnl)
}

/********************************
 *
 * toggle appearence of the password \  *
 *
********************************/
function toggleAppearenceOfPassword($) {
    $(".toggle_password_appearence").on("click", function (e) {
        e.preventDefault();

        let input = $(this).closest(".password_group__").find(".input__");

        if (input.attr("type") === "password") {
            input.attr("type", "text");
            $(this).addClass("active__")
        } else {
            input.attr("type", "password");
            $(this).removeClass("active__")

        }
    });
}
/********************************
 *
 * confirmation Code Inputs spread ....  *
 *
********************************/
function confirmationCodeInputs($) {
    const inputElements = [...document.querySelectorAll('.confirmation_code_group_ input.code-input')]

    inputElements.forEach((ele, index) => {
        ele.addEventListener('keydown', (e) => {
            // if the keycode is backspace & the current field is empty
            // focus the input before the current. Then the event happens
            // which will clear the "before" input box.
            if (e.keyCode === 8 && e.target.value === '') inputElements[Math.max(0, index - 1)].focus()
        })
        ele.addEventListener('input', (e) => {
            // take the first character of the input
            // this actually breaks if you input an emoji like 👨‍👩‍👧‍👦....
            // but I'm willing to overlook insane security code practices.
            const [first, ...rest] = e.target.value
            e.target.value = first ?? '' // first will be undefined when backspace was entered, so set the input to ""
            const lastInputBox = index === inputElements.length - 1
            const didInsertContent = first !== undefined
            if (didInsertContent && !lastInputBox) {
                // continue to input the rest of the string
                inputElements[index + 1].focus()
                inputElements[index + 1].value = rest.join('')
                inputElements[index + 1].dispatchEvent(new Event('input'))
            }
        })
    })


    // mini example on how to pull the data on submit of the form
    // function onSubmit(e) {
    //     e.preventDefault()
    //     const code = inputElements.map(({ value }) => value).join('')
    //     console.log(code)
    // }

}

/********************************
 *
 * open another form in the register modal  *
 *
********************************/
function openAnotherFormInRegisterModal($) {
    $(".open_another_form_button__").on("click", function (e) {
        e.preventDefault();

        $(".form_to_toggle__").removeClass("active__");
        $($(this).data("form")).addClass("active__");
    });

    $('#register_form_modal').on('hidden.bs.modal', function () {
        $(".form_to_toggle__").removeClass("active__");
        $("#singin_form__").addClass("active__");
    });

}


/********************************
 *
 * menu active and close button  *
 *
********************************/
function navlistToglleInSmallSize($) {
    $("#menu-butt-activ__").on("click", function (e) {
        e.preventDefault();

        $("#navbar-menu__").addClass("active-menu");
        $(".overlay").addClass("active");
        $("body").addClass("overflow-body");
    });

    // nav men close
    $(".close-butt__ , .overlay ").on("click", function (e) {
        e.preventDefault();
        $("#navbar-menu__").removeClass("active-menu");
        $(".overlay").removeClass("active");

        $("body").removeClass("overflow-body");
    });

}

/********************************
 *
 * sticky navbar *
 *
********************************/
function stickyNavbar($) {
    let headerHeight = $("header").outerHeight();

    let lastScroll = 0;
    $(document).on("scroll", function () {
        let currentScroll = $(this).scrollTop();

        // scroll down
        if (currentScroll < lastScroll && currentScroll > headerHeight + 100) {
            // add class avtive menu
            // if ($(".fixed-header-warper").hasClass("not-active-menu__")) {
            $(".fixed-header-warper").addClass("active-menu__");
            $(".fixed-header-warper").removeClass("not-active-menu__");
            // }
            // console.log("move up");
        } else if (
            currentScroll > lastScroll &&
            currentScroll > headerHeight + 100
        ) {
            // scroll up
            // remove class avtive menu
            if ($(".fixed-header-warper").hasClass("active-menu__")) {
                $(".fixed-header-warper").removeClass("active-menu__");
                $(".fixed-header-warper").addClass("not-active-menu__");
            }
            // $("#search-button-activation__").removeClass("search-is-active");
            // $("#search-form-act__").addClass("not-active").removeClass("active");
        } else {
            $(".fixed-header-warper").removeClass("active-menu__");
            $(".fixed-header-warper").removeClass("not-active-menu__");
        }
        lastScroll = currentScroll;
    });

}

/********************************
 *
 * lazy load  *
 *
********************************/

function lazyLoad() {
    const images = document.querySelectorAll(".lazy__d");

    const optionsLazyLoad = {
        //  rootMargin: '-50px',
        // threshold: 1
    };

    const imageObserver = new IntersectionObserver(function (enteries) {
        enteries.forEach(function (entery) {
            if (!entery.isIntersecting) {
                return;
            } else {
                preloadImage(entery.target);
                imageObserver.unobserve(entery.target);
            }
        });
    }, optionsLazyLoad);

    images.forEach(function (image) {
        imageObserver.observe(image);
    });
}

function preloadImage(img) {
    img.src = img.getAttribute("data-src");
    img.onload = function () {
        img.parentElement.classList.remove("loading__d");
        img.parentElement.classList.add("loaded__d");
        // img.parentElement.parentElement.classList.add("lazy-head__");
    };
}
