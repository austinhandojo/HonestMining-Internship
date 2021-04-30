<template>
  <section 
    id="section-media" 
    class="section-media">
    <div class="container">
      <div class="media--slider">
        <div class="slider">
          <div 
            v-for="(item, index) in media" 
            :key="index" 
            class="slider-item">
            <a :href="item.link">
              <img 
                :src="item.image" 
                alt="Media">
            </a>
          </div>
        </div>

        <div class="slider-prev">
          <i class="ion ion-ios-arrow-back"/>
        </div>
        <div class="slider-next">
          <i class="ion ion-ios-arrow-forward"/>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Homepage from '~/assets/js/homepage';

export default {
  data() {
    return {
      media: [
        {
          link: 'http://blockchainno1.io/news/9433',
          image: '/img/logo-blockchainno1.png'
        },
        {
          link:
            'https://www.liputan6.com/tekno/read/3684547/menambang-uang-kripto-tak-harus-bermodal-besar',
          image:
            'https://s3-ap-southeast-1.amazonaws.com/honest-mining/images/contents/b69ef8fa-a3fc-40bc-83d4-33486a945505-seen-on-image.png'
        },
        {
          link:
            'https://www.republika.co.id/berita/trendtek/internet/18/11/05/phpw4f291-honest-mining-beri-kemudahan-cryptomining-tanpa-modal-besar',
          image:
            'https://s3-ap-southeast-1.amazonaws.com/honest-mining/images/contents/b8e0ca1d-9f7b-4314-8270-6a53373603c9-seen-on-image.png'
        },
        {
          link:
            'https://www.suara.com/bisnis/2018/11/05/063631/honest-mining-beri-kemudahan-cryptomining-tanpa-modal-besar',
          image:
            '/img/logo-suaracom.png'
        },
        // {
        //   link:
        //     'http://jakartainsight.com/read/artikel/2018/11/05/3176/Honest-Mining-Tepis-Anggapan-Cryptomining-Harus-Bermodal-Besar',
        //   image:
        //     'https://honestmining.com/storage/contents/6432e54f-7c66-4aff-aec7-486c68b1f613-seen-on-image.jpg'
        // },
        {
          link:
            'http://www.beritasatu.com/digital/520507-honest-mining-tawarkan-peluang-cryptomining-tanpa-modal-besar.html',
          image:
            'https://s3-ap-southeast-1.amazonaws.com/honest-mining/images/contents/e7bcf94e-1c92-49b7-bc1b-29b4ed9fdd29-seen-on-image.png'
        },
        // {
        //   link:
        //     'https://www.viva.co.id/digital/digilife/1090863-siapapun-bisa-menambang-bitcoin-lewat-honest-mining',
        //   image:
        //     'https://honestmining.com/storage/contents/03ea13ee-c516-487b-b9e8-98a43bd7f69c-seen-on-image.png'
        // },
        {
          link:
            'https://autotekno.sindonews.com/read/1351701/133/platform-honest-mining-mudahkan-orang-bermain-crypto-mining-1541263409',
          image:
            '/img/logo-sindonews.png'
        },
        {
          link:
            'http://industri.bisnis.com/read/20181105/84/856356/berbisnis-cryptomining-dengan-modal-minim',
          image:
            'https://s3-ap-southeast-1.amazonaws.com/honest-mining/images/contents/804340e8-3f9b-4429-9b88-f9b8e6de3482-seen-on-image.png'
        },
        {
          link:
            'https://www.merdeka.com/teknologi/startup-honest-mining-tawarkan-cara-menambang-lebih-murah-dan-mudah.html',
          image:
            'https://s3-ap-southeast-1.amazonaws.com/honest-mining/images/contents/45b9a9f7-b728-49a4-b215-985e28d36b3b-seen-on-image.png'
        },
        {
          link:
            'http://www.tribunnews.com/techno/2018/11/05/honest-mining-beri-kemudahan-cryptomining-tanpa-modal-besar',
          image:
            'https://s3-ap-southeast-1.amazonaws.com/honest-mining/images/contents/a34e2c99-6d12-4338-9d5a-368bbdf2ed71-seen-on-image.png'
        }
      ]
    };
  },

  async mounted() {
    await this.$nextTick();

    Homepage.mediaSlider();
  }
};
</script>
