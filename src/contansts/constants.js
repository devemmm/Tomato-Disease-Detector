import { Dimensions } from 'react-native'

export const { height: HEIGHT, width: WIDTH } = Dimensions.get('screen')
export const APP_GREEN_COLOR = '#e32'

export const normalTomatoes = [
  {
    id: 1,
    title: 'Tomato',
    description: 'Description',
    url: 'https://cdn.apartmenttherapy.info/image/fetch/f_auto,q_auto:eco,c_fill,g_auto,w_1500,ar_3:2/https%3A%2F%2Fstorage.googleapis.com%2Fgen-atmedia%2F3%2F2015%2F08%2Faf1d65097b0c1f6e637f2063a0ae4e450d879d05.jpeg',
  },
  {
    id: 2,
    title: 'Title 1',
    description: 'Description',
    url: 'https://www.foodrepublic.com/wp-content/uploads/2017/06/tomatoleaves.jpg',
  },
  {
    id: 3,
    title: 'Title 1',
    description: 'Description',
    url: 'https://d384u2mq2suvbq.cloudfront.net/public/spree/products/1594/jumbo/Tomato-Leaf-Fragrance-Oil.jpg?1529607054',
  },
  {
    id: 4,
    title: 'Title 1',
    description: 'Description',
    url: 'https://u9b2w4s6.rocketcdn.me/wp-content/uploads/2015/09/2015-09-17-01.jpg',
  },
  {
    id: 5,
    title: 'Title 1',
    description: 'Description',
    url: 'https://www.seekpng.com/png/detail/7-73341_drawing-cherry-tomato-plant-leaf-tomato-plant-clipart.png',
  },
]

export const profile_image =
  'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-image-icon-default-avatar-profile-icon-social-media-user-vector-image-209162840.jpg'
export const affectedTomatoes = [
  {
    id: 1,
    title: 'Tomato',
    description: 'Description',
    url: 'data:image/jpeg;base64,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',
  },
  {
    id: 2,
    title: 'Title 1',
    description: 'Description',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEG06JVkSPzsIVRefUVaAVZnBU4uy_QKlIag&usqp=CAU',
  },
  {
    id: 3,
    title: 'Title 1',
    description: 'Description',
    url: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F37%2F2020%2F04%2F22%2Ftomato-moskovich-variety-d74d4cee.jpg',
  },
  {
    id: 4,
    title: 'Title 1',
    description: 'Description',
    url: 'https://www.greenlife.co.ke/wp-content/uploads/2019/02/Tomato-Leaf-Curl-1600x800.jpg',
  },
  {
    id: 5,
    title: 'Title 1',
    description: 'Description',
    url: 'https://www.gardeningknowhow.com/wp-content/uploads/2016/04/tomato-pests.jpg',
  },
]

export const about_us =
  'Like your lorem ipsum extra crispy? Then Bacon Ipsum is the placeholder text generator for you. Side of eggs and hashbrowns is optional, but recommended. Bacon ipsum dolor amet short ribs brisket venison rump drumstick pig sausage prosciutto chicken spare ribs salami picanha doner. Kevin capicola sausage, buffalo bresaola venison turkey shoulder picanha ham pork tri-tip meatball meatloaf ribeye. Doner spare ribs andouille bacon sausage. Ground round jerky brisket pastrami shank. Like your lorem ipsum extra crispy? Then Bacon Ipsum is the placeholder text generator for you. Side of eggs and hashbrowns is optional, but recommended. Bacon ipsum dolor amet short ribs brisket venison rump drumstick pig sausage prosciutto chicken spare ribs salami picanha doner. Kevin capicola sausage, buffalo bresaola venison turkey shoulder picanha ham pork tri-tip meatball meatloaf ribeye. Doner spare ribs andouille bacon sausage. Ground round jerky brisket pastrami shank. Like your lorem ipsum extra crispy? Then Bacon Ipsum is the placeholder text generator for you. Side of eggs and hashbrowns is optional, but recommended. Bacon ipsum dolor amet short ribs brisket venison rump drumstick pig sausage prosciutto chicken spare ribs salami picanha doner. Kevin capicola sausage, buffalo bresaola venison turkey shoulder picanha ham pork tri-tip meatball meatloaf ribeye. Doner spare ribs andouille bacon sausage. Ground round jerky brisket pastrami shank.'
