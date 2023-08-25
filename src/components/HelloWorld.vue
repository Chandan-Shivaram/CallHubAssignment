<script>
import axios from 'axios'
  export default{
    data(){
      return{
        PhtableData: new Set(),
        ValidateData: {},
        selectedItems: [],
      }
    },
    methods:{
       async getAllNumbers() {
          axios.get('http://127.0.0.1:8000/getAllNumbers').then(resp => { 
                const result = resp.data.data;
                this.PhtableData = new Set(result);
          })
          .catch(error => {
               
          })
      },
      async getTimeZone() {
          let request_no = this.fetchSelected()
          request_no = request_no.join(",")
          axios.get('http://127.0.0.1:8000/getTimeZone', {
          params: {
            "ph_no": request_no
          }
        }).then(resp => { 
                const result = resp.data.data;
                this.ValidateData = result
                if(Object.keys(result).length == 0)
                {
                  // alert("Select Numbers on left panel to validate")
                }
          })
          .catch(error => {
               
          })
      },
      fetchSelected() {
        const selectedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');

        const selectedItems = [];
        selectedCheckboxes.forEach(checkbox => {
          selectedItems.push(checkbox.value);
        });

        console.log('Selected Items:', selectedItems);
        this.selectedItems = selectedItems;
        return selectedItems;
        },
        deleteNumber(Number){
          this.PhtableData.delete(Number)
        },
        addNumber(Number){
          const addedNumber = document.getElementById('add').value;
          this.PhtableData.add(addedNumber)
        },
    },
    mounted(){
      this.getAllNumbers()
    }
    
  }
</script>

<template>
  <div>
    <input type="Number" id="add">
    <button for="add" @click="addNumber">Add</button>
    <div style="display: flex;">
    <div style="height: 500px; overflow-y: scroll;">
    <table border=1 style="height: 50px" >
      <thead>
        <tr>
          <th>
            Phone Numbers
          </th>
        </tr>
      </thead>
      <tbody id="bdy">
      <tr v-for="item,index in PhtableData" :key="index">
      <td>
      <input type="checkbox" :value="item" :id="item">
      <label :for="item">{{ item }}</label>
      <button @click="deleteNumber(item)" style="margin: 0 0 0 15px;">delete </button>
      </td>
      </tr>
      </tbody>
      </table>
    </div>
    <div style="height: 500px; overflow-y: scroll;">
    <table border=1 style="height: 50px">
      <thead>
        <tr>
          <th>
            Phone Number
          </th>
          <th>
            Current Time
          </th>
          <th>
            Current Time UTC
          </th>
          <th>
            zone
          </th>
          <th>
            state
          </th>
          <th>
            Action
          </th>
          <th>
            call window
          </th>
        </tr>
      </thead>
      <tbody>
      <tr v-for="item,index in selectedItems" :key="index" :class="index%2? 'odd':'even'">
      <td>
      {{ item }}
      </td>
      <td>
      {{ ValidateData[item]["local_time"] }}
      </td>
      <td>
      {{ ValidateData[item]["local_time_utc"] }}
      </td>
      <td>
      {{ ValidateData[item]["zone"][0] }}
      </td>
      <td>
      {{ ValidateData[item]["state"][0] }}
      </td>
      <td v-if="ValidateData[item]['status']">
      <button>call </button>
      </td>
      <td v-else>
      No call
      <!-- <button>delete </button> -->
      </td>
      <td>
      {{ ValidateData[item]["utc_time_window"][0] }} - {{ ValidateData[item]["utc_time_window"][1] }}
      </td>
      </tr>
      </tbody>
      </table>
    </div>
    </div>
    <button @click="getTimeZone()">Analyse </button>
  </div>
</template>

<style scoped>
@import url("/src/main.css");
</style>
