var GameEngine = my.Class({
    constructor: function (game) {
        this.game = game;
        this.vaisseauAllie = new Array();
        this.vaisseauEnnemi = new Array();
    },
    unselectAll: function () {
        this.vaisseauAllie.forEach(function (v) {
            v.etatOff();
        });
    },
    init: function () {
        while(i<6) {
            this.vaisseauAllie.push(new vaisseauAllieConstruct(ge));
            if (i === 0) {
                this.vaisseauAllie[i].positionDepard(TILE_WIDTH+20, TILE_HEIGHT + 20);
                posX = TILE_WIDTH+20;
                posY = TILE_HEIGHT+20;
                mapPos["vaisseauAllie" + [i] + 'x'] = posX;
                mapPos["vaisseauAllie" + [i] + "x"] = posY;
                n++;
            }
            else if (i != 0)
            {
                y = i * 4;
                this.vaisseauAllie[i].positionDepard(TILE_WIDTH+20, TILE_HEIGHT*y + 20);
                posX = TILE_WIDTH + 20;
                posY = TILE_HEIGHT * y + 20;
                mapPos["vaisseauAllie" + [i] + "x"] = posX;
                mapPos["vaisseauAllie" + [i] + "x"] = posY;
                n++;
            } else {
                return;
            }
            i = i + 1;
        }
        i=0;
        while(i<6) {
            this.vaisseauEnnemi.push(new vaisseauEnnemiConstruct(ge));
            if(i === 0) {
                this.vaisseauEnnemi[i].positionDepard(TILE_WIDTH*33-40, TILE_HEIGHT+20);
                posX = TILE_WIDTH*33 -40;
                posY = TILE_HEIGHT+20;
                mapPos["vaisseauEnnemi" + [i] + 'x'] = posX;
                mapPos["vaisseauEnnemi" + [i] + "x"] = posY;
                n++;
            }
            else if (i != 0)
            {
                y = i * 4;
                this.vaisseauEnnemi[i].positionDepard(TILE_WIDTH*33-40, TILE_HEIGHT*y + 20);
                posX = TILE_WIDTH *33 -40;
                posY = TILE_HEIGHT * y + 20;
                mapPos["vaisseauEnnemi" + [i] + "x"] = posX;
                mapPos["vaisseauEnnemi" + [i] + "x"] = posY;
                n++;
            } else {
                return;
            }
        i = i + 1;
        }
    },
    getActive: function () {
        i = 0;
        while (i < this.vaisseauAllie.length && this.vaisseauAllie[i].etatVaisseau === 1) {
            i++;
        }

        if (this.vaisseauAllie[i].etatVaisseau === 2) {
            return this.vaisseauAllie[i];
        } else {
            return null;
        }
    }   
})