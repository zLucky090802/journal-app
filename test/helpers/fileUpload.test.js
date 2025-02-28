import {v2 as cloudinary} from 'cloudinary';
const { fileUpload } = require("../../src/helpers/fileUpload");

cloudinary.config({
    cloud_name:'dhajrl9yl',
    api_key:'111643368234499',
    api_secret:'lYd7UwmD33VjLYgKH3m9O5ghg58',
    secure: true
})

describe('Pruebas en fileUpload', () => { 

    test('debe de subir el archivo correctamente a cloudinary', async() => {  
        const imageUrl = 'https://www.adorama.com/alc/wp-content/uploads/2018/11/landscape-photography-tips-yosemite-valley-feature-825x465.jpg';

        const resp = await fetch(imageUrl);
        const blob = await resp.blob();
        const file = new File([blob],'foto.jpg');

        const url = await fileUpload(file);
        expect(typeof url). toBe('string');
        const segments = url.split('/');
        const imageId = segments[segments.length - 1].replace('.jpg','')
        await cloudinary.api.delete_resources([ imageId ]);
    });

    test('debe de retornar null', async() => {  
        const file = new File([],'foto.jpg');

        const url = await fileUpload(file);
        expect(url). toBe(null);
    })

})