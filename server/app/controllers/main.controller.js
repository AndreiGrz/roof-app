const connection = require('../database/db.js');
const path = require('path');
const ejs = require('ejs');
const nodemailer = require('nodemailer');
const pdf = require('html-pdf');
const { v4: uuidv4 } = require('uuid');
const formidable = require('formidable');
const fs = require('fs');

let productLabel = '';
let productPrice = '';
let productId = '';

const calculNecesarAcoperis1A = async (dimensiuni, modelTabla) => {
    const necesar = {};
    const aria_1 = Math.ceil(dimensiuni.lungimea_2 * dimensiuni.latimea_3);
    necesar.aria = Math.round(aria_1 * 1.1);

    necesar.suruburi = Math.ceil(necesar.aria * 1.1 / 35);
    necesar.bordura = Math.ceil((dimensiuni.latimea_3 * 2 + dimensiuni.lungimea_2) / 1.9);
    necesar.sort_streasina = Math.ceil(dimensiuni.lungimea_2 / 1.9);
    necesar.colector_fronton = necesar.bordura;
    necesar.opritor_zapada = Math.ceil(dimensiuni.lungimea_2 / 2);

    if(dimensiuni.sistem_pluvial){
        necesar.jgheaburi = Math.ceil(dimensiuni.lungimea_2);
        necesar.capac_jgheab = 2;
        necesar.imbinare_jgheab = Math.ceil((dimensiuni.lungimea_2 / 4) -1 );
        const colector_apa_1 = (dimensiuni.lungimea_2 < 5) ? 1 : (dimensiuni.lungimea_2 / 5);
        necesar.colector_apa = Math.round(colector_apa_1); 
        necesar.cot_evacuare = necesar.colector_apa;
        necesar.carlige = Math.ceil((dimensiuni.lungimea_2 / 0.7) + 1);
        necesar.cot_normal = Math.ceil(2 * necesar.colector_apa);
        const burlan_1 = Math.ceil(dimensiuni.inaltimea_1 * necesar.colector_apa);
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
    }
    necesar.folie = Math.ceil(necesar.aria / 75);

    let accesorii = await getAccesoriiForNecesar();
    accesorii.forEach((acc, i) => {
        accesorii[i] = {...acc, qty: necesar[acc._key]}
    });

    return [
        {
            id: productId,
            label: productLabel, 
            price: productPrice,
            qty: necesar.aria
        },
        ...accesorii
    ];
}

const calculNecesarAcoperis2A = async (dimensiuni, modelTabla) => {
    const necesar = {};

    const aria_1 = Math.ceil((dimensiuni.lungimea_3 * dimensiuni.latimea_2) + (dimensiuni.lungimea_3 * dimensiuni.latimea_4));
    necesar.aria = Math.round(aria_1 * 1.2);
    necesar.coama = Math.ceil(dimensiuni.lungimea_3 / 1.85);
    necesar.suruburi = Math.ceil(necesar.aria * 1.1 / 35);
    necesar.bordura = Math.ceil(((dimensiuni.latimea_2 * 2) + (dimensiuni.latimea_4 * 2)) / 1.9); //?
    necesar.sort_streasina = Math.ceil((dimensiuni.lungimea_3 * 2) / 1.9);
    necesar.colector_fronton = necesar.bordura;
    necesar.etans = Math.ceil(necesar.coama / 5);
    necesar.opritor_zapada = Math.round(dimensiuni.lungimea_3);//?
    if(dimensiuni.sistem_pluvial){
        necesar.jgheaburi = (dimensiuni.lungimea_3 * 2) % 2 == 0 ? Math.ceil((dimensiuni.lungimea_3 * 2)) : Math.ceil((dimensiuni.lungimea_3 * 2)) + 1;
        necesar.capac_jgheab = 4;
        necesar.imbinare_jgheab = Math.ceil(((dimensiuni.lungimea_3 * 2) / 4));
        const colector_apa_1 = ((dimensiuni.lungimea_3 * 2) < 5) ? 2 : ((dimensiuni.lungimea_3 * 2) / 5);
        necesar.colector_apa = Math.ceil(colector_apa_1); 
        necesar.cot_evacuare = necesar.colector_apa;
        necesar.carlige = Math.ceil(((dimensiuni.lungimea_3 * 2) / 0.7) + 1);
        necesar.cot_normal = Math.ceil(2 * necesar.colector_apa);

        let burlan = 0;
        if (Math.ceil(dimensiuni.inaltimea_1 * necesar.colector_apa) % 3 == 0)
        burlan = Math.ceil(dimensiuni.inaltimea_1 * necesar.colector_apa);
        if (Math.ceil((dimensiuni.inaltimea_1 * necesar.colector_apa) - 1) % 3 == 0)
        burlan = Math.ceil(dimensiuni.inaltimea_1 * necesar.colector_apa) + 2;
        if (Math.ceil((dimensiuni.inaltimea_1 * necesar.colector_apa) + 1) % 3 == 0)
        burlan = Math.ceil(dimensiuni.inaltimea_1 * necesar.colector_apa) + 1;
        
        necesar.bratara_burlan = Math.ceil((burlan / 3) * 2);
        necesar.prelungitor = necesar.colector_apa;
    }
    necesar.folie = Math.ceil(necesar.aria / 75);

    let accesorii = await getAccesoriiForNecesar();

    accesorii.forEach((acc, i) => {
        accesorii[i] = {...acc, qty: necesar[acc._key]}   
    });

    return [
        {
            id: productId,
            label: productLabel, 
            price: productPrice,
            qty: necesar.aria
        },
        ...accesorii
    ];
}

