import { parseResults } from './results.service';

describe('loadResults', () => {
  const resultsYaml = `date: 2022-02-20
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

  it('loads valid results yaml', async () => {
    const results = parseResults(resultsYaml);
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
