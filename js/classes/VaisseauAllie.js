var vaisseauAllieConstruct = my.Class({
    constructor: function(ge, player, bullets, index) {

        this.ge = ge;
        this.image = ge.game.add.sprite(0, 0, 'vaisseau');
        game.physics.arcade.enable([this.image]);

        this.player = player;
        this.bullets = bullets;
        this.alive = true;
        this.image.width = TILE_WIDTH;
        this.image.height = TILE_HEIGHT;
        /*this.image.style.backgroundColor = "green";*/
        this.mouvement = 100;
        this.pointDeVie = 10;
        this.puissanceDeFeu = 3;
        this.image.anchor.setTo(0.5, 0.5);
        this.image.inputEnabled = true;
        this.image.events.onInputDown.add(this.toogleEtat, this);
        this.etatVaisseau = 1;
        /*this.width = 30;
        this.height = 30;*/
        this.image.angle = 90;
        this.emplacement = "droite";
    },
    positionDepard: function(x, y) {
            this.image.x = x;
            this.image.y = y;
    },
    etat: function() {

    },
    moveLeft: function () {
        // this <=> vaisseauAllie[i]
        if(this.mouvement > 0) {
            if(this.emplacement !== "gauche") {
                this.image.angle = 270;
                this.emplacement = "gauche";
                this.mouvement--;
            } else {
                this.image.x -= TILE_WIDTH;
                this.mouvement--;
            }
        }
    },
    moveRight: function () {
        if(this.mouvement >0) {
            if(this.emplacement !== "droite") {
                this.image.angle = 90;
                this.emplacement = "droite";
                this.mouvement--;
            } else {
                this.image.x += TILE_WIDTH;
                this.mouvement--;
            }
        }
    },
    moveBottom: function () {
        if(this.mouvement > 0) {
            if(this.emplacement !== "bas") {
                this.image.angle = 180;
                this.emplacement = "bas";
                this.mouvement--;
            } else {
                this.image.y += TILE_HEIGHT;
                this.mouvement--;
            }
        }
    },
    moveTop: function () {
        if(this.mouvement >0) {
            if(this.emplacement !== "haut") {
                this.image.angle = 0;
                this.emplacement = "haut";
                this.mouvement--;
            } else {
                this.image.y -= TILE_HEIGHT;
                this.mouvement--;
            }
        }
    },
    etatOn: function () {
        this.ge.unselectAll();
        this.etatVaisseau = 2;
    },
    etatOff: function () {
        this.etatVaisseau = 1;
    },
    toogleEtat: function () {
        if (this.etatVaisseau === 2) {
            this.etatOff();
        } else {
            this.etatOn();
        }
    },
    update: function () {
        if (this.etatVaisseau === 2) {
            this.image.frame = 0;
        } else {
            this.image.frame = 1;
        }
    }
});