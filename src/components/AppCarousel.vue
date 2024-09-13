<template>
  <div class="block">
    <div class="animation" ref="slider">
      <div class="first">
        <img src="/img/icon-donut.webp" />
      </div>
      <div>
        <img src="http://fpoimg.com/200x200?text=Second" />
      </div>
      <div>
        <img src="http://fpoimg.com/200x200?text=Third" />
      </div>
      <div>
        <img src="http://fpoimg.com/200x200" />
      </div>
      <div>
        <img src="http://fpoimg.com/200x200" />
      </div>
      <div>
        <img src="http://fpoimg.com/200x200" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.initSmoothScrolling(".block", "smoothscroll");
  },
  methods: {
    initSmoothScrolling(container, animation) {
      const $container = this.$refs.slider.parentNode;
      let sliderWidth = 0;
      let animationWidth = 0;
      const sliderHeight = $container.querySelector("div").offsetHeight;

      const elements = $container.querySelectorAll("div");

      elements.forEach((el) => {
        animationWidth += el.offsetWidth;
      });

      const slidesVisible = Math.ceil(
        $container.offsetWidth / elements[0].offsetWidth
      );

      const slidesNumber = elements.length;
      const speed = slidesNumber * 2;

      // Clonare gli elementi visibili
      for (let i = 0; i < slidesVisible; i++) {
        const clone = elements[i].cloneNode(true);
        $container.appendChild(clone);
      }

      // Calcolare la larghezza totale del container
      const allElements = $container.querySelectorAll("div");

      allElements.forEach((el) => {
        sliderWidth += el.offsetWidth;
      });

      // Imposta la larghezza del container
      $container.style.width = `${sliderWidth}px`;
      $container.style.height = `${sliderHeight}px`;

      // Inserire il CSS per l'animazione
      const style = document.createElement("style");
      style.type = "text/css";
      style.innerHTML = `
        @keyframes ${animation} {
          0% { margin-left: 0px; }
          100% { margin-left: -${animationWidth}px; }
        }
        .animation div:first-of-type {
          animation: ${animation} ${speed}s linear infinite;
        }
      `;
      document.head.appendChild(style);

      // Restart animation (es. per Safari & IE)
      const cl = $container.className;
      $container.classList.remove(cl);
      setTimeout(() => {
        $container.classList.add(cl);
      }, 1);
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

body {
  background-color: #000;
}

.block {
  overflow: hidden;
  width: 800px;
  margin: 50px auto;
  background: #fff;
}

.animation {
  width: auto;
  height: 100px;
  font-size: 0;
}

.animation div {
  display: inline-block;
  width: auto;
  float: none;
  padding: 0 10px;
}

.animation img {
  width: 200px; /* Imposta la larghezza fissa delle immagini */
  height: 200px; /* Imposta l'altezza fissa delle immagini */
  object-fit: cover; /* Fa sì che l'immagine riempia l'area senza distorsioni */
  display: block; /* Elimina eventuali spazi vuoti sotto le immagini */
}
</style>
