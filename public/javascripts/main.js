import '../stylesheets/style.scss';

const fetch = (url, cb, err) => {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function ready() {
    if (this.readyState === 4) {
      if (this.status === 200) {
        cb(xhttp.responseText);
      } else if (typeof err === 'function') {
        err(xhttp);
      }
    }
  };
  xhttp.open('GET', url, true);
  xhttp.send();
};

const get = key => obj => obj[key];

const compose = (...args) => initial => args.reduceRight(
  (result, fn) => fn(result),
  initial,
);

export const castActorVotes = (actor) => {
  const castedActor = actor;
  const positiveType = typeof actor.positive;
  const negativeType = typeof actor.negative;

  if (positiveType !== 'number' && positiveType !== 'string') {
    castedActor.positive = 0;
  } else if (positiveType === 'string') {
    castedActor.positive = parseInt(actor.positive, 10);
  }

  if (negativeType !== 'number' && negativeType !== 'string') {
    castedActor.negative = 0;
  } else if (positiveType === 'string') {
    castedActor.negative = parseInt(actor.negative, 10);
  }

  return castedActor;
};

const castActorList = actorList => actorList.map(castActorVotes);

export const percentBetweenTwo = (a, b) => {
  if (a === b) {
    return 0;
  } else if (a > b) {
    return (b * 100) / a;
  }
  return (a * 100) / b;
};

export const votesIntoPercentage = data => data.map((actor) => {
  const { positive, negative } = actor;
  const total = positive + negative;
  const transformedActor = actor;

  transformedActor.positive = percentBetweenTwo(positive, total);
  transformedActor.negative = percentBetweenTwo(negative, total);
  return transformedActor;
});

export const comparePositive = (a, b) => {
  if (a.positive > b.positive) {
    return -1;
  }
  if (a.positive < b.positive) {
    return 1;
  }
  return 0;
};

export const sort = fn => arr => arr.sort(fn);

const render = (actorList) => {
  let counter = 0;
  const list = document.getElementById('list');
  list.innerHTML = `
    <li id="js-lightoff" style="
      display: none;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #00000082;
      z-index: 2;
    "></li>
  `;
  actorList.forEach((actor) => {
    counter++;
    const item = document.createElement('li');
    item.className = 'widget__item';
    item.setAttribute('itemtype', 'http://schema.org/ItemList http://schema.org/Person');
    item.setAttribute('itemscope', '');
    item.innerHTML = `
      <div class="widget__img-wrapper">
        <figure class="widget__img-holder" style="background-image: url(${actor.picture})">
          <img class="widget__img" alt="foto de ${actor.name}" src="${actor.picture}" />
        </figure>
        <div class="widget__counter" itemprop="position">${counter}</div>
      </div>
      <div class="widget__actor-info">
        <div class="widget__actor-name" itemprop="name">${actor.name}</div>
        <div class="widget__actor-desc">${actor.description}</div>
      </div>
      <div class="widget__votes-wrapper">
        <div class="widget__votes-head">
          <div class="widget__positive">
            GOSTAM
          </div>
          <div class="widget__negative">
            NÃO GOSTAM
          </div>
        </div>
        <div class="widget__stats-content">
          <div class="widget__vote-perc widget__positive">
            ${Math.round(actor.positive)}%
          </div>
          <div class="widget__vote-perc widget__negative">
            ${Math.round(actor.negative)}%
          </div>
        </div>
      </div>
    `;


    list.appendChild(item);

    const $elem = document.getElementById("js-lightoff")
    const listToHover = document.getElementsByClassName('widget__item')
    for( let i=0; i <= listToHover.length; i++ ){
      if(typeof listToHover[i] !== 'undefined') {
        listToHover[i].addEventListener('mouseover', () => {
          if(window.innerWidth < 580) {
            $elem.style.display = 'block'
          }
        })
        listToHover[i].addEventListener('mouseout', () => {
          $elem.style.display = 'none'
        })
      }
    }
  });
  return actorList;
};

const onReceiveJson = compose(render, sort(comparePositive), votesIntoPercentage, castActorList, get('data'), JSON.parse);

const onError = (data) => {
  debugger;
  return data;
};

// TODO: use json from project folder
fetch('https://raw.githubusercontent.com/r7com/frontend-test/master/public/fazenda.json', onReceiveJson, onError);

