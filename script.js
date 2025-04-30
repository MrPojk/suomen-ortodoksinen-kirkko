document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname.split('/').pop();

    const buttons = document.querySelectorAll('nav button');
    buttons.forEach(button => {
        const btnId = button.id;
        const page = btnId.replace('btn-', '') + '.html';
        if (page === currentPath || (page === 'home.html' && currentPath === 'index.html')) {
            button.classList.add('active');
        }
    });

    document.getElementById('btn-home').addEventListener('click', () => {
        window.location.href = 'index.html';
    });
    document.getElementById('btn-about').addEventListener('click', () => {
        window.location.href = 'about.html';
    });
    document.getElementById('btn-history').addEventListener('click', () => {
        window.location.href = 'history.html';
    });
    document.getElementById('btn-ylosnousemuksen').addEventListener('click', () => {
        window.location.href = 'ylosnousemuksen-kirkko.html';
    });
    document.getElementById('btn-beliefs').addEventListener('click', () => {
        window.location.href = 'beliefs.html';
    });
    document.getElementById('btn-churches').addEventListener('click', () => {
        window.location.href = 'churches.html';
    });
    document.getElementById('btn-contact').addEventListener('click', () => {
        window.location.href = 'contact.html';
    });

    const searchIndex = [
        {
            title: "Suomen ortodoksisen kirkon sivusto",
            url: "index.html",
            content: "Tämä sivusto tarjoaa tietoa uskonnoista, uskomuksista ja historiasta Suomen ortodokisesta kirkosta."
        },
        {
            title: "Tietoa Suomen ortodoksisesta kirkosta",
            url: "about.html",
            content: "Suomen ortodoksinen kirkko on kuulunut vuodesta 1923 asti autonomisena eli itsehallinnollisena kirkkona Konstantinopolin ekumeenisen patriarkaatin alaisuuteen. Patriarkaatin päämies on ekumeeninen patriarkka Bartolomeos I, joka on astunut virkaansa vuonna 1991. Kirkolla on virallinen asema Suomen lainsäädännössä ja sillä on oikeus kerätä kirkollisveroa. Kirkossa on kolme hiippakuntaa, kokojärjestyksessä Helsingin hiippakunta, Kuopion ja Karjalan hiippakunta ja Oulun hiippakunta. Koko kirkkoa ja Helsingin hiippakuntaa johtaa Helsingin ja koko Suomen arkkipiispa Elia."
        },
        {
            title: "Ortodoksisen kristinuskon uskomukset",
            url: "beliefs.html",
            content: "Keskeiset uskomukset: Pyhä kolminaisuus: Isä, Poika ja Pyhä Henki, Jeesuksen Kristuksen inkarnaatio, Ylösnousemus ja iankaikkinen elämä, Pyhän perinteen ja sakramenttien merkitys, Kuvien kunnioitus, Ekumeenisten kirkolliskokousten auktoriteetti."
        },
        {
            title: "Suomen ortodoksisen kirkon historia",
            url: "history.html",
            content: "Ortodoksisuus on saapunut Suomeen idästä. Kiovaan perustettiin piispanistuin 990-luvulla ja sieltä ortodoksinen kristillisyys levisi sekä pohjoiseen että itään. Suomen kirkollinen hallinto järjestettiin ensin osana Pietarin hiippakuntaa. Vuonna 1892 perustettiin itsenäinen Suomen ja Viipurin arkkipiispanistuin. Kirkon suomalaistaminen käynnistyi ripeästi. Sotien jälkeen jäsenmäärä pieneni vuoteen 1990 asti, jonka jälkeen alkoi uusi kasvun aika."
        },
        {
            title: "Suomen ortodoksisen kirkon seurakunnat",
            url: "churches.html",
            content: "Tässä ovat kaikki Suomen ortodoksiset seurakunnat: Helsingin ortodoksinen seurakunta, Turun ortodoksinen seurakunta, Kaakkois-Suomen ortodoksinen seurakunta, Kuopion ortodoksinen seurakunta, Joensuun ortodoksinen seurakunta, Ilomantsin ortodoksinen kappeliseurakunta, Jyväskylän ortodoksinen seurakunta, Taipaleen ortodoksinen seurakunta, Nurmeksen ortodoksinen kappeliseurakunta, Saimaan ortodoksinen seurakunta, Pohjois-Suomen ortodoksinen seurakunta, Lapin ortodoksinen kappeliseurakunta, Kainuun ortodoksinen kappeliseurakunta, Tampereen ortodoksinen seurakunta, Vaasan ortodoksinen kappeliseurakunta."
        },
        {
            title: "Yhteystiedot - Suomen ortodoksinen kirkko",
            url: "contact.html",
            content: "Jos sinulla on kysyttävää tai haluat lisätietoja, ota yhteyttä: Sähköposti: asiakaspalvelu.helsinki@ort.fi, Puhelin: 09 85 646 100, Osoite: Liisankatu 29 A 1, 00170 Helsinki."
        }
    ];

    function performSearch(query) {
        const resultsContainer = document.getElementById('search-results');
        resultsContainer.innerHTML = '';
        if (!query) {
            return;
        }
        const lowerQuery = query.toLowerCase();
        const results = searchIndex.filter(page =>
            page.title.toLowerCase().includes(lowerQuery) ||
            page.content.toLowerCase().includes(lowerQuery)
        );
        if (results.length === 0) {
            resultsContainer.innerHTML = '<p>Ei tuloksia haulle.</p>';
            return;
        }
        const ul = document.createElement('ul');
        results.forEach(result => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = result.url;
            a.textContent = result.title;
            li.appendChild(a);
            ul.appendChild(li);
        });
        resultsContainer.appendChild(ul);
        localStorage.setItem('lastSearchQuery', query);
    }

    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    if (searchButton && searchInput) {
        searchButton.addEventListener('click', () => {
            performSearch(searchInput.value);
        });
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                performSearch(searchInput.value);
            }
        });

        searchInput.addEventListener('input', () => {
            if (searchInput.value.trim() === '') {
                localStorage.removeItem('lastSearchQuery');
                const resultsContainer = document.getElementById('search-results');
                resultsContainer.innerHTML = '';
            }
        });

        const lastQuery = localStorage.getItem('lastSearchQuery');
        if (lastQuery) {
            searchInput.value = lastQuery;
            performSearch(lastQuery);
        }
    }
});
