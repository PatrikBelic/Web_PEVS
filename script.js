// Zoznam obrázkov – každý má názov, kategóriu a farbu pozadia
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

// Vykreslí galériu – ak je filter 'all', zobrazí všetky
function buildGal(filter) {
    const grid = document.getElementById('galGrid');
    if (!grid) return; // galéria nie je na tejto stránke

    grid.innerHTML = '';

    // Filtrujeme podľa kategórie
    const filtered = filter === 'all'
        ? galItems
        : galItems.filter(item => item.c === filter);

    // Vytvoríme HTML element pre každý obrázok
    filtered.forEach(item => {
        const div = document.createElement('div');
        div.className = 'gal-item';
        div.style.background = item.bg;
        div.innerHTML = `<div class="overlay-label">${item.l}</div>`;
        div.addEventListener('click', () => openLightbox(item));
        grid.appendChild(div);
    });
}

// Prepne aktívny filter a znovu vykreslí galériu
function filterGal(filter, btn) {
    document.querySelectorAll('.gf-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    buildGal(filter);
}

// Otvorí lightbox s detailom obrázka
function openLightbox(item) {
    document.getElementById('lbBox').style.background = item.bg;
    document.getElementById('lbBox').textContent = item.l;
    document.getElementById('lbTitle').textContent = item.l;
    document.getElementById('lbCat').textContent = item.c;
    document.getElementById('lb').classList.add('open');
}

// Zatvorí lightbox
function closeLightbox() {
    document.getElementById('lb').classList.remove('open');
}

// Spustí galériu pri načítaní stránky
buildGal('all');


/* ===========================
   VALIDÁCIA FORMULÁRA
   =========================== */

function doSubmit() {
    let valid = true;

    // Pomocná funkcia – pridá alebo odoberie chybovú triedu
    function check(groupId, condition) {
        document.getElementById(groupId).classList.toggle('err', !condition);
        if (!condition) valid = false;
    }

    // Overíme každé pole
    check('fr-name',    document.getElementById('f-name').value.trim().length >= 3);
    check('fr-email',   /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(document.getElementById('f-email').value.trim()));
    check('fr-subject', document.getElementById('f-subject').value !== '');
    check('fr-gender',  document.querySelector('input[name="g"]:checked') !== null);
    check('fr-agree',   document.getElementById('f-agree').checked);
    check('fr-msg',     document.getElementById('f-msg').value.trim().length >= 10);

    // Ak sú všetky polia správne, zobrazíme toast notifikáciu
    if (valid) {
        const toast = document.getElementById('toast');
        toast.style.display = 'block';
        setTimeout(() => { toast.style.display = 'none'; }, 3000);
    }
}


/* ===========================
   TABUĽKA PROJEKTOV (simulovaný AJAX)
   =========================== */

// Dáta o projektoch – simulujú odpoveď zo servera
const jsonData = {
    projekty: [
        { id: 1, name: 'Lorem ipsum projekt',    autor: { meno: 'Lorem', priezvisko: 'Ipsum' }, rok: 2025, kat: 'web',    h: 5 },
        { id: 2, name: 'Dolor sit amet app',     autor: { meno: 'Dolor', priezvisko: 'Sit'   }, rok: 2025, kat: 'mobile', h: 4 },
        { id: 3, name: 'Consectetur dizajn',     autor: { meno: 'Conse', priezvisko: 'Ctet'  }, rok: 2024, kat: 'design', h: 5 },
        { id: 4, name: 'Adipiscing web stranka', autor: { meno: 'Adip',  priezvisko: 'Cing'  }, rok: 2025, kat: 'web',    h: 3 },
        { id: 5, name: 'Sed do eiusmod mobile',  autor: { meno: 'Sed',   priezvisko: 'Do'    }, rok: 2024, kat: 'mobile', h: 4 },
        { id: 6, name: 'Tempor incididunt logo', autor: { meno: 'Temp',  priezvisko: 'Or'    }, rok: 2026, kat: 'design', h: 5 },
    ]
};

// Načíta a zobrazí tabuľku – voliteľne filtruje podľa kategórie
function loadTable(filter, btn) {
    // Nastav aktívny tab
    document.querySelectorAll('.dtab').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    // Zobraz správu kým sa "načítavajú" dáta
    document.getElementById('dataWrap').innerHTML = '<div class="load-bar">Načítavam dáta...</div>';

    // setTimeout simuluje oneskorenie ako pri reálnom AJAX volaní
    setTimeout(() => {
        const data = filter === 'all'
            ? jsonData.projekty
            : jsonData.projekty.filter(p => p.kat === filter);

        // Vytvoríme riadky tabuľky
        const rows = data.map(p => `
            <tr>
                <td style="color:#888">${p.id}</td>
                <td>${p.name}</td>
                <td style="color:#888">${p.autor.meno} ${p.autor.priezvisko}</td>
                <td>${p.rok}</td>
                <td><span class="pill ${p.kat}">${p.kat}</span></td>
                <td class="stars">${'★'.repeat(p.h)}${'☆'.repeat(5 - p.h)}</td>
            </tr>
        `).join('');

        // Vložíme tabuľku do stránky
        document.getElementById('dataWrap').innerHTML = `
            <table class="data-table">
                <thead>
                    <tr>
                        <th>#</th><th>Projekt</th><th>Autor</th>
                        <th>Rok</th><th>Kategória</th><th>Hodnotenie</th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
        `;
    }, 500);
}