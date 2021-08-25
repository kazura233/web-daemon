<h1 align="center">Welcome to @kazura/web-daemon 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/@kazura/web-daemon" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/@kazura/web-daemon.svg">
  </a>
  <a href="https://github.com/kazura233/web-daemon/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> web-daemon

### 🏠 [Homepage](https://github.com/kazura233/web-daemon)

## Install

```sh
yarn add @kazura/web-daemon
```

## Usage

```javascript
import WebDaemon from '@kazura/web-daemon'

let point = 1

const daemon = new WebDaemon((next) => {
  console.log(point++)
  next()
})

daemon.start()

daemon.pause()

WebDaemon.pauseAll()
```

## Author

👤 **kazura233**

- Website: https://github.com/kazura233
- Github: [@kazura233](https://github.com/kazura233)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/kazura233/web-daemon/issues).

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
