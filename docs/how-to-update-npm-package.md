# How to update npm package

### Install syncyarnlock package

```
YARN
$ yarn global add syncyarnlock

or

NPM
$ npm install -g syncyarnlock
```

### Update npm package

Step one: check packages that are currently outdated.

```
$ yarn outdated
```

Step two: check if new package contain changes that break backward compatibility.

Step three: upgrade package

```
$ yarn upgrade-interactive
```

Step four: update the codebase if new package contain changes that break backward compatibility.

Step five: Syncs yarn.lock versions into an exsisting package.json

```
$ syncyarnlock --save --keepUpArrow
```
