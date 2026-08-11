/* =========================================================================
   DADOS DO SITE
   Noite Polonesa, Associação Cultural Polonesa de Itaiópolis

   Este é o único arquivo que precisa ser editado para mudar o conteúdo.
   Nada aqui é HTML: o render.js monta a página a partir destes objetos.

   O site é agnóstico à data: não anuncia dia nem horário do evento, então
   não precisa ser mexido a cada edição. O que muda de ano para ano é o
   número da edição, o programa, os preços do bar, o elenco e as cotas.

   Nos textos longos, \n\n cria um parágrafo novo.
   ========================================================================= */

window.dadosDoSite = {

    /* ---------------------------------------------------------------------
       EVENTO
       Alimenta o cartaz de abertura, o título da aba e a faixa vermelha.
       --------------------------------------------------------------------- */
    evento: {
        edicao: "19ª",
        edicaoRomana: "XIX",
        edicaoPorExtenso: "Décima nona edição",

        // O nome quebra em duas linhas no cartaz
        nomeLinha1: "Noite",
        nomeLinha2: "Polonesa",
        nomePolones: "Noc Polska",

        chamada:
            "Uma noite inteira dedicada à herança polonesa de Itaiópolis. Sopas de " +
            "entrada, danças folclóricas do grupo Więzy Polskie, jantar típico, baile " +
            "e o café colonial da madrugada.",

        local: {
            nome: "Alto Paraguaçu",
            endereco: "Rua Padre João Kominek, 120, Itaiópolis (SC)",
            mapa: "https://www.google.com/maps/search/?api=1&query=Rua+Padre+Jo%C3%A3o+Kominek%2C+120%2C+Alto+Paragua%C3%A7u%2C+Itai%C3%B3polis+-+SC"
        },

        realizacao: {
            nome: "Associação Cultural Polonesa",
            detalhe: "Itaiópolis, Capital Catarinense da Cultura Polonesa"
        },

        acompanhe: {
            nome: "Instagram",
            detalhe: "@associacao_polonesa_itaiopolis",
            url: "https://www.instagram.com/associacao_polonesa_itaiopolis"
        }
    },

    /* ---------------------------------------------------------------------
       PROGRAMA
       "nota" é opcional, para o nome da atração ou um detalhe.
       --------------------------------------------------------------------- */
    programa: {
        titulo: "Programa da noite",
        apoio: "A ordem da noite, do primeiro brinde ao café da madrugada.",
        itens: [
            { hora: "18h30", titulo: "Recepção" },
            { hora: "18h45", titulo: "Entrada com sopas" },
            { hora: "20h00", titulo: "Apresentações folclóricas", nota: "Grupo Folclórico Więzy Polskie" },
            { hora: "20h45", titulo: "Quebra-gelo e brinde da vodka" },
            { hora: "21h15", titulo: "Jantar típico polonês" },
            { hora: "22h30", titulo: "Baile", nota: "Com Ignácio Arendt" },
            { hora: "02h00", titulo: "Café colonial da madrugada" }
        ]
    },

    /* ---------------------------------------------------------------------
       CARDÁPIO DE BEBIDAS
       Os preços vão sem "R$": o símbolo aparece uma vez em "moeda" e os
       números caem todos no mesmo eixo vertical da carta.
       --------------------------------------------------------------------- */
    cardapio: {
        titulo: "Cardápio de bebidas",
        apoio: "Serviço de bar durante toda a noite.",
        moeda: "Valores em reais",
        grupos: [
            {
                nome: "Bebidas frias",
                itens: [
                    { nome: "Refrigerante Coca-Cola e Guaraná", detalhe: "lata 350ml", preco: "7,00" },
                    { nome: "Cerveja Brahma e Skol", detalhe: "lata 350ml", preco: "7,00" },
                    { nome: "Cerveja sem álcool", detalhe: "lata 350ml", preco: "8,00" },
                    { nome: "Água mineral com e sem gás", detalhe: "garrafa 500ml", preco: "4,00" }
                ]
            },
            {
                nome: "Vinhos",
                itens: [
                    { nome: "Quinta do Morgado", detalhe: "suave, nacional", preco: "50,00" },
                    { nome: "Ventisquero Explorador", detalhe: "cabernet sauvignon, Chile", preco: "70,00" },
                    { nome: "Signos", detalhe: "malbec, Argentina", preco: "85,00" },
                    { nome: "Errazuriz 1870 Reserva", detalhe: "cabernet sauvignon, Chile", preco: "85,00" }
                ]
            },
            {
                nome: "Espumantes",
                itens: [
                    { nome: "Gazzaro Brut", detalhe: "Serra Gaúcha", preco: "90,00" },
                    { nome: "Gazzaro Moscatel", detalhe: "Serra Gaúcha", preco: "90,00" },
                    { nome: "Rolha", preco: "70,00" }
                ]
            }
        ]
    },

    /* ---------------------------------------------------------------------
       ARTESANATO
       --------------------------------------------------------------------- */
    artesanato: {
        titulo: "Artesanato e produtos locais",
        apoio:
            "Exposição e venda de artesanato polonês e produtos coloniais produzidos " +
            "pela comunidade, montada no local do evento.",
        fotos: [
            { src: "image/artesanato/1.jpg", alt: "Artesanato polonês feito na comunidade" },
            { src: "image/artesanato/2.jpg", alt: "Peça artesanal em exposição" },
            { src: "image/artesanato/3.jpg", alt: "Produtos coloniais à venda" },
            { src: "image/artesanato/4.jpg", alt: "Artesanato polonês em exposição" },
            { src: "image/artesanato/6.png", alt: "Produtos locais na banca da comunidade" }
        ]
    },

    /* ---------------------------------------------------------------------
       GRUPO FOLCLÓRICO
       As fotos são dos dançarinos do grupo, não de edições passadas.
       --------------------------------------------------------------------- */
    grupo: {
        titulo: "Grupo Folclórico Więzy Polskie",
        apoio:
            "Cerca de 50 dançarinos entre os grupos adulto, juvenil e infantil. São " +
            "eles que fazem as apresentações da Noite Polonesa.",
        texto:
            "Fundado em 24 de agosto de 2004, o grupo é administrado pela Associação Cultural Polonesa de Itaiópolis. A origem remonta à iniciativa da Paróquia Santo Estanislau, no Bairro Alto Paraguaçu, junto com moradores da comunidade, que incentivaram os jovens a formar o grupo.\n\n" +
            "Więzy Polskie significa \"Laços Poloneses\", uma homenagem aos descendentes de poloneses e ao Bairro Alto Paraguaçu, hoje Núcleo Histórico Alto Paraguaçu, tombado como Patrimônio Nacional. O objetivo do grupo é divulgar o folclore polonês e promover o município de Itaiópolis.",
        fotos: [
            { src: "image/carousel/1.jpg", alt: "Dançarinos do grupo Więzy Polskie em apresentação" },
            { src: "image/carousel/2.jpg", alt: "Dançarinas em traje típico polonês" },
            { src: "image/carousel/3.jpg", alt: "Dançarinos do grupo durante a apresentação" },
            { src: "image/carousel/4.jpg", alt: "Apresentação de dança folclórica polonesa" },
            { src: "image/carousel/5.jpg", alt: "Casal de dançarinos em traje típico" },
            { src: "image/carousel/6.jpg", alt: "Dançarinos do grupo em roda" },
            { src: "image/carousel/7.jpg", alt: "Detalhe do traje típico polonês do grupo" },
            { src: "image/carousel/8.jpg", alt: "Grupo Więzy Polskie no palco" },
            { src: "image/carousel/9.jpg", alt: "Dançarinos do grupo juvenil" },
            { src: "image/carousel/10.jpg", alt: "Apresentação do grupo folclórico" },
            { src: "image/carousel/11.jpg", alt: "Trajes típicos usados pelo grupo" },
            { src: "image/carousel/12.jpg", alt: "Dançarinos do grupo infantil" },
            { src: "image/carousel/13.jpg", alt: "Coreografia de dança polonesa" },
            { src: "image/carousel/14.jpg", alt: "Dançarinos do grupo Więzy Polskie" }
        ],
        // ATUALIZAR a cada edição
        elenco: {
            titulo: "Dançarinos",
            nomes: [
                "Alex Lis",
                "Alice Duffeck Rodycz",
                "Aline Lis Bauer",
                "Amanda Gelbcke",
                "Ana Carolina Adriano",
                "Ana Flavia Rogalski",
                "Anna Julia Ziemba",
                "Antonio Paulo Lis Bauer",
                "Artur Martins",
                "Bernardo Woiciechovski",
                "Camila Emanoeli Sieradzki",
                "Carlos Daniel Jacintho de Souza",
                "Catarina Wielewski",
                "Clara Lis Bauer",
                "Diogo Andrzejewski",
                "Diovane Junior Pickcius Strobel",
                "Eduardo Davet De Jesus",
                "Erika Sperka Novacki",
                "Francisco Emanuel Penkal Kovalski",
                "Gisele Maria Rodycz",
                "Heitor Luiz De Jesus",
                "Helena Mengarda Jakubiak",
                "Helena Woyszczak",
                "Henrique Pamfil",
                "Isabelly Rogalski",
                "João Pedro Siqueira Hellinger",
                "João Ricardo Alves dos Santos",
                "Julia Duffeck Rodycz",
                "Julia Levandovski",
                "Júlia Gaio Wielewski",
                "Ketherine Amanda De Souza Camargo",
                "Leticia Siviero Da Silva",
                "Luisa Fernanda Alves",
                "Luiza Duffeck de Souza Teixeira",
                "Mariah Bilicki De Deus Bueno",
                "Maria Eduarda Mageroski",
                "Mirella Karoline Rogalski",
                "Nicolas Rogalevski",
                "Paloma Szostak",
                "Pietro José Ahrendt",
                "Talita Rogalewski"
            ]
        }
    },

    /* ---------------------------------------------------------------------
       A ASSOCIAÇÃO
       Cada item vira um acordeão.
       "texto" são os parágrafos, "lista" são os itens em linha.
       --------------------------------------------------------------------- */
    associacao: {
        titulo: "A Associação",
        apoio:
            "A festa é o ponto alto de um trabalho que acontece o ano inteiro, tocado " +
            "pela Associação Cultural Polonesa de Itaiópolis.",
        itens: [
            {
                id: "entidade",
                titulo: "Associação Cultural Polonesa",
                texto:
                    "Entidade de direito privado fundada em 14 de julho de 2005, com sede na Rua Padre João Kominek, 120, bairro Alto Paraguaçu. Registrada sob o CNPJ 07.661.335/0001-08, tem como objetivo principal promover a cultura polonesa, além de preservar e conservar o patrimônio histórico e artístico da comunidade polonesa no município.\n\n" +
                    "Em 2026 a Associação completou 21 anos de atuação. Algumas das ações já realizadas:",
                lista: [
                    "Administração do Grupo Folclórico Polonês Więzy Polskie",
                    "Administração da Casa Polaski",
                    "Aulas de polonês através da ORPEG",
                    "Bodega Polaski",
                    "Café Colonial",
                    "Colônia de Férias Górale",
                    "Lançamento do livro Itaiópolis, 100 anos",
                    "Lançamento do livro Tradicionais Contos Poloneses e Brasileiros",
                    "Teatro Natalino Górale",
                    "Recepção e imersão na cultura polonesa para turistas",
                    "Oficinas culturais de artesanato polonês e culinária",
                    "Caminhadas ecológicas e exposições",
                    "19 edições da Noite Polonesa"
                ]
            },
            {
                id: "casa",
                titulo: "Casa Polaski",
                texto:
                    "A sede da Associação fica no Bairro Histórico de Alto Paraguaçu e é conhecida como Casa Polaski. Construída em 1928, teve como primeiros proprietários Theodoro Smangorzewski e Martha Minikowka, e já abrigou um armazém e um banco.\n\n" +
                    "O comércio fechou no fim da década de 1940 e a casa foi vendida. A família Polaski foi a última proprietária. O imóvel foi adquirido e restaurado pelo Instituto do Patrimônio Histórico e Artístico Nacional (Iphan) e devolvido à comunidade, com o direito de administração concedido à Associação.\n\n" +
                    "Hoje, além de sede, a Casa Polaski abriga um hostel voltado à cultura, ao turismo e à educação patrimonial, e recebe eventos, aulas de polonês, aulas de dança folclórica, oficinas culturais e a Colônia de Férias Górale."
            },
            {
                id: "cidade",
                titulo: "Itaiópolis, Capital Catarinense da Cultura Polonesa",
                texto:
                    "Itaiópolis é reconhecida como a Capital Catarinense da Cultura Polonesa pela forte presença de descendentes de imigrantes poloneses e pela preservação ativa de suas tradições. O município se destaca pela herança cultural trazida pelos primeiros colonizadores, que através de danças típicas, festas tradicionais, gastronomia, música e costumes mantém viva a memória polonesa de geração em geração.\n\n" +
                    "Essa herança é celebrada a cada ano na passagem de 2 e 3 de maio, quando se comemoram o Dia da Bandeira Polonesa, o Dia da Constituição Polonesa, o Dia da Comunidade Polonesa no Exterior, o Dia da Cultura Polonesa em Santa Catarina e o Dia da Comunidade Polonesa em Itaiópolis."
            }
        ]
    },

    /* ---------------------------------------------------------------------
       PATROCINADORES
       --------------------------------------------------------------------- */
    // ATUALIZAR a cada edição
    patrocinadores: {
        titulo: "Patrocinadores",
        apoio:
            "Conheça os patrocinadores e apoiadores da 19ª Noite Polonesa, " +
            "Polak Fest 2026.",

        // Fecho da seção, depois das cotas
        fecho: {
            rotulo: "Agradecimento",
            brinde: "Um brinde! Na zdrowie!",
            texto:
                "Agradecemos imensamente a todos. Apoio fundamental para o sucesso " +
                "da iniciativa.",
            post: "https://www.instagram.com/p/Db3RTZlsIJP/?igsh=d3plY3FqNTJ1Z202"
        },
        cotas: [
            {
                nome: "Ouro",
                chave: "ouro",
                empresas: [
                    {
                        nome: "Casarão, Museu da Memória Regional",
                        logo: "image/patrocinadores/casarao.jpg",
                        endereco: "Rua Alfredo Schneider, 1490, Alto Paraguaçu",
                        telefone: "(47) 3305-3142",
                        instagram: "https://www.instagram.com/casarao.museudamemoriaregional"
                    },
                    {
                        nome: "Demais FM Planalto Norte",
                        logo: "image/patrocinadores/demais-fm.jpg",
                        endereco: "Av. Alexandre Ricardo Worell, 89",
                        telefone: "(47) 99172-7403",
                        instagram: "https://www.instagram.com/demaisfmplanaltonorte"
                    },
                    {
                        nome: "Gefil Artefatos de Cimento",
                        logo: "image/patrocinadores/gefil.jpg",
                        endereco: "Santo Antônio, interior, Itaiópolis/SC",
                        telefone: "(47) 98809-0269",
                        email: "gefilartefatos@gmail.com",
                        instagram: "https://www.instagram.com/gefil_artefatos"
                    },
                    {
                        nome: "Semmer Contabilidade",
                        logo: "image/patrocinadores/semmer.png",
                        endereco: "Av. Getúlio Vargas, 386, Centro",
                        telefone: "(47) 3652-2220",
                        site: "https://www.semmer.com.br"
                    }
                ]
            },
            {
                nome: "Prata",
                chave: "prata",
                empresas: [
                    {
                        nome: "Sicredi Itaiópolis",
                        logo: "image/patrocinadores/sicredi.jpg",
                        endereco: "Av. Pres. Tancredo Neves, 16, Centro",
                        telefone: "(47) 3627-4641",
                        instagram: "https://www.instagram.com/sicredi"
                    }
                ]
            }
        ]
    },

    /* ---------------------------------------------------------------------
       APOIO INSTITUCIONAL
       --------------------------------------------------------------------- */
    apoiadores: {
        titulo: "Apoio institucional",
        apoio:
            "O trabalho da Associação só é possível graças a instituições que compartilham " +
            "o compromisso com a preservação e a promoção da cultura polonesa na nossa cidade.",
        logos: [
            { src: "image/Apoiadores/prefeitura.png", alt: "Prefeitura Municipal de Itaiópolis" },
            { src: "image/Apoiadores/consulado.png", alt: "Consulado Geral da República da Polônia em Curitiba" },
            { src: "image/Apoiadores/ORPEG.png", alt: "ORPEG" }
        ],
        textos: [
            {
                nome: "Prefeitura de Itaiópolis",
                texto:
                    "Parceira fundamental nas atividades da Associação. Por meio de repasses " +
                    "financeiros, contribui para a aquisição de trajes típicos usados pelo grupo " +
                    "folclórico e para a manutenção das aulas de língua polonesa, que atendem " +
                    "crianças, jovens e adultos."
            },
            {
                nome: "Consulado da Polônia em Curitiba",
                texto: "A colaboração do Consulado viabiliza ações de grande impacto:",
                lista: [
                    "Realização de eventos culturais que promovem a cultura polonesa",
                    "Preservação do patrimônio cultural polonês em Itaiópolis",
                    "Colônia de Férias Górale, no recesso escolar, que atende cerca de 50 crianças",
                    "Abertura da Casa Polaski ao público, com lojinha de artesanato e produtos locais"
                ]
            },
            {
                nome: "ORPEG",
                texto:
                    "Instituição ligada ao governo da Polônia (Ośrodek Rozwoju Polskiej Edukacji " +
                    "za Granicą), tem papel essencial no ensino da língua polonesa em Itaiópolis. " +
                    "Por sua iniciativa, a comunidade conta com um professor nativo, garantindo " +
                    "uma formação linguística conectada às raízes da cultura original."
            }
        ]
    },

    /* ---------------------------------------------------------------------
       AVALIAÇÃO DO EVENTO
       --------------------------------------------------------------------- */
    avaliacao: {
        titulo: "Avalie o evento",
        texto: "Sua opinião ajuda a Noite Polonesa a melhorar a cada edição.",
        botao: "Responder o formulário",
        // ATUALIZAR: link do formulário da edição corrente
        url: "https://forms.gle/YsnnD8n7bLfgqUrLA"
    },

    /* ---------------------------------------------------------------------
       CONTATO
       --------------------------------------------------------------------- */
    contato: {
        endereco: "Rua Padre João Kominek, 120, Alto Paraguaçu, Itaiópolis (SC)",
        redes: [
            {
                nome: "Instagram",
                rotulo: "@associacao_polonesa_itaiopolis",
                url: "https://www.instagram.com/associacao_polonesa_itaiopolis"
            },
            {
                nome: "Facebook",
                rotulo: "Associação Cultural Polonesa",
                url: "https://www.facebook.com/associacaopolonesaitaiopolis/"
            }
        ]
    },

    /* ---------------------------------------------------------------------
       CRÉDITOS DO SITE
       --------------------------------------------------------------------- */
    creditos: {
        autor: "Jean Fabio Gruber",
        redes: [
            { nome: "LinkedIn", url: "https://www.linkedin.com/in/jean-fabio-gruber-7a8bba27b" },
            { nome: "GitHub", url: "https://github.com/JeanFabioGruber" },
            { nome: "Instagram", url: "https://www.instagram.com/_soujean_" }
        ]
    }
};
