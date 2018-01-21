import '../stylesheets/style.scss';
import { fetch, percent } from './utils/helpful';
import { compose, get, sort, compareKey } from './utils/functional';

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

export const votesIntoPercentage = data => data.map((actor) => {
  const { positive, negative } = actor;
  const total = positive + negative;
  const transformedActor = actor;

  transformedActor.positive = percent(positive, total);
  transformedActor.negative = percent(negative, total);
  return transformedActor;
});

const render = (actorList) => {
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
    " role="presentation" aria-hidden="true"></li>
  `;
  let counter = 0;
  actorList.forEach((actor) => {
    counter += 1;
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

    // used in hover effect for small devices
    const $elem = document.getElementById('js-lightoff');
    const listToHover = document.getElementsByClassName('widget__item');

    // listToHover its an HTMLCollection, should be itareted this way
    for (let i = 0; i <= listToHover.length; i += 1) {
      if (typeof listToHover[i] !== 'undefined') {
        listToHover[i].addEventListener('mouseover', () => {
          if (window.innerWidth < 580) {
            $elem.style.display = 'block';
          }
        });
        listToHover[i].addEventListener('mouseout', () => {
          $elem.style.display = 'none';
        });
      }
    }
  });
  return actorList;
};

const onError = (data) => {
  const list = document.getElementById('list');
  list.innerHTML = `
    <h3 class="widget__error">Ocorreu um erro durante o carregamento, tente novamente mais tarde.</h3>
  `;
  return data;
};

const onReceiveJson = compose(render, sort(compareKey('positive')), votesIntoPercentage, castActorList, get('data'), JSON.parse);
// TODO: use json from project folder
fetch('/fazenda.json', onReceiveJson, onError);

