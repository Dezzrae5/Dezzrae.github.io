 window.onload = function() {
            ghostCursor();

            function ghostCursor() {
                let canvas = document.getElementById('trailCanvas');
                let context = canvas.getContext('2d');
                let width = window.innerWidth;
                let height = window.innerHeight;
                let cursor = { x: width / 2, y: width / 2 };
                let particles = [];

                canvas.width = width;
                canvas.height = height;

                let baseImage = new Image();
                baseImage.src = "https://github.com/Dezzrae5/Dezzrae.github.io/blob/main/image/Mouse.png?raw=true";

                function init() {
                    bindEvents();
                    loop();
                }

                function bindEvents() {
                    document.addEventListener("mousemove", onMouseMove);
                    document.addEventListener("touchmove", onTouchMove, { passive: true });
                    document.addEventListener("touchstart", onTouchMove, { passive: true });
                    window.addEventListener("resize", onWindowResize);
                }

                function onWindowResize(e) {
                    width = window.innerWidth;
                    height = window.innerHeight;
                    canvas.width = width;
                    canvas.height = height;
                }

                function onTouchMove(e) {
                    if (e.touches.length > 0) {
                        for (let i = 0; i < e.touches.length; i++) {
                            addParticle(e.touches[i].clientX, e.touches[i].clientY, baseImage);
                        }
                    }
                }

                function onMouseMove(e) {
                    cursor.x = e.clientX;
                    cursor.y = e.clientY;
                    addParticle(cursor.x, cursor.y, baseImage);
                }

                function addParticle(x, y, image) {
                    particles.push(new Particle(x, y, image));
                }

                function updateParticles() {
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    for (let i = 0; i < particles.length; i++) {
                        particles[i].update(context);
                    }
                    for (let i = particles.length - 1; i >= 0; i--) {
                        if (particles[i].lifeSpan < 0) {
                            particles.splice(i, 1);
                        }
                    }
                }

                function loop() {
                    updateParticles();
                    requestAnimationFrame(loop);
                }

                function Particle(x, y, image) {
                    this.initialLifeSpan = 40;
                    this.lifeSpan = this.initialLifeSpan;
                    this.position = { x: x, y: y };
                    this.image = image;

                    this.update = function (context) {
                        this.lifeSpan--;
                        const opacity = Math.max(this.lifeSpan / this.initialLifeSpan, 0);
                        context.globalAlpha = opacity;
                        context.drawImage(this.image, this.position.x, this.position.y);
                    };
                }

                init();
            }
        }