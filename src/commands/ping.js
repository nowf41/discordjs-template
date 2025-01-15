import * as discordjs from 'discord.js'

export const data = new discordjs.SlashCommandBuilder
    .setName('ping')
    .setDescription('Replies with Pong!');

export async function exec(interaction) {
    await interaction.reply('Pong!');
}