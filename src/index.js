import * as discordjs from 'discord.js';
import * as dotenv from 'dotenv';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { data } from './commands/ping';
dotenv.config();

// get client object
const client = new discordjs.Client({
   intents: [
    discordjs.GatewayIntentBits.Guilds,
   ],
});

// get commands
const commands/* :Map<string, Function> */ = new Map();
const unread = [path.join(__dirname, 'commands/')];
const unloaded_files = [];
while (unread.length !== 0) {
    const nowPath = unread.pop();
    if (fs.statSync(nowPath).isDirectory) {
        fs.readdirSync(nowPath).forEach(v => unread.push(path.join(nowPath, v)));
    } else {
        unloaded_files.push(nowPath);
    }
}
while (unloaded_files.length !== 0) {
    const nowPath = unloaded_files.pop();
    try {
        const file = await import(nowPath);
        if (data in file && exec in file) {
            commands.set(data.commandName, exec);
        }
    } catch (e) {
        continue;
    }
}

// when received commands
// TODO

// when logged in
client.once(discordjs.Events.ClientReady, client => {
    console.log("Successfully Logged in as " + client.user.tag);
});

client.login(process.env.BOT_TOKEN).then();