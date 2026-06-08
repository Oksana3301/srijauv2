/* ============================================================
   Srijau — Waitlist submit (semua halaman utama)
   fetch no-cors, x-www-form-urlencoded, fire-and-forget.
   Field: form_type=waitlist, asal_halaman, nama, email, minat, timestamp.
   ============================================================ */
(function(){
  if (window.__srjWaitlistInit) return;
  window.__srjWaitlistInit = true;

  var ENDPOINT = "https://script.google.com/macros/s/AKfycbxlGLqCC9-dAx-WKR6KBaoEjiiF_Kh_5C0925fmj7t9f4fS7mX0PbxDZ_DkLHGSM36n/exec";
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function send(data){
    var params = new URLSearchParams();
    Object.keys(data).forEach(function(k){ params.append(k, data[k]); });
    try {
      fetch(ENDPOINT, {
        method:"POST", mode:"no-cors",
        headers:{"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
        body: params.toString()
      });
    } catch(e){}
  }

  [].slice.call(document.querySelectorAll("form.js-waitlist")).forEach(function(form){
    var card = form.closest(".waitlist__card") || form.parentNode;
    var done = card.querySelector(".waitlist__done");
    var err  = form.querySelector(".waitlist__err");
    var emailEl = form.querySelector('input[type="email"]');
    var nameEl  = form.querySelector('input[name="nama"]');
    var minatEl = form.querySelector('select[name="minat"]');
    var asal = form.getAttribute("data-asal") || "home";

    form.addEventListener("submit", function(e){
      e.preventDefault();
      var email = (emailEl && emailEl.value || "").trim();
      var nama  = (nameEl && nameEl.value || "").trim();
      var minat = (minatEl && minatEl.value || "").trim();
      if (!EMAIL_RE.test(email)){
        if (err){ err.classList.add("is-on"); err.textContent = "Mohon masukkan email yang valid."; }
        emailEl && emailEl.focus();
        return;
      }
      if (err) err.classList.remove("is-on");
      send({
        form_type: "waitlist",
        asal_halaman: asal,
        nama: nama,
        email: email,
        minat: minat,
        timestamp: new Date().toISOString()
      });
      form.classList.add("is-hidden");
      if (done) done.classList.add("is-on");
    });
  });
})();