const calculNecesarAcoperis4A = async (dimensiuni, modelTabla) => {
    const necesar = {};

    const aria_1 = Math.ceil((dimensiuni.lungimea_2 + dimensiuni.linia_4) * dimensiuni.adancimea_6 + (dimensiuni.latimea_3 * dimensiuni.adancimea_7));
    necesar.aria = Math.ceil(aria_1 * 1.22);
    necesar.coama = Math.ceil((dimensiuni.linia_4 + dimensiuni.cateta_5 * 4) / 1.85); 
    necesar.suruburi = Math.ceil(necesar.aria * 1.15 / 35);
    necesar.sort_streasina = Math.ceil(((dimensiuni.lungimea_2 + dimensiuni.latimea_3) * 2) / 1.9);
    necesar.bordura = 0;
    necesar.colector_fronton = necesar.bordura;
    necesar.etans = Math.ceil(necesar.coama / 5);
    necesar.opritor_zapada = Math.round((dimensiuni.lungimea_2 + dimensiuni.latimea_3)); 

    if(dimensiuni.sistem_pluvial){
        necesar.jgheaburi = Math.ceil((dimensiuni.lungimea_2 + dimensiuni.latimea_3) * 2);
        necesar.capac_jgheab = 0;
        necesar.imbinare_jgheab = Math.ceil((((dimensiuni.lungimea_2 + dimensiuni.latimea_3) * 2) / 4)+6);
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
    }
  
    

    necesar.folie = Math.ceil(necesar.aria / 75);

    let accesorii = await getAccesoriiForNecesar();

    accesorii.forEach((acc, i) => {
        accesorii[i] = {...acc, qty: necesar[acc._key]}
    });

    return [
        {
            id: productId,
            label: productLabel, 
            price: productPrice,
            qty: necesar.aria
        },
        ...accesorii
    ];
}

