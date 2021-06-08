const Discord = require("discord.js");
const config= require("./config.json");
const client= new Discord.Client()

//cuando este el cliente operativo realizo estas acciones

client.on('ready', () =>{
//variable que guarda el id del canal
    var generalChannel = client.channels.cache.get("851649718504652820")

//envia un mensaje a este canal 
    generalChannel.send("hola a todos estos mecos")   

}
)

client.on('message', message =>{
    if(message.content === 'hola'){
       //si escribimos hola, nos contestara con un mensaje personalizado
    message.channel.send('Hola, bienvenido a la tuya por si acaso');
    message.react('🍎');
    message.react('🍊');
    message.react('🍇');    
   }
    if(message.content === 'BUENOS DIAS' ){
    //si escribimos hola, nos contestara con un mensaje personalizado
    message.channel.send('Para ti son malos dias XD');    
    message.react('🍇');

   }
    if(message.content === 'buenos dias' ){
    //si escribimos hola, nos contestara con un mensaje personalizado
    message.react('😄');

    message.channel.send('Para ti son malos dias XD');    
   }
   if (message.content === '!react') {
    message.react('👍').then(() => message.react('👎'));

    const filter = (reaction, user) => {
        return ['👍', '👎'].includes(reaction.emoji.name) && user.id === message.author.id;
    };
    
    message.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
        .then(collected => {
            const reaction = collected.first();
    
            if (reaction.emoji.name === '👍') {
                message.reply('you reacted with a thumbs up.');
            } else {
                message.reply('you reacted with a thumbs down.');
            }
        })
        .catch(collected => {
            message.reply('you reacted with neither a thumbs up, nor a thumbs down.');
        });
 }
if (message.content === '!fruits') {
    message.react('🍎');
    message.react('🍊');
    message.react('🍇');
}
if (message.content === '!fruit') {
    message.react('🍎')
        .then(() => message.react('🍊'))
        .then(() => message.react('🍇'))
        .catch(error => console.error('One of the emojis failed to react:', error));
}
if (message.content === '!frui') {
	Promise.all([
		message.react('🍎'),
		message.react('🍊'),
		message.react('🍇'),
	])
		.catch(error => console.error('One of the emojis failed to react:', error));
}
});




client.login(config.BOT_TOKEN)