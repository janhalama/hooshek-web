import { parseResults, validateResults } from './results.service';

const validResultsYaml = `date: 2022-02-20
name: Skuhrovská lyže
races:
-   athletes:
    -   born: 2016
        club: Sokol Skuhrov
        diff: '0.0'
        finish: 09:32:55
        name: Tereza
        rank: 1
        rank_sokol: 1
        start: 09:31:00
        surname: Nováková
        time: '1:55.0'
    desc: ''
    distance: 200m
    name: Benjamínky
    sex: f
  `;

const invalidResultsYamlWithoutDate = `name: Skuhrovská lyže
races:
-   athletes:
    -   born: 2016
        club: Sokol Skuhrov
        diff: '0.0'
        finish: 09:32:55
        name: Tereza
        rank: 1
        rank_sokol: 1
        start: 09:31:00
        surname: Nováková
        time: '1:55.0'
    desc: ''
    distance: 200m
    name: Benjamínky
    sex: f
  `;

const invalidResultsYamlWithoutRaces = `name: Skuhrovská lyže
date: 2022-02-20
  `;

const invalidResultsYamlWithoutName = `date: 2022-02-20
races:
-   athletes:
    -   born: 2016
        club: Sokol Skuhrov
        diff: '0.0'
        finish: 09:32:55
        name: Tereza
        rank: 1
        rank_sokol: 1
        start: 09:31:00
        surname: Nováková
        time: '1:55.0'
    desc: ''
    distance: 200m
    name: Benjamínky
    sex: f
  `;

describe('parseResults', () => {
  it('loads valid results yaml', async () => {
    const results = parseResults(validResultsYaml);
    expect(results).toEqual({
      date: new Date('2022-02-20'),
      name: 'Skuhrovská lyže',

      races: [
        {
          distance: '200m',
          name: 'Benjamínky',
          sex: 'f',
          desc: '',
          athletes: [
            {
              born: 2016,
              club: 'Sokol Skuhrov',
              diff: '0.0',
              finish: '09:32:55',
              name: 'Tereza',
              rank: 1,
              rank_sokol: 1,
              start: '09:31:00',
              surname: 'Nováková',
              time: '1:55.0',
            },
          ],
        },
      ],
    });
  });
});

describe('validateResults', () => {
  it('validation succeeds with valid results yaml', async () => {
    const validationResult = validateResults(validResultsYaml);
    expect(validationResult).toEqual({
      valid: true,
      errors: 'No errors',
    });
  });

  it('validation fails with results yaml without date parameter', async () => {
    const validationResult = validateResults(invalidResultsYamlWithoutDate);
    expect(validationResult).toEqual({
      valid: false,
      errors: "data must have required property 'date'",
    });
  });

  it('validation fails with results yaml without name parameter', async () => {
    const validationResult = validateResults(invalidResultsYamlWithoutName);
    expect(validationResult).toEqual({
      valid: false,
      errors: "data must have required property 'name'",
    });
  });

  it('validation fails with results yaml without races parameter', async () => {
    const validationResult = validateResults(invalidResultsYamlWithoutRaces);
    expect(validationResult).toEqual({
      valid: false,
      errors: "data must have required property 'races'",
    });
  });

  it('validation fails with empty yaml document', async () => {
    const validationResult = validateResults('');
    expect(validationResult).toEqual({
      valid: false,
      errors: 'data must be object',
    });
  });

  it('validation fails with invalid yaml document', async () => {
    const validationResult = validateResults(`invalid yaml`);
    expect(validationResult).toEqual({
      valid: false,
      errors: 'data must be object',
    });
  });
});
