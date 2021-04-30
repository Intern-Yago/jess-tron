const discord = require('discord.js')
const client = new discord.Client()
const config = require('./config.json')

client.on('ready', ()=>{
    console.log('Iniciando sistema e captando dados...')
    console.log(`Receptado os valores: 
@ Pessoas: ${client.users.cache.size}; 
@ Canais: ${client.channels.cache.size}; 
@ Servidores: ${client.guilds.cache.size}.`)
client.user.setActivity(`A única regra é sobreviver`)
})

client.on('guildCreate', guild =>{
    console.log(`Serviço acionado por:
@ Nome: ${guild.name};
@ ID: ${guild.id};
@ Membros: ${guild.memberCount}`)
})

client.on('guildDelete', guild => {
    console.log(`O protocolo ${guild.id}, vulgo ${guild.name} foi encerrado`)
})

client.on("message", async message => {

    if(message.author.bot) return
    if(message.channel.type === "dm") return
    if(!message.content.startsWith(config.prefix)) return

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g)
    const comando = args.shift().toLowerCase()
    switch(comando){
        case "ping":
            const m = await message.channel.send('Analisando...')
            m.edit(`A consistência da minha conexão é de ${m.createdTimestamp - message.createdTimestamp}ms
A latência está de ${Math.round(client.ws.ping)}ms`)
            break
        case "comandos":
            message.channel.send(`Você solicitou um pedido de ajuda para os comandos. Estes são eles:
*OBS: Basta digitar "/" que você receberá um link para maiores detalhes*
/ping - Verificar a latência 
/comandos - Mostra esta tela de comandos
`)
            break
        default:
            message.channel.send('Irei ajudar')
            console.log(`${comando}`)
            break
        
        
    }
})

client.login(config.token)