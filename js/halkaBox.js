/*  
    halkaBox.js
    Version: 0.1
    Auther: Ahmed Noor, url: https://github.com/ahmednooor
    License: MIT, url: https://opensource.org/licenses/MIT
*/

// function for galleries
function halkaBoxGallery(selector) {
    "use strict";
    // main variables
    var body = document.getElementsByTagName("body")[0],
        galleryContainer = document.querySelector("#" + selector),
        images = galleryContainer.querySelectorAll("a[data-hb=\"" + selector + "\"]"),
        ir,
        i,
        imagesQty = images.length,
        imageLink,
        // function to trigger the plugin when a gallery image is clicked
        galleryImageClick = function galleryImageClickF(index) {
            return function (e) {
                e.preventDefault();

                // assigning the value of ir to i via index
                i = index;

                // geting the value of href attribute of the clicked link
                imageLink = this.getAttribute("href");

                // creating and appending elements for lightbox popup templating
                // main wrapper for all elements in popup
                var hbWrapper = document.createElement("div"),
                    hbMainContainer = document.createElement("div"),
                    hbImageContainer = document.createElement("div"),
                    hbLoader = document.createElement("div"),
                    hbImageElement = document.createElement("img"),
                    hbCloseIconContainer = document.createElement("div"),
                    hbCloseIconElement = document.createElement("a"),
                    hbLeftIconContainer = document.createElement("div"),
                    hbLeftIconElement = document.createElement("a"),
                    hbRightIconContainer = document.createElement("div"),
                    hbRightIconElement = document.createElement("a"),
                    hbImage,
                    hbClose,
                    hbLeft,
                    hbRight,
                    hbCloseIconSvg = "<svg version=\"1.1\" id=\"Capa_1\" xmlns=\"http://www.w3.org/2000/svg\"xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\"y=\"0px\" viewBox=\"0 0 357 357\" enable-background=\"new 0 0 357 357\" xml:space=\"preserve\"><g><g id=\"close\"><polygon points=\"357,35.7 321.3,0 178.5,142.8 35.7,0 0,35.7 142.8,178.5 0,321.3 35.7,357 178.5,214.2 321.3,357 357,321.3 214.2,178.5\"/></g></g></svg>",
                    hbLeftIconSvg = "<svg version=\"1.1\" id=\"Capa_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"viewBox=\"0 0 306 306\" enable-background=\"new 0 0 306 306\" xml:space=\"preserve\"><g><g id=\"chevron-right\"><polygon points=\"58.7,153 211.7,306 247.4,270.3 130.1,153 247.4,35.7 211.7,0\"/></g></g></svg>",
                    hbRightIconSvg = "<svg version=\"1.1\" id=\"Capa_1\" xmlns=\"http://www.w3.org/2000/svg\"xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 306 306\" enable-background=\"new 0 0 306 306\" xml:space=\"preserve\"><g><g id=\"chevron-right\"><polygon points=\"94.3,0 58.7,35.7 175.9,153 58.7,270.3 94.3,306 247.4,153\"/></g></g></svg>";
                    

                // setting attributes to created elements
                hbWrapper.setAttribute("class", "hb-wrapper");
                hbMainContainer.setAttribute("class", "hb-main-container");
                hbImageContainer.setAttribute("class", "hb-image-container");
                hbLoader.setAttribute("id", "hb-loader");
                hbImageElement.setAttribute("id", "hb-image");
                hbImageElement.setAttribute("src", imageLink);
                hbCloseIconContainer.setAttribute("class", "hb-close-icon-container");
                hbCloseIconElement.setAttribute("id", "hb-close");
                hbLeftIconContainer.setAttribute("class", "hb-left-icon-container");
                hbLeftIconElement.setAttribute("id", "hb-left");
                hbRightIconContainer.setAttribute("class", "hb-right-icon-container");
                hbRightIconElement.setAttribute("id", "hb-right");

                // appending elements for parent child structure from top(children) to bottom(parents)
                hbRightIconContainer.appendChild(hbRightIconElement);
                hbRightIconElement.innerHTML = hbRightIconSvg;
                hbLeftIconContainer.appendChild(hbLeftIconElement);
                hbLeftIconElement.innerHTML = hbLeftIconSvg;
                hbCloseIconContainer.appendChild(hbCloseIconElement);
                hbCloseIconElement.innerHTML = hbCloseIconSvg;
                hbImageContainer.appendChild(hbLoader);
                hbImageContainer.appendChild(hbImageElement);
                hbMainContainer.appendChild(hbImageContainer);
                hbMainContainer.appendChild(hbCloseIconContainer);
                hbMainContainer.appendChild(hbLeftIconContainer);
                hbMainContainer.appendChild(hbRightIconContainer);
                hbWrapper.appendChild(hbMainContainer);

                // appending complete structure to body
                body.appendChild(hbWrapper);

                // adding class for preventing scroll when popup is open
                body.classList.add("hb-noscroll");

                // control variables
                hbImage = document.getElementById("hb-image");
                hbClose = document.getElementById("hb-close");
                hbLeft = document.getElementById("hb-left");
                hbRight = document.getElementById("hb-right");

                // control functions
                // function for jumping to next image
                function next(ev) {
                    if (i > (images.length - 2)) {
                        i = -1;
                    }
                    i += 1;
                    imageLink = images[i].getAttribute("href");
                    hbImage.setAttribute("src", imageLink);
                }

                // function for jumping to previous image
                function previous(ev) {
                    if (i === 0) {
                        i = (images.length);
                    }
                    i -= 1;
                    imageLink = images[i].getAttribute("href");
                    hbImage.setAttribute("src", imageLink);
                }

                // function for closing popup by clicking on close icon
                function iconClickClose(ev) {
                    body.removeChild(hbWrapper);
                    body.classList.remove("hb-noscroll");
                }

                // function for closing popup by clicking on empty space
                function bgClickClose(ev) {
                    ev.stopPropagation();
                    ev.preventDefault();
                    if (ev.target === hbImageContainer || ev.target === hbMainContainer) {
                        body.removeChild(hbWrapper);
                        body.classList.remove("hb-noscroll");
                    }
                }

                // function for keyboard support
                function keyboardSupport(key) {
                    key.preventDefault();
                    if (key.which === 37) {
                        previous();
                    } else if (key.which === 39) {
                        next();
                    } else if (key.which === 27) {
                        iconClickClose();
                    }
                }

                // control function calling
                // jump to next image
                hbRight.onclick = next;

                // jump to previous image
                hbLeft.onclick = previous;

                // close by clicking on close icon
                hbClose.onclick = iconClickClose;

                // close by clicking on empty space 
                hbMainContainer.onclick = bgClickClose;

                // close by clicking on empty space 
                hbImageContainer.onclick = bgClickClose;

                // control by using arrow keys and close by using escape key
                document.onkeyup = keyboardSupport;
            };
        };

    // for loop to capture click events on gallery images
    for (ir = 0; ir < imagesQty; ir += 1) {
        // onclick to trigger plugin by using galleryImageClick as a self invoking function to preserve loop's value
        images[ir].onclick = (galleryImageClick)(ir);
    }
}

