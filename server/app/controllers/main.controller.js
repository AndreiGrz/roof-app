const connection = require('../database/db.js');

const calculNecesarAcoperis1A =  (dimensiuni, modelTabla) => {
    const necesar = {};
    const aria_1 = Math.ceil(dimensiuni.lungimea_2 * dimensiuni.latimea_3);
    necesar.aria = Math.round(aria_1 * 1.1);

    necesar.suruburi = Math.ceil(necesar.aria * 1.1 / 35);
    necesar.bordura = Math.ceil((dimensiuni.latimea_3 * 2 + dimensiuni.lungimea_2) / 1.9);
    necesar.sort_streasina = Math.ceil(dimensiuni.lungimea_2 / 1.9);
    necesar.colector_fronton = necesar.bordura;
    necesar.opritor_zapada = Math.ceil(dimensiuni.lungimea_2 / 2);
    necesar.jgheaburi = Math.ceil(dimensiuni.lungimea_2);
    necesar.capac_jgheab = 2;
    necesar.imbinare_jgheab = Math.ceil((dimensiuni.lungimea_2 / 4) -1 );
    const colector_apa_1 = (dimensiuni.lungimea_2 < 5) ? 1 : (dimensiuni.lungimea_2 / 5);
    necesar.colector_apa = Math.round(colector_apa_1); 
    necesar.cot_evacuare = necesar.colector_apa;
    necesar.carlige = Math.ceil((dimensiuni.lungimea_2 / 0.7) + 1);
    necesar.cot_normal = Math.ceil(2 * necesar.colector_apa);
    const burlan_1 = Math.ceil(dimensiuni.lungimea_2 * necesar.colector_apa);
    necesar.burlane = burlan_1 % 3 == 0 ? burlan_1 : Math.floor(burlan_1 + 1) | 1;
    necesar.prelungitor = necesar.colector_apa;

    let burlan = 0;
    if (burlan_1 && burlan > 0){
        if (burlan_1 % 3 == 0){
            burlan = burlan_1;
        }
        if ((burlan_1 - 1) % 3 == 0){
            burlan = burlan_1 + 2;
        }
        if ((burlan_1 + 1) % 3 == 0){
            burlan = burlan_1 + 1;
        }
    }
   
    necesar.bratara_burlan = Math.ceil((burlan / 3) * 2);
    necesar.folie = Math.ceil(necesar.aria / 75);

    return necesar;
}

const calculNecesarAcoperis2A = (dimensiuni, modelTabla) => {
    const necesar = {};

    const aria_1 = Math.ceil((dimensiuni.lungimea_3 * dimensiuni.latimea_2) + (dimensiuni.lungimea_3 * dimensiuni.latimea_4));
    necesar.aria = Math.round(aria_1 * 1.2);
    necesar.coama = Math.ceil(dimensiuni.lungimea_3 / 1.85);
    necesar.suruburi = Math.ceil(necesar.aria * 1.1 / 35);
    necesar.bordura = Math.ceil((dimensiuni.latimea_2 * 4) / 1.9);
    necesar.sort_streasina = Math.ceil((dimensiuni.lungimea_3 * 2) / 1.9);
    necesar.colector_fronton = necesar.bordura;
    necesar.etans = Math.ceil(necesar.coama / 5);
    necesar.opritor_zapada = Math.ceil(dimensiuni.lungimea_3 * 2 / 2);
    necesar.jgheaburi = (dimensiuni.lungimea_3 * 2) % 2 == 0 ? Math.ceil((dimensiuni.lungimea_3 * 2)) : Math.ceil((dimensiuni.lungimea_3 * 2)) + 1;
    necesar.capac_jgheab = 4;
    necesar.imbinare_jgheab = Math.ceil(((dimensiuni.lungimea_3 * 2) / 4));
    const colector_apa_1 = (dimensiuni.lungimea_3 * 2 < 5) ? 2 : ((dimensiuni.lungimea_3 * 2) / 5);
    necesar.colector_apa = Math.ceil(colector_apa_1); 
    necesar.cot_evacuare = colector_apa_1;
    necesar.carlige = Math.ceil(((dimensiuni.lungimea_3 * 2) / 0.7) + 1);
    necesar.cot_normal = Math.ceil(2 * colector_apa_1);

    let burlan = 0;
    if (Math.ceil(dimensiuni.inaltimea_1 * necesar.colector_apa) % 3 == 0)
      burlan = Math.ceil(dimensiuni.inaltimea_1 * necesar.colector_apa);
    if (Math.ceil((dimensiuni.inaltimea_1 * necesar.colector_apa) - 1) % 3 == 0)
      burlan = Math.ceil(dimensiuni.inaltimea_1 * necesar.colector_apa) + 2;
    if (Math.ceil((dimensiuni.inaltimea_1 * necesar.colector_apa) + 1) % 3 == 0)
      burlan = Math.ceil(dimensiuni.inaltimea_1 * necesar.colector_apa) + 1;
    
    necesar.bratara_burlan = Math.ceil((burlan / 3) * 2);
    necesar.prelungitor = necesar.colector_apa;
    necesar.folie = Math.ceil(necesar.aria / 75);

    return necesar;
}

