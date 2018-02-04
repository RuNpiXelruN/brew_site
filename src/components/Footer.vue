<template>
  <div class="footer-wrapper">
    <div class="footer-inner">
      <p class="mf-lab">This is a MF Lab Project</p>
      <p class="mf-copyright">&copy; Mentally Fermented 2018</p>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
  .footer-wrapper {
    @include flexRowC;
    height: 74px;
    background-color: white;
    border-top: 3px solid $textColor;

    .footer-inner {
      @include flexRowSp;
      width: 80%;

      .mf-lab, .mf-copyright {
        margin: 0;
        width: 40%;
      }

      .mf-lab {
        text-align: left;
      }

      .mf-copyright {
        text-align: right;
      }
    }
  }
</style>
