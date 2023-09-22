test('Create a valid Service', async(done) => {
    const service = {
        name: "cool",
        description: "description"
    };
    try {
        const count = await Service.count();
        await request(app).post('/api/services').send(service)
        const newCount = await Service.count()
        expect(newCount).toBe(count + 1);
        done()
    } catch (err) {
        // write test for failure here
        console.log(`Error ${err}`)
        done()
    }
});