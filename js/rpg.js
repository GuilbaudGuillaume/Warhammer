var e;
var key;
var y;
var gameState = {};
var Vaisseau = {};
var ChasseurAllieExtendVaisseau = {};
var vaisseauEnnemiConstruct;
var flecheGauche;
var countComete = 0;
var vaisseauAllieConstruct;
var flecheDroite;
var flecheBas;
var comete;
var n = 0;
var z = 0;
var j = 0;
var flecheHaut;
var TILE_WIDTH = 40;
var TILE_HEIGHT = 40;
var arrow;
var i = 0;
var l = 0;
var c;
var mapPos = [];

gameState.load = function () { };
gameState.main = function () { };
var GAME_START = false;
var GAME_OVER = false;
const width = 1320;
const height = 960;
var game = new Phaser.Game(width, height, Phaser.AUTO, "content", {preload:preload, create:create, update:update});

var ge = new GameEngine(game);

game.transparent = false;

function preload() {
    game.load.image('background', 'js/tileset/background.png');
    game.load.spritesheet('vaisseau', 'js/sprite/testShip2.png', 240, 240, 2);
    game.load.image('fleche', "js/sprite/fleche.jpg");
    game.load.image('arrow', 'js/sprite/trait_droit.png');
    game.load.image('comete', 'js/sprite/comete.png', 10, 10);
    game.load.spritesheet('vaisseauEnnemi', 'js/sprite/ship.png', 240, 240, 2)
}
function create() {
        var fragmentSrc = [

        "precision mediump float;",

        "uniform float     time;",
        "uniform vec2      resolution;",
        "uniform vec2      mouse;",

        "// https://www.shadertoy.com/view/MdXSzS",

        "void main()",
        "{",
            "vec2 uv = (gl_FragCoord.xy/resolution.xy)-.5;",

            "float time = time * .1 + ((.25+.05*sin(time*.1))/(length(uv.xy)+.07))* 2.2;",
            "float si = sin(time);",
            "float co = cos(time);",
            "mat2 ma = mat2(co, si, -si, co);",

            "float c = 0.0;",
            "float v1 = 0.0;",
            "float v2 = 0.0;",

            "for (int i = 0; i < 100; i++)",
            "{",
                "float s = float(i) * .035;",
                "vec3 p = s * vec3(uv, 0.0);",
                "p.xy *= ma;",
                "p += vec3(.22,.3, s-1.5-sin(time*.13)*.1);",
                "for (int i = 0; i < 8; i++)",
                "{",
                    "p = abs(p) / dot(p,p) - 0.659;",
                "}",
                "v1 += dot(p,p)*.0015 * (1.8+sin(length(uv.xy*13.0)+.5-time*.2));",
                "v2 += dot(p,p)*.0015 * (1.5+sin(length(uv.xy*13.5)+2.2-time*.3));",
                "c = length(p.xy*.5) * .35;",
            "}",

            "float len = length(uv);",
            "v1 *= smoothstep(.7, .0, len);",
            "v2 *= smoothstep(.6, .0, len);",

            "float re = clamp(c, 0.0, 1.0);",
            "float gr = clamp((v1+c)*.25, 0.0, 1.0);",
            "float bl = clamp(v2, 0.0, 1.0);",
            "vec3 col = vec3(re, gr, bl) + smoothstep(0.15, .0, len) * .9;",

            "gl_FragColor=vec4(col, 1.0);",
        "}"
    ];

    filter = new Phaser.Filter(game, null, fragmentSrc);
    filter.setResolution(32 * TILE_WIDTH, 23 * TILE_WIDTH);

    back = game.add.sprite();
    back.width = width;
    back.height = height;

    back.filters = [ filter ];
    
    /*vaisseau1 = game.add.sprite(0, 0, 'vaisseau');
    
    vaisseau1.width = TILE_WIDTH;
    vaisseau1.height = TILE_HEIGHT;
    vaisseau1.x = 30;
    vaisseau1.y = height /2;
    vaisseau1.anchor.setTo(0.5, 0.5);

    game.add.tween(vaisseau1).to({angle:90}, 50, Phaser.Easing.Linear.None, true);
    vaisseau1.emplacement = "droite";*/
    
    ge.init();
    //console.log(ge.vaisseauEnnemi);

    comete = game.add.group();

    while(z<50) {
        // générer des valeur aléatoire tant qu'il n'y a pas de vaisseau au même endroit
        var x = Math.floor(Math.random() * 32);
        var y = Math.floor(Math.random() * 23);
        // boucler sur toute la flotte pour déterminer si on a un vaisseau à la même place
        ge.vaisseauAllie.forEach(function (vaisseau) {
        // si pas de vaisseau
            if((x !== ge.vaisseauAllie.x) && (y !== ge.vaisseauAllie.y)) {
                if(z === 0) {
                    c = comete.create(x * TILE_WIDTH, y * TILE_HEIGHT, "comete", 0);
                    c.width = TILE_WIDTH;
                    c.height = TILE_HEIGHT;
                    posX = x * TILE_WIDTH;
                    posY = y * TILE_HEIGHT;
                    mapPos["comete" + [z] + "x"] = posX;
                    mapPos["comete" + [z] + "y"] = posY;
                    
                } else {
                    l = 0;
                    while(l < 1) {
                    var coX = "comete" + l + "x";
                    var coY = "comete" + l + "y";
                        if((mapPos.coX !== x) && (mapPos.coY !== y)) {
                            c = comete.create(x * TILE_WIDTH, y * TILE_WIDTH, "comete", 0);
                            c.width = TILE_WIDTH;
                            c.height = TILE_HEIGHT;
                            posX = x * TILE_WIDTH;
                            posY = y * TILE_HEIGHT;
                            mapPos["comete" + [z] + "x"] = posX;
                            mapPos["comete" + [z] + "y"] = posY;
                            l++;
                        }
                    };
                }
            }
        });
        z++;
    }

    /*c.children.body.immovable = true;*/
    /*comete.callAll("width", TILE_WIDTH);
    comete.callAll('height', TILE_HEIGHT);*/

    flecheGauche = game.add.sprite(0, 0, 'fleche');
    flecheGauche.width = 30;
    flecheGauche.height = 30;
    flecheGauche.x = 1230;
    flecheGauche.y = 930;

    flecheGauche.inputEnabled = true;
    flecheGauche.events.onInputDown.add(deplacementGauche);

    flecheDroite = game.add.sprite(0, 0, 'fleche');
    flecheDroite.width = 30;
    flecheDroite.height = 30;
    flecheDroite.x = 1320;
    flecheDroite.y = 960;

    flecheDroite.angle = 180;

    flecheDroite.inputEnabled = true;
    flecheDroite.events.onInputDown.add(deplacementDroite);

    flecheBas = game.add.sprite(0, 0, 'fleche');
    flecheBas.width = 30;
    flecheBas.height = 30;
    flecheBas.x = 1260;
    flecheBas.y = 960;

    flecheBas.angle = 270;

    flecheBas.inputEnabled = true;
    flecheBas.events.onInputDown.add(deplacementBas);

    flecheHaut = game.add.sprite(0, 0, 'fleche');
    flecheHaut.width = 30;
    flecheHaut.height = 30;
    flecheHaut.x = 1290;
    flecheHaut.y = 900;

    flecheHaut.angle = 90;

    flecheHaut.inputEnabled = true;
    flecheHaut.events.onInputDown.add(deplacementHaut);



    cursors = game.input.keyboard.createCursorKeys();
}
function update() {

    ge.vaisseauAllie.forEach(function (vaisseau) {
        vaisseau.update();
    });
    ge.vaisseauEnnemi.forEach(function (vaisseau) {
        vaisseau.update();
    });

    /*filter.update(game.input.mousePointer);*/
    /*vaisseau.body.setZeroVelocity();*/
    /* if(cursors.left.isDown) {
        vaisseau1.x -= 1;
    } 
    else if(cursors.right.isDown) {
        vaisseau1.x += 1;
    }
    else if(cursors.up.isDown) {
        vaisseau1.y -= 1;
    }
    else if(cursors.down.isDown) {
        vaisseau1.y += 1;
    }*/
}
/*    function etat(this) {
        if(!this.etat) {
            this.etat = true;
            this.image = game.add.sprite(0, 0, 'vaisseauThis');

        }
    }*/

