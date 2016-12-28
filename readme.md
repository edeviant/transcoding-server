
# simple transcoding media server

## what is it?

takes in a src url / width x height / filename, returns an image

`http://localhost:8000/i/https%3A%2F%2Fs-media-cache-ak0.pinimg.com%2Foriginals%2Fe7%2Fc6%2F88%2Fe7c688bd85ebe98dbbc8964ab2ffd8b2.jpg/500x400/imagename.jpg`

`http://localhost:8000/i/1500x2300/imagename.png?src=http://vignette3.wikia.nocookie.net/disney/images/c/cc/Gustav_Giant.jpg/revision/latest?cb=20121022002143`

`http://localhost:8000/s/banner/imagename.jpg?src=DSC_5713.JPG`

## to run

- install dependencies: `npm install`
- _optional:_ popluate AWS/S3 detail in .env

- local development w/nodemon: `npm run dev`
