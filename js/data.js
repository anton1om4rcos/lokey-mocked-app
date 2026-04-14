/**
 * Lokey - Dados mockados para o app de reservas de motel
 * Todos os textos em Portugues Brasileiro
 */

(function () {
  const LOKEY_DATA = {};

  // =========================================================================
  // MOTEIS
  // =========================================================================
  LOKEY_DATA.motels = [
    {
      id: 1,
      name: "Motel Eclipse",
      distance: 2.3,
      location: "Santa Luzia",
      rating: 4.7,
      logo: null,
      logoImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuATQvQTcCERRkMXO1ukqsBouH-X4RzbA92h1UKgACMSlCFaiGoEsyg6T3XiBGTMcS16I3DRg7ikinfO8BLaS0w2r2SVN01RsJVAefY0W8Uyve_moX_kWLXgFX6J6on4hutkHE35ulCrxQPdSZH2bvMgfrpuRdxZ1weyfiKgqam0LgtMfP-f8J012bV9YwaTk-yL6cR_4Fq5boLxriJ_SyAmwSEWE-_Mm_D1Evw9ywrlpUt9YpI8yq8nwF7CreC5ygTr5djcXBFSMsAg",
      suites: [
        {
          id: 101,
          name: "Suite Cyber Neon Premium",
          amenityIcons: ["bed", "directions_car", "music_note"],
          originalPrice: 105,
          price: 95,
          duration: "2h",
          discount: 10,
          image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCDdfcPMMwL4p_i7DfuGf3ZAlr-LAKwTK2pi1hbw8FvrFy44_0GMxQ_Wcbo4KS6kJCY7ljs3q0ZvUeDYYAl_KAYuIR-_mfwd7sqOGMkP7cXoGJmBh1j1rgsyuPsq_OvzdLhg8LBXR7RUwLZR7loUoI_C5A4Uo8qK7nnlX9NDf1_gcvZJmAWpRGLkSuG2O8JL7LFqY9mJAmFddW83mj_zu4cnCjHifRnZfEXH6RPf79uasWlxvMlytUs8Fc3EF95Dvt0_4O34a1Mdy-v",
        },
        {
          id: 102,
          name: "Suite Golden Pool Experience",
          amenityIcons: ["bathtub", "air", "tv"],
          originalPrice: 185,
          price: 158,
          duration: "2h",
          discount: 15,
          image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBYxvoMQgWrEqukMXxSmd934sCxaZQuZ84G11tdU_BwPJPwoouy3G8KNTPYwKib0nj9T1VHpwE1ZI78fKam77YIowB6A-DRAKmrv_Vrvo1C4MVQVySTE7IcIW2kNb0u43fnPnyCQCVeZWUCyJzn4_7O3_zLsfyM-KJMEZxWWWzvpBQ7C_3wG-SOXCOxVGmYr7ANks-_Zp1OF9qbMxR9pIm2EwqIiD1ixRG2RUDMv7FSQHj9L_3v8muDH21nJdEj53vY82dyAcAaJwbY",
        },
      ],
    },
    {
      id: 2,
      name: "Luxury Motel",
      distance: 4.1,
      location: "Pampulha",
      rating: 4.9,
      logo: "LUXURY<br/>EST.",
      logoImage: null,
      suites: [
        {
          id: 201,
          name: "Suite Arctic Blue Luxury Velvet",
          amenityIcons: ["bathtub", "directions_car", "tv"],
          originalPrice: 265,
          price: 210,
          duration: "2h",
          discount: 20,
          image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDoOSDqn_5KnerW5Dk0PdRzbO2SLWpnWBYHgIYAlivcGKNdGjNb5paK3JKLk3YYikuahb7UKdXvHB1-w-5XlB7NtnuABa2Np4GHv-pte62OWkTwlSKpWkjvPTZCzEAcWChD7PTWiR9jSPaT9XUOCH-VEYIwVeotgkAY3irGlfeUx3ICd-fietpzmrIGeJPh3HfPney2E-iC6UhTDRkYaGzATmvnuw3dxSZzD5JQWV86lXhm3SA5tz0Czyu2wUDH4uf8hacqtOHPpwM4",
        },
        {
          id: 202,
          name: "Suite Paradise Red Pool & Spa",
          amenityIcons: ["pool", "restaurant", "spa"],
          originalPrice: 445,
          price: 390,
          duration: "2h",
          discount: 12,
          image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBX9dblFtBowgoKf8bXvPQpaYqW6rgqfNrLi_ivbxQLR8yG6dkcuArJKadzK-NqAUItPzWJaP4mlxWS5aK1-KgpLcAlB-l_Eito2MhL1GCDztc5nxO3SUWZyt3wtW0tEWc97ABeeIU1K5clMDOpKY9JjIejU0aYgQJ7MqpNCOZA_d-YGSO18DW_SZFv45or-woiFEcD03_8bB2PX_cMTNOJhXxLImtkybZr3mWWzMKoH93UHtVDoVEin_RgtId_TKTjTMQy3grBzi_n",
        },
      ],
    },
  ];

  // =========================================================================
  // USUARIO
  // =========================================================================
  LOKEY_DATA.user = {
    name: "Matheus",
    lastName: "Oliveira",
    email: "matheus.oliveira@email.com",
    initial: "M",
  };

  // =========================================================================
  // CHATS
  // =========================================================================
  LOKEY_DATA.chats = [
    {
      id: 1,
      motelName: "Motel Eclipse",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCzDWjL-xTFRrJECxfnNesrFJJ0cOmB8QwSQU6KksEi35DDiZcaY6vCv1KdC1qOpXijHoDjvI0buRzKDaY5V8mDYTxLa5sb3Rl9lSHEaRCXm-fIYmCFKVlUHPkJQxG4smBGSV1T63Z0TcWmCLf0e9QuhudJ-Fs5sDJumBIJYCEoCc_NNqhbX5fJpC8o-7rZaI3E2TRa5WTiUC__znx1_O2rI9oYFmgOgrl6R6rbBUcQy0-8uLFmcTkZNFCSbBLcWBIk2AxS0Wajpmze",
      lastMessage: "Sua reserva foi confirmada! Aguardamos voce.",
      time: "10:30",
      unread: 2,
      online: true,
      messages: [
        {
          sender: "user",
          text: "Ola, gostaria de confirmar minha reserva para hoje.",
        },
        {
          sender: "motel",
          text: "Claro! Qual suite voce reservou?",
        },
        {
          sender: "user",
          text: "Suite Standart, para as 20h.",
        },
        {
          sender: "motel",
          text: "Sua reserva foi confirmada! Aguardamos voce.",
        },
      ],
    },
    {
      id: 2,
      motelName: "Luxury Motel",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBQGbNjqrqUj0P2QsTRTxgY76G_Xs0irbzwJjVY4SA1ctBOJawYDi8zHFPHaFUY6iFA0QqBUMMHXkML15LMSMvuUQsf0CW4q1ltygZS2AesJrXggdFPUUlYQM97EbyU65m7YXT2FdB8bxEwbr1LB6H1DB6dd9i-tOrrAtWBNbqKYxLnqynwcYIOMQXa2YHm_xZAiKw3k4j-HU6xrWq1G8RtK7x64r160DrTZnshaxU6smOg-iy52wjFRNfY1J0qushs9j6XaokMYn-d",
      lastMessage: "Obrigado pela preferencia! Volte sempre.",
      time: "Ontem",
      unread: 0,
      online: false,
      messages: [
        {
          sender: "user",
          text: "Boa noite! Voces tem suite com hidro disponivel?",
        },
        {
          sender: "motel",
          text: "Boa noite! Sim, a Suite Premium e a Suite Master possuem hidromassagem.",
        },
        {
          sender: "user",
          text: "Otimo, vou reservar a Premium. Obrigado!",
        },
        {
          sender: "motel",
          text: "Obrigado pela preferencia! Volte sempre.",
        },
      ],
    },
    {
      id: 3,
      motelName: "Motel Serenidade",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB0ptcOtQzJ5oDwqoQcQEBuH03AJ4zQ14kk4Pmz6xGHqDGaCZX3rLU4ry4QEmzk0oe6JLTGOYTXFrNuCYPIWVueOGIZ0i6WDDltMs8mss20XzvFvFsd8iQ_gRBEg2EyTJgqOoQokrvJkyYZPJOg_QIVT43CeesdnGDU2v0Vo7eknwMF4h7p-u35m6tywoMoWq33757tvyLUBo28FZziIWhfpFzTIAEbFSQCLtkSUlg5qkWRM2ypxRhKvippaeJK_Wa0LOmxImBtswjl",
      lastMessage: "Temos promocao especial neste fim de semana!",
      time: "Seg",
      unread: 1,
      online: true,
      messages: [
        {
          sender: "motel",
          text: "Ola Matheus! Temos promocao especial neste fim de semana!",
        },
        {
          sender: "user",
          text: "Que legal! Quais sao os precos?",
        },
        {
          sender: "motel",
          text: "Temos promocao especial neste fim de semana!",
        },
      ],
    },
    {
      id: 4,
      motelName: "Motel Paraiso",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBmtmw8LIBD8uICcCKIUNu56WnUqt7wG0o5RV26WAR7Vb4KlOQQSMg-GIZ7eEOIg1r6x7Wjmvg8XGEpklaAr5OTPe0GwXT2-vHmeaVCOV_cBnFcb8rHkW2ihQCxat1UgKJBkdK_FBOfbIzmVGkaf0EgV4fwWoTiNyAP5qzqMLi5m-esExFFXNZyhv3PRMCaL-6w5_X_6agdWhJ1M3QvcIo9c5KeyGOd2l8CfIEhjE84UlMZQcsTrtWFK2N46Pd9TyFMC-C6fAbm78m8",
      lastMessage: "Estamos com novas suites tematicas!",
      time: "12/04",
      unread: 0,
      online: false,
      messages: [
        {
          sender: "motel",
          text: "Ola! Estamos com novas suites tematicas! Venha conhecer.",
        },
        {
          sender: "user",
          text: "Interessante! Vou dar uma olhada no app.",
        },
        {
          sender: "motel",
          text: "Estamos com novas suites tematicas!",
        },
      ],
    },
  ];

  // =========================================================================
  // HISTORICO DE RESERVAS
  // =========================================================================
  LOKEY_DATA.reservationHistory = [
    {
      id: 1,
      motelName: "Motel Eclipse",
      suiteName: "Suite Cyber Neon Premium",
      price: 95,
      date: "10/04/2026",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCDdfcPMMwL4p_i7DfuGf3ZAlr-LAKwTK2pi1hbw8FvrFy44_0GMxQ_Wcbo4KS6kJCY7ljs3q0ZvUeDYYAl_KAYuIR-_mfwd7sqOGMkP7cXoGJmBh1j1rgsyuPsq_OvzdLhg8LBXR7RUwLZR7loUoI_C5A4Uo8qK7nnlX9NDf1_gcvZJmAWpRGLkSuG2O8JL7LFqY9mJAmFddW83mj_zu4cnCjHifRnZfEXH6RPf79uasWlxvMlytUs8Fc3EF95Dvt0_4O34a1Mdy-v",
      status: "FINALIZADA",
    },
    {
      id: 2,
      motelName: "Luxury Motel",
      suiteName: "Suite Arctic Blue Luxury Velvet",
      price: 210,
      date: "05/04/2026",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDoOSDqn_5KnerW5Dk0PdRzbO2SLWpnWBYHgIYAlivcGKNdGjNb5paK3JKLk3YYikuahb7UKdXvHB1-w-5XlB7NtnuABa2Np4GHv-pte62OWkTwlSKpWkjvPTZCzEAcWChD7PTWiR9jSPaT9XUOCH-VEYIwVeotgkAY3irGlfeUx3ICd-fietpzmrIGeJPh3HfPney2E-iC6UhTDRkYaGzATmvnuw3dxSZzD5JQWV86lXhm3SA5tz0Czyu2wUDH4uf8hacqtOHPpwM4",
      status: "FINALIZADA",
    },
    {
      id: 3,
      motelName: "Motel Eclipse",
      suiteName: "Suite Golden Pool Experience",
      price: 158,
      date: "28/03/2026",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBYxvoMQgWrEqukMXxSmd934sCxaZQuZ84G11tdU_BwPJPwoouy3G8KNTPYwKib0nj9T1VHpwE1ZI78fKam77YIowB6A-DRAKmrv_Vrvo1C4MVQVySTE7IcIW2kNb0u43fnPnyCQCVeZWUCyJzn4_7O3_zLsfyM-KJMEZxWWWzvpBQ7C_3wG-SOXCOxVGmYr7ANks-_Zp1OF9qbMxR9pIm2EwqIiD1ixRG2RUDMv7FSQHj9L_3v8muDH21nJdEj53vY82dyAcAaJwbY",
      status: "FINALIZADA",
    },
    {
      id: 4,
      motelName: "Luxury Motel",
      suiteName: "Suite Paradise Red Pool & Spa",
      price: 390,
      date: "15/03/2026",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBX9dblFtBowgoKf8bXvPQpaYqW6rgqfNrLi_ivbxQLR8yG6dkcuArJKadzK-NqAUItPzWJaP4mlxWS5aK1-KgpLcAlB-l_Eito2MhL1GCDztc5nxO3SUWZyt3wtW0tEWc97ABeeIU1K5clMDOpKY9JjIejU0aYgQJ7MqpNCOZA_d-YGSO18DW_SZFv45or-woiFEcD03_8bB2PX_cMTNOJhXxLImtkybZr3mWWzMKoH93UHtVDoVEin_RgtId_TKTjTMQy3grBzi_n",
      status: "FINALIZADA",
    },
  ];

  // =========================================================================
  // CIDADES
  // =========================================================================
  LOKEY_DATA.cities = [
    "Belo Horizonte",
    "Contagem",
    "Betim",
    "Santa Luzia",
    "Ribeirao das Neves",
  ];

  // =========================================================================
  // FAQ
  // =========================================================================
  LOKEY_DATA.faqItems = [
    {
      icon: "lock",
      question: "Meus dados estao seguros?",
      answer:
        "Sim! Utilizamos criptografia de ponta a ponta para proteger todas as suas informacoes pessoais e dados de pagamento. Sua privacidade e nossa prioridade.",
    },
    {
      icon: "credit_card",
      question: "Quais formas de pagamento sao aceitas?",
      answer:
        "Aceitamos cartoes de credito e debito (Visa, Mastercard, Elo), PIX e carteiras digitais. O pagamento pode ser feito diretamente pelo app.",
    },
    {
      icon: "event_available",
      question: "Como faco uma reserva?",
      answer:
        "Escolha o motel e a suite desejada, selecione a data e o horario, confirme o pagamento e pronto! Voce recebera a confirmacao por notificacao e no chat.",
    },
    {
      icon: "cancel",
      question: "Posso cancelar minha reserva?",
      answer:
        "Sim, voce pode cancelar sua reserva com ate 2 horas de antecedencia sem custo. Cancelamentos fora desse prazo podem ter uma taxa de 20% do valor da reserva.",
    },
    {
      icon: "support_agent",
      question: "Como entro em contato com o suporte?",
      answer:
        "Voce pode nos contatar pelo chat dentro do app, pelo email suporte@lokey.com.br ou pelo telefone (31) 3333-4444. Nosso atendimento funciona 24 horas.",
    },
    {
      icon: "star",
      question: "Como funciona o programa de fidelidade?",
      answer:
        "A cada reserva concluida voce acumula pontos Lokey. Os pontos podem ser trocados por descontos exclusivos, upgrades de suite e beneficios especiais nos moteis parceiros.",
    },
  ];

  // =========================================================================
  // IMAGEM EXTRA (quinta imagem do Stitch para uso geral)
  // =========================================================================
  LOKEY_DATA.extraImages = {
    banner:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuATQvQTcCERRkMXO1ukqsBouH-X4RzbA92h1UKgACMSlCFaiGoEsyg6T3XiBGTMcS16I3DRg7ikinfO8BLaS0w2r2SVN01RsJVAefY0W8Uyve_moX_kWLXgFX6J6on4hutkHE35ulCrxQPdSZH2bvMgfrpuRdxZ1weyfiKgqam0LgtMfP-f8J012bV9YwaTk-yL6cR_4Fq5boLxriJ_SyAmwSEWE-_Mm_D1Evw9ywrlpUt9YpI8yq8nwF7CreC5ygTr5djcXBFSMsAg",
  };

  // Exporta os dados no objeto global window
  window.LOKEY_DATA = LOKEY_DATA;
})();
