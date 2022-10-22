module.exports = app => {

    app.get("/timezones", (req, res) => {
        return res.status(200).json({ data: Intl.supportedValuesOf('timeZone') });
    });

}