/*function saveGyfcat(path,message) {
    let msg = message.content.split("/");
    newmsg = "https://thumbs." + msg[2] + "/" + msg[3] + "-mobile.mp4";
    console.log(newmsg);
    download(newmsg, `../gdrive/${path}/` + (Math.random(0,100000) * 10000000000000000) + ".mp4");
}*/

/*function Test(path,message) { // Get's a image url and path where it wants downloading, renames it a random number and saves to specified place on GDrie
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    message.attachments.forEach(attachment => {
        const url = attachment.url;
        const name = (Math.random(0,100000) * 100000000000000000);
        const extension = url.split(".")[3];
        download(url, `../gdrive/${path}/${name}.${extension}`);
    });
    let msg = message.content.split("\n");
    msg.forEach(element => {
        if(element.toString().startsWith("https://pbs.twimg.com/media/")) {
            console.log("Trying to download: " + element);
            download(element, `../gdrive/${path}/` + (Math.random(0,100000) * 10000000000000000) + ".jpg");
        }
    });
    if(message.content.startsWith("https://pbs.twimg.com/media/")) {
        download(message.content, `../gdrive/${path}/` + (Math.random(0,100000) * 10000000000000000) + ".jpg");
    }
}*/