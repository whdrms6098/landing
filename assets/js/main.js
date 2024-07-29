

const lenis = new Lenis();

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 800);
});

gsap.ticker.lagSmoothing(0);

const introTitleText = new SplitType(".intro .intro__header span", {
  types: "words",
});

const introText = new SplitType(".intro .intro__logo h1", {
  types: "words, chars",
});

const aboutText = new SplitType(".about .about__title strong", {
  types: "words, chars",
});

const mm = gsap.matchMedia();
mm.add("(min-width: 1001px)", () => {
  gsap.set(`[data-move="y-move"]`, { yPercent: 100 });
  gsap.set(`[data-effect="scale"]`, { scale: 0 });
  gsap.set(`[data-op="fade"]`, { opacity: 0 });

  const lodding = gsap.timeline({});
  lodding.to(".intro__logo", { yPercent: 0,duration:0.8 },"lodding");
  lodding.from(".intro__header .word", { yPercent: 100, stagger: 0.1 },"lodding");

  const intro = gsap
    .timeline({
      scrollTrigger: {
        trigger: ".intro",
        start: "0% 0%",
        end: "100% 100%",
        scrub: 0,
        // markers: true,
      },
    })
    .to(
      ".intro .intro__logo .char",
      {
        yPercent: 100,
        stagger: {
          amount: 1,
          from: "center",
        },
        duration: 4,
      },
      "intro"
    )
    .to(".intro .intro__header", { yPercent: -120, duration: 6 }, "intro")
    .to(".works .works__title-wrap", { height: "100%", duration: 6, }, "intro");

  const works = gsap
    .timeline({
      scrollTrigger: {
        trigger: ".works .sticky__work",
        start: "0% 0%",
        end: "100% 100%",
        endTrigger: ".works",
        scrub: 0,
        // ease:"none",
        // markers: true,
      },
    })
    .to(".works .work1", {
      yPercent: 0, scale: 1, duration: 2,
      onStart: function () {
        $("#header").addClass("active");
      },
      onReverseComplete: function () {
        $("#header").removeClass("active");
      },
    }, "work1")
    .to(".works .work1 img", { scale: 1 }, "work1+=1.25")
    .to(".works .work1", { yPercent: -100, scale: 0, duration: 2 }, "work2")
    .to(".works .work2", { yPercent: 0, scale: 1, duration: 2 }, "work2")
    .to(".works .work2 img", { scale: 1 }, "work2+=1")
    .to(".works .work2", { yPercent: -100, scale: 0, duration: 2 }, "work3")
    .to(".works .work3", { yPercent: 0, scale: 1, duration: 2 }, "work3")
    .to(".works .work3 img", { scale: 1 }, "work3+=1")
    .to(".works .work3", { yPercent: -100, scale: 0, duration: 2 }, "work4")
    .to(".works .work4", { yPercent: 0, scale: 1, duration: 2 }, "work4")
    .to(".works .work4 img", { scale: 1 }, "work4+=1")

  $(".works .works__item a").mousemove(function (e) {
    y = e.offsetY;
    gsap.to(".works .works__info", { y: y });
  });

  $(".works .works__item a").each(function (_, el) {
    $(el).hover(
      function () {
        gsap.to($(el).find(".works__info"), { opacity: 1 });
      },
      function () {
        gsap.to($(el).find(".works__info"), { opacity: 0 });
      }
    );
  });

})

mm.add("(max-width:1000px)", () => {
  gsap.set(".works .works__info", { transform: "none", opacity: 1 });

  $(".works .works__item a").off("mousemove");
  $(".works .works__item a").off("mouseenter mouseleave");


  ScrollTrigger.create({
    trigger: ".intro",
    start: "0% 0%",
    end: "100% 100%",
    endTrigger: "#footer",
    // markers: true,
    onUpdate: function (self) {
      direction = self.direction;
      if (direction == 1) {
        gsap.to("#header", { opacity: 1, duration: 0.1 })
      }
      else {
        gsap.to("#header", { opacity: 0, duration: 0.1 })
      }
    },
  });

})

const white = ScrollTrigger.create({
  trigger: '.sub-works',
  start: "0% 60%",
  end: "100% 0%",
  endTrigger: "#footer",
  // markers: true,
  toggleClass: {
    targets: "body",
    className: "white",
  },
});

const about = gsap
  .timeline({
    scrollTrigger: {
      trigger: ".about",
      start: "0% 70%",
      end: "100% 100%",
      scrub: 0,
      // markers: true,
    },
  })
  .from(".about .char", { yPercent: 100, opacity: 0, stagger: 0.5, duration: 1.5 }, "text")
  .to(".about .about__desc", { yPercent: 0, opacity: 1 }, "text")

$("#header .gnb__list li:not(:first-child)").each(function (index) {
  $(this).click(function () {
    gsap.to(window, {
      duration: 0.7,
      scrollTo: { y: `#sc${index + 1}` }
    });
  });
});