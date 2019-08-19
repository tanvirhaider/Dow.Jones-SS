


class Stage {
    constructor (data) {
        var stage = document.createElement('div');
        if (data.id) { stage.setAttribute('id', data.id);}
        else {stage.setAttribute('id', "willow-ad-stage");}
        if (data.class) {stage.className += data.class;}

        this.stage = stage;
       // this.stageDefaultStyle();

        if (data.container) { 
            var adContainer = document.querySelector(data.container);
            adContainer.appendChild(stage);
        }
        else {
            document.body.setAttribute('id', "ad-body");
            document.body.appendChild(stage);
        }

        return stage;
    }


    stageDefaultStyle() {
      // console.log("this.stage: ", this.stage);
       this.stage.style.margin = "0px";
       this.stage.style.padding = "0px";
    }
}