const calculNecesarAcoperis4A = (dimensiuni, modelTabla) => {
    console.log('here we go', dimensiuni, modelTabla)
    const necesar = {};

    const aria_1 = Math.ceil((dimensiuni.lungimea_2 + dimensiuni.linia_4) * dimensiuni.adancimea_6 + (dimensiuni.latimea_3 * dimensiuni.adancimea_7));
    necesar.aria = Math.ceil(aria_1 * 1.22);
    necesar.coama = Math.ceil((dimensiuni.linia_4 + dimensiuni.cateta_5 * 4) / 1.85);
    necesar.suruburi = Math.ceil(necesar.aria * 1.15 / 35);
    necesar.sort_streasina = Math.ceil(((dimensiuni.lungimea_2 + dimensiuni.latimea_3) * 2) / 1.9);
    necesar.bordura = 0;
    necesar.colector_fronton = necesar.bordura;
    necesar.etans = Math.ceil(necesar.coama / 5);
    necesar.opritor_zapada = Math.ceil(((dimensiuni.lungimea_2 + dimensiuni.latimea_3) * 2) / 2);
    necesar.jgheaburi = Math.ceil((dimensiuni.lungimea_2 + dimensiuni.latimea_3) * 2);
    necesar.capac_jgheab = 0;
    necesar.imbinare_jgheab2 = Math.ceil((((dimensiuni.lungimea_2 + dimensiuni.latimea_3) * 2) / 4)+6);
    const colector_apa_1 = (dimensiuni.lungimea_2 < 5) ? 1 :  ((dimensiuni.lungimea_2 + dimensiuni.latimea_3)*2) / 5;
    necesar.colector_apa = Math.round(colector_apa_1);
    necesar.cot_evacuare = necesar.colector_apa;
    necesar.carlige = Math.ceil((((dimensiuni.lungimea_2 + dimensiuni.latimea_3) * 2) / 0.7) + 8);
    necesar.cot_normal = Math.ceil(2 * necesar.colector_apa);
    
    let burlan = 0;
    if (Math.ceil(dimensiuni.inaltimea_1 * necesar.colector_apa) % 3 == 0)
        burlan = Math.ceil(dimensiuni.inaltimea_1 * necesar.colector_apa);
    if (Math.ceil((dimensiuni.inaltimea_1 * necesar.colector_apa) - 1) % 3 == 0)
        burlan = Math.ceil(dimensiuni.inaltimea_1 * necesar.colector_apa) + 2;
    if (Math.ceil((dimensiuni.inaltimea_1 * necesar.colector_apa) + 1) % 3 == 0)
        burlan = Math.ceil(dimensiuni.inaltimea_1 * necesar.colector_apa) + 1;
    
    necesar.bratara_burlan = Math.ceil((burlan / 3) * 2);
    necesar.colt_exterior = 4;
    necesar.prelungitor = necesar.colector_apa;
    necesar.folie = Math.ceil(necesar.aria / 75);

    return necesar;
}

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

        const [rows] = await conn.execute(`select term.name, term.term_id, termrel.object_id, post.guid 
        from wpay_terms as term join wpay_term_taxonomy as termtaxo on term.term_id = termtaxo.term_id 
        join wpay_term_relationships as termrel on termrel.term_taxonomy_id = term.term_id 
        join wpay_posts as post on termrel.object_id = post.post_parent 
        JOIN wpay_postmeta ON post.ID = wpay_postmeta.meta_value 
        where termtaxo.taxonomy = "product_cat" and termtaxo.parent = ? and termtaxo.description = "model" 
        and post.post_type = "attachment" 
        AND post.post_mime_type LIKE "image/%" AND wpay_postmeta.meta_key = "_thumbnail_id" 
        GROUP BY term.name`, [brandId]);
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

        const [rows] = await conn.execute(`select term.name, term.term_id, termrel.object_id,  meta.meta_value, thirdpost.guid
        from wpay_terms as term join wpay_term_taxonomy as termtaxo on term.term_id = termtaxo.term_id 
        join wpay_term_relationships as termrel on termrel.term_taxonomy_id = term.term_id 
        
         
         join wpay_postmeta as meta on meta.post_id =  termrel.object_id 
         join wpay_posts as thirdpost on thirdpost.id = meta.meta_value
        
        where termtaxo.taxonomy = "product_cat" and termtaxo.parent = ? and termtaxo.description = "finisaj"  and meta.meta_key =  "_thumbnail_id"
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

exports.getAccesorii = async (req, res) => {
    // let accesorii = [
    //     {
    //         key: "suruburi",
    //         label: 'nume',
    //         pret: 1
    //     },
    //     {
    //         key: "coturi",
    //         label: 'nume2',
    //         pret: 2
    //     },
    // ];

    // let nec = {
    //   suruburi: 9,
    //   coturi: 7
    // }


    // let suruburi = 9;
    // let coturi = 7;

    // accesorii.forEach((acc, i) => {

    //   accesorii[i] = {...acc, qty: nec[acc.key]}
    // });

    // console.log(accesorii)








    const conn = await connection();
    try{
        const data = req.body;
        let necesarAccesorii = {};

        switch (data.tipCalculator){
            case '1A':
                necesarAccesorii = calculNecesarAcoperis1A(data.infoDimensiuni, data.infoTabla);
                break;
            case '2A':
                necesarAccesorii = calculNecesarAcoperis2A(data.infoDimensiuni, data.infoTabla);
                break;
            case '4A':
                necesarAccesorii = calculNecesarAcoperis4A(data.infoDimensiuni, data.infoTabla);
                break;
        }
        res.status(200)
            .send({
                necesarAccesorii
            });

    }catch (err) {
        res.status(500).send({message: err.message});
    } finally {
        conn.end();
    }
}