document.addEventListener("DOMContentLoaded", function() {
    let extraTime = 0;
    let timerInterval = null;
    let isTimerRunning = false;


    if (document.getElementById('extraTimePlusz')) {
        document.getElementById('extraTimePlusz').addEventListener('click', function() {
            extraTime++;
            update_Extra_Time();
        });
    }

    if (document.getElementById('extraTimeMinusz')) {
        document.getElementById('extraTimeMinusz').addEventListener('click', function() {

            if (extraTime > 0) {
                extraTime--;
            }

            update_Extra_Time();
        });
    }

    if (document.getElementById('csapat1EredmenyPlusz')) {
        document.getElementById('csapat1EredmenyPlusz').addEventListener('click', function() {
            increase_Goal('csapat1Eredmeny');
        });
    }

    if (document.getElementById('csapat2EredmenyPlusz')) {
        document.getElementById('csapat2EredmenyPlusz').addEventListener('click', function() {
            increase_Goal('csapat2Eredmeny');
        });
    }

    if (document.getElementById('csapat1EredmenyMinusz')) {
        document.getElementById('csapat1EredmenyMinusz').addEventListener('click', function() {
            reduce_Goal('csapat1Eredmeny');
        });
    }

    if (document.getElementById('csapat2EredmenyMinusz')) {
        document.getElementById('csapat2EredmenyMinusz').addEventListener('click', function() {
            reduce_Goal('csapat2Eredmeny');
        });
    }

    if (document.getElementById('inditas')) {
        document.getElementById('inditas').addEventListener('click', function() {
            if (!isTimerRunning) {
                start_Timer();
            }
        });
    }

    if (document.getElementById('megallitas')) {
        document.getElementById('megallitas').addEventListener('click', function() {
            if (isTimerRunning) {
                stop_Timer();
            }
        });
    }


    // Adatok létrehozása
    if (document.getElementById('startMatch')) {
        document.getElementById('startMatch').addEventListener('click', function() {
            const csapat1 = document.getElementById('csapat1').value;
            const csapat2 = document.getElementById('csapat2').value;
            const idobekeres = document.getElementById('idobekeres').value;
            const csapat1Goals = localStorage.setItem('csapat1Goals', 0);
            const csapat2Goals = localStorage.setItem('csapat2Goals', 0);

            const minutes = parseInt(idobekeres, 10);
            const formattedTime = String(minutes).padStart(2, '0') + ":00";

            // Adatok tárolása (a több fájl égett)
            localStorage.setItem('csapat1', csapat1);
            localStorage.setItem('csapat2', csapat2);
            localStorage.setItem('idobekeres', formattedTime);
        });
    }

    // Adatok betöltése és megjelenítése
    if (document.getElementById('csapat1Output')) {
        const csapat1 = localStorage.getItem('csapat1');
        const csapat2 = localStorage.getItem('csapat2');
        const idobekeres = localStorage.getItem('idobekeres');
        const csapat1Goals = localStorage.getItem('csapat1Goals');
        const csapat2Goals = localStorage.getItem('csapat2Goals');

        // Adatok megjelenítése, ha léteznek
        if (csapat1) {
            document.getElementById('csapat1Output').innerHTML = csapat1;
        }
        if (csapat2) {
            document.getElementById('csapat2Output').innerHTML = csapat2;
        }
        if (idobekeres) {
            document.getElementById('ido').innerHTML = "00:00";
        }
        if (csapat1Goals !== null) {
            document.getElementById('csapat1Eredmeny').innerHTML = csapat1Goals;
        }
        if (csapat2Goals !== null) {
            document.getElementById('csapat2Eredmeny').innerHTML = csapat2Goals;
        }

        startCountdown(idobekeres);
    }

    function startCountdown(time) {
        let [minutes, seconds] = time.split(':').map(Number);
        let totalTargetSeconds = minutes * 60 + seconds;
        let totalSeconds = 0;
    
        const timerInterval = setInterval(() => {
            totalSeconds++;
    
            const displayMinutes = Math.floor(totalSeconds / 60);
            const displaySeconds = totalSeconds % 60;
    
            document.getElementById('ido').innerHTML = 
                String(displayMinutes).padStart(2, '0') + ":" + 
                String(displaySeconds).padStart(2, '0');
    

            if (totalSeconds >= totalTargetSeconds) {
                clearInterval(timerInterval);
            }
        }, 1000);
    }
    

    // Extra óra indítása
    function start_Timer() {
        const extraTimeElement = document.getElementById('plusz_ido');
        
        if (extraTimeElement) {
            let extraTimeString = extraTimeElement.innerHTML;
            let [minutes, seconds] = extraTimeString.split(':').map(Number);
            
            let remainingTime = minutes * 60 + seconds;
    
            // Indítjuk a visszaszámlálót
            timerInterval = setInterval(() => {
                remainingTime--;
    
                const displayMinutes = Math.floor(remainingTime / 60);
                const displaySeconds = remainingTime % 60;
    

                extraTimeElement.innerHTML = 
                    String(displayMinutes).padStart(2, '0') + ":" + 
                    String(displaySeconds).padStart(2, '0');
    

                if (remainingTime <= 0) {
                    clearInterval(timerInterval);
                    extraTimeElement.innerHTML = "";
                    isTimerRunning = false;
    
                    alert("Az idő lejárt. Állítsa be újra az extra időt.");
                }
            }, 1000);
    
            isTimerRunning = true;
        } else {
            console.error("A 'plusz_ido' elem nem található!");
        }
    }
    
    
    

    // Extra óra megállítása
    function stop_Timer() {
        clearInterval(timerInterval);
        isTimerRunning = false;
    }

    // Gól növelés
    function increase_Goal(csapat) {
        const scoreElement = document.getElementById(csapat);
        let currentScore = parseInt(scoreElement.innerHTML, 10);
        
        currentScore++;

        if (currentScore >= 0) {
            scoreElement.innerHTML = currentScore;
            if (csapat === 'csapat1Eredmeny') {
                localStorage.setItem('csapat1Goals', currentScore);
            } else if (csapat === 'csapat2Eredmeny') {
                localStorage.setItem('csapat2Goals', currentScore);
            }
        }
    }

    // Gól csökkentése
    function reduce_Goal(csapat) {
        const scoreElement = document.getElementById(csapat);
        let currentScore = parseInt(scoreElement.innerHTML, 10);

        currentScore--;

        if (currentScore >= 0) {
            scoreElement.innerHTML = currentScore;
            if (csapat === 'csapat1Eredmeny') {
                localStorage.setItem('csapat1Goals', currentScore);
            } else if (csapat === 'csapat2Eredmeny') {
                localStorage.setItem('csapat2Goals', currentScore);
            }
        }
    }



    function update_Extra_Time() {
        const displayMinutes = Math.floor(extraTime / 60);
        const displaySeconds = extraTime % 60;
        document.getElementById('plusz_ido').innerHTML = 
            String(displayMinutes).padStart(1, '0') + ":" + 
            String(displaySeconds).padStart(2, '0');
    }
});
