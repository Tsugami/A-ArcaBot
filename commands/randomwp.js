module.exports = {
    run(message) {
        const weapons = [
            'Dual Blades',
            'Light Bowgun', 
            'Long Sword',
            'Charge Blade',
            'Great Sword', 
            'Switch Axe', 
            'Heavy Bowgun',
            'Lance',
            'Gunlance', 
            'Bow',
            'Hammer', 
            'Insect Glaive',
            'Sword & Shield',
            'Hunting Horn'   
        ]
        let random = weapons[Math.floor(Math.random() * weapons.length)];

        message.channel.send(random);
    },
    description: 'Arma aleatoria'
}