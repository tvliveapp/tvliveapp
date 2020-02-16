(function () {

    function onKeywordMatches (oElement) {

        alert("You have typed the word \"" + this.content + "\"!");

    }

    var
        clickCounter = 0, myClickable = document.getElementById("five_times"),
        mySpell1 = new Spell("foo", onKeywordMatches),
        mySpell2 = new Spell("bar", onKeywordMatches);

    document.addEventListener("click", function (oEvent) {

        var bWrongPoint = true;

        for (var oIter = oEvent.target; bWrongPoint && oIter; bWrongPoint = oIter !== myClickable, oIter = oIter.parentNode);

        if (bWrongPoint) {

            clickCounter = 0;

        } else if (clickCounter < 4) {

            clickCounter++;
            oEvent.preventDefault();

        } else {

            clickCounter = 0;
            Spell.pronounce(prompt("Tell me something..."), this);
            oEvent.preventDefault();

        }

    }, false);

})();
