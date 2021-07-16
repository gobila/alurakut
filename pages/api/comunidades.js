import { SiteClient } from 'datocms-client';

export default async function Community(request, response) {
    if(request.method === 'POST') {
        const TOKEN = '6977b65171b9f1b991c7a40cdce3ce';
        const client = new SiteClient(TOKEN);

        // Validar os dados, antes de sair cadastrando
        const registroCriado = await client.items.create({
            itemType: "972642", // ID do Model de "Communities" criado pelo Dato
            ...request.body,
            // title: "Comunidade de Teste",
            // image_url: "https://github.com/omariosouto.png",
            // founder: "omariosouto",
            // description:'teste'
        })

        console.log(registroCriado);

        response.json({
            dados: 'Algum dado qualquer',
            registroCriado: registroCriado,
        })
        return;
    }

    response.status(404).json({
        message: 'Ainda não temos nada no GET, mas no POST tem!'
    })
} 