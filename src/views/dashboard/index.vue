<template>
  <div>
    <Card></Card>
    <Content></Content>
    <Footer></Footer>
  </div>
</template>

<script>
import Card from "./Card";
import Content from "./Content";
import Footer from "./Footer";
export default {
  name: "Dashboard",
  components: {
    Card,
    Content,
    Footer,
  },
  mounted() {
    this.$store.dispatch("getData");
  },
};
</script>

<style scoped>
</style>
