/**
 * Lokey App - Main Application Logic
 * Mobile-first SPA with hash routing, mock state, and full interactivity
 */
(function () {
  const DATA = window.LOKEY_DATA;

  // =========================================================================
  // STATE (ephemeral - resets on page reload)
  // =========================================================================
  const state = {
    favorites: new Set(),
    currentReservation: null,
    isLoggedIn: true,
    currentChatId: null,
    bookingSuite: null,   // { motel, suite } for the summary page
    navHistory: ['home'],
    calMonth: new Date().getMonth(),
    calYear: new Date().getFullYear(),
    calSelectedDate: null,
  };

  // =========================================================================
  // ROUTER
  // =========================================================================
  const MAIN_PAGES = ['home', 'favoritos', 'mapa', 'reservas', 'perfil'];
  const SUB_PAGES = ['ajuda', 'mensagens', 'chat', 'resumo'];

  function navigateTo(page, pushHistory) {
    if (pushHistory !== false) state.navHistory.push(page);
    document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
    const section = document.getElementById('page-' + page);
    if (section) section.classList.add('active');

    // Bottom nav visibility
    const nav = document.getElementById('bottom-nav');
    if (SUB_PAGES.includes(page)) {
      nav.style.display = 'none';
    } else {
      nav.style.display = 'flex';
    }

    // Update active nav item
    document.querySelectorAll('#bottom-nav .nav-item').forEach(item => {
      const p = item.getAttribute('data-page');
      if (p === page) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Scroll to top
    window.scrollTo(0, 0);

    // Page-specific init
    if (page === 'home') renderHomeFeed();
    if (page === 'favoritos') renderFavorites();
    if (page === 'reservas') renderReservas();
    if (page === 'mensagens') renderChatList();
    if (page === 'perfil') renderPerfil();

    // Update hash
    window.location.hash = page;
  }

  function goBack() {
    state.navHistory.pop();
    const prev = state.navHistory[state.navHistory.length - 1] || 'home';
    navigateTo(prev, false);
  }

  // =========================================================================
  // RENDER: HOME FEED
  // =========================================================================
  function renderHomeFeed() {
    const feed = document.getElementById('home-feed');
    if (!feed) return;
    // Always re-render to reflect latest state
    if (feed.dataset.rendered === 'true') return;
    feed.dataset.rendered = 'true';

    let html = '<div class="space-y-6">';
    DATA.motels.forEach((motel, idx) => {
      const isFav = state.favorites.has(motel.id);
      html += `
        <div class="space-y-3 stagger-item" style="animation-delay:${idx * 0.08}s">
          <div class="flex justify-between items-center">
            <div class="flex items-center gap-2.5 flex-1 min-w-0">
              <div class="w-9 h-9 rounded-full ${motel.logoImage ? '' : 'bg-on-background'} flex-shrink-0 flex items-center justify-center overflow-hidden border border-outline-variant/20">
                ${motel.logoImage ? `<img alt="${motel.name}" class="w-full h-full object-cover" src="${motel.logoImage}" />` : `<div class="text-[7px] font-black text-white leading-[1.1] text-center tracking-tight">${motel.logo}</div>`}
              </div>
              <div class="min-w-0 flex-1">
                <h2 class="font-headline font-bold text-on-surface text-base leading-tight truncate">${motel.name}</h2>
                <p class="text-[10px] text-on-surface-variant font-semibold truncate">${motel.distance} Km - ${motel.location}</p>
              </div>
            </div>
            <div class="flex items-center gap-1.5 flex-shrink-0">
              <div class="flex items-center gap-0.5 bg-on-background/5 px-2 py-1 rounded-full">
                <span class="material-symbols-outlined text-primary text-[14px]" style="font-variation-settings: 'FILL' 1;">star</span>
                <span class="text-xs font-bold">${motel.rating}</span>
              </div>
              <button class="favorite-btn ${isFav ? 'active' : ''} w-8 h-8 rounded-full text-on-surface/80 transition-all active:scale-90 flex items-center justify-center" data-fav-motel="${motel.id}">
                <span class="material-symbols-outlined !text-[18px]">favorite</span>
              </button>
            </div>
          </div>
          <div class="flex items-stretch gap-3 overflow-x-auto hide-scrollbar snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 md:overflow-visible">
            ${motel.suites.map(suite => renderSuiteCard(motel, suite)).join('')}
          </div>
        </div>`;
    });
    html += '</div>';
    feed.innerHTML = html;
    bindHomeFeedEvents();
  }

  function renderSuiteCard(motel, suite) {
    return `
      <div class="suite-card flex-none w-[72%] sm:w-[280px] md:w-full bg-white rounded-2xl overflow-hidden border border-outline-variant/5 shadow-sm snap-center flex flex-col">
        <div class="relative h-36 flex-shrink-0">
          <img alt="${suite.name}" class="w-full h-full object-cover" src="${suite.image}" loading="lazy" />
          <div class="absolute top-2 left-2 bg-primary text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow">-${suite.discount}%</div>
        </div>
        <div class="p-3.5 flex flex-col gap-3 flex-1">
          <div class="flex justify-between items-start gap-2 flex-1">
            <div class="flex-1 min-w-0">
              <h3 class="font-headline font-bold tracking-tight text-on-surface leading-[1.2] line-clamp-2 text-sm">${suite.name}</h3>
              <div class="flex gap-2 text-on-surface-variant/60 mt-1.5">
                ${suite.amenityIcons.slice(0, 3).map(ic => `<span class="material-symbols-outlined text-[16px]">${ic}</span>`).join('')}
              </div>
            </div>
            <div class="text-right shrink-0">
              <div class="flex flex-col items-end">
                <span class="text-[9px] text-on-surface-variant/50 line-through font-bold leading-none mb-0.5">R$ ${suite.originalPrice}</span>
                <span class="font-extrabold text-on-surface leading-none tracking-tight text-xl">R$ ${suite.price}</span>
                <span class="text-[8px] text-on-surface-variant/70 font-bold uppercase tracking-wide mt-0.5">/ ${suite.duration}</span>
              </div>
            </div>
          </div>
          <button class="w-full h-9 cta-gradient hover:brightness-110 text-white font-bold flex items-center justify-center gap-1.5 active:scale-[0.97] transition-all text-base rounded mt-auto" data-book-motel="${motel.id}" data-book-suite="${suite.id}">
            Reservar <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </div>`;
  }

  function bindHomeFeedEvents() {
    // Favorite buttons
    document.querySelectorAll('[data-fav-motel]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.favMotel);
        if (state.favorites.has(id)) state.favorites.delete(id);
        else state.favorites.add(id);
        btn.classList.toggle('active');
      });
    });
    // Book buttons
    document.querySelectorAll('[data-book-motel]').forEach(btn => {
      btn.addEventListener('click', () => {
        const motelId = parseInt(btn.dataset.bookMotel);
        const suiteId = parseInt(btn.dataset.bookSuite);
        const motel = DATA.motels.find(m => m.id === motelId);
        const suite = motel.suites.find(s => s.id === suiteId);
        openResumo(motel, suite);
      });
    });
  }

  // =========================================================================
  // RENDER: FAVORITES
  // =========================================================================
  function renderFavorites() {
    const feed = document.getElementById('favorites-feed');
    if (!feed) return;

    if (state.favorites.size === 0) {
      feed.innerHTML = `
        <div class="py-20 text-center">
          <span class="material-symbols-outlined text-6xl text-on-surface-variant/20 mb-4 block">heart_broken</span>
          <p class="text-on-surface-variant font-bold">Nenhum favorito ainda</p>
          <p class="text-on-surface-variant/60 text-xs mt-1">Toque no coração de um motel para salvar aqui.</p>
        </div>`;
      return;
    }

    let html = '';
    DATA.motels.filter(m => state.favorites.has(m.id)).forEach(motel => {
      motel.suites.forEach(suite => {
        html += `
        <div class="suite-card-container transition-all">
          <div class="bg-white rounded-2xl overflow-hidden border border-outline-variant/5 shadow-sm">
            <div class="relative h-44 overflow-hidden">
              <img alt="${suite.name}" class="w-full h-full object-cover" src="${suite.image}" loading="lazy" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div class="absolute bottom-3 left-4 right-4 text-white">
                <p class="text-lg font-bold uppercase tracking-wider mb-0.5">${motel.name}</p>
                <h3 class="font-headline font-medium tracking-tight text-sm leading-tight opacity-90">${suite.name}</h3>
              </div>
              <button class="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white active:scale-90 transition-all" data-remove-fav="${motel.id}">
                <span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">favorite</span>
              </button>
            </div>
            <div class="p-4 flex justify-between items-center">
              <div>
                <span class="font-extrabold text-on-surface text-xl">R$ ${suite.price}</span>
                <span class="text-[10px] text-on-surface-variant font-bold uppercase tracking-wide ml-1">/ ${suite.duration}</span>
              </div>
              <button class="cta-gradient text-white font-bold px-5 py-2.5 rounded-lg text-sm active:scale-95 transition-transform shadow-lg shadow-primary/20" data-book-motel="${motel.id}" data-book-suite="${suite.id}">
                Reservar
              </button>
            </div>
          </div>
        </div>`;
      });
    });
    feed.innerHTML = html;

    // Bind events
    feed.querySelectorAll('[data-remove-fav]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.removeFav);
        state.favorites.delete(id);
        const card = btn.closest('.suite-card-container');
        card.classList.add('removing-item');
        setTimeout(() => renderFavorites(), 400);
      });
    });
    feed.querySelectorAll('[data-book-motel]').forEach(btn => {
      btn.addEventListener('click', () => {
        const motel = DATA.motels.find(m => m.id === parseInt(btn.dataset.bookMotel));
        const suite = motel.suites.find(s => s.id === parseInt(btn.dataset.bookSuite));
        openResumo(motel, suite);
      });
    });
  }

  // =========================================================================
  // RENDER: RESERVAS
  // =========================================================================
  function renderReservas() {
    const empty = document.getElementById('reservas-empty');
    const active = document.getElementById('reserva-ativa');
    const card = document.getElementById('reserva-ativa-card');
    const histFeed = document.getElementById('historico-feed');

    if (state.currentReservation) {
      empty.classList.add('hidden');
      active.classList.remove('hidden');
      const r = state.currentReservation;
      card.innerHTML = `
        <div class="relative h-44 overflow-hidden">
          <img alt="${r.suiteName}" class="w-full h-full object-cover" src="${r.image}" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <div class="absolute bottom-3 left-4 right-4 text-white">
            <p class="text-lg font-bold uppercase tracking-wider mb-0.5">${r.motelName}</p>
            <h3 class="font-headline font-medium tracking-tight text-sm leading-tight opacity-90">${r.suiteName}</h3>
          </div>
        </div>
        <div class="p-4">
          <div class="flex items-center gap-6 mt-2 text-on-surface">
            <div class="flex gap-2 items-center">
              <span class="material-symbols-outlined text-[20px] text-primary">calendar_today</span>
              <div class="flex flex-col">
                <span class="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider mb-0.5">DATA</span>
                <span class="text-sm font-bold uppercase tracking-tight">${r.date}</span>
              </div>
            </div>
            <div class="flex gap-2 items-center ml-auto">
              <span class="material-symbols-outlined text-[20px] text-primary">schedule</span>
              <div class="flex flex-col items-start">
                <span class="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider mb-0.5">HORARIO</span>
                <span class="text-sm font-bold uppercase tracking-tight">${r.time}</span>
              </div>
            </div>
          </div>
          <hr class="border-t border-outline-variant/30 my-4" />
          <div class="flex items-center justify-between">
            <div class="flex flex-col items-start">
              <span class="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider mb-0.5">VALOR TOTAL</span>
              <span class="font-extrabold text-on-surface text-3xl">R$ ${r.total.toFixed(2).replace('.', ',')}</span>
            </div>
            <button class="cta-gradient text-white font-headline font-bold px-6 py-3 rounded-lg text-sm transition-transform active:scale-95 shadow-lg shadow-primary/20">Ir agora</button>
          </div>
        </div>`;
    } else {
      empty.classList.remove('hidden');
      active.classList.add('hidden');
    }

    // History
    let histHtml = '';
    DATA.reservationHistory.forEach((r, idx) => {
      histHtml += `
        <div class="flex-none w-64 md:w-full bg-white rounded-xl overflow-hidden border border-outline-variant/5 shadow-sm flex flex-row items-stretch stagger-item" style="animation-delay:${idx * 0.07}s">
          <div class="relative w-24 h-24 shrink-0">
            <img alt="${r.motelName}" class="w-full h-full object-cover grayscale" src="${r.image}" loading="lazy" />
          </div>
          <div class="px-3 py-2 flex flex-col justify-center grow">
            <div class="flex justify-between items-baseline mb-0.5">
              <p class="text-xs text-on-surface font-bold uppercase tracking-wider">${r.motelName}</p>
              <span class="font-extrabold text-on-surface text-sm">R$ ${r.price}</span>
            </div>
            <h3 class="font-headline font-medium tracking-tight text-on-surface text-[10px] leading-tight line-clamp-1 opacity-80 mb-2">${r.suiteName}</h3>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-1">
                <span class="material-symbols-outlined text-[12px] text-on-surface-variant">calendar_today</span>
                <span class="text-[10px] font-bold text-on-surface-variant uppercase tracking-tight">${r.date}</span>
              </div>
              <span class="px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface-variant text-[8px] font-bold uppercase tracking-wider">${r.status}</span>
            </div>
          </div>
        </div>`;
    });
    histFeed.innerHTML = histHtml;
  }

  // =========================================================================
  // RENDER: PROFILE
  // =========================================================================
  function renderPerfil() {
    const loggedIn = document.getElementById('perfil-logged-in');
    const loggedOut = document.getElementById('perfil-logged-out');
    if (state.isLoggedIn) {
      loggedIn.classList.remove('hidden');
      loggedOut.classList.add('hidden');
    } else {
      loggedIn.classList.add('hidden');
      loggedOut.classList.remove('hidden');
    }
  }

  // =========================================================================
  // RENDER: CHAT LIST
  // =========================================================================
  function renderChatList() {
    const list = document.getElementById('chat-list');
    if (!list) return;
    let html = '';
    DATA.chats.forEach((chat, idx) => {
      html += `
        <div class="flex items-center gap-4 p-4 rounded-xl hover:bg-surface-container-low transition-colors cursor-pointer stagger-item" style="animation-delay:${idx * 0.06}s" data-open-chat="${chat.id}">
          <div class="relative flex-shrink-0">
            <img alt="${chat.motelName}" class="w-14 h-14 rounded-full object-cover border border-outline-variant" src="${chat.avatar}" loading="lazy" />
            ${chat.online ? '<div class="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-background rounded-full"></div>' : ''}
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex justify-between items-baseline mb-1">
              <h3 class="font-headline font-bold text-base truncate">${chat.motelName}</h3>
              <span class="text-xs text-on-surface-variant font-medium shrink-0 ml-2">${chat.time}</span>
            </div>
            <div class="flex justify-between items-center gap-2">
              <p class="text-sm text-on-surface-variant truncate">${chat.lastMessage}</p>
              ${chat.unread > 0 ? `<div class="w-5 h-5 bg-primary rounded-full flex items-center justify-center flex-shrink-0"><span class="text-[10px] text-white font-bold">${chat.unread}</span></div>` : ''}
            </div>
          </div>
        </div>`;
    });
    list.innerHTML = html;

    list.querySelectorAll('[data-open-chat]').forEach(el => {
      el.addEventListener('click', () => {
        state.currentChatId = parseInt(el.dataset.openChat);
        navigateTo('chat');
        renderChatMessages();
      });
    });
  }

  // =========================================================================
  // RENDER: CHAT MESSAGES
  // =========================================================================
  function renderChatMessages() {
    const chat = DATA.chats.find(c => c.id === state.currentChatId);
    if (!chat) return;

    document.getElementById('chat-avatar').src = chat.avatar;
    document.getElementById('chat-motel-name').textContent = chat.motelName;
    document.getElementById('chat-online-status').textContent = chat.online ? 'Online' : 'Offline';
    const dot = document.getElementById('chat-online-dot');
    if (chat.online) dot.classList.remove('hidden');
    else dot.classList.add('hidden');

    const area = document.getElementById('chat-messages');
    let html = '';
    chat.messages.forEach((msg, i) => {
      const delay = i * 0.04;
      if (msg.sender === 'user') {
        html += `
          <div class="flex justify-end chat-msg-anim" style="animation-delay:${delay}s">
            <div class="max-w-[80%] cta-gradient text-white p-3 rounded-2xl rounded-br-sm shadow-sm">
              <p class="text-sm leading-relaxed">${msg.text}</p>
            </div>
          </div>`;
      } else {
        html += `
          <div class="flex justify-start chat-msg-anim" style="animation-delay:${delay}s">
            <div class="max-w-[80%] bg-surface-container p-3 rounded-2xl rounded-bl-sm shadow-sm">
              <p class="text-sm leading-relaxed">${msg.text}</p>
            </div>
          </div>`;
      }
    });
    area.innerHTML = html;
    area.scrollTop = area.scrollHeight;
  }

  // =========================================================================
  // RENDER: CALENDAR
  // =========================================================================
  const MONTHS_PT = ['Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  function renderCalendar() {
    const label = document.getElementById('cal-month-label');
    const grid = document.getElementById('cal-days');
    if (!label || !grid) return;

    label.textContent = `${MONTHS_PT[state.calMonth]} ${state.calYear}`;

    const firstDay = new Date(state.calYear, state.calMonth, 1).getDay();
    const daysInMonth = new Date(state.calYear, state.calMonth + 1, 0).getDate();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let html = '';
    // Empty cells for days before the 1st
    for (let i = 0; i < firstDay; i++) {
      html += '<div class="p-2"></div>';
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(state.calYear, state.calMonth, d);
      const isPast = date < today;
      const isSelected = state.calSelectedDate && date.getTime() === state.calSelectedDate.getTime();
      const isToday = date.getTime() === today.getTime();

      let cls = 'p-2 text-sm font-bold rounded-full aspect-square flex items-center justify-center transition-all ';
      if (isSelected) {
        cls += 'bg-primary text-white shadow-lg shadow-primary/30';
      } else if (isPast) {
        cls += 'text-on-surface-variant/30 cursor-not-allowed';
      } else if (isToday) {
        cls += 'border-2 border-primary text-primary cursor-pointer hover:bg-primary/10';
      } else {
        cls += 'text-on-surface cursor-pointer hover:bg-on-background/5';
      }

      if (isPast) {
        html += `<div class="${cls}">${d}</div>`;
      } else {
        html += `<button class="${cls}" data-cal-day="${d}">${d}</button>`;
      }
    }
    grid.innerHTML = html;

    grid.querySelectorAll('[data-cal-day]').forEach(btn => {
      btn.addEventListener('click', () => {
        state.calSelectedDate = new Date(state.calYear, state.calMonth, parseInt(btn.dataset.calDay));
        renderCalendar();
      });
    });
  }

  // =========================================================================
  // RENDER: CITY LIST
  // =========================================================================
  function renderCityList() {
    const list = document.getElementById('city-list');
    if (!list) return;
    const current = document.getElementById('location-text').textContent;
    let html = '';
    DATA.cities.forEach(city => {
      const isSelected = city === current;
      html += `
        <button class="w-full flex justify-between items-center py-3 px-3 rounded-xl hover:bg-on-background/5 transition-all ${isSelected ? 'bg-primary/5' : ''}" data-select-city="${city}">
          <span class="font-bold text-sm ${isSelected ? 'text-primary' : 'text-on-surface'}">${city}</span>
          ${isSelected ? '<span class="material-symbols-outlined text-primary text-lg" style="font-variation-settings: \'FILL\' 1;">check_circle</span>' : '<span class="material-symbols-outlined text-outline-variant/30 text-lg">chevron_right</span>'}
        </button>`;
    });
    list.innerHTML = html;

    list.querySelectorAll('[data-select-city]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.getElementById('location-text').textContent = btn.dataset.selectCity;
        setTimeout(() => toggleLocationModal(), 150);
      });
    });
  }

  // =========================================================================
  // BOOKING FLOW
  // =========================================================================
  function openResumo(motel, suite) {
    state.bookingSuite = { motel, suite };
    const fee = 10;
    const total = suite.price + fee;
    const payNow = parseFloat((fee + suite.price * 0.05).toFixed(2));
    const payLocal = parseFloat((total - payNow).toFixed(2));

    document.getElementById('resumo-suite-image').src = suite.image;
    document.getElementById('resumo-motel-name').textContent = motel.name;
    document.getElementById('resumo-suite-name').textContent = suite.name;

    const now = new Date();
    const dateStr = now.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();
    document.getElementById('resumo-date').textContent = dateStr;
    document.getElementById('resumo-time').textContent = '22:00 - 01:00';

    document.getElementById('resumo-suite-price').textContent = `R$ ${suite.price},00`;
    document.getElementById('resumo-service-fee').textContent = `R$ ${fee},00`;
    document.getElementById('resumo-total-price').textContent = `R$ ${total},00`;
    document.getElementById('resumo-pay-now').textContent = `R$ ${payNow.toFixed(2).replace('.', ',')}`;
    document.getElementById('resumo-pay-local').textContent = `R$ ${payLocal.toFixed(2).replace('.', ',')}`;
    document.getElementById('payment-amount').textContent = `R$ ${payNow.toFixed(2).replace('.', ',')}`;
    document.getElementById('payment-total-display').textContent = `R$ ${payNow.toFixed(2).replace('.', ',')}`;

    // Reset checkbox and duration
    const cb = document.getElementById('check-policies');
    if (cb) cb.checked = false;
    const durSel = document.getElementById('resumo-duration-select');
    if (durSel) { durSel.value = '2'; }
    const durLbl = document.getElementById('resumo-duration-label');
    if (durLbl) durLbl.textContent = '2 Horas';

    navigateTo('resumo');
  }

  function completeBooking() {
    if (!state.bookingSuite) return;
    const { motel, suite } = state.bookingSuite;
    const durSel = document.getElementById('resumo-duration-select');
    const hours = durSel ? parseInt(durSel.value) : 2;
    const mult = DURATION_MULTIPLIERS[hours] || 1;
    const suitePrice = Math.round(suite.price * mult);
    const fee = 10;
    const total = suitePrice + fee;
    const now = new Date();
    const timeText = document.getElementById('resumo-time').textContent;

    state.currentReservation = {
      motelName: motel.name,
      suiteName: suite.name,
      image: suite.image,
      date: now.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase(),
      time: timeText,
      total: total,
    };

    // Close payment sheet, show success
    closeBottomSheet('payment-bottom-sheet', 'payment-sheet-content', 'payment-backdrop');
    showBookingSuccess();
  }

  function showBookingSuccess() {
    const overlay = document.getElementById('booking-success-overlay');
    overlay.classList.remove('hidden');
    overlay.style.display = 'flex';
  }

  // =========================================================================
  // PRICE RECALCULATION BY DURATION
  // =========================================================================
  // Multipliers: base price is for 2h. Each duration has a multiplier.
  const DURATION_MULTIPLIERS = {
    2: 1.0,
    3: 1.35,
    6: 2.2,
    12: 3.5,
    24: 4.5, // pernoite
  };

  function recalcResumoPrice(hours) {
    if (!state.bookingSuite) return;
    const { suite } = state.bookingSuite;
    const mult = DURATION_MULTIPLIERS[hours] || 1;
    const suitePrice = Math.round(suite.price * mult);
    const fee = 10;
    const total = suitePrice + fee;
    const payNow = parseFloat((fee + suitePrice * 0.05).toFixed(2));
    const payLocal = parseFloat((total - payNow).toFixed(2));

    document.getElementById('resumo-suite-price').textContent = `R$ ${suitePrice},00`;
    document.getElementById('resumo-service-fee').textContent = `R$ ${fee},00`;
    document.getElementById('resumo-total-price').textContent = `R$ ${total},00`;
    document.getElementById('resumo-pay-now').textContent = `R$ ${payNow.toFixed(2).replace('.', ',')}`;
    document.getElementById('resumo-pay-local').textContent = `R$ ${payLocal.toFixed(2).replace('.', ',')}`;
    document.getElementById('payment-amount').textContent = `R$ ${payNow.toFixed(2).replace('.', ',')}`;
    document.getElementById('payment-total-display').textContent = `R$ ${payNow.toFixed(2).replace('.', ',')}`;

    // Update time display based on duration
    const timeEl = document.getElementById('resumo-time');
    if (hours === 24) {
      timeEl.textContent = '20:00 - 12:00';
    } else {
      const start = 22;
      const end = (start + hours) % 24;
      timeEl.textContent = `${String(start).padStart(2, '0')}:00 - ${String(end).padStart(2, '0')}:00`;
    }
  }

  // =========================================================================
  // BOTTOM SHEET HELPERS
  // =========================================================================
  function openBottomSheet(modalId, contentSelector, backdropSelector) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => {
      const backdrop = modal.querySelector(backdropSelector || '.backdrop');
      if (backdrop) backdrop.style.opacity = '1';
      const content = modal.querySelector(contentSelector || '.bottom-sheet-content');
      if (content) content.style.transform = 'translateY(0)';
    });
  }

  function closeBottomSheet(modalId, contentId, backdropId) {
    const modal = document.getElementById(modalId);
    const content = document.getElementById(contentId) || modal.querySelector('.bottom-sheet-content');
    const backdrop = document.getElementById(backdropId) || modal.querySelector('.backdrop');
    if (backdrop) backdrop.style.opacity = '0';
    if (content) content.style.transform = 'translateY(100%)';
    setTimeout(() => {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }, 400);
  }

  // Profile sheets use a different pattern (translate-y-full on inner sheet)
  function toggleProfileSheet(overlayId, sheetId) {
    const overlay = document.getElementById(overlayId);
    const sheet = document.getElementById(sheetId);
    if (overlay.classList.contains('hidden')) {
      overlay.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => {
        overlay.style.opacity = '1';
        sheet.style.transform = 'translateY(0)';
      });
    } else {
      overlay.style.opacity = '0';
      sheet.style.transform = 'translateY(100%)';
      setTimeout(() => {
        overlay.classList.add('hidden');
        document.body.style.overflow = '';
      }, 300);
    }
  }

  // =========================================================================
  // GLOBAL TOGGLE FUNCTIONS (called from HTML onclick)
  // =========================================================================
  window.toggleFilters = function () {
    const modal = document.getElementById('filters-modal');
    if (modal.classList.contains('hidden')) {
      openBottomSheet('filters-modal');
    } else {
      closeBottomSheet('filters-modal');
    }
  };

  window.toggleLocationModal = function () {
    const modal = document.getElementById('location-modal');
    if (modal.classList.contains('hidden')) {
      renderCityList();
      openBottomSheet('location-modal');
    } else {
      closeBottomSheet('location-modal');
    }
  };

  window.toggleScheduleModal = function () {
    const modal = document.getElementById('schedule-modal');
    if (modal.classList.contains('hidden')) {
      renderCalendar();
      openBottomSheet('schedule-modal');
    } else {
      closeBottomSheet('schedule-modal');
    }
  };

  window.toggleLogoutSheet = function () {
    toggleProfileSheet('logout-overlay', 'logout-sheet');
  };

  window.toggleReviewsSheet = function () {
    toggleProfileSheet('reviews-overlay', 'reviews-sheet');
  };

  window.toggleCardsSheet = function () {
    toggleProfileSheet('cards-overlay', 'cards-sheet');
  };

  window.toggleAccountSheet = function () {
    toggleProfileSheet('account-overlay', 'account-sheet');
  };

  window.showAddCardForm = function () {
    document.getElementById('cards-list-view').classList.add('hidden');
    document.getElementById('cards-form-view').classList.remove('hidden');
    document.getElementById('cards-sheet-title').textContent = 'Adicionar Cartao';
  };

  window.hideAddCardForm = function () {
    document.getElementById('cards-list-view').classList.remove('hidden');
    document.getElementById('cards-form-view').classList.add('hidden');
    document.getElementById('cards-sheet-title').textContent = 'Meus cartoes';
  };

  window.switchReviewsTab = function (tab) {
    const feitas = document.getElementById('reviews-list-feitas');
    const pendentes = document.getElementById('reviews-list-pendentes');
    const btnF = document.getElementById('btn-tab-feitas');
    const btnP = document.getElementById('btn-tab-pendentes');
    if (tab === 'feitas') {
      feitas.classList.remove('hidden');
      pendentes.classList.add('hidden');
      btnF.classList.add('bg-primary', 'text-white', 'shadow-sm');
      btnF.classList.remove('text-on-surface-variant', 'hover:bg-white/50');
      btnP.classList.remove('bg-primary', 'text-white', 'shadow-sm');
      btnP.classList.add('text-on-surface-variant', 'hover:bg-white/50');
    } else {
      feitas.classList.add('hidden');
      pendentes.classList.remove('hidden');
      btnP.classList.add('bg-primary', 'text-white', 'shadow-sm');
      btnP.classList.remove('text-on-surface-variant', 'hover:bg-white/50');
      btnF.classList.remove('bg-primary', 'text-white', 'shadow-sm');
      btnF.classList.add('text-on-surface-variant', 'hover:bg-white/50');
    }
  };

  // =========================================================================
  // INIT & EVENT BINDING
  // =========================================================================
  function init() {
    // Route from hash
    const hash = window.location.hash.replace('#', '') || 'home';
    navigateTo(hash, false);

    // Navigation links
    document.querySelectorAll('[data-page]').forEach(el => {
      el.addEventListener('click', e => {
        e.preventDefault();
        navigateTo(el.dataset.page);
      });
    });

    // Back buttons
    document.querySelectorAll('[data-back]').forEach(btn => {
      btn.addEventListener('click', goBack);
    });

    // Greeting based on time
    const hour = new Date().getHours();
    let greeting = 'Bom dia';
    if (hour >= 12 && hour < 18) greeting = 'Boa tarde';
    else if (hour >= 18 || hour < 6) greeting = 'Boa noite';
    const greetEl = document.getElementById('greeting-text');
    if (greetEl) greetEl.textContent = `${greeting}, ${DATA.user.name}`;

    // Home scroll behavior
    const homeHeader = document.getElementById('home-header');
    window.addEventListener('scroll', () => {
      if (document.getElementById('page-home').classList.contains('active')) {
        if (window.scrollY > 30) {
          homeHeader.classList.add('scrolled-header');
        } else {
          homeHeader.classList.remove('scrolled-header', 'mini-search-active');
        }
      }
    });

    // Mini search button
    const miniBtn = document.getElementById('mini-search-btn');
    if (miniBtn) {
      miniBtn.addEventListener('click', () => {
        homeHeader.classList.toggle('mini-search-active');
      });
    }

    // Filter chips toggle
    document.querySelectorAll('#filter-chips .filter-chip').forEach((chip, i) => {
      if (i === 0) return; // Skip "Filtros" button
      chip.addEventListener('click', () => chip.classList.toggle('active'));
    });

    // FAQ accordion
    document.querySelectorAll('.faq-item button').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const content = item.querySelector('.faq-content');
        const icon = btn.querySelector('.rotate-icon');
        const isOpen = content.style.maxHeight && content.style.maxHeight !== '0px';

        // Close all
        document.querySelectorAll('.faq-content').forEach(c => {
          c.style.maxHeight = '0px';
          c.parentElement.querySelector('.rotate-icon').style.transform = 'rotate(0deg)';
        });

        if (!isOpen) {
          content.style.maxHeight = content.scrollHeight + 'px';
          icon.style.transform = 'rotate(90deg)';
        }
      });
    });

    // Chat send message
    const chatInput = document.getElementById('chat-input');
    const chatSendBtn = document.getElementById('chat-send-btn');
    if (chatSendBtn && chatInput) {
      const sendMessage = () => {
        const text = chatInput.value.trim();
        if (!text) return;
        const chat = DATA.chats.find(c => c.id === state.currentChatId);
        if (!chat) return;
        chat.messages.push({ sender: 'user', text });
        chatInput.value = '';
        renderChatMessages();

        // Show typing indicator, then auto-reply
        const area = document.getElementById('chat-messages');
        const typingEl = document.createElement('div');
        typingEl.className = 'flex justify-start chat-msg-anim';
        typingEl.innerHTML = '<div class="max-w-[80%] bg-surface-container p-3 rounded-2xl rounded-bl-sm shadow-sm flex items-center gap-1.5"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div>';
        area.appendChild(typingEl);
        area.scrollTop = area.scrollHeight;

        setTimeout(() => {
          typingEl.remove();
          const replies = [
            'Obrigado pela mensagem! Vou verificar e te retorno em breve.',
            'Entendido! Posso ajudar com mais alguma coisa?',
            'Perfeito! Sua solicitacao foi registrada.',
            'Certo! Qualquer duvida estamos a disposicao.',
          ];
          chat.messages.push({ sender: 'motel', text: replies[Math.floor(Math.random() * replies.length)] });
          renderChatMessages();
        }, 1200);
      };
      chatSendBtn.addEventListener('click', sendMessage);
      chatInput.addEventListener('keypress', e => { if (e.key === 'Enter') sendMessage(); });
    }

    // Chat kebab menu
    const kebabBtn = document.getElementById('chat-kebab-btn');
    const kebabMenu = document.getElementById('chat-kebab-menu');
    if (kebabBtn && kebabMenu) {
      kebabBtn.addEventListener('click', () => kebabMenu.classList.toggle('hidden'));
      document.addEventListener('click', e => {
        if (!kebabBtn.contains(e.target) && !kebabMenu.contains(e.target)) {
          kebabMenu.classList.add('hidden');
        }
      });
    }

    // Reservation summary - duration selector sync with price recalc
    const durSelect = document.getElementById('resumo-duration-select');
    const durLabel = document.getElementById('resumo-duration-label');
    if (durSelect && durLabel) {
      durSelect.addEventListener('change', () => {
        durLabel.textContent = durSelect.options[durSelect.selectedIndex].text;
        recalcResumoPrice(parseInt(durSelect.value));
      });
    }

    // Confirm reservation -> open payment sheet
    const confirmResBtn = document.getElementById('confirm-reservation-btn');
    if (confirmResBtn) {
      confirmResBtn.addEventListener('click', () => {
        const cb = document.getElementById('check-policies');
        if (!cb.checked) {
          cb.focus();
          cb.parentElement.parentElement.classList.add('animate-pulse');
          setTimeout(() => cb.parentElement.parentElement.classList.remove('animate-pulse'), 1000);
          return;
        }
        openBottomSheet('payment-bottom-sheet');
      });
    }

    // Payment method radio styling
    document.querySelectorAll('input[name="payment-method"]').forEach(radio => {
      radio.addEventListener('change', () => {
        document.querySelectorAll('input[name="payment-method"]').forEach(r => {
          const label = r.closest('label');
          if (r.checked) {
            label.classList.remove('border-outline-variant');
            label.classList.add('border-primary', 'bg-primary/5');
          } else {
            label.classList.add('border-outline-variant');
            label.classList.remove('border-primary', 'bg-primary/5');
          }
        });
      });
    });

    // Confirm payment
    const confirmPayBtn = document.getElementById('confirm-payment-btn');
    if (confirmPayBtn) {
      confirmPayBtn.addEventListener('click', completeBooking);
    }

    // Booking success close
    const successClose = document.getElementById('booking-success-close');
    if (successClose) {
      successClose.addEventListener('click', () => {
        document.getElementById('booking-success-overlay').classList.add('hidden');
        document.getElementById('booking-success-overlay').style.display = 'none';
        navigateTo('reservas');
      });
    }

    // Logout
    const logoutBtn = document.getElementById('logout-confirm-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        state.isLoggedIn = false;
        toggleLogoutSheet();
        renderPerfil();
      });
    }

    // Login
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
      loginBtn.addEventListener('click', () => {
        state.isLoggedIn = true;
        renderPerfil();
      });
    }

    // Price slider
    const minPrice = document.getElementById('min-price');
    const maxPrice = document.getElementById('max-price');
    const priceLabel = document.getElementById('price-label');
    const sliderHL = document.getElementById('slider-highlight');
    function updatePriceSlider() {
      if (!minPrice || !maxPrice) return;
      let mn = parseInt(minPrice.value), mx = parseInt(maxPrice.value);
      if (mn > mx) { let t = mn; mn = mx; mx = t; }
      const lp = (mn / 1000) * 100, rp = 100 - (mx / 1000) * 100;
      sliderHL.style.left = lp + '%';
      sliderHL.style.right = rp + '%';
      priceLabel.textContent = `R$ ${mn} - R$ ${mx >= 1000 ? '1000+' : mx}`;
    }
    if (minPrice) minPrice.addEventListener('input', updatePriceSlider);
    if (maxPrice) maxPrice.addEventListener('input', updatePriceSlider);

    // Distance slider
    const distSlider = document.getElementById('distance-slider');
    const distLabel = document.getElementById('distance-label');
    const distHL = document.getElementById('distance-slider-highlight');
    function updateDistSlider() {
      if (!distSlider) return;
      const v = parseInt(distSlider.value);
      const p = (v / 50) * 100;
      distHL.style.right = (100 - p) + '%';
      distLabel.textContent = `0 km - ${v >= 50 ? '50 km+' : v + ' km'}`;
    }
    if (distSlider) distSlider.addEventListener('input', updateDistSlider);

    // Calendar nav
    const calPrev = document.getElementById('cal-prev');
    const calNext = document.getElementById('cal-next');
    if (calPrev) {
      calPrev.addEventListener('click', () => {
        state.calMonth--;
        if (state.calMonth < 0) { state.calMonth = 11; state.calYear--; }
        renderCalendar();
      });
    }
    if (calNext) {
      calNext.addEventListener('click', () => {
        state.calMonth++;
        if (state.calMonth > 11) { state.calMonth = 0; state.calYear++; }
        renderCalendar();
      });
    }

    // Schedule type toggle
    const typePeriodo = document.getElementById('type-periodo');
    const typeDiaria = document.getElementById('type-diaria');
    const timeSection = document.getElementById('schedule-time-section');
    if (typePeriodo && typeDiaria) {
      typePeriodo.addEventListener('click', () => {
        typePeriodo.classList.add('bg-primary', 'text-white', 'shadow-sm');
        typePeriodo.classList.remove('text-on-surface-variant');
        typeDiaria.classList.remove('bg-primary', 'text-white', 'shadow-sm');
        typeDiaria.classList.add('text-on-surface-variant');
        if (timeSection) timeSection.style.opacity = '1';
        if (timeSection) timeSection.style.pointerEvents = 'auto';
      });
      typeDiaria.addEventListener('click', () => {
        typeDiaria.classList.add('bg-primary', 'text-white', 'shadow-sm');
        typeDiaria.classList.remove('text-on-surface-variant');
        typePeriodo.classList.remove('bg-primary', 'text-white', 'shadow-sm');
        typePeriodo.classList.add('text-on-surface-variant');
        if (timeSection) timeSection.style.opacity = '0.4';
        if (timeSection) timeSection.style.pointerEvents = 'none';
      });
    }

    // Mode toggle (ir agora / ir outro dia)
    const modeAgora = document.getElementById('mode-ir-agora');
    const modeOutro = document.getElementById('mode-ir-outro-dia');
    if (modeAgora) {
      modeAgora.addEventListener('click', () => {
        modeAgora.classList.add('cta-gradient', 'text-white', 'shadow-sm');
        modeAgora.classList.remove('bg-surface-container-low', 'border', 'border-outline-variant/20', 'text-on-surface-variant');
        modeOutro.classList.remove('cta-gradient', 'text-white', 'shadow-sm');
        modeOutro.classList.add('bg-surface-container-low', 'border', 'border-outline-variant/20', 'text-on-surface-variant');
      });
    }

    // Hash change
    window.addEventListener('hashchange', () => {
      const h = window.location.hash.replace('#', '') || 'home';
      navigateTo(h, false);
    });

    // Payment backdrop close
    const payBackdrop = document.getElementById('payment-backdrop');
    if (payBackdrop) {
      payBackdrop.addEventListener('click', () => {
        closeBottomSheet('payment-bottom-sheet', 'payment-sheet-content', 'payment-backdrop');
      });
    }
  }

  // =========================================================================
  // BOOT
  // =========================================================================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
