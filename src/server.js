// Dados
const proffys = [
    {
        name: "Diego Fernandes",
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
        whatsapp: "21 8888-9547",
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões",
        subject: "Química",
        cost: "20",
        weekday: [0],
        time_from: [720],
        time_to: [1220]
    },
    {
        name: "Felipe Gueller",
        avatar: "https://avatars1.githubusercontent.com/u/35064154?s=460&u=5804d65637d0a43ce43f50dcb42d49d89d43210d&v=4",
        whatsapp: "21 8888-9547",
        bio: "Entusiasta pela busca das novas tecnologias.<br><br>Apaixonado pelo desenvolvimento de aplicativos no framework flutter. Venha comigo fazer parte desse processo constante de aprendizagem",
        subject: "Artes",
        cost: "40",
        weekday: [2],
        time_from: [1240],
        time_to: [2500]
    }
]

const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
]

function getSubject(subjectNumber){
    const arrayPosition = +subjectNumber - 1
    return subjects[arrayPosition]
}

//  Funcionalidades
function pageLanding(req, res) {
    return res.render("index.html")
}

function pageStudy(req, res) {
    const filters = req.query // recebe os dados provenientes do navegador
    return res.render("study.html", { proffys, filters, subjects, weekdays})
}

function pageGiveClasses(req, res) {
    const data = req.query
    
    const isNotEmpty = Object.keys(data).length > 0
    // se tiver dados (data)
    if(isNotEmpty){

        data.subject = getSubject(data.subject)

        // adicionar dados a lista de proffys
        proffys.push(data)
        
        return res.redirect("/study")
    }

    // se não, mostrar a página
    return res.render("give-classes.html", {subjects, weekdays})
}

// Servidor
const express = require("express")
const server = express()

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

