class Game {
    constructor() {
        this.time = 1000;
        this.events = [];
        this.stoped = false;
        this.debug = false;
        this.score = 0;
    }
    on(cb) {
        this.events.push(cb);
    }
    run() {
        if (this.stoped) {
            return ;
        }

        this.events.forEach(item => item());

        if (this.debug) {
            return ;
        }
        this.timeout = setTimeout(() => {
            this.run();
        }, this.time);
    }

    stop() {
        $('#game').addClass('stop');
        this.stoped = true;
    }

    addScore() {
        this.score++;
        this.time++;
        this.time++;
    }
}

const SELECTED = 'selected';

function random(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

const LEFT_CODE = 'KeyS';
const RIGHT_CODE = 'KeyA';
const F_1 = 'KeyQ';
const F_2 = 'KeyA';
const F_3 = 'KeyP';
const F_4 = 'KeyL';

$(() => {
    const g = new Game();

    g.on(() => {
        $(`.${SELECTED}`).each(function () {
            $(this)
                .removeClass(SELECTED)
                .next('.item')
                .addClass(SELECTED)

        })
    });

    g.on(() => {
        const r = random(1, 100);

        if (r > 40) {
            const n = random(1, 4);

            const item = $(`#coll_${n}`).children().first();

            item.addClass(SELECTED);
        }
    });

    g.on(() => {
        const selected = $('.last').filter(`.${SELECTED}`);
        if (selected.length === 0) {
            return;
        }

        const woolf = selected.next();

        if (!woolf.hasClass(ACTIVE)) {
            g.stop();
        } else {
            g.addScore();
            $('.score').html(g.score);
        }
    })

    g.run();

    const ACTIVE = 'active';
    $(window).keypress((e) => {
        switch (e.code) {
            case F_1:
                $(`.${ACTIVE}`).removeClass(ACTIVE);
                $('#coll_1 .woolf').addClass(ACTIVE);
                break;
            case F_2:
                $(`.${ACTIVE}`).removeClass(ACTIVE);
                $('#coll_2 .woolf').addClass(ACTIVE);
                break;
            case F_3:
                $(`.${ACTIVE}`).removeClass(ACTIVE);
                $('#coll_3 .woolf').addClass(ACTIVE);
                break;
            case F_4:
                $(`.${ACTIVE}`).removeClass(ACTIVE);
                $('#coll_4 .woolf').addClass(ACTIVE);
                break;
            case 'Enter':
                if (g.debug) {
                    g.run();
                }
        }
    });
});
