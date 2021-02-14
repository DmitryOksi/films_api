const {
    parseFileToJson
} = require('../helpers/parseFileToJSON');

module.exports = (router, film, upload) => {
    router.post('/', async (req, res) => {
        try {
            res.json(await film.create(req.body));
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

    router.get('/', async (req, res) => {
        try {
            res.json(await film.find().sort({
                title: 1
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
        try {
            const films = await parseFileToJson(req.file.filename);
            res.json(await film.insertMany(films));
        } catch (e) {
            res.status(400).json(e.message);
        }
    })

    return router;
}