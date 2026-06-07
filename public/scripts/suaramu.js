/* ============================================================
   Srijau — "Suaramu" global FAB + survey modal
   Injects the modal once, binds every .suaramu button to open it.
   Survey content, order, logic, and endpoint are an exact clone of
   srijau-survey.html (no questions changed, no fields added).
   ============================================================ */
(function(){
  "use strict";
  if (window.__srjSuaramuInit) return;
  window.__srjSuaramuInit = true;

  // Endpoint Apps Script — sama persis dengan srijau-survey.html
  var ENDPOINT = "https://script.google.com/macros/s/AKfycbxlGLqCC9-dAx-WKR6KBaoEjiiF_Kh_5C0925fmj7t9f4fS7mX0PbxDZ_DkLHGSM36n/exec";

  var X_ICON = '<svg viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';

  var MODAL_HTML =
  '<div class="srj-modal" id="srjModal" aria-hidden="true">'
  + '<div class="srj-modal__overlay" data-srj-close></div>'
  + '<div class="srj-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="srjTitle">'
  + '<button type="button" class="srj-modal__close" data-srj-close aria-label="Tutup survei">' + X_ICON + '</button>'
  + '<div class="srj-modal__scroll">'

  + '<form id="srjSurvey">'
  + '<p class="srj-eyebrow">Survei Srijau · Pra-peluncuran</p>'
  + '<h1 class="srj-h1" id="srjTitle">Bantu bentuk masa depan hijau Srijau.</h1>'
  + '<p class="srj-lede">Beberapa pertanyaan singkat tentang karier hijau dan rencana Srijau ke depan. Jawaban jujur lebih berharga daripada jawaban sopan.</p>'
  + '<p class="srj-time">± 3 menit</p>'

  // ===== TENTANG =====
  + '<div class="srj-section">'
  + '<p class="srj-section__tag">Sekilas tentang Anda</p>'
  + '<div class="srj-q">'
  + '<div class="srj-q__label">Mana yang paling menggambarkan diri saat ini? <span class="srj-req">*</span></div>'
  + '<div class="srj-choices" data-name="segmen">'
  + '<label><input type="radio" name="segmen" value="Perempuan mencari/transisi karier" required><span class="srj-opt"><span class="srj-dot"></span>Perempuan yang sedang mencari atau pindah karier</span></label>'
  + '<label><input type="radio" name="segmen" value="Ibu dengan anak"><span class="srj-opt"><span class="srj-dot"></span>Ibu dengan anak (tertarik edukasi hijau keluarga)</span></label>'
  + '<label><input type="radio" name="segmen" value="Pemilik usaha/UMKM"><span class="srj-opt"><span class="srj-dot"></span>Pemilik usaha atau UMKM</span></label>'
  + '<label><input type="radio" name="segmen" value="Lainnya"><span class="srj-opt"><span class="srj-dot"></span>Lainnya</span></label>'
  + '</div></div>'
  + '<div class="srj-q">'
  + '<div class="srj-q__label">Kota domisili</div>'
  + '<input type="text" name="kota" placeholder="mis. Jakarta, Bandung, Surabaya…" />'
  + '</div>'
  + '</div>'

  // ===== KESADARAN & MINAT =====
  + '<div class="srj-section">'
  + '<p class="srj-section__tag">Kesadaran & minat</p>'
  + '<div class="srj-q">'
  + '<div class="srj-q__label">Sebelum mengenal Srijau, seberapa familiar dengan peluang karier di sektor hijau? <span class="srj-req">*</span></div>'
  + '<div class="srj-q__help">1 = belum pernah dengar · 5 = sangat paham</div>'
  + '<div class="srj-scale" data-name="awareness_sebelum">'
  + '<label><input type="radio" name="awareness_sebelum" value="1" required><span class="srj-opt"><span class="srj-emo">😕</span><span class="srj-num">1</span></span></label>'
  + '<label><input type="radio" name="awareness_sebelum" value="2"><span class="srj-opt"><span class="srj-emo">😐</span><span class="srj-num">2</span></span></label>'
  + '<label><input type="radio" name="awareness_sebelum" value="3"><span class="srj-opt"><span class="srj-emo">🙂</span><span class="srj-num">3</span></span></label>'
  + '<label><input type="radio" name="awareness_sebelum" value="4"><span class="srj-opt"><span class="srj-emo">😊</span><span class="srj-num">4</span></span></label>'
  + '<label><input type="radio" name="awareness_sebelum" value="5"><span class="srj-opt"><span class="srj-emo">🤩</span><span class="srj-num">5</span></span></label>'
  + '</div></div>'
  + '<div class="srj-q">'
  + '<div class="srj-q__label">Setelah mengenal Srijau, seberapa tertarik untuk mengejar peran di bidang hijau? <span class="srj-req">*</span></div>'
  + '<div class="srj-q__help">1 = tidak tertarik · 5 = sangat tertarik</div>'
  + '<div class="srj-scale" data-name="minat_sesudah">'
  + '<label><input type="radio" name="minat_sesudah" value="1" required><span class="srj-opt"><span class="srj-emo">😕</span><span class="srj-num">1</span></span></label>'
  + '<label><input type="radio" name="minat_sesudah" value="2"><span class="srj-opt"><span class="srj-emo">😐</span><span class="srj-num">2</span></span></label>'
  + '<label><input type="radio" name="minat_sesudah" value="3"><span class="srj-opt"><span class="srj-emo">🙂</span><span class="srj-num">3</span></span></label>'
  + '<label><input type="radio" name="minat_sesudah" value="4"><span class="srj-opt"><span class="srj-emo">😊</span><span class="srj-num">4</span></span></label>'
  + '<label><input type="radio" name="minat_sesudah" value="5"><span class="srj-opt"><span class="srj-emo">🤩</span><span class="srj-num">5</span></span></label>'
  + '</div></div>'
  + '<div class="srj-q">'
  + '<div class="srj-q__label">Seberapa relevan Srijau untuk situasi saat ini? <span class="srj-req">*</span></div>'
  + '<div class="srj-q__help">1 = tidak relevan · 5 = sangat relevan</div>'
  + '<div class="srj-scale" data-name="relevansi">'
  + '<label><input type="radio" name="relevansi" value="1" required><span class="srj-opt"><span class="srj-emo">😕</span><span class="srj-num">1</span></span></label>'
  + '<label><input type="radio" name="relevansi" value="2"><span class="srj-opt"><span class="srj-emo">😐</span><span class="srj-num">2</span></span></label>'
  + '<label><input type="radio" name="relevansi" value="3"><span class="srj-opt"><span class="srj-emo">🙂</span><span class="srj-num">3</span></span></label>'
  + '<label><input type="radio" name="relevansi" value="4"><span class="srj-opt"><span class="srj-emo">😊</span><span class="srj-num">4</span></span></label>'
  + '<label><input type="radio" name="relevansi" value="5"><span class="srj-opt"><span class="srj-emo">🤩</span><span class="srj-num">5</span></span></label>'
  + '</div></div>'
  + '</div>'

  // ===== NIAT & HAMBATAN =====
  + '<div class="srj-section">'
  + '<p class="srj-section__tag">Niat & hambatan</p>'
  + '<div class="srj-q">'
  + '<div class="srj-q__label">Akan mengambil langkah pertama menuju karier hijau dalam 30 hari ke depan? <span class="srj-req">*</span></div>'
  + '<div class="srj-choices row" data-name="niat_30hari">'
  + '<label><input type="radio" name="niat_30hari" value="Ya" required><span class="srj-opt"><span class="srj-dot"></span>Ya</span></label>'
  + '<label><input type="radio" name="niat_30hari" value="Mungkin"><span class="srj-opt"><span class="srj-dot"></span>Mungkin</span></label>'
  + '<label><input type="radio" name="niat_30hari" value="Tidak"><span class="srj-opt"><span class="srj-dot"></span>Belum</span></label>'
  + '</div></div>'
  + '<div class="srj-q">'
  + '<div class="srj-q__label">Apa hambatan terbesar untuk memulai?</div>'
  + '<div class="srj-q__help">Jawaban jujur dan spesifik sangat membantu.</div>'
  + '<textarea name="hambatan" placeholder="mis. tidak tahu mulai dari mana, takut salah jurusan, butuh biaya…"></textarea>'
  + '</div>'
  + '</div>'

  // ===== BETA & HARGA =====
  + '<div class="srj-section">'
  + '<p class="srj-section__tag">Peluncuran & kesediaan berlangganan</p>'
  + '<div class="srj-q">'
  + '<div class="srj-q__label">Bersedia menjadi salah satu pengguna beta pertama Srijau? <span class="srj-req">*</span></div>'
  + '<div class="srj-q__help">Akan dikabari lebih dulu lewat email saat Srijau siap diluncurkan.</div>'
  + '<div class="srj-choices" data-name="beta">'
  + '<label><input type="radio" name="beta" value="Ya" required id="srj-beta-yes"><span class="srj-opt"><span class="srj-dot"></span>Ya, kabari saya saat Srijau diluncurkan</span></label>'
  + '<label><input type="radio" name="beta" value="Belum" id="srj-beta-no"><span class="srj-opt"><span class="srj-dot"></span>Belum, lihat dulu nanti</span></label>'
  + '</div>'
  + '<div class="srj-conditional" id="srj-email-block">'
  + '<input type="email" name="email" placeholder="Alamat email untuk dikabari" />'
  + '<p class="srj-hint">Hanya untuk kabar peluncuran Srijau. Tidak dibagikan ke pihak lain.</p>'
  + '</div></div>'
  + '<div class="srj-q">'
  + '<div class="srj-q__label">Berapa harga langganan per bulan yang masuk akal untuk dibayar? <span class="srj-req">*</span></div>'
  + '<div class="srj-q__help">Jujur saja — jawaban "belum mau bayar" pun sangat berguna.</div>'
  + '<div class="srj-choices" data-name="wtp">'
  + '<label><input type="radio" name="wtp" value="Belum mau bayar" required><span class="srj-opt"><span class="srj-dot"></span>Belum mau bayar dulu</span></label>'
  + '<label><input type="radio" name="wtp" value="<20rb"><span class="srj-opt"><span class="srj-dot"></span>Di bawah Rp 20.000 / bulan</span></label>'
  + '<label><input type="radio" name="wtp" value="20-49rb"><span class="srj-opt"><span class="srj-dot"></span>Rp 20.000 – 49.000 / bulan</span></label>'
  + '<label><input type="radio" name="wtp" value="50-99rb"><span class="srj-opt"><span class="srj-dot"></span>Rp 50.000 – 99.000 / bulan</span></label>'
  + '<label><input type="radio" name="wtp" value="100rb+"><span class="srj-opt"><span class="srj-dot"></span>Rp 100.000+ / bulan</span></label>'
  + '</div></div>'
  + '<div class="srj-q">'
  + '<div class="srj-founding">'
  + '<div class="srj-founding__title">★ Founding Member</div>'
  + '<div class="srj-founding__body">Srijau membuka 20 kursi founding member dengan harga terkunci selamanya. Bersedia mengamankan kursi (gratis sekarang, harga terkunci saat launch)?</div>'
  + '<div class="srj-choices" data-name="founding">'
  + '<label><input type="radio" name="founding" value="Ya"><span class="srj-opt"><span class="srj-dot"></span>Ya, amankan kursi saya</span></label>'
  + '<label><input type="radio" name="founding" value="Tidak"><span class="srj-opt"><span class="srj-dot"></span>Belum tertarik</span></label>'
  + '</div></div></div>'
  + '<div class="srj-q">'
  + '<div class="srj-q__label">Apa yang membuat ragu untuk membayar?</div>'
  + '<textarea name="ragu_bayar" placeholder="mis. belum yakin manfaatnya, mau coba gratis dulu, harga…"></textarea>'
  + '</div>'
  + '</div>'

  + '<div class="srj-submit">'
  + '<button type="submit" class="srj-btn" id="srjSubmit">Kirim jawaban →</button>'
  + '<p class="srj-privacy">Dengan mengirim, jawaban digunakan untuk pengembangan Srijau. Email (bila diisi) hanya dipakai untuk kabar peluncuran.</p>'
  + '</div>'
  + '</form>'

  + '<div class="srj-thanks" id="srjThanks">'
  + '<div class="srj-mark">🌿</div>'
  + '<h2>Terima kasih.</h2>'
  + '<p>Jawaban telah tercatat. Bila bersedia dikabari, kabar peluncuran Srijau akan dikirim ke email Anda.</p>'
  + '</div>'

  + '</div></div></div>';

  function init(){
    if (document.getElementById('srjModal')) return;
    var host = document.createElement('div');
    host.innerHTML = MODAL_HTML;
    var modal = host.firstChild;
    document.body.appendChild(modal);

    var dialog = modal.querySelector('.srj-modal__dialog');
    var form = modal.querySelector('#srjSurvey');
    var thanks = modal.querySelector('#srjThanks');
    var emailBlock = modal.querySelector('#srj-email-block');
    var emailInput = emailBlock.querySelector('input');
    var betaYes = modal.querySelector('#srj-beta-yes');
    var betaNo = modal.querySelector('#srj-beta-no');
    var scroller = modal.querySelector('.srj-modal__scroll');
    var lastFocus = null;

    // conditional email (only when beta = Ya) — identik dengan survei asli
    betaYes.addEventListener('change', function(){
      emailBlock.classList.add('show'); emailInput.setAttribute('required','required');
    });
    betaNo.addEventListener('change', function(){
      emailBlock.classList.remove('show'); emailInput.removeAttribute('required');
    });

    function open(){
      lastFocus = document.activeElement;
      modal.classList.add('is-open');
      document.documentElement.classList.add('srj-modal-open');
      modal.setAttribute('aria-hidden','false');
      document.body.style.overflow = 'hidden';
      setTimeout(function(){ modal.querySelector('.srj-modal__close').focus(); }, 40);
    }
    function close(){
      modal.classList.remove('is-open');
      document.documentElement.classList.remove('srj-modal-open');
      modal.setAttribute('aria-hidden','true');
      document.body.style.overflow = '';
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    // open from every .suaramu FAB
    document.querySelectorAll('.suaramu').forEach(function(btn){
      btn.addEventListener('click', function(e){ e.preventDefault(); open(); });
    });
    // close: overlay + ✕
    modal.querySelectorAll('[data-srj-close]').forEach(function(el){
      el.addEventListener('click', close);
    });
    // close: Escape + simple focus trap
    document.addEventListener('keydown', function(e){
      if (!modal.classList.contains('is-open')) return;
      if (e.key === 'Escape'){ close(); return; }
      if (e.key === 'Tab'){
        var f = dialog.querySelectorAll('button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])');
        f = Array.prototype.filter.call(f, function(el){ return el.offsetParent !== null || el === document.activeElement; });
        if (!f.length) return;
        var first = f[0], last = f[f.length-1];
        if (e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
      }
    });

    // submit — fire-and-forget no-cors, identik dengan survei asli
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var btn = modal.querySelector('#srjSubmit');
      btn.disabled = true; btn.textContent = 'Mengirim…';

      var data = new FormData(form);
      data.append('timestamp', new Date().toISOString());
      data.append('sumber', 'survei_beta_wtp');
      var params = new URLSearchParams();
      for (var pair of data.entries()) params.append(pair[0], pair[1]);

      fetch(ENDPOINT, {
        method:'POST', mode:'no-cors',
        headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},
        body: params.toString()
      }).finally(function(){
        form.style.display = 'none';
        thanks.classList.add('show');
        if (scroller) scroller.scrollTo({ top:0, behavior:'smooth' });
      });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
