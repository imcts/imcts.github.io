const router = new Router()

router.set('index', new IndexController(router))
      .set('folder', new FolderController(router))
      .route('index')
