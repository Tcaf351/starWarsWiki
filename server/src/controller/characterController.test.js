const characterController = require('./characterController');
const { db } = require('../config/db');

test('Obi-Wan Kenobi should be in name', async () => {
    const response = await db.collection('characters').get();
    
    let docs = [];
                response.forEach((doc) => {
                    docs.push({

                    id: doc.id,
                    name: doc.data().name,
                    filmAppearances: Number(doc.data().filmAppearances),
                    lightsaberColor: doc.data().lightsaberColor,
                    sideOfForce: doc.data().sideOfForce,
                    description: doc.data().description,
                    characterImage: doc.data().characterImage,
                    });
                });
                expect(docs[3].name).toContain('Obi-Wan Kenobi');
            
});

test('Light side should be returned in sideOfForce', async () => {
    const response = await db.collection('characters').get();
    
    let docs = [];
                response.forEach((doc) => {
                    docs.push({

                    id: doc.id,
                    name: doc.data().name,
                    filmAppearances: Number(doc.data().filmAppearances),
                    lightsaberColor: doc.data().lightsaberColor,
                    sideOfForce: doc.data().sideOfForce,
                    description: doc.data().description,
                    characterImage: doc.data().characterImage,
                    });
                });
                expect(docs[0].sideOfForce).toContain('Light Side');
            
});