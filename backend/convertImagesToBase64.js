const fs = require('fs');
const path = require('path');

function imageToBase64(filePath) {
    const img = fs.readFileSync(filePath);
    return Buffer.from(img).toString('base64');
}

function convertImagesInFolder(folderPath) {
    const images = {};
    fs.readdirSync(folderPath).forEach(file => {
        if (file.match(/\.(jpg|jpeg|png|gif)$/)) {
            const filePath = path.join(folderPath, file);
            const base64 = imageToBase64(filePath);
            images[file] = `data:image/${path.extname(file).substr(1)};base64,${base64}`;
        }
    });
    return images;
}

const imagesFolder = path.join(__dirname, '/assets/images/');
const base64Images = convertImagesInFolder(imagesFolder);

fs.writeFileSync('base64Images.json', JSON.stringify(base64Images, null, 2));

console.log('Images converted and saved to base64Images.json');