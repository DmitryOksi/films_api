const {
    parseFileToJson
} = require('../helpers/parseFileToJSON');

const {
    checkDuplicateValue
} = require('../helpers/validation/checkDuplicateValue')

const {
    checkValidYear
} = require('../helpers/validation/checkValidYear')

const {
    callback
} = require('../helpers/callback');

module.exports = (router, film, upload) => {
    router.post('/', async (req, res) => {
        try {
            const {
                body
            } = req;
            const {
                release_year,
                stars,
            } = body;
            const responseCheckDuplicateValue = checkDuplicateValue(stars, callback);
            if (!responseCheckDuplicateValue.success) {
                res.status(400).json(responseCheckDuplicateValue.error_message);
            }
            const responseCheckValidYear = checkValidYear(release_year, callback);
            if (!responseCheckValidYear.success) {
                res.status(400).json(responseCheckValidYear.error_message);
            }
            res.json(await film.create(body));
        } catch (e) {
            res.status(400).json(e.message);
        }
    });
    router.delete('/:filmId', async (req, res) => {
        try {
            await film.findByIdAndRemove(req.params.filmId)
            res.json({
                success: true
            });
        } catch (e) {
            res.status(400).json(e.message);
        }
    });
    router.get('/:filmId', async (req, res) => {
        try {
            res.json(await film.findById(req.params.filmId));
        } catch (e) {
            res.status(400).json(e.message);
        }
    });

    router.get('/order-sort/:value', async (req, res) => {

        const {
            params: {
                value
            }
        } = req;
        try {
            res.json(await film.find().sort({
                title: value
            }));
        } catch (e) {
            res.status(400).json(e.message);
        }
    });

    router.get('/title/:name', async (req, res) => {
        try {
            const {
                params: {
                    name
                }
            } = req;
            res.json(await film.find({
                title: name
            }))
        } catch (e) {
            res.status(400).json(e.message);
        }
    })

    router.get('/star/:person', async (req, res) => {
        try {
            const {
                params: {
                    person
                }
            } = req;
            res.json(await film.find({
                "stars": {
                    "$regex": person,
                    "$options": "i"
                }
            }));
        } catch (e) {
            res.status(400).json(e.message);
        }
    })
    router.post('/file', upload.single('file'), async (req, res) => {
        const {
            file: {
                filename
            }
        } = req;
        const responseParseFileToJson = parseFileToJson({
            filename,
            checkDuplicateValue,
            checkValidYear,
            callback,
        })
        responseParseFileToJson.then(async (films) => {
            try {
                films.forEach(film => {
                    const {
                        release_year,
                        stars,
                    } = film;

                    const responseCheckDuplicateValue = checkDuplicateValue(stars, callback);
                    if (!responseCheckDuplicateValue.success) {
                        res.status(400).json(responseCheckDuplicateValue.error_message);
                    }
                    const responseCheckValidYear = checkValidYear(release_year, callback);
                    if (!responseCheckValidYear.success) {
                        res.status(400).json(responseCheckValidYear.error_message);
                    }
                });
                res.json(await film.insertMany(films));
            } catch (e) {
                res.status(400).json(e.message);
            }

        }).catch((e) => {
            res.status(400).json(e)
        })
    })
    router.get('/star-title/:star/:title', async (req, res) => {
        try {
            const {
                params: {
                    star,
                    title
                }
            } = req;
            res.json(await film.find({
                stars: {
                    "$regex": star,
                    "$options": "i"
                },
                title,
            }));
        } catch (e) {
            res.status(400).json(e.message);
        }
    })

    return router;
}