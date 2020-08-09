// Servidor
const express = require("express")
const server = express()

const {
    pageLanding,
    pageStudy,
    pageGiveClasses
} = require("./pages")

// configurar nunjucks (template engine)
const nunjucks =require("nunjucks")
nunjucks.configure("src/views",{
    express: server,
    noCash: true, // desativando o cash

})

//Início e configuração do servidor
server
// configurar arquívos estáticos (css, scripts, imagens)
.use(express.static("public"))
// rotas da aplicação
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
// Start do servidor
.listen(5500)

