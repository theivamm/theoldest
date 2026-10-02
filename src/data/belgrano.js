/* ============================================================================
   BELGRANO R. — Av. Elcano 3410
   Transcripcion de belgrano/*.md.  Claves: n nombre · d descripcion · p precio
   o opciones · f favorito · t tags extra · k tipo de ilustracion
   ========================================================================== */

export const belgrano = {
  id: 'belgrano',
  nombre: 'Belgrano R.',
  barrio: 'Belgrano',
  lema: 'La casa madre',
  direccion: 'Av. Elcano 3410',
  barrioFull: 'Belgrano R., Buenos Aires',
  telefono: '11 4551-0781',
  whatsapp: '11 6932-3962',
  whatsappTexto: 'Hola The Oldest! Quiero hacer un pedido en Belgrano R.',
  maps: 'Av. Elcano 3410, Buenos Aires',

  horarios: {
    0: [8 * 60, 4 * 60],
    1: [8 * 60, 4 * 60],
    2: [8 * 60, 4 * 60],
    3: [8 * 60, 4 * 60],
    4: [8 * 60, 4 * 60],
    5: [9 * 60, 5 * 60],
    6: [9 * 60, 5 * 60],
  },
  horarioTexto: 'Domingos a Jueves de 8:00 a 4:00 hs · Viernes y Sabados de 9:00 a 5:00 hs',

  envio: {
    titulo: 'Listos para enviar tu pedido',
    detalle: 'Todos los dias de 11:00 a 24:00 hs por Rappi y PedidosYa',
    apps: ['Rappi', 'PedidosYa'],
  },

  promos: [
    {
      titulo: '50% OFF en Gin Tonic',
      detalle: 'Pepino y miel, pomelo y canela, maracuyá y cardamomo.',
      cuando: 'Desde las 17 hs hasta las 21 hs',
      destacado: true,
    },
    {
      titulo: 'Perniles de cerdo y ternera',
      detalle: 'Ideales para tu evento o fiesta. Encargá la tuya por telefono o WhatsApp.',
      cuando: 'Reservas con anticipacion',
    },
    {
      titulo: 'Pastas al 50%',
      detalle: 'Los lunes, todas las pastas de la carta a mitad de precio.',
      cuando: 'Lunes · Belgrano R.',
    },
  ],

  avisos: [
    'Los precios son en pesos argentinos y pueden variar sin aviso.',
    'Menu ejecutivo: solo almuerzo, de lunes a viernes.',
  ],

  /* ------------------------------------------------------------- menu
     ejecutivo (almuerzo, lunes a viernes) */
  menuEjecutivo: {
    titulo: 'Menu Ejecutivo',
    nota: 'Incluye bebida y postre. Sucursal Belgrano R., solo almuerzo.',
    precios: [
      { id: 'm1', nombre: 'Menu 1', precio: 23000 },
      { id: 'm2', nombre: 'Menu 2', precio: 25000 },
      { id: 'pasta', nombre: 'Menu Pasta', precio: 21000 },
    ],
    dias: [
      {
        dia: 'Lunes',
        entradas: ['Quesadillas con hummus, champinones salteados, pimientos asados y hojas verdes.'],
        principales: ['Milanesas de ternera con penne rigate a la crema.'],
        postre: 'Flan casero.',
      },
      {
        dia: 'Martes',
        entradas: [
          'Cake de portobello y mozzarella con ensalada de zanahoria asada, hojas verdes, huevo y choclo.',
        ],
        principales: ['Nroquís de papa con salsa boloñesa cortada a cuchillo.'],
        postre: 'Budin de pan con durazno.',
      },
      {
        dia: 'Miercoles',
        entradas: [
          'Ensalada caprese tibia con dados de mozzarella fritos, hojas verdes, tomates asados y pesto de olivas negras.',
        ],
        principales: ['Bondiola de cerdo braseada con salsa barbacoa y jenjibre y batatas fritas.'],
        postre: 'Tiramisú.',
      },
      {
        dia: 'Jueves',
        entradas: ['Risotto de hongos con vegetales asados y cebolla crispy.'],
        principales: [
          'Wrap de pollo apanado en cereales con queso cheddar, cebolla morada, hojas verdes, panceta crocante y aderezo de honey mustard, con papas pay.',
        ],
        postre: 'Lemon pie.',
      },
      {
        dia: 'Viernes',
        entradas: ['Milanesas de berenjena y mozzarella con salsa fileto, albahaca y olivas negras.'],
        principales: ['Colita de cuadril al horno con papa rellena.'],
        postre: 'Brownie con helado.',
      },
    ],
  },

  /* ------------------------------------------------------------- carta */
  categorias: [
    /* ------------------------------------------------ desayunos */
    {
      id: 'desayunos',
      nombre: 'Desayunos y Meriendas',
      glosa: 'Cafeteria de especialidad, pasteleria casera y combos para arrancar el dia.',
      tipo: 'comida',
      grupos: [
        {
          nombre: 'Cafeteria',
          items: [
            { n: 'Cafe gourmet Colombia', d: 'Cafe colombiano de especialidad', p: 4500, f: true },
            { n: 'Cafe expresso Brasil', p: 4500 },
            { n: 'Cafe expresso Descafeinado', p: 5000 },
            { n: 'Cortado Largo', p: 5000 },
            { n: 'Cafe con Leche', p: 6000 },
            { n: 'Cafe con leche almendras', p: 7000 },
            {
              n: 'Capuccino Italiano',
              d: 'Expresso doble, leche, crema, canela y chocolate rallado',
              p: 7000,
            },
            {
              n: 'Freddo Capuccino Italiano',
              d: 'Expresso frio, leche, crema, canela y chocolate rallado',
              p: 7000,
            },
            { n: 'Freddo Capuccino', d: 'Expresso frio, leche', p: 6500 },
            { n: 'Affogato', d: 'Expresso, helado crema americana', p: 7000 },
            {
              n: 'Baileys affogato',
              d: 'Shot de expresso, Baileys, helado crema americana y chocolate',
              p: 13000,
            },
            {
              n: 'Mokaccino Almendrado',
              d: 'Expresso doble, chocolate liquido, leche de almendras, crema y chocolate rallado',
              p: 8000,
            },
            { n: 'Flat white', d: 'Doble shot de expresso colombiano y espuma de leche', p: 6000 },
            {
              n: 'Caramel macchiato',
              d: 'Doble expresso, espuma de leche, crema y caramelo liquido',
              p: 6500,
            },
            { n: 'Sottomarino', d: 'Doble barrita de chocolate y leche', p: 6500 },
            { n: 'Irish', d: 'Whisky, doble expresso, crema, canela', p: 12000 },
            { n: 'Cubano', d: 'Ron, doble expresso, crema, chocolate rallado', p: 12000 },
            {
              n: 'Baileys',
              d: 'Baileys, doble expresso, crema, chocolate rallado y caramelo liquido',
              p: 13000,
            },
            { n: 'Te clasico', p: 4500 },
            { n: 'Te INTI ZEN', p: 5500, f: true },
          ],
        },
        {
          nombre: 'Pasteleria Casera',
          items: [
            { n: 'Medialuna', p: 2000 },
            { n: 'Brownie', p: 6500 },
            { n: 'Brownie de cafe y choco blanco', p: 7500 },
            { n: 'Muffin', d: 'De manzana', p: 8000 },
            { n: 'Alfajor de almendras', d: 'Masa de almendras y dulce de leche', p: 8000 },
            {
              n: 'Alfajor de chocolate blanco con dulce de leche y pistacho',
              p: 8000,
            },
            { n: 'Crumbl cookie chocolate o red velvet', p: 6500 },
            { n: 'Crumbl cookie pistacho y choco blanco', p: 6500 },
            { n: 'Roll de canela y azucar negra', p: 6500 },
            { n: 'Carrot cake', d: 'Budin dulce de zanahorias', p: 8000 },
            { n: 'Rogel de dulce de leche', p: 14000 },
            { n: 'Chocotorta de la abuela', p: 14000, f: true },
            {
              n: 'Muerto por chocolate',
              d: 'Volcan de chocolate con almendras tostadas y crema americana',
              p: 17000,
            },
            {
              n: 'Franuicake',
              d: 'Base de merengue de nueces, crema, brownie, salsa de frutos rojos y franui',
              p: 14000,
            },
            { n: 'Torta vasca', d: 'Cheesecake con salsa de chocolate o frutos rojos', p: 14000 },
            { n: 'Brownie con Americana', p: 13000 },
            { n: 'Apple pie', p: 14000 },
            { n: 'Apple pie con americana', p: 17000 },
            { n: 'Roll de canela y crema americana', p: 14000 },
          ],
        },
        {
          nombre: 'Combos Desayunos y Meriendas',
          nota: 'Incluye una infusion y medio exprimido.',
          items: [
            { n: 'Clasico', d: 'Con dos medialunas', p: 8000 },
            { n: 'Dos tostadas', d: 'Con mermelada y queso crema', p: 10000 },
            { n: 'Nuestra Granola', d: 'Con yogurt, miel y frutas de estacion', p: 15000 },
            { n: 'Duo Petit Croissant', d: 'Dos medialunas tostadas con jamon y queso', p: 15000 },
            {
              n: 'Avocado toast',
              d: 'Queso crema, palta, huevo revuelto y semillas',
              p: 16000,
            },
            {
              n: 'Salmon ahumado Merienda',
              d: 'Sobre pan de molde con guacamole y huevo poche',
              p: 22000,
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------ platos */
    {
      id: 'platos',
      nombre: 'Comidas',
      glosa: 'Picas, entradas, ensaladas, pastas y principales de la casa.',
      tipo: 'comida',
      grupos: [
        {
          nombre: 'Para Picar',
          items: [
            {
              n: 'Milanesas de Muzzarella en Dados',
              d: 'Con dip de salsa de fileto o barbacoa',
              p: 16000,
            },
            {
              n: 'Croquetas Buenos Aires',
              d: 'Rellenas de portobello, queso roquefort y puerro con salsa agli oli y siracha',
              p: 22000,
              f: true,
            },
            { n: 'Papas Fritas', p: 14000, f: true },
            { n: 'Hummus', p: 12000 },
            { n: 'Rabas 250gr', p: 22000 },
            { n: 'Papas Fritas con Cheddar y Panceta', p: 16000 },
            {
              n: 'Papas Fritas Bolognesas',
              d: 'Con bolognesa, cheddar, panceta, queso dambo y verdeo',
              p: 18000,
            },
            {
              n: 'Nachos Calientes',
              d: 'Cheddar, fileto, pico de gallo, queso dambo, verdeo y queso crema',
              p: 20000,
            },
            {
              n: 'Chicken Fingers',
              d: 'Con papas fritas, dip de fileto chili y mayonesa de jengibre',
              p: 22000,
            },
            {
              n: 'Duo de Milanga',
              d: 'De pollo y carne de cerdo en cortes con dips de honey mustard y barbacoa',
              p: 23000,
            },
            {
              n: 'Picada de la Banda de los Lunes',
              d: 'Dados de muzzarella apanados, tortilla de papas, hummus, albondigas de carne en fileto, milanesa de cerdo en cortes con dip de barbacoa, papas fritas con cheddar y berenjenas ahumadas',
              d2: '4 personas',
              p: 77000,
              f: true,
            },
            {
              n: 'Media Picada de los Lunes',
              d: 'Dados de muzzarella apanados, tortilla de papas, hummus, albondigas de carne en fileto, milanesa de cerdo en cortes con dip de barbacoa, papas fritas con cheddar y berenjenas ahumadas',
              d2: '2 personas',
              p: 42000,
            },
          ],
        },
        {
          nombre: 'Entradas',
          items: [
            {
              n: 'Geishas de Salmon Ahumado',
              d: 'Con guacamole picante sobre limas',
              p: 23000,
            },
            {
              n: 'Pinchos de Langostinos Crocantes',
              d: 'Hojas verdes con fileto chilli y mayonesa de jengibre',
              p: 22000,
            },
            {
              n: 'Chipirones Leon',
              d: 'Chipirones en vino blanco, cebolla, limon y papas con pimenton',
              p: 23000,
            },
            {
              n: 'Burrata Pitti',
              d: 'Con jamon crudo, mortadela con pistachio, albahaca y tomates secos',
              p: 23000,
            },
            { n: 'Hummus y Champignones', d: 'Con oliva, pimenton y sesamo tostado', p: 19000 },
            {
              n: 'Toston de Salmon Ahumado',
              d: 'En pan de campo tostado, guacamole y huevos revueltos',
              p: 22000,
            },
          ],
        },
        {
          nombre: 'Ensaladas',
          items: [
            { n: 'Caesar de Pollo', d: 'Lechuga, crotones, parmesano y aderezo caesar', p: 22000 },
            { n: 'Caesar de Langostinos', d: 'Lechuga, crotones, parmesano y aderezo caesar', p: 24000 },
            {
              n: 'Nuestra Caprese',
              d: 'Rucula, burrata, tomates secos, olivas, albahaca y tomates',
              p: 22000,
            },
            {
              n: 'Verde',
              d: 'Rucula, lechuga, apio, nueces, espinacas y mozarella apanada',
              p: 21000,
            },
            {
              n: 'Sebastian',
              d: 'Rolls de salmon ahumado con chessecream y palta, sobre verde, crotones y sesamo tostado',
              p: 23000,
            },
            { n: 'Tibia de Mar', d: 'Cachetes de salmon rosado, hojas verdes y choclo tostado', p: 25000 },
            {
              n: 'The Oldest',
              d: 'Pollo apanado con cereales y sesamo, hojas verdes, tomate, huevo duro y panceta crocante',
              p: 22000,
              f: true,
            },
            {
              n: 'Quinoa y Berenjena ahumada Apanada en Semillas',
              d: 'Con verde, tomate, palta, choclo tostado y mayonesa de maracuya',
              p: 22000,
            },
          ],
        },
        {
          nombre: 'Pastas',
          items: [
            {
              n: 'Sorrentinos de Calabaza y Muzzarella',
              d: 'En crema de brocoli y parmesano',
              p: 27000,
            },
            { n: 'Gnocchi Fritos de Alcauciles', d: 'En manteca de salvia, parmesano y limon', p: 28000 },
            { n: 'Gnocchi caseros', d: 'En crema de espinacas', p: 24000 },
            {
              n: 'Fusilli Pequenia Italia',
              d: 'Fileto, pesto, olivas, tomates secos y albondiguitas',
              p: 27000,
            },
            {
              n: 'Penne Rigate y Salmon Rosado',
              d: 'En salsa de salmon, pimientos y almendras tostadas',
              p: 28000,
            },
            {
              n: 'Fruto di Mare',
              d: 'Tagliateli con langostinos, mejillones y calamares en fileto, concase de tomate, albahaca, ajo y tomates secos',
              p: 29000,
              f: true,
            },
            { n: 'Vermicelli al Huevo', d: 'Fileto, verduras asadas y huevo a la plancha en juliana', p: 26000 },
            { n: 'Rigatoni Crema de Pesto', d: 'Crema, panceta y sesamo', p: 26000 },
          ],
        },
        {
          nombre: 'Principales',
          items: [
            {
              n: 'Lomo de La Barra',
              d: 'E mince de lomo en salsa de mostaza con papa rosti y panceta crocante',
              p: 45000,
              f: true,
            },
            { n: 'Pollo Henry del Soho', d: 'Suave salsa de romero y ajo con hortalizas asadas', p: 27000 },
            {
              n: 'Entrana Grillada',
              d: 'En vinagreta criolla y concase de tomate con mini ensalada de rucula, tomate y olivas negras',
              p: 42000,
            },
            { n: 'Ribs de la Bourbon', d: 'En barbacoa con batatas rusticas, aros de cebolla y checar', p: 36000 },
            { n: 'Pollo Hong Kong', d: 'Con vegetales, teriyaki y sesamo tostado', p: 26000 },
            { n: 'Bife de Chorizo Porteno', d: 'Con papas fritas y huevo frito', p: 42000 },
            {
              n: 'Risotto Portobello',
              d: 'Con verduras, almendras, champignones y emulsion de remolacha',
              p: 26000,
            },
            { n: 'Lomo Grillé', d: 'Con verduras asadas', p: 41000 },
            {
              n: 'Salmon Grillé',
              d: 'En aderezo de choclo, pimientos, tomates y lima con pure especiado de curcuma y puerros',
              p: 38000,
            },
            { n: 'Nodino de Lomo Nina', d: 'Dados de lomo en salsa strogonoff con mini gnocchi', p: 37000 },
            {
              n: 'Milanesas Blue de Cerdo',
              d: 'Fileto, mozarella, panceta, roquefort con pure saborizado de cebolla caramelizada',
              p: 28000,
            },
          ],
        },
        {
          nombre: 'Hamburguesas Gourmet',
          nota: 'Pan de papa. Medallon vegano "Not Co" y otros adicionales: +$ 4.000.',
          items: [
            {
              n: 'Fat Cat',
              d: 'Cebolla caramelizada, blue cheese, rucula, mostaza dijon, aros de cebolla',
              p: 24000,
              f: true,
            },
            {
              n: 'Tijuana',
              d: 'Guacamole, tomate, cebolla colorada, salsa jalapena, nachos con cheddar',
              p: 24000,
            },
            {
              n: 'Harlem',
              d: 'De bondiola de cerdo, cebolla caramelizada, panceta, cheddar, tomate, huevo a la plancha, barbacoa y aros de cebolla',
              p: 24000,
            },
            {
              n: 'Completa',
              d: 'Jamon, queso, tomate, lechuga, huevo a la plancha y papas fritas',
              p: 24000,
            },
            {
              n: 'Tachame la Doble (400g)',
              d: 'Doble hamburguesa, doble queso cheddar, doble queso dambo, lechuga y mayonesa de ajos confitados con papas, huevo frito y verdeo',
              p: 29000,
            },
            {
              n: 'Maraca Burger',
              d: 'Hamburguesa de carne con provoleta grillada, oregano, pimientos asados, cebollas caramelizadas con papas fritas',
              p: 26000,
            },
            {
              n: 'Vegan Burger y papas',
              d: 'Burger de berenjenas ahumadas, quinoa, verdeo y puerros, con tomate, cebollas caramelizadas y rucula',
              p: 24000,
            },
          ],
        },
        {
          nombre: 'Wraps y Sandwiches',
          items: [
            {
              n: 'Wrap de Pollo y Fritas',
              d: 'Verde, cebolla morada, cheddar, panceta y honey mustard',
              p: 24000,
            },
            {
              n: 'Focaccia California',
              d: 'Mortadela o crudo: burrata, rucula, tomates secos y pesto en focaccia de aceitunas negras',
              p: 22000,
            },
            {
              n: 'Sandwich Tweety',
              d: 'Pollo, tomate, queso, panceta, rucula en ciabatta con papas fritas',
              p: 24000,
            },
            {
              n: 'Sandwich Nordigo',
              d: 'Salmon ahumado, rucula, queso crema y ciboulette en pan bagel',
              p: 22000,
            },
            {
              n: 'Sandwich Lomo Completo',
              d: 'Jamon, queso, tomate, lechuga, huevo a la plancha y papas fritas',
              p: 30000,
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------ tragos */
    {
      id: 'tragos',
      nombre: 'Tragos y Jarras',
      glosa: 'Cocteleria de autor, clasicos y las mezclas que pido medio mundo.',
      tipo: 'bebida',
      grupos: [
        {
          nombre: 'Jarras',
          items: [
            { n: 'Maracuya', d: 'Bacardi, almibar de jengibre, menta y soda', p: 22000, k: 'jarra' },
            { n: 'Menta y Limon', d: 'Bacardi, almibar de jengibre, lima, menta y soda', p: 22000, k: 'jarra' },
            {
              n: 'Cinzano Rosso',
              d: 'Pomelo, pepino, vino blanco, almibar jengibre y cinzano rosso',
              p: 22000,
              k: 'jarra',
            },
            { n: 'Clerico', d: 'Frutas de estacion, azucar y vino blanco', p: 30000, k: 'jarra' },
          ],
        },
        {
          nombre: 'The Best Sellers',
          items: [
            { n: 'Gin Tonic Perfecto', d: 'Gordons, pepino y tonica', p: 12000, f: true },
            { n: 'Cuba Libre Bacardi', d: 'Coca, lima y bacardi', p: 11000, f: true },
            { n: 'Campari Orange', p: 11000 },
            { n: 'Fernetcola Branca', p: 11000 },
            { n: 'Cynar Pomelo', p: 11000 },
            { n: 'Negroni', d: 'Gin, Campari, Martini Rosso', p: 12000, f: true },
            { n: 'Old Fashioned', d: 'Bourbon, naranja, angostura, azucar', p: 13000 },
            { n: 'Cynar Julep', d: 'Cynar, almibar, pomelo rosado, menta', p: 12000 },
            { n: 'Mojito bacardi', d: 'Bacardi, jugo de lima, almibar, menta, soda', p: 12000 },
            { n: 'Margarita Clasico', d: 'Tequila, jugo lima, triple sec', p: 12000 },
            { n: 'Caipis', d: 'Con Cachaca, vodka o bacardi con lima y azucar', p: 12000 },
            { n: 'Irish Dream Frozen', d: 'Baileys, tia maria, crema americana', p: 14000 },
            {
              n: 'Daiquiri frozen Bacardi',
              d: 'Fruta a eleccion con bacardi y azucar',
              p: 13000,
            },
            { n: 'Aperol Spritz', d: 'Aperol, champagne, naranja, soda', p: 12000 },
            {
              n: 'Tinto de Verano',
              d: 'Vino tinto, rodaja de limon, rodaja de naranja, almibar y Sprite',
              p: 12000,
            },
            { n: 'White Russian', d: 'Tia maria, vodka, crema de leche', p: 11000 },
            {
              n: 'Bloody Mary',
              d: 'Jugo de tomate, vodka, tabasco, salsa inglesa, lima',
              p: 11000,
            },
          ],
        },
        {
          nombre: 'Cocteles',
          items: [
            { n: 'Cosmopolitan', d: 'Vodka, cranberry, cointreau', p: 14000 },
            { n: 'Nacional cosmo', d: 'Vodka, cranberry, triple sec', p: 12000 },
            { n: 'Apple Martini', d: 'Vodka, licor de manzana verde, jugo manzana', p: 12000 },
            { n: 'Martini Dry', d: 'Gordons, martini seco, aceituna verde', p: 11000 },
            { n: 'Manhatan', d: 'Bourbon, martini rosso, bitter angostura', p: 13000 },
            {
              n: 'Red Margarita',
              d: 'Tequila, triple sec, jugo lima, azucar, jugo de arandanos',
              p: 13000,
            },
            { n: 'Sidecar', d: 'Triple sec, cognac, limon', p: 11000 },
          ],
        },
        {
          nombre: 'Mezclas',
          items: [
            { n: 'Red Bull con Absolut', p: 16000 },
            { n: 'Speed con Absolut', p: 14000 },
            { n: 'Red Bull con Vodka', p: 14000 },
            { n: 'Perfecto Rey', d: 'Gin Gordons, pepino, miel, Fuerza rojo', p: 13000, f: true },
            { n: 'Jagger bomb', p: 17000 },
            { n: 'Damonjag bomb', p: 12000 },
            {
              n: 'Long Island ice tea',
              d: 'Bacardi, vodka, gin, tequila, triple sec, jugo lima, bebida cola',
              p: 13000,
            },
            {
              n: 'Sex on the Beach',
              d: 'Vodka, licor de durazno, jugo de naranja, granadina',
              p: 12000,
            },
          ],
        },
        {
          nombre: 'Caipis',
          items: [
            { n: 'Caipiranja', d: 'Absolut Mandarin, lima, naranja, azucar', p: 14000 },
            { n: 'Caipijager', d: 'Jagermaifter, lima, azucar', p: 15000 },
            {
              n: 'Sweet Bamboo',
              d: 'Frutillas, vodka, pepino, lima, almibar de jengibre',
              p: 13000,
            },
            { n: 'Caipiruya', d: 'Bacardi, almibar de jengibre, lima, maracuya', p: 13000 },
            { n: 'Caipidamonjag', d: 'Damonjag, lima, azucar', p: 13000 },
            {
              n: 'Caipitopo',
              d: 'Bacardi, almibar de jengibre, lima, anana, malibu',
              p: 13000,
            },
          ],
        },
        {
          nombre: 'Frozen',
          items: [
            { n: 'Sex Machine', d: 'Vodka, frutillas, jugo naranja', p: 13000 },
            { n: 'Maracuya Frozen', d: 'Bacardi, maracuya, crema americana', p: 13000 },
            {
              n: 'Baileys Split',
              d: 'Bacardi, Baileys, banana, crema de leche, dulce de leche',
              p: 15000,
            },
            { n: 'Estimulante siberiano', d: 'Melon, vodka, pomelo, azucar', p: 13000 },
            { n: 'Margarita dulce', d: 'Tequila, lima, triple sec, azucar', p: 13000 },
            { n: 'Mojito Frozen', d: 'Bacardi, jugo de lima, azucar, menta fresca', p: 13000 },
            {
              n: 'White Love',
              d: 'Absolut vainilla, baileys, amaretto, licor de chocolate blanco, crema de leche',
              p: 15000,
            },
            { n: 'Pina Colada', d: 'Anana, bacardi, malibu, crema de leche, azucar', p: 13000 },
            { n: 'Apple Blossom', d: 'Cognac, manzana, lima, azucar', p: 12000 },
          ],
        },
        {
          nombre: 'Sours',
          items: [
            { n: 'Pisco Sour', d: 'Pisco, jugo de lima, azucar, clara de huevo', p: 12000 },
            { n: 'Tom Collins', d: 'Gin Gordons, jugo de lima, azucar, clara de huevo', p: 12000 },
            {
              n: 'Pipita',
              d: 'Bacardi infusionado en canela, jugo de lima, almibar, maracuya, clara de huevo',
              p: 12000,
            },
            {
              n: 'Bourbon Buenos Aires',
              d: 'Bourbon, jugo de lima, almibar, clara de huevo, vino malbec',
              p: 13000,
            },
          ],
        },
        {
          nombre: 'Espumantes',
          nota: 'Espumantes de cocteleria, listos en copa.',
          items: [
            {
              n: 'Apeach Mojito',
              d: 'Absolut apeach, jugo de lima, almibar de jengibre, hojas de menta, champagne',
              p: 13000,
            },
            { n: 'Bellini', d: 'Durazno, azucar, champagne', p: 12000 },
            { n: 'Pop', d: 'Helado de limon, blue curacao, champagne', p: 12000 },
          ],
        },
        {
          nombre: 'De autor',
          items: [
            {
              n: 'Cinamon',
              d: 'Gin, tonica, almibar de pomelo infusionado con canela, rodaja de pomelo y cynar',
              p: 13000,
              f: true,
            },
            {
              n: 'Cardamon',
              d: 'Gin, tonica, almibar de maracuya infusionado en cardamomo, maracuya y vermouth',
              p: 13000,
              f: true,
            },
            {
              n: 'Red Gintonic',
              d: 'Gin, tonic, frutos rojos, amibar jengibre, rodaja de limon y malbec',
              p: 13000,
            },
            {
              n: 'Gintonic Estrellado',
              d: 'Gin, tonic, amibar de anis estrellado, rodaja de naranja, pepino y bitter angostura',
              p: 13000,
            },
            {
              n: 'Gintonic Maluma',
              d: 'Gin, tonic, licor strega, rodaja de pomelo y vermut linfa',
              p: 13000,
            },
            {
              n: 'Gintonic Mentolado',
              d: 'Gin, tonic, licor de menta, rodaja de lima, menta y fernet branca menta',
              p: 13000,
            },
            { n: 'Expresso Maluma', d: 'Tia maria, vodka, almibar y cafe', p: 13000 },
            { n: 'Amore Milano', d: 'Pomelo, almibar, limon, campari y bourbon', p: 13000 },
            { n: 'Penicillin', d: 'Miel, jengibre, limón, scotch', p: 13000 },
            { n: 'Flynn paff', d: 'Gin, almibar de flynn paff y sprite', p: 13000 },
          ],
        },
      ],
    },

    /* ------------------------------------------------ cerveza y bar */
    {
      id: 'bebidas-alcohol',
      nombre: 'Cerveza y Bar',
      glosa: 'Tirada, artesanal y una garrafa bien parada.',
      tipo: 'bebida',
      grupos: [
        {
          nombre: 'Cerveza Artesanal Bossanfolk Tirada',
          nota: 'Pinta.',
          items: [
            { n: 'India Pale Ale', d: 'Ibu 72, alc 7%', p: 7000 },
            { n: 'Scottish Ale', d: 'Ibu 22, alc 6%', p: 7000 },
            { n: 'Porter', d: 'Ibu 25, alc 6%', p: 7000 },
            { n: 'Blond', d: 'Ibu 22, alc 5%', p: 7000 },
            { n: 'Honey', d: 'Ibu 20, alc 7%', p: 7000 },
          ],
        },
        {
          nombre: 'Cerveza Tirada',
          items: [
            { n: 'Quilmes Rubia', d2: 'Pinta', p: 7000, k: 'jarra' },
            { n: 'Media Pinta Quilmes', p: 4000, k: 'jarra' },
            { n: 'Stella Artois', d2: 'Pinta', p: 8000, k: 'jarra' },
            { n: 'Amber Lager Patagonia', d: 'Ibu 20, alc 7%', p: 8000, k: 'jarra' },
            { n: 'Bohemian Pilsner Patagonia', d: 'Ibu 20, alc 7%', p: 8000, k: 'jarra' },
            { n: 'Ipa souco 24,7 Patagonia', d: 'Ibu 20, alc 7%', p: 8000, k: 'jarra' },
            { n: 'Porter patagonia', d: 'Ibu 20, alc 7%', p: 8000, k: 'jarra' },
            { n: 'Corona', d2: 'Porron', p: 7000, k: 'lata' },
            { n: 'Corona 710', p: 12000, k: 'lata' },
          ],
        },
        {
          nombre: 'Aperitivos y Vermuth',
          items: [
            { n: 'Nacionales', p: 5500 },
            { n: 'Fuerza', d: 'Blanco, rojo o primavera de los andes', p: 6500 },
            { n: 'Lunfa', p: 6500 },
          ],
        },
        {
          nombre: 'Bar',
          nota: 'Medidas sin mezcla.',
          items: [
            { n: 'Ron Bacardi 8 años', p: 18000 },
            { n: 'Ron Habana 7 años', p: 10000 },
            { n: 'Gin Apostoles solo', p: 7000 },
            { n: 'Gin Bombay solo', p: 9000 },
            { n: 'Gin Beefeater solo', p: 8000 },
            { n: 'Gin Hendriks solo', p: 16000 },
            { n: 'Gin Tanqueray solo', p: 9000 },
            { n: 'Tequila Jose Cuervo', p: 10000 },
            { n: 'Tequila Sombrero Negro', p: 6000 },
            { n: 'Cognac Remy Martin VSOP', p: 70000 },
          ],
        },
        {
          nombre: 'Vodka',
          items: [
            { n: 'Smirnoff', p: 7000 },
            { n: 'Absolut solo', p: 9000 },
            { n: 'Absolut Saborizados solos', p: 10000 },
            { n: 'Skyy', p: 7000 },
            { n: 'Belvedere', p: 27000 },
            { n: 'Stolichnaya', p: 15000 },
            { n: 'Finlandia', p: 24000 },
            { n: 'Pravda', p: 32000 },
            { n: 'Grey Goose', p: 22000 },
          ],
        },
        {
          nombre: 'Licores',
          items: [
            { n: 'Licores Nacionales', p: 5000 },
            { n: 'Amarula', p: 10000 },
            { n: 'Jagermeifter', p: 10000 },
            { n: 'Cointreau', p: 22000 },
            { n: 'Baileys', p: 10000 },
            { n: 'Drambuie', p: 13000 },
            { n: 'Limoncello Strega italiano', p: 11500 },
            { n: 'Limoncello artesanal', p: 5000 },
          ],
        },
        {
          nombre: 'Scotch',
          items: [
            { n: 'Ballantines', p: 10000 },
            { n: 'Ballantines 18', p: 20000 },
            { n: 'Chivas', p: 17000 },
            { n: 'Chivas 18', p: 41000 },
            { n: 'JB', p: 10000 },
            { n: 'JB reserve', p: 30000 },
            { n: 'Johnnie Walker red', p: 10000 },
            { n: 'Johnnie Walker black', p: 19000 },
            { n: 'Johnnie Walker double black', p: 23000 },
            { n: 'Johnnie Walker gold', p: 37000 },
            { n: 'Johnnie Walker blue', p: 126000 },
            { n: "Grant's", p: 11000 },
            { n: "Grant's cask edition", p: 18000 },
            { n: 'Famous Grouse', p: 17000 },
            { n: 'White Horse', p: 8000 },
            { n: "Dewar's 12 años", p: 19000 },
            { n: 'Cutty Sark', p: 16000 },
          ],
        },
        {
          nombre: 'Bourbon',
          items: [
            { n: 'Jack Daniels', p: 18000 },
            { n: 'Jack Daniels Honey', p: 19000 },
            { n: 'Jim Beam', p: 18000 },
            { n: 'Jim Beam Black', p: 30000 },
            { n: "Maker's Mark", p: 33000 },
            { n: 'Evan Williams', p: 27000 },
            { n: 'Jim beam Honey', p: 20000 },
            { n: 'Wild Turkey', p: 18000 },
            { n: 'Benchmark', p: 15000 },
          ],
        },
        {
          nombre: 'Irish',
          items: [
            { n: 'Jameson', p: 10000 },
            { n: 'Jameson black barrel', p: 24000 },
            { n: 'Jameson caskmate ipa', p: 16000 },
            { n: 'Tullamore Dew', p: 20000 },
          ],
        },
        {
          nombre: 'Single Malt',
          items: [
            { n: 'Cardhu', p: 76000 },
            { n: 'Glenfiddich 12', p: 48000 },
            { n: 'Glenkinchie 12', p: 53000 },
            { n: 'The Glenlivet 12', p: 28000 },
            { n: 'Scapa', p: 47000 },
            { n: 'Talisker', p: 54000 },
            { n: 'Caolila 12', p: 55000 },
            { n: 'Macallan 12', p: 95000 },
            { n: 'Aberlour', p: 34000 },
          ],
        },
      ],
    },

    /* ------------------------------------------------ sin alcohol */
    {
      id: 'sin-alcohol',
      nombre: 'Sin Alcohol',
      glosa: 'Gaseosas, jugos, licuados y cerveza sin alcohol.',
      tipo: 'bebida',
      sinAlcohol: true,
      grupos: [
        {
          nombre: 'Gaseosas, Aguas y Saborizadas',
          items: [
            { n: 'Gaseosas', d: 'Linea Coca Cola', p: 5000, k: 'lata' },
            { n: 'Agua mineral', p: 4500, k: 'botella' },
            { n: 'Agua Saborizada', p: 4500, k: 'botella' },
            { n: 'Limonada', d: 'Limon, jengibre, menta', p: 6500, k: 'copa' },
            { n: 'Pomelada frozen', d: 'Pomelo, almibar', p: 7000, k: 'copa' },
            { n: 'Limonada de la casa', d: 'Limon, naranja, pomelo, menta', p: 7500, k: 'copa' },
            {
              n: 'Limonada de frutos rojos',
              d: 'Limon, naranja, frutos rojos, jengibre',
              p: 8000,
              k: 'copa',
            },
            { n: 'Exprimido', d: 'Naranja o pomelo', p: 7000, k: 'vaso' },
            { n: 'Cerveza sin Alcohol Corona', p: 7000, k: 'lata' },
          ],
        },
        {
          nombre: 'Licuados',
          items: [
            {
              n: 'Licuado',
              d: 'Banana, manzana, anana, melon, frutilla, durazno o limon. Con agua o leche',
              p: 7500,
              k: 'vaso',
            },
            { n: 'Licuado con exprimido de naranjas', p: 8000, k: 'vaso' },
            { n: 'Minerva', d: 'Maracuya, hojas de menta, pomelo', p: 8000, k: 'vaso' },
            { n: 'Pina', d: 'Anana, frutos rojos, exprimido de naranjas', p: 8000, k: 'vaso' },
            {
              n: 'Almendras, banana y Miel',
              d: 'Leche de almendras, canela',
              p: 8000,
              k: 'vaso',
            },
            {
              n: 'The oldest 600',
              d: 'Banana, helado dulce de leche, salsa de chocolate',
              p: 10000,
              k: 'vaso',
            },
            { n: 'Mil shake', d: 'Helado, leche', p: 8500, k: 'vaso' },
          ],
        },
      ],
    },

    /* ------------------------------------------------ vinos */
    {
      id: 'vinos',
      nombre: 'Vinos',
      glosa: 'Bodega argentina de punta, con una buena lista de malbec.',
      tipo: 'bebida',
      grupos: [
        {
          nombre: 'Vinos por Copa',
          items: [
            { n: 'Copa Benjamin Nieto', p: 5500, k: 'copa' },
            { n: 'Copa Escorihuela Gascon', p: 6000, k: 'copa' },
            { n: 'Copa Escorihuela roble', d: 'Malbec o chardonnay', p: 7000, k: 'copa' },
          ],
        },
        {
          nombre: 'Malbec',
          items: [
            { n: 'Benjamin Nieto', p: 16000 },
            { n: 'Lagarde', p: 20000 },
            { n: 'Zuccardi Q', p: 35000 },
            { n: 'Zuccardi Serie A', p: 27000 },
            { n: 'Alambrado', p: 18000 },
            { n: 'Santa Julia Malbec del Mercado', p: 19000 },
            { n: 'Nieto Senetiner', p: 19000 },
            { n: '375 Nieto Senetiner', p: 14000 },
            { n: 'Nieto Senetiner Doc', p: 24000 },
            { n: 'Cordero de Piel de Lobo', p: 18000 },
            { n: 'Perro Callejero', p: 23000 },
            { n: 'Tomero', p: 23000 },
            { n: 'Escorihuela Gascon Familia', p: 18000 },
            { n: 'Escorihuela Gascon Roble', p: 24000 },
            { n: 'Escorihuela Gascon Gran Reserva', p: 30000 },
            { n: 'Rosaura Escorihuela Gascon', p: 38000 },
            { n: 'Trumpeter', p: 26000 },
            { n: 'La Anita', p: 28000 },
            { n: 'Rutini', p: 55000 },
          ],
        },
        {
          nombre: 'Cabernet Malbec',
          items: [
            { n: 'Rutini cab malbec', p: 32000 },
            { n: 'Catena DV', p: 32000 },
          ],
        },
        {
          nombre: 'Pinot Noir',
          items: [
            { n: 'Escorihuela Gascon', p: 27000 },
            { n: 'Flores Negras', p: 24000 },
            { n: 'Nieto Senetiner', p: 20000 },
          ],
        },
        {
          nombre: 'Petit Verdot',
          items: [{ n: 'La Anita', p: 31000 }],
        },
        {
          nombre: 'Cabernet Sauvignon',
          items: [{ n: 'Trumpeter', p: 26000 }],
        },
        {
          nombre: 'Blend de Tintas',
          items: [
            { n: 'Mosquita Muerta', p: 40000 },
            { n: 'The Presidents Blend', p: 57000 },
            { n: 'Sapo de Otro Pozo', p: 31000 },
          ],
        },
        {
          nombre: 'Cabernet Franc',
          items: [
            { n: 'Escorihuela Roble Gascon', p: 24000 },
            { n: 'Nicasia', p: 24000 },
            { n: 'Alambrado', p: 21000 },
          ],
        },
        {
          nombre: 'Viognier',
          items: [{ n: 'Flores blancas', p: 21000 }],
        },
        {
          nombre: 'Chardonay',
          items: [
            { n: 'Trumpeter', p: 26000 },
            { n: 'Escorihuela Gascon Familia', p: 17000 },
            { n: 'Escorihuela Gascon Roble', p: 22000 },
          ],
        },
        {
          nombre: 'Sauvignon Blanc',
          items: [{ n: 'Tomero', p: 22000 }],
        },
        {
          nombre: 'Dulces',
          items: [
            { n: 'Norton cosecha tardia', p: 15000 },
            { n: 'San Felipe Tardio Roble', p: 18000 },
          ],
        },
        {
          nombre: 'Rosado',
          items: [
            { n: 'Santa Julia Rose Syrah', p: 18000 },
            { n: 'Nieto Senetiner Rose', p: 18000 },
            { n: 'Tomero Rosado', p: 23000 },
          ],
        },
        {
          nombre: 'Espumantes',
          items: [
            { n: 'Chandon 375 Brut Rose', p: 30000 },
            { n: 'Chandon 187 Extra Brut', p: 16000 },
            { n: 'Baron B. Extra Brut', p: 60000 },
            { n: 'Chandon Extra Brut', p: 49000 },
            { n: 'Nieto S. Rose', p: 34000 },
            { n: 'Nieto S. Brut Nature', p: 36000 },
            { n: 'Nieto S. Extra Brut', p: 34000 },
            { n: 'Salentein Extra Brut', p: 37000 },
            { n: 'Salentein Brut Nature', p: 40000 },
            { n: 'Alambrado pinot rose', p: 36000 },
            { n: 'Ecorihuela Gascon rose', p: 38000 },
            { n: 'Nieto S.B.N. Gran Cuve', p: 45000 },
          ],
        },
      ],
    },

    /* ------------------------------------------------ postres */
    {
      id: 'postres',
      nombre: 'Postres',
      glosa: 'Caseros, con dulce de leche y bastante crema americana.',
      tipo: 'comida',
      grupos: [
        {
          nombre: 'Postres',
          items: [
            { n: 'Flan Casero de Manzanas', d: 'Con crema de canela y nueces', p: 12000, f: true },
            { n: 'Rogel de dulce de leche', p: 14000 },
            { n: 'Panqueque de dulce de leche', p: 12000 },
            { n: 'Panqueque de dulce de leche y crema americana', p: 14000 },
            { n: 'Chocolate Primario', d: 'Mousse de chocolate blanco con corazon de maracuya', p: 15000 },
            {
              n: 'Chocotorta de la Abuela',
              d: 'Chocolinas humedas, dulce de leche casero y queso crema',
              p: 14000,
              f: true,
            },
            { n: 'Roll de canela y crema americana', p: 14000 },
            {
              n: 'American Berry',
              d: 'Reduccion de Malbec, frutos rojos, helado de crema americana y crocante',
              p: 14000,
            },
            {
              n: 'The Oldest',
              d: 'Brownie, helado de crema americana, nueces y salsa de frutos rojos o charlotte',
              p: 13000,
              f: true,
            },
            { n: 'Torta de Manzanas', p: 14000 },
            { n: 'Torta de manzanas con americana', p: 17000 },
            { n: 'Torta Vasca', d: 'Cheesecake con salsa de frutos rojos', p: 14000 },
            {
              n: 'Franuicake',
              d: 'Con base merengue de nueces, brownie, crema, salsa frutos rojos y franui',
              p: 14000,
            },
            {
              n: 'Muero por Chocolate',
              d: 'Volcan de chocolate con almendras tostadas y crema americana',
              p: 17000,
            },
            {
              n: 'Helado dos gustos',
              d: 'Dulce de leche, vainilla, chocolate, frutilla y americana',
              p: 12000,
            },
          ],
        },
      ],
    },
  ],
}
