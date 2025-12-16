document.addEventListener('DOMContentLoaded', () => {
    // ** IMPORTANTE: Substitua '5511999999999' pelo seu número de WhatsApp, incluindo o código do país (55) e o DDD. **
    const whatsappNumber = '554796062342'; 
    const productGrid = document.querySelector('.product-grid');

    // ** DADOS DOS PRODUTOS - EDITE APENAS ESTA SEÇÃO PARA GERENCIAR SEUS PRODUTOS **
    // Para adicionar um novo produto, copie e cole um bloco de produto (entre as chaves {})
    const products = [
        {
            name: "Bolacha Amanteigada Kg",
            price: 34.00,
            image: "placeholder-produto-1.jpg", // Substitua pelo caminho da sua imagem
            description: "Deliciosas e macias, nossas bolachas amanteigadas derretem na boca, proporcionando um sabor suave e irresistível. Perfeitas para qualquer hora do dia!"
        },
        {
            name: "Bolacha ferradura com chocolate kg",
            price: 38.00,
            image: "placeholder-produto-2.jpg",
            description: "Feitas com uma massa crocante e envoltas em uma camada generosa de chocolate, as bolachas ferradura são a combinação perfeita de crocância e cremosidade. Um prazer para os amantes de chocolate!"
        },
        {
            name: "Bolacha de pintada KG",
            price: 45.00,
            image: "placeholder-produto-3.jpg",
            description: "Com um toque especial de especiarias natalinas, nossas bolachas de Natal trazem todo o sabor e a magia da temporada. Envolva-se no espírito das festas com cada mordida!"
        },
        // Adicione mais produtos aqui seguindo o mesmo formato
    ];

    // Função para renderizar os produtos
    const renderProducts = () => {
        if (!productGrid) return;

        productGrid.innerHTML = products.map(product => {
            const formattedPrice = product.price.toFixed(2).replace('.', ',');
            return `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p class="price">R$ ${formattedPrice}</p>
                    <p class="description">${product.description}</p>
                    <button class="btn-whatsapp" data-product="${product.name}" data-price="${product.price}">
                        <i class="fab fa-whatsapp"></i> Comprar via WhatsApp
                    </button>
                </div>
            `;
        }).join('');

        // Re-atribuir listeners após a renderização
        attachWhatsappListeners();
    };

    // Função para formatar a mensagem e abrir o WhatsApp
    const openWhatsApp = (message) => {
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    };

    // Função para anexar listeners aos botões de WhatsApp dos produtos
    const attachWhatsappListeners = () => {
        const productButtons = document.querySelectorAll('.product-card .btn-whatsapp');
        
        productButtons.forEach(button => {
            button.addEventListener('click', () => {
                const productName = button.getAttribute('data-product');
                // Usamos parseFloat e toFixed(2) para garantir o formato correto do preço na mensagem
                const productPrice = parseFloat(button.getAttribute('data-price')).toFixed(2).replace('.', ',');
                
                const message = `Olá! Tenho interesse no produto *${productName}* pelo preço de R$ ${productPrice}. Gostaria de mais informações.`;
                
                openWhatsApp(message);
            });
        });
    };

    // Funcionalidade para o botão de contato geral
    const contactButton = document.getElementById('btn-contact-whatsapp');
    
    if (contactButton) {
        contactButton.addEventListener('click', (e) => {
            e.preventDefault(); // Previne o comportamento padrão do link
            const message = "Olá! Gostaria de entrar em contato com a loja para tirar uma dúvida geral.";
            openWhatsApp(message);
        });
    }

    // Inicia a renderização dos produtos ao carregar a página
    renderProducts();
});

