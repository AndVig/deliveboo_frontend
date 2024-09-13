<script>
import Carousel from "./Carousel.vue"
export default {
    name: 'AppHomePage',
    data() {
        return {
            images: [
                'https://img.freepik.com/premium-photo/grilled-beef-burger-with-fries-cheese-tomato-generative-ai_1078540-4663.jpg',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTofG8ztxXbOG0LINKzNcGGQRuGNiQXxvktkg&s',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ778gKUAtnxKszfayT8qmtv4fL3zAH3dVoIw&s',
                'https://reciteme.com/wp-content/uploads/2023/11/KFC-thumbnail.jpg',
                'https://tb-static.uber.com/prod/image-proc/processed_images/28fd21dee97bb91768304311a1c97547/c9252e6c6cd289c588c3381bc77b1dfc.jpeg',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTevEY84uoDmQr9dgXTHGxuiFC2FUOBragieQ&s',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPLEiK78dKVQFF2eM4DcU3zhuza2l1fcyXQg&s',
            ],
            images2: [
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTREaxRNxqBZKnDSQKKN8CU33Imr3MrsBRFUg&s',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo4YDIYR-4kEZD8fILgdWmRG2RGe6Z38yhfg&s',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPPSt8VgHomUerLnZJMWuhlvd3dNJ76gMIfQ&s',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ49bCdI3m0GNYReOLvhZoJkY0Xf0XBn3_jw&s',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwVxdzLObleTEk96d75AJWzir7aGVmqnraHg&s',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRnbZEGD5_z5u1R_Oji_DDm7HtqNWGGShUxA&s'
            ],
        }
    },
    components: {
        Carousel,
    },
};
</script>

<template>
    <Carousel :images="images" />
    <Carousel :images="images2" />
</template>

<style></style>