<template>
  <div>
    <div class="row">
      <!-- <div class="col-sm-4 col-md-4">
        <div class="title-account">
          Upload New Profile Picture   
        </div>
      </div> -->
      <div 
        class="col" 
        style="padding-left:75%;">
        <div class="input-file-custom uploadbutton">
          <label 
            for="file-upload-profile" 
            class="custom-file-upload mb-0 ">
           
            <span class="uploadpic">+</span>
            
          </label>
          <input 
            v-validate="'ext:jpeg,jpg,png'"
            id="file-upload-profile"
            name="upload"
            type="file" 
            class="custom-file-input" 
            aria-describedby="inputGroupFileAddon01" 
            accept="image/png, image/jpg, image/jpeg" 
            @change="onSubmitAvatar($event)"
          > 
          {{ errors.first('upload') }}
        </div>
      </div>
    </div>
    <div class="row align-items-center">
      <!-- <div class="col-sm-4 col-md-4">
        <div class="title-account">
          Current Profile Picture  
        </div>
      </div> -->
      <div 
        class="col" 
        style="display: flex;justify-content: center;">
        <img 
          id="img-profile" 
          :src="file" 
          class="img-circle-100 img-fix"
          style="height: 20vh;width: 20vh;"
          alt="profile-img">  
      </div>
    </div>
    
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import Swal from 'sweetalert2'
  import { Validator } from 'vee-validate'

  export default {
    name : 'ProfilePicture',
    props : {
      document_file : {
        type : String,
        default : ''
      },
    },

    data() {
      return {
        file : this.document_file
        
        }
    },
    
    methods : {
      ...mapActions({
        postSubmitAvatar: 'postSubmitAvatar'
      }),
      
      async onSubmitAvatar(event){
        let image = event.target.files[0]
        this.file = image ? URL.createObjectURL(image) : this.document_file
        this.validate(image)
        let status = await this.postSubmitAvatar(image)
        if (status === false){
          this.file =  this.document_file
          Swal('Oops...', '', 'error')
          return this.data
        }
        Swal('Profile picture has been updated', '', 'success')

      },
      async validate(file){
        let file_size = file.size / 1024 / 1024; // in MB 
        if (file_size > 1) {
          return false
        } 
      },

    }

  }
</script>