const { Client, GatewayIntentBits, EmbedBuilder, REST, Routes } = require('discord.js');
const fs = require('fs');
const chalk = require('chalk');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

var config;

const userRoles = {
    'developer':'934862193235726368',
    'bathroom_monitor':'961686827327193130',
    'pr':'964297340750008322'
}

if (process.env.URI) {
    config = process.env;
}
else {
    const configData = fs.readFileSync('../config.json', 'utf-8');
    config = JSON.parse(configData);
}

const dbclient = new MongoClient(config.URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

db = dbclient.db("ppsbathrooms");
dataColl = db.collection("data");
userColl = db.collection("users");

dbclient.connect()
  .then(() => {
    console.error(chalk.grey('bot connected to database'));
    connectToClient();
  })
  .catch(err => {
    console.error('bot failed to connect to the database:', err);
  });

const commands = [
  {
    name: 'test',
    description: 'tests connection',
  },
  {
    name: 'users',
    description: 'get list of users'
  }
];

const rest = new REST({ version: '10' }).setToken(config.DISCORD_TOKEN);

async function connectToClient() {
    try {
        await rest.put(Routes.applicationCommands(config.DISCORD_ID), { body: commands });
    } catch (error) {
        console.error(error);
    }
}

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});
client.on('ready', () => {
    console.log(chalk.grey(`discord bot connected as ${client.user.tag}`));
});

client.on('messageCreate', message => {
  if (!message.content.toLowerCase().includes('actually')) {
    return;
  }
    message.channel.send('☝️🤓')
    .catch(error => {
        console.error('failed to make fun of a nerd: ', error);
    });
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'test') {
    await interaction.reply('bot connected');
  }
  if (interaction.commandName === 'users') {
    const member = interaction.guild.members.cache.get(interaction.user.id);

  if (!member.roles.cache.some(role => role.id === userRoles.developer)) {
    await interaction.reply('you do not have the required role to use this command.');
    return;
  }

    userColl.find({}, { projection: { _id: 0, username: 1, key: 1 } }).toArray(async function(err, result) {
        if (err) {
            console.error('Error occurred while fetching data:', err);
            return;
        }

        usernames = result.map(user => ({ name: '#' + user.key, value: user.username, inline: true}));

        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('users')
            .addFields(usernames)
            .setTimestamp()
        await interaction.reply({embeds: [embed]});
    });
  }
});

client.login(config.DISCORD_TOKEN);

async function botSendMessage(channelId, message, embed) {
  try {
    const channel = await client.channels.fetch(channelId);
    if (!channel) {
      console.error('Channel not found');
      return;
    }
    if(embed) {
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setDescription(message)
            .setTimestamp()
        channel.send({embeds: [embed]});
    }
    else {
        channel.send(message)
    }
} catch (error) {
    console.error('Error sending message to channel:', error);
  }
}

module.exports = { botSendMessage };