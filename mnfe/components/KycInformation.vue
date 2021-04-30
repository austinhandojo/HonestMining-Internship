<template>
  <form
    id="mainFormSetting"
    ref="form"
    data-vv-scope="basic_information"
  >
    <div class="mt-50">
      <span class="color-primary mb-0 font-500">BASIC INFORMATION</span>
      <hr class="mb-0 mt-5">
    </div>
    <div class="mt-10">
      <div class="row align-items-center">
        <div class="col-sm-4 col-md-4">
          <div class="title-account">Username</div>
        </div>
        <div class="col-sm-8 col-md-8"> 
          <input 
            v-validate="'required'" 
            v-model="setting.username" 
            type="text"   
            class="form-control border-none w-100 bg-transparent"  
            name="name"
            data-vv-validate-on="none"
            placeholder="Enter Username" 
            disabled
          >
        </div>
      </div>
      <hr class="mb-10 mt-10">
    </div>
    <div class="mt-10">
      <div class="row align-items-center">
        <div class="col-sm-4 col-md-4">
          <div class="title-account">Email Address</div>
        </div>
        <div class="col-sm-8 col-md-8"> 
          <input 
            v-validate="'required'"  
            v-model="setting.email"
            type="text"   
            class="form-control border-none w-100 bg-transparent"  
            name="name"
            data-vv-validate-on="none"
            placeholder="Enter Email" 
            disabled
          >
        </div>
      </div>
      <hr class="mb-10 mt-10">
    </div>
    <div class="mt-50">
      <div class="color-primary mb-0 font-500">KYC INFORMATION
        <span class="float-right font-400 verify-setting">Status: 
          <span 
            v-if="user.kyc === true" 
            class="color-green">Verified <i class="fas fa-check-circle" /></span>
          <span 
            v-else-if="user.kyc === false && user.kyc_request === true" 
            class="color-primary">Pending</span>
          <span 
            v-else-if="user.kyc === false && user.kyc_request === false" >Unverified</span>
          <span 
            v-else 
            class="color-red">Rejected</span>
        </span>
      </div>
      <hr class="mb-0 mt-5">
    </div>
    <div class="mt-10">
      <div class="row align-items-center">
        <div class="col-sm-4 col-md-4">
          <div class="title-account">Full Name</div>
        </div>
        <div class="col-sm-8 col-md-8"> 
          <input 
            v-validate="'required'"  
            v-model="setting.name"
            :disabled="user.kyc === true || user.kyc_request === true"
            :class="user.kyc === true ? 'bg-transparent' : ''"
            type="text"
            class="form-control border-none w-100"
            name="fullname"
            data-vv-validate-on="none" 
            placeholder="Enter Name"
            @input="ChangeValue"
          > 
          <label 
            v-show="errors.has('basic_information.fullname')" 
            class="error" >{{ errors.first('basic_information.fullname') }}</label>
        </div>
      </div>
      <hr class="mb-10 mt-10">
    </div>
    <div class="mt-10">
      <div class="row align-items-center">
        <div class="col-sm-4 col-md-4">
          <div class="title-account">Gender</div>
        </div>
        <div class="col-sm-8 col-md-8">
          <div class="form-check form-check-inline"> 
            <input 
              v-validate="'required'" 
              v-model="setting.gender" 
              :disabled="user.kyc === true || user.kyc_request === true"
              :class="user.kyc === true ? 'bg-transparent' : ''"
              class="form-check-input"
              type="radio"  
              name="gender"
              value="M"   
              data-vv-validate-on="none"
              @input="ChangeValue"
            > 
            <label class="form-check-label" >Male</label>
          </div>
          <div class="form-check form-check-inline"> 
            <input 
              v-validate="'required'" 
              v-model="setting.gender" 
              :disabled="user.kyc === true || user.kyc_request === true"
              :class="user.kyc === true ? 'bg-transparent' : ''"
              class="form-check-input"
              type="radio" 
              name="gender"
              value="F"  
              data-vv-validate-on="none"
              @input="ChangeValue"
            > 
            <label class="form-check-label">Female</label>
          </div>
          <label 
            v-show="errors.has('basic_information.gender')" 
            class="error w-100" >{{ errors.first('basic_information.gender') }}</label>
        </div> 
        
      </div>
      <hr class="mb-10 mt-10">
    </div>
    <div class="mt-10">
      <div class="row align-items-center">
        <div class="col-sm-4 col-md-4">
          <div class="title-account">Date of Birth 
          </div> 
        </div>
        <div class="col-sm-8 col-md-8">
          <flat-pickr 
            v-validate="'required'" 
            :config="configDateBirth"
            v-model="setting.birth_date" 
            :class="user.kyc === true || user.kyc_request === true ? 'disabled-this' : ''"  
            name="birth_date"
            class="form-control custom-select w-100 bg-transparent" 
            placeholder="Enter Birthday"
          />
          <!-- {{ setting.birth_date }} -->
          <!-- <datepicker 
            v-validate="'required'" 
            v-model="setting.birth_date" 
            :disabled="user.kyc === true"  
            :class="user.kyc === true ? 'bg-transparent' : ''" 
            name="birth_date"
            class="form-control custom-select w-100"
            placeholder="Enter Birthday"
            @selected="ChangeValueDatePicker" 
          /> -->
          <br >
          <label 
            v-show="errors.has('basic_information.birth_date')" 
            class="error" >{{ errors.first('basic_information.birth_date') }}</label>
        </div>
      </div>
      <hr class="mb-10 mt-10">
    </div>
    <div class="mt-10">
      <div class="row align-items-center">
        <div class="col-sm-4 col-md-4">
          <div class="title-account">Citizenship</div>
        </div>
        <div class="col-sm-8 col-md-8"> 
          <select 
            v-validate="'required'"  
            v-model="setting.nation_code"
            :disabled="user.kyc === true || user.kyc_request === true"
            :class="user.kyc === true ? 'bg-transparent' : ''"
            name="nation_code"
            class="form-control custom-select"
            tabindex="12"
            data-vv-validate-on="none"
            @input="ChangeValue"
          
          >  
            <option 
              v-for="(countri, index) in countries" 
              :key="index" 
              :value="countri.data.code"   
            >{{ countri.data.name }}
            </option> 
          </select> 
          <label 
            v-show="errors.has('basic_information.nation_code')" 
            class="error">{{ errors.first('basic_information.nation_code') }}</label>
        </div>
      </div>
      <hr class="mb-10 mt-10">
    </div>
    <div class="mt-10">
      <div class="row align-items-center">
        <div class="col-sm-4 col-md-4">
          <div class="title-account">Passport/National ID No.</div>
        </div>
        <div class="col-sm-8 col-md-8"> 
          <input 
            v-validate="'required'"  
            v-model="setting.document_number"
            :disabled="user.kyc === true || user.kyc_request === true"
            :class="user.kyc === true ? 'bg-transparent' : ''"
            type="text"
            class="form-control border-none w-100"
            name="passport"
            placeholder="Passport/National ID No."
            @input="ChangeValue"
          >
          <label 
            v-show="errors.has('basic_information.passport')" 
            class="error">{{ errors.first('basic_information.passport') }}</label>
        </div>
      </div>
      <hr class="mb-10 mt-10">
    </div>
    <div class="mt-10">
      <div class="row align-items-center">
        <div class="col-sm-4 col-md-4">
          <div class="title-account">Timezone </div>
        </div> 
        <div class="col-sm-8 col-md-8"> 
          <select 
            v-validate="'required'" 
            id="timezone" 
            v-model="setting.timezone" 
            :disabled="user.kyc === true || user.kyc_request === true"
            :class="user.kyc === true ? 'bg-transparent' : ''"
            name="timezone"
            class="form-control custom-select"
            tabindex="12"
            @input="ChangeValue"
          >
            <option>Choose</option>
            <option 
              v-for="(timezone, index) in listTImeZOnes" 
              :key="index" 
              :value="timezone" 
            >{{ timezone }}
            </option>
          </select> 
        </div>
      </div>
      <hr class="mb-10 mt-10">
    </div>

  </form>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import Swal from 'sweetalert2'
  import { Validator } from 'vee-validate'
  export default {
    name : 'KycInformation',
    props : {
      document_file : {
        type : String,
        default : ''
      }
    },

    data() {
      return {
        file : this.document_file,
        setting:{}  
      }
        
    },
    
    computed : {
      ... mapGetters({
        user: 'user',    
      })

    }, 

    async created(){
      this.setting = this.user  
    },
    
    methods : {
      ...mapActions({
        postSetting: 'postSetting',
      }),
    },

  }
</script>
