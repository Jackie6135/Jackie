const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if(msg.author.bot) return;
  if(msg.author.id === client.user.id) return;

  const id = msg.author.id;
  const name = msg.author.username;

  const filePath = `./data/${id}.json`;

  !fs.existsSync(filePath) ? fs.writeFileSync(filePath, JSON.stringify({})) : null; // 파일이 없다면 생성

  const user = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const today = new Date();
  const date = "" + today.getFullYear() + today.getMonth() + today.getDate();
  const howMuch = 1;

  if(msg.content === "출석"){
    let saveUser = {};
    if(user.id) {
      if(user.date === date) {
        msg.reply(`오늘은 이미 출석을 했어요!`);
        saveUser = user;
      }
      else {
        msg.reply(`${howMuch}번째 출석이에요!\n${name}님의 출석 횟수는 ${user.ch} -> ${user.ch + howMuch}이에요!`);
        saveUser = {
          id,
          name,
          date,
          ch : user.ch + howMuch,
        }
      }
    }
    else {
      msg.reply(`${name}님, 출석을 시작하는걸 환영해요! ${howMuch}번째 출석이 완료되었어요!`);
      saveUser = {id, name, date, ch : howMuch};
    }

    fs.writeFileSync(filePath, JSON.stringify(saveUser));
  }

  if(msg.content === "출석 횟수"){
    user.id ? msg.reply(`${name}님의 출석 횟수는 ${user.ch}번이에요!`) : msg.reply(`"출석"을 입력해보세요!`);
  }


});

client.login('ODY4MTI1NjM2NTAwMjg3NTI5.YPrHAA.Gm5pD7NVn0bQPqRMrUrnBXjhyQo');