/* =========================================================================
   UI
   Três comportamentos: menu do mobile, marcação da seção corrente e
   visualizador de fotos.
   ========================================================================= */

(function () {
    "use strict";

    const $ = (seletor, raiz = document) => raiz.querySelector(seletor);
    const $$ = (seletor, raiz = document) => Array.from(raiz.querySelectorAll(seletor));

    /* =====================================================================
       MENU DO MOBILE
       ===================================================================== */

    function ligarMenu() {
        const botao = $("[data-menu]");
        const nav = $("[data-nav]");
        const rotulo = $("[data-menu-texto]");
        if (!botao || !nav) return;

        const desktop = window.matchMedia("(min-width: 62rem)");

        function abrir(deveAbrir) {
            nav.classList.toggle("aberta", deveAbrir);
            botao.setAttribute("aria-expanded", String(deveAbrir));
            if (rotulo) rotulo.textContent = deveAbrir ? "Fechar" : "Menu";
        }

        botao.addEventListener("click", () => {
            abrir(botao.getAttribute("aria-expanded") !== "true");
        });

        // Escolher uma seção fecha o menu
        nav.addEventListener("click", (evento) => {
            if (evento.target.closest(".nav__link")) abrir(false);
        });

        document.addEventListener("keydown", (evento) => {
            if (evento.key !== "Escape") return;
            if (botao.getAttribute("aria-expanded") !== "true") return;

            abrir(false);
            botao.focus();
        });

        // Clique fora fecha
        document.addEventListener("click", (evento) => {
            if (botao.getAttribute("aria-expanded") !== "true") return;
            if (evento.target.closest("[data-nav]") || evento.target.closest("[data-menu]")) return;

            abrir(false);
        });

        // Ao passar para o desktop o painel deixa de existir; o estado precisa
        // voltar ao normal para não travar o aria-expanded em true.
        desktop.addEventListener("change", (evento) => {
            if (evento.matches) abrir(false);
        });
    }

    /* =====================================================================
       SEÇÃO CORRENTE
       Marca no menu a seção que está passando sob o topo.
       ===================================================================== */

    function ligarMarcacaoDeSecao() {
        const links = $$(".nav__link");
        if (links.length === 0 || !("IntersectionObserver" in window)) return;

        const porId = new Map();
        const secoes = [];

        links.forEach((link) => {
            const id = link.getAttribute("href").slice(1);
            const secao = document.getElementById(id);
            if (!secao) return;

            porId.set(id, link);
            secoes.push(secao);
        });

        if (secoes.length === 0) return;

        const alturaTopo = ($("[data-topo]") || {}).offsetHeight || 0;
        const visiveis = new Set();

        function marcar(id) {
            links.forEach((link) => link.classList.remove("ativo"));

            const link = porId.get(id);
            if (link) link.classList.add("ativo");
        }

        const observador = new IntersectionObserver(
            (entradas) => {
                entradas.forEach((entrada) => {
                    if (entrada.isIntersecting) visiveis.add(entrada.target.id);
                    else visiveis.delete(entrada.target.id);
                });

                // Entre as visíveis, vale a primeira na ordem do documento
                const corrente = secoes.find((secao) => visiveis.has(secao.id));

                if (corrente) marcar(corrente.id);
                else links.forEach((link) => link.classList.remove("ativo"));
            },
            {
                // A faixa observada é só o topo da tela, logo abaixo do cabeçalho
                rootMargin: `-${alturaTopo + 1}px 0px -62% 0px`,
                threshold: 0
            }
        );

        secoes.forEach((secao) => observador.observe(secao));
    }

    /* =====================================================================
       VISUALIZADOR DE FOTOS
       ===================================================================== */

    function ligarVisor() {
        const visor = $("[data-visor]");
        const imagem = $("[data-visor-imagem]");
        const contador = $("[data-visor-contador]");
        if (!visor || !imagem || typeof visor.showModal !== "function") return;

        let fotos = [];
        let indice = 0;

        function mostrar(novoIndice) {
            if (fotos.length === 0) return;

            indice = (novoIndice + fotos.length) % fotos.length;
            const foto = fotos[indice];

            imagem.src = foto.src;
            imagem.alt = foto.alt || "";
            if (contador) contador.textContent = `${indice + 1} / ${fotos.length}`;
        }

        // Delegação: as galerias são montadas pelo render.js
        document.addEventListener("click", (evento) => {
            const item = evento.target.closest(".galeria__item");
            if (!item) return;

            const bloco = (window.dadosDoSite || {})[item.dataset.galeriaNome];
            if (!bloco || !Array.isArray(bloco.fotos)) return;

            fotos = bloco.fotos;
            mostrar(Number(item.dataset.galeriaIndice));
            visor.showModal();
        });

        const proxima = () => mostrar(indice + 1);
        const anterior = () => mostrar(indice - 1);

        $("[data-visor-proxima]")?.addEventListener("click", proxima);
        $("[data-visor-anterior]")?.addEventListener("click", anterior);
        $("[data-visor-fechar]")?.addEventListener("click", () => visor.close());

        // Clique no fundo escuro fecha. O alvo é o próprio <dialog> porque o
        // ::backdrop não recebe eventos.
        visor.addEventListener("click", (evento) => {
            if (evento.target === visor) visor.close();
        });

        visor.addEventListener("keydown", (evento) => {
            if (evento.key === "ArrowRight") proxima();
            else if (evento.key === "ArrowLeft") anterior();
        });

        // Arrastar o dedo troca a foto
        let inicioX = null;

        imagem.addEventListener("touchstart", (evento) => {
            inicioX = evento.touches[0].clientX;
        }, { passive: true });

        imagem.addEventListener("touchend", (evento) => {
            if (inicioX === null) return;

            const distancia = inicioX - evento.changedTouches[0].clientX;
            inicioX = null;

            if (Math.abs(distancia) < 50) return;
            if (distancia > 0) proxima();
            else anterior();
        }, { passive: true });

        // Solta a imagem grande da memória ao fechar
        visor.addEventListener("close", () => {
            imagem.removeAttribute("src");
        });
    }

    /* =====================================================================
       Execução
       ===================================================================== */

    function iniciar() {
        ligarMenu();
        ligarMarcacaoDeSecao();
        ligarVisor();
    }

    // O render.js avisa quando terminou de montar o DOM. Se por algum motivo
    // ele não rodar, o DOMContentLoaded garante que a UI ainda funcione.
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", iniciar, { once: true });
    } else {
        iniciar();
    }
})();
