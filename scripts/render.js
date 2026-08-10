/* =========================================================================
   RENDER
   Monta a página a partir de window.dadosDoSite. Nenhum conteúdo é escrito
   aqui: tudo vem de dados/data.js.
   ========================================================================= */

(function () {
    "use strict";

    const dados = window.dadosDoSite;

    if (!dados) {
        console.error("[render] dados/data.js não carregou. A página fica com o conteúdo de fallback do HTML.");
        return;
    }

    /* ---------------------------------------------------------------------
       Utilitários
       --------------------------------------------------------------------- */

    const $ = (seletor, raiz = document) => raiz.querySelector(seletor);
    const $$ = (seletor, raiz = document) => Array.from(raiz.querySelectorAll(seletor));

    /**
     * Cria um elemento.
     * "texto" define textContent, "class" a classe, o resto vira atributo.
     * Filhos falsos são ignorados, o que permite usar && direto na lista.
     */
    function criar(tag, props = {}, filhos = []) {
        const node = document.createElement(tag);

        for (const [chave, valor] of Object.entries(props)) {
            if (valor === undefined || valor === null || valor === false) continue;

            if (chave === "class") node.className = valor;
            else if (chave === "texto") node.textContent = valor;
            else if (chave === "dataset") Object.assign(node.dataset, valor);
            else node.setAttribute(chave, valor);
        }

        for (const filho of filhos) {
            if (filho) node.append(filho);
        }

        return node;
    }

    /** Escreve num alvo se ele existir e o valor não for vazio. */
    function escrever(seletor, valor) {
        const node = $(seletor);
        if (node && valor) node.textContent = valor;
    }

    /* ---------------------------------------------------------------------
       Títulos e textos de apoio das seções
       O HTML já traz um fallback legível; aqui ele é sobrescrito.
       --------------------------------------------------------------------- */

    function renderizarTitulos() {
        $$("[data-titulo]").forEach((node) => {
            const bloco = dados[node.dataset.titulo];
            if (bloco && bloco.titulo) node.textContent = bloco.titulo;
        });

        $$("[data-apoio]").forEach((node) => {
            const bloco = dados[node.dataset.apoio];
            if (bloco && bloco.apoio) node.textContent = bloco.apoio;
        });
    }

    /* ---------------------------------------------------------------------
       CARTAZ
       --------------------------------------------------------------------- */

    function renderizarCartaz() {
        const evento = dados.evento;
        if (!evento) return;

        escrever("[data-marca-edicao]", evento.edicaoRomana);
        escrever("[data-cartaz-edicao]", evento.edicaoPorExtenso);
        escrever("[data-cartaz-nome1]", evento.nomeLinha1);
        escrever("[data-cartaz-nome2]", evento.nomeLinha2);
        escrever("[data-cartaz-polones]", evento.nomePolones);
        escrever("[data-cartaz-chamada]", evento.chamada);

        document.title = `${evento.edicao} ${evento.nomeLinha1} ${evento.nomeLinha2}, Itaiópolis (SC)`;
    }

    /* ---------------------------------------------------------------------
       FAIXA DE DADOS (quando, onde, realização)
       --------------------------------------------------------------------- */

    function renderizarDados() {
        const alvo = $("[data-dados]");
        const evento = dados.evento;
        if (!alvo || !evento) return;

        const campos = [];

        if (evento.local) {
            campos.push(
                montarCampo({
                    rotulo: "Onde",
                    valor: criar("span", { texto: evento.local.nome }),
                    detalhe: evento.local.endereco,
                    link: evento.local.mapa && { url: evento.local.mapa, texto: "Ver no mapa" }
                })
            );
        }

        if (evento.realizacao) {
            campos.push(
                montarCampo({
                    rotulo: "Realização",
                    valor: criar("span", { texto: evento.realizacao.nome }),
                    detalhe: evento.realizacao.detalhe
                })
            );
        }

        if (evento.acompanhe) {
            campos.push(
                montarCampo({
                    rotulo: "Acompanhe",
                    valor: criar("span", { texto: evento.acompanhe.nome }),
                    detalhe: evento.acompanhe.detalhe,
                    link: evento.acompanhe.url && { url: evento.acompanhe.url, texto: "Abrir o perfil" }
                })
            );
        }

        alvo.replaceChildren(...campos);
    }

    function montarCampo({ rotulo, valor, detalhe, link }) {
        return criar("div", { class: "dados__campo" }, [
            criar("dt", { class: "etiqueta dados__rotulo", texto: rotulo }),
            criar("dd", { class: "dados__valor" }, [valor]),
            detalhe && criar("dd", { class: "dados__detalhe", texto: detalhe }),
            link &&
                criar("dd", {}, [
                    criar("a", {
                        class: "dados__link",
                        href: link.url,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        texto: link.texto
                    })
                ])
        ]);
    }

    /* ---------------------------------------------------------------------
       PROGRAMA
       --------------------------------------------------------------------- */

    function renderizarPrograma() {
        const alvo = $("[data-programa]");
        const bloco = dados.programa;
        if (!alvo || !bloco || !Array.isArray(bloco.itens)) return;

        alvo.replaceChildren(
            ...bloco.itens.map((item) =>
                criar("li", { class: "programa__linha" }, [
                    criar("span", { class: "programa__hora", texto: item.hora }),
                    criar("div", {}, [
                        criar("h3", { class: "programa__titulo", texto: item.titulo }),
                        item.nota && criar("p", { class: "programa__nota", texto: item.nota })
                    ])
                ])
            )
        );
    }

    /* ---------------------------------------------------------------------
       CARDÁPIO
       --------------------------------------------------------------------- */

    function renderizarCardapio() {
        const alvo = $("[data-cardapio]");
        const bloco = dados.cardapio;
        if (!alvo || !bloco || !Array.isArray(bloco.grupos)) return;

        alvo.replaceChildren(
            ...bloco.grupos.map((grupo) =>
                criar("div", { class: "cardapio__grupo" }, [
                    criar("h3", { class: "etiqueta cardapio__titulo", texto: grupo.nome }),
                    criar(
                        "ul",
                        {},
                        grupo.itens.map((item) =>
                            criar("li", { class: "cardapio__item" }, [
                                criar("span", { class: "cardapio__nome", texto: item.nome }),
                                criar("span", { class: "cardapio__preco", texto: item.preco }),
                                item.detalhe && criar("span", { class: "cardapio__detalhe", texto: item.detalhe })
                            ])
                        )
                    )
                ])
            )
        );

        escrever("[data-cardapio-moeda]", bloco.moeda);
    }

    /* ---------------------------------------------------------------------
       GALERIAS
       --------------------------------------------------------------------- */

    function renderizarGalerias() {
        $$("[data-galeria]").forEach((alvo) => {
            const nome = alvo.dataset.galeria;
            const bloco = dados[nome];
            if (!bloco || !Array.isArray(bloco.fotos)) return;

            alvo.replaceChildren(
                ...bloco.fotos.map((foto, indice) => {
                    const img = criar("img", {
                        src: foto.src,
                        alt: foto.alt || "",
                        loading: "lazy",
                        decoding: "async"
                    });

                    const item = criar(
                        "button",
                        {
                            class: "galeria__item",
                            type: "button",
                            dataset: { galeriaNome: nome, galeriaIndice: String(indice) },
                            "aria-label": `Ampliar foto ${indice + 1} de ${bloco.fotos.length}`
                        },
                        [img]
                    );

                    // Arquivo faltando: o item some em vez de virar ícone quebrado
                    img.addEventListener("error", () => item.remove());

                    return item;
                })
            );
        });
    }

    /* ---------------------------------------------------------------------
       ACORDEÕES
       --------------------------------------------------------------------- */

    /** <details> a partir de { id, titulo, texto, lista, nomes }. */
    function montarAcordeao(item) {
        const corpo = criar("div", { class: "acordeao__corpo" }, [
            item.texto && criar("p", { class: "texto", texto: item.texto }),

            Array.isArray(item.lista) &&
                item.lista.length > 0 &&
                criar("ul", { class: "lista" }, item.lista.map((linha) => criar("li", { texto: linha }))),

            Array.isArray(item.nomes) &&
                item.nomes.length > 0 &&
                criar("ul", { class: "nomes" }, item.nomes.map((nome) => criar("li", { texto: nome })))
        ]);

        return criar("details", { class: "acordeao", id: item.id }, [
            criar("summary", { class: "acordeao__resumo" }, [
                criar("span", { class: "acordeao__titulo", texto: item.titulo }),
                criar("span", { class: "acordeao__sinal", "aria-hidden": "true" })
            ]),
            corpo
        ]);
    }

    function renderizarAssociacao() {
        const alvo = $("[data-associacao]");
        const bloco = dados.associacao;
        if (!alvo || !bloco || !Array.isArray(bloco.itens)) return;

        alvo.replaceChildren(...bloco.itens.map(montarAcordeao));
    }

    /* ---------------------------------------------------------------------
       GRUPO FOLCLÓRICO
       As fotos saem pelo renderizador de galerias; aqui vão o texto e o
       elenco, que fica recolhido para não empurrar o resto da página.
       --------------------------------------------------------------------- */

    function renderizarGrupo() {
        const bloco = dados.grupo;
        if (!bloco) return;

        escrever("[data-grupo-texto]", bloco.texto);

        const alvoElenco = $("[data-grupo-elenco]");
        const elenco = bloco.elenco;
        if (!alvoElenco || !elenco || !Array.isArray(elenco.nomes) || elenco.nomes.length === 0) return;

        alvoElenco.replaceChildren(
            montarAcordeao({
                id: "elenco",
                titulo: `${elenco.titulo} (${elenco.nomes.length})`,
                nomes: elenco.nomes
            })
        );
    }

    /* ---------------------------------------------------------------------
       PATROCINADORES
       --------------------------------------------------------------------- */

    function renderizarPatrocinadores() {
        const alvo = $("[data-patrocinadores]");
        const bloco = dados.patrocinadores;
        if (!alvo || !bloco || !Array.isArray(bloco.cotas)) return;

        alvo.replaceChildren(
            ...bloco.cotas.map((cota) =>
                criar("div", {}, [
                    criar("h3", { class: "cota__nome", texto: cota.nome }),
                    criar("div", { class: "cota__lista" }, cota.empresas.map(montarPatrocinador))
                ])
            )
        );
    }

    function montarPatrocinador(empresa) {
        const contatos = [];

        if (empresa.telefone) {
            contatos.push(
                criar("a", {
                    href: "tel:+55" + empresa.telefone.replace(/\D/g, ""),
                    texto: empresa.telefone
                })
            );
        }

        if (empresa.instagram) {
            contatos.push(
                criar("a", {
                    href: empresa.instagram,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    texto: arrobaDaUrl(empresa.instagram)
                })
            );
        }

        if (empresa.site) {
            contatos.push(
                criar("a", {
                    href: empresa.site,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    texto: "Site oficial"
                })
            );
        }

        return criar("article", { class: "patrocinador" }, [
            criar("h4", { class: "patrocinador__nome", texto: empresa.nome }),
            empresa.endereco && criar("p", { class: "patrocinador__linha", texto: empresa.endereco }),
            contatos.length > 0 && criar("p", { class: "patrocinador__contatos" }, contatos)
        ]);
    }

    /** "https://instagram.com/bpitaiopolis" vira "@bpitaiopolis". */
    function arrobaDaUrl(url) {
        try {
            const conta = new URL(url).pathname.replace(/\/+$/, "").split("/").pop();
            return conta ? "@" + conta : "Instagram";
        } catch {
            return "Instagram";
        }
    }

    /* ---------------------------------------------------------------------
       APOIO INSTITUCIONAL
       --------------------------------------------------------------------- */

    function renderizarApoio() {
        const bloco = dados.apoiadores;
        if (!bloco) return;

        const alvoLogos = $("[data-apoio-logos]");
        if (alvoLogos && Array.isArray(bloco.logos)) {
            alvoLogos.replaceChildren(
                ...bloco.logos.map((logo) =>
                    criar("div", { class: "logos__celula" }, [
                        criar("img", { src: logo.src, alt: logo.alt, loading: "lazy", decoding: "async" })
                    ])
                )
            );
        }

        const alvoTextos = $("[data-apoio-textos]");
        if (alvoTextos && Array.isArray(bloco.textos)) {
            alvoTextos.replaceChildren(
                ...bloco.textos.map((item) =>
                    criar("div", { class: "apoio__item" }, [
                        criar("h3", { class: "etiqueta apoio__nome", texto: item.nome }),
                        item.texto && criar("p", { class: "apoio__texto", texto: item.texto }),
                        Array.isArray(item.lista) &&
                            criar(
                                "ul",
                                { class: "lista apoio__lista" },
                                item.lista.map((linha) => criar("li", { texto: linha }))
                            )
                    ])
                )
            );
        }
    }

    /* ---------------------------------------------------------------------
       AVALIAÇÃO
       --------------------------------------------------------------------- */

    function renderizarAvaliacao() {
        const bloco = dados.avaliacao;
        if (!bloco) return;

        escrever("[data-avaliacao-titulo]", bloco.titulo);
        escrever("[data-avaliacao-texto]", bloco.texto);

        const botao = $("[data-avaliacao-botao]");
        if (botao && bloco.url) {
            botao.href = bloco.url;
            botao.textContent = bloco.botao;
        }
    }

    /* ---------------------------------------------------------------------
       CONTATO, INSTAGRAM E CRÉDITOS
       --------------------------------------------------------------------- */

    function renderizarRodape() {
        const contato = dados.contato;

        if (contato) {
            escrever("[data-contato-endereco]", contato.endereco);

            if (Array.isArray(contato.redes)) {
                const alvoRedes = $("[data-contato-redes]");
                if (alvoRedes) {
                    alvoRedes.replaceChildren(
                        ...contato.redes.map((rede) =>
                            criar("li", {}, [
                                criar("a", {
                                    href: rede.url,
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    texto: rede.rotulo || rede.nome
                                })
                            ])
                        )
                    );
                }

                const instagram = contato.redes.find((rede) => rede.nome === "Instagram");
                if (instagram) {
                    escrever("[data-instagram-arroba]", instagram.rotulo);
                    const link = $("[data-instagram-link]");
                    if (link) link.href = instagram.url;
                }
            }
        }

        const creditos = dados.creditos;
        if (!creditos) return;

        escrever("[data-creditos-autor]", creditos.autor);

        const alvoCreditos = $("[data-creditos-redes]");
        if (alvoCreditos && Array.isArray(creditos.redes)) {
            alvoCreditos.replaceChildren(
                ...creditos.redes.map((rede) =>
                    criar("a", {
                        href: rede.url,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        texto: rede.nome
                    })
                )
            );
        }
    }

    /* ---------------------------------------------------------------------
       DADOS ESTRUTURADOS
       O site não anuncia data, então não existe Event válido a declarar.
       O que é sempre verdade é a organização que realiza a festa.
       --------------------------------------------------------------------- */

    function renderizarSchema() {
        const evento = dados.evento;
        const contato = dados.contato;
        if (!evento || !evento.local) return;

        const schema = {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Associação Cultural Polonesa de Itaiópolis",
            description: evento.chamada,
            url: location.origin + location.pathname,
            address: {
                "@type": "PostalAddress",
                streetAddress: evento.local.endereco,
                addressLocality: "Itaiópolis",
                addressRegion: "SC",
                addressCountry: "BR"
            },
            sameAs: contato && Array.isArray(contato.redes) ? contato.redes.map((r) => r.url) : undefined
        };

        document.head.append(
            criar("script", { type: "application/ld+json", texto: JSON.stringify(schema) })
        );
    }

    /* ---------------------------------------------------------------------
       Execução
       --------------------------------------------------------------------- */

    renderizarTitulos();
    renderizarCartaz();
    renderizarDados();
    renderizarPrograma();
    renderizarCardapio();
    renderizarGalerias();
    renderizarGrupo();
    renderizarAssociacao();
    renderizarPatrocinadores();
    renderizarApoio();
    renderizarAvaliacao();
    renderizarRodape();
    renderizarSchema();

    // ui.js só liga os comportamentos depois que o DOM está montado
    document.dispatchEvent(new CustomEvent("site:pronto"));
})();