// retourne l'instance du vaisseau actif

function deplacementGauche() {
    ge.getActive().moveLeft();

/*    if(vaisseauAllie[i].mouvement > 0) {
        if(vaisseauAllie[i].emplacement !== "gauche") {
            game.add.tween(vaisseauAllie[i].image).to({angle:270}, 50, Phaser.Easing.Linear.None, true);
            vaisseauAllie[i].emplacement = "gauche";
            vaisseauAllie[i].mouvement--;
        } else {
            vaisseauAllie[i].image.x -= TILE_WIDTH;
            vaisseauAllie[i].mouvement--;
        }
    }
*/}
function deplacementDroite() {
    ge.getActive().moveRight();
    /*i=0;
    if(vaisseauAllie[i].mouvement >0) {
        if(vaisseauAllie[i].emplacement !== "droite") {
            game.add.tween(vaisseauAllie[i].image).to({angle:90}, 50, Phaser.Easing.Linear.None, true);
            vaisseauAllie[i].emplacement = "droite";
            vaisseauAllie[i].mouvement--;
        } else {
            vaisseauAllie[i].image.x += TILE_WIDTH;
            vaisseauAllie[i].mouvement--;
        }
    }*/
}
function deplacementBas() {
    ge.getActive().moveBottom();
    /*if(vaisseauAllie[i].mouvement >0) {
        if(vaisseauAllie[i].emplacement !== "bas") {
            game.add.tween(vaisseauAllie[i].image).to({angle:180}, 50, Phaser.Easing.Linear.None, true);
            vaisseauAllie[i].emplacement = "bas";
            vaisseauAllie[i].mouvement--;
        } else {
            vaisseauAllie[i].image.y += TILE_HEIGHT;
            vaisseauAllie[i].mouvement--;
        }
    }*/
}
function deplacementHaut() {
    ge.getActive().moveTop();
    /*if(vaisseauAllie[i].mouvement >0) {
        if(vaisseauAllie[i].emplacement !== "haut") {
            game.add.tween(vaisseauAllie[i].image).to({angle:360}, 50, Phaser.Easing.Linear.None, true);
            vaisseauAllie[i].emplacement = "haut";
            vaisseauAllie[i].mouvement--;
        } else {
            vaisseauAllie[i].image.y -= TILE_HEIGHT;
            vaisseauAllie[i].mouvement--;
        }
    }*/
}
/*Vaisseau = function () {
    initialize : function() {
        this["mouvement"] = 3;
        this["PointVie"];
        this['puissanceDeFeu'];
        this['image'];
        positionDepard = function() {

        }
    }
}*/
/*gameState.load.prototype = {
    preload: function () {
        game.load.image('background', "js/tileset/tileset.png");
    },
    create: function () {
        game.state.start('main');
    },

};
gameState.main.prototype = {
    create: function () {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.setShowAll();
        window.addEventListener('resize', function() {
            game.scale.refresh();
        });
        game.scale.refresh();
        this.background = game.add.sprite(0, 0, 'background');
        this.background.width = game.width;
        this.background.height = game.height;
    },
    update: function() {

    },
};*/
/*game.state.add("preload", gameState.load);*/

