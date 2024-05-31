(() => {
    "use strict";
    document.addEventListener("DOMContentLoaded", (function() {
        const dropArea = document.getElementById("drop-area");
        const loadingBar = document.getElementById("loading-bar");
        const fileUpload = document.getElementById("file-upload");
        const uploadButton = document.getElementById("upload-button");
        dropArea.querySelector(".trancrib-text");
        loadingBar.querySelector("span");
        function setState(newStateClass) {
            const stateClasses = [ "trancrib-default", "file-is-loading", "loading-is-complete", "decoding", "file-is-ready" ];
            dropArea.classList.remove(...stateClasses);
            dropArea.classList.add(newStateClass);
        }
        function setDefaultState() {
            setState("trancrib-default");
        }
        function setLoadingState() {
            setState("file-is-loading");
        }
        function setCompleteState(fileName) {
            setState("loading-is-complete");
        }
        function setDecodingState() {
            setState("decoding");
            setTimeout((() => {
                setState("file-is-ready");
                setTimeout((() => {
                    $.fancybox.open({
                        src: "#modal-oplata",
                        type: "inline"
                    });
                }), 1500);
            }), 2e3);
        }
        setDefaultState();
        fileUpload.addEventListener("change", (function() {
            setLoadingState();
            setTimeout((() => {
                loadingBar.classList.add("loading");
                setTimeout((() => {
                    loadingBar.classList.remove("loading");
                    loadingBar.classList.add("loaded");
                    setCompleteState(fileUpload.files[0].name);
                    setTimeout((() => {
                        setDecodingState();
                    }), 1500);
                }), 5e3);
            }), 1e3);
        }));
        uploadButton.addEventListener("click", (function() {
            fileUpload.click();
        }));
    }));
    const swiper = document.querySelector(".swiper");
    if (swiper) {
        function showMore() {
            const btnReadMore = document.querySelector(".plane__btn");
            const planeItems = document.querySelector(".plane__bottom-items");
            btnReadMore.addEventListener("click", (() => {
                planeItems.classList.toggle("active");
            }));
        }
        function showFairway1() {
            window.addEventListener("scroll", (() => {
                const fairwayBlock = document.querySelector(".fairway__row");
                const fairwayBlockBack = document.querySelector(".fairway__row-back");
                const animItemHeight = fairwayBlock.offsetHeight;
                const animItemOffset = offset(fairwayBlock).top;
                const animStart = 4;
                let animItemPoint = window.innerHeight - animItemHeight / animStart;
                if (scrollY > animItemOffset - animItemPoint && scrollY < animItemOffset + animItemHeight) fairwayBlockBack.style.animation = "fairway 2.2s forwards";
            }));
        }
        function mentors() {
            window.addEventListener("scroll", (() => {
                const mentorsBlock = document.querySelector(".mentors__line");
                const mentorsBg = document.querySelector(".mentors__line-bg-2");
                const animItemHeight = mentorsBlock.offsetHeight;
                const animItemOffset = offset(mentorsBlock).top;
                const animStart = 4;
                let animItemPoint = window.innerHeight - animItemHeight / animStart;
                if (scrollY > animItemOffset - animItemPoint && scrollY < animItemOffset + animItemHeight) mentorsBg.classList.add("active");
            }));
        }
        function choice() {
            window.addEventListener("scroll", (() => {
                const choiceBlock = document.querySelector(".choice__items");
                const block1 = document.querySelector(".ci-1");
                const block2 = document.querySelector(".ci-2");
                const block3 = document.querySelector(".ci-3");
                const animItemHeight = choiceBlock.offsetHeight;
                const animItemOffset = offset(choiceBlock).top;
                const animStart = 4;
                let animItemPoint = window.innerHeight - animItemHeight / animStart;
                if (scrollY > animItemOffset - animItemPoint && scrollY < animItemOffset + animItemHeight) {
                    block1.style.animation = "ci-1 0.5s forwards";
                    block2.style.animation = "ci-2 0.5s forwards";
                    block2.style.animationDelay = "0.5s";
                    block3.style.animation = "ci-3 0.5s forwards";
                    block3.style.animationDelay = "1s";
                }
            }));
        }
        function cutText() {
            let texts = document.querySelectorAll(".swiper-item__text");
            texts.forEach((text => {
                text.textContent.length > 709 ? text.textContent = text.textContent.slice(0, 709) + "..." : text.textContent = text.textContent;
            }));
        }
        function isMozilla() {
            const userAgent = navigator.userAgent.toLowerCase();
            const mozila = /firefox/.test(userAgent);
            const link = document.querySelector(".fairway__link");
            if (mozila) link.style.marginTop = "-7px";
        }
        function scrollUp2() {
            const scrollUp = document.querySelector(".scrollUp");
            window.addEventListener("scroll", (() => {
                if (scrollY > 499) scrollUp.classList.add("active"); else scrollUp.classList.remove("active");
            }));
            scrollUp.addEventListener("click", (() => {
                $("html, body").animate({
                    scrollTop: $("#top").offset().top
                }, "slow");
            }));
        }
        new Swiper(".swiper", {
            speed: 400,
            spaceBetween: 50,
            slidesPerView: 1,
            allowTouchMove: false,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            }
        });
        function scrollToMentor() {
            const mentorIgor = document.getElementById("mentors-igor");
            mentorIgor.addEventListener("click", (() => {
                localStorage.setItem("mentor", "igor");
            }));
        }
        function offset(el) {
            const rect = el.getBoundingClientRect(), scrollLeft = window.pageXOffset || document.documentElement.scrollLeft, scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return {
                top: rect.top + scrollTop,
                left: rect.left + scrollLeft
            };
        }
        showMore();
        showFairway1();
        mentors();
        choice();
        cutText();
        isMozilla();
        scrollUp2();
        scrollToMentor();
    }
    function formValidation() {
        const validation = new JustValidate(".modal-request__form");
        const inputMask = new Inputmask("+7 (999) 999-99-99");
        const telSelector = document.querySelector(".modal-request__phone");
        inputMask.mask(telSelector);
        validation.addField(".modal-request__name", [ {
            rule: "minLength",
            value: 2
        }, {
            rule: "maxLength",
            value: 50
        }, {
            rule: "required",
            value: true,
            errorMessage: "Введите имя"
        } ]).addField(".modal-request__phone", [ {
            rule: "required",
            value: true,
            errorMessage: "Введите телефон"
        } ]).onSuccess((event => {
            let formData = new FormData(event.target);
            let xhr = new XMLHttpRequest;
            console.log(...formData);
            xhr.onreadystatechange = function() {
                if (4 === xhr.readyState) if (200 === xhr.status) console.log("отправлено");
            };
            $.fancybox.close("fancybox-content");
            $.fancybox.open({
                src: "#modal-thanks",
                type: "inline"
            });
            xhr.open("POST", "mail.php", true);
            xhr.send(formData);
            event.target.reset();
        }));
    }
    function btnValidation() {
        const btn = document.querySelector(".modal-request__btn");
        const inputName = document.querySelector(".modal-request__name");
        const inputPhone = document.querySelector(".modal-request__phone");
        inputName.addEventListener("input", (e => {
            checkLength();
        }));
        inputPhone.addEventListener("input", (e => {
            checkLength();
        }));
        function checkLength() {
            if (inputName.value.length > 1 && inputPhone.value.length > 1) btn.classList.add("active"); else btn.classList.remove("active");
        }
    }
    function checkStorage() {
        const mentorsPage = document.querySelector(".body-mentors");
        const igor = localStorage.getItem("mentor");
        if (mentorsPage && igor) {
            $(document).ready((function() {
                $("html, body").animate({
                    scrollTop: $("#igor").offset().top - 160
                }, "slow");
            }));
            localStorage.clear();
        }
    }
    formValidation();
    btnValidation();
    checkStorage();
    function scrollUp2() {
        const scrollUp = document.querySelector(".scrollUp");
        window.addEventListener("scroll", (() => {
            if (scrollY > 499) scrollUp.classList.add("active"); else scrollUp.classList.remove("active");
        }));
        scrollUp.addEventListener("click", (() => {
            $("html, body").animate({
                scrollTop: $("#top").offset().top
            }, "slow");
        }));
    }
    scrollUp2();
    document.addEventListener("DOMContentLoaded", (function() {
        function formValidationOplata() {
            const validation = new JustValidate(".modal-oplata__form");
            validation.addField(".modal-oplata__name", [ {
                rule: "minLength",
                value: 2
            }, {
                rule: "maxLength",
                value: 50
            }, {
                rule: "required",
                value: true,
                errorMessage: "Введите имя"
            } ]).addField(".modal-oplata__email", [ {
                rule: "required",
                value: true,
                errorMessage: "Введите электронную почту"
            }, {
                rule: "email",
                value: true,
                errorMessage: "Введите действующий электронный адрес"
            } ]).onSuccess((event => {
                let formData = new FormData(event.target);
                let xhr = new XMLHttpRequest;
                xhr.onreadystatechange = function() {
                    if (4 === xhr.readyState && 200 === xhr.status) {
                        console.log("отправлено");
                        openModalPay(formData);
                    }
                };
                xhr.open("POST", "oplata.php", true);
                xhr.send(formData);
                event.target.reset();
            }));
        }
        function openModalPay(formData) {
            $.fancybox.close();
            const hiddenNameField = document.querySelector(".hidden-name");
            const hiddenEmailField = document.querySelector(".hidden-email");
            hiddenNameField.value = formData.get("Имя");
            hiddenEmailField.value = formData.get("email");
            $.fancybox.open({
                src: "#modal-pay",
                type: "inline"
            });
        }
        function formValidationPay() {
            const validation = new JustValidate(".modal-pay__form");
            validation.addField('input[name="payment_method"]', [ {
                rule: "required",
                value: true,
                errorMessage: "Выберите метод оплаты"
            } ]).onSuccess((event => {
                let formData = new FormData(event.target);
                let xhr = new XMLHttpRequest;
                xhr.onreadystatechange = function() {
                    if (4 === xhr.readyState && 200 === xhr.status) {
                        console.log("оплата отправлена");
                        $.fancybox.close();
                        $.fancybox.open({
                            src: "#file-sent",
                            type: "inline"
                        });
                    }
                };
                xhr.open("POST", "pay.php", true);
                xhr.send(formData);
                event.target.reset();
            }));
        }
        function btnValidationOplata() {
            const btn = document.querySelector(".modal-oplata__btn");
            const inputName = document.querySelector(".modal-oplata__name");
            const inputEmail = document.querySelector(".modal-oplata__email");
            inputName.addEventListener("input", checkLength);
            inputEmail.addEventListener("input", checkLength);
            function checkLength() {
                const shouldActivate = inputName.value.length > 1 && inputEmail.value.length > 1;
                btn.classList.toggle("active", shouldActivate);
            }
        }
        function btnValidationPay() {
            const btn = document.querySelector(".modal-pay__btn");
            const paymentMethods = document.querySelectorAll('input[name="payment_method"]');
            paymentMethods.forEach((method => {
                method.addEventListener("change", checkSelected);
            }));
            function checkSelected() {
                const selectedMethod = document.querySelector('input[name="payment_method"]:checked');
                btn.classList.toggle("active", !!selectedMethod);
            }
        }
        formValidationOplata();
        formValidationPay();
        btnValidationOplata();
        btnValidationPay();
    }));
    importScripts("https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js");
    const CACHE = "pwabuilder-page";
    const offlineFallbackPage = "offline.html";
    self.addEventListener("message", (event => {
        if (event.data && "SKIP_WAITING" === event.data.type) self.skipWaiting();
    }));
    self.addEventListener("install", (async event => {
        event.waitUntil(caches.open(CACHE).then((cache => cache.add(offlineFallbackPage))));
    }));
    if (workbox.navigationPreload.isSupported()) workbox.navigationPreload.enable();
    self.addEventListener("fetch", (event => {
        if ("navigate" === event.request.mode) event.respondWith((async () => {
            try {
                const preloadResp = await event.preloadResponse;
                if (preloadResp) return preloadResp;
                const networkResp = await fetch(event.request);
                return networkResp;
            } catch (error) {
                const cache = await caches.open(CACHE);
                const cachedResp = await cache.match(offlineFallbackPage);
                return cachedResp;
            }
        })());
    }));
})();