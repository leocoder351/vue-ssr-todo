import createApp from './create-app';

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router } = createApp();

    router.push(context.url);

    // 基本上在SSR中才会用到onReady
    // 所有异步组件解析完后调用
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();

      if (!matchedComponents.length) {
        return reject(new Error('no component matched'));
      }

      resolve(app);
    }, reject);
  });
}
