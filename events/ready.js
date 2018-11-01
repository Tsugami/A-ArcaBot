module.exports = function Ready(){
    this.user.setPresence({ status: 'dnd', game: { name: "PPSSPP" }});
    console.log(this.user.username, 'online!');
}
