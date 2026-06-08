/* ============================================================
   Srijau — Pre-test & Post-test (Educational + Expert Share)
   - State in page memory only (NO localStorage).
   - fetch no-cors, x-www-form-urlencoded, ke endpoint Apps Script.
   - Pre-test mengunci konten; post-test + exit-intent popup.
   ============================================================ */
(function(){
  if (window.__srjPrepostInit) return;
  window.__srjPrepostInit = true;

  var ENDPOINT = "https://script.google.com/macros/s/AKfycbxlGLqCC9-dAx-WKR6KBaoEjiiF_Kh_5C0925fmj7t9f4fS7mX0PbxDZ_DkLHGSM36n/exec";

  // session state (memory only)
  var SESSION_ID = String(Date.now()) + "-" + Math.random().toString(36).slice(2, 10);
  var SLUG = (function(){
    var p = (location.pathname.split("/").pop() || "index");
    p = p.replace(/\.html$/i, "").replace(/^__preview_/, "");
    return p || "index";
  })();
  var preDone = false, postDone = false, popupShown = false;

  var QUESTIONS = [
    "Seberapa paham bahwa green jobs terbuka untuk berbagai latar belakang, bukan hanya teknik?",
    "Seberapa tahu langkah konkret untuk memulai di bidang yang dibahas?",
    "Seberapa besar keinginan menjajaki peluang di bidang ini?"
  ];
  var EMOJI = ["\uD83D\uDE15","\uD83D\uDE10","\uD83D\uDE42","\uD83D\uDE0A","\uD83D\uDE0D"]; // 1..5

  function send(formType, answers){
    var params = new URLSearchParams();
    params.append("form_type", formType);
    params.append("session_id", SESSION_ID);
    params.append("artikel_slug", SLUG);
    params.append("q1", answers[0]); params.append("q2", answers[1]); params.append("q3", answers[2]);
    try {
      fetch(ENDPOINT, {
        method:"POST", mode:"no-cors",
        headers:{"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
        body: params.toString()
      });
    } catch(e){}
  }

  // build one question block
  function qBlock(idx){
    var wrap = document.createElement("div");
    wrap.className = "pp-q";
    var t = document.createElement("p");
    t.className = "pp-q__t";
    t.textContent = (idx+1) + ". " + QUESTIONS[idx];
    wrap.appendChild(t);
    var scale = document.createElement("div");
    scale.className = "pp-scale";
    scale.setAttribute("role","radiogroup");
    for (var n=1; n<=5; n++){
      (function(val){
        var b = document.createElement("button");
        b.type="button"; b.className="pp-opt"; b.setAttribute("data-cursor","");
        b.setAttribute("role","radio"); b.setAttribute("aria-checked","false");
        b.setAttribute("aria-label", String(val));
        b.innerHTML = '<span class="pp-opt__emoji">'+EMOJI[val-1]+'</span><span class="pp-opt__n">'+val+'</span>';
        b.addEventListener("click", function(){
          scale.querySelectorAll(".pp-opt").forEach(function(o){ o.classList.remove("is-sel"); o.setAttribute("aria-checked","false"); });
          b.classList.add("is-sel"); b.setAttribute("aria-checked","true");
          wrap.dataset.value = val;
          if (wrap.dataset.onpick) window[wrap.dataset.onpick] && window[wrap.dataset.onpick]();
          checkReady(wrap.closest(".prepost__form"));
        });
        scale.appendChild(b);
      })(n);
    }
    wrap.appendChild(scale);
    var ends = document.createElement("div");
    ends.className = "pp-scale__ends";
    ends.innerHTML = "<span>Sangat rendah</span><span>Sangat tinggi</span>";
    wrap.appendChild(ends);
    return wrap;
  }

  function checkReady(form){
    if (!form) return;
    var blocks = form.querySelectorAll(".pp-q");
    var all = true;
    blocks.forEach(function(b){ if(!b.dataset.value) all=false; });
    var btn = form.querySelector(".prepost__btn");
    if (btn) btn.disabled = !all;
  }

  function answersOf(form){
    return [].slice.call(form.querySelectorAll(".pp-q")).map(function(b){ return b.dataset.value; });
  }

  // build a pre/post card
  function buildCard(kind){
    var isPre = kind === "pre";
    var sec = document.createElement("section");
    sec.className = "section prepost-sec " + (isPre ? "prepost-sec--pre" : "prepost-sec--post");
    sec.setAttribute("data-screen-label", isPre ? "Pre-test" : "Post-test");
    if (isPre) sec.id = "pretest"; else sec.id = "posttest";

    var container = document.createElement("div");
    container.className = "container";
    var prepost = document.createElement("div");
    prepost.className = "prepost";
    var card = document.createElement("div");
    card.className = "prepost-card " + (isPre ? "prepost-card--pre" : "prepost-card--post");

    var form = document.createElement("div");
    form.className = "prepost__form";
    form.innerHTML =
      '<p class="prepost__k">' + (isPre ? "Sebelum membaca" : "Setelah membaca") + '</p>' +
      '<h2 class="prepost__h">' + (isPre ? "Ukur pemahaman awal" : "Ukur pemahaman akhir") + '</h2>' +
      '<p class="prepost__sub">Tiga pertanyaan singkat, skala 1&ndash;5. Jawaban membantu mengukur manfaat bacaan ini.</p>';
    for (var i=0;i<3;i++) form.appendChild(qBlock(i));
    var foot = document.createElement("div");
    foot.className = "prepost__foot";
    var btn = document.createElement("button");
    btn.type="button"; btn.className="btn btn--wine prepost__btn"; btn.setAttribute("data-cursor",""); btn.disabled = true;
    btn.innerHTML = (isPre ? "Mulai membaca" : "Selesai") + ' <span class="arr">&rarr;</span>';
    var note = document.createElement("p");
    note.className="prepost__note";
    note.textContent = isPre ? "Konten terbuka setelah terkirim." : "Terima kasih telah membaca.";
    foot.appendChild(btn); foot.appendChild(note);
    form.appendChild(foot);

    var done = document.createElement("div");
    done.className = "prepost__done";
    done.innerHTML =
      '<div class="prepost__done-ic"><svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M5 12.5l4.5 4.5L19 7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>' +
      '<h3 class="prepost__done-h">' + (isPre ? "Terkirim. Selamat membaca." : "Terima kasih.") + '</h3>' +
      '<p class="prepost__done-p">' + (isPre ? "Pemahaman awal tercatat." : "Jawaban tercatat dan sangat membantu.") + '</p>';

    card.appendChild(form); card.appendChild(done);
    prepost.appendChild(card); container.appendChild(prepost); sec.appendChild(container);

    btn.addEventListener("click", function(){
      var ans = answersOf(form);
      if (ans.some(function(v){ return !v; })) return;
      send(isPre ? "pretest" : "posttest", ans);
      form.classList.add("is-hidden");
      done.classList.add("is-on");
      if (isPre){ preDone = true; unlockContent(); }
      else { postDone = true; teardownPopup(); }
    });

    return sec;
  }

  var mainEl = document.querySelector("main");
  if (!mainEl) return;

  function unlockContent(){
    mainEl.classList.remove("pp-locked");
    mainEl.classList.add("pp-unlocked");
    var post = document.getElementById("posttest");
    var pre = document.getElementById("pretest");
    // smooth scroll to first real content after pre card
    var firstContent = pre ? pre.nextElementSibling : null;
    if (firstContent){
      var y = firstContent.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top:y, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto":"smooth" });
    }
  }

  // inject pre at very top, post at very bottom of <main>
  var preCard = buildCard("pre");
  var postCard = buildCard("post");
  mainEl.insertBefore(preCard, mainEl.firstChild);
  mainEl.appendChild(postCard);
  mainEl.classList.add("pp-locked");

  /* ---------- exit-intent popup ---------- */
  var modal = document.createElement("div");
  modal.className = "pp-modal";
  modal.innerHTML =
    '<div class="pp-modal__overlay"></div>' +
    '<div class="pp-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="ppModalH">' +
      '<h2 class="pp-modal__h" id="ppModalH">Sebelum pergi</h2>' +
      '<p class="pp-modal__p">Mohon isi 3 pertanyaan singkat untuk membantu mengukur manfaat bacaan ini.</p>' +
      '<div class="pp-modal__row">' +
        '<button class="btn btn--quiet" data-cursor id="ppSkip">Lewati</button>' +
        '<button class="btn btn--wine" data-cursor id="ppFill">Isi sekarang</button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(modal);

  var allowLeave = false;

  function showPopup(){
    if (popupShown || postDone || !preDone) return false;
    popupShown = true;
    modal.classList.add("is-open");
    return true;
  }
  function hidePopup(){ modal.classList.remove("is-open"); }

  modal.querySelector("#ppFill").addEventListener("click", function(){
    hidePopup();
    var post = document.getElementById("posttest");
    if (post){
      var y = post.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top:y, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto":"smooth" });
    }
  });
  modal.querySelector("#ppSkip").addEventListener("click", function(){
    hidePopup(); allowLeave = true;
    if (pendingHref){ var h = pendingHref; pendingHref = null; window.location.href = h; }
  });
  modal.querySelector(".pp-modal__overlay").addEventListener("click", hidePopup);

  // intercept internal nav clicks (links leaving this article)
  var pendingHref = null;
  document.addEventListener("click", function(e){
    var a = e.target.closest && e.target.closest("a[href]");
    if (!a) return;
    if (allowLeave || postDone || !preDone) return;
    var href = a.getAttribute("href");
    if (!href || href.charAt(0) === "#") return;            // same-page anchor
    if (a.target === "_blank") return;
    if (/^(mailto:|tel:|https?:)/i.test(href)) {             // external — let browser handle
      // still nudge if leaving
    }
    // internal navigation intent
    e.preventDefault();
    pendingHref = href;
    if (!showPopup()){ allowLeave = true; window.location.href = href; }
  }, true);

  // tab close / reload intent
  window.addEventListener("beforeunload", function(e){
    if (postDone || !preDone) return;
    showPopup();
    e.preventDefault();
    e.returnValue = "";
    return "";
  });

  function teardownPopup(){ allowLeave = true; hidePopup(); }
})();
