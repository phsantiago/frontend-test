import '../stylesheets/style.scss';

const fetch = (url, cb, err) => {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) {
        cb(xhttp.responseText);
      } else {
        typeof err === 'function' && err(xhttp);
      }
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

const get = key => obj => obj[key];

const compose = (...args) => initial => args.reduceRight(
  (result, fn) => fn(result),
  initial
);

const castVotes = actorList => {
  const fixed = actorList.map(actor => {
    if(typeof actor.positive !== 'number') {
      actor.positive = 0;
    }
    if(typeof actor.negative !== 'number') {
      actor.negative = 0;
    }
    return actor;
  })
}

const fixData = compose(castVotes, get('data'), JSON.parse)

fetch("https://raw.githubusercontent.com/r7com/frontend-test/master/public/fazenda.json", fixData, console.error)

