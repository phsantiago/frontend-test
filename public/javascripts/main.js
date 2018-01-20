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
  if(a.positive === b.positive) {
    return 0
  } else if(a.positive > b.positive) {
    return 1
  } else if(a.positive < b.positive) {
    return -1
  }
  throw 'comparePositive receive a unknown value'
};

export const sort = fn => arr => arr.sort(fn);

const onReceiveJson = compose(votesIntoPercentage, castActorList, get('data'), JSON.parse);

fetch('https://raw.githubusercontent.com/r7com/frontend-test/master/public/fazenda.json', onReceiveJson, console.error);

