(() => {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const nav = document.getElementById("siteNav");
  let lastScrollY = window.scrollY;

  const updateNavigation = () => {
    const currentY = window.scrollY;
    nav?.classList.toggle("scrolled", currentY > 20);

    if (nav && !nav.matches(":focus-within")) {
      const movingDown = currentY > lastScrollY && currentY > 100;
      nav.classList.toggle("nav-hidden", movingDown);
    }

    lastScrollY = currentY;
  };

  window.addEventListener("scroll", updateNavigation, { passive: true });
  updateNavigation();

  const revealElements = document.querySelectorAll(".reveal");
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("visible"));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -35px" });

    revealElements.forEach((element) => revealObserver.observe(element));
  }

  const navLinks = [...document.querySelectorAll(".nav-links a")];
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;
      navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${visible.target.id}`;
        link.classList.toggle("active", isActive);
        if (isActive) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    }, { threshold: [0.2, 0.45, 0.7], rootMargin: "-20% 0px -55%" });

    sections.forEach((section) => sectionObserver.observe(section));
  }

  const comparisonShell = document.getElementById("comparisonShell");
  const tabs = [...document.querySelectorAll("[role='tab'][data-panel]")];
  const panels = [...document.querySelectorAll("[data-video-panel]")];
  const replayButton = document.querySelector("[data-replay]");
  const progress = document.querySelector("[data-progress]");
  const videoStatus = document.querySelector("[data-video-status]");
  let comparisonVisible = true;
  let progressFrame = null;
  let restarting = false;

  const activePanel = () => panels.find((panel) => panel.classList.contains("active"));
  const panelVideos = (panel) => panel ? [...panel.querySelectorAll("video")] : [];

  const stopProgress = () => {
    if (progressFrame) cancelAnimationFrame(progressFrame);
    progressFrame = null;
  };

  const drawProgress = () => {
    const leader = panelVideos(activePanel())[0];
    if (leader && Number.isFinite(leader.duration) && leader.duration > 0 && progress) {
      const percent = Math.min(100, (leader.currentTime / leader.duration) * 100);
      progress.style.width = `${percent}%`;
    }
    progressFrame = requestAnimationFrame(drawProgress);
  };

  const playPanel = async (panel, reset = false) => {
    const videos = panelVideos(panel);
    if (!videos.length || !comparisonVisible) return;

    if (reset) {
      videos.forEach((video) => {
        try { video.currentTime = 0; } catch (_) { /* Metadata may not be ready yet. */ }
      });
      if (progress) progress.style.width = "0%";
    }

    const attempts = await Promise.allSettled(videos.map((video) => video.play()));
    const autoplayBlocked = attempts.some((attempt) => attempt.status === "rejected");

    videos.forEach((video) => { video.controls = autoplayBlocked; });
    if (videoStatus) {
      videoStatus.textContent = autoplayBlocked
        ? "Autoplay is unavailable. Use the video controls or Replay cycle button."
        : "Videos are synchronized to the same cycle.";
    }

    stopProgress();
    drawProgress();
  };

  const pauseAllVideos = () => {
    panels.forEach((panel) => panelVideos(panel).forEach((video) => video.pause()));
    stopProgress();
  };

  const restartPanel = async (panel = activePanel()) => {
    if (!panel || restarting) return;
    restarting = true;
    await playPanel(panel, true);
    window.setTimeout(() => { restarting = false; }, 250);
  };

  const activateTab = (tab) => {
    const key = tab.dataset.panel;
    pauseAllVideos();

    tabs.forEach((candidate) => {
      const selected = candidate === tab;
      candidate.classList.toggle("active", selected);
      candidate.setAttribute("aria-selected", String(selected));
      candidate.tabIndex = selected ? 0 : -1;
    });

    panels.forEach((panel) => {
      const selected = panel.dataset.videoPanel === key;
      panel.classList.toggle("active", selected);
      panel.hidden = !selected;
    });

    restartPanel();
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activateTab(tab));
    tab.addEventListener("keydown", (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      let nextIndex = index;
      if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = tabs.length - 1;
      tabs[nextIndex].focus();
      activateTab(tabs[nextIndex]);
    });
  });

  replayButton?.addEventListener("click", () => restartPanel());
  panels.forEach((panel) => {
    panelVideos(panel).forEach((video) => {
      video.addEventListener("ended", () => {
        if (panel.classList.contains("active")) restartPanel(panel);
      });
      video.addEventListener("click", () => {
        if (panel.classList.contains("active") && !video.controls) restartPanel(panel);
      });
      video.addEventListener("error", () => {
        if (videoStatus) videoStatus.textContent = "One comparison video could not be loaded.";
      });
    });
  });

  window.setInterval(() => {
    const videos = panelVideos(activePanel());
    const leader = videos[0];
    if (!leader || leader.paused) return;
    videos.slice(1).forEach((video) => {
      if (video.readyState >= 2 && Math.abs(video.currentTime - leader.currentTime) > 0.16) {
        video.currentTime = Math.min(leader.currentTime, video.duration || leader.currentTime);
      }
    });
  }, 900);

  if (comparisonShell && "IntersectionObserver" in window) {
    const comparisonObserver = new IntersectionObserver(([entry]) => {
      comparisonVisible = entry.isIntersecting;
      if (comparisonVisible) playPanel(activePanel());
      else pauseAllVideos();
    }, { threshold: 0.14 });
    comparisonObserver.observe(comparisonShell);
  } else if (comparisonShell) {
    restartPanel();
  }

  const copyButton = document.querySelector("[data-copy-citation]");
  const citation = document.getElementById("bibtex");
  const copyStatus = document.querySelector("[data-copy-status]");

  const fallbackCopy = (text) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    textarea.remove();
    return copied;
  };

  copyButton?.addEventListener("click", async () => {
    const text = citation?.textContent.trim();
    if (!text) return;

    let copied = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        copied = true;
      } else {
        copied = fallbackCopy(text);
      }
    } catch (_) {
      copied = fallbackCopy(text);
    }

    if (copyStatus) copyStatus.textContent = copied ? "Citation copied to clipboard." : "Copy failed. Select the citation text manually.";
    if (copied) {
      copyButton.innerHTML = '<span aria-hidden="true">✓</span> Copied';
      window.setTimeout(() => {
        copyButton.innerHTML = '<span aria-hidden="true">□</span> Copy';
        if (copyStatus) copyStatus.textContent = "";
      }, 2200);
    }
  });

  panels.forEach((panel) => {
    panel.hidden = !panel.classList.contains("active");
  });
  document.documentElement.classList.add("enhanced");
})();
