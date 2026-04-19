/* ===========================
   GALERIA
   =========================== */

// zoznam obrazkov - kazdy ma nazov, kategoriu a farbu
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

// vykresli galerii - filter 'all' zobrazi vsetko
function buildGal(filter) {
    const grid = document.getElementById('galGrid');
    if (!grid) return; // galeria nie je na tejto stranke

    grid.innerHTML = '';

    const filtered = filter === 'all'
        ? galItems
        : galItems.filter(item => item.c === filter);

    filtered.forEach(function(item) {
        const a = document.createElement('a');
        // GLightbox pouziva href a data atributy
        a.href = '#';
        a.className = 'gal-item glightbox';
        a.setAttribute('data-gallery', 'galeria');
        a.setAttribute('data-title', item.l);
        a.setAttribute('data-description', 'Kategoria: ' + item.c);
        a.style.backgroundColor = item.bg;

        a.innerHTML = '<div class="overlay-label">' + item.l + '</div>';
        grid.appendChild(a);
    });

    // inicializuj GLightbox po vykresleni obrazkov
    GLightbox({ selector: '.glightbox' });
}

// prepne aktivny filter a znovu vykresli galerii
function filterGal(filter, btn) {
    document.querySelectorAll('.gf-btn').forEach(function(b) {
        b.classList.remove('active');
    });
    btn.classList.add('active');
    buildGal(filter);
}

// spusti galerii pri nacitani stranky
buildGal('all');


/* ===========================
   VALIDACIA FORMULARA
   =========================== */

function doSubmit() {
    let valid = true;

    // pomocna funkcia - prida alebo odoba chybovu triedu
    function check(groupId, condition) {
        document.getElementById(groupId).classList.toggle('err', !condition);
        if (!condition) valid = false;
    }

    // overime kazde pole formulara
    check('fr-name',    document.getElementById('f-name').value.trim().length >= 3);
    check('fr-email',   /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(document.getElementById('f-email').value.trim()));
    check('fr-subject', document.getElementById('f-subject').value !== '');
    check('fr-gender',  document.querySelector('input[name="g"]:checked') !== null);
    check('fr-agree',   document.getElementById('f-agree').checked);
    check('fr-msg',     document.getElementById('f-msg').value.trim().length >= 10);

    // ak su vsetky polia spravne, zobrazime oznamenie
    if (valid) {
        const toast = document.getElementById('toast');
        toast.style.display = 'block';
        setTimeout(function() {
            toast.style.display = 'none';
        }, 3000);
    }
}


/* ===========================
   AJAX - nacitanie dat zo suboru
   =========================== */

// nacita tabulku projektov zo suboru data.json pomocou fetch
function loadTable(filter, btn) {
    // nastav aktivny tab
    document.querySelectorAll('.dtab').forEach(function(b) {
        b.classList.remove('active');
    });
    if (btn) btn.classList.add('active');

    // zobraz nacitavaci text
    document.getElementById('dataWrap').innerHTML = '<div class="load-bar">Načítavam dáta...</div>';

    // fetch asynchrnne nacita data.json zo servera
    fetch('data.json')
        .then(function(response) {
            // skontrolujeme ci server odpovedal uspesne
            if (!response.ok) {
                throw new Error('Chyba pri nacitani suboru');
            }
            return response.json();
        })
        .then(function(data) {
            // filtrujeme projekty podla kategorie
            const projekty = filter === 'all'
                ? data.projekty
                : data.projekty.filter(function(p) { return p.kat === filter; });

            // vytvorime riadky tabulky
            const rows = projekty.map(function(p) {
                return '<tr>' +
                    '<td style="color:#888">' + p.id + '</td>' +
                    '<td>' + p.name + '</td>' +
                    '<td style="color:#888">' + p.autor.meno + ' ' + p.autor.priezvisko + '</td>' +
                    '<td>' + p.rok + '</td>' +
                    '<td><span class="pill ' + p.kat + '">' + p.kat + '</span></td>' +
                    '<td class="stars">' + '★'.repeat(p.hodnotenie) + '☆'.repeat(5 - p.hodnotenie) + '</td>' +
                    '</tr>';
            }).join('');

            // vlozime tabulku do stranky
            document.getElementById('dataWrap').innerHTML =
                '<table class="data-table">' +
                '<thead><tr>' +
                '<th>#</th><th>Projekt</th><th>Autor</th>' +
                '<th>Rok</th><th>Kategória</th><th>Hodnotenie</th>' +
                '</tr></thead>' +
                '<tbody>' + rows + '</tbody>' +
                '</table>';
        })
        .catch(function(error) {
            // ak nastane chyba, zobrazime spravu
            document.getElementById('dataWrap').innerHTML = '<div class="load-bar">Chyba: ' + error.message + '</div>';
        });
}