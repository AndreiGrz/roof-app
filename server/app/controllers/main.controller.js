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
let productParent = '';
let productImage = '';

const calculNecesarAcoperis1A = async (dimensiuni, modelTabla) => {//extra
    const necesar = {};
    const aria_1 = Math.ceil(dimensiuni.lungimea_2 * dimensiuni.latimea_3);
    // console.log(aria_1);
    necesar.aria = Math.round(aria_1 * 1.1);
    if(dimensiuni.imparte_tabla){
        necesar.aria = Math.ceil(necesar.aria * 1.03);
    }
    necesar.suruburi = Math.ceil(necesar.aria * 1.1 / 35);
    necesar.bordura = Math.ceil((dimensiuni.latimea_3 * 2 + dimensiuni.lungimea_2) / 1.9);
    necesar.sort_streasina = Math.ceil(dimensiuni.lungimea_2 / 1.9);
    // necesar.colector_fronton = necesar.bordura;
    necesar.opritor_zapada = Math.ceil(dimensiuni.lungimea_2 / 2);

    if(dimensiuni.sistem_pluvial){
        necesar.jgheaburi = Math.ceil(dimensiuni.lungimea_2)% 2 == 0 ? Math.ceil(dimensiuni.lungimea_2) : Math.ceil(dimensiuni.lungimea_2) +1;
        necesar.capac_jgheab = 2;
        necesar.imbinare_jgheab = Math.ceil((dimensiuni.lungimea_2 / 4) -1 );
        const colector_apa_1 = (dimensiuni.lungimea_2 < 5) ? 1 : (dimensiuni.lungimea_2 / 5);
        necesar.colector_apa = Math.round(colector_apa_1); 
        necesar.cot_evacuare = necesar.colector_apa;
        necesar.carlige = Math.ceil(necesar.jgheaburi / 0.8);
        necesar.cot_normal = Math.ceil(2 * necesar.colector_apa);
        const burlan_1 = Math.ceil(dimensiuni.inaltimea_1 * necesar.colector_apa);
        necesar.burlane = burlan_1 % 3 == 0 ? burlan_1 : Math.floor(burlan_1 + 1) | 1;
        necesar.prelungitor = necesar.colector_apa;

        let burlan = 0;
        if (burlan_1 ){
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
        necesar.burlan = burlan;
        necesar.bratara_burlan = Math.ceil((burlan / 3) * 2);
        necesar.silicon = 1;
    }
    necesar.spray = 1;
    necesar.folie = Math.ceil(necesar.aria / 75);
    necesar.set_cos_fum = dimensiuni.numarHornuri;

    let accesorii = await getAccesoriiForNecesar(dimensiuni.sistem_pluvial, dimensiuni.diametru, modelTabla.brand, modelTabla.finisaj, modelTabla.culoare);//extra
    accesorii.forEach((acc, i) => {
        accesorii[i] = {...acc, qty: necesar[acc._key]}
    });

    return [
        {
            id: productId,
            parentId: productParent,
            link_img: productImage,
            label: productLabel, 
            price: productPrice,
            qty: necesar.aria
        },
        ...accesorii
    ];
}

const calculNecesarAcoperis2A = async (dimensiuni, modelTabla) => {//extra
    const necesar = {};

    const aria_1 = Math.ceil((dimensiuni.lungimea_3 * dimensiuni.latimea_2) + (dimensiuni.lungimea_3 * dimensiuni.latimea_4));
    necesar.aria = Math.round(aria_1 * 1.18);
    if(dimensiuni.imparte_tabla){
        necesar.aria = Math.ceil(necesar.aria * 1.03);
    }
    necesar.coama = Math.ceil(dimensiuni.lungimea_3 / 1.85);
    necesar.suruburi = Math.ceil(necesar.aria * 1.1 / 35);
    necesar.bordura = Math.ceil(((dimensiuni.latimea_2 * 2) + (dimensiuni.latimea_4 * 2)) / 1.9); //?
    necesar.sort_streasina = Math.ceil((dimensiuni.lungimea_3 * 2) / 1.9);
    // necesar.colector_fronton = necesar.bordura;
    necesar.aluband = Math.ceil(necesar.coama / 5);
    necesar.opritor_zapada = Math.round(dimensiuni.lungimea_3);//?
    if(dimensiuni.sistem_pluvial){
        necesar.jgheaburi = (dimensiuni.lungimea_3 * 2) % 2 == 0 ? Math.ceil((dimensiuni.lungimea_3 * 2)) : Math.ceil((dimensiuni.lungimea_3 * 2)) + 1;
        necesar.capac_jgheab = 4;
        necesar.imbinare_jgheab = Math.ceil(((dimensiuni.lungimea_3 * 2) / 4));
        const colector_apa_1 = ((dimensiuni.lungimea_3 * 2) < 5) ? 2 : ((dimensiuni.lungimea_3 * 2) / 6);
        necesar.colector_apa = Math.ceil(colector_apa_1); 
        necesar.cot_evacuare = necesar.colector_apa;
        necesar.carlige = Math.ceil(necesar.jgheaburi / 0.8);
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
        necesar.silicon = 1;
    }
    necesar.spray = 1;
    necesar.folie = Math.ceil(necesar.aria / 75);
    necesar.set_cos_fum = dimensiuni.numarHornuri;


    let accesorii = await getAccesoriiForNecesar(dimensiuni.sistem_pluvial, dimensiuni.diametru, modelTabla.brand, modelTabla.finisaj, modelTabla.culoare);//extra

    accesorii.forEach((acc, i) => {
        accesorii[i] = {...acc, qty: necesar[acc._key]}   
    });

    return [
        {
            id: productId,
            parentId: productParent,
            link_img: productImage,
            label: productLabel, 
            price: productPrice,
            qty: necesar.aria
        },
        ...accesorii
    ];
}

const calculNecesarAcoperis4A = async (dimensiuni, modelTabla) => {//extra
    const necesar = {};

    const aria_1 = Math.ceil((dimensiuni.lungimea_2 + dimensiuni.linia_4) * dimensiuni.adancimea_6 + (dimensiuni.latimea_3 * dimensiuni.adancimea_7));
    necesar.aria = Math.ceil(aria_1 * 1.2);
    if(dimensiuni.imparte_tabla){
        necesar.aria = Math.ceil(necesar.aria * 1.03);
    }
    necesar.coama = Math.ceil((dimensiuni.linia_4 + dimensiuni.cateta_5 * 4) / 1.85); 
    necesar.suruburi = Math.ceil(necesar.aria * 1.15 / 35);
    necesar.sort_streasina = Math.ceil(((dimensiuni.lungimea_2 + dimensiuni.latimea_3) * 2) / 1.9);
    necesar.bordura = 0;
    // necesar.colector_fronton = necesar.bordura;
    necesar.aluband = Math.ceil(necesar.coama / 5);
    necesar.opritor_zapada = Math.round((dimensiuni.lungimea_2 + dimensiuni.latimea_3)); 

    if(dimensiuni.sistem_pluvial){
        necesar.jgheaburi = Math.ceil((dimensiuni.lungimea_2 + dimensiuni.latimea_3) * 2) % 2 ? Math.ceil((dimensiuni.lungimea_2 + dimensiuni.latimea_3) * 2) : Math.ceil((dimensiuni.lungimea_2 + dimensiuni.latimea_3) * 2) + 1;
        necesar.capac_jgheab = 0;
        necesar.imbinare_jgheab = Math.ceil((((dimensiuni.lungimea_2 + dimensiuni.latimea_3) * 2) / 4)+6);
        const colector_apa_1 = (dimensiuni.lungimea_2 < 5) ? 1 :  ((dimensiuni.lungimea_2 + dimensiuni.latimea_3)*2) / 6;
        necesar.colector_apa = Math.round(colector_apa_1);
        necesar.cot_evacuare = necesar.colector_apa;
        necesar.carlige = Math.ceil(necesar.jgheaburi / 0.8);
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
        necesar.silicon = 1;
    }
    necesar.spray = 1;
    necesar.folie = Math.ceil(necesar.aria / 75);
    necesar.set_cos_fum = dimensiuni.numarHornuri;


    let accesorii = await getAccesoriiForNecesar(dimensiuni.sistem_pluvial, dimensiuni.diametru, modelTabla.brand, modelTabla.finisaj, modelTabla.culoare);//extra

    accesorii.forEach((acc, i) => {
        accesorii[i] = {...acc, qty: necesar[acc._key]}
    });

    return [
        {
            id: productId,
            parentId: productParent,
            label: productLabel,
            link_img: productImage,
            price: productPrice,
            qty: necesar.aria
        },
        ...accesorii
    ];
}


const getAccesoriiForNecesar = async (sistem_pluvial, diametru, brand, id_finisaj, id_culoare) => {//extra
    //aici faci if-urile dupa extra.tip_culoare sau extra.tip_finisaj
    let id_diametru;
     let id_subbrand;
    if(sistem_pluvial){
        if(diametru === '150/100'){
            switch (brand) {
                case 40:
                    id_diametru = 220;
                    id_subbrand = 248;
                    break;
                case 184:
                    id_diametru =245;
                    id_subbrand = 250;
                     id_finisaj = 68;
                    break;
                case 41:
                    id_diametru =219;
                    id_subbrand = 249;
                     id_finisaj = 68;
            }
        } 
        else if( diametru === '125/90'){
            switch (brand) {
                case 40:
                    id_diametru =217;
                     id_subbrand = 248;
                    break;
                case 184:
                    id_diametru =244;
                      id_subbrand = 250;
                       id_finisaj = 68;
                    break;
                case 41:
                    id_diametru = 218;
                     id_subbrand = 249;
                      id_finisaj = 68;
            }
        }
    } else {
        id_diametru = 69;
         switch (brand) {
                case 40:
                   
                    id_subbrand = 248;
                    break;
                case 184:
                    
                    id_subbrand = 250;
                    break;
                case 41:
                    
                    id_subbrand = 249;
            }
    }
    
    // if (id_finisaj == 202 || id_finisaj == 126 || id_finisaj == 127 || id_finisaj == 186 || id_finisaj == 204 || id_finisaj == 185 || id_finisaj == 210  ) {
    //     id_finisaj = 70;
    // }
    
    
    //BILKA - GRANDE MAT
    
      if (id_finisaj == 71 || id_finisaj == 74 || id_finisaj == 80 || id_finisaj == 84 || id_finisaj == 92 || id_finisaj == 96 || id_finisaj == 102 || id_finisaj == 113 || id_finisaj == 116 || id_finisaj == 119 || id_finisaj == 122 ) 
        {
            id_finisaj = 68;
        }
        
       // BILKA - MAT - CELE 4 CULORI
          
    if ( (id_finisaj == 70 && id_culoare == 297)  || (id_finisaj == 70 && id_culoare == 298) || (id_finisaj == 70 && id_culoare == 299) || (id_finisaj == 70 && id_culoare == 300) 
         ||  (id_finisaj == 73 && id_culoare == 427) || (id_finisaj == 73 && id_culoare == 428) || (id_finisaj == 73 && id_culoare == 429) || (id_finisaj == 73 && id_culoare == 430)
         ||  (id_finisaj == 79 && id_culoare == 582) || (id_finisaj == 79 && id_culoare == 583) || (id_finisaj == 79 && id_culoare == 584) || (id_finisaj == 79 && id_culoare == 585)
         ||  (id_finisaj == 83 && id_culoare == 687) || (id_finisaj == 83 && id_culoare == 688) || (id_finisaj == 83 && id_culoare == 689) || (id_finisaj == 83 && id_culoare == 690)
         ||  (id_finisaj == 91 && id_culoare == 1045) || (id_finisaj == 91 && id_culoare == 1046) || (id_finisaj == 91 && id_culoare == 1047) || (id_finisaj == 91 && id_culoare == 1048)
         ||  (id_finisaj == 95 && id_culoare == 953) || (id_finisaj == 95 && id_culoare == 954) || (id_finisaj == 95 && id_culoare == 955) || (id_finisaj == 95 && id_culoare == 956)
        )             
    {
        id_finisaj = 70;
    }
    else 
    {
        id_finisaj = 68;
    }
            
    
    
                    
                    
    
    const conn = await connection();
    
    
    
    const [result] = await conn.execute (`SELECT p.post_title AS label,  
   p.id, 
  pm_price.meta_value AS price, 
 pm_sku.meta_value AS _key, 
 im_guid.guid AS link_img
 
  FROM wpay_posts AS p
  
  		join wpay_posts as postparinte on postparinte.post_parent = p.ID 
  
       JOIN wpay_postmeta AS pm_img ON p.ID = pm_img.post_id AND pm_img.meta_key = '_thumbnail_id'
      JOIN wpay_posts im_guid ON pm_img.meta_value = im_guid.ID
      
      
  join wpay_terms as idfinisaj on idfinisaj.term_id = ${id_finisaj} 
  join wpay_postmeta as idfinalprodus on idfinalprodus.post_id = postparinte.id and idfinalprodus.meta_value = LOWER(idfinisaj.name) 
  
  
 

 JOIN wpay_postmeta AS pm_price ON idfinalprodus.post_id = pm_price.post_id AND pm_price.meta_key = '_price'
JOIN wpay_postmeta AS pm_sku ON p.id = pm_sku.post_id AND pm_sku.meta_key = '_sku'
 JOIN wpay_term_relationships AS tr ON p.ID = tr.object_id
 JOIN wpay_term_taxonomy AS tt ON tr.term_taxonomy_id = tt.term_taxonomy_id AND tt.taxonomy = 'product_cat'
 JOIN wpay_terms AS t ON tt.term_id = t.term_id
 
 
 
 WHERE p.post_type = 'product'  and t.term_id = ${id_diametru}
 
 GROUP BY p.ID
 
 UNION (
     
     SELECT p.post_title AS label,
        p.id,
        pm_price.meta_value AS price,
        pm_sku.meta_value AS _key, 
        im_guid.guid AS link_img
        FROM wpay_posts AS p
        JOIN wpay_postmeta AS pm_price ON p.ID = pm_price.post_id AND pm_price.meta_key = '_price' 
        JOIN wpay_postmeta AS pm_sku ON p.ID = pm_sku.post_id AND pm_sku.meta_key = '_sku'
        JOIN wpay_postmeta AS im ON p.ID = im.post_id AND im.meta_key = '_thumbnail_id'
        JOIN wpay_posts AS im_guid ON im.meta_value = im_guid.ID
        JOIN wpay_term_relationships AS tr ON p.ID = tr.object_id
        JOIN wpay_term_taxonomy AS tt ON tr.term_taxonomy_id = tt.term_taxonomy_id AND tt.taxonomy = 'product_cat'
        JOIN wpay_terms AS t ON tt.term_id = t.term_id
        WHERE p.post_type = 'product' and t.term_id = ${id_subbrand} 
        GROUP BY p.ID);
        
      `  )
    
//     const [result] = await conn.execute(`SELECT p.post_title AS label,  
//   p.id, 
//  pm_price.meta_value AS price, 
//  pm_sku.meta_value AS _key,
//  postparinte.post_parent as parentid,
//  idfinalprodus.post_id as idvariatie,
//  idfinisaj.name as finisaj,
//  im_guid.guid AS link_img
 
//   FROM wpay_posts AS p
  
//   join wpay_posts as postparinte on postparinte.post_parent = p.ID 
  
//       JOIN wpay_postmeta AS pm_img ON p.ID = pm_img.post_id AND pm_img.meta_key = '_thumbnail_id'
//       JOIN wpay_posts im_guid ON pm_img.meta_value = im_guid.ID
      
      
//   join wpay_terms as idfinisaj on idfinisaj.term_id = ${id_finisaj}
  
  
//   join wpay_postmeta as idfinalprodus on idfinalprodus.post_id = postparinte.id and idfinalprodus.meta_value = LOWER(idfinisaj.name)
 
  
 

// JOIN wpay_postmeta AS pm_price ON idfinalprodus.post_id = pm_price.post_id AND pm_price.meta_key = '_price'
// JOIN wpay_postmeta AS pm_sku ON p.id = pm_sku.post_id AND pm_sku.meta_key = '_sku'
//  JOIN wpay_term_relationships AS tr ON p.ID = tr.object_id
//  JOIN wpay_term_taxonomy AS tt ON tr.term_taxonomy_id = tt.term_taxonomy_id AND tt.taxonomy = 'product_cat'
//  JOIN wpay_terms AS t ON tt.term_id = t.term_id
//  WHERE p.post_type = 'product' and t.term_id IN ${id_diametru}
//  GROUP BY p.ID;`); 
 
 
//     const [result]  = await conn.execute(`SELECT p.post_title AS label,  
//         p.id,
//         p.post_parent as parentId,
//         pm_price.meta_value AS price, 
//     pm_sku.meta_value AS _key
//     FROM wpay_posts AS p
//     JOIN wpay_postmeta AS pm_price ON p.ID = pm_price.post_id AND pm_price.meta_key = '_price'
//     JOIN wpay_postmeta AS pm_sku ON p.ID = pm_sku.post_id AND pm_sku.meta_key = '_sku'
//     JOIN wpay_term_relationships AS tr ON p.ID = tr.object_id
//     JOIN wpay_term_taxonomy AS tt ON tr.term_taxonomy_id = tt.term_taxonomy_id AND tt.taxonomy = 'product_cat'
//     JOIN wpay_terms AS t ON tt.term_id = t.term_id
//     WHERE p.post_type = 'product' and t.term_id = ? 
//     GROUP BY p.ID
//   `, [id_diametru]);


//  const [result]  = await conn.execute(`
 
 
//  SELECT p.post_title AS label,
//         p.id, 
//         p.post_parent as parentId,
//         pm_price.meta_value AS price,
//         pm_sku.meta_value AS _key, 
//         im_guid.guid AS link_img
//             FROM wpay_posts p 
//             JOIN wpay_postmeta AS pm_sku ON p.ID = pm_sku.post_id AND pm_sku.meta_key = '_sku'
//             JOIN wpay_postmeta AS pm_price ON p.ID = pm_price.post_id AND pm_price.meta_key = '_price'
//             JOIN wpay_postmeta AS pm_img ON p.ID = pm_img.post_id AND pm_img.meta_key = '_thumbnail_id'
//             JOIN wpay_posts im_guid ON pm_img.meta_value = im_guid.ID
            
//             JOIN wpay_term_relationships tr1 ON p.ID = tr1.object_id
//             JOIN wpay_term_taxonomy tt1 ON tr1.term_taxonomy_id = tt1.term_taxonomy_id
//             JOIN wpay_terms t1 ON tt1.term_id = t1.term_id
            
//             WHERE tt1.taxonomy = 'product_cat'
//                 AND t1.term_id = 69
//                 AND p.ID NOT IN (
//                 SELECT p2.ID
//                 FROM wpay_posts p2
//                 JOIN wpay_term_relationships tr2 ON p2.ID = tr2.object_id
//                 JOIN wpay_term_taxonomy tt2 ON tr2.term_taxonomy_id = tt2.term_taxonomy_id
//                 JOIN wpay_terms t2 ON tt2.term_id = t2.term_id
//                 WHERE tt2.taxonomy = 'product_cat'
//                     AND t2.term_id IN ${id_diametru}
//                 )
//       GROUP BY p.ID;
//   `);

  return result;

//          const [resultfinal]  = await conn.execute(` SELECT p.post_title AS label,
//                       p.ID AS id,
//                       pm_price.meta_value AS price, 
//                       p.post_parent as parent,
//                       pm_attribute_value1.meta_value,
//                       pm_attribute_value2.meta_value
        
//             FROM wpay_posts AS p
//             JOIN wpay_postmeta AS pm_price ON p.ID = pm_price.post_id AND pm_price.meta_key = '_price' 
//             JOIN wpay_postmeta AS pm_attributes ON pm_attributes.post_id =  p.ID  
//             JOIN wpay_postmeta AS pm_variation1 ON p.ID = pm_variation1.post_id
//             JOIN wpay_postmeta AS pm_variation2 ON p.id = pm_variation2.post_id
//             JOIN wpay_postmeta AS pm_attribute_value1 ON pm_attribute_value1.post_id = p.id AND pm_attribute_value1.meta_value like 'asta e din pasii anteriori' 
//             JOIN wpay_postmeta AS pm_attribute_value2 ON pm_attribute_value2.post_id = p.id AND pm_attribute_value2.meta_value like 'si asta  + unele din accesorii au si grosimea ca si parametru de select  ' 
//             WHERE p.post_type = 'product_variation' 
//                   AND p.post_parent = result.id
                  
             
//                   GROUP BY p.ID;  `);
                  
                  
                  
                  
//   return resultfinal;

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

        const [rows] = await conn.execute(`select postm.meta_id, postsp.post_title, postsp.id, postsp.post_parent as parentId, postm.meta_key, postm.meta_value, posts.guid from wpay_posts as postsp
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

        const [rows] = await conn.execute(`select postm.meta_id, postsp.post_title, postsp.id, postm.meta_key, postm.meta_value, secondpost.guid, secondpostmeta.meta_value, postsp.post_parent as parentId
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
        }
        if (salePrice && salePrice.length) {
            productPrice = salePrice[0].meta_value;
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
        pm_price.meta_value AS price,
        pm_sku.meta_value AS _key, 
        im_guid.guid AS link_img
        FROM wpay_posts AS p
        JOIN wpay_postmeta AS pm_price ON p.ID = pm_price.post_id AND pm_price.meta_key = '_price' 
        JOIN wpay_postmeta AS pm_sku ON p.ID = pm_sku.post_id AND pm_sku.meta_key = '_sku'
        JOIN wpay_postmeta AS im ON p.ID = im.post_id AND im.meta_key = '_thumbnail_id'
        JOIN wpay_posts AS im_guid ON im.meta_value = im_guid.ID
        JOIN wpay_term_relationships AS tr ON p.ID = tr.object_id
        JOIN wpay_term_taxonomy AS tt ON tr.term_taxonomy_id = tt.term_taxonomy_id AND tt.taxonomy = 'product_cat'
        JOIN wpay_terms AS t ON tt.term_id = t.term_id
        WHERE p.post_type = 'product' and t.term_id IN (251,252,253)
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
                necesarAccesorii = await calculNecesarAcoperis1A(data.infoDimensiuni, data.infoTabla);//data.extra
                break;
            case '2A':
                necesarAccesorii = await calculNecesarAcoperis2A(data.infoDimensiuni, data.infoTabla);//data.extra
                break;
            case '4A':
                necesarAccesorii = await calculNecesarAcoperis4A(data.infoDimensiuni, data.infoTabla);//data.extra
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
            subject: 'Simulare Calculator Acoperis',
            html: `
            <h3>Buna ziua, ${userInfo.nume}!</h3>
            <br>
            <div>
                Esti doar la cateva clickuri distanta sa finalizezi comanda<br>
                inceputa pe Tabla-Online.ro
                <br>
                <br>
                
                <a href="${linkOferta}">Continua comanda</a>
            </div>
            <div>
            <br>
            <br>
            Daca ai nevoie de ajutor, ne poti contacta la numar de telefon: <a href="tel:0730304304">0730 304 304</a>.
            <br>
            <br>
            *Acest mail este generat automat.
            <br>
            <br>
            <br>
            Cu respect,
            <br>
            <br>
            <img src="https://tabla-online.ro/wp-content/uploads/2020/10/logo-tabla-tip-tigla.png" width="200" height="100">
            </div>
            `
          };
    
          transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
              return res.status(500).send(err);
            }
    
            res.status(200).send({message: 'ok'});
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
            const path = `${form.uploadDir}/${file.newFilename}-${file.originalFilename}`;

            fs.rename(file.filepath, path, (err) => {
                if (err) throw err;
            });
        });
    
        form.parse(req, (err, fields, files) => {
            if (err) {
                throw err;
            } else {
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
                    to: `calculator@tabla-online.ro`,
                    subject: 'Calculator personalizat',
                    html: `
                    <h3>Calculator personalizat</h3>
                    <br>
                    <p>Nume: ${fields.nume}</p>
                    <p>Prenume: ${fields.prenume}</p>
                    <p>Email: ${fields.email}</p>
                    <p>Adresa: ${fields.adresa}</p>
                    <p>Telefon: ${fields.telefon}</p>
                    <br>
                    <div>
                        Fisiere:
                        <br>
                       <ul>
                            ${Object.keys(files).map(key => `
                                <li><a href="${process.env.NODE_ENV && process.env.NODE_ENV === 'production' ? `https://calculator.tabla-online.ro/app/public/${files[key].newFilename}-${files[key].originalFilename}` : 'local'}">${files[key].originalFilename}</a></li>
                            `).join('')}
                        </ul>
                    </div>
                    `
                  };
                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) {
                      throw err;
                    }
            
                    res.status(200).send({message: 'ok'});
                  });
                }
                
          });
    } catch (err) {
        res.status(500).send({message: err.message});
    }
};

exports.setRoofModel = (req, res) => {
    try {
        const {obj} = req.body;
        
        productLabel = obj.post_title;
        productId = obj.id;
        productParent = obj.parentId;
        productImage = obj.guid;

        res.status(200).send();
    } catch (err) {
        res.status(500).send({message: err.message});
    }
}