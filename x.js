const Discord = require("Discord.js");
const client = new Discord.Client();
const fs = require("fs");

//////////////////////////


////////////////////////// Ready Code.

client.on("ready",()=>{
  console.log('ready')
  });
  ////////////////////////// Ready End.

const prefix = ("x");
  const developers = "726862651535261817"

//////////////////////// Prefix & Devs End.


//////////////////////////////////// Top Code.

var top = require("./data/top.json");
function save() {
  fs.writeFileSync("./data/top.json", JSON.stringify(top, null, 4));
}
client.on("voiceStateUpdate", async function(oldMember, newMember) {

  if (newMember.user.bot) return;
  if (!top[newMember.guild.id]) top[newMember.guild.id] = {};
  if (!top[newMember.guild.id][newMember.user.id]) top[newMember.guild.id][newMember.user.id] = {
    "text": 0,
    "voice": parseInt(Math.random() * 10),
    "msgs": 0,
    "id": newMember.user.id
  }
  save();
  if (!oldMember.voiceChannel && newMember.voiceChannel) {
    var addXP = setInterval(async function() {
      top[newMember.guild.id][newMember.user.id].voice += parseInt(Math.random() * 4);
      save();
      if (!newMember.voiceChannel) {
        clearInterval(addXP);
      }
    }, 60000);
  }
});



client.on("message", async function(message) {

  if (message.author.bot) return;
  if (!message.guild) return;
  if (!top[message.guild.id]) top[message.guild.id] = {};
  if (!top[message.guild.id][message.author.id]) top[message.guild.id][message.author.id] = {
    "text": parseInt(Math.random() * 10),
    "voice": 1,
    "msgs": 0,
    "id": message.author.id
  }
  if (top[message.guild.id][message.author.id].msgs > 10) {
    top[message.guild.id][message.author.id].text += parseInt(Math.random() * 4);
    top[message.guild.id][message.author.id].msgs = 0;
  }
  save();
  var args = message.content.split(" ");
  var cmd = args[0].toLowerCase();
  if (!message.content.startsWith(prefix)) return;
  if (message.content.startsWith(prefix + "top text")) {
    var topArray = Object.values(top[message.guild.id]);
    var num = 0;
    var textStr = `${topArray.sort((a, b) => b.text - a.text).slice(0, 5).filter(user => user.text > 0 && message.guild.members.cache.get(user.id)).map(function(user) {
      if (user.text > 0) {
        return `**#${++num} | <@${user.id}> XP: \`${user.text}\` **`
      }
    }).join("\n")}`;
    var embed = new Discord.MessageEmbed()
      .setAuthor("?? | Guild Score Leaderboards", message.guild.iconURL)
      .setColor(`RED`)
      .addField(`**:speech_balloon: | TEXT LEADERBOARD**`, `${textStr}   \n\n\n **\`${prefix}top text\`**`, true)
      .setFooter(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
    message.channel.send({
      embed: embed
    });
    //   if (!message.content.startsWith(prefix)) return;
  } else {
    if (message.content.startsWith(prefix + "top voice")) {
      var topArray = Object.values(top[message.guild.id]);
      var num = 0;
      var voiceStr = `${topArray.sort((a, b) => b.voice - a.voice).slice(0, 5).filter(user => user.voice > 0 && message.guild.members.cache.get(user.id)).map(function(user) {
        if (user.voice > 0) {
          return `**#${++num} | <@${user.id}> XP: \`${user.voice}\` **`
        }
      }).join("\n")}`;
      var embed = new Discord.Discord.MessageEmbed()
        .setAuthor("?? | Guild Score Leaderboards", message.guild.iconURL)
        .setColor(`RED`)
        .addField(`**:microphone2: | VOICE LEADERBOARD**`, `${voiceStr}   \n\n\n **:sparkles:\`${prefix}top voice\``, true)

        .setFooter(message.author.tag, message.author.displayAvatarURL)
        .setTimestamp()
      message.channel.send({
        embed: embed
      });


      //  break;
      // if (!message.content.startsWith(prefix)) return;
    } else {
      if (message.content.startsWith(prefix + "top")) {
        var topArray = Object.values(top[message.guild.id]);
        var num = 0;
        var textStr = `${topArray.sort((a, b) => b.text - a.text).slice(0, 10).filter(user => user.text > 0 && message.guild.members.cache.get(user.id)).map(function(user) {
          if (user.text > 0) {
            return `**#${++num} | <@${user.id}> XP: \`${user.text}\` **`
          }
        }).join("\n")}`;
        num = 0;
        var voiceStr = `${topArray.sort((a, b) => b.voice - a.voice).slice(0, 10).filter(user => user.voice > 0 && message.guild.members.cache.get(user.id)).map(function(user) {
          if (user.voice > 0) {
            return `**#${++num} | <@${user.id}> XP: \`${user.voice}\` **`
          }
        }).join("\n")}`;
        var embed = new Discord.MessageEmbed()
          .setAuthor("?? | Guild Score Leaderboards", message.guild.iconURL)
          .addField("**TOP 5 TEXT :speech_balloon:**", `${textStr}  \n\n  **:sparkles: More?** \`${prefix}top text\``, true)
          .addField("**TOP 5 VOICE :microphone2:**", `${voiceStr} \n\n **:sparkles: More?** \`${prefix}top voice\``, true)
          .setFooter(message.author.tag, message.author.displayAvatarURL)
          .setTimestamp()
          .setColor(`BLACK`);
        message.channel.send({
          embed: embed


        });



      }
    }
  }

});

