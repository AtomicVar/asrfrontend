const Koa = require('koa');
const logger = require('koa-logger');
const serve = require('koa-static');
const body = require('koa-better-body');
const router = require('koa-router')();

const controller = require('./controller');

const app = new Koa();

// router.xxx
router.post('/asr', controller.asr);

app.use(logger());
app.use(body(option={formLimit: '10mb'}));
app.use(router.routes());
app.use(serve('./static'));

app.listen(3000);
console.log('Koa server started at http://127.0.0.1:3000');