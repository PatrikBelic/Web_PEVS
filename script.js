/* ===== GALERIA ===== */
const galItems = [
    { l: 'Obrazok 1', c: 'priroda',  bg: '#7c3aed' },
    { l: 'Obrazok 2', c: 'priroda',  bg: '#0891b2' },
    { l: 'Obrazok 3', c: 'priroda',  bg: '#0284c7' },
    { l: 'Obrazok 4', c: 'priroda',  bg: '#db2777' },
    { l: 'Obrazok 5', c: 'mesto',    bg: '#1d4ed8' },
    { l: 'Obrazok 6', c: 'mesto',    bg: '#374151' },
    { l: 'Obrazok 7', c: 'mesto',    bg: '#6b7280' },
    { l: 'Obrazok 8', c: 'zvierata', bg: '#b45309' },
    { l: 'Obrazok 9', c: 'zvierata', bg: '#7c3aed' },
];

function buildGal(filter) {
    const grid = document.getElementById('galGrid');
    grid.innerHTML = '';

    const filtered = filter === 'all'
        ? galItems
        : galItems.filter(item => item.c === filter);

    filtered.forEach(item => {
        const div = document.createElement('div');
        div.className = 'gal-item';
        div.style.background = item.bg + '22';
        div.style.border = '1px solid ' + item.bg + '44';
        div.innerHTML = `
      <div style="width:100%;height:100%;background:${item.bg}"></div>
      <div class="overlay-label">${item.l}</div>
    `;
        div.addEventListener('click', () => openLightbox(item));
        grid.appendChild(div);
    });
}

function filterGal(filter, btn) {
    document.querySelectorAll('.gf-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    buildGal(filter);
}

function openLightbox(item) {
    document.getElementById('lbBox').style.background = item.bg;
    document.getElementById('lbBox').textContent = item.l;
    document.getElementById('lbTitle').textContent = item.l;
    document.getElementById('lbCat').textContent = item.c;
    document.getElementById('lb').classList.add('open');
}

function closeLightbox() {
    document.getElementById('lb').classList.remove('open');
}

// Inicializácia galérie pri načítaní stránky
buildGal('all');

/* ===== VALIDÁCIA FORMULÁRA ===== */
function doSubmit() {
    let valid = true;

    // Pomocná funkcia: nastaví alebo odstráni chybový stav
    function check(fieldId, groupId, condition) {
        const group = document.getElementById(groupId);
        group.classList.toggle('err', !condition);
        if (!condition) valid = false;
    }

    const name = document.getElementById('f-name').value.trim();
    check('f-name', 'fr-name', name.length >= 3);

    const email = document.getElementById('f-email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    check('f-email', 'fr-email', emailRegex.test(email));

    const subject = document.getElementById('f-subject').value;
    check('f-subject', 'fr-subject', subject !== '');

    const gender = document.querySelector('input[name="g"]:checked');
    check(null, 'fr-gender', gender !== null);

    const agree = document.getElementById('f-agree').checked;
    check(null, 'fr-agree', agree);

    const msg = document.getElementById('f-msg').value.trim();
    check('f-msg', 'fr-msg', msg.length >= 10);

    if (valid) {
        const toast = document.getElementById('toast');
        toast.style.display = 'block';
        setTimeout(() => { toast.style.display = 'none'; }, 3000);
    }
}

/* ===== AJAX / JSON TABUĽKA ===== */

// Simulovaný JSON súbor s projektmi (nesting level 3+)
const jsonData = {
    projekty: [
        { id: 1, name: 'Lorem ipsum projekt',   autor: { meno: 'Lorem', priezvisko: 'Ipsum', kontakt: { email: 'lorem@email.com' } }, rok: 2025, kat: 'web',    h: 5 },
        { id: 2, name: 'Dolor sit amet app',    autor: { meno: 'Dolor', priezvisko: 'Sit',   kontakt: { email: 'dolor@email.com' } }, rok: 2025, kat: 'mobile', h: 4 },
        { id: 3, name: 'Consectetur dizajn',    autor: { meno: 'Conse', priezvisko: 'Ctet',  kontakt: { email: 'con@email.com'   } }, rok: 2024, kat: 'design', h: 5 },
        { id: 4, name: 'Adipiscing web stranka',autor: { meno: 'Adip',  priezvisko: 'Cing',  kontakt: { email: 'adip@email.com'  } }, rok: 2025, kat: 'web',    h: 3 },
        { id: 5, name: 'Sed do eiusmod mobile', autor: { meno: 'Sed',   priezvisko: 'Do',    kontakt: { email: 'sed@email.com'   } }, rok: 2024, kat: 'mobile', h: 4 },
        { id: 6, name: 'Tempor incididunt logo',autor: { meno: 'Temp',  priezvisko: 'Or',    kontakt: { email: 'temp@email.com'  } }, rok: 2026, kat: 'design', h: 5 },
    ]
};

function loadTable(filter, btn) {
    // Nastav aktívny tab
    document.querySelectorAll('.dtab').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    // Zobraz loading stav
    document.getElementById('dataWrap').innerHTML = '<div class="load-bar">Načítavam dáta...</div>';

    // Simulácia asynchrónneho AJAX volania (setTimeout = fetch delay)
    setTimeout(() => {
        const data = filter === 'all'
            ? jsonData.projekty
            : jsonData.projekty.filter(p => p.kat === filter);

        const rows = data.map(p => `
      <tr>
        <td style="color:#888">${p.id}</td>
        <td style="font-weight:500">${p.name}</td>
        <td style="color:#888">${p.autor.meno} ${p.autor.priezvisko}</td>
        <td>${p.rok}</td>
        <td><span class="pill ${p.kat}">${p.kat}</span></td>
        <td class="stars">${'★'.repeat(p.h)}${'☆'.repeat(5 - p.h)}</td>
      </tr>
    `).join('');

        document.getElementById('dataWrap').innerHTML = `
      <table class="data-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Projekt</th>
            <th>Autor</th>
            <th>Rok</th>
            <th>Kategória</th>
            <th>Hodnotenie</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    `;
    }, 500);
}