//////////// Top End. 




// VIP
/////////// Edit Discord.RichEmbed to  Discord.MessageEmbed , message.guild.members.get to  message.guild.members.cache.get




////// Kick Code.


client.on("message", message => {
  if (message.author.x5bz) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

  if (command == "kick") {
    if (message.author.bot) return;
    if (!message.channel.guild)
      return message.reply("** This command only for servers**");

    if (!message.guild.member(message.author).hasPermission("KICK_MEMBERS"))
      return message.reply("**You Don't Have ` KICK_MEMBERS ` Permission**");
    if (!message.guild.member(client.user).hasPermission("KICK_MEMBERS"))
      return message.reply("**I Don't Have ` KICK_MEMBERS ` Permission**");
    let user = message.mentions.users.first();
    let reason = message.content
      .split(" ")
      .slice(2)
      .join(" ");
    if (message.mentions.users.size < 1) return message.channel.send(new Discord.MessageEmbed().setDescription(`
      **Command: kick**

Kicks a member.

**Usage:**
#kick (user) (reason)

**Examples:**
#kick @hi
#kick 1222222222222
      `));
    if (!reason) return message.reply("**اكتب سبب الطرد**");
    if (!message.guild.member(user).kickable)
      return message.reply(
        "**لايمكنني طرد شخص اعلى من رتبتي يرجه اعطاء البوت رتبه عالي**"
      );
    if (
      message.mentions.members.first().highestRole.position >=
      message.member.highestRole.position
    )
      return message.channel.send("ما تقدر تطرد شخص رتبته اعلى منك!");

    message.guild.member(user).kick();

    const kickembed = new Discord.MessageEmbed()
      .setAuthor(`KICKED!`, user.displayAvatarURL)
      .setColor(`${color}`)
      .setTimestamp()
      .addField("**User:**", "**[ " + `${user.tag}` + " ]**")
      .addField("**By:**", "**[ " + `${message.author.tag}` + " ]**")
      .addField("**Reason:**", "**[ " + `${reason}` + " ]**");
    message.channel.send({
      embed: kickembed
    });
  }
});

///////////////////////////////////////// Music Code. Soon
////////////////////////// Music End. Soon



///////////////////////// Avatar Code.

client.on("message", message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  if (message.content.startsWith(prefix + "avatar")) {
    const mention = message.mentions.users.first()

    if (!mention) return console.log("")
    let embed = new Discord.RichEmbed()
      .setColor("BLACK")
      .setAuthor(`${mention.username}#${mention.discriminator}`, `${mention.avatarURL}`)
      .setTitle("Avatar Link")
      .setURL(`${mention.avatarURL}`)
      .setImage(`${mention.avatarURL}`)
      .setFooter(`Requested By ${message.author.tag}`, `${message.author.avatarURL}`)
    message.channel.send(embed)
  }
})
/////////////////////// Avatar End.


















  /////////////////////////////////////////////////////////////////////// Login.
  client.login("NzkzMjMwMTQwOTIyMzk2NzAz.X-pPIw.olr-D7wNGHTXTHx3QreIiTSGRok");
  /////////////////////////////////////////////////////////////////////////////