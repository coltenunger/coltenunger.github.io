var tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#main",
    // markers: true,
    start: "50% 50%",
    end: "150% 50%",
    scrub: true,
    pin: true,
  }
});
tl
  // A SECTION
  .to(".outer_top", {
    top: "-50%",
  }, 'a')
  .to(".outer_bottom", {
    bottom: "-50%",
  }, 'a')
  .to(".outer_top-h2", {
    top: "60%"
  }, 'a')
  .to(".outer_bottom-h1", {
    bottom: "60%"
  }, 'a')
  .to(".outer_bottom-h4", {
    bottom: "60%"
  }, 'a')

  // B SECTION
  .to("#about-section .about_top", {
    top: "-50%",
    delay: 0.5,
  }, 'b')
  .to("#about-section .about_bottom", {
    bottom: "-50%",
    delay: 0.5,
  }, 'b')
  .to("#about-section .about_top .about_header", {
    top: "60%",
    delay: 0.5,
  }, 'b')
  .to("#about-section .about_bottom .about_subheader", {
    bottom: "60%",
    delay: 0.5,
  }, 'b')
  .to("#about-section .about_bottom .about_socials", {
    bottom: "60%",
    delay: 0.5,
  }, 'b')
  .from("#about-section .about_top .about_header", {
    y: '-100%',
    opacity: 0,
  }, 'b-=.4')
  .from("#about-section .about_bottom .about_subheader", {
    y: '100%',
    opacity: 0,
  }, 'b-=.4')
  .from("#about-section .about_bottom .about_socials", {
    y: '100%',
    opacity: 0,
    scale: 0,
  }, 'b-=.4')

  // C SECTION
  .to("#work-section .work_top", {
    top: "-50%",
    delay: 0.5,
  }, 'c')
  .to("#work-section .work_bottom", {
    bottom: "-50%",
    delay: 0.5,
  }, 'c')
  .to("#work-section .work_header", {
    top: "110%",
    delay: 0.5,
  }, 'c')
  .to("#work-section .work_subheader", {
    bottom: "-100%",
    delay: 0.5,
  }, 'c')
  .to("#work-section .title_header-wrapper", {
    bottom: "60%",
    delay: 0.5,
  }, 'c')
  .to("#work-section .work_card", {
    bottom: "60%",
    delay: 0.5,
  }, 'c')
  .to("#work-section .mobile_header-work", {
    top: "60%",
    delay: 0.5,
  }, 'c')
  .to("#work-section .mobile_subheader-work", {
    top: "60%",
    delay: 0.5,
  }, 'c')
  .from("#work-section .work_header", {
    y: '-100%',
    filter: 'blur(15px)',
    opacity: 0,
  }, 'c-=.2')
  .from("#work-section .work_subheader", {
    y: '-100%',
    opacity: 0,
    filter: 'blur(5px)',
  }, 'c-=.4')
  .from("#work-section .mobile_header-work", {
    y: '-100%',
    filter: 'blur(15px)',
  }, 'c-=.4')
  .from("#work-section .mobile_subheader-work", {
    y: '-100%',
    opacity: 0,
    filter: 'blur(5px)',
  }, 'c-=.4')
  .from(" #work-section .card-1", {
    y: '100%',
    opacity: 0,
  }, 'c-=.4')
  .from("#work-section .card-2", {
    y: '100%',
    opacity: 0,
  }, 'c-=.35')
  .from("#work-section .card-3", {
    y: '100%',
    opacity: 0,
  }, 'c-=.3')
  .from(" #work-section .title_header-wrapper", {
    opacity: 0,
    filter: 'blur(5px)',
  }, 'c-=.4')

  // D SECTION
  .to("#skills-section .skills_top", {
    top: "-50%",
    delay: 0.5,
  }, 'd')
  .to("#skills-section .skills_bottom", {
    bottom: "-50%",
    delay: 0.5,
  }, 'd')
  .to("#skills-section .skills_header", {
    top: "80%",
    delay: 0.5,
  }, 'd')
  .to("#skills-section .skills_subheader", {
    top: "60%",
    delay: 0.5,
  }, 'd')
  .to("#skills-section .stack", {
    bottom: "60%",
    delay: 0.5,
  }, 'd')
  .from("#skills-section .skills_header", {
  }, 'd-=0.4')
  .from("#skills-section .skills_subheader", {
  }, 'd-=0.4')

  // STAGGERED STACK: TOP
  .from("#skills-section .stack .stack_item:nth-child(12)", {
    x: '-900%',
    opacity: 0,
    filter: 'blur(20px)',
  }, 'd-=0.5')
  .from("#skills-section .stack .stack_item:nth-child(11)", {
    x: '-900%',
    opacity: 0,
    filter: 'blur(20px)',
  }, 'd-=0.6')
  .from("#skills-section .stack .stack_item:nth-child(10)", {
    x: '-900%',
    opacity: 0,
    filter: 'blur(20px)',
  }, 'd-=0.7')
  .from("#skills-section .stack .stack_item:nth-child(9)", {
    x: '-900%',
    opacity: 0,
    filter: 'blur(20px)',
  }, 'd-=0.8')
  // STAGGERED STACK: MIDDLE
  .from("#skills-section .stack .stack_item:nth-child(8)", {
    x: '-900%',
    opacity: 0,
    filter: 'blur(20px)',
  }, 'd-=0.55')
  .from("#skills-section .stack .stack_item:nth-child(7)", {
    x: '-900%',
    opacity: 0,
    filter: 'blur(20px)',
  }, 'd-=0.65')
  .from("#skills-section .stack .stack_item:nth-child(6)", {
    x: '-900%',
    opacity: 0,
    filter: 'blur(20px)',
  }, 'd-=0.75')
  .from("#skills-section .stack .stack_item:nth-child(5)", {
    x: '-900%',
    opacity: 0,
    filter: 'blur(20px)',
  }, 'd-=0.85')
  // STAGGERED STACK: BOTTOM
  .from("#skills-section .stack .stack_item:nth-child(4)", {
    x: '-900%',
    opacity: 0,
    filter: 'blur(20px)',
  }, 'd-=0.6')
  .from("#skills-section .stack .stack_item:nth-child(3)", {
    x: '-900%',
    opacity: 0,
    filter: 'blur(20px)',
  }, 'd-=0.7')
  .from("#skills-section .stack .stack_item:nth-child(2)", {
    x: '-900%',
    opacity: 0,
    filter: 'blur(20px)',
  }, 'd-=0.8')
  .from("#skills-section .stack .stack_item:nth-child(1)", {
    x: '-900%',
    opacity: 0,
    filter: 'blur(20px)',
  }, 'd-=0.9')

  // E SECTION
  .to("#contact-section .contact_content", {
    top: "-30%",
    delay: -0.4,
  }, 'e')
  .from(".content_wrapper", {
    y: '100%',
    opacity: 0,
  }, 'e-=.4')
  .from(".contact_content .contact_socials", {
    y: '100%',
    scale: 0,
    opacity: 0,
  }, 'e-=.2')
  .from("#contact-section .author", {
    y: '100%',
    opacity: 0,
  }, '-=0.3')