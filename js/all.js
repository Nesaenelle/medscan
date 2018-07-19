function desktopCarousel() {
    $('.carousel-container').carousel({
        num: 5,
        maxWidth: 350,
        maxHeight: 475,
        autoPlay: false,
        showTime: 5000,
        animationTime: 300,
        scale: 0.72,
        distance: 120
    });
}


function tabletCarousel() {
    $('.carousel-container').carousel({
        num: 3,
        maxWidth: 250,
        maxHeight: 375,
        autoPlay: false,
        showTime: 5000,
        animationTime: 300,
        scale: 0.72,
        distance: 120
    });
}

function mobileCarousel() {
    $('.carousel-container').carousel({
        num: 3,
        maxWidth: 160,
        maxHeight: 250,
        autoPlay: false,
        showTime: 5000,
        animationTime: 300,
        scale: 0.72,
        distance: 80
    });
}


function onResize() {
    if (window.innerWidth > 980) {
        desktopCarousel();
    } else if (window.innerWidth > 600) {
        tabletCarousel();
    } else if (window.innerWidth > 480) {
        mobileCarousel();
    } else {
        $('.carousel-container').carousel({
            num: 3,
            maxWidth: 130,
            maxHeight: 200,
            autoPlay: false,
            showTime: 5000,
            animationTime: 300,
            scale: 0.72,
            distance: 70
        });
    }
}

onResize();
window.addEventListener('resize', function() {
    onResize();
}, false);


(function() {
    var popupBtn = document.querySelectorAll('.js-popup');
    var modalOverlay = document.querySelector('#modal-overlay');
    var closeBtns = document.querySelectorAll('.js-close-modal');
    var activeModal;
    if (popupBtn.length) {
        popupBtn.forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                var id = e.target.getAttribute('data-modal');
                e.stopPropagation();
                openModal(id);
            });
        });
    }

    if (closeBtns.length) {
        closeBtns.forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                activeModal.classList.remove('opened');
                modalOverlay.classList.remove('opened');
            });
        });
    }

    window.addEventListener('click', function(e) {
        if (activeModal && !activeModal.contains(e.target)) {
            activeModal.classList.remove('opened');
            modalOverlay.classList.remove('opened')
        }
    }, false);


    document.querySelectorAll('form').forEach(function(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            $.ajax({
                method: 'post',
                url: 'send.php',
                data: {
                    'call-name': e.target['call-name'].value,
                    'call-phone': e.target['call-phone'].value.replace(/\s/g,'')
                },
                success: function(data) {
                    closeModal();
                    openModal(2);
                }
            })
        }, false);
    });

    function closeModal(e) {
        if (activeModal) {
            activeModal.classList.remove('opened');
            modalOverlay.classList.remove('opened');
        }
    }

    function openModal(id) {
        modalOverlay.classList.add('opened');
        activeModal = document.querySelector('.modal[data-modal="' + id + '"]');
        activeModal.classList.add('opened');
    }

    $('.phone-input').mask("+7  (  000  )  000  00  00", { placeholder: "+7  (  ___  )   ___   __   __" });
}());