# WeatherNow

Aplicação web que consulta o clima atual de qualquer cidade usando a API da [OpenWeather](https://openweathermap.org/current). Desenvolvida com JavaScript puro e Vite na disciplina de Desenvolvimento de Plataformas Web (Unifor).

## Funcionalidades

- Busca do clima pelo nome da cidade
- Temperatura, sensação térmica, umidade, vento (km/h) e descrição em português
- Mensagens de erro específicas: cidade não encontrada, chave inválida, falta de conexão e campo vazio
- Botão desabilitado durante a consulta, para evitar requisições duplicadas
- Acessibilidade: resultado anunciado por leitores de tela (`aria-live`), rótulo oculto para o campo de busca, foco visível e respeito a `prefers-reduced-motion`
- Layout responsivo para celular

## Tecnologias

- JavaScript (ES Modules, `async/await`, Fetch API)
- Vite
- CSS com variáveis e media queries
- API REST da OpenWeather

## Como executar

Requer [Node.js](https://nodejs.org/) e uma chave gratuita da [OpenWeather](https://home.openweathermap.org/api_keys).

```bash
git clone https://github.com/jpcmoraess/weathernow.git
cd weathernow
npm install
cp .env.example .env
```

Abra o arquivo `.env`, coloque sua chave no lugar de `sua_chave_aqui` e rode:

```bash
npm run dev
```

## Estrutura

```
src/
  main.js     interface, eventos do formulário e renderização do resultado
  weather.js  chamada à API e tratamento de erros por status HTTP
  style.css   estilos, estados de interação e responsividade
```

## Limitação conhecida

Variáveis com prefixo `VITE_` são embutidas no JavaScript enviado ao navegador, então a chave da API fica visível para quem inspecionar o site publicado. Para um projeto de estudo com chave gratuita isso é aceitável. Em produção, a solução é mover a chamada para uma função no servidor (por exemplo, uma Serverless Function da Vercel) que guarda a chave e repassa só o resultado.