/*while((i < 2400) && (y < 1600))
{
    if ((i >= 32.1) && (i <= 2386.1) && (y >= 32) && (y <= 1586))
    {
        tuile.dessinerTuile(1, ctx, i, y);
    }
    if((i === 2386.1) && (y < 1586))
    {
        i = 0.1;
        y = y - (-32);
    }
    i = i - (-32);
}
i = 0.1;
y = 0;
while((i < 2400) && (y < 1600))
{
    if ((i === 0.1) && (y === 0) || (i === 0.1) && (y === 480))
    {
       tuile.dessinerTuile(15, ctx, i, y); 
    }
    else if ((i === 2386.1) && (y === 0) || (i === 2386.1) && (y === 1586))
    {
        tuile.dessinerTuile(15, ctx, 2386.1, y);
    }
    else if ((i === 0.1) || (i === 1586))
    {
        if(i === 896.1)
        {
            tuile.dessinerTuile(63, ctx, 928.1, y);
            tuile.dessinerTuile(63, ctx, i, 0);
            tuile.dessinerTuile(63, ctx, i, 480);
        } else {
            tuile.dessinerTuile(63, ctx, i, y);
        }
    }
    else if ((y === 0) || (y === 480))
    {
        tuile.dessinerTuile(63, ctx, i, y);
    }
    i = i - (-32);
    if((i === 928.1) && (y < 520))
    {
        i = 0.1;
        y = y + 32;
    }
}
window.onkeydown = function(event) {
    e = event;
    key = e.keyCode;
    if (key === 90)
    {
        perso.deplacer(DIRECTION.HAUTE, el);
        perso.dessinerPerso(ctx);
    }
    else if (key === 83)
    {
        perso.deplacer(DIRECTION.BAS, el);
        perso.dessinerPerso(ctx);
    }
    else if (key === 81)
    {
        perso.deplacer(DIRECTION.GAUCHE, el);
        perso.dessinerPerso(ctx);
    }
    else if (key === 68)
    {
        perso.deplacer(DIRECTION.DROITE, el);
        perso.dessinerPerso(ctx);
    }
    return true;
}*/