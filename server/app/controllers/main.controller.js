exports.get = async (req, res) => {
    try {
        res.status(200)
            .send({
            message: 'Hello'
        });
    } catch (err) {
        res.status(500).send({message: err.message});
    }
};