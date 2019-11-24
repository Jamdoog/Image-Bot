const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");
var http = require('https');
var fs = require('fs');

function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}

function download(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest, { flags: "wx" });

        const request = http.get(url, response => {
            if (response.statusCode === 200) {
                response.pipe(file);
            } else {
                file.close();
                fs.unlink(dest, () => {}); // Delete temp file
                reject(`Server responded with ${response.statusCode}: ${response.statusMessage}`);
            }
        });

        request.on("error", err => {
            file.close();
            fs.unlink(dest, () => {}); // Delete temp file
            reject(err.message);
        });

        file.on("finish", () => {
            resolve();
        });

        file.on("error", err => {
            file.close();

            if (err.code === "EEXIST") {
                reject("File already exists");
            } else {
                fs.unlink(dest, () => {}); // Delete temp file
                reject(err.message);
            }
        });
    });
}


// I know this is really messy code but it works... 
// I know taking user input's without checking them is a bad idea but I really don't care enough this
// is for a discord server about a fucking kpop groups...
function saveImage(path, message) { // Get's a image url and path where it wants downloading, renames it a random number and saves to specified place on GDrie
    let dir = "Pics";
    if(message.content.includes("https://gfycat.com")) {
        client.channels.get("648139831532191786").send(message.embeds[0].video.url);
    }
    if(message.content.includes("https://pbs.twimg.com/media/")) {
        Twitter(path, message, dir);
    }
    if(message.content.includes("https://i.redd.it/")) {
        Reddit(path, message, dir);
    }
    if(message.content.includes("https://www.instagram.com/p/")) {
        Instagram(path, message, dir); 
        // Unfortunately discord will only provide a link to the first thumbnail with no vid/more posts available. 
        // I don't know if I could get the rest, but one photo will suffice as it will probably be reposted elsewhere.
    }
    else {
        message.attachments.forEach(attachment => {
            const url = attachment.url;
            const name = (Math.random(0,100000) * 100000000000000000);
            const extension = url.split(".")[3];
            download(url, `../${dir}/${path}/${name}.${extension}`);
        });
    }
}

function Reddit(path, message, dir) {
    let msg = message.content.split("\n");
    let extension = message.content.split(".");
    msg.forEach(element => {
        if(element.toString().startsWith("https://i.redd.it/")) {
            download(element, `../${dir}/${path}/` + (Math.random(0,100000) * 10000000000000000) + "." + extension[3]);
        }
    });
}

function Twitter(path, message, dir) {
    let msg = message.content.split("\n");
    msg.forEach(element => {
        if(element.toString().startsWith("https://pbs.twimg.com/media/")) {
            download(element, `../${dir}/${path}/` + (Math.random(0,100000) * 10000000000000000) + ".jpg");
        }
    });
}

function Gyfcat(message, dir) {
    let extension = message.content.split(".");
    try {
        download(message.content, `../Pics/Gyfcat/` + (Math.random(0,100000) * 10000000000000000) + "." + extension[3]);
    }
    catch {
        return;
    }
    return;
}

function Instagram(path, message, dir) {
    let msg = message.content.split("\n");
    msg.forEach(element => {
        if(element.toString().startsWith("https://www.instagram.com/p/")) {
            try {
            download(message.embeds[0].thumbnail.url, `../${dir}/${path}/` + (Math.random(0,100000) * 10000000000000000) + ".jpg");
            }
            catch {
                try {
                    download(message.embeds[0].thumbnail.url, `../${dir}/${path}/` + (Math.random(0,100000) * 10000000000000000) + ".jpg");
                }
                catch {
                    client.channels.get("637238920320516116").send("Failed to download: " + message.content);
                }
            }
        }
    });
}

client.on('ready', () => {
    console.log("Ready!");
})

client.on("message", async message => {
    if(message.author.bot) return;
    var guild = client.guilds.array();
    var guildchannel = message.channel.id;
    switch(guildchannel) { // Can sort images based of the channel they were posted in
        // https://discord.gg/twice
        case "138195029607841792":
            saveImage("Nayeon", message);
            break;
        case "138195097484263424":
            saveImage("Sana", message);
            break;
        case "138194610101944320":
            saveImage("Jeongyeon", message);
            break;
        case "138194569698344960":
            saveImage("Momo", message);
            break;
        case "138194941263216640":
            saveImage("Jihyo", message);
            break;
        case "138194552837111808":
            saveImage("Mina", message);
            break;
        case "138194483492683777":
            saveImage("Dahyun", message);
            break;
        case "138194636593168384":
            saveImage("Chaeyoung", message);
            break;
        case "138195009580171264":
            saveImage("Tzuyu", message);
            break;
        case "166845635717365761":
            saveImage("Group",  message);
            break;
        case "639259507247284235":
            saveImage("Memes", message);
        case "639259557050318848":
            saveImage("Fanart", message);
        

        // https://discord.gg/fC76MQG --> TWICE MEMES
        case "533551254723624960":
            saveImage("Nayeon", message);
            break;
        case "533551354048937985":
            saveImage("Sana", message);
            break;
        case "533551283865518080":
            saveImage("Jeongyeon", message);
            break;
        case "533551327419039754":
            saveImage("Momo", message);
            break;
        case "533551413800992769":
            saveImage("Jihyo", message);
            break;
        case "533551442297094155":
            saveImage("Mina", message);
            break;
        case "533551478787276800":
            saveImage("Dahyun", message);
            break;
        case "533551518763450368":
            saveImage("Chaeyoung", message);
            break;
        case "533551543576821771":
            saveImage("Tzuyu", message);
            break;
        case "533581341866852370":
            saveImage("Group",  message);
            break;
        case "533583130091716608":
            saveImage("Memes", message);
            break;
            
        // Testing for me
        case "635085774571831309":
            saveImage("Test", message);
            break;
        case "648139831532191786":
            Gyfcat(message);
            break;

        // https://discord.gg/010f8cuk8zzWmxvtu --> GOT7 Discord
        case "180945193472622592":
            saveImage("Mark", message);
            break;
        case "180942174379048960":
            saveImage("Jaebum", message);
            break;
        case "180942506236575744":
            saveImage("Jackson", message);
            break;
        case "180945381763448833":
            saveImage("Jinyoung", message);
            break;
        case "180944610657435648":
            saveImage("Youngjae", message);
            break;
        case "180945466433863682":
            saveImage("BamBam", message);
            break;
        case "180945582230077441":
            saveImage("Yugyeom", message);
            break;
        case "180958244238393344":
            saveImage("Group7", message);
            break;
        case "472415139002318858":
            saveImage("Coco", message);
            break;
    }
});
client.login(config.token);
