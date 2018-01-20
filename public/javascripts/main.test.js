import { sort, comparePositive, votesIntoPercentage, castActorVotes, percentBetweenTwo } from './main'

describe("percentBetweenTwo", () => {
  it('should calc percentage of difference', () => {
    expect(percentBetweenTwo(100,10)).toBe(10);
    expect(percentBetweenTwo(20,10)).toBe(50);
    expect(percentBetweenTwo(5,10)).toBe(50);
  })
  it('should return 0 when there is no difference', () => {
    expect(percentBetweenTwo(100,100)).toBe(0);
  })
})

describe("(castActorVotes) fix positive and negative", () => {
  it('should transform string into int', () => {
    const gominho = {
      "__id": "7b1dd3f58be97715e9e06475bb58fce5",
      "timestamp": 1408396481826,
      "name": "Gominho",
      "description": "Fofoqueiro de Plantão",
      "picture": "http://im.r7.com/record/files/2C96/1618/3F6E/369D/013F/72F7/CF15/5F4B/Gominho1.jpg",
      "positive": "23249923",
      "negative": "39587707"
    }
    const gominhoFixed = castActorVotes(gominho)
    expect(gominhoFixed.positive).toBe(23249923)
    expect(gominhoFixed.negative).toBe(39587707)
  });

  it('should add 0 where does not exist', () => {
    const missingNegative = {
      "__id": "3404c4a70e7704009cd1915a349189f4",
      "timestamp": 1408396555971,
      "name": "Andressa Urach",
      "description": "Personalidade da mídia",
      "picture": "http://im.r7.com/record/files/2C96/1618/3F6E/369D/013F/72EF/C598/41DC/Andressa1.jpg",
      "positive": null,
      "age": 32
    }
    const fixed = castActorVotes(missingNegative)
    expect(fixed.negative).toBeDefined()
    expect(fixed.negative).toBe(0)
  });

  it('should be 0 when null', () => {
    const nullPositive = {
      "__id": "3404c4a70e7704009cd1915a349189f4",
      "timestamp": 1408396555971,
      "name": "Andressa Urach",
      "description": "Personalidade da mídia",
      "picture": "http://im.r7.com/record/files/2C96/1618/3F6E/369D/013F/72EF/C598/41DC/Andressa1.jpg",
      "positive": null,
      "age": 32
    }
    const fixed = castActorVotes(nullPositive)
    expect(fixed.positive).toBe(0)
  });
})


describe("votesIntoPercentage", () => {

  it('should find diff between positive and negative attribute', () => {
    const before = [{
      positive: 10,
      negative: 10
    }]
    const expected = [{
      positive: 50,
      negative: 50
    }]
    expect(votesIntoPercentage(before)).toEqual(expected)
  })

  it('should find exact diff', () => {
    const before = [{
      positive: 51638022,
      negative: 18143089
    }]
    const expected = [{
      positive: 73.99999979937265,
      negative: 26.00000020062736
    }]
    expect(votesIntoPercentage(before)).toEqual(expected)
  })
});

describe("comparePositive", () => {
  it("should return -1 when positive is higher", () => {
    const positiveHigher = {
      positive: 2
    }
    const positiveLower = {
      positive: -2
    }
    expect(comparePositive(positiveHigher, positiveLower)).toBe(-1)
  })
  it("should return 0 when both are the same", () => {
    const val1 = {
      positive: 111
    }
    const val2 = {
      positive: 111
    }
    expect(comparePositive(val1, val2)).toBe(0)
  })
  it("should return 1 when positive is lower", () => {
    const positiveLower = {
      positive: -2
    }
    const positiveHigher = {
      positive: 2
    }
    expect(comparePositive(positiveLower, positiveHigher)).toBe(1)
  })
})

describe("sort", () => {
  it('should sort a array of objects based on "positive" attribute', () => {
    const unsorted = [{
      positive: 1
    },
    {
      positive: 2
    }]
    const expected = [{
      positive: 2
    },
    {
      positive: 1
    }]
    expect(sort(comparePositive)(unsorted)).toEqual(expected)
  })
})
