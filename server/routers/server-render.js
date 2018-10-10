const ejs = require('ejs');

module.exports = async (ctx, renderer, template) => {
  ctx.headers['Content-Type'] = 'text/html';

  const context = {
    url: ctx.path
  };

  try {
    const appString = await renderer.renderToString(context);

    console.log(33);
    console.log(context)
    console.log(context.renderStyles())
    console.log(context.renderScripts())

    const html = ejs.render(template, {
      appString,
      styles: context.renderStyles(),
      scripts: context.renderScripts()
    });

    ctx.body = html;
  } catch (err) {
    console.log('render error', err);
    throw err;
  }
}
