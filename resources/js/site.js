// This is all you.
window.onload = function () {
    // Get the share button element

    $(".hamburger-btn").on("click", function (e) {
        console.log("hello");



        if ($(window).outerWidth() < 992) {
            $("body").toggleClass("wsactive");
        }
    });

    function shareButton() {
        const shareButton = document.getElementById("shareButton");

        if (!shareButton) {
            return;
        }
        // Add a click event listener to the share button
        shareButton.addEventListener("click", function () {
            // Create a URL with the post content
            const url = window.location.href;
            const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            window.open(fbShareUrl, "_blank", "width=600,height=400");
        });
    }
    shareButton();


    /* gallery */
    const miroirGallery = document.querySelector(".miroir-gallery");

    if (miroirGallery) {
        const lightbox = GLightbox({
            touchNavigation: true,
            loop: true,
        });
    }

    /* carousel */
    const miroirCarousel1 = document.querySelector(
        ".miroir-carousel--portfolio"
    );
    if (miroirCarousel1) {
        const smcp = new Swiper(".miroir-carousel--portfolio", {
            loop: true,
            slidesPerView: 1.2,
            spaceBetween: 20,
            slidesOffsetBefore: 20,

            // Navigation arrows
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            breakpoints: {
                767: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                1200: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
            },
        });
    }

    const miroirCarousel2 = document.querySelector(
        ".miroir-carousel--portfolio-2"
    );
    if (miroirCarousel2) {
        const smcp2 = new Swiper(".miroir-carousel--portfolio-2", {
            loop: true,
            slidesPerView: 1.2,
            spaceBetween: 20,
            slidesOffsetBefore: 20,

            // Navigation arrows
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            breakpoints: {
                767: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                    slidesOffsetBefore: 0,
                },
                1200: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                    slidesOffsetBefore: 0,
                },
            },
        });
    }

    $(document).on({
        contextmenu: function (e) {
            console.log("ctx menu button:", e.which);

            // Stop the context menu
            e.preventDefault();
        },
        mousedown: function (e) {
            console.log("normal mouse down:", e.which);
        },
        mouseup: function (e) {
            console.log("normal mouse up:", e.which);
        },
    });
};

/* Request assets form */
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formRequest");
    const responseDiv = document.getElementById("form-response");

    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const responseDiv = document.getElementById("form-response");

        // ReCAPTCHA Logic
        const recaptchaInput = document.getElementById('g-recaptcha-response');
        if (recaptchaInput && window.loadRecaptcha) {
            try {
                const grecaptcha = await window.loadRecaptcha();
                await new Promise(resolve => {
                    grecaptcha.ready(async () => {
                        try {
                            // Execute without action to avoid mismatch with backend configuration
                            const token = await grecaptcha.execute('6Lf0mw8sAAAAADkGviuxBVJzrty5PA6DM0udctkF');
                            console.log("Captcha token generated:", token.substring(0, 10) + "...");
                            recaptchaInput.value = token;
                            resolve();
                        } catch (err) {
                            console.error("Execute error:", err);
                            resolve(); // Resolve anyway to try submission, or let backend handle missing token
                        }
                    });
                });
            } catch (error) {
                console.error("Recaptcha error:", error);
                responseDiv.innerHTML = `<p class="text-sm text-red-500">Erreur de captcha. Veuillez recharger la page.</p>`;
                return;
            }
        }

        const action = form.getAttribute("action");
        const formData = new FormData(form);

        const successMessage = form.dataset.successMessage;

        responseDiv.innerHTML =
            "<p class='text-[#2d2d2d] !mt-5'>Envoi en cours...</p>";

        try {
            const response = await fetch(action, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                },
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                responseDiv.innerHTML =
                    '<p class="bg-green-500 text-white p-2 !mt-5 rounded-xl text-center">' +
                    successMessage +
                    "</p>";
                form.reset();

                setTimeout(() => {
                    $(".modal").modal("hide");
                }, 8000);
            } else {
                const errors = data?.errors ?? {};
                responseDiv.innerHTML = `<p class="text-sm text-red-500">Une erreur s'est produite :<br>${Object.values(
                    errors
                ).join("<br>")}</p>`;
            }
        } catch (err) {
            console.error(err);
            responseDiv.innerHTML =
                '<p class="text-sm text-red-500">Erreur de serveur !</p>';
        }
    });
});
