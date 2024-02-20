import { scryfallClient } from './scryfall-client';

describe('scryfallClient', () => {
  it('should work', () => {
    expect(scryfallClient()).toEqual('scryfall-client');
  });
});
