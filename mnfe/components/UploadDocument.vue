<template>
  <form enctype="multipart/form-data">

    <div class="row mt-20 mb-20 align-items-center section-upload-doc">

      <!--start label-->
      <div class="col-sm-4 col-md-4">
        <div class="title-account">
          {{ file.label }}
          <div v-if="file.name === 'selfie'">
            <a 
              href="#" 
              data-target="#modalPhotoExample"
              data-toggle="modal"
              class="color-link text-underline font-13">Check Example</a>
          </div>
        </div>
      </div>
      <!--end label-->

      <!--start from upload-->
      <div class="col-sm-8 col-md-8">
        <div class="input-file-custom">
          <label
            :for="file.name"
            class="custom-file-upload">
            <span class="container-border">
              <span
                class="inner">Choose File</span>
              <div
                class="image-preview row row-custom-5">
                <div class="col-sm-7 col-custom-5">
                  <img
                    :src="file.url"
                    class="preview w-100">
                </div>
                <div class="col-sm-5 col-custom-5">
                  <span class="filename">{{ getFileName(file.url) }}</span>
                </div>
              </div>
            </span>
          </label>
          
          <input
            v-validate="'required|size:1000|ext:jpeg,jpg,png,pdf'"
            :disabled="status === 'pending' || status === 'verified'"
            :id="file.name"
            :name="file.name"
            data-vv-as="field"
            type="file"
            class="custom-file-new"
            aria-describedby="inputGroupFileAddon01"
            accept="image/png, image/jpg, image/jpeg, application/pdf"
            @change="onSubmitFile($event)"
          >
          <!--show error message-->
          <!-- <label
            v-show="errors.has('document')"
            class="error">{{ errors.first('document') }}</label> -->
        </div>
      </div>
      <!--end from upload-->

    </div>
  </form>
</template>
<script>
  import { mapActions } from 'vuex'
  import Swal from 'sweetalert2'
  import { Validator } from 'vee-validate'

  export default {
    name : 'UploadDocument',
    props : {
      status: {
        type: String,
        default: () => ''
      },
      document_file : {
        type : Object,
        default : () => {}
      },
    },

    data() {
      return {
        file : this.document_file
        }
    },

    mounted: () => {
      $('#closesample').click(function() {
          $('#modalPhotoExample').modal('hide');
      });
    },

    methods : {
      /**
       * request to store
       */
      ...mapActions({
        uploadMultipartAction: 'uploadMultipartAction',
        settingAction : 'settingAction'
      }),

      /**
       *
       * @param event
       * @returns {Promise<boolean>}
       */
      async onSubmitFile(event){
        /**
         * get object image
         */
        let file = event.target.files[0];

        /**
         * create url image
         *
         * @type {string}
         */
        this.file.url = file ? URL.createObjectURL(file) : this.document_file.url;

        /**
         * is type is multipart/form
         */
        if (this.document_file.type === "multipart") return await this.multipart(file);

        /**
         * is type base64
         */
        if (this.document_file.type === "base64") return await this.base64(file);

        return false;
      },

      /**
       *
       * @param file
       * @returns {Promise<*>}
       */
      async multipart(file) {

        /**
         * do action!
         */
        let { status, error_message, message, data, created_at } = await this.uploadMultipartAction({
          name: this.document_file.name,
          file: file
        });

        /**
         * have status success(true/false)
         */
        if (status) 
         this.$emit('onDataUpload', data)
        return await this.handleSuccess(message);

        return this.handleError(error_message, data, created_at)

      },

      /**
       *
       * @param file
       * @returns {Promise<void>}
       */
      async base64(file) {

        /**
         * do action!
         */
        let { status, error_message, message, data, created_at } = await this.settingAction({
          image_selfie: await this.convertBase64(file)
        });

        /**
         * have status success(true/false)
         */
        if (status) 
          this.$emit('onDataUpload', data)
         return await this.handleSuccess(message);

        return this.handleError(error_message, data, created_at);

      },

      /**
       *
       * @param file
       * @returns {Promise<any>}
       */
      async convertBase64(file) {
        //TODO: handle promise rejected or catch
        return await new Promise((resolve, reject) => {
          /**
           * @type {FileReader}
           */
          let reader = new FileReader();
          /**
           * read data url by file
           */
          reader.readAsDataURL(file);
          /**
           * load file
           */
          reader.onloadend = () => {
            resolve(reader.result)
          }
        })
      },

      /**
       *
       * @param message
       * @returns {*}
       */
      handleSuccess(message) {
        return Swal('Document has been updated', '', 'success');
      },

      /**
       *
       * @param error_message
       * @param data
       * @returns {*}
       */
      handleError({ error_message, data }) {
        this.file =  this.document_file;
        return Swal(
          error_message || 'request error',
          '', 
          'error'
        )
        return this.data
      },

      getFileName (event) {
        if (event) {
          return event.substring(event.lastIndexOf('/')+1)
        }
      },

    }

  }

</script>