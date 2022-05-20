import { convertEventKeyToEventName } from './events.service';

describe('convertEventKeyToEventName', () => {
  it('converts valid event key', async () => {
    const name = convertEventKeyToEventName(
      '2022-02-20T00:00:00.000Z Skuhrovská lyže'
    );
    expect(name).toEqual('20. 2. 2022 Skuhrovská lyže');
  });

  it('returns event key for event key with missing delimiter', async () => {
    const name = convertEventKeyToEventName('2022-01-01T00:00:00.000ZTest');
    expect(name).toEqual('2022-01-01T00:00:00.000ZTest');
  });

  it('returns event key for event with invalid date', async () => {
    const name = convertEventKeyToEventName('2022-01-34T00:00:00.000Z Test');
    expect(name).toEqual('2022-01-34T00:00:00.000Z Test');
  });
});
