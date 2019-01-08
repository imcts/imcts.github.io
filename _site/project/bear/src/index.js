import $ from 'jquery'
import { getTags, getBears } from './api'
import AppView from './view/AppView'
import AppModel from './model/AppModel'

$(async () => new AppView('#wrapper', new AppModel({
  tags: await getTags(),
  bears: await getBears()
})))
