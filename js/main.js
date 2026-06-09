// FAQ髢矩哩 //
const faqQuestions = document.querySelectorAll(".faq__question");

faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
        const item = question.closest(".faq__item");

        item.classList.toggle("is-open");
    });
});


const openModal = document.querySelectorAll(".open__modal");
const modals = document.querySelectorAll(".modal");
const modalClose = document.querySelectorAll(".modal__close");

openModal.forEach((card) => {
    card.addEventListener("click", () => {
        const modalId = card.dataset.modal;
        const modal = document.getElementById(modalId);

        modal.classList.add("is-active");
        document.body.classList.add("is-modal-open");
    });
});

modalClose.forEach((body) => {
    body.addEventListener("click", () => {
        const modal = body.closest(".modal");

        modal.classList.remove("is-active");
        document.body.classList.remove("is-modal-open");
    });
});

// float__inquiry縺ｮ髢矩哩 //
const closing = document.querySelector(".closing");
const floatInquiry = document.querySelector(".float__inquiry");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                floatInquiry.classList.add("is-hidden");
            } else {
                floatInquiry.classList.remove("is-hidden");
            }
        });
    },
    {
        threshold: 0.1
    }
);

observer.observe(closing);