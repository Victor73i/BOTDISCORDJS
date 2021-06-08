const Discord = require("discord.js");
const config= require("./config.json");
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });


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
                message.reply('tu reaccionaste a pulgar arriba');
            } else {
                message.reply('tu reaccionaste a pulgar abajo');
            }
        })
        .catch(collected => {
            message.reply('REACCIONA A UN EMOJIN HDP');
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

client.on('messageReactionAdd', async (reaction, user) => {
	// When a reaction is received, check if the structure is partial
	if (reaction.partial) {
		// If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message: ', error);
			// Return as `reaction.message.author` may be undefined/null
			return;
		}
	}
	// Now the message has been cached and is fully available
	console.log(`${reaction.message.author}'s message "${reaction.message.content}" gained a reaction!`);
	// The reaction is now also fully available and the properties will be reflected accurately:
	console.log(`${reaction.count} user(s) have given the same reaction to this message!`);
});


client.login(config.BOT_TOKEN)