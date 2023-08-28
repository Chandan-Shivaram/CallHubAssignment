<script>
export default {
  data() {
    return {
      salesforceFields: ['First Name','Last Name','Street','City','State','Zip','Cell'],
      callhubFields: ['First Name','Last Name','Address Line 1','City','State/Province','Pin','Ph no'],
      mappings: [],
      submittedMappings: [],
      isSubmitted: false
    };
  },
  methods: {
    addMapping() {
      if(this.availableSalesforceFields().length)
        this.mappings.push({ salesforce: '', callhub: '' });
      else
        alert("No Fields available to add")
    },
    availableSalesforceFields(selectedField) {
      return this.salesforceFields.filter(sfField => sfField === selectedField || !this.isFieldSelected(sfField, 'salesforce'));
    },
    availableCallHubFields(selectedField) {
      return this.callhubFields.filter(chField => chField === selectedField || !this.isFieldSelected(chField, 'callhub'));
    },
    isFieldSelected(field, side) {
      return this.mappings.some(mapping => mapping[side] === field);
    },
    deleteMapping(index) {
      const mapping = this.mappings[index];
      this.mappings.splice(index, 1);
      this.submitMappings()
    },
    submitMappings() {
      this.submittedMappings = this.mappings.filter(mapping => mapping.salesforce && mapping.callhub);
      this.isSubmitted = true;
    }
  },
};
</script>

<template>
  <div class="mapping-container">
    <div v-for="(mapping, index) in mappings" :key="index" class="mapping-row">
      <div class="select-container">
        <label for="salesforce">Salesforce Field:</label>
        <select v-model="mapping.salesforce" class="select-box">
          <option value="">Choose</option>
          <option v-for="sfField in availableSalesforceFields(mapping.salesforce)" :key="sfField">{{ sfField }}</option>
        </select>
      </div>
      <div class="select-container">
        <label for="callhub">CallHub Field:</label>
        <select v-model="mapping.callhub" class="select-box">
          <option value="">Choose</option>
          <option v-for="chField in availableCallHubFields(mapping.callhub)" :key="chField">{{ chField }}</option>
        </select>
      </div>
      <button @click="deleteMapping(index)" class="delete-button">Delete</button>
    </div>
    <button @click="addMapping" class="add-button">{{(mappings.length > 0)? '+ Map Another Field':'Add Mapping Field'}}</button>
    <button v-if="mappings.length > 0" @click="submitMappings" class="submit-button">Submit</button>
    
    <table v-if="submittedMappings.length > 0" class="submitted-table">
      <thead>
        <tr>
          <th>Salesforce Field</th>
          <th>CallHub Field</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(mapping, index) in submittedMappings" :key="index">
          <td>{{ mapping.salesforce }}</td>
          <td>{{ mapping.callhub }}</td>
        </tr>
      </tbody>
    </table>
    <table v-else></table>
  </div>
</template>

<style scoped>
.mapping-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.add-button, .delete-button, .submit-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  margin: 0 0 0 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-button:hover, .delete-button:hover, .submit-button:hover {
  background-color: #0056b3;
}

.mapping-row {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.select-container {
  flex: 1;
  margin-right: 15px;
}

.select-box {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.submitted-table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
}

</style>
