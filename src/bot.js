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
  config = {
    "URI":process.env.URI,
    "EMAIL_API":process.env.EMAIL_API,
    "TRIVORY_API":process.env.TRIVORY_API,
    "DISCORD_TOKEN":process.env.DISCORD_TOKEN,
    "DISCORD_ID":process.env.DISCORD_ID
  }
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
        .setDescription('the bug you\'re experiencing')
        .setRequired(true)),
  new SlashCommandBuilder()
    .setName('password')
    .setDescription('get the password for a school')
    .addStringOption(option =>
      option.setName('school')
        .setDescription('chs/fhs/ihs')
        .setRequired(true))
  ];

const rest = new REST({ version: '10' }).setToken(config.DISCORD_TOKEN);

//try to stop bot from becoming ded
setInterval(function() {
    if (!client.user) {
        connectToClient();
    }
}, 30000);

async function connectToClient() {
    try {
        await rest.put(Routes.applicationCommands(config.DISCORD_ID), { body: commands });
        // client.user.setStatus('🚽');
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
    try {
      const users = await userColl.find({}).toArray();

      usernames = users.map(user => ({ name: '#' + user.key, value: user.username, inline: true}));
      const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('users')
        .addFields(usernames)
        .setTimestamp()
      await interaction.reply({embeds: [embed]});
    } catch (error) {
      console.error('Error fetching usernames:', error);
    }
  }

  else if (interaction.commandName === 'password') {
    if (!member.roles.cache.some(role => role.id === userRoles.developer)) {
      await interaction.reply('you do not have the required role to use this command.');
      return;
    }
    try {
      const message = interaction.options.getString('school').toString();
      schools = ['chs', 'fhs', 'ihs'];
      if(!schools.includes(message)) {
        const embedResponse = new EmbedBuilder()
            .setColor(0x0099FF)
            .setDescription(`please use one of the following:\nfor cleveland use 'chs' \nfor franklin use 'fhs'\nfor ida b wells use 'ihs'`)
        await interaction.reply({
          embeds: [embedResponse],
          ephemeral: true
        });
        return;
      }
      const passwordData = await dataColl.findOne({ _id: message + 'Pass'});
        await interaction.reply({
          embeds: [ephemeralResponse(`the password for ${message} is: ${passwordData.password}`, 0x0099FF)],
          ephemeral: true
      });
    } catch (error) {
      console.error('Error fetching usernames:', error);
    }
  }

  else if (interaction.commandName === 'bug') {
    await interaction.reply({
      embeds: [ephemeralResponse(`thank you for the bug report, the developers have been notified.`, 0x0099FF)],
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

function ephemeralResponse(description, color) {
  const embedResponse = new EmbedBuilder()
      .setColor(color)
      .setDescription(description)
    return embedResponse;
}

module.exports = { botSendMessage };