<template>
  <form ref="imageform" class="" method="post" enctype="multipart/form-data" v-on:submit.prevent="handleSubmit">
    <input type="file" name="file" value="" v-on:change="handleUpload">
    <input type="submit" name="" value="Submit">
  </form>
</template>

<script>
import AppService from '@/api/app.service.js'
export default {
  data() {
    return {
      file: ''
    }
  },
  methods: {
    handleUpload() {
      this.file = this.$refs.imageform.file.files[0]
    },
    handleSubmit() {
      var imageData = new FormData()
      imageData.append('image', this.file, this.file.name)

      AppService.uploadImage(imageData)
      .then(result => {
        if (result.error) {
          console.log("There was an error uploading your image", err);
        } else if (result.success) {
          console.log("Successfully uploaded image");
        } else {
          console.log("Something went wrong :(");
        }
      })
    }
  }
}
</script>

<style lang="css">
</style>
