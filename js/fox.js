function  roleFox(left,top,step){
    var fox = document.getElementById('fox'),
        step = step || 5,
        x =  0,
        y =  0;
    w = document.documentElement.offsetWidth,
        h = document.documentElement.clientHeight;
    fox.style.left =left || 300 + 'px';
    fox.style.top =top  || 300 + 'px';
    fox.style.width = 65 + 'px';
    fox.style.height = 93 + 'px';
    fox.style.backgroundImage="url('images/stopx.gif')";
    fox.style.position = 'fixed';
    var walking = 0;
    var flog = true;
    var src = {
        'gos':"url('./images/gos.gif')",
        'gox':"url('./images/gox.gif')",
        'goz':"url('./images/goz.gif')",
        'goy':"url('./images/goy.gif')",
        'stops':"url('./images/stops.gif')",
        'stopx':"url('./images/stopx.gif')",
        'stopy':"url('./images/stopy.gif')",
        'stopz':"url('./images/stopz.gif')"
    };
    var imgSrc = null;
    //document.getElementById('fox').style.backgroundImage="url('./images/gos.gif')";
    var left,
        top;

    window.document.addEventListener('keydown',function  (e){
        left = fox.offsetLeft,
            top = fox.offsetTop;
        //console.log(top);
        var keycode = e.keyCode;
        switch (keycode){
            case 38:
            case 87: // up
                imgSrc = src.gos;
                if(flog){
                    flog = false;
                    y -= step;
                    if(y <= -top-93){
                        y =h-top;
                    };
                    go();
                    flog = true;
                }

                break;
            case 39:
            case 68: // right
                imgSrc = src.goy;

                if(flog){
                    flog = false;
                    x += step;
                    if(x>=w-left){
                        x=-left-65;
                    }
                    go();
                    flog = true;
                }
                break;
            case 40:
            case 83: // down
                imgSrc = src.gox;

                if(flog){
                    flog = false;
                    y += step;
                    if(y>=h-top){
                        y=-top-93;
                    }
                    go();
                    flog = true;
                }
                break;
            case 37:
            case 65: // left
                imgSrc = src.goz;

                if(flog){
                    flog = false;
                    x -= step;
                    if(x<=-left-65){
                        x = w-left
                    }
                    go();
                    flog = true;
                }
                break;
        };
    });
    window.document.addEventListener('keyup',function  (e){
        //console.log(123);
        var keycode = e.keyCode;
        switch (keycode){
            case 38:
            case 87: // up

                imgSrc = src.stops;
                fox.style.backgroundImage = imgSrc;

                break;
            case 39:
            case 68: // right
                imgSrc = src.stopy;
                fox.style.backgroundImage = imgSrc;

                break;
            case 40:
            case 83: // down
                imgSrc = src.stopx;
                fox.style.backgroundImage = imgSrc;

                break;
            case 37:
            case 65: // left
                imgSrc = src.stopz;
                fox.style.backgroundImage = imgSrc;

                break;
        };
    });

    function  go(){
        fox.style.backgroundImage = imgSrc;
        fox.style.transform = 'translate('+x+'px,'+y+'px)';
        fox.style.transition = 'transform '+0.02+'s';
    };



};
