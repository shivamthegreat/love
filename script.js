function clickYesButton() {
      alert('I love you too <3');
    }

    // Hover NO
    function hoverNoButton() {
      let button = document.getElementById('no-button');
      let maxX = window.innerWidth - button.offsetWidth - 20;
      let maxY = window.innerHeight - button.offsetHeight - 20;

      let x = Math.random() * maxX;
      let y = Math.random() * maxY;

      button.style.left = x + 'px';
      button.style.top = y + 'px';
    }
