const {init,getReleaseQuery} = require("../index");

// dummy xml is for testing
test('list data size  should be 2', async () => {
    const list = await init('dummy.xml');
    expect(list.length).toBe(2);
});
test('queried data size should only be 1', async () => {
    const list = await init('dummy.xml');
    const res = (getReleaseQuery(10, new Date('2000-01-01'), list));
    expect(res.length).toBe(1);
});
test('queried data size should be 0', async () => {
    const list = await init('dummy.xml');
    const res = (getReleaseQuery(1000, new Date('2020-01-01'), list));
    expect(res.length).toBe(0);
});

