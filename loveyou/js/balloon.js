<!--气球漂浮-->

(function() {
    'use strict';
    var __assign = function() {
        __assign = Object.assign ||
        function __assign(t) {
            for (var s, i = 1,
            n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    typeof SuppressedError === "function" ? SuppressedError: function(error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError",
        e.error = error,
        e.suppressed = suppressed,
        e;
    };
    var defaultBalloonColor = "#84A332";
    var defaultLightColor = "#C0F381";
    var balloonColorProperty = "--balloon-color";
    var lightColorProperty = "--light-color";
    var widthProperty = "--balloon-width";
    var heightProperty = "--balloon-height";
    var balloonDefaultSize = {
        width: 233,
        height: 609,
    };
    var createBallonElement = function(_a) {
        var balloonColor = _a.balloonColor,
        lightColor = _a.lightColor,
        width = _a.width;
        var balloon = document.createElement("balloon");
        balloon.innerHTML = balloonSvgHTML;
        Object.assign(balloon.style, {
            position: "absolute",
            overflow: "hidden",
            top: "0",
            left: "0",
            display: "inline-block",
            isolation: "isolate",
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            opacity: "0.001",
            transform: "translate(calc(-100% + 1px), calc(-100% + 1px))",
            contain: "style, layout, paint",
            transformOrigin: "".concat(width / 2, "px ").concat(width / 2, "px"),
            willChange: "transform",
        });
        balloon.style.setProperty(balloonColorProperty, balloonColor);
        balloon.style.setProperty(lightColorProperty, lightColor);
        balloon.style.setProperty(widthProperty, width + "px");
        balloon.style.setProperty(heightProperty, (width * 609) / 223 + "px");
        return balloon;
    };
    var balloonSvgHTML = "\n<svg\n\nstyle=\"width: var(".concat(widthProperty, "); height: var(").concat(heightProperty, ");\"\nviewBox=\"0 0 223 609\"\nfill=\"none\"\nxmlns=\"http://www.w3.org/2000/svg\"\n>\n<g opacity=\"0.8\" filter=\"url(#filter0_f_102_49)\" >\n  <path\n    d=\"M117.5 253C136.167 294.5 134.7 395 125.5 453C116.3 511 133.833 578.167 125.5 606\"\n    stroke=\"url(#paint0_linear_102_49)\"\n    stroke-width=\"2\"\n  />\n</g>\n<g opacity=\"0.85\" filter=\"url(#filter1_ii_102_49)\">\n  <path\n    fill-rule=\"evenodd\"\n    clip-rule=\"evenodd\"\n    d=\"M176.876 204.032C181.934 198.064 209.694 160.262 210.899 127.619C213.023 70.1236 176.876 13 118.337 13C55.7949 13 18.5828 69.332 22.2724 127.619C24.0956 156.423 38.9766 178.5 51.7922 195.372C57.7811 203.257 90.0671 238.749 112.15 245.044C111.698 248.246 112.044 253.284 116.338 254H121.838V245.71C143.277 242.292 172.085 209.686 176.876 204.032Z\"\n    fill=\"var(").concat(balloonColorProperty, ", ").concat(defaultBalloonColor, ")\"\n  />\n</g>\n<g filter=\"url(#filter2_f_102_49)\">\n  <path\n    d=\"M125 256.5C125 258.433 122.09 260 118.5 260C114.91 260 112 258.433 112 256.5C112 254.567 114.91 255 118.5 255C122.09 255 125 254.567 125 256.5Z\"\n    fill=\"var(").concat(balloonColorProperty, ", ").concat(defaultBalloonColor, ")\"\n  />\n</g>\n<g opacity=\"0.2\" filter=\"url(#filter3_f_102_49)\">\n  <path\n    d=\"M178.928 128.12C178.011 152.146 172.137 162.97 154.623 184.2C141.594 199.992 128.28 215 112.805 215C104.349 215 92.739 215 65.2673 177.844C56.1123 165.461 45.4818 149.259 44.1794 128.12C41.5436 85.3424 68.1267 44 112.805 44C154.623 44 180.55 85.6242 178.928 128.12Z\"\n    fill=\"url(#paint1_radial_102_49)\"\n  />\n</g>\n<g\n  style=\"mix-blend-mode: lighten\"\n  opacity=\"0.7\"\n  filter=\"url(#filter4_df_102_49)\"\n>\n  <path\n    d=\"M72.7992 108.638L74.0985 87.5247C74.3145 84.0152 77.4883 81.4427 80.9664 81.958L94.8619 84.0166C98.4018 84.541 100.699 88.0277 99.7828 91.4871L94.0502 113.144C93.1964 116.369 89.8758 118.278 86.659 117.394L77.1969 114.792C74.4599 114.039 72.6249 111.471 72.7992 108.638Z\"\n    fill=\"var(").concat(lightColorProperty, ", ").concat(defaultLightColor, ")\"\n  />\n</g>\n<g\n  style=\"mix-blend-mode: lighten\"\n  opacity=\"0.5\"\n  filter=\"url(#filter5_f_102_49)\"\n>\n  <path\n    d=\"M147.76 88.7366L144.842 67.9855C144.378 64.687 141.316 62.3976 138.021 62.8858L123.638 65.0166C120.098 65.541 117.801 69.0277 118.717 72.4871L124.462 94.1891C125.311 97.3967 128.602 99.3061 131.808 98.4512L143.364 95.3695C146.296 94.5878 148.182 91.7409 147.76 88.7366Z\"\n    fill=\"var(").concat(lightColorProperty, ", ").concat(defaultLightColor, ")\"\n  />\n</g>\n<g style=\"mix-blend-mode: lighten\" filter=\"url(#filter6_f_102_49)\">\n  <path\n    d=\"M46.4087 131.164C38.1642 111.726 43.2454 91.2599 47.4381 82.0988C47.7504 81.4164 48.5574 80.8601 48.8712 81.5418C48.9711 81.7589 48.9188 82.1169 48.8357 82.3409C41.2341 102.832 45.5154 122.958 47.3397 130.925C47.8434 133.124 47.2898 133.242 46.4087 131.164Z\"\n    fill=\"var(").concat(lightColorProperty, ", ").concat(defaultLightColor, ")\"\n  />\n</g>\n<g style=\"mix-blend-mode: lighten\" filter=\"url(#filter7_f_102_49)\">\n  <path\n    d=\"M46.4087 131.164C38.1642 111.726 43.2454 91.2599 47.4381 82.0988C47.7504 81.4164 48.5574 80.8601 48.8712 81.5418C48.9711 81.7589 48.9188 82.1169 48.8357 82.3409C41.2341 102.832 45.5154 122.958 47.3397 130.925C47.8434 133.124 47.2898 133.242 46.4087 131.164Z\"\n    fill=\"var(").concat(lightColorProperty, ", ").concat(defaultLightColor, ")\"\n  />\n</g>\n<g opacity=\"0.3\">\n  <g style=\"mix-blend-mode: lighten\" filter=\"url(#filter8_f_102_49)\">\n    <path\n      d=\"M190.817 150.078C196.906 136.754 196.503 119.258 195.396 111.05C195.318 110.475 194.888 109.925 194.734 110.403C194.704 110.495 194.689 110.697 194.699 110.807C196.396 129.344 191.942 144.593 190.447 149.824C190.122 150.959 190.349 151.104 190.817 150.078Z\"\n      fill=\"var(").concat(lightColorProperty, ", ").concat(defaultLightColor, ")\"\n    />\n  </g>\n  <g style=\"mix-blend-mode: lighten\" filter=\"url(#filter9_f_102_49)\">\n    <path\n      d=\"M190.817 150.078C196.906 136.754 196.503 119.258 195.396 111.05C195.318 110.475 194.888 109.925 194.734 110.403C194.704 110.495 194.689 110.697 194.699 110.807C196.396 129.344 191.942 144.593 190.447 149.824C190.122 150.959 190.349 151.104 190.817 150.078Z\"\n      fill=\"var(").concat(lightColorProperty, ", ").concat(defaultLightColor, ")\"\n    />\n  </g>\n</g>\n</svg>\n");
    var svgFiltersHtml = "\n<svg>\n  <defs>\n    <filter\n      id=\"filter0_f_102_49\"\n      x=\"114.588\"\n      y=\"250.59\"\n      width=\"20.5082\"\n      height=\"357.697\"\n      filterUnits=\"userSpaceOnUse\"\n      color-interpolation-filters=\"sRGB\"\n    >\n      <feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\" />\n      <feBlend\n        mode=\"normal\"\n        in=\"SourceGraphic\"\n        in2=\"BackgroundImageFix\"\n        result=\"shape\"\n      />\n      <feGaussianBlur\n        stdDeviation=\"1\"\n        result=\"effect1_foregroundBlur_102_49\"\n      />\n    </filter>\n    <filter\n      id=\"filter1_ii_102_49\"\n      x=\"22.0213\"\n      y=\"13\"\n      width=\"188.967\"\n      height=\"241\"\n      filterUnits=\"userSpaceOnUse\"\n      color-interpolation-filters=\"sRGB\"\n    >\n      <feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\" />\n      <feBlend\n        mode=\"normal\"\n        in=\"SourceGraphic\"\n        in2=\"BackgroundImageFix\"\n        result=\"shape\"\n      />\n      <feColorMatrix\n        in=\"SourceAlpha\"\n        type=\"matrix\"\n        values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0\"\n        result=\"hardAlpha\"\n      />\n      <feOffset />\n      <feGaussianBlur stdDeviation=\"4.5\" />\n      <feComposite in2=\"hardAlpha\" operator=\"arithmetic\" k2=\"-1\" k3=\"1\" />\n      <feColorMatrix\n        type=\"matrix\"\n        values=\"0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0\"\n      />\n      <feBlend\n        mode=\"normal\"\n        in2=\"shape\"\n        result=\"effect1_innerShadow_102_49\"\n      />\n      <feColorMatrix\n        in=\"SourceAlpha\"\n        type=\"matrix\"\n        values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0\"\n        result=\"hardAlpha\"\n      />\n      <feOffset />\n      <feGaussianBlur stdDeviation=\"18\" />\n      <feComposite in2=\"hardAlpha\" operator=\"arithmetic\" k2=\"-1\" k3=\"1\" />\n      <feColorMatrix\n        type=\"matrix\"\n        values=\"0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0\"\n      />\n      <feBlend\n        mode=\"overlay\"\n        in2=\"effect1_innerShadow_102_49\"\n        result=\"effect2_innerShadow_102_49\"\n      />\n    </filter>\n    <filter\n      id=\"filter2_f_102_49\"\n      x=\"111\"\n      y=\"253.959\"\n      width=\"15\"\n      height=\"7.04138\"\n      filterUnits=\"userSpaceOnUse\"\n      color-interpolation-filters=\"sRGB\"\n    >\n      <feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\" />\n      <feBlend\n        mode=\"normal\"\n        in=\"SourceGraphic\"\n        in2=\"BackgroundImageFix\"\n        result=\"shape\"\n      />\n      <feGaussianBlur\n        stdDeviation=\"0.5\"\n        result=\"effect1_foregroundBlur_102_49\"\n      />\n    </filter>\n    <filter\n      id=\"filter3_f_102_49\"\n      x=\"0\"\n      y=\"0\"\n      width=\"223\"\n      height=\"259\"\n      filterUnits=\"userSpaceOnUse\"\n      color-interpolation-filters=\"sRGB\"\n    >\n      <feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\" />\n      <feBlend\n        mode=\"normal\"\n        in=\"SourceGraphic\"\n        in2=\"BackgroundImageFix\"\n        result=\"shape\"\n      />\n      <feGaussianBlur\n        stdDeviation=\"22\"\n        result=\"effect1_foregroundBlur_102_49\"\n      />\n    </filter>\n    <filter\n      id=\"filter4_df_102_49\"\n      x=\"46.7878\"\n      y=\"59.8922\"\n      width=\"79.1969\"\n      height=\"87.7179\"\n      filterUnits=\"userSpaceOnUse\"\n      color-interpolation-filters=\"sRGB\"\n    >\n      <feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\" />\n      <feColorMatrix\n        in=\"SourceAlpha\"\n        type=\"matrix\"\n        values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0\"\n        result=\"hardAlpha\"\n      />\n      <feOffset dy=\"4\" />\n      <feGaussianBlur stdDeviation=\"13\" />\n      <feComposite in2=\"hardAlpha\" operator=\"out\" />\n      <feColorMatrix\n        type=\"matrix\"\n        values=\"0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0\"\n      />\n      <feBlend\n        mode=\"overlay\"\n        in2=\"BackgroundImageFix\"\n        result=\"effect1_dropShadow_102_49\"\n      />\n      <feBlend\n        mode=\"normal\"\n        in=\"SourceGraphic\"\n        in2=\"effect1_dropShadow_102_49\"\n        result=\"shape\"\n      />\n      <feGaussianBlur\n        stdDeviation=\"5.5\"\n        result=\"effect2_foregroundBlur_102_49\"\n      />\n    </filter>\n    <filter\n      id=\"filter5_f_102_49\"\n      x=\"102.515\"\n      y=\"46.8202\"\n      width=\"61.3035\"\n      height=\"67.8351\"\n      filterUnits=\"userSpaceOnUse\"\n      color-interpolation-filters=\"sRGB\"\n    >\n      <feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\" />\n      <feBlend\n        mode=\"normal\"\n        in=\"SourceGraphic\"\n        in2=\"BackgroundImageFix\"\n        result=\"shape\"\n      />\n      <feGaussianBlur\n        stdDeviation=\"8\"\n        result=\"effect1_foregroundBlur_102_49\"\n      />\n    </filter>\n    <filter\n      id=\"filter6_f_102_49\"\n      x=\"34\"\n      y=\"73.2313\"\n      width=\"22.9258\"\n      height=\"67.4198\"\n      filterUnits=\"userSpaceOnUse\"\n      color-interpolation-filters=\"sRGB\"\n    >\n      <feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\" />\n      <feBlend\n        mode=\"normal\"\n        in=\"SourceGraphic\"\n        in2=\"BackgroundImageFix\"\n        result=\"shape\"\n      />\n      <feGaussianBlur\n        stdDeviation=\"4\"\n        result=\"effect1_foregroundBlur_102_49\"\n      />\n    </filter>\n    <filter\n      id=\"filter7_f_102_49\"\n      x=\"40\"\n      y=\"79.2313\"\n      width=\"10.9258\"\n      height=\"55.4198\"\n      filterUnits=\"userSpaceOnUse\"\n      color-interpolation-filters=\"sRGB\"\n    >\n      <feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\" />\n      <feBlend\n        mode=\"normal\"\n        in=\"SourceGraphic\"\n        in2=\"BackgroundImageFix\"\n        result=\"shape\"\n      />\n      <feGaussianBlur\n        stdDeviation=\"1\"\n        result=\"effect1_foregroundBlur_102_49\"\n      />\n    </filter>\n    <filter\n      id=\"filter8_f_102_49\"\n      x=\"186.419\"\n      y=\"106.345\"\n      width=\"13.5106\"\n      height=\"48.2987\"\n      filterUnits=\"userSpaceOnUse\"\n      color-interpolation-filters=\"sRGB\"\n    >\n      <feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\" />\n      <feBlend\n        mode=\"normal\"\n        in=\"SourceGraphic\"\n        in2=\"BackgroundImageFix\"\n        result=\"shape\"\n      />\n      <feGaussianBlur\n        stdDeviation=\"1.93775\"\n        result=\"effect1_foregroundBlur_102_49\"\n      />\n    </filter>\n    <filter\n      id=\"filter9_f_102_49\"\n      x=\"189.326\"\n      y=\"109.252\"\n      width=\"7.69731\"\n      height=\"42.4855\"\n      filterUnits=\"userSpaceOnUse\"\n      color-interpolation-filters=\"sRGB\"\n    >\n      <feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\" />\n      <feBlend\n        mode=\"normal\"\n        in=\"SourceGraphic\"\n        in2=\"BackgroundImageFix\"\n        result=\"shape\"\n      />\n      <feGaussianBlur\n        stdDeviation=\"0.484439\"\n        result=\"effect1_foregroundBlur_102_49\"\n      />\n    </filter>\n    <linearGradient\n      id=\"paint0_linear_102_49\"\n      x1=\"124.798\"\n      y1=\"253\"\n      x2=\"124.798\"\n      y2=\"606\"\n      gradientUnits=\"userSpaceOnUse\"\n    >\n      <stop stop-color=\"white\" />\n      <stop offset=\"0.474934\" stop-color=\"grey\" stop-opacity=\"0.1\" />\n      <stop offset=\"0.722707\" stop-color=\"white\" stop-opacity=\"0.6\" />\n      <stop offset=\"0.93469\" stop-color=\"grey\" stop-opacity=\"0.7\" />\n      <stop offset=\"1\" stop-color=\"white\" stop-opacity=\"0\" />\n    </linearGradient>\n    <radialGradient\n      id=\"paint1_radial_102_49\"\n      cx=\"0\"\n      cy=\"0\"\n      r=\"1\"\n      gradientUnits=\"userSpaceOnUse\"\n      gradientTransform=\"translate(134 149.5) rotate(-123.69) scale(82.9277 65.4692)\"\n    >\n      <stop />\n      <stop offset=\"1\" stop-opacity=\"0\" />\n    </radialGradient>\n  </defs>\n</svg>\n";
    var easings = ["cubic-bezier(0.22, 1, 0.36, 1)", "cubic-bezier(0.33, 1, 0.68, 1)", ];
    var colorPairs = [["#ffec37ee", "#f8b13dff"], ["#f89640ee", "#c03940ff"], ["#3bc0f0ee", "#0075bcff"], ["#b0cb47ee", "#3d954bff"], ["#cf85b8ee", "#a3509dff"], ];
    function createBalloonAnimation(_a) {
        var balloon = _a.balloon,
        x = _a.x,
        y = _a.y,
        z = _a.z,
        targetX = _a.targetX,
        targetY = _a.targetY,
        targetZ = _a.targetZ,
        zIndex = _a.zIndex;
        balloon.style.zIndex = zIndex.toString();
        balloon.style.filter = "blur(".concat(zIndex > 7 ? 8 : 0, "px)");
        var getAnimation = function() {
            var tiltAngle = Math.random() * (15 - 8) + 8;
            var tiltDirection = Math.random() < 0.5 ? 1 : -1;
            return balloon.animate([{
                transform: "translate(-50%, 0%) translate3d(".concat(x, "px, ").concat(y, "px, ").concat(z, "px) rotate3d(0, 0, 1, ").concat(tiltDirection * -tiltAngle, "deg)"),
                opacity: 1,
            },
            {
                transform: "translate(-50%, 0%) translate3d(".concat(x + (targetX - x) / 2, "px, ").concat(y + (y + targetY * 5 - y) / 2, "px, ").concat(z + (targetZ - z) / 2, "px) rotate3d(0, 0, 1, ").concat(tiltDirection * tiltAngle, "deg)"),
                opacity: 1,
                offset: 0.5,
            },
            {
                transform: "translate(-50%, 0%) translate3d(".concat(targetX, "px, ").concat(y + targetY * 5, "px, ").concat(targetZ, "px) rotate3d(0, 0, 1, ").concat(tiltDirection * -tiltAngle, "deg)"),
                opacity: 1,
            },
            ], {
                duration: (Math.random() * 1000 + 5000) * 5,
                easing: easings[Math.floor(Math.random() * easings.length)],
                delay: zIndex * 200,
            });
        };
        return {
            balloon: balloon,
            getAnimation: getAnimation
        };
    }
    function balloons() {
        return new Promise(function(resolve) {
            var balloonsContainer = document.createElement("balloons");
            Object.assign(balloonsContainer.style, {
                overflow: "hidden",
                position: "fixed",
                inset: "0",
                zIndex: "999",
                display: "inline-block",
                pointerEvents: "none",
                perspective: "1500px",
                perspectiveOrigin: "50vw 100vh",
                contain: "style, layout, paint",
            });
            document.documentElement.appendChild(balloonsContainer);
            var sceneSize = {
                width: window.innerWidth,
                height: window.innerHeight
            };
            var balloonHeight = Math.floor(Math.min(sceneSize.width, sceneSize.height) * 1);
            var balloonWidth = (balloonDefaultSize.width / balloonDefaultSize.height) * balloonHeight;
            var amount = Math.max(7, Math.round(window.innerWidth / (balloonWidth / 2)));
            var maxDist = Math.max((amount * balloonWidth) / 2, (balloonWidth / 2) * 10);
            var balloonPositions = [];
            for (var i = 0; i < amount; i++) {
                var x = Math.round(sceneSize.width * Math.random());
                var y = window.innerHeight;
                var z = Math.round( - 1 * (Math.random() * maxDist));
                var targetX = Math.round(x + Math.random() * balloonWidth * 6 * (Math.random() > 0.5 ? 1 : -1));
                var targetY = -window.innerHeight;
                var targetZ = z;
                balloonPositions.push({
                    x: x,
                    y: y,
                    z: z,
                    targetX: targetX,
                    targetY: targetY,
                    targetZ: targetZ,
                });
            }
            balloonPositions = balloonPositions.sort(function(a, b) {
                return a.z - b.z;
            });
            var closestBallonPosition = balloonPositions[balloonPositions.length - 1];
            balloonPositions[0];
            balloonPositions = balloonPositions.map(function(pos) {
                return (__assign(__assign({},
                pos), {
                    z: pos.z - closestBallonPosition.z,
                    targetZ: pos.z - closestBallonPosition.z
                }));
            });
            var filtersElement = document.createElement("div");
            filtersElement.innerHTML = svgFiltersHtml;
            balloonsContainer.appendChild(filtersElement);
            var currentZIndex = 1;
            var animations = balloonPositions.map(function(pos, index) {
                var colorPair = colorPairs[index % colorPairs.length];
                var balloon = createBallonElement({
                    balloonColor: colorPair[1],
                    lightColor: colorPair[0],
                    width: balloonWidth,
                });
                balloonsContainer.appendChild(balloon);
                return createBalloonAnimation(__assign(__assign({
                    balloon: balloon
                },
                pos), {
                    zIndex: currentZIndex++
                }));
            });
            requestAnimationFrame(function() {
                var animationPromises = animations.map(function(_a) {
                    var balloon = _a.balloon,
                    getAnimation = _a.getAnimation;
                    var a = getAnimation();
                    return a.finished.then(function() {
                        balloon.remove();
                    });
                });
                Promise.all(animationPromises).then(function() {
                    balloonsContainer.remove();
                    resolve();
                });
            });
        });
    }
    document.addEventListener("DOMContentLoaded",
    function() {
        balloons();
        var button = document.getElementById("releastBalloonsButton");
        button === null || button === void 0 ? void 0 : button.addEventListener("click",
        function() {
            balloons();
        });
    });
})();
