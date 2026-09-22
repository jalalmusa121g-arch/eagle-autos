/* =========================================
   EAGLE AUTOS
   MAIN JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================
       VEHICLE DATA

       IMPORTANT:
       These filenames EXACTLY match
       your images folder.
    ===================================== */

    const vehicles = [
        {
            name: "Honda",
            category: "Honda Collection",
            description:
                "Explore the Honda vehicle gallery. Contact EAGLE AUTOS for current vehicle details, availability and enquiries.",
            images: [
                "images/honda-1.jpg",
                "images/honda-2.jpg",
                "images/honda-3.jpg",
                "images/honda-4.jpg",
                "images/honda-5.jpg"
            ]
        },

        {
            name: "Toyota",
            category: "Toyota Collection",
            description:
                "Explore the Toyota vehicle gallery. Contact EAGLE AUTOS for current vehicle details, availability and enquiries.",
            images: [
                "images/Toyota-1.jpg",
                "images/Toyota-2.jpg",
                "images/Toyota-3.jpg",
                "images/Toyota-4.jpg",
                "images/Toyota-5.jpg"
            ]
        },

        {
            name: "Mercedes-Benz GLE",
            category: "Mercedes-Benz Collection",
            description:
                "Explore the Mercedes-Benz GLE gallery. Contact EAGLE AUTOS for current vehicle details, availability and enquiries.",
            images: [
                "images/Mercedes-Bez-gle-1.jpg",
                "images/Mercedes-Bez-gle-2.jpg",
                "images/Mercedes-Bez-gle-3.jpg",
                "images/Mercedes-Bez-gle-4.jpg",
                "images/Mercedes-Bez-gle-5.jpg"
            ]
        },

        {
            name: "Lexus RX 350",
            category: "Lexus Collection",
            description:
                "Explore the Lexus RX 350 gallery. Contact EAGLE AUTOS for current vehicle details, availability and enquiries.",
            images: [
                "images/Lexus-RX-350-1.jpg",
                "images/Lexus-RX-350-2.jpg",
                "images/Lexus-RX-350-3.jpg",
                "images/Lexus-RX-350-4.jpg",
                "images/Lexus-RX-350-5.jpg"
            ]
        }
    ];


    /* =====================================
       ELEMENTS
    ===================================== */

    const carsGrid =
        document.getElementById("carsGrid");

    const vehicleModal =
        document.getElementById("vehicleModal");

    const modalBackdrop =
        document.getElementById("modalBackdrop");

    const modalClose =
        document.getElementById("modalClose");

    const modalImage =
        document.getElementById("modalImage");

    const modalTitle =
        document.getElementById("modalTitle");

    const modalDescription =
        document.getElementById("modalDescription");

    const thumbnailRow =
        document.getElementById("thumbnailRow");

    const imageCounter =
        document.getElementById("imageCounter");

    const galleryPrev =
        document.getElementById("galleryPrev");

    const galleryNext =
        document.getElementById("galleryNext");

    const modalWhatsapp =
        document.getElementById("modalWhatsapp");

    const menuBtn =
        document.getElementById("menuBtn");

    const navLinks =
        document.getElementById("navLinks");

    const year =
        document.getElementById("year");


    /* =====================================
       CURRENT VEHICLE / IMAGE
    ===================================== */

    let currentVehicle = 0;
    let currentImage = 0;


    /* =====================================
       YEAR
    ===================================== */

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* =====================================
       MOBILE MENU
    ===================================== */

    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", function () {

            navLinks.classList.toggle("open");

        });


        navLinks.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                navLinks.classList.remove("open");

            });

        });

    }


    /* =====================================
       CREATE CAR CARDS
    ===================================== */

    function createCars() {

        if (!carsGrid) return;

        carsGrid.innerHTML = "";


        vehicles.forEach(function (vehicle, index) {

            const card =
                document.createElement("article");

            card.className = "car-card";


            card.innerHTML = `

                <div class="car-image-wrap">

                    <img
                        src="${vehicle.images[0]}"
                        alt="${vehicle.name}"
                        loading="lazy"
                        onerror="handleImageError(this)"
                    >

                    <div class="car-badge">
                        EAGLE AUTOS
                    </div>

                    <div class="photo-count">
                        5 PHOTOS
                    </div>

                </div>


                <div class="car-info">

                    <div class="car-category">
                        ${vehicle.category}
                    </div>

                    <h3>
                        ${vehicle.name}
                    </h3>

                    <p>
                        View the complete vehicle
                        photo gallery and make an enquiry.
                    </p>

                    <button
                        class="view-car"
                        type="button"
                        data-index="${index}"
                    >
                        VIEW CAR
                    </button>

                </div>

            `;


            carsGrid.appendChild(card);

        });


        /* Add click events after cards exist */

        const buttons =
            document.querySelectorAll(".view-car");


        buttons.forEach(function (button) {

            button.addEventListener("click", function () {

                const index =
                    Number(this.getAttribute("data-index"));

                openVehicle(index);

            });

        });

    }


    /* =====================================
       OPEN VEHICLE
    ===================================== */

    function openVehicle(index) {

        if (!vehicles[index]) return;

        currentVehicle = index;
        currentImage = 0;

        const vehicle =
            vehicles[currentVehicle];


        modalTitle.textContent =
            vehicle.name;


        modalDescription.textContent =
            vehicle.description;


        updateModalImage();

        createThumbnails();


        const message =
            "Hello EAGLE AUTOS, I am interested in the " +
            vehicle.name +
            ". Please send me more details.";


        modalWhatsapp.href =
            "https://wa.me/2348051950631?text=" +
            encodeURIComponent(message);


        vehicleModal.classList.add("active");

        document.body.classList.add("modal-open");

    }


    /* =====================================
       CLOSE VEHICLE
    ===================================== */

    function closeVehicle() {

        vehicleModal.classList.remove("active");

        document.body.classList.remove("modal-open");

    }


    /* =====================================
       UPDATE MAIN IMAGE
    ===================================== */

    function updateModalImage() {

        const vehicle =
            vehicles[currentVehicle];


        if (!vehicle) return;


        modalImage.src =
            vehicle.images[currentImage];


        modalImage.alt =
            vehicle.name +
            " image " +
            (currentImage + 1);


        imageCounter.textContent =
            (currentImage + 1) +
            " / " +
            vehicle.images.length;


        updateThumbnailState();

    }


    /* =====================================
       CREATE THUMBNAILS
    ===================================== */

    function createThumbnails() {

        thumbnailRow.innerHTML = "";


        const vehicle =
            vehicles[currentVehicle];


        vehicle.images.forEach(function (image, index) {

            const thumbnail =
                document.createElement("img");


            thumbnail.className =
                "thumbnail";


            thumbnail.src =
                image;


            thumbnail.alt =
                vehicle.name +
                " thumbnail " +
                (index + 1);


            thumbnail.loading = "lazy";


            thumbnail.addEventListener(
                "click",
                function () {

                    currentImage = index;

                    updateModalImage();

                }
            );


            thumbnail.onerror = function () {

                this.style.display = "none";

            };


            thumbnailRow.appendChild(thumbnail);

        });


        updateThumbnailState();

    }


    /* =====================================
       THUMBNAIL ACTIVE STATE
    ===================================== */

    function updateThumbnailState() {

        const thumbnails =
            thumbnailRow.querySelectorAll(".thumbnail");


        thumbnails.forEach(function (thumbnail, index) {

            if (index === currentImage) {

                thumbnail.classList.add("active");

            } else {

                thumbnail.classList.remove("active");

            }

        });

    }


    /* =====================================
       NEXT IMAGE
    ===================================== */

    function nextImage() {

        const vehicle =
            vehicles[currentVehicle];


        currentImage++;


        if (
            currentImage >=
            vehicle.images.length
        ) {

            currentImage = 0;

        }


        updateModalImage();

    }


    /* =====================================
       PREVIOUS IMAGE
    ===================================== */

    function previousImage() {

        const vehicle =
            vehicles[currentVehicle];


        currentImage--;


        if (currentImage < 0) {

            currentImage =
                vehicle.images.length - 1;

        }


        updateModalImage();

    }


    /* =====================================
       MODAL EVENTS
    ===================================== */

    if (modalClose) {

        modalClose.addEventListener(
            "click",
            closeVehicle
        );

    }


    if (modalBackdrop) {

        modalBackdrop.addEventListener(
            "click",
            closeVehicle
        );

    }


    if (galleryNext) {

        galleryNext.addEventListener(
            "click",
            nextImage
        );

    }


    if (galleryPrev) {

        galleryPrev.addEventListener(
            "click",
            previousImage
        );

    }


    /* =====================================
       KEYBOARD CONTROLS
    ===================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                !vehicleModal.classList.contains("active")
            ) {
                return;
            }


            if (event.key === "Escape") {

                closeVehicle();

            }


            if (event.key === "ArrowRight") {

                nextImage();

            }


            if (event.key === "ArrowLeft") {

                previousImage();

            }

        }
    );


    /* =====================================
       TOUCH / SWIPE SUPPORT
    ===================================== */

    let touchStartX = 0;
    let touchEndX = 0;


    modalImage.addEventListener(
        "touchstart",
        function (event) {

            touchStartX =
                event.changedTouches[0].screenX;

        },
        { passive: true }
    );


    modalImage.addEventListener(
        "touchend",
        function (event) {

            touchEndX =
                event.changedTouches[0].screenX;


            const difference =
                touchEndX - touchStartX;


            if (Math.abs(difference) < 50) {
                return;
            }


            if (difference < 0) {

                nextImage();

            } else {

                previousImage();

            }

        },
        { passive: true }
    );


    /* =====================================
       IMAGE ERROR HANDLER
    ===================================== */

    window.handleImageError = function (image) {

        image.onerror = null;

        image.style.background =
            "#222";

        image.style.objectFit =
            "contain";

        image.alt =
            "Image could not be loaded";

    };


    /* =====================================
       SCROLL REVEAL
    ===================================== */

    function addRevealEffects() {

        const elements =
            document.querySelectorAll(
                ".service-card, .why-item, .car-card, .experience-box"
            );


        elements.forEach(function (element) {

            element.classList.add("reveal");

        });


        const observer =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        elements.forEach(function (element) {

            observer.observe(element);

        });

    }


    /* =====================================
       INITIALIZE
    ===================================== */

    createCars();

    addRevealEffects();


});