const { Client, GatewayIntentBits, EmbedBuilder, REST, SlashCommandBuilder, Routes } = require('discord.js');
const fs = require('fs');
const chalk = require('chalk');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

var config;

const userRoles = {
    'developer':'934862193235726368',
    'bathroom_monitor':'961686827327193130',
    'pr':'964297340750008322'
}

const channels = {
  'admin':'965728549728309269',
  'general':'934859916903067702',
  'info':'961690424924323991',
  'bot-testing':'968269586648662086',
  'bug_reports':'1192545181954752624'
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
  new SlashCommandBuilder()
    .setName('test')
    .setDescription('tests bot connection'),
  new SlashCommandBuilder()
    .setName('users')
    .setDescription('get a list of users'),
  new SlashCommandBuilder()
    .setName('bug')
    .setDescription('report a bug with ppsbathrooms')
    .addStringOption(option =>
      option.setName('bug')
        .setDescription('the bug that you\'re experiencing')
        .setRequired(true))
  ];

const rest = new REST({ version: '10' }).setToken(config.DISCORD_TOKEN);

async function connectToClient() {
    try {
        await rest.put(Routes.applicationCommands(config.DISCORD_ID), { body: commands });
        client.user.setStatus('🚽');
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
  const member = interaction.guild.members.cache.get(interaction.user.id);

  if (interaction.commandName === 'test') {
    await interaction.reply('bot connected');
  }
  else if (interaction.commandName === 'users') {
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

  else if (interaction.commandName === 'bug') {
    const embedResponse = new EmbedBuilder()
        .setColor(0x0099FF)
        .setDescription(`thank you for the bug report, the developers have been notified.`)
    await interaction.reply({
      embeds: [embedResponse],
      ephemeral: true
    });

    const devEmbed = new EmbedBuilder()
        .setColor(0xFF0000)
        .setAuthor({name:interaction.user.username, iconURL: member.displayAvatarURL()})
        .setTitle('Bug Report')
        .setDescription(interaction.options.getString('bug').toString())
        .setTimestamp()
    const channel = await client.channels.fetch(channels.bug_reports);
    await channel.send({embeds: [devEmbed]});
  }
});

client.login(config.DISCORD_TOKEN);

async function botSendMessage(channelId, message, embed, ephemeral) {
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
            .ephemeral(ephemeral)
        channel.send({embeds: [embed]});
    }
    else {
        channel.send(message, {ephemeral: ephemeral})
    }
} catch (error) {
    console.error('Error sending message to channel:', error);
  }
}

module.exports = { botSendMessage };