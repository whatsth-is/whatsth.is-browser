<p align="center"><img src="https://user-images.githubusercontent.com/11209477/167717787-7f33f564-e975-4055-bf7b-c2b3c29e4f81.png" /></p>
<h1 align="center"><a href="https://whatsth.is">Whatsth.is Browser Extension</a></h1>

An experimental edition of What's This client toolset, designed to run within the browser [utilising the api.whatsth.is][api] technology.

This browser extension uses **React** via **Webpack**, built upon the **[Chrome Extension Boilerplate][bp]**.

**Running in Dev**
```
docker run -it --rm --name npm-script \
    -v "$PWD":/usr/src/app -w /usr/src/app \
    node:16-alpine npm start
```

[api]:  https://github.com/soup-bowl/api.whatsth.is
[bp]:   https://github.com/lxieyang/chrome-extension-boilerplate-react
