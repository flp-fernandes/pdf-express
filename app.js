const express = require('express');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');

const app = express();
const dirPath = path.join(__dirname, 'public/pdfs');
const PORT = 3000;

const files = fs.readdirSync(dirPath).map(name => {
    return {
        name: path.basename(name, '.pdf'),
        url: `/pdfs/${name}`
    }
});

app.set('view engine', 'ejs');
app.use(express.static('public', {
    setHeaders: (res, filepath) =>
        res.set(
            'Content-Disposition',
            `inline; filename="pdf-express-${path.basename(filepath)}"`
        )
}));

app.get('/', (req, res) => {
    res.render('index', { files });
});

app.get('/:file', (req, res) => {
    const file = files.find(f => f.name === req.params.file);
    
    res.render('index', { files, file });
})

app.listen(PORT, () => console.log(`app listening on port ${PORT}`));