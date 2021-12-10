Splitting();
const header = $("#header");
const gnbList = $("#gnb .list > li");
gnbList.on("mouseenter", function () {
  header.addClass("open");
});

gnbList.on("mouseleave", function () {
  header.removeClass("open");
});

const happenTL = gsap.timeline();
happenTL
  .from("#happen  .titleBox h2 .char", { opacity: 0, x: 100, duration: 1, ease: "power3", stagger: 0.05 })
  .from("#happen  .titleBox p .char", { opacity: 0, x: 100, duration: 1, ease: "power3", stagger: 0.05 }, "-=1")
  .from(CSSRulePlugin.getRule("#happen .titleBox strong:after"), { cssRule: { scaleX: 0 }, duration: 0.5 });

const businessTL = gsap.timeline();
businessTL.pause();
businessTL
  .from("#business  .titleBox h2 .char", { opacity: 0, x: 100, duration: 1, ease: "power3", stagger: 0.05 })
  .from("#business  .titleBox p .char", { opacity: 0, x: 100, duration: 1, ease: "power3", stagger: 0.05 }, "-=1")
  .from("#business  .listBox li", { opacity: 0, x: 100, duration: 1, ease: "power3", stagger: 0.1 }, "-=1")
  .from(CSSRulePlugin.getRule("#business .titleBox strong:after"), { cssRule: { scaleX: 0 }, duration: 0.5 });

const portfolioTL = gsap.timeline();
portfolioTL.pause();
portfolioTL
  .from("#portfolio  .titleBox h2 .char", { opacity: 0, x: 100, duration: 1, ease: "power3", stagger: 0.05 })
  .from("#portfolio  .titleBox p .char", { opacity: 0, x: 100, duration: 1, ease: "power3", stagger: 0.05 }, "-=1")
  .from("#portfolio  .listBox", { opacity: 0, x: 100, duration: 1, ease: "power3" }, "-=1")
  .from(CSSRulePlugin.getRule("#portfolio .titleBox strong:after"), { cssRule: { scaleX: 0 }, duration: 0.5 });

const communityTL = gsap.timeline();
communityTL.pause();
communityTL
  .from("#community  .titleBox h2 .char", { opacity: 0, x: 100, duration: 1, ease: "power3", stagger: 0.05 })
  .from("#community  .titleBox p .char", { opacity: 0, x: 100, duration: 1, ease: "power3", stagger: 0.05 }, "-=1")
  .from("#community  .listBox li", { opacity: 0, x: 100, duration: 1, ease: "power3", stagger: 0.1 }, "-=1")
  .from(CSSRulePlugin.getRule("#community .titleBox strong:after"), { cssRule: { scaleX: 0 }, duration: 0.5 });

$("#main").fullpage({
  //scrollBar: true,
  navigation: true,
  navigationTooltips: ["INTRODUCE", "BUSINESS", "PORTFOLIO", "COMMUNITY"],
  showActiveTooltip: true,
  onLeave: function (origin, destination, direction) {
    const leavingSection = this;
    switch (destination.index) {
      case 0:
        happenTL.restart();
        break;
      case 1:
        businessTL.restart();
        break;
      case 2:
        portfolioTL.restart();
        break;
      case 3:
        if (direction === "down") {
          communityTL.restart();
        } else {
          $("#fp-nav").removeClass("last");
        }
        break;
      case 4:
        $("#fp-nav").addClass("last");
        break;
      default:
        console.log("이제 없어요");
    }
    /*
    if (destination.index === 0) {
      happenTL.restart();
    } else if (destination.index === 1) {
      businessTL.restart();
    } else if (destination.index === 2) {
      portfolioTL.restart();
    }
    */
  },
  afterRender: function () {
    //$.fn.fullpage.moveTo(2);
  },
});

const portfolioSlider = new Swiper("#portfolio .mask", {
  slidesPerView: 3,
  spaceBetween: 20,
  loop: true,
  navigation: {
    nextEl: "#portfolio .next",
    prevEl: "#portfolio .prev",
  },
  pagination: {
    el: "#portfolio .pagination",
    clickable: true,
  },
});

$("#fp-nav li:last-child").remove();
