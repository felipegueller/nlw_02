const Database = require("./db")
const createProffy = require("./createProffy")



Database.then( async (db) => {
    
    // inserir dados
    proffyValue = {
        name: "Felipe Gueller",
        avatar: "https://avatars1.githubusercontent.com/u/35064154?s=460&u=5804d65637d0a43ce43f50dcb42d49d89d43210d&v=4",
        whatsapp: "21 8888-9547",
        bio: "Entusiasta pela busca das novas tecnologias.<br><br>Apaixonado pelo desenvolvimento de aplicativos no framework flutter. Venha comigo fazer parte desse processo constante de aprendizagem",
    }

    classValue = {
        subject: 1,
        cost: "40",
        // o proffy id virá pelo banco de dados
    }

    classScheduleValues = [
        // class_id virá pelo banco de dados, após cadastrasmos a aula (class)
        {
            weekday: 2,
            time_from: 1240,
            time_to: 2500
        },
        {
            weekday: 5,
            time_from: 720,
            time_to: 1100
        }
    ]

    /* Aguardando a criação do proffy */
    // await createProffy(db, {proffyValue, classValue, classScheduleValues})

    // realizar a consulta no banco de dados

    // todos os proffys
    const selectedProffys = await db.all("SELECT * FROM proffys")
    // console.log(selectedProffys)

    /* Consultar as classes de um determinado proffessor
        e trazer junto os dados do profesor */
        const selectClassesAndProffys = await db.all(`
            SELECT classes.*, proffys.*
            FROM proffys
            JOIN classes ON (proffys.id = classes.proffy_id)
            WHERE classes.proffy_id = 1;
        `)
        // console.log(selectClassesAndProffys)

        // O horário que a pessoa trabalha, por exemplo, é das 8h às 18h
        // O horário do time_from (8h) precisa ser menor ou igual do horário solicitado
        // o time_to precisa ser acima
        const selectClassesSchedules = await db.all(`
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = 1
            AND class_schedule.weekday = "5"
            AND class_schedule.time_from <= "1300"
            AND class_schedule.time_to > "1600"
             
        `)

        console.log(selectClassesSchedules)
})