// function for single images
function halkaBoxSingles() {
    "use strict";
    // main variables
    var body = document.getElementsByTagName("body")[0],
        singleImages = document.querySelectorAll("a[data-hb-single]"),
        ie,
        singleImagesQty = singleImages.length,
        imageLink,
        // function to trigger the plugin when a single image is clicked
        singleImageClick = function singleImageClickF(e) {
            e.preventDefault();

            // getting the value of href attribute of the clicked link
            imageLink = this.getAttribute("href");

            // creating and appending elements for lightbox popup templating
            var hbWrapper = document.createElement("div"),
                hbMainContainer = document.createElement("div"),
                hbImageContainer = document.createElement("div"),
                hbLoader = document.createElement("div"),
                hbImageElement = document.createElement("img"),
                hbCloseIconContainer = document.createElement("div"),
                hbCloseIconElement = document.createElement("a"),
                hbImage,
                hbClose,
                hbCloseIconSvg = "<svg version=\"1.1\" id=\"Capa_1\" xmlns=\"http://www.w3.org/2000/svg\"xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\"y=\"0px\" viewBox=\"0 0 357 357\" enable-background=\"new 0 0 357 357\" xml:space=\"preserve\"><g><g id=\"close\"><polygon points=\"357,35.7 321.3,0 178.5,142.8 35.7,0 0,35.7 142.8,178.5 0,321.3 35.7,357 178.5,214.2 321.3,357 357,321.3 214.2,178.5\"/></g></g></svg>";

            // setting attributes to created elements
            hbWrapper.setAttribute("class", "hb-wrapper");
            hbMainContainer.setAttribute("class", "hb-main-container");
            hbImageContainer.setAttribute("class", "hb-image-container");
            hbLoader.setAttribute("id", "hb-loader");
            hbImageElement.setAttribute("id", "hb-image");
            hbImageElement.setAttribute("src", imageLink);
            hbCloseIconContainer.setAttribute("class", "hb-close-icon-container");
            hbCloseIconElement.setAttribute("id", "hb-close");

            // appending elements for parent child structure from top(children) to bottom(parents)
            hbCloseIconContainer.appendChild(hbCloseIconElement);
            hbCloseIconElement.innerHTML = hbCloseIconSvg;
            hbImageContainer.appendChild(hbLoader);
            hbImageContainer.appendChild(hbImageElement);
            hbMainContainer.appendChild(hbImageContainer);
            hbMainContainer.appendChild(hbCloseIconContainer);
            hbWrapper.appendChild(hbMainContainer);

            // appending complete structure to body
            body.appendChild(hbWrapper);

            // adding class for preventing scroll when popup is open
            body.classList.add("hb-noscroll");

            // control variables
            hbImage = document.getElementById("hb-image");
            hbClose = document.getElementById("hb-close");

            // function for closing popup by clicking on close icon
            function iconClickClose(ev) {
                body.removeChild(hbWrapper);
                body.classList.remove("hb-noscroll");
            }

            // function for closing popup by clicking on empty space
            function bgClickClose(ev) {
                ev.stopPropagation();
                ev.preventDefault();
                if (ev.target === hbImageContainer || ev.target === hbMainContainer) {
                    body.removeChild(hbWrapper);
                    body.classList.remove("hb-noscroll");
                }
            }

            // function for keyboard support
            function keyboardSupport(key) {
                key.preventDefault();
                if (key.which === 27) {
                    iconClickClose();
                }
            }

            // close by clicking on close icon
            hbClose.onclick = iconClickClose;

            // close by clicking on empty space 
            hbMainContainer.onclick = bgClickClose;

            // close by clicking on empty space 
            hbImageContainer.onclick = bgClickClose;

            // control by using arrow keys and close by using escape key
            document.onkeyup = keyboardSupport;
        };

    // for loop to capture click events on single images
    for (ie = 0; ie < singleImagesQty; ie += 1) {
        // onclick to trigger plugin by using singleImageClick function
        singleImages[ie].onclick = singleImageClick;
    }
}

// object for running both functions as methods
var halkaBox = {
    gallery: halkaBoxGallery,
    singles: halkaBoxSingles
};