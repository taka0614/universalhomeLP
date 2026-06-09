const elements = document.querySelectorAll('.js_countUp');
const observers = [];

elements.forEach((element) => {
    // 蜷�ｦ∫ｴ�縺ｮ迥ｶ諷九ｒ邂｡逅�☆繧九◆繧√�繧ｪ繝悶ず繧ｧ繧ｯ繝�
    const state = {
        hasStarted: false, // 繧ｫ繧ｦ繝ｳ繝医い繝��縺御ｸ蠎ｦ髢句ｧ九＆繧後◆縺�
        animationFrameId: null // requestAnimationFrame 縺ｮID繧剃ｿ晄戟
    };

    const observer = new IntersectionObserver(function (entries, currentObserver) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 隕∫ｴ�縺檎判髱｢蜀�↓蜈･縺｣縺溷�ｴ蜷�
                if (!state.hasStarted) { // 縺ｾ縺�髢句ｧ九＆繧後※縺�↑縺代ｌ縺ｰ
                    state.hasStarted = true;
                    const start = parseInt(element.dataset.from);
                    const end = parseInt(element.dataset.to);
                    const duration = parseInt(element.dataset.duration); // 繝溘Μ遘貞腰菴�

                    animateCount(element, start, end, duration);

                    // 繧｢繝九Γ繝ｼ繧ｷ繝ｧ繝ｳ髢句ｧ句ｾ後√％縺ｮ隕∫ｴ�縺ｮ逶｣隕悶ｒ蛛懈ｭ｢
                    currentObserver.unobserve(element);
                }
            }
        });
    }, { threshold: 0 }); // 髢ｾ蛟､0: 蟆代＠縺ｧ繧り｡ｨ遉ｺ縺輔ｌ縺溘ｉ

    observers.push(observer);
    observer.observe(element);
});

/**
 * 謨ｰ蛟､繧呈ｻ代ｉ縺九↓繧｢繝九Γ繝ｼ繧ｷ繝ｧ繝ｳ縺輔○繧矩未謨ｰ
 * @param {HTMLElement} element - 謨ｰ蛟､繧定｡ｨ遉ｺ縺吶ｋDOM隕∫ｴ�
 * @param {number} startValue - 髢句ｧ句､
 * @param {number} endValue - 邨ゆｺ�､
 * @param {number} duration - 繧｢繝九Γ繝ｼ繧ｷ繝ｧ繝ｳ縺ｮ邱乗凾髢難ｼ医Α繝ｪ遘抵ｼ�
 */
function animateCount(element, startValue, endValue, duration) {
    let startTime = null; // 繧｢繝九Γ繝ｼ繧ｷ繝ｧ繝ｳ髢句ｧ区凾縺ｮ繧ｿ繧､繝�繧ｹ繧ｿ繝ｳ繝�

    function animate(currentTime) {
        if (!startTime) {
            startTime = currentTime; // 繧｢繝九Γ繝ｼ繧ｷ繝ｧ繝ｳ髢句ｧ区凾縺ｮ繧ｿ繧､繝�繧ｹ繧ｿ繝ｳ繝励ｒ險倬鹸
        }

        // 邨碁℃譎る俣
        const elapsedTime = currentTime - startTime;

        // 騾ｲ陦悟ｺｦ (0縺九ｉ1縺ｮ遽�峇)
        const progress = Math.min(elapsedTime / duration, 1); // 1繧定ｶ�∴縺ｪ縺�ｈ縺�↓蛻ｶ髯�

        // 迴ｾ蝨ｨ縺ｮ繧ｫ繧ｦ繝ｳ繝亥､ (邱壼ｽ｢陬憺俣)
        const currentValue = Math.floor(startValue + (endValue - startValue) * progress);

        // 繝�く繧ｹ繝医ｒ譖ｴ譁ｰ
        element.textContent = currentValue.toLocaleString();

        // 繧｢繝九Γ繝ｼ繧ｷ繝ｧ繝ｳ縺悟ｮ御ｺ�＠縺ｦ縺�↑縺代ｌ縺ｰ縲∵ｬ｡縺ｮ繝輔Ξ繝ｼ繝�繧定ｦ∵ｱ�
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // 繧｢繝九Γ繝ｼ繧ｷ繝ｧ繝ｳ螳御ｺ�凾縺ｫ譛邨ょ､繧堤｢ｺ螳溘↓陦ｨ遉ｺ
            element.textContent = endValue.toLocaleString();
        }
    }

    // 繧｢繝九Γ繝ｼ繧ｷ繝ｧ繝ｳ繧帝幕蟋�
    requestAnimationFrame(animate);
}