const getAccesoriiForNecesar = async () => {
    const conn = await connection();
    const [result]  = await conn.execute(`SELECT p.post_title AS label,  
        p.id,
        pm_price.meta_value AS price, 
    pm_sku.meta_value AS _key
    FROM wpay_posts AS p
    JOIN wpay_postmeta AS pm_price ON p.ID = pm_price.post_id AND pm_price.meta_key = '_price'
    JOIN wpay_postmeta AS pm_sku ON p.ID = pm_sku.post_id AND pm_sku.meta_key = '_sku'
    JOIN wpay_term_relationships AS tr ON p.ID = tr.object_id
    JOIN wpay_term_taxonomy AS tt ON tr.term_taxonomy_id = tt.term_taxonomy_id AND tt.taxonomy = 'product_cat'
    JOIN wpay_terms AS t ON tt.term_id = t.term_id
    WHERE p.post_type = 'product' and t.term_id = 69
    GROUP BY p.ID
   `);

   return result;

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
        
        productLabel = rows[0].post_title;
        productId = rows[0].id;
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

        if (price && price.length) {
            productPrice = price[0].meta_value;
        } else if (salePrice && salePrice.length) {
            productPrice = salePrice[0].meta_value;
        } else {
            productPrice = null;
        }

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

exports.getAccesoriiSuplimentare = async (req, res) => {
    const conn = await connection();

    try {
        const [rows] = await conn.execute(`SELECT p.post_title AS label,
            p.id,
            pm_price.meta_value AS price
    FROM wpay_posts AS p
    JOIN wpay_postmeta AS pm_price ON p.ID = pm_price.post_id AND pm_price.meta_key = '_price' 
    JOIN wpay_term_relationships AS tr ON p.ID = tr.object_id
    JOIN wpay_term_taxonomy AS tt ON tr.term_taxonomy_id = tt.term_taxonomy_id AND tt.taxonomy = 'product_cat'
    JOIN wpay_terms AS t ON tt.term_id = t.term_id
    WHERE p.post_type = 'product' and t.term_id = 69
    GROUP BY p.ID
   `);

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

exports.getAccesorii = async (req, res) => {
    const conn = await connection();
    try{
        const data = req.body;
        let necesarAccesorii = {};

        switch (data.tipCalculator){
            case '1A':
                necesarAccesorii = await calculNecesarAcoperis1A(data.infoDimensiuni, data.infoTabla);
                break;
            case '2A':
                necesarAccesorii = await calculNecesarAcoperis2A(data.infoDimensiuni, data.infoTabla);
                break;
            case '4A':
                necesarAccesorii = await calculNecesarAcoperis4A(data.infoDimensiuni, data.infoTabla);
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

exports.sendEmail = async (req, res) => {
    const conn = await connection();
    try {        
        // ejs.renderFile(path.join(__dirname, '../templates/', 'mail.ejs'), { list, totalPrice, userInfo }, (err, html) => {
        //     if (err) {
        //       return res.status(500).send(err);
        //     }
        
        //     // Generate the PDF
        //     pdf.create(html).toBuffer((err, buffer) => {
        //       if (err) {
        //         return res.status(500).send(err);
        //       }
        
        //       // Send the PDF as an attachment in an email
              
        //     });

            
        //   });

        const {list, userInfo, models, measurements, tipCalculator} = req.body;

        const dbId = uuidv4();
        const dbNume = userInfo.nume;
        const dbEmail = userInfo.email;
        const dbModels = JSON.stringify(models);
        const dbMeasurements = JSON.stringify(measurements);
        const dbAccesorii = JSON.stringify(list);

        await conn.execute(
            'INSERT INTO calculator (id, email, nume, modele, masuratori, accesorii) VALUES (?, ?, ?, ?, ?, ?)',
            [dbId, dbEmail, dbNume, dbModels, dbMeasurements, dbAccesorii]
        );

        const linkOferta = process.env.NODE_ENV && process.env.NODE_ENV === 'production' ? 
            `https://calculator.tabla-online.ro/oferta/${tipCalculator}/${dbId}` :
            `http://localhost:4200/oferta/${tipCalculator}/${dbId}`;
            
        let transportObj = {
            host: 'mail.tabla-online.ro',
            port: process.env.NODE_ENV && process.env.NODE_ENV === 'production' ? 465 : 587,
            secure: process.env.NODE_ENV && process.env.NODE_ENV === 'production',
            auth: {
              user: 'calculator@tabla-online.ro',
              pass: 'Calculator123!@#'
            }
          };
          if (!(process.env.NODE_ENV && process.env.NODE_ENV === 'production')) {
            transportObj = {
                ...transportObj,
                tls: {rejectUnauthorized: false}
            };
          }
          const transporter = nodemailer.createTransport(transportObj);
          const mailOptions = {
            from: 'calculator@tabla-online.ro',
            to: `${userInfo.email}, calculator@tabla-online.ro`,
            subject: 'Simulare pret',
            html: `
            <h3>Buna ziua, ${userInfo.nume}</h3>
            <br>
            <div>
                Esti doar la cateva clickuri distanta sa finalizezi comanda<br>
                inceputa pe <a href="tabla-online.ro">tabla-online.ro</a>
                <br>
                <br>
                
                <a href="${linkOferta}">Continua comanda</a>
            </div>
            `
          };
    
          transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
              return res.status(500).send(err);
            }
    
            res.send({message: 'ok'});
          });

    } catch (err) {
        res.status(500).send({message: err.message});
    } finally {
        conn.end();
    }
}

exports.getOferta = async (req, res) => {
    const conn = await connection();

    try {
        const id = req.query.id;
        const [rows] = await conn.execute('select * from calculator where id = ?', [id]);

        res.status(200)
            .send({
                results: rows[0]
            });
    } catch (err) {
        res.status(500).send({message: err.message});
    } finally {
        conn.end();
    }
};

exports.uploadFiles = async (req, res) => {
    try {
        const form = new formidable.IncomingForm();
        form.uploadDir = path.join(__dirname, '../public');
        form.multiples = true;
    
        form.on('file', (field, file) => {
          fs.rename(file.filepath, form.uploadDir + '/' + file.originalFilename, (error) => {
            if (error) throw error;
          });
        });
    
        form.on('end', () => {
            res.status(200).send();
        });
    
        form.parse(req);
    } catch (err) {
        res.status(500).send({message: err.message});
    }
};