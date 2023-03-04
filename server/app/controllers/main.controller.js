const connection = require('../database/db.js');

exports.getBrands = async (req, res) => {
    const conn = await connection();

    try {
       // const [rows] = await conn.execute('SELECT term.name, term.term_id from wpay_terms as term JOIN wpay_term_taxonomy as termtaxo ON term.term_id = termtaxo.term_id WHERE termtaxo.taxonomy = "product_cat" AND termtaxo.parent = 0 AND termtaxo.description = "calculator"');

        const [rows] = await conn.execute('select term.name, term.term_id, termrel.object_id, post.guid from wpay_terms as term join wpay_term_taxonomy as termtaxo on term.term_id = termtaxo.term_id join wpay_term_relationships as termrel on termrel.term_taxonomy_id = term.term_id join wpay_posts as post on termrel.object_id = post.post_parent JOIN wpay_postmeta ON post.ID = wpay_postmeta.meta_value where termtaxo.taxonomy = "product_cat" and termtaxo.parent = 0 and termtaxo.description = "calculator" and post.post_type = "attachment" AND post.post_mime_type LIKE "image/%" AND wpay_postmeta.meta_key = "_thumbnail_id" GROUP BY term.name');

        res.status(200)
            .send({
                results: rows
            });
    } catch (err) {
        res.status(500).send({message: err.message});
    } finally {
        conn.end();
    }
};

exports.getModels = async (req, res) => {
    const conn = await connection();

    try {
        const brandId = req.query.brandId;
        //const [rows] = await conn.execute('SELECT tn.name, tn.term_id FROM wpay_terms as tn JOIN wpay_term_taxonomy as termtaxo ON tn.term_id = termtaxo.term_id WHERE termtaxo.taxonomy = "product_cat" AND termtaxo.parent = ?', [brandId]);

        const [rows] = await conn.execute(`SELECT term.name, term.term_id, termrel.object_id, post.guid FROM wpay_terms as term 
        join wpay_term_taxonomy as termtaxo on term.term_id = termtaxo.term_id 
        join wpay_term_relationships as termrel on termrel.term_taxonomy_id = term.term_id
        join wpay_posts as post on termrel.object_id = post.post_parent
        JOIN wpay_postmeta ON post.ID = wpay_postmeta.meta_value
        WHERE termtaxo.taxonomy like "product_cat" and termtaxo.parent = ? and post.post_type = "attachment"
        AND post.post_mime_type LIKE "image/%"
        AND wpay_postmeta.meta_key = "_thumbnail_id" group by term.name`, [brandId]);
        res.status(200)
            .send({
                results: rows
            });
    } catch (err) {
        res.status(500).send({message: err.message});
    } finally {
        conn.end();
    }
};

exports.getFinisaje = async (req, res) => {
    const conn = await connection();

    try {
        const modelId = req.query.modelId;

        const [rows] = await conn.execute(`select term.name, term.term_id, termrel.object_id, secondpost.guid 
        from wpay_terms as term join wpay_term_taxonomy as termtaxo on term.term_id = termtaxo.term_id 
        join wpay_term_relationships as termrel on termrel.term_taxonomy_id = term.term_id 
        
         join wpay_posts as firstpost on firstpost.post_parent =  termrel.object_id
         join wpay_posts as secondpost on secondpost.post_parent = firstpost.id
        
        where termtaxo.taxonomy = "product_cat" and termtaxo.parent = ? and termtaxo.description = "finisaj"  and (firstpost.post_mime_type LIKE "image/%" OR secondpost.post_mime_type LIKE "image/%" )
        GROUP BY term.name`, [modelId]);
        res.status(200)
            .send({
                results: rows
            });
    } catch (err) {
        res.status(500).send({message: err.message});
    } finally {
        conn.end();
    }
};

exports.getGrosimi = async (req, res) => {
    const conn = await connection();

    try {
        const finisajId = req.query.finisajId;

        const [rows] = await conn.execute(`select postm.meta_id, postsp.post_title, postsp.id,  postm.meta_key, postm.meta_value, posts.guid from wpay_posts as postsp
        join wpay_term_relationships as termrel on postsp.post_parent =  termrel.object_id
        join wpay_postmeta as postm on postsp.id = postm.post_id
        left join wpay_postmeta as postmeta on postmeta.post_id = postm.post_id
        left join wpay_posts as posts on posts.id = postmeta.meta_value 
        where termrel.term_taxonomy_id = ? and postm.meta_key = "attribute_pa_grosime" and postmeta.meta_key = "_thumbnail_id"  and posts.guid <> "NULL" group by postm.meta_value`, [finisajId]);
        res.status(200)
            .send({
                results: rows
            });
    } catch (err) {
        res.status(500).send({message: err.message});
    } finally {
        conn.end();
    }
};

exports.getCulori = async (req, res) => {
    const conn = await connection();

    try {
        const finisajId = req.query.finisajId;
        const grosimeId = req.query.grosimeId;

        const [rows] = await conn.execute(`select postm.meta_id, postsp.post_title, postsp.id, postm.meta_key, postm.meta_value, secondpost.guid, secondpostmeta.meta_value
        from wpay_posts as postsp 
        join wpay_term_relationships as termrel on postsp.post_parent = termrel.object_id 
        join wpay_postmeta as postm on postsp.id = postm.post_id
        
        left join wpay_postmeta as postmeta on postmeta.post_id = postm.post_id 
        left join wpay_posts as posts on posts.id = postmeta.meta_value 
        
        
        left join wpay_postmeta as secondpostmeta on secondpostmeta.post_id = postmeta.post_id 
        left join wpay_posts as secondpost on secondpost.id = secondpostmeta.meta_value 
        
        
        
        where termrel.term_taxonomy_id = ?
        and postm.meta_key = "attribute_pa_culoare" and postmeta.meta_value = ? and secondpostmeta.meta_key = "_thumbnail_id"  group by postm.meta_value`, [finisajId, grosimeId]);
        res.status(200)
            .send({
                results: rows
            });
    } catch (err) {
        res.status(500).send({message: err.message});
    } finally {
        conn.end();
    }
};

exports.getPret = async (req, res) => {
    const conn = await connection();

    try {
        const grosimeId = req.query.grosimeId;

        const [price] = await conn.execute(`SELECT meta_value FROM wpay_postmeta WHERE post_id = ? and meta_key = "_regular_price"`, [grosimeId]);
        const [salePrice] = await conn.execute(`SELECT * FROM wpay_postmeta WHERE post_id = ? and meta_key = "_sale_price"`, [grosimeId]);

        res.status(200)
            .send({
                results: {
                    price: price && price.length ? price[0].meta_value : null,
                    salePrice: salePrice && salePrice.length ? salePrice[0].meta_value : null
                }
            });
    } catch (err) {
        res.status(500).send({message: err.message});
    } finally {
        conn.end();
    }
};