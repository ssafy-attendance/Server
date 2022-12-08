<template>
  <div>
    <form method="post" enctype="multipart/form-data">
      <div>
        <label for="chooseFile"> Click </label>
      </div>
      <input
        ref="image"
        @change="uploadImg()"
        type="file"
        id="chooseFile"
        name="chooseFile"
        accept="image/*"
      />
    </form>
    <img id="uploaded-image" :src="image" alt="" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      image: "",
    };
  },

  props: {
    uploadPicture: Array,
  },
  methods: {
    uploadImg() {
      console.log("들어왔다");
      const image = this.$refs["image"].files[0];
      const url = URL.createObjectURL(image);
      this.image = url;

      const imageContent = document.querySelector("#uploaded-image");
      imageContent.style.width = "100%";
      imageContent.style.height = "90%";

      console.log(url);
      console.log(this.image);
      this.$emit("uploadPicture", [this.image]);
    },
  },
};
</script>
<style>
/* #uploaded-image {
  width: this.widthpercent;
  height: this.heightpercent;
} */
</